"""Checks that every source link on the site still opens. Run from the project folder:
    python tests/check_links.py              (prints a Markdown report)
    python tests/check_links.py report.md    (also writes it to a file)

Each link gets one ordinary request with an honest user agent. Results:
  - Broken:          the page is gone (404/410) or the site no longer exists. Fix these.
  - Couldn't check:  the site refused an automated visit (403/429), errored or timed out. Many school and
                     state-board sites block robots, so open these by hand before assuming anything is wrong.
Exits 0 either way; the monthly GitHub check reads the counts at the top of the report."""
import concurrent.futures, json, pathlib, socket, ssl, subprocess, sys, urllib.error, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
UA = "NursingPathways-LinkCheck/1.0 (+https://nursingpaths.com; monthly source-link check)"
links = json.loads(subprocess.run(["node", str(ROOT / "tests/check_data.js"), "--urls"],
                                  capture_output=True, text=True, check=True).stdout)

def check(item):
    req = urllib.request.Request(item["url"], headers={"User-Agent": UA, "Accept": "text/html,application/pdf,*/*"})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            r.read(2048)
            return item, "ok", r.status
    except urllib.error.HTTPError as e:
        return item, ("broken" if e.code in (404, 410) else "unsure"), e.code
    except urllib.error.URLError as e:
        dns = isinstance(e.reason, socket.gaierror)
        return item, ("broken" if dns else "unsure"), ("site not found" if dns else str(e.reason)[:60])
    except (TimeoutError, socket.timeout):
        return item, "unsure", "timed out"
    except (ssl.SSLError, ConnectionError, OSError) as e:
        return item, "unsure", type(e).__name__

with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    results = list(pool.map(check, links))

broken = [r for r in results if r[1] == "broken"]
unsure = [r for r in results if r[1] == "unsure"]

def rows(items):
    out = ["| Link | Result | Used by |", "|---|---|---|"]
    for item, _, why in items:
        used = "; ".join(item["where"][:3]) + (f" (+{len(item['where']) - 3} more)" if len(item["where"]) > 3 else "")
        out.append(f"| {item['url']} | {why} | {used} |")
    return "\n".join(out)

lines = [f"**Source links:** {len(results)} checked · {len(results) - len(broken) - len(unsure)} OK · "
         f"**{len(broken)} broken** · {len(unsure)} couldn't be checked automatically", ""]
if broken:
    lines += ["### Broken links (fix these)", "",
              "Find the page's new address on the school's or board's site, re-check the facts it supports, then "
              "update `source_url` and `last_verified` in the data file.", "", rows(broken), ""]
if unsure:
    lines += ["<details><summary>Links that couldn't be checked automatically (open these by hand)</summary>", "",
              "These sites refused or didn't answer an automated visit. That's common for school and state-board "
              "sites and usually doesn't mean the page is gone.", "", rows(unsure), "", "</details>", ""]
report = "\n".join(lines)
print(report)
if len(sys.argv) > 1:
    pathlib.Path(sys.argv[1]).write_text(report, encoding="utf-8")
