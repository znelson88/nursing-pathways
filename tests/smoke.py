"""Smoke test for Nursing Pathways. Run from the project folder: python tests/smoke.py
Starts a local server, then checks the main flows on a laptop, a phone and at 200% zoom."""
import http.server, threading, functools, pathlib, sys
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT)))
threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = f"http://127.0.0.1:{srv.server_port}"
fails = []
def check(name, ok):
    print(("PASS " if ok else "FAIL ") + name)
    if not ok: fails.append(name)

with sync_playwright() as p:
    import os
    exe = os.environ.get("CHROME_PATH")
    b = p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()
    errs = []
    d = b.new_page(viewport={"width": 1360, "height": 900}); d.on("pageerror", lambda e: errs.append(str(e)))
    d.goto(BASE + "/index.html"); d.evaluate("()=>{localStorage.clear();localStorage.setItem('np-welcomed','1')}"); d.reload(); d.wait_for_timeout(500)
    check("map has 64 chips", d.evaluate("()=>document.querySelectorAll('#tiers .rchip').length") == 64)
    for q, want in [("nurse practicioner", "NP"), ("psychiatric nurse practitioner", "Psych"), ("loans", "Ways to pay"), ("colorado", "Colorado"), ("corpsman", "ADN")]:
        d.fill("#q", q); d.wait_for_timeout(40)
        first = d.evaluate("()=>{const e=document.querySelector('#qres .qopt');return e?e.innerText:''}")
        check(f"search '{q}' -> {want}", want in first)
    d.fill("#q", "")
    d.click('.rchip[data-id="crna"]'); d.wait_for_timeout(200)
    check("CRNA route drawn", d.evaluate("()=>curRoute.nodes.includes('rn')&&document.querySelectorAll('#tlines path').length>0"))
    href = d.get_attribute(".schoolsbtn", "href") or ""
    check("schools button links with job", "schools.html?job=crna" in href)
    d.click(".schoolsbtn"); d.wait_for_timeout(400)
    check("schools page opens for CRNA", "Nurse anesthetist" in d.inner_text("h1"))
    # A job with no verified Colorado program (Neonatal NP isn't offered here) must say so honestly.
    d.goto(BASE + "/schools.html?job=nnp&state=CO"); d.wait_for_timeout(400)
    check("schools: no-data job shows honest 'not verified yet' gap (no made-up program)",
          "don't have a verified" in d.inner_text("#route"))
    # Verified Colorado route view: Trinidad State -> Family NP
    d.goto(BASE + "/schools.html?job=fnp&state=CO"); d.wait_for_timeout(400)
    check("schools route: three program steps", d.evaluate("()=>document.querySelectorAll('#route .step').length") == 3)
    check("schools route: starts at Trinidad ADN", "Associate Degree Nursing" in d.inner_text("#route"))
    check("schools route: RN-license milestone shown", d.evaluate("()=>!!document.querySelector('#route .milestone')"))
    check("schools route: reaches an FNP program", "Family Nurse Practitioner" in d.inner_text("#route"))
    check("schools route: offers alternative options", d.evaluate("()=>!!document.querySelector('#route .alts')"))
    check("schools route: every program card cites a source",
          d.evaluate("()=>[...document.querySelectorAll('#route .pcard')].every(c=>!!c.querySelector('.src a'))"))
    # CRNA now reaches a real, verified program (Rocky Vista), not the 'not verified' gap.
    d.goto(BASE + "/schools.html?job=crna&state=CO"); d.wait_for_timeout(400)
    check("schools route: CRNA reaches the Rocky Vista program", "Nurse Anesthesia Practice" in d.inner_text("#route"))
    # Starting at a 4-year BSN school keeps the selection and skips the RN-to-BSN step.
    d.goto(BASE + "/schools.html?job=fnp&state=CO"); d.wait_for_timeout(300)
    d.select_option("#startSchool", label="Colorado Mesa University"); d.wait_for_timeout(300)
    check("schools route: BSN start keeps its dropdown selection",
          d.eval_on_selector("#startSchool", "el=>el.value") == "colorado-mesa")
    check("schools route: BSN start skips the RN-to-BSN step",
          d.evaluate("()=>{const h=[...document.querySelectorAll('#route .step .pchead h3')].map(x=>x.textContent);return h[0].includes('Traditional BSN') && !h.some(t=>/RN-to-BSN|RN-BSN/.test(t))}"))
    # Arizona dataset loads and routes (separate per-state file)
    d.goto(BASE + "/schools.html?job=fnp&state=AZ"); d.wait_for_timeout(400)
    check("schools AZ: dataset loaded with many start schools",
          d.evaluate("()=>document.querySelectorAll('#startSchool option').length") >= 10)
    check("schools AZ: route renders program steps", d.evaluate("()=>document.querySelectorAll('#route .step').length") >= 2)
    check("schools AZ: reaches an FNP program", "Family Nurse Practitioner" in d.inner_text("#route"))
    d.goto(BASE + "/schools.html?job=pmhnp&state=AZ"); d.wait_for_timeout(300)
    d.select_option("#startSchool", label="Pima Community College"); d.wait_for_timeout(300)
    check("schools AZ: ADN start reaches a Psych NP program",
          "Psychiatric Mental Health" in d.inner_text("#route") and d.evaluate("()=>!!document.querySelector('#route .milestone')"))
    # A job offered in no covered state is still honest: no made-up program, and it names coverage.
    d.goto(BASE + "/schools.html?job=nnp&state=AZ"); d.wait_for_timeout(300)
    txt = d.inner_text("#route")
    check("schools: unavailable job gives honest no-data gap naming both states",
          "don't have a verified" in txt and "Colorado and Arizona" in txt)
    # Cross-state: arriving in one state, you can still start at a school in another.
    d.goto(BASE + "/schools.html?job=fnp&state=AZ"); d.wait_for_timeout(400)
    az_only = d.evaluate("()=>document.querySelectorAll('#startSchool option').length")
    check("schools: filter offers All states + CO + AZ",
          d.evaluate("()=>{const v=[...document.querySelectorAll('#state option')].map(o=>o.value);return v.includes('ALL')&&v.includes('CO')&&v.includes('AZ')}"))
    d.select_option("#state", "ALL"); d.wait_for_timeout(300)
    all_count = d.evaluate("()=>document.querySelectorAll('#startSchool option').length")
    check("schools: 'All states' lists more start schools than one state alone", all_count > az_only)
    check("schools: start-school options are state-labeled under All states",
          d.evaluate("()=>[...document.querySelectorAll('#startSchool option')].some(o=>/— Colorado$/.test(o.textContent))"))
    # Switch the filter to Colorado (from an Arizona arrival) and get a real Colorado route.
    d.select_option("#state", "CO"); d.wait_for_timeout(300)
    check("schools: CO filter from AZ arrival builds a Colorado route with a state badge",
          d.evaluate("()=>document.querySelectorAll('#route .step').length") >= 2 and "Colorado" in d.inner_text("#route"))
    check("schools: program cards carry a state badge", d.evaluate("()=>!!document.querySelector('#route .pcard .pstate')"))
    m = b.new_page(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True); m.on("pageerror", lambda e: errs.append(str(e)))
    m.goto(BASE + "/index.html"); m.evaluate("()=>{localStorage.clear();localStorage.setItem('np-welcomed','1')}"); m.reload(); m.wait_for_timeout(500)
    m.locator('.rchip[data-id="fnp"]').scroll_into_view_if_needed(); y = m.evaluate("()=>scrollY")
    m.locator('.rchip[data-id="fnp"]').tap(); m.wait_for_timeout(400)
    check("phone: tap keeps place", abs(m.evaluate("()=>scrollY") - y) < 5)
    check("phone: details pill shows", m.is_visible("#nudge"))
    m.tap("#nudge"); m.wait_for_timeout(900)
    check("phone: pill scrolls to details", m.evaluate("()=>panel.getBoundingClientRect().top") < 200)
    for w in (195, 320):
        z = b.new_page(viewport={"width": w, "height": 500}); z.goto(BASE + "/index.html"); z.wait_for_timeout(400)
        z.evaluate("()=>{select('fnp');panel.querySelector('[data-tab=money]').click()}"); z.wait_for_timeout(100)
        check(f"no sideways scroll at {w}px", z.evaluate("()=>document.documentElement.scrollWidth-innerWidth") <= 0)
    check("no script errors", not errs)
    if errs: print(errs)
    b.close()
srv.shutdown()
sys.exit(1 if fails else 0)
