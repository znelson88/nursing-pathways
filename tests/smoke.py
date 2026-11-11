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
    d.goto(BASE + "/index.html"); d.evaluate("()=>{localStorage.clear()}"); d.reload(); d.wait_for_timeout(500)
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
    # A job with no verified program in any covered state (Emergency NP) must say so honestly.
    d.goto(BASE + "/schools.html?job=enp&state=CO"); d.wait_for_timeout(400)
    check("schools: no-data job shows honest 'not verified yet' gap (no made-up program)",
          "don't have a verified" in d.inner_text("#route"))
    # No school picked yet -> "Help me choose" compares every starting school in the state.
    d.goto(BASE + "/schools.html?job=fnp&state=CO"); d.wait_for_timeout(400)
    check("schools compare: opens on 'help me choose' with a card per Colorado start school",
          d.eval_on_selector("#startSchool", "el=>el.value") == "" and d.evaluate("()=>document.querySelectorAll('#route .ccard').length") >= 20)
    check("schools compare: school list grouped by type", d.evaluate("()=>document.querySelectorAll('#startSchool optgroup').length") >= 2)
    check("schools compare: no broken numbers", not any(x in d.inner_text("#route") for x in ["NaN", "Infinity", "undefined"]))
    check("schools compare: sorted by pass rate, highest first",
          d.evaluate("()=>{const v=[...document.querySelectorAll('#route .ccard')].map(c=>{const m=(c.querySelector('.cstats div:nth-child(3) dd').innerText.match(/\d+(?=%)/g)||[]).map(Number);return m.length?m.reduce((a,b)=>a+b)/m.length:-1});return v.every((x,i)=>i===0||x<=v[i-1])}"))
    d.select_option('[data-cmp="type"]', "cc"); d.wait_for_timeout(200)
    check("schools compare: 'Community colleges' filter shows only community colleges",
          d.evaluate("()=>[...document.querySelectorAll('#route .ccard .pinst')].every(p=>/Community college/.test(p.textContent))"))
    d.select_option('[data-cmp="type"]', "all"); d.wait_for_timeout(200)
    d.click('#route [data-pick="trinidad-state"]'); d.wait_for_timeout(300)
    check("schools compare: 'See this route' picks the school", d.eval_on_selector("#startSchool", "el=>el.value") == "trinidad-state")
    check("schools route: at-a-glance summary links to every step",
          d.evaluate("()=>document.querySelectorAll('#route .glance a').length===document.querySelectorAll('#route .step').length && document.querySelectorAll('#route .step').length>0"))
    d.click("#route .tocmp"); d.wait_for_timeout(300)
    check("schools route: 'Compare all' returns to the comparison", d.evaluate("()=>document.querySelectorAll('#route .ccard').length") >= 20)
    d.goto(BASE + "/schools.html?job=rn&state=CO&school=pikes-peak"); d.wait_for_timeout(300)
    check("schools: a full-program cost isn't labeled per credit", "$19,733/credit" not in d.inner_text("#route"))
    # School-wide tuition (College Scorecard) fills the cost gap, labeled and sourced.
    d.goto(BASE + "/schools.html?job=fnp&state=CA"); d.wait_for_timeout(400)
    check("schools tuition: nearly every California start school shows a cost",
          d.evaluate("()=>[...document.querySelectorAll('#route .ccard')].filter(c=>/Not published/.test(c.querySelector('.cstats div:nth-child(4) dd').innerText)).length") <= 2)
    d.select_option('[data-cmp="sort"]', "tuition"); d.wait_for_timeout(200)
    check("schools tuition: 'Lowest yearly tuition' puts a community college first",
          "Community college" in d.inner_text("#route .ccard .pinst"))
    d.goto(BASE + "/schools.html?job=fnp&state=CO&school=trinidad-state"); d.wait_for_timeout(400)
    check("schools tuition: entry card shows school-wide tuition with a Scorecard source",
          d.evaluate("()=>{const t=document.querySelector('#route .tuit');return !!t && /\$4,618/.test(t.innerText) && !!t.querySelector('a[href*=\"collegescorecard.ed.gov\"]')}"))
    check("schools tuition: not shown on graduate program cards",
          d.evaluate("()=>document.querySelectorAll('#route .tuit').length")==1)
    d.select_option("#startState", "AZ"); d.wait_for_timeout(300)
    check("schools: finish state follows the starting state", d.eval_on_selector("#finishState", "el=>el.value") == "AZ")
    # "Report an error": hidden until the Google Form is configured, then pre-filled with the record and page.
    d.goto(BASE + "/schools.html?job=fnp&state=CO&school=trinidad-state"); d.wait_for_timeout(300)
    check("report link hidden while no form is configured", d.evaluate("()=>!document.querySelector('#route a.report')"))
    d.evaluate("()=>{REPORT_FORM.url='https://docs.google.com/forms/d/e/TEST/viewform';REPORT_FORM.recordField='entry.111';REPORT_FORM.pageField='entry.222';document.getElementById('job').dispatchEvent(new Event('change'))}")
    d.wait_for_timeout(200)
    href = d.evaluate("()=>{const a=document.querySelector('#route .pcard a.report');return a?a.href:''}")
    check("report link pre-fills the program and the page link",
          href.startswith("https://docs.google.com/forms/d/e/TEST/viewform?usp=pp_url") and "entry.111=" in href
          and "Trinidad" in __import__("urllib.parse").parse.unquote_plus(href) and "entry.222=http" in href)
    # Verified Colorado route view: Trinidad State -> Family NP
    d.goto(BASE + "/schools.html?job=fnp&state=CO&school=trinidad-state"); d.wait_for_timeout(400)
    check("schools route: three program steps", d.evaluate("()=>document.querySelectorAll('#route .step').length") == 3)
    check("schools route: starts at Trinidad ADN", "Associate Degree Nursing" in d.inner_text("#route"))
    check("schools route: RN-license milestone shown", d.evaluate("()=>!!document.querySelector('#route .milestone')"))
    check("schools route: reaches an FNP program", "Family Nurse Practitioner" in d.inner_text("#route"))
    check("schools route: offers alternative options", d.evaluate("()=>!!document.querySelector('#route .alts')"))
    check("schools route: every program card cites a source",
          d.evaluate("()=>[...document.querySelectorAll('#route .pcard')].every(c=>!!c.querySelector('.src a'))"))
    # CRNA now reaches a real, verified program (Rocky Vista), not the 'not verified' gap.
    d.goto(BASE + "/schools.html?job=crna&state=CO&school=trinidad-state"); d.wait_for_timeout(400)
    check("schools route: CRNA reaches the Rocky Vista program", "Nurse Anesthesia Practice" in d.inner_text("#route"))
    # Starting at a 4-year BSN school keeps the selection and skips the RN-to-BSN step.
    d.goto(BASE + "/schools.html?job=fnp&state=CO"); d.wait_for_timeout(300)
    d.select_option("#startSchool", "colorado-mesa"); d.wait_for_timeout(300)
    check("schools route: BSN start keeps its dropdown selection",
          d.eval_on_selector("#startSchool", "el=>el.value") == "colorado-mesa")
    check("schools route: BSN start skips the RN-to-BSN step",
          d.evaluate("()=>{const h=[...document.querySelectorAll('#route .step .pchead h3')].map(x=>x.textContent);return h[0].includes('Traditional BSN') && !h.some(t=>/RN-to-BSN|RN-BSN/.test(t))}"))
    # "I'm starting as" (?start= from the map) changes where the route begins.
    d.goto(BASE + "/index.html"); d.wait_for_timeout(300)
    d.evaluate("()=>{localStorage.setItem('np-start','adnrn')}"); d.reload(); d.wait_for_timeout(400)
    d.click('.rchip[data-id="fnp"]'); d.wait_for_timeout(200)
    check("map passes starting point to schools page", "start=adnrn" in (d.get_attribute(".schoolsbtn", "href") or ""))
    d.evaluate("()=>{localStorage.clear()}")
    d.goto(BASE + "/schools.html?job=fnp&state=CO&start=adnrn"); d.wait_for_timeout(400)
    check("schools start=adnrn: picker shows ADN RN, school picker disabled",
          d.eval_on_selector("#startAs", "el=>el.value") == "adnrn" and d.eval_on_selector("#startSchool", "el=>el.disabled"))
    check("schools start=adnrn: route begins at RN-to-BSN, no NCLEX milestone",
          d.evaluate("()=>{const h=[...document.querySelectorAll('#route .step .pchead h3')].map(x=>x.textContent);return /RN-to-BSN/.test(h[0]) && !document.querySelector('#route .milestone')}"))
    d.goto(BASE + "/schools.html?job=fnp&state=CO&start=bsnrn"); d.wait_for_timeout(400)
    check("schools start=bsnrn: one step, straight to an FNP program",
          d.evaluate("()=>document.querySelectorAll('#route .step').length") == 1 and "Family Nurse Practitioner" in d.inner_text("#route"))
    d.goto(BASE + "/schools.html?job=icu&state=CO&start=adnrn"); d.wait_for_timeout(400)
    check("schools start=adnrn + ICU goal: says no more school needed", "No more school needed" in d.inner_text("#route"))
    d.goto(BASE + "/schools.html?job=fnp&state=CO&start=bach"); d.wait_for_timeout(400)
    check("schools start=bach: only schools with an accelerated or direct-entry start are compared",
          d.evaluate("()=>{const c=[...document.querySelectorAll('#route .ccard')];return c.length>0 && c.every(x=>/Accelerated BSN|Direct-entry MSN/.test(x.innerText))}"))
    d.goto(BASE + "/schools.html?job=fnp&state=CO&start=lpn"); d.wait_for_timeout(400)
    check("schools start=lpn: honest note about bridge programs", "LPN-to-RN bridge" in d.inner_text("#route"))
    check("schools header names all covered states", "California" in (d.text_content("#covered") or ""))
    # Arizona dataset loads and routes (separate per-state file)
    d.goto(BASE + "/schools.html?job=fnp&state=AZ&school=asu"); d.wait_for_timeout(400)
    check("schools AZ: dataset loaded with many start schools",
          d.evaluate("()=>document.querySelectorAll('#startSchool option').length") >= 10)
    check("schools AZ: route renders program steps", d.evaluate("()=>document.querySelectorAll('#route .step').length") >= 2)
    check("schools AZ: reaches an FNP program", "Family Nurse Practitioner" in d.inner_text("#route"))
    d.goto(BASE + "/schools.html?job=pmhnp&state=AZ"); d.wait_for_timeout(300)
    d.select_option("#startSchool", "pima"); d.wait_for_timeout(300)
    check("schools AZ: ADN start reaches a Psych NP program",
          "Psychiatric Mental Health" in d.inner_text("#route") and d.evaluate("()=>!!document.querySelector('#route .milestone')"))
    # A job offered in no covered state is still honest: no made-up program, and it names coverage.
    d.goto(BASE + "/schools.html?job=enp&state=AZ"); d.wait_for_timeout(300)
    txt = d.inner_text("#route")
    check("schools: unavailable job gives honest no-data gap naming all covered states",
          "don't have a verified" in txt and "Colorado, Arizona and California" in txt)
    # Start/finish state model: a starting state that cascades the school list, and a finishing state.
    d.goto(BASE + "/schools.html?job=fnp&state=AZ"); d.wait_for_timeout(400)
    check("schools: start and finish state selectors offer CO + AZ",
          d.evaluate("()=>{const g=id=>[...document.querySelectorAll('#'+id+' option')].map(o=>o.value);const s=g('startState'),f=g('finishState');return s.includes('CO')&&s.includes('AZ')&&f.includes('CO')&&f.includes('AZ')}"))
    az_starts = d.evaluate("()=>document.querySelectorAll('#startSchool option').length")
    check("schools: starting-school list is limited to the starting state", az_starts >= 10)
    # Change the starting state -> the school list cascades to the other state's schools.
    d.select_option("#startState", "CO"); d.wait_for_timeout(300)
    co_starts = d.evaluate("()=>document.querySelectorAll('#startSchool option').length")
    check("schools: changing starting state cascades the school list", co_starts >= 2 and co_starts != az_starts)
    d.select_option("#startSchool", "trinidad-state"); d.wait_for_timeout(300)
    check("schools: CO start builds a Colorado route with a state badge",
          d.evaluate("()=>document.querySelectorAll('#route .step').length") >= 2 and "Colorado" in d.inner_text("#route"))
    check("schools: program cards carry a state badge", d.evaluate("()=>!!document.querySelector('#route .pcard .pstate')"))
    # Cross-state transfer: start in Colorado, finish in Arizona -> a handoff after the RN license.
    d.goto(BASE + "/schools.html?job=fnp&state=CO&finish=AZ&school=trinidad-state"); d.wait_for_timeout(400)
    rt = d.inner_text("#route")
    check("schools: cross-state plan shows a move-to-finish handoff",
          d.evaluate("()=>!!document.querySelector('#route .agr.handoff')"))
    check("schools: handoff cites the compact license carry-over", "Nurse Licensure Compact" in rt)
    check("schools: after the handoff a program lands in the finish state (Arizona)",
          d.evaluate("()=>[...document.querySelectorAll('#route .step .pcard .pstate')].some(b=>b.textContent.trim()==='Arizona')"))
    # California dataset (wave 1): loads, lists start schools, and routes.
    d.goto(BASE + "/schools.html?job=fnp&state=CA&school=csulb"); d.wait_for_timeout(400)
    check("schools CA: dataset loaded with start schools",
          d.evaluate("()=>document.querySelectorAll('#startSchool option').length") >= 8)
    check("schools CA: route renders program steps and the RN-license milestone",
          d.evaluate("()=>document.querySelectorAll('#route .step').length") >= 2 and d.evaluate("()=>!!document.querySelector('#route .milestone')"))
    check("schools CA: program cards carry a California state badge",
          d.evaluate("()=>[...document.querySelectorAll('#route .step .pcard .pstate')].some(b=>b.textContent.trim()==='California')"))
    # California is NOT a compact state: a Colorado->California plan must flag licensure by endorsement.
    d.goto(BASE + "/schools.html?job=fnp&state=CO&finish=CA&school=trinidad-state"); d.wait_for_timeout(400)
    ca_rt = d.inner_text("#route")
    check("schools CA: non-compact hand-off flags licensure by endorsement",
          d.evaluate("()=>!!document.querySelector('#route .agr.handoff')") and "endorsement" in ca_rt)
    # Wave 2: California now resolves NP goals in-state (last step lands in California, not out of state).
    d.goto(BASE + "/schools.html?job=fnp&state=CA&finish=CA&school=csulb"); d.wait_for_timeout(400)
    check("schools CA: FNP goal resolves to an in-state California program",
          d.evaluate("()=>{const b=[...document.querySelectorAll('#route .step .pcard .pstate')];return b.length && b[b.length-1].textContent.trim()==='California'}")
          and d.evaluate("()=>/Family Nurse Practitioner/.test(document.querySelector('#route').innerText)"))
    m = b.new_page(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True); m.on("pageerror", lambda e: errs.append(str(e)))
    m.goto(BASE + "/index.html"); m.evaluate("()=>{localStorage.clear()}"); m.reload(); m.wait_for_timeout(500)
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
