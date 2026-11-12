"""Add school-wide yearly tuition (U.S. Dept. of Education College Scorecard API) to data/schools/<xx>.js.

Usage (from the project folder):
  python -I tools/state-build/add_tuition.py --state WA [--write] [--map inst-id=UNITID,...] [--skip inst-id,...]
         [--district inst-id,...] [--cache <dir>] [--today 2026-11-12]

- API key: the SCORECARD_API_KEY environment variable, else a key saved in ~/.scorecard_api_key (the owner's free
  api.data.gov key, 1,000 requests an hour; kept on the owner's computer, never in this public repo), else the shared
  DEMO_KEY (about 10 requests per few hours). If the key is over its limit the script stops without changing anything; the state ships without tuition
  and a later run adds it.
- Without --write it only prints the proposed match for every institution (check every "CHECK" line).
- Labels: Scorecard's resident figure is the IN-DISTRICT rate. Community colleges listed in --district are labeled
  "in-district"; everyone else "in-state" (private schools with one rate show "for every student" on the site).
  Before choosing, confirm on one district college's College Navigator page that Scorecard's figure matches its
  in-district row (see docs/ADD_A_STATE.md).
- Year: Scorecard key 2025 = academic year 2025-26 (key 2024 matched College Navigator's 2024-25 column exactly).
"""
import argparse, difflib, json, os, pathlib, re, sys, urllib.request, urllib.error

ap = argparse.ArgumentParser()
ap.add_argument("--state", required=True); ap.add_argument("--write", action="store_true")
ap.add_argument("--map", default=""); ap.add_argument("--skip", default=""); ap.add_argument("--district", default="")
ap.add_argument("--cache"); ap.add_argument("--today", required=True)
a = ap.parse_args()
ST = a.state.upper(); ROOT = pathlib.Path(__file__).resolve().parents[2]
OVR = {k: int(v) for k, v in (x.split("=") for x in a.map.split(",") if x)}
SKIP = {x for x in a.skip.split(",") if x}; DISTRICT = {x for x in a.district.split(",") if x}
KEY_FILE = pathlib.Path.home() / ".scorecard_api_key"
KEY = os.environ.get("SCORECARD_API_KEY") or (KEY_FILE.read_text().strip() if KEY_FILE.exists() else "") or "DEMO_KEY"
print("Scorecard key:", "DEMO_KEY (shared, low limit)" if KEY == "DEMO_KEY" else "personal key")
FIELDS = ("id,school.name,school.city,school.state,school.ownership,2024.cost.tuition.in_state,"
          "2024.cost.tuition.out_of_state,2025.cost.tuition.in_state,2025.cost.tuition.out_of_state")

def fetch_all():
    rows, page = [], 0
    while True:
        cache = pathlib.Path(a.cache) / f"sc_{ST}_{page}.json" if a.cache else None
        if cache and cache.exists():
            d = json.loads(cache.read_text(encoding="utf-8"))
        else:
            url = (f"https://api.data.gov/ed/collegescorecard/v1/schools?school.state={ST}&school.operating=1"
                   f"&per_page=100&page={page}&fields={FIELDS}&api_key={KEY}")
            try:
                with urllib.request.urlopen(url, timeout=60) as r: d = json.load(r)
            except urllib.error.HTTPError as e:
                sys.exit(f"Scorecard said HTTP {e.code} (Retry-After: {e.headers.get('Retry-After')} s). Nothing changed.")
            if cache: cache.parent.mkdir(parents=True, exist_ok=True); cache.write_text(json.dumps(d), encoding="utf-8")
        if "error" in d: sys.exit(f"Scorecard error {d['error']}. Nothing changed.")
        rows += d.get("results", [])
        if len(d.get("results", [])) < 100: return rows
        page += 1

target = ROOT / f"data/schools/{ST.lower()}.js"
src = target.read_text(encoding="utf-8")
if f"{ST}.tuition" in src: sys.exit(f"{target.name} already has {ST}.tuition. Nothing changed.")
m = re.search(r"institutions: \[\n(.*?)\n    \],", src, re.S)
inst = [json.loads(line.strip().rstrip(",")) for line in m.group(1).split("\n") if line.strip()]
sc = fetch_all()
norm = lambda s: re.sub(r"[^a-z0-9 ]", "", re.sub(r"\(.*?\)", "", s.lower()).replace("-", " ").replace("saint", "st")).strip()

recs = {}
for i in inst:
    if i["id"] in SKIP: print(f"{i['id']:24} skipped"); continue
    if i["id"] in OVR:
        r = next((x for x in sc if x["id"] == OVR[i["id"]]), None); q = 1.0
        if r is None: print(f"{i['id']:24} override {OVR[i['id']]} not in {ST} results  <-- CHECK"); continue
    else:
        r = max(sc, key=lambda x: difflib.SequenceMatcher(None, norm(i["name"]), norm(x["school.name"])).ratio())
        q = difflib.SequenceMatcher(None, norm(i["name"]), norm(r["school.name"])).ratio()
    yr, ins, outs = "2025-26", r.get("2025.cost.tuition.in_state"), r.get("2025.cost.tuition.out_of_state")
    if ins is None: yr, ins, outs = "2024-25", r.get("2024.cost.tuition.in_state"), r.get("2024.cost.tuition.out_of_state")
    own = {1: "public", 2: "private nonprofit", 3: "FOR-PROFIT"}.get(r.get("school.ownership"), "?")
    ok = q >= 0.9 and ins is not None
    print(f"{i['id']:24} {r['id']} {r['school.name'][:46]:46} ({own}) q={q:.2f} {yr} in={ins} out={outs}{'' if ok else '  <-- CHECK'}")
    if not ok: continue
    recs[i["id"]] = {"unitid": r["id"], "federal_name": r["school.name"], "year": yr, "in_state": ins, "out_of_state": outs,
                     "in_label": "in-district" if i["id"] in DISTRICT else "in-state",
                     "source_url": f"https://collegescorecard.ed.gov/school/?{r['id']}", "last_verified": a.today}
print(f"{len(recs)} of {len(inst)} institutions have a tuition record")
if a.write:
    head = ("  // ---- School-wide tuition (College Scorecard API; tools/state-build/add_tuition.py) ----\n"
            "  // One academic year of tuition and required fees, full-time first-time undergraduates (IPEDS). Key 2025 = 2025-26.\n"
            "  // \"in-district\" = a district college's local rate (Scorecard's resident figure). Not a nursing program price.\n")
    body = ",\n".join(f'    "{k}": ' + json.dumps(v, ensure_ascii=False) for k, v in recs.items())
    anchor = "  window.SCHOOLS = window.SCHOOLS || {};"
    assert src.count(anchor) == 1
    target.write_text(src.replace(anchor, head + f"  {ST}.tuition = {{\n{body}\n  }};\n\n" + anchor), encoding="utf-8", newline="\n")
    print("written to", target.name)
