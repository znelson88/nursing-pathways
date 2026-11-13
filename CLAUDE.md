# Nursing Pathways — notes for Claude Code

A static website that maps every nursing career path, from CNA to doctorate, with take-home pay, school cost, time and practical details for the western US. A second page shows real schools, prerequisites and transfer routes toward a chosen job in **Colorado, Arizona, California, Missouri, Washington, Oregon and Nevada**. Live at https://nursingpaths.com.

The owner is not a developer. Explain choices in plain language, show results (screenshots, a running preview) instead of describing code, and ask before big structural changes.

## Files

```
index.html          Career map page (markup only)
schools.html        Schools and programs page (route through real programs toward a job)
css/site.css        All styles for the map page; schools.css builds on its tokens
css/schools.css
js/data.js          Data + pure calculations: roles (N), edges (E), pay (PAY), taxes (FED, STAX, net),
                    cost of living (RPP), loan rates (RATE), costs (COST, STEP, ROUTES), value (VAL)
js/app.js           Everything that touches the page: tiered map, job details panel, glossary popups. Also holds some content tables (GATES, COMPETITIVE, AID,
                    LIFE, practice rules NLC/NPFPA/CRNAOPT, STARTS, GLOSS, SYN)
js/schools.js       Schools page script
data/schools/       School, program and transfer data, one file per state: co.js, az.js, ca.js, mo.js, wa.js, or.js, nv.js
docs/               SCHOOLS_SPEC.md, DATA_SOURCES.md, QA_HISTORY.md, START_PROMPT.md
tests/smoke.py      Playwright check of the main flows on laptop, phone and 200% zoom
tests/check_data.js Data rules for every data/schools/*.js file; tests/check_links.py monthly source-link check
tools/state-build/  Adding a state: BRIEF.md (research rules), build_state.py, add_tuition.py (not published)
docs/ADD_A_STATE.md Standard procedure for adding a state; docs/STATE_QUEUE.md = order (west to east) and status
```

`data.js` and `app.js` are plain (non-module) scripts, so their top-level `const`s are shared and the
site works from a double-clicked file as well as from a web server. Keep it that way unless there is a
clear reason; `fetch()` of JSON needs a server, so the schools page should either serve over HTTP
(fine once hosted) or load its data as `.js` files.

## Run it

- Quick look: open `index.html` in a browser.
- Like the hosted site: `python3 -m http.server 8000` in this folder, then open http://localhost:8000
- Test: `pip install playwright && python -m playwright install chromium && python tests/smoke.py`
- Data rules: `node tests/check_data.js` (sources, dates, ids, links between records; `--stale-days=270` lists
  records due for re-checking). Source links: `python tests/check_links.py` (honest user agent; 403s are "couldn't
  check", not broken).
- **Publishing:** GitHub Pages builds from the `Test and deploy` workflow (.github/workflows/deploy.yml): every push
  to `main` runs the data rules + smoke test and only publishes if both pass (only site files are published, not
  tests/docs). `Monthly data check` (1st of each month) opens a GitHub issue listing broken source links and
  records older than 270 days.
- **Report an error:** `REPORT_FORM` at the top of js/data.js holds the owner's Google Form address and the two
  `entry.NNNN` field ids (from the form's "Get pre-filled link"). Empty = no report links shown.

## Standing decisions (from the owner — keep these)

1. **Facts come first.** Every number has a published source or is labeled "Estimate". Never invent a
   figure, school, course, requirement or agreement. If something can't be confirmed, say so on the page.
2. **All pay is take-home (after federal, FICA and state tax).** No gross/net toggle.
3. **Cost of living** is an optional checkbox that adjusts what pay *buys*; it never changes the paycheck.
4. **The map is a six-step tiered layout** (Start here → Nursing school → RN license → Work as an RN →
   More school → Advanced roles). Lines appear only for the selected job, with its route drawn thicker.
   "Start here" shows CNA/LPN under "Optional: work first as" and, below them, what you actually need to start
   nursing school (labels, not jobs): "High school diploma or GED" (ADN, BSN, Diploma RN) and "Bachelor's degree in
   another field" (accelerated BSN, direct-entry MSN). A school route draws a solid line from its requirement;
   CNA/LPN → school lines are dotted (optional), so the map never reads "you need a CNA first" (owner, 2026-11-11).
5. **Phones:** tapping a job keeps you on the map; a "↓ details below" pill appears and the details stay at
   the bottom of the page. The owner rejected a pop-up bottom sheet and an inline summary card — don't
   bring those back without asking.
6. **Reset map** exists in two places (pinned to the map's top-right corner, and in the job details on phones).
7. **The old "route builder" with real schools was removed** because it confused people on the career map.
   Real schools belong on `schools.html` only. The map page links there with one button per job.
8. Plain language throughout, 12px minimum text, works at 200% zoom with no sideways scrolling,
   light and dark mode, reduced-motion respected.
9. **The map is the focus.** The owner removed the four quick-question buttons ("What pays most?" etc.), the
   "Show only jobs that are…" schedule filters and the Map/List toggle with the list view (2026-11-11). Don't bring
   them back without asking. Each job's details still show its schedule tags and pay.
   Later the same day the owner also removed the search box, "My situation" (state picker, "I'm starting as",
   cost-of-living toggle, the chip row and "next steps") and the "Read top to bottom" note. The map now always uses
   US-average pay and taxes; saved state/start choices from older visits are cleared. The owner may add a search bar
   back later — the old search code is in git history (before this change). The schools page keeps its own pickers.

## Data rules for the schools page

- Every school fact carries `source_url` and `last_verified` (YYYY-MM-DD), and the page shows both.
- Prefer primary sources: state boards of nursing, school catalogs and program pages, signed
  articulation agreements, IPEDS/College Navigator. Secondary sources only to find primary ones.
- Prerequisites, costs and pass rates change yearly — store the academic year they apply to.
- When sources disagree or are unclear, record it in a `notes` field and show "Check with the school".

## Current state

- Map page: done and user-tested (3 rounds, see docs/QA_HISTORY.md). Published earlier as a Claude artifact.
- Schools page: route view is built. It reads `?job=&state=&finish=&school=&start=`. `start` is the map's
  "I'm starting as" key (shown as a picker on the page too): RN holders (`adnrn`/`bsnrn`/`msnap`) get no
  starting school and a route that begins after the credentials they hold; `bach` lists schools with an
  ABSN/direct-entry program; `lpn` shows a note that LPN bridges aren't listed yet. With no `school`, the
  page opens on **"Help me choose"**: a card per starting school in the state (entry program, length, latest
  NCLEX pass rate, published cost, programs-to-goal) with sort/filter, each with "See this route". The school
  dropdown is grouped by institution type. Every route starts with a **"Your route at a glance"** strip
  linking to each step card. `costUnit()` decides whether a cost.amount is per credit / per year / whole
  program (a basis that merely mentions "credit" is not enough). Each state file ends with `XX.tuition`:
  school-wide yearly tuition from the College Scorecard API (2025-26; see docs/DATA_SOURCES.md), shown only
  for entry programs without a published price and as the comparison's fallback cost / "Lowest yearly
  tuition" sort. It uses the career map's credential
  graph (shared `to`/`byId` from data.js) to sequence credentials through the RN license, then renders a
  numbered route of real programs with prerequisites, admission, cost, NCLEX pass rates, accreditation,
  the connection to each next school, and a source link + "last checked" date on every record. Data lives
  one file per state (`data/schools/co.js`, attached to `window.SCHOOLS`). **Colorado is complete** (verified
  2026-11-05, 28 schools / 53 programs, ~27 start schools), built against the Colorado Board of Nursing's
  authoritative approved-program lists (dpo.colorado.gov/Nursing/Education — RN Associate, RN Baccalaureate,
  Direct-Entry MSN), which also supply the board-verified NCLEX pass rates stored on each program. It covers
  every board-approved, accredited pre-licensure route: all ADN community colleges, every university
  Traditional + Accelerated BSN (CU Anschutz, UCCS, UNC, CSU Pueblo, Colorado Mesa, MSU Denver, Adams State,
  Regis, Colorado Christian, AdventHealth, Concordia-Denver, Colorado Mountain, Denver College of Nursing),
  the one Direct-Entry MSN (CSU Pueblo 3+2), 8 RN-to-BSN completions, CU Anschutz's APRN specialties + UNC
  FNP, and Rocky Vista's CRNA. New interim-approval programs (Red Rocks, Community College of Aurora) are
  included and labeled. **Deliberately excluded** (private for-profit / unaccredited chains, per
  SCHOOLS_SPEC scope): Arizona College of Nursing, Grand Canyon, Galen, Concorde, Casa Loma. Community
  College of Denver is excluded too (no standalone ADN — only LPN + a transfer pathway). Not yet added: the
  LPN/CNA entry tier and LPN-to-ADN bridges (a separate layer). `open_entry:true` marks a program that admits
  anyone holding the prior credential (route offers it with no per-school agreement); same-school steps use
  `agreements` (type "internal"); a `BSNEQ` (BSN/ABSN) start skips the RN-to-BSN step. The route walks only
  the EDUCATION backbone (RN→BSN→grad), ignoring the career map's experience shortcuts, and shows "other
  verified options" per step. Unconfirmed facts and source conflicts (e.g. FRCC/Lamar accreditation and GPA)
  are shown honestly, never guessed. See docs/SCHOOLS_SPEC.md and docs/DATA_SOURCES.md.
- Arizona: built in `data/schools/az.js` (same format; attached to `window.SCHOOLS.AZ`). 15 schools / 42
  programs (verified 2026-11-05): all four universities' pre-licensure BSN + Accelerated BSN (ASU, UArizona,
  NAU, GCU) with their APRN/NP specialties (FNP, PMHNP each at 4 schools; CRNA at ASU + UArizona; CNM at
  UArizona; Adult-Gero, Peds, Women's Health) and two Direct-Entry MSNs (ASU MEPN, UArizona MEPN); the
  MaricopaNursing consortium (shared AAS at 8 metro-Phoenix colleges) plus 8 more community-college ADNs
  (Pima, Central Arizona, Eastern Arizona, Mohave, Yavapai, Arizona Western, Coconino, Cochise, Northland
  Pioneer); RN-to-BSN completions (ASU, NAU, Yavapai); and Creighton's Phoenix ABSN. Arizona's signature
  route is the **Concurrent Enrollment Program (CEP)** — earn a community-college ADN and a university BSN
  at the same time (ASU/NAU/GCU) — noted on the Maricopa ADN. The AZ Board of Nursing list/NCLEX table sit
  behind Cloudflare, so facts (incl. each school's own published pass rate) come from the schools' own
  sites. Excluded (private for-profit): Arizona College of Nursing, Chamberlain, West Coast University;
  GCU is included and labeled (its nonprofit status is contested). AZ uses many entrance exams (HESI, TEAS,
  NLN, Kaplan). See docs/DATA_SOURCES.md.
- California: built in `data/schools/ca.js` (attached to `window.SCHOOLS.CA`; loaded by schools.html).
  **24 schools / 61 programs** (verified 2026-11-06, in two waves plus later additions) — larger than CO or AZ. Wave 1: the CSU
  pre-licensure BSN backbone (Long Beach, San Diego State, Sacramento State, SF State, Fullerton) + Fullerton
  Accelerated BSN + SF State Entry-Level Master's; three community-college ADNs; five RN-to-BSN completions.
  Wave 2: UCLA, UC Irvine, UCSF, UC Davis, Samuel Merritt, Loma Linda, USF, USD, Azusa Pacific and five more
  community-college ADNs (Santa Rosa, Sacramento City, Fresno City, Mt. SAC, Riverside), adding the graduate
  APRN layer — FNP, PMHNP, Adult-Gero primary/acute, Peds, Neonatal NP, CNS, Nurse-Midwifery (UCSF, ACME-
  conditional) and CRNA (Samuel Merritt, Loma Linda, UC Davis). WHNP has no open California program yet (routes
  fall back out of state, flagged). Paused/pending and excluded: UCSF MEPN (paused) and MS (closed), SDSU ASBSN. Built from the **California BRN
  approved-program list** (rn.ca.gov/education/rnprograms.shtml) and the **BRN by-school NCLEX pass-rate table**
  (rn.ca.gov/education/passrates.shtml); ASSIST.org for CC→CSU/UC transfer. **California is NOT an NLC state** —
  the cross-state hand-off tells movers they need licensure by endorsement; CA RN-to-BSN programs require a CA
  RN license and several online ones are CA-residents-only (noted on each card). Excluded (for-profit /
  unaccredited chains, per scope): West Coast, Chamberlain, Carrington, Unitek, Stanbridge, Gurnick, Arizona
  College of Nursing, etc.; SDSU's Accelerated 2nd-Bachelor's (pending BRN/CCNE approval) and SF State's
  concurrent ADN-BSN are not yet included. **California State University, Fresno ("Fresno State")** was
  added 2026-11-06 — pre-licensure BSN (impacted; BRN-approved, CCNE), RN-to-BSN, and the MSN Family NP
  option. Its PMHNP and FNP post-master's certificates require an already-licensed NP, so they're add-on
  certs, not entry routes, and were deliberately left out; Fresno City College (the community-college ADN)
  was already a separate institution. `NLC` (compact member states) moved from app.js to data.js so the
  schools page shares it. Later waves: UC + private universities, more community-college ADNs by region, and
  APRN/CRNA/CNM specialties.
- Missouri: built in `data/schools/mo.js` (`window.SCHOOLS.MO`), **47 schools / 168 programs / 58 agreements**
  (verified 2026-11-11) from the Missouri State Board of Nursing roster and its per-program NCLEX reports (2023-2025).
  Introduces `bridge_from` on LPN/paramedic bridge programs (shown only to "LPN / LVN" starters). Missouri is an NLC
  state. Exclusions and gaps are in docs/DATA_SOURCES.md. `MO.tuition` covers 43 schools (the rest are explained in DATA_SOURCES). The career
  map's pay-state list has no Missouri (no BLS pay data there yet), so map links don't preselect Missouri.
- Washington: built in `data/schools/wa.js` (`window.SCHOOLS.WA`), **44 schools / 91 programs / 17 agreements**
  (verified 2026-11-11) from the Washington State Board of Nursing roster (Nov 9, 2026) and its NCLEX school report
  (2023-2025). 28 community/technical colleges (many offer LPN bridges and their own RN-to-BSN), UW/WSU/EWU and the
  private nonprofits (Gonzaga CRNA, Seattle U and UW midwifery). NLC state. `WA.tuition` covers 43 schools.
  Exclusions and gaps are in docs/DATA_SOURCES.md.
- Oregon: built in `data/schools/or.js` (`window.SCHOOLS.OR`), **27 schools / 50 programs / 17 agreements**
  (verified 2026-11-12) from the Oregon State Board of Nursing approved-programs list and its NCLEX pass-rate PDF
  (2023-2025, OHSU shown by campus). 17 community colleges (OCNE co-admission to OHSU; seven now award their own RN-to-BSN),
  OHSU's six campuses and DNP APRN programs, and the private nonprofits. Not an NLC state. `OR.tuition` covers 23
  schools. Exclusions and gaps are in docs/DATA_SOURCES.md.
- Nevada: built in `data/schools/nv.js` (`window.SCHOOLS.NV`), **9 schools / 31 programs / 6 agreements**
  (verified 2026-11-13) from the Nevada State Board of Nursing program list (Sept 23, 2026) and its yearly NCSBN program
  reports (2023-2025). Four community/state colleges (CSN, TMCC and GBC run their own RN-to-BSN), Nevada State, UNLV
  (incl. Direct Entry MSN, CNM, CRNA), UNR (Reno + Lake Tahoe), Roseman and Touro (graduate/RN-to-BSN only). About
  40% of Nevada's 2025 first-time NCLEX-RN takers came from excluded for-profit schools. Not an NLC state. `NV.tuition` covers 7
  schools. Exclusions and gaps are in docs/DATA_SOURCES.md.
- **Adding states:** a scheduled task ("Add next state", 8am and 4pm) follows docs/ADD_A_STATE.md and opens one
  pull request per state for the owner to review and merge; it never merges or pushes to main. The state list lives
  in `SCHOOL_STATES` (js/data.js) plus one `<script>` tag in schools.html.
- Hosting: live at https://nursingpaths.com (GitHub Pages, repo znelson88/nursing-pathways, published by the
  `Test and deploy` workflow after each push to `main` passes its checks). See README.md.
