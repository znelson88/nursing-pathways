# Data sources (career map)

Update this file whenever a figure in `js/data.js` or `js/app.js` changes. The page footer lists the
same sources with links.

| What | Source | Where in code |
|---|---|---|
| Pay (annual state medians, 13 western states + US) | BLS Occupational Employment and Wage Statistics (OEWS) 2025, read through AmericaByNumbers pages for each occupation | `PAY` in data.js |
| Pay gaps | BLS publishes no figure for Colorado, Hawaii or Nevada for some occupations; Colorado uses a labeled third-party estimate. New Mexico and Utah figures that looked anomalous are left out (noted in `PAY.gap`). | `PAY` |
| Specialties without their own BLS figure | Shown with the RN figure and grouped as "paid like RNs" | `P`, `RNnote` |
| Federal income tax | IRS 2026 brackets and standard deduction | `FED`, `fedTax` |
| FICA | 2026 Social Security wage base and Medicare rates | `fica` |
| State income tax | Tax Foundation, 2026 state individual income tax rates and deductions | `STAX` |
| Cost of living | BEA Regional Price Parities 2024 (released Feb 2026), all items | `RPP` |
| Loan interest | Federal Direct loan rates for 2026–27 (undergraduate 6.52%, graduate 8.07%), 10-year standard repayment | `RATE`, `pmt` |
| School costs | Ranges built from published tuition (CU Anschutz, Pikes Peak State College ADN estimate, CCD nurse aide, NAU, Fresno State, UCCS WUE) and labeled "Estimate" where they are ranges rather than one school's price | `COST`, `STEP`, `NPCOST` |
| Job growth | BLS Employment Projections 2025–35 | `GROWTH` |
| Practice rules (NP full practice, CRNA opt-out, Nurse Licensure Compact) | State boards / AANP / NCSBN, as of late 2026 | `NPFPA`, `CRNAOPT` in app.js; `NLC` in data.js (shared with the schools page) |
| Aid programs (NURSE Corps, PSLF, state repayment, military, VA) | HRSA, Federal Student Aid, state programs | `AID` in app.js |

Fact-check history: four independent review passes corrected national medians, 2024 RPP values, several
state tax rules (Hawaii, Arizona, Utah, Oregon), CRNA program availability in Colorado, credential names,
NURSE Corps eligibility, PSLF wording and California NP rules. Re-check anything time-sensitive once a year.

# Data sources (schools page — Colorado)

Colorado is **complete**: 28 schools / 53 programs (verified 2026-11-05). Each record in
`data/schools/co.js` carries its own `source_url` and `last_verified` — that file is the authoritative
per-fact log; the tables below are an early school-level summary (not every school is tabulated). All
facts come from each institution's own website (ranking/aggregator sites were not used).

**The master roster** is the Colorado Board of Nursing's approved-program lists at
`dpo.colorado.gov/Nursing/Education` (RN Approved Programs — Associate; — Baccalaureate; Direct-Entry MSN).
Those lists define the complete universe of board-approved RN programs and also provide the **board-verified
first-time NCLEX-RN pass rates** stored on most program records (source_url = the DPO page). We included
every board-approved, accredited (or interim-approved public) pre-licensure program and all RN-to-BSN,
graduate/APRN and CRNA programs found. "**" on the board lists = interim approval (a new program); those
(Red Rocks, Community College of Aurora) are included and labeled as such.

**Starting schools (ADN → RN):**
| School | Key facts | Primary source |
|---|---|---|
| Trinidad State College | ADN 4 sem; prereqs ENG 1021/PSY 2440/BIO 2101; HESI; points; 3.0/2.5 GPA; ACEN + CO Board; NCLEX by campus 2022–25 (CO DORA) | trinidadstate.edu/nursing (+ /nursing/nursing-admission-information.html) |
| Pikes Peak State College | AAS 56.5 cr; TEAS; points (max 73); 2.5 GPA; tuition ~$19,733 (2025-26); NCLEX by term; ACEN | pikespeak.edu/programs/nursing/adn/* (cost & pass-rate PDFs) |
| Pueblo Community College | AAS 70 cr; TEAS v7; 100-pt scoring; 2.80 GPA; tuition w/COF ~$17,263 (2026-27); 2024 NCLEX 92.63% (all campuses); ACEN + HLC + Board | pueblocc.edu/programs/nur (+ /document/adn-application-process, cost sheet) |
| Front Range Community College | AAS 71.5 cr; HESI A-2 (80%); top-40 ranked; 3.0 GPA; 2024 NCLEX 99% (CO Board); ACEN; ADN cost not published | frontrange.edu/.../nursing-program/* |
| Arapahoe Community College | Nursing AAS; HESI A2 (70%); points (max 80); 3.0 GPA; per-credit $392–504 (2026-27); NCLEX 2023–25; ACEN + CO Board | arapahoe.edu/nursing/nursing-aas-rn |

**Entry-level (pre-licensure) BSN — the "direct BSN" way in (no prior RN needed):**
| School | Key facts | Primary source |
|---|---|---|
| MSU Denver (Traditional) | 4-term pre-licensure BSN; Casper exam; 2.75 prereq GPA; ~$42,206 est; NCLEX 97% (2025); CCNE + CO Board | msudenver.edu/nursing/traditional-and-accelerated-nursing-options/ |
| MSU Denver (Accelerated) | 2nd-degree BSN, 4 terms w/ summer; Casper; 2.75 GPA; NCLEX 90% (2025); CCNE + CO Board | (same) |
| Colorado Mesa University | Traditional BSN, Grand Junction; no TEAS/HESI; points + interview; 3.0 GPA; CCNE; NCLEX "~90%" undated | catalog.coloradomesa.edu/areas-study/nursing/nursing-bsn/ |
| Regis University (Traditional) | 4-yr BSN, Denver (private); $48,490/yr 2026-27; CCNE | regis.edu/.../nursing-bsn |
| Regis University (Accelerated) | 12-mo 2nd-degree BSN; 2.75 GPA; no std exam; $599/cr (2026); CCNE | regis.edu/.../nursing-bsn-accelerated (re-verified live) |

**RN-to-BSN completions (open to any accredited ADN + RN):** Trinidad (CCNE), Pikes Peak (CCNE), Pueblo CC
(CCNE, w/COF ~$16,102), Front Range (accreditation conflict — CCNE vs ACEN across its own pages, flagged on
the card), Arapahoe (ACEN, $535/cr, decision wording inconsistent on ACC pages), CSU Pueblo (ACEN, $440/cr
2026-27), UCCS (CCNE, $367/cr, 126 cr), MSU Denver (CCNE, ~$326/cr res 2026-27). Sources: each school's
RN-BSN page (see the records).

**Deliberately excluded (per SCHOOLS_SPEC scope — private for-profit / unaccredited chains):** Arizona
College of Nursing (Aurora), Grand Canyon University (Englewood ABSN), Galen College, Concorde Career
College, and Casa Loma College. These appear on the Board list but are private for-profit and/or only on
interim/candidate status without accreditation; left out pending a decision to include for-profit schools.
**Community College of Denver** is also excluded — it has no standalone ADN or RN-to-BSN (only LPN, an
LPN-to-BSN bridge, and a transfer pathway to CU), so listing an ADN would invent a program.

**Not yet added (a separate layer):** the LPN/CNA entry tier and LPN-to-ADN / Paramedic-to-ADN bridges
(several schools offer these). The current dataset covers the ADN / BSN / Accelerated BSN / Direct-Entry MSN
routes to RN, the RN-to-BSN completions, and the graduate/APRN + CRNA programs.

**Source conflicts surfaced, not resolved by guessing:** Front Range RN-BSN accreditor (CCNE vs ACEN across
its own pages); Lamar ADN minimum GPA (2.75 vs 2.5); several schools' internally inconsistent credit totals,
cohort sizes or application dates; AG-CNS possible pause; UNC second-degree delivery format. Each is shown on
the page as a conflict or "check with the school." Board-listed dead link (denverschoolofnursing.edu)
corrected to the live site (denvercollegeofnursing.edu). Re-verify school facts before each academic year.

**Graduate / advanced practice:** CU Anschutz BS-to-DNP specialties — FNP, Adult-Gero Acute & Primary Care,
PMHNP, Women's Health, Peds, AG-CNS, Nurse-Midwifery — all CCNE; shared admission BSN + unrestricted RN
license + 3.0 GPA; per-credit $820 res / $1,330 non-res (2026-27); credit counts confirmed for FNP(56)/
AG-ACNP(47)/PMHNP(52)/Midwifery(59), others not. CU does **not** offer Neonatal NP or CRNA. UNC DNP FNP
($802/cr). CRNA: Rocky Vista University DNAP (COA-accredited, Colorado campus) — the one verified CO
nurse-anesthesia program; most fields still need confirmation. Sources: nursing.cuanschutz.edu program/
admission/tuition pages + student handbook (CCNE); extended.unco.edu; rvu.edu.

Shown on the page as "Not published / Check with the school" where a primary source didn't confirm it:
Trinidad/Pikes Peak/FRCC single ADN tuition figures; Pikes Peak RN-BSN admission/cost/credits; UNC
accreditation/GPA/credits; several CU specialty credit counts; AG-CNS current availability; Rocky Vista
admission/cost/length. Source conflicts are shown as conflicts (FRCC accreditation), never resolved by
guessing. The statewide Colorado Nursing Articulation Model is referenced by AACN but its primary text
wasn't retrieved, so it isn't relied on. Re-verify school facts before each academic year.

# Data sources (schools page — Arizona)

Arizona is built in `data/schools/az.js`: 15 schools / 42 programs, verified 2026-11-05 from each
institution's own website. Unlike Colorado, the Arizona State Board of Nursing's approved-programs list and
NCLEX table sit behind a **Cloudflare challenge** that blocks automated access, so there is no central
board source — each program's facts, **including its own published NCLEX pass rate** where the school posts
one, and its board-approval statement, come from that school's site.

**Universities (pre-licensure BSN, Accelerated BSN, Direct-Entry MSN, APRN specialties — all CCNE):**
- **ASU (Edson):** Traditional + Accelerated BSN; MEPN direct-entry MSN; DNP FNP, Adult-Gero Acute Care,
  Adult-Gero (primary), Peds, PMHNP, Women's Health, **Nurse Anesthesia (CRNA)**. nursingandhealth.asu.edu
- **University of Arizona:** BSN (Conventional Tucson + Integrative-Health Accelerated Gilbert); MEPN
  direct-entry MSN; DNP FNP, Adult-Gero Acute Care, Peds, PMHNP, **Nurse-Midwifery (CNM)**, **Nurse
  Anesthesiology (CRNA, COA-accredited)**. nursing.arizona.edu (no RN-to-BSN — confirmed)
- **NAU (Sanghi):** Traditional/Compressed + Accelerated BSN; MS Advanced Practice FNP, PMHNP; RN-to-BSN.
- **GCU:** Traditional BSN + 16-month hybrid ABSN; MSN FNP, Adult-Gero Acute Care, PMHNP. Private,
  "nonprofit Christian" (status contested). gcu.edu
- **Creighton (Phoenix):** 12-month Accelerated BSN ($55,425, 2026-27), private Jesuit. creighton.edu

**Community-college ADN (all ACEN + AZ Board-approved):** MaricopaNursing (shared AAS at 8 metro-Phoenix
colleges — HESI, waitlist entry, ~$11,108), Pima (NLN, $17,364), Central Arizona (HESI), Eastern Arizona
(TEAS), Mohave (TEAS), Yavapai (TEAS + its own RN-to-BSN), Arizona Western (HESI, 445-point ranking),
Coconino (NLN, interim ACEN), Cochise (TEAS, $14,641), Northland Pioneer (HESI, multiple-exit). Entrance
exams vary widely by school.

**Signature Arizona route — Concurrent Enrollment Program (CEP):** a community-college ADN and a university
BSN earned *at the same time* (ASU, NAU, GCU, Ottawa); noted on the Maricopa ADN. The sequential
ADN → RN → RN-to-BSN → graduate route also works via the open-entry RN-to-BSN completions (ASU, NAU, Yavapai).

**Deliberately excluded (private for-profit, per SCHOOLS_SPEC scope):** Arizona College of Nursing,
Chamberlain University, West Coast University. GCU is included and labeled. **Not yet added:** the LPN/CNA
entry tier and the LPN-to-RN / paramedic-to-RN bridges (noted on several ADN records). Unconfirmed facts
(several schools publish only a pass-rate goal, not an achieved rate; GCU/NAU don't state board program
approval) are shown honestly. Re-verify before each academic year; retry the AZ Board list when it isn't
Cloudflare-gated.

# Data sources (schools page — California)

California is **complete for the BRN roster** — **128 schools / 278 programs / 94 agreements** in `data/schools/ca.js` (waves 1-2 verified 2026-11-06; wave 3 added 2026-11-16, see below).
Each record carries its own `source_url` + `last_verified` (the authoritative per-fact log). Facts come from
each institution's own website; **NCLEX pass rates are the California BRN's by-school first-time table.**

**Master roster:** the California Board of Registered Nursing (BRN) approved prelicensure-program list at
`rn.ca.gov/education/rnprograms.shtml` (ADN, BSN, Entry-Level Master's). **Board-verified NCLEX pass rates**
come from `rn.ca.gov/education/passrates.shtml` (annual July 1–June 30 periods; source_url on each program).
**ASSIST.org** governs community-college → CSU/UC course transfer.

**Wave 1:** CSU pre-licensure BSN (CSU Long Beach, San Diego State, Sacramento State, SF State, CSU Fullerton),
Fullerton Accelerated BSN, SF State Entry-Level Master's; community-college ADN (City College of SF —
board-approval-only; San Diego City — ACEN; Pasadena — ACEN candidate, candidacy as published expired
2026-03-18); and open-entry RN-to-BSN completions (CSULB online, SDSU, Sac State, CSU Dominguez Hills online,
CSU Fullerton). Where a school's own page doesn't state BRN approval (CSULB, Sac State, SF State, CSUDH), the
"approved by the California BRN" line is sourced to the BRN approved-program list.

**California is NOT a Nurse Licensure Compact state** — a nurse moving to/from CA applies for licensure by
endorsement (the Schools page hand-off states this). CA RN-to-BSN programs require a **California** RN license;
several online ones (CSULB, CSUDH) admit **California residents only** — noted on each card.

**Deliberately excluded (per SCHOOLS_SPEC scope):** private for-profit / unaccredited chains (West Coast
University, Chamberlain, Carrington, Unitek, Stanbridge, Gurnick, Arizona College of Nursing, American Career
College, etc.), University of Phoenix (not enrolling) and UMass Global (closing). SDSU's Accelerated
2nd-Bachelor's (ASBSN) is omitted while it is **pending BRN approval and CCNE accreditation** (its own page).
SF State's concurrent "ADN-BSN" collaborative (dual CC + SFSU, no RN license required) is not yet modeled.
**Wave 2 (added 2026-11-06):** UCLA, UC Irvine, UCSF, UC Davis, Samuel Merritt, Loma Linda, USF, USD and Azusa
Pacific, plus five more community-college ADNs (Santa Rosa, Sacramento City, Fresno City, Mt. SAC, Riverside).
This added the graduate APRN layer so California resolves FNP, PMHNP, Adult-Gero (primary + acute), Pediatric,
Neonatal NP, CNS, Nurse-Midwifery (UCSF, ACME-conditional) and CRNA (Samuel Merritt, Loma Linda, UC Davis)
in-state. Graduate NP/CRNA programs are open_entry (BSN + an active **California** RN license; CRNA adds
critical-care experience). Excluded as paused/pending: UCSF's MEPN (paused) and MS (closed), and SDSU's ASBSN.
WHNP has no open California program yet (routes fall back out of state, honestly flagged). Still open for future
waves: more private universities (Point Loma, Mount Saint Mary's, Dominican, CBU, Charles Drew) and more
community-college ADNs by region. Re-verify before each academic year.

**Wave 3 (added 2026-11-16): every remaining public or non-profit school on the BRN roster.** The BRN list
(rn.ca.gov/education/rnprograms.shtml, read 2026-11-16) has 97 ADN, 54 BSN and 17 entry-level master's rows; an
asterisk marks private schools, whose ownership was checked in College Scorecard (IPEDS control). 104 schools were
added by 14 parallel research agents (school sites only), assembled with tools/state-build/build_state.py and merged
into the existing file: **72 community colleges** (incl. Los Angeles County College of Nursing & Allied Health, a
county school), **13 public universities** (CSU Bakersfield, Channel Islands, Chico, East Bay, Los Angeles,
Northridge, San Bernardino, San Marcos, Stanislaus, Sonoma State, San José State, plus the RN-to-BSN-only CSU Monterey
Bay and Cal Poly Humboldt, which receive many community-college concurrent-enrollment students) and **19 private
non-profits** (Biola, Cal Baptist, Charles Drew, Concordia Irvine, Mount Saint Mary's, Pepperdine, Vanguard, WesternU,
Point Loma, National University, Dominican, Fresno Pacific, Saint Mary's, Simpson, Westmont, William Jessup, Pacific
Union, University of the Pacific, Weimar). 56 programs are LVN/paramedic bridges (`bridge_from`); the BRN's non-degree
"30-unit option" is mentioned in notes only.
- **NCLEX:** the BRN school pass-rate table (July-June years 2022-23 to 2024-25) mapped by name. New programs with no
  results yet: Pepperdine, Saint Mary's (first BSN class Fall 2025), Lassen (first ADN class 2024) and College of the
  Siskiyous (LVN-RN Step-Up reopened 2026; the BRN table still says "Closed"). Chabot's 2024-25 row shows 1 tester.
- **Excluded:** private for-profits (Scorecard control 3 or the school's own disclosures): American Career College,
  American University of Health Sciences, Angeles, Arizona College, California Career College, California Nurses
  Educational Institute, California Northstate, Career Care Institute, Carrington, Chamberlain, CNI College, Gurnick,
  High Desert Medical College, Marsha Fuerst/Glendale Career College, Pacific College, San Joaquin Valley College,
  Smith Chason, Sri Sai Krish, Stanbridge, Unitek, West Coast University, Westcliff, Xavier College, and United Nursing
  College (BPPE-approved private institution with no non-profit claim). Closed/not admitting: UMass Global, University
  of Phoenix, Mount Saint Mary's ADN (being discontinued), CSUCI's Goleta BSN (paused), Cal State LA's standalone
  RN-to-BSN (on hold), Point Loma's MSN-FNP and LVN-to-BSN, Merced's and Chabot's LVN bridges, Bakersfield College's
  LVN-to-RN AS, COS's year-round track, Cabrillo's LVN advanced placement. Stanislaus's PMHNP certificate (requires a
  master's) was left out.
- **Gaps:** the Los Angeles Community College District colleges (LACC, ELAC, Harbor, Pierce, Southwest, Trade-Tech,
  Valley), De Anza, Ohlone, Madera, Simpson and Pacific Union block automated reading; their records come from search
  excerpts of their own pages and say "check with the school". Many community colleges publish no program cost.
- **Agreements:** 94 documented community-college ADN -> university RN-to-BSN partnerships (concurrent enrollment,
  collaboratives, roadmaps named by a school's own page) plus same-school steps. Dropped where the partner has no
  RN-to-BSN in the data (Azusa Pacific, Loma Linda, SF State) or the source was only a generic transfer roadmap.
- **Tuition:** College Scorecard 2025-26 for 101 of 104 new schools (personal key); overrides El Camino 113980,
  Antelope Valley 109350, Butte 110246, San José State 122755, Mt. San Jacinto 119216, Copper Mountain 395362, MSMU
  119173. No Scorecard tuition: LA County College of Nursing, WesternU (graduate-only); Weimar has no Scorecard record.
- **Spot check (2026-11-16):** Grossmont ADN (TEAS 62%, Jan/Jul windows, 2.5 science GPA, multi-criteria, $6,132
  estimate), CSU San Marcos BSN (TEAS 71, 2.75 core GPA, 68-point scale, Oct 1-Nov 30 window) and National University
  DNAP (36 months, $887/credit, 3.0 GPA, 1 year ICU, COA next review May 2027) matched the schools' pages.

## School-wide tuition (all three states, added 2026-11-11)

Stored as `XX.tuition` at the end of each `data/schools/xx.js`, keyed by institution id, with the federal
IPEDS id (`unitid`), `year`, `in_state`, `out_of_state`, `in_label`, `source_url` and `last_verified`.

- **Source:** U.S. Department of Education **College Scorecard API** (`api.data.gov/ed/collegescorecard/v1/schools`,
  fields `<year>.cost.tuition.in_state` / `.out_of_state`), which republishes IPEDS tuition and required fees for
  one academic year, full-time first-time undergraduates. Each record links to the school's Scorecard page.
- **Year:** Scorecard's year key `2025` = academic year **2025-26**. Checked by matching key `2024` against College
  Navigator's 2024-25 column exactly (Trinidad State $4,608; Aims $2,258). Where 2025 is missing, 2024 (2024-25) is used.
- **In-district vs in-state:** Scorecard's resident figure is the **in-district** rate (verified on Aims: $2,258 =
  College Navigator in-district, not its $3,410 in-state). Labeled "in-district" only where a district rate exists
  (Aims, Colorado Mountain College, Arizona's county community colleges). Colorado state-system and California
  community colleges charge every state resident the same, so they're labeled "in-state".
- **Matching:** 57 institutions matched by exact name; overrides: CU Anschutz → 126562 (CU Denver | Anschutz,
  university-wide undergraduate rate), CMU Montrose → 127556 (Colorado Mesa University), ASU → 104151 (Campus
  Immersion), UArizona → 104179, MaricopaNursing → 105428 (Phoenix College; all 10 Maricopa colleges report the
  same $2,358 / $8,958), Cochise → 104425.
- **Left out:** branch campuses of out-of-state universities (AdventHealth Denver, Concordia St. Paul–Denver,
  Creighton Phoenix), where a home-campus rate would mislead; their nursing programs already carry published
  program prices. No undergraduate tuition reported: Rocky Vista, Denver College of Nursing, UCSF, Samuel Merritt.
- **How it's shown:** only for pre-licensure (entry) programs without their own published price, always labeled
  "school-wide" with a note that nursing fees make the total higher. Never used for graduate or RN-to-BSN programs.
- College Navigator (nces.ed.gov/collegenavigator) was used only to verify the year and in-district labels; it
  sometimes shows a high-traffic notice to automated requests, so the Scorecard API is the working source.
- **Refresh:** re-pull each summer after Scorecard's annual update (its change log lists the June release).

## Source fixes from the first monthly check (2026-11-11, issue #1)

- **Missouri loan repayment:** the old Nurse Loan Repayment Program (NLRP) fact sheet and flyer are gone (404) and DHSS's
  "Nurses can apply" post now redirects to a general page. DHSS's current program is the **Health Professional Loan
  Repayment Program** (health.mo.gov/living/families/primarycare/loanrepayment/): Registered Nurse is eligible when
  "Employed at a hospital or hospital-affiliated health care facility"; awards are $10,000 (associate's) or $35,000
  (bachelor's or master's) for licensed providers, with a 2-year minimum full-time service obligation in an area of
  defined need; nurse practitioners / APRNs are not listed. The map's "State loan repayment" text (shown on NP/MSN pages)
  and footer link were updated to match. Application dates were "to be determined" on the page.
- **AANA CRNA opt-out fact sheet:** returned 404 because **all of aana.com was showing a "technical outage" page** on
  2026-11-11, not because the document moved. Kept the link and the `CRNAOPT` values unchanged; re-check once AANA is
  back up. (Becker's ASC, the main secondary list, blocks automated readers, so it couldn't be used to cross-check.)

# Data sources (schools page — Missouri, added 2026-11-11)

Missouri: **47 schools / 168 programs / 58 transfer agreements** in `data/schools/mo.js` (verified 2026-11-11), built
the same way as Colorado, Arizona and California: every fact from the school's own site, unknowns left `null`.

- **Master roster:** Missouri State Board of Nursing "Schools of Nursing" list (pr.mo.gov/boards/nursing/schoolsofnursing.pdf,
  revised 10/22/2026): approved Associate Degree, RN Diploma and Baccalaureate programs. Every public and private
  nonprofit RN program on it is included (43 starting schools), plus RN-to-BSN and graduate APRN/CRNA programs at those
  schools and Webster University (RN-to-BSN, nurse anesthesia).
- **NCLEX-RN pass rates:** the board's NCSBN "Report 4" (per program, first-time candidates) for calendar 2023, 2024
  and 2025, linked from pr.mo.gov/nursing-education.asp. Each year's per-program totals were checked against the board's
  statewide "Report 1" total (2023: 3,768 tested / 3,388 passed; 2024: 3,751 / 3,496; 2025: 3,661 / 3,246 = 88.66%).
  Programs map to the board's program codes (US17xxxxxx); where a school reports one code for several BSN tracks the
  card says so, East Central's two codes are combined, and Crowder is shown by campus. New programs (Lindenwood,
  Culver-Stockton) have no results yet. pr.mo.gov's certificate chain is incomplete, so the PDFs were downloaded with
  Windows' own web client (which completes the chain) rather than with certificate checks turned off.
- **Excluded (same rules as other states):** private for-profit — Chamberlain, Concorde Career College, Arizona College
  of Nursing, Stepful College (formerly St. Louis College of Health Careers), Texas County Technical College (owned by
  "SPC Subsidiary 1, LLC"), Ponce Health Sciences University–St. Louis, **Research College of Nursing** (HCA Healthcare-owned;
  its MSN closed Dec 2024); Grand Canyon University's Missouri site (out-of-state, as in Colorado). **Cox College** is
  not admitting students and plans to close after Summer 2027 (students are referred to the Alliance for Healthcare
  Education). Paused: UMKC's RN-to-BSN (not accepting applications) and BSN-to-DNP NP tracks (reopening Aug 2027; its
  MSN NP routes are included). Truman's accelerated BSN (suspended; last cohort Aug 2026).
- **LPN/paramedic bridges:** 25 programs carry `bridge_from` ("lpn", "lpn_or_paramedic" or "paramedic"). The schools
  page offers them only to people who choose "LPN / LVN", and lists them first for those people. NCMC's ADN, State Tech's
  AAS and Franklin Tech's RN diploma are bridge-only (they require an LPN license).
- **Agreements:** 58 kept — same-school continuations plus community-college → university RN-to-BSN partnerships
  documented on either school's site (e.g., STLCC/UMSL/Webster dual admission, OTC→Missouri State 2+2, Mineral Area and
  Three Rivers→SEMO, Jefferson/State Fair/MCC→UCM, MCC/State Fair/NCMC/Crowder→Saint Luke's). Dropped: partners outside
  the data (SIUE in Illinois, Northwest Missouri State, Cox College). Some agreement documents date from 2012-2022 and are
  labeled in their notes.
- **Spot check (2026-11-11):** SEMO BSN admission, SLU accelerated BSN length/tuition and MCC ADN TEAS/points/GPA/cost
  matched the schools' pages; MCC's cost appears on its main program page, now cited in the cost note.
- **Known gaps:** Mercy (Cape Girardeau)'s site blocks automated reading, so its records are mostly "check with the school";
  St. Charles CC's catalog didn't load (prerequisites null); several catalogs (Mizzou, UMSL, Missouri Western, Rockhurst,
  Avila, Park, Columbia College) blocked automated reading, so some course codes are null. Bolivar Technical College's
  homepage showed unrelated casino ads on 2026-11-11 (possible compromise); only its program page and catalog are linked.
- **Tuition (`MO.tuition`, added 2026-11-11/12):** 43 of 47 schools, College Scorecard 2025-26, same method as the
  section above. The 12 district community colleges (STLCC, St. Charles, Jefferson, East Central, Mineral Area, Three
  Rivers, Moberly, MCC-KC, State Fair, North Central, Crowder, OTC) are labeled "in-district"; State Tech, MSU-West
  Plains and the universities "in-state". Overrides: MCC-KC → 177995, Mizzou → 178396, UMSL → 178420, Missouri State →
  179566, UCM → 176965, SLU → 179159, UMKC → 178402 (university-wide), Central Methodist → 176947 (College of Liberal
  Arts and Sciences), Missouri Valley → 178369, Mercy's Southeast Missouri Hospital College → 417734. Left out:
  Graceland and WGU (home campus out of state), Goldfarb and Franklin Technology Center (no tuition reported).
  Added by hand on 2026-11-12 (the script won't rewrite an existing block): Rockhurst–Saint Luke's → 179043 (Rockhurst
  University, university-wide rate) and Bolivar Technical College → 490203 (private nonprofit).
- **Refresh:** re-pull the roster and the board's Report 4 each spring (the year's Q4 report appears around March).


# Data sources (schools page — Washington, added 2026-11-11)

Washington: **44 schools / 91 programs / 17 transfer agreements** in `data/schools/wa.js` (verified 2026-11-11), built
with docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** Washington State Board of Nursing "Approved In-State Nursing Programs" (dated November 9, 2026),
  linked from nursing.wa.gov/node/251 (nursing.wa.gov/sites/default/files/2026-11/Approved-In-State-Nursing-Programs-2026-11-9.pdf).
  Every RN program on it is included: 28 community/technical colleges (ADN, LPN-to-RN and LPN-to-BSN bridges, and the
  colleges' own RN-to-BSN degrees), 6 public universities plus WGU Washington, and 9 private nonprofit universities.
  The roster lists no for-profit RN programs.
- **NCLEX-RN pass rates:** the board's "NCLEX School Reports" (WABON, February 2026; nursing.wa.gov/sites/default/files/2026-02/NCLEX-pass-rates.pdf),
  first-time takers by calendar year; 2023-2025 are stored. The report gives no statewide total, so its 2025 per-program
  counts were checked against NCSBN's 2025 NCLEX Examination Statistics for Washington (first-time US-educated RN:
  3,062 tested / 2,599 passed): the board's rows add up to 2,983 tested / 2,528 passed plus Bellevue's 70 passed, i.e.
  within one or two candidates. Every row's printed percentage was re-computed from its counts; the one mismatch is
  Bellevue 2025 ("70/80 = 89.74%"; 70/80 is 87.5%) — the page shows the printed 89.74% with no tested count and a
  note. The board reports one figure for all of a school's BSN tracks (WSU's campuses, PLU's BSN + ABSN, UW's BSN +
  ABSN); LPN-to-BSN programs have their own rows; PLU's Entry-Level MSN ("GE") and Seattle U's APNI have their own
  rows. Edmonds' LPN-to-RN program has no RN row yet; Whitworth's BSN is new (initial approval).
- **Excluded / left out:** UW's Pediatric Clinical Nurse Specialist DNP (no longer accepting students); Gonzaga's
  BSN-to-DNP NP route (discontinued — its MSN FNP/PMHNP are included) and RN-to-MSN (suspended); Seattle U's
  FNP-Adult-Gero DNP (closed) and its new AGCNS DNP (open only to Virginia Mason Franciscan Health employees); Tacoma
  CC's RN-to-BSN (on the roster with initial approval but not yet on TCC's own site); WWU's MSN (education/leadership
  only). Leadership/education/informatics master's and PhDs are out of scope as in other states.
- **LPN bridges:** 17 programs carry `bridge_from: "lpn"` (LPN-to-RN ADNs and the LPN-to-BSN degrees at Columbia
  Basin, Green River, Olympic, Saint Martin's and Wenatchee). Clover Park, Edmonds and Green River offer RN training
  only as LPN bridges.
- **Agreements:** 17 kept — same-school ADN → RN-to-BSN continuations, UW Bothell's Nurse Scholars (Everett, LWTech,
  Shoreline), WSU's Concurrent Enrollment (Big Bend, Clark, Lower Columbia, South Puget Sound), and Pierce → UW
  Tacoma / Saint Martin's. Walla Walla CC lists ten RN-to-BSN partners, but its site blocks automated reading (403) and
  the list could only be seen in search snippets, so those agreements were left out. Washington's statewide Associate
  in Nursing DTA/MRP degree is designed to transfer into university RN-to-BSN programs; RN-to-BSN programs are marked
  open to any RN, so routes still offer them.
- **Spot check (2026-11-11):** Clark College ADN (3.0 GPA, Kira assessment, NursingCAS, $65 fee, 7-year science
  limit, Apr 8 / Jul 8 / Nov 8 deadlines), WSU BSN tuition ($12,063 resident 2026-27 from WSU's Spokane tuition
  PDF; DNP $24,544) and UW DNP FNP ($1,097 per credit from Autumn 2026) all matched the cited pages.
- **Known gaps:** Bellevue, Everett, Whatcom, Walla Walla CC, Gonzaga and Seattle Pacific block automated reading, so
  their facts come from their own PDFs or catalogs, or are flagged "check with the school" where only search excerpts of
  their pages were available. Several colleges publish no program cost (null). WSU moved its Yakima nursing students to
  Tri-Cities/Spokane after spring 2026 (noted). Renton Technical College's ADN has conditional board approval and a
  42.9% 2025 pass rate (shown). Highline (roster: ACEN with conditions) and Shoreline (ACEN continuing with warning)
  are labeled. Walla Walla University's nursing years are on its Portland, Oregon campus, with a College Place, WA
  cohort phasing in (noted).
- **Tuition (`WA.tuition`, added 2026-11-12):** 43 of 44 schools, College Scorecard 2025-26. Washington's community
  colleges charge one statewide rate (no in-district rate), so all are labeled "in-state". Overrides: Shoreline →
  236610 (Shoreline College), Seattle Colleges → 236513 (Seattle Central College, which runs the nursing program),
  Pierce → 235237 (Pierce College District), UW → 236948 (Seattle campus), UW Bothell → 377555, UW Tacoma → 377564,
  WSU → 236939 (Pullman main-campus rate; Scorecard reports no tuition for WSU Spokane, home of the College of
  Nursing). Left out: WGU Washington (WGU's one national rate isn't a Washington figure).
- **Refresh:** re-pull the roster and the board's NCLEX school report each year (the report is updated around February).


# Data sources (schools page — Oregon, added 2026-11-12)

Oregon: **27 schools / 50 programs / 17 transfer agreements** in `data/schools/or.js` (verified 2026-11-12), built
with docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** Oregon State Board of Nursing "Approved Programs" list (osbnpublic.osbn.oregon.gov/approvedprograms,
  read 2026-11-12; 40 entries, no revision date shown), using the page's own program-type filter (Associate RN,
  Baccalaureate RN, BSN Accelerated, Masters RN, APRN/DNP types). Every public and private nonprofit RN program on it is
  included: 17 community colleges, OHSU (Portland, Ashland/SOU, Bend, Klamath Falls/Oregon Tech, La Grande/EOU,
  Monmouth/WOU; plus its DNP APRN programs), Linfield, University of Portland, Concordia University St. Paul's Portland
  ABSN (home campus Minnesota), Walla Walla University's Portland campus (home campus Washington; its id here is
  `walla-walla-u-pdx` because `walla-walla-u` is already in wa.js), Warner Pacific, George Fox (BSN + CRNA), Bushnell
  (ABSN), Corban (new BSN) and Western University of Health Sciences' Lebanon campus (new entry-level MSN). No other
  Oregon public university runs its own nursing program (OSU, UO and PSU say so; SOU, WOU, EOU and Oregon Tech host OHSU).
- **NCLEX-RN pass rates:** the board's "RN/LPN Education Program NCLEX Pass Rates 2021-2025" (updated Jan 2026;
  www.oregon.gov/osbn/Documents/Resource_NCLEXpassrates.pdf), first-time takers by calendar year, printed as whole
  percentages with candidate counts; 2023-2025 are stored. The PDF's third page starts with the end of the associate
  table (Rogue Grants Pass, SWOCC, Sumner, Tillamook Bay, Treasure Valley, Umpqua) above the practical-nurse table, so
  rows were read by page position, not text order. Cross-check against NCSBN's 2025 NCLEX Examination Statistics
  (Table 8, Oregon, first-time US-educated): associate degree 687 tested in both sources (exact match); baccalaureate
  1,201 (NCSBN) vs 1,196 BSN + 24 entry-level master's (board). The board reports OHSU by campus and separately for
  its accelerated tracks; Linfield's BSN, accelerated BSN and entry-level master's have their own rows. Corban and
  WesternU Lebanon are new (no results yet); OHSU's Bend ABSN cohort is new (the ABSN card shows Portland and Ashland).
- **Excluded:** private for-profit — Carrington College, Institute of Technology, Sumner College (Portland and Bend),
  Concorde Career College (PN only). University of Portland's DNP-FNP: UP's nursing home page says it "is not currently
  accepting new students" (its DNP page still shows an application window — owner may want to re-check). Linfield's
  RN-to-BSN (no longer admitting), Bushnell's RN-to-BSN (no longer on its site or catalog), Klamath CC's LPN-to-RN
  transition (on hold for 2027), George Fox's PMHNP DNP (not launched yet; fall 2027 vs 2028 on its pages). PN-only
  programs, education/leadership master's and PhDs are out of scope as in other states. OHSU's AGACNP DNP is included
  (open for Fall 2027 on OHSU's site) though the board roster's filter doesn't list that type.
- **LPN bridges:** 5 programs carry `bridge_from` (Chemeketa, Oregon Coast, COCC and TVCC LPN-to-RN; Lane LPN or
  paramedic). The board reports one ADN figure per college, which the bridge cards share.
- **Agreements:** 17 kept — OCNE co-admission from 10 community colleges' ADNs into OHSU's online RN-to-BSN (PCC, MHCC,
  Clackamas, Clatsop, Columbia Gorge, Oregon Coast, Umpqua, SWOCC, Blue Mountain, Rogue; as documented on OHSU's or the
  college's site — where both sides documented it, the college's page is cited), and same-school ADN → RN-to-BSN at the
  six colleges of the new BSN Community College Collaborative (Chemeketa, Oregon Coast, Linn-Benton, Klamath, COCC,
  TVCC — first cohorts Fall 2026) plus Lane's own online RN-to-BSN. Dropped 7 partnerships into Linfield's and Bushnell's RN-to-BSN programs, which no longer admit students.
- **Spot check (2026-11-12):** PCC ADN ($22,500 two-year estimate, HSRT-AD in Phase II, Feb 15, 2027 NursingCAS and
  Dec 14, 2026 PCC deadlines, up to 40 seats), George Fox BSN transfer admission (3.00 cumulative and science GPA, points
  plus group interview, fall/spring windows) and OHSU CRNA DNP (3 years, 129 credits, $906/$944 per credit, 3.0 GPA,
  one year critical care, COA through Oct 2028) matched. OHSU's program totals ($149,833 / $154,735) are on its nursing
  tuition page, now cited in the cost note.
- **Known gaps:** Mt. Hood CC and Rogue CC block automated reading (403), so their ADN records come from search excerpts
  of their own pages and are flagged "check with the school" (Rogue's cost/accreditation null). Blue Mountain's
  prerequisite and cost sheets need a login. Klamath's tuition table year was unclear (cost null). Clatsop's cost
  documents didn't load. Several colleges state only Oregon board approval (no ACEN/CNEA); MHCC is an ACEN candidate,
  Linn-Benton's pages disagree (initial accreditation vs candidate). WesternU's Oregon cost and accreditor aren't
  published. Corban's site doesn't state its board approval stage or accreditation candidacy.
- **Tuition (`OR.tuition`, added 2026-11-12):** 23 of 27 schools, College Scorecard 2025-26. Every Oregon community
  college is its own district; College Navigator shows Central Oregon CC charging less in-district than in-state
  (2024-25: $5,049 vs $6,885), so all 17 are labeled "in-district" (some charge every Oregon resident the same rate).
  Left out: OHSU (Scorecard reports no tuition; its per-credit rates are on each program), WesternU Lebanon, Concordia
  St. Paul and Walla Walla (home campuses out of state).
- **Refresh:** re-read the roster and the board's NCLEX PDF each year (the PDF was updated in January).


# Data sources (schools page — Nevada, added 2026-11-13)

Nevada: **9 schools / 31 programs / 6 transfer agreements** in `data/schools/nv.js` (verified 2026-11-13), built
with docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** Nevada State Board of Nursing "Approved Nursing Programs" list (Updated-program-list-09.23.26.pdf,
  linked from nevadanursingboard.org/education). Every public and private nonprofit RN program on it is included: College
  of Southern Nevada (AAS + LPN-to-RN bridge), Truckee Meadows CC (AS), Western Nevada College (AAS), Great Basin College
  (AAS + paramedic/LPN-to-RN bridge), Nevada State University (BSN), UNLV (BSN + Direct Entry MSN), UNR (BSN at Reno and
  the Lake Tahoe campus in Incline Village, plus a new Accelerated Second BSN) and Roseman University (BSN). Touro
  University Nevada (not on the pre-licensure roster) is included for its RN-to-BSN and MSN FNP.
- **NCLEX-RN pass rates:** the board's yearly NCSBN "Report 4 – Jurisdiction Program Summary of all First-Time Candidates"
  for calendar 2023, 2024 and 2025 (linked from nevadanursingboard.org/education). Each program's total row was checked
  against the sum of its graduation-date rows. Cross-check against NCSBN's 2025 NCLEX Examination Statistics (Table 8,
  Nevada, first-time US-educated RN): 2,052 tested / 1,811 passed vs 2,050 / 1,809 summed from the board's rows (all
  programs, including the excluded for-profits); associate degree 626 in both (exact). UNLV's Direct Entry MSN has its own
  board row (first results 2025); UNR's BSN and Accelerated Second BSN share one board figure, as do Roseman's sites.
- **Excluded:** private for-profit — Arizona College of Nursing, Carrington College (Las Vegas, Reno), Chamberlain
  (Las Vegas, Reno, online), Galen College, Nevada Career Institute, Unitek College (BSN, direct-entry MSN), Las Vegas
  College (ADN in teach-out: lost board approval, not admitting); Grand Canyon University's Henderson ABSN site
  (out-of-state, as in Colorado and Missouri). Clinical-only out-of-state programs (Joyce, Nightingale, WGU, Mohave CC)
  aren't Nevada programs. Together the excluded for-profits produced about 40% of Nevada's 2025 first-time NCLEX-RN
  takers. Also left out: UNLV's BSN-to-DNP PMHNP (listed "On Hold"; its MSN PMHNP is included), Nevada State's MSN
  (leadership only), education/leadership tracks, PhDs and post-graduate certificates.
- **LPN bridges:** CSN's LPN-to-RN (`lpn`) and GBC's Paramedic/LPN bridge (`lpn_or_paramedic`).
- **Agreements:** 6 kept — same-school ADN → RN-to-BSN at CSN (ADN and bridge), TMCC and GBC, and TMCC/WNC ADN → UNR
  RN-to-BSN (UNR catalog transfer pathways "R.N. to B.S.N. (TMCC)" / "(WNC)"; UNR's catalog pages returned no readable
  text, so these rest on search excerpts of UNR's own catalog). UNLV has no RN-to-BSN; its 2026-27 transfer agreement maps
  CSN's Associate of Science (not the nursing AAS) into UNLV's BSN, so it isn't a program-to-program agreement here.
  UNR's concurrent ADN/RN-to-BSN enrollment is open to any accredited ADN student (RN-to-BSN programs are open entry).
- **Spot check (2026-11-13):** WNC ADN (4 semesters, 71.5 credits, April 1 deadline, TEAS, 17-point system, CNA
  requirement, ACEN), Nevada State BSN (TEAS 60% overall and per section, 2.5 cumulative / 3.25 nursing GPA, priority
  windows Sept 1–Oct 1 2026 / Feb 1–Mar 1 / Jun 1–Jul 1 2027, five semesters full time, CCNE) and UNLV CRNA DNP (36-month
  hybrid; $800 per credit on UNLV Nursing's tuition page) matched. UNLV's current pages don't state the CRNA's COA status
  (a March 2025 announcement said approval was pending), so its accreditation now says "check with the school".
- **Known gaps:** tmcc.edu blocks automated reading (403) and its catalog refused connections, so TMCC's records come
  from search excerpts of its own pages and say so (length, cost and full prerequisites null). UNLV's catalog returned no
  readable text (Direct Entry MSN prerequisites/GPA and DNP admission criteria null; most UNLV costs are only per-credit
  fee add-ons, so null). Roseman's CRNA admits its next cohort July 2028 (applications open Jan 1, 2027). UNLV's
  PMHNP MSN starts only with enough enrollment. Several catalog/program-page conflicts (GBC deadlines, Nevada State
  prerequisite wording, Roseman's cohort term) are in the program notes.
- **Tuition (`NV.tuition`, added 2026-11-13):** 7 of 9 schools, College Scorecard 2025-26. Nevada's community colleges
  (NSHE) charge one statewide per-credit rate, so all are labeled "in-state". Override: UNLV → 182281 (name match below
  the automatic threshold). Left out: Roseman and Touro (Scorecard reports no tuition).
- **Refresh:** re-read the roster and the board's yearly Report 4 each January (the 2025 report was posted January 2026).

# Data sources (schools page — Idaho, added 2026-11-14)

Idaho: **9 schools / 25 programs / 10 transfer agreements** in `data/schools/id.js` (verified 2026-11-14), built
with docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** the Idaho Board of Nursing's "Nursing Education Programs" list on its page at the Division of
  Occupational and Professional Licenses (dopl.idaho.gov/bon/; no revision date shown; 12 institutions). Every public and
  private nonprofit RN program on it is included: Boise State (BSN, online RN-BS, BS-DNP FNP and AG-ACNP), BYU-Idaho (BSN),
  College of Eastern Idaho, College of Southern Idaho, College of Western Idaho and North Idaho College (ADNs), Idaho State
  University (BSN, Accelerated BSN at Meridian/Pocatello/Twin Falls/Coeur d'Alene, LPN-to-RN ADN from the College of
  Technology, RN-to-BSN, DNP FNP and PMHNP, and the Doctor of Nurse Anesthesia Practice — COA-accredited May 2025, first
  class Fall 2025), Lewis-Clark State College (BSN, LPN-to-BSN, RN-to-BSN and the new 2026 Direct-Entry MSN, which LC State
  says prepares graduates for the NCLEX-RN) and Northwest Nazarene (BSN, MSN FNP).
- **NCLEX-RN pass rates:** the board's "NCLEX First-Time Pass Rates" table (BON-NCLEX-Scores-2023-25.pdf, calendar 2023-2025,
  # taken and % pass per program). Cross-check against NCSBN's 2025 NCLEX Examination Statistics (Table 8, Idaho):
  baccalaureate 842 tested / 764 passed vs 842 / 764 summed from the board's BSN and Eagle Gate MEPN rows (exact);
  associate 434 / 393 vs 433 / 392 (one candidate apart); total 1,276 / 1,157 vs 1,275 / 1,156. The board reports one figure
  for all of ISU's BSN tracks (traditional + accelerated) and one for each school's ADN including its LPN bridge.
  LC State's Direct-Entry MSN is new and has no board figure yet.
- **Excluded:** private for-profit — Carrington College (Boise: LPN, ADN, LPN-to-RN), Eagle Gate College (Boise and Idaho
  Falls: BSN, master's entry, LPN; owned by Unitek Learning, already excluded in CA and NV); Grand Canyon University's
  Meridian BSN site (out-of-state, as in Colorado, Missouri and Nevada; the board shows N/A results). Together the excluded
  for-profits produced about 24% of Idaho's 2025 first-time NCLEX-RN takers (302 of 1,275). Also left out: LPN programs,
  ISU's MS in nursing education, PhDs, post-master's DNPs and certificates (including ISU's FNP-to-PMHNP), LC State's MSN
  leadership track, NNU's MSN leadership/education, and NNU's former RN-to-BSN (no longer in its 2026-27 catalog).
- **Bridges (LPN only):** ISU's College of Technology ADN, CSI's LPN-to-ADN track, CEI's LPN-to-RN track (a separate
  LPN-only admission within CEI's board-approved ADN), NIC's PN-to-RN Advanced Placement and LC State's LPN-to-BSN.
- **Agreements:** 10 kept — Boise State's FAQ says it has agreements with all Idaho community colleges so ADN students can
  dual enroll in its online RN-BS (recorded for CWI, CSI, CEI and NIC; the colleges aren't named individually); LC State's
  "CC to BSN" concurrent track for CSI, CWI, CEI and NIC (ADN and LPN-to-RN); and ISU's ADN → its own RN-to-BSN.
- **Spot check (2026-11-14):** CWI ADN (Kaplan exam, March 1-31 / October 1-31 windows, "3 years", $16,612 as listed on the
  program page with no breakdown, ACEN continuing accreditation with conditions), Boise State BSN (five semesters / about
  2.5 years, 100 admitted each fall and spring, cumulative GPA above 2.5 and above 3.0 in key sciences, no entrance exam)
  and ISU DNAP (in-state total approximately $128,703 on ISU's 2026-27 cost sheet) matched. An agent had summed Boise
  State's sample DNP plan into a credit total; that was removed (not stated by the school).
- **Known gaps:** CWI and CEI catalogs returned no readable text (total credits unconfirmed); LC State's catalog refused
  connections. BYU-Idaho's entrance-exam status is null (a search excerpt says the HESI A2 was dropped in Feb 2026; the page
  404s). BYU-Idaho admits only enrolled BYU-Idaho students (ecclesiastical endorsement and Honor Code required). Boise
  State's DNP cost is published only as a $820-$895 per-credit range (null). LC State's Direct-Entry MSN cost and
  grade minimums aren't published. Several page conflicts (LC State RN-to-BSN cost, NIC bridge credits, ISU ABSN cost sheet,
  NNU FNP credits, CSI LPN track credits) are in the program notes. A University of Idaho planning document mentions a UI
  direct-entry MSN, but UI isn't on the board roster, so it isn't included.
- **Tuition (`ID.tuition`, added 2026-11-14):** 8 of 9 schools, College Scorecard 2025-26. Idaho's community colleges are
  district colleges (e.g. NIC: Kootenai County $152/credit vs non-district $226), and Scorecard's figures match the district
  rate, so NIC, CSI, CWI and CEI are labeled "in-district". BYU-Idaho is left out: Scorecard gives one figure ($4,944), which
  the site would show as "for every student", but BYU-Idaho charges non-members double ($5,088 vs $2,544 per semester on
  its BSN record).
- **Refresh:** re-read the roster and the board's NCLEX table each January (the 2023-25 table was posted January 2026).


# Data sources (schools page — Utah, added 2026-11-16)

Utah: **12 schools / 43 programs / 8 transfer agreements** in `data/schools/ut.js` (verified 2026-11-16), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** Utah has no separate approved-program list. Since 2012 a nursing program counts as "approved" under
  Utah's Nurse Practice Act when it holds programmatic accreditation from a US Department of Education-recognized nursing
  accreditor (state Office of Professional Licensure Review report on nursing education oversight, Jan 2024,
  commerce.utah.gov/wp-content/uploads/2024/01/OPLR-Legislative-Inquiry-Report-Nursing-Education-Oversight-PDF-for-Publication-1-3-2024-2-1.pdf).
  So the roster is the Division of Professional Licensing's (DOPL, Board of Nursing) NCLEX-RN pass-rate table, which names
  every program it tracks (commerce.utah.gov/dopl/nursing/resources/nclex-rn-pass-rates/, read 2026-11-16; no revision
  date). Every public and private nonprofit program on it is included: University of Utah, Utah State (ADN at
  Price/Blanding/Moab, LPN-to-RN at Tooele/Uintah Basin, BSN at Logan), Weber State (ADN and PN-to-RN; its BSN is RN-to-BSN
  only), Southern Utah, Utah Tech, Snow College, Utah Valley, Salt Lake CC, BYU, Westminster University, Roseman's South
  Jordan campus (accelerated BSN) and WGU (Salt Lake City-based; pre-licensure BSN for Utah residents), plus those
  schools' RN-to-BSN and graduate APRN programs: U of U's BSN-to-DNP NP specialties (FNP, PMHNP, AG-ACNP, three pediatric
  tracks, NNP, WHNP) and nurse-midwifery (two tracks), Westminster's MSN FNP and DNP nurse anesthesia, Weber's DNP FNP and
  PMHNP, BYU's MS FNP and WGU's MSN FNP and PMHNP.
- **NCLEX-RN pass rates:** DOPL's annual per-program tables for calendar 2023, 2024 and 2025 (first-time candidates
  educated in Utah). Cross-check: each year's per-program rows add up exactly to DOPL's "Total Candidates Educated in Utah"
  (2023: 3,318 tested / 2,892 passed; 2024: 3,807 / 3,291; 2025: 4,364 / 3,455 = 79.17%). DOPL reports one figure per school
  per degree level, so multi-site programs (USU, Weber, Snow, SLCC) and LPN bridges share their school's ADN figure.
  Snow College had no takers in 2023 (that year is left out rather than shown as 0%).
- **Excluded:** private for-profit (College Navigator) — Nightingale College, Joyce University of Nursing and Health
  Sciences, Provo College, Eagle Gate College, Fortis College, Galen College of Nursing (HCA) and Arizona College of
  Nursing, plus two new for-profit pre-licensure programs not yet in the table (Chamberlain University's Sandy BSN,
  approved by DOPL's education committee Nov 2025; North-West College's Provo BSN, temporarily approved) and Rocky Mountain
  University of Health Professions (graduate NP programs; private for-profit). Grand Canyon University's Sandy accelerated
  BSN site (a site of the Arizona university, as in Colorado, Missouri, Nevada and Idaho). Stevens-Henager College
  (inactive; closed 2021). Southern Utah's MSN FNP (at capacity: no applications until March 15, 2027, for Spring 2028).
  Roseman's FNP and nurse anesthesia run in Henderson, NV and are already in the Nevada data. **The excluded schools
  produced about 56% of Utah's 2025 first-time NCLEX-RN takers (2,424 of 4,364; Nightingale alone 1,366).** Also left
  out: LPN programs, MSN education/leadership/informatics tracks, post-master's DNPs and certificates, PhDs.
- **Bridges:** USU's Tooele/Uintah Basin associate, Weber's PN-to-RN, Snow's LPN-to-RN and SLCC's LPN-to-RN Advanced
  Placement (LPN only). Utah Tech's AASN (admits only LPNs, paramedics and military medics) and SUU's Health Professional
  to BSN (LPNs, paramedics, respiratory therapists, athletic trainers, military medics) are tagged `lpn_or_paramedic`.
  UVU admits LPNs into the 3rd semester of its ASN (noted on the record, not a separate program).
- **Agreements:** 8 — SLCC → U of U RN-BS Express Pathway (dual enrollment), SLCC → WGU RN-to-BSN guaranteed admission,
  and same-school ADN → RN-to-BSN continuations at USU, Weber, Utah Tech and UVU.
- **Spot check (2026-11-16):** Westminster's DNP nurse anesthesia (3 years / 9 semesters, applications July 1-Sept 15,
  2026, May 17, 2027 start, COA approval Jan 2022; $1,640 x 90 credits = $147,600 in the 2026-27 graduate catalog), SUU's
  BSN (4 semesters, no entrance exam, 3.0 GPA, Feb 3, 2027 deadline, CCNE) and Snow's ADN (3.0 GPA with 2.80-2.99
  petition, Jan 1-Mar 1 / Jul 1-Sept 1 windows, Utah CNA, ACEN) matched. Snow's "four semesters" is on snow.edu/asn,
  not the application packet; now cited in the note. An agent note quoting a search snippet (Westminster deposit
  timing) was removed.
- **Known gaps:** Utah Tech's and UVU's online catalogs refused connections (credit totals unconfirmed; UVU ASN length
  from a catalog excerpt); SLCC's catalog returned 403 (LPN bridge length null). UVU's RN-to-BSN cost and several minimum
  GPAs aren't published. U of U's prerequisite course codes and DNP GPA minimums aren't published. Weber's DNP costs are
  published only as ranges (null). Page conflicts (U of U BSN deadline Jan 31 vs Feb 1, Westminster BSN per-credit rates,
  SLCC cohort size, BYU credit cap and FNP experience, WGU e-book fee, Snow bridge GPA) are in the program notes.
- **Tuition (`UT.tuition`, added 2026-11-16):** 10 of 12 schools, College Scorecard 2025-26. Utah's public colleges
  charge one statewide resident rate (SLCC's 2026-27 rate table has only resident and non-resident rows), so all are
  labeled "in-state". Overrides: U of U → 230764, Weber State → 230782. Left out: BYU (two-tier Latter-day Saint /
  non-member tuition, as with BYU-Idaho) and Roseman's South Jordan campus (no separate Scorecard record; name matching
  picked a different school). WGU is included here (its home campus is in Salt Lake City).
- **Refresh:** re-read DOPL's NCLEX table each January (it also shows the current year by quarter).

# Data sources (schools page — Montana, added 2026-11-16)

Montana: **14 schools / 26 programs / 2 transfer agreements** in `data/schools/mt.js` (verified 2026-11-16), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** Montana Board of Nursing "Montana Approved Professional Nursing Education Programs"
  (boards.bsd.dli.mt.gov/nursing/approved-nur-programs.pdf, dated 9/11/2026; an older 8/1/2026 copy sits at
  /_docs/nur/approved-nur-programs.pdf). 15 RN programs, all public, tribal or private nonprofit — Montana has no
  for-profit RN program. Included: the two-year colleges (City College at MSU Billings, Great Falls College MSU, Helena
  College, Missoula College, Flathead Valley, Miles), the tribal colleges (Aaniiih Nakoda ASN, Blackfeet BSN, Salish
  Kootenai BSN — typed "community college" on the site), MSU Bozeman (BSN at Bozeman, Billings, Great Falls, Kalispell and
  Missoula; accelerated BSN; DNP FNP, PMHNP and nurse-midwifery), MSU-Northern (ASN + RN-to-BSN), Montana Tech (BSN),
  Carroll College (BSN + 15-month accelerated track = the roster's "BAN") and Touro University Montana (new BSN, board
  "Phase II approved in 2026 (may enroll)", first cohort January 2027; new RN-to-BS from Fall 2027), plus MSU Billings'
  online RN-to-BSN (filed under City College).
- **NCLEX-RN pass rates:** the board's "Registered Nursing NCLEX Pass Rates per Calendar Year" table
  (boards.bsd.dli.mt.gov/_docs/nur/new_nclex_rn.pdf, 2021-2025, one row per school; 2023-2025 used). Cross-check: per-program
  takers add up exactly to the state's first-time takers in 2023 (603, 91.71%) and 2025 (572, 90.73%); in 2024 the rows
  add to 688 against the board's 689 (one taker isn't in any program row; the rates match to within rounding). MSU Bozeman
  reports one figure for all campuses and both BSN tracks; Carroll one for both tracks. Aaniiih Nakoda had no takers in
  2025 and Salish Kootenai none before 2024 (those years are left out). Blackfeet's figures are tiny (2-3 takers a year).
- **Excluded:** University of Providence (Great Falls) — its trustees voted on Oct 27, 2026 to close the university at the
  end of 2026-27 (last day of instruction Aug 20, 2027); the board roster still shows it approved through 2036. It produced
  30 of Montana's 572 first-time NCLEX-RN takers in 2025. Also left out: LPN-only certificates (Bitterroot College, City
  College, FVCC, Great Falls, Helena, Williston State's Montana site), MSU's Master of Nursing (not APRN), post-master's DNP
  and post-graduate PMHNP certificate. Montana has **no nurse anesthesia (CRNA) program** (Gonzaga's Spokane program uses a
  Montana clinical site; it is already in the Washington data).
- **Bridges:** Missoula College's distance LPN-to-RN Bridge (Montana LPN + 2,000 work hours), Miles CC's LPN to RN
  Completion and Aaniiih Nakoda's LPN advanced placement (`bridge_from: "lpn"`). The other ASNs admit new students directly
  and take LPNs through the same application (course credit noted on each card).
- **Agreements:** 2 — same-school ADN → RN-to-BSN at MSU-Northern and City College/MSU Billings (2+1 concurrent option).
  Dropped: FVCC → Montana Tech "Digger Connect" (a 2022 news release; Montana Tech's current site lists no RN-to-BSN), and
  Great Falls College's mentions of MSU-Northern and MSU Billings (the page says only that students are "recruited and
  welcomed" — not a documented partnership). Miles CC's "RN-BSN Pathways" page lists options but names no agreement.
- **Accreditation flags shown on the cards:** Blackfeet's BSN is on CONDITIONAL board approval through 2026 and not
  nationally accredited (board stipulation; decision due by Feb 2027). Great Falls College's ASN is an ACEN candidate
  (since Aug 2025). Touro's BSN is not yet accredited (the board roster lists CCNE; Touro says it is pursuing it). MSU's
  nurse-midwifery has ACME pre-accreditation.
- **Spot check (2026-11-16):** Montana Tech BSN (Nov 1-Dec 1, 2026 window, TEAS 68%, 60% GPA / 40% TEAS ranking, decisions
  by Dec 28), Helena College ASRN (four consecutive semesters, TEAS 70%, 2.75 GPA, 58 points, up to 20 a semester, Nov 2,
  2026 deadline, ACEN) and MSU's DNP FNP (82 credits, 3 or 4 years, 765 clinical hours, Sept 15-Dec 15 portal, 3.0 GPA
  preferred, applicants in MT/UT/WY/ID/CO/AK, CCNE) matched the cited pages.
- **Known gaps:** the catalogs of MSU, MSU-Northern, MSU Billings, Great Falls College and UM refused connections, so some
  credit totals and course codes are null. Aaniiih Nakoda's cost and entrance exam aren't published; Miles CC's LPN bridge
  length isn't published; Touro's RN-to-BS length/cost aren't published yet; Missoula's bridge cost isn't published.
  Page conflicts (Great Falls class size 25 vs 30, FVCC accreditation dates, MSU-Northern deadline June 10 vs 15, Montana
  Tech application window, Salish Kootenai prerequisite grades, Carroll's paused 2026 accelerated cohort) are in the notes.
- **Tuition (`MT.tuition`, added 2026-11-16):** 12 of 14 schools, College Scorecard 2025-26. Flathead Valley and Miles are
  locally governed district colleges ("in-district"); the Montana University System two-year colleges and the tribal
  colleges are "in-state". Overrides: MSU Bozeman → 180461, Montana Tech → 180416, MSU-Northern → 180522. Left out:
  Missoula College (no separate Scorecard record; the University of Montana's rate would overstate it) and Touro University
  Montana (no record yet).
- **Refresh:** re-read the board's NCLEX table each spring and the roster after board meetings (it is re-issued a few
  times a year).


# Data sources (schools page — Wyoming, added 2026-11-17)

Wyoming: **8 schools / 16 programs / 7 transfer agreements** in `data/schools/wy.js` (verified 2026-11-17), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** Wyoming State Board of Nursing "List of Wyoming Nursing Education Programs" (wsbn.wyo.gov/education,
  read 2026-11-17) and its 2025 Annual Nursing Education Report (same page): nine RN programs at eight schools, all public —
  Casper College, Central Wyoming College (Riverton; also runs a Jackson site), Eastern Wyoming College (Douglas/Torrington),
  Laramie County CC (Cheyenne), Northern Wyoming Community College District (Sheridan + Gillette), Northwest College
  (Powell), Western Wyoming CC (Rock Springs) and the University of Wyoming (Basic BSN + the accelerated "BRAN"/BRAND
  program). Wyoming has **no for-profit RN program, and no nurse anesthesia or nurse-midwifery program**.
- **NCLEX-RN pass rates:** the board's quarterly "NCLEX Statistics, First-time Test Takers" PDFs for 2023, 2024 and 2025
  (Google Drive files linked from wsbn.wyo.gov/education; the 2026 file, as of 10/12/2026, was read but not used — the year
  isn't finished). Calendar-year totals per program; UW's Basic and Accelerated programs are reported separately.
  Cross-check: 2024 per-program totals add up exactly to the state total (309 of 326). 2025 rows add to 277/305 against the
  state's 276/304 — Western Wyoming's yearly row (28/29) is one taker more than its own quarters (27/28); the board's row is
  used. 2023 has table errors: Northwest College's RN yearly row (11/12) equals its PN quarters, so the sum of its RN
  quarters (33/37) is used and the card says so; Central Wyoming (26/26 vs 29/29 by quarter) and UW Basic (46/46 vs 47/47)
  are 100% either way and the yearly rows are used. Also, the 2025 file's April-June state RN and PN totals are swapped.
- **Excluded:** nothing on the roster. Left out by scope: PN certificates (Casper, LCCC incl. PN-Hybrid, NWCCD, Northwest,
  Western), UW's MS nurse educator/leader tracks, PhD and post-graduate certificates.
- **Bridges:** Casper College's LPN advanced placement (third semester) and Central Wyoming's LPN to RN Completion
  (`bridge_from: "lpn"`). LCCC's LPN Advanced Placement and Northwest College's midpoint entry are also flagged "lpn": they
  admit LPNs plus nursing re-entry/transfer students, never brand-new students (noted on the cards). Eastern and Western
  Wyoming have no LPN entry.
- **Agreements:** 7 — each college ADN → UW's online BSN Completion through **ReNEW** (Revolutionizing Nursing Education in
  Wyoming, a shared statewide curriculum; students can take UW courses while still in the ADN). Each is cited from the
  college's own page or handbook; UW's 2026-27 ReNEW transfer guide lists all seven too (UW's ReNEW page returned an error).
- **Spot check (2026-11-17):** Western Wyoming ADN (Jan-Mar 31 window, TEAS Proficient, 2.5 GPA, 40 a year, hybrid, ACEN),
  UW Basic BSN non-freshman admission (HESI A2 75% English/Science/Math, 2.75 pre-clinical GPA, Jan 15 to last Thursday of
  March, holistic review) and UW DNP FNP (3.0 GPA, WY/multistate RN license by May 1, July 1 open / first Friday of October
  priority, $500 seat fee, virtual interview) matched the cited pages.
- **Known gaps / owner attention:** Gillette College is now its own district (HLC candidate) but its nursing still runs
  under Northern Wyoming's board approval and ACEN accreditation — split it out if Gillette gets its own approval. Eastern
  Wyoming's 2025 board pass rate (8 of 11, 72.7%) is below the board's 80% threshold. UW's BRAND and BSN Completion costs are
  null (UW lists a $187 campus and a $215 online per-credit rate but doesn't say which applies). Catalogs at Sheridan,
  Western and Eastern refused automated reading (some minimum grades null); LCCC's catalog had a certificate error. Page
  conflicts (LCCC format and math prerequisite, Casper GPA 2.5 vs 2.8 and prerequisites, Northwest portal date, BRAND
  10 vs 11 prerequisites, UW DNP out-of-state clinical sites) are in the notes.
- **Tuition (`WY.tuition`, added 2026-11-17):** all 8 schools, College Scorecard 2025-26. Wyoming's community colleges charge
  one statewide resident rate set by the Wyoming Community College Commission (Central, Eastern and Western Wyoming
  each list $112/credit tuition for 2026-27), so they are labeled "in-state", not in-district. Override: University of Wyoming → 240727.
- **Refresh:** the board updates its NCLEX PDF quarterly; re-read the 2026 file each spring for the full year.

# Data sources (schools page — New Mexico, added 2026-11-17)

New Mexico: **22 schools / 40 programs / 14 transfer agreements** in `data/schools/nm.js` (verified 2026-11-17), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** New Mexico Board of Nursing "NMBON approved nursing education programs" (files.bon.nm.gov/WebDocs, linked
  from bon.nm.gov/approval-accreditation; PDF printed 2026-07-20). It lists approval status, expiry, accreditation and the
  board's average program cost for every PN, ADN and BSN program. Included: every public or nonprofit RN program on it —
  CNM, Clovis, ENMU-Roswell, Luna, Mesalands (new), Navajo Technical University (new, tribal; typed community college as in
  Montana), New Mexico Junior College, NMSU (Las Cruces, with Alamogordo and Grants partner sites), NMSU-Alamogordo, NMSU Doña
  Ana, Northern New Mexico College (typed public university: a regional four-year college), San Juan, Santa Fe CC, Southeast
  New Mexico College, UNM College of Nursing, UNM-Taos, UNM-Gallup, UNM-Valencia, Western New Mexico University — plus
  Grand Canyon University's Albuquerque site (labeled, as in Arizona: its nonprofit status is contested). Added for their
  RN-to-BSN / graduate programs: Eastern New Mexico University (Portales; online RN-to-BSN only) and New Mexico Highlands
  University (RN-to-BSN, MSN FNP).
- **NCLEX-RN pass rates:** the board's "NCLEX Pass Rates" PDF ("End of Year 2025", dated 2.23.26; files.bon.nm.gov/WebDocs),
  first-time takers by calendar year 2021-2025; 2023-2025 are stored. UNM's BSN is reported per site (Albuquerque plus the
  NMNEC dual-degree sites at CNM, San Juan, Santa Fe, UNM-Gallup, UNM-Taos and UNM-Valencia) and stored by campus.
  **Cross-check:** the table has no statewide total, so the per-program sum could not be checked; instead every stored rate was
  recomputed from the board's passed/tested counts and matches its printed percentage. Southeast New Mexico College's 2025
  row gives a rate (92.86%) but no counts, so it is stored without a tested number. Rows marked "Pending 2026" (Mesalands,
  Navajo Tech, NMSU-Alamogordo, GCU, UNM-Taos ADN, NMJC's UNM BSN site, WNMU ADN) have no figure. The table also shows an
  ENMU BSN through 2024; ENMU's site has no pre-licensure BSN today (its BSN is for RNs only), so that row isn't used.
- **Excluded:** private for-profit Brookline College (Unitek), Carrington College and Pima Medical Institute; out-of-state
  programs approved only for clinical placements or still pending (Western Governors University, Edgewood University WI,
  Joyce University UT — Joyce is also for-profit). Western NM University's post-master's FNP certificate (requires an MSN
  first — not an entry route, as with Fresno State's certificates). Out of scope: PN certificates, MSN education/leadership,
  post-graduate certificates, PhD. UNM has no nurse anesthesia program (its School of Medicine anesthesia master's trains
  anesthesiologist assistants); NMSU's DNP Nurse Anesthesiology (COA initial accreditation, 2023) is the state's only CRNA
  program.
- **Bridges:** CNM's LPN to RN Mobility, NMSU Doña Ana's LPN-to-RN advanced placement, Clovis's LPN direct entry to Level III
  and NMJC's new LPN-to-RN Accelerated Pathway (`bridge_from: "lpn"`). The PN-ADN ladders at Clovis, Northern NM and SENMC
  admit brand-new students at level 1, so they are ordinary ADNs.
- **Agreements:** 14. New Mexico's signature route is **NMNEC** (New Mexico Nursing Education Consortium): a shared
  curriculum where students at CNM, San Juan, Santa Fe CC, UNM-Gallup, UNM-Taos and UNM-Valencia co-enroll in UNM's BSN and
  finish with an associate degree and a UNM BSN (agreements to `unm-bsn`; CNM's LPN entry too). Others: Clovis (ADN and LPN
  entry) and ENMU-Roswell → ENMU RN-to-BSN; SFCC and Luna → NMHU RN-to-BSN (NMHU's articulation pages); NNMC ADN → its own
  RN-to-BSN; NMHU RN-to-BSN → MSN FNP.
- **Spot check (2026-11-17):** NMJC ADN (TEAS 58.7% adjusted total plus section cut scores, 2.75 prerequisite GPA, May 20
  deadline, holistic selection; $40/credit in-district Fall 2026 from its cost sheet), NMSU BSN (HESI A2 75% per section and
  composite, 2.75 prerequisite GPA, April 1 fall / Sept 1 spring, 40/50/5/3/2 ranking, cohorts 64/64/24/8, CCNE) and UNM
  Post-Bachelor's DNP FNP (3 years, 825 clinical hours, Aug 15 / Dec 1 / Apr 1, one year RN experience; the $49,698.40
  resident total for 2026-27 is on UNM's tuition page, now cited in the note) matched the cited pages.
- **Known gaps / owner attention:** UNM-Valencia's ADN is on "Full Approval with warning" and its board pass rates are low
  (2025: 8 of 15; its UNM BSN site 1 of 5); UNM-Gallup's 2025 rate was 9 of 14 and its UNM BSN site 1 of 4. Luna's own page
  says "full approval with warning" although the roster says full approval. Navajo Tech's dates conflict (roster: first class
  graduates Fall 2026; NTU page: first cohort starts Spring 2027). NMSU-Alamogordo's handbook still says initial approval /
  ACEN candidate. Mesalands' site loads by JavaScript, so its prerequisites, GPA and exam are null. CNM, SFCC and NNMC catalogs
  returned 403 (some minimum grades null); NMSU's catalog had a certificate error. NMJC's UNM BSN site (board: pending 2026) and
  an ENMU "NMJC AAS to BSN" pathway (behind a login) couldn't be confirmed, so no agreement was added. NMSU Doña Ana and
  Alamogordo publish no path into NMSU's BSN. Western NM's ADN (board: pending 2026) isn't on WNMU's site yet.
- **Tuition (`NM.tuition`, added 2026-11-17):** 21 of 22 schools, College Scorecard 2025-26. New Mexico's two-year colleges
  charge an in-district rate (the NM Higher Education Department's FY26 tuition table labels their resident rate "In District";
  NMSU's community-college rate sheet, CNM, Luna and Clovis show separate out-of-district rates), so they are labeled
  "in-district" — except San Juan College (one New Mexico resident rate) and Navajo Tech (tribal, one rate), labeled
  "in-state" like the universities and Northern NM College. Overrides: UNM main 187985, NMSU main 188030, NMSU Doña Ana
  187620, ENMU main 187648, UNM-Taos 188225, UNM-Gallup 187958, UNM-Valencia 188049. GCU's Albuquerque site skipped (its
  federal record is the Arizona campus).
- **Refresh:** the board updates its NCLEX PDF early each year; re-read it each spring for 2026.

# Data sources (schools page — Alaska, added 2026-11-18)

Alaska: **2 schools / 8 programs / 1 transfer agreement** in `data/schools/ak.js` (verified 2026-11-18), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** the Alaska Board of Nursing's web pages (commerce.alaska.gov, Board of Nursing) sit behind bot
  protection ("enable JS" captcha wall), so they were not read. The board's own meeting PDFs on the same site download
  normally and serve as the roster: the NCSBN Education Program Summary and NCLEX report in the **January 2026 meeting
  book** (Portals/5/pub/Archive26/BoardMeetings/2026_Jan_BON_Meeting Book.pdf) and the annual school reports in the
  **November 2025 meeting book** (NURboardbook_2025_11.pdf) name every board-approved program: UAA AAS, UAA BSN, Charter
  College ADN, Alaska Pacific University ADN and the LPN programs (APU, UAF Community & Technical College). The board's
  August 2026 minutes list the same RN programs with FY2026 pass rates. Included: **University of Alaska Anchorage** (AAS at
  12 distance sites — Bethel, Dillingham, Homer, Juneau, Kenai, Ketchikan, Kodiak, Kotzebue, Nome, Petersburg, Sitka, Valdez;
  BSN at Anchorage, Fairbanks with UAF CTC, and Mat-Su; online RN to BS; MS Family NP and Psychiatric-Mental Health NP) and
  **Alaska Pacific University** (ADN in Anchorage and Utqiagvik, LPN-to-RN bridge, RN-to-BSN).
- **NCLEX-RN pass rates:** the board's "NCLEX pass rates 4 year trends" chart (calendar years 2022-2025) in the January
  2026 meeting book; 2023-2025 are stored. The chart prints rates only (no counts), so cards show no "tested" number. The
  page is a rotated chart; each label was matched to its program and year by its position on the page (four bars per
  program, 2022 to 2025). UAA AAS 83% / 94% / 73%, UAA BSN 87% / 89% / 78%, APU ADN 60% / 100% / 86% (2023 / 2024 / 2025).
  **Cross-check:** the chart has no statewide total; as a sanity check, the board's Q4 2025 NCSBN table in the same book and
  its FY2026 figures in the August 2026 minutes (APU ADN 81%, UAA ADN 76%, UAA BS 96%) are in line with the chart. UAA's own
  annual report (April-March years, with counts: AAS 56 of 62 and BSN 92 of 109 in Apr 2024-Mar 2025) is a different
  period and isn't stored.
- **Excluded:** Charter College (Anchorage; AAS in Nursing, ACEN) — private for-profit per College Navigator (unit 102845).
  Out of scope: LPN certificates (APU, UAF CTC, AVTEC, Charter's new LPN), UAF's AS Nursing Foundations and UAS's pre-nursing
  certificate (they feed UAA programs and lead to no license themselves), UAA's DNP (post-master's, APRNs only), its FNP and
  PMHNP graduate certificates (require a graduate nursing degree) and its leadership/education tracks. Alaska has no
  accelerated BSN, direct-entry master's, CRNA, midwifery or CNS program.
- **Bridges:** APU's LPN to RN (`bridge_from: "lpn"`; Alaska LPN license required, 9 credits granted). UAA's AAS takes no LPN
  credit (per its 2026-27 handbook).
- **Agreements:** 1 — UAA AAS → UAA RN to BS (its "direct articulation option" for associate-degree RNs, up to 42 credits for
  the license). No documented APU → UAA path. APU's RN-to-BSN and UAA's MS programs admit any qualified RN (open entry).
- **Spot check (2026-11-18):** UAA AAS (TEAS 58.7 + Kira, 2.0 prerequisite GPA, Fall 2027 window mid-Jan to March 22, 2027,
  scored selection), UAA BSN (TEAS 58.7 + Kira, 3.0 prerequisite GPA, March 22, 2027, sites Anchorage/Fairbanks/Mat-Su) and
  UAA MS FNP/PMHNP (BSN from ACEN/CCNE program, 3.0 GPA, one year RN experience, Alaska RN license, opens Nov 1, 2026,
  priority Jan 4 / final Feb 1, 2027, Kira, three references) matched the cited pages. APU's cost was restated as its yearly
  undergraduate tuition ($20,960 = two $10,480 flat-rate semesters, 2026-27 cost of attendance page, now cited) so the page
  doesn't read a per-semester figure as a whole-program price.
- **Known gaps / owner attention:** UAA's AAS board pass rate fell to 73% in 2025 and the BSN to 78% (below the board's 80%
  standard; the board said in January 2026 it sends letters of concern for yearly rates under 80%). UAA's catalog
  (catalog.uaa.alaska.edu) refused every connection, so the AAS 72-credit total and some minimum grades rest on UAA's program
  pages or are null. UAA's BSN page lists Spring 2027 sites but no spring deadline (noted "check with the school"). The board's
  2024-25 report lists AAS sites in Anchorage and Mat-Su, but UAA's current pages say the AAS isn't offered there; UAA's
  current list is used. APU's catalog and /programs/ pages returned 403, so most APU prerequisite codes and the bridge and
  RN-to-BSN lengths are null; APU's most recent ACEN decision is initial accreditation (continuing-accreditation visit Sept
  2026). APU's Utqiagvik ADN site is confirmed only by the board report and a search snippet.
- **Tuition (`AK.tuition`, added 2026-11-18):** both schools, College Scorecard 2025-26 (UAA 102553, APU 102669), labeled
  "in-state" (no community-college districts in Alaska).
- **Refresh:** each January meeting book carries the board's calendar-year NCLEX chart; re-read it each year.


# Data sources (schools page — Hawaii, added 2026-11-18)

Hawaii: **8 schools / 33 programs / 8 transfer agreements** in `data/schools/hi.js` (verified 2026-11-18), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** Hawaii Board of Nursing "Recognized Schools of Nursing" (cca.hawaii.gov/pvl/hawaii-nursing-programs →
  Hawaii-Schools-of-Nursing-as-of-022026.pdf, last updated February 2026): Chaminade, Hawaiʻi Pacific University, UH Hilo,
  UH Mānoa, Hawaiʻi CC, Kapiʻolani CC, Kauaʻi CC and UH Maui College. All eight are public or private nonprofit and all are
  included. The PDFs carry an owner-password (no open password); text was extracted with pdftotext.
- **NCLEX-RN pass rates:** the board's "NCLEX Pass Rates for 2025" (HI_Nursing_Report_Jan_Dec_25.pdf, NCSBN/Pearson VUE
  program report, Jan-Dec 2025, report date April 1, 2026). Stored: US-educated first-time candidates per program code.
  **Only 2025 is stored** — the board's page links only the latest year and no 2023/2024 report was found on its site.
  Chaminade BS 98/105 (93.3%), HPU BS 76/99 (76.8%), UH Hilo BS 27/34 (79.4%), UH Mānoa BS 42/42 (100%), UH Mānoa MEPN/GEPN
  41/41 (100%), Hawaiʻi CC ADN 41/49 (83.7%), Kapiʻolani CC ADN 46/48 (95.8%), Kauaʻi CC ADN 17/17 (100%), Maui CC ADN 33/39
  (84.6%). **Cross-check:** the report has no statewide total line (it is itself the full list of Hawaii program codes, plus
  "closed program", equivalency and re-entry rows, which aren't schools). **Which UH BS row is which:** the report labels
  both US37500200 and US37505600 "University of Hawaii - BS". UH Mānoa's own fast-facts page reports a 100% first-time rate
  for its BS in calendar 2025, which matches only US37505600 (42/42), so that row is Mānoa and US37500200 (27/34) is Hilo
  (Hilo admits about 40 a year — 30 Hilo + 10 Waiʻanae — consistent with 34 takers). UH Hilo publishes no rate of its own to
  confirm. Hawaiʻi CC's and UH Hilo's single board figures cover all of their sites (labeled "one board figure").
- **Excluded / left out:** no for-profit RN programs are on the board's roster. HPU's HM-to-BSN (military hospital corpsmen
  only — the site has no bridge type for corpsmen, and showing it to all starters would mislead); HPU's on-campus MSN and
  adult-gero NP certificate (closed on the 2026-27 tuition schedule); UH Maui College's general ASN (not admitting — its
  apply page offers only the new BSN and CNA-to-PN); UH Mānoa's MS Advanced Population Health (not APRN), nursing education
  MS/certificate (not admitting) and post-master's DNP; Chaminade's post-graduate NP certificates and DNP Executive Leader;
  UH Hilo's MSN-to-DNP; all LPN-only certificates. Hawaii has no CRNA or nurse-midwifery program (searches found none).
- **Bridges:** five LPN-only programs (`bridge_from: "lpn"`): Kapiʻolani CC LPN-RN Transition, Kauaʻi CC LPN-to-RN Transition,
  Hawaiʻi CC LPN to AS-NURS (Hilo only, offered when budget/staff allow), UH Maui College LPN-to-ASN (its menu says "coming
  soon" but a Nov 15, 2026 application is open — noted "check with the school"), HPU LPN/LVN-to-BSN.
- **Agreements:** 8 articulations, all community-college ADN → UH RN-to-BS through the UH nursing consortium (Hawaiʻi
  Statewide Nursing Consortium curriculum): Kapiʻolani ADN and LPN-RN → UH Mānoa and UH Hilo (the college's own transfer
  checklists), Kauaʻi → UH Mānoa, Hawaiʻi CC → UH Hilo and UH Mānoa, UH Maui → UH Mānoa. Duplicate copies found by two agents
  were merged. Chaminade and HPU document no community-college agreements.
- **Spot check (2026-11-18):** Hawaiʻi CC ADN (TEAS Proficient 58.7%, 2.0 GPA, Nov 1–Jan 15 window; 2026-27 admissions PDF),
  UH Hilo BSN (2.7 cumulative / 3.0 natural-science GPA, TEAS 70%, Nov 1 deadline, 30 Hilo + 10 Waiʻanae) and HPU online MSN
  FNP (45 credits, 624 clinical hours, $1,156/credit = $52,020, 3.0 GPA preferred, Dec 18, 2026 deadline for the Jan 11, 2027
  start, CCNE) matched the cited pages.
- **Known gaps / owner attention:** **HPU's graduate NP programs are under a CCNE show-cause directive** (July 8, 2026;
  clinical placements and course sequencing; site visit Nov 9-11, 2026; report due March 1, 2027) — stated on every HPU
  graduate card. HPU's 2025 board pass rate was 76.8% and UH Hilo's 79.4%. **UH Maui College's BSN** is new (first cohort Fall
  2026, no NCLEX results yet) and its ACEN candidacy notice says it "expires on 11/5/2026" — recheck its status. UH Hilo's
  BSN accreditation is stated as CCNE on the department page but ACEN in the 2026-27 catalog (both shown, "check with the
  school"). Kauaʻi CC's enroll page still shows a 2025 deadline. Chaminade's BSN cost is the 2027-28 rate (the only one its
  cost page now shows); its "Accelerated Track" page returned a server error, so no accelerated BSN record. UH Mānoa's
  graduate/RN-to-BS per-credit costs are Outreach College rates the program pages don't name explicitly (noted).
- **Tuition (`HI.tuition`, added 2026-11-18):** all 8 schools, College Scorecard 2025-26 (UH Mānoa mapped by hand to
  141574). UH community colleges are labeled "in-state" (one statewide UH rate, no local districts).
- **Refresh:** the board posts each calendar year's NCLEX report around April; keep earlier years when re-pulling so cards
  build up to three years.


# Data sources (schools page — North Dakota, added 2026-11-19)

North Dakota: **11 schools / 30 programs / 25 transfer agreements** in `data/schools/nd.js` (verified 2026-11-19), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** North Dakota Board of Nursing "Approved Nursing Programs" (ndbon.org/academic/nursing-programs, no
  revision date; © 2026 page, shows approvals into 2026), cross-checked with the board's FY2024-25 Nursing Education Annual
  Report (published May 2026). RN programs: Dakota Nursing Program consortium AAS at Bismarck State, Dakota College at
  Bottineau, Lake Region State and Williston State; NDSCS AAS; University of Jamestown ASN (Fargo, initial approval) and
  Direct-Entry MSN (Fargo, continued initial approval to July 2027); BSNs at Dickinson State, Minot State, NDSU (Fargo and NDSU
  Nursing at Sanford Health, Bismarck), Rasmussen, Jamestown, University of Mary and UND; APRN programs at NDSU and University of
  Mary (DNP FNP) and UND (MS/DNP FNP and PMHNP, DNP nurse anesthesia).
- **NCLEX-RN pass rates:** the board's Nursing Education Annual Reports for FY2022-23, FY2023-24 and FY2024-25 (fiscal years
  July-June; stored as "2022-23" etc. so cards show the fiscal year), first-time candidates per institution. **Cross-check:** the
  per-program rows (including the excluded Rasmussen) add up exactly to the board's totals: FY2022-23 684 tested / 631 passed,
  FY2023-24 621 / 602, FY2024-25 578 / 534 (92.38%). The board gives one figure per school, so NDSU's covers Fargo + Bismarck and
  all BSN tracks, and University of Mary's covers all its BSN tracks. **NDSCS FY2024-25:** the board's table prints 81.82% but its
  own counts are 27 of 31 (87.1%); the stored rate is calculated from the counts (noted on the card). Dickinson State's figures come
  from its earlier LPN-to-BSN completion (noted on the card). Jamestown's ASN and DEMSN are new (no graduates yet).
- **Excluded:** **Rasmussen University** (Fargo BSN/ABSN) — private for-profit (part of American Public University System /
  American Public Education, Inc., as the board's page itself says); it was 17 of 578 FY2024-25 first-time takers (about 3%).
  **UND adult-gerontology acute care NP** (MS and DNP, announced July 2026) — not on the board's APRN list yet and no admission date
  published; add it once it admits. UND's adult-gerontology primary care NP (no longer listed / not taking applications). NDSCS's
  Associate in Science in Nursing (phased out, stopped admitting Fall 2025). Dickinson State's old LPN-to-BSN completion (teach-out)
  and an RN-to-BSN DSU no longer lists. Sitting Bull College (PN only), all PN certificates, post-graduate certificates. Out-of-state
  articulation partners (Mayville State is in ND but has no RN program on the roster; Northland CTC and MSU Moorhead are in Minnesota).
- **Dakota Nursing Program:** the AAS RN is "Year Two" of a 1+1 ladder. New students start in the consortium's PN certificate year
  and move up; outside LPNs (and Lake Region's paramedic-to-nurse bridge completers) enter Year Two directly. The four records have
  no `bridge_from` because new students can enter through the PN year; the cards describe both routes. Williston's sites include
  Sidney, Montana. Bismarck State and Lake Region describe their ACEN status as "initial" accreditation — confirm the current term.
- **Bridges:** three LPN-only programs (`bridge_from: "lpn"`): NDSCS LPN-to-RN AAS, NDSU LPN-to-BSN, University of Mary LPN-to-BSN.
- **Agreements (25):** Minot State guaranteed-admission/articulation agreements with Dakota College at Bottineau, Lake Region,
  Bismarck State, Williston State and NDSCS (the NDSCS agreement PDF returned 404, so its terms aren't shown); NDSU RN-to-BSN
  agreements with Williston State and NDSCS (2.75 nursing GPA; the WSC one says it ended 04/18/2026 — check renewal); the Williston
  State → University of Mary agreement (2023-2028); NDSU's direct BSN → DNP FNP entry; NDSU's reserved FNP seats for Dickinson State
  BSN graduates (June 2026). **Weakest evidence:** the consortium colleges → NDSU / Jamestown / University of Mary / UND links come
  only from the Dakota Nursing Program's "Articulation Partner Colleges" page (no agreement documents). Dropped: Williston State →
  Dickinson State (DSU no longer lists an RN-to-BSN); UND's 2+2 plans (they lead into the pre-licensure BSN, not from the ADN).
- **Spot check (2026-11-19):** Minot State BSN (TEAS Proficient, 2.8 support-course GPA, 27-point ranking, Sept 15 / Feb 1
  deadlines), University of Mary BSN-to-DNP FNP (as little as 2.7 years, $685/credit, 2.75 GPA, next start 9/6/2027, CCNE) and the
  Dakota Nursing Program AAS entry rules (current PN/paramedic-bridge students or licensed LPNs, 92% ATI PN Predictor, 2.50
  cumulative / 2.75 nursing GPA) matched the cited pages.
- **Known gaps / owner attention:** **UND's costs are all null** (its tuition table is interactive and couldn't be read; the school-wide
  Scorecard figure fills in). NDSU's program overview, accelerated BSN, RN-to-BSN and DNP pages returned 403, so those facts come from
  NDSU's 2025-26 handbooks and admission pages; NDSU's DNP handbook says CCNE accreditation runs "until June 30, 2026" (renewal not
  confirmed). University of Mary's catalog and accelerated-BSN page returned 403 (GPA/exam/prerequisites null; ABSN length and
  deadline from the page's search-indexed text, confirmed by its 2024-25 handbook). NDSCS's nursing pages returned 403 (facts from its
  catalog; entrance exam not named; catalog deadlines conflict with a "no deadline" line on the web page). Jamestown's own pages
  disagree on the new ASN's accreditation (CNEA pre-accreditation vs initial) and on ASN/DEMSN GPA (3.0 vs 2.5/2.85); the DEMSN is
  not yet accredited (pursuing CCNE). Dickinson State's new traditional BSN (launching fall 2026 after the 2024 faculty resignations;
  ACEN removed its "good cause" status Sept 2025) publishes no prerequisites, GPA or exam yet.
- **Tuition (`ND.tuition`, added 2026-11-19):** all 11 schools, College Scorecard 2025-26 (NDSU mapped to 200332, main campus).
  North Dakota's two-year colleges are part of the North Dakota University System with one statewide resident rate (no local
  districts), so they're labeled "in-state".
- **Refresh:** the board posts each fiscal year's annual education report in spring (FY2024-25 appeared May 2026); add the new year
  and keep the last three.


# Data sources (schools page — South Dakota, added 2026-11-19)

South Dakota: **12 schools / 32 programs / 9 transfer agreements** in `data/schools/sd.js` (verified 2026-11-19), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** South Dakota Board of Nursing "Board Approved Nursing Programs" (sdbon.org/education/ApprovedNursingEducationPrograms.asp,
  page updated 10/9/2026), cross-checked with the approval tables in the board's 2025 Annual Nursing Education Report (status as of
  February 2026; sdbon.org/userfiles/files/AnnualEducationReport2026.pdf, linked from sdbon.org/NursingWorkforce/Reports.asp).
  Associate degree RN: Lake Area Tech, Mitchell Tech, Southeast Tech, Western Dakota Tech, Oglala Lakota College, Dakota Wesleyan
  (new, interim approval). Baccalaureate: Augustana, Dakota Wesleyan, Mount Marty, Northern State (new, interim), SDSU, University of
  Sioux Falls, USD. APRN: NP at Augustana (AG acute care), Mount Marty (FNP, PMHNP) and SDSU (DNP FNP, PMHNP); nurse anesthesia at
  Mount Marty and USD; CNS at Augustana. (doh.sd.gov's old board pages now return 404; the board's own site is sdbon.org.)
- **NCLEX-RN pass rates:** the 2025 Annual Nursing Education Report (Jan-Dec 2025, first-time test writers). The board posts only the
  latest report and no earlier ones could be found online, so cards show 2025 only (as for Hawaii). **Cross-check:** the per-program rows
  add up exactly to the board's totals: associate 175 tested / 157 passed, baccalaureate 565 / 521, all 740 / 678 (91.6%). The board
  gives one figure per school, so SDSU's (297 tested) covers every site and BSN track, USD's covers its BSN and LPN-BSN, and Augustana's and
  USF's cover their generic and accelerated BSNs. **Oglala Lakota College:** 7 tested, 4 passed; the board withholds a rate until a
  program reaches 21 first-time takers, so the card states the counts and shows no rate (set by hand after the build script; re-apply if
  sd.js is rebuilt). New with no results yet: Dakota Wesleyan's A.S. in Nursing, Northern State's BSN and LPN-to-BSN, SDSU's Online BSN
  (launched spring 2026) and USF's LPN-to-BSN (approved Nov 2024).
- **Excluded / not added:** no private for-profit RN programs are on the roster (National American University and Presentation College
  closed their programs in 2019 and 2023, per the board's history). Dakota Wesleyan's LPN-to-BSN (Sioux Falls closed Feb 2025 per the
  board; the page now returns 404). The Augustana DNP (AG acute care NP / CNS) has only "prerequisite" board status and isn't advertised.
  SDSU's adult-gerontology acute care NP (post-graduate certificate only) and the closed FNP certificate; Mount Marty's leadership DNP and
  MS-to-DNAP (needs a CRNA); USD's DNP (leadership, post-MSN) and informatics MSN; all PN programs (incl. Sinte Gleska and Sisseton
  Wahpeton, PN only). The SDSU/Northern State global health + accelerated BSN dual degree (only an NSU "intent to plan" document; SDSU's
  Aberdeen accelerated site is closing).
- **Technical-college RN programs are LPN bridges:** Lake Area, Mitchell, Southeast and Western Dakota Tech admit only LPNs (or, at
  Southeast and Mitchell, students finishing their own PN program), so all four carry `bridge_from: "lpn"`; the way in for a new student
  is the college's PN diploma (described on each card). Bridges in all (7): those four plus Northern State, USD and USF LPN-to-BSN.
- **Agreements (9):** the statewide Board of Regents / Board of Technical Education "Uniform RN to BSN Articulation Agreement" (approved
  5/25/2023 and 6/22/2023; students starting the AAS in Fall 2024 or later; 2.0 GPA, C or better, RN license; 78+ credits transfer,
  admission not guaranteed) from each of the four technical-college ADNs into SDSU's and USD's RN-to-BSN (8), plus Mount Marty's
  direct-entry BSN → DNAP. Two research agents recorded the statewide agreement; one copy (citing the signed PDF on wdt.edu) was kept.
  Not recorded: Southeast Tech / Mitchell Tech agreements with Dakota Wesleyan and USD that start from the PN program (they lead into a
  BSN, not from the ADN); Mount Marty, named as a partner only in a Lake Area FAQ.
- **Spot check (2026-11-19):** Southeast Tech RN admission (2.5 GPA or NACE, 85% NCLEX-PN predictor or LPN license, 750 paid LPN hours;
  ACEN continuing, next visit Spring 2028), SDSU standard BSN (Feb 15 / June 1 fall deadlines, $462/credit, $55,440 / $54,400 / $70,320
  estimates) and Mount Marty BS-to-DNAP (36 months, 3.00 GPA, 1 year critical care, April 1-July 1 NursingCAS window, $1,400/credit)
  matched the cited pages.
- **Known gaps / owner attention:** **University of Sioux Falls' site returned 403 to automated reading**, so its three records come from
  search-engine copies of USF's own pages (each card says so); BSN tuition, length and prerequisites are null, and the LPN-to-BSN GPA (3.0
  vs 2.75) and ABSN deadline disagree between USF pages. Both university catalogs (SDSU, USD) returned 403: USD BSN/LPN-BSN cost and length
  are null and its prerequisites are partial; USD's RN-BSN cost is USD's general online per-credit rate. **Mount Marty's BSN NCLEX rate
  was 67.9% in 2025** (19 of 28; the board's standard is 75%, measured over its own periods). **Oglala Lakota College's** CNEA
  accreditation is listed by the board only "through April 10, 2025" and the college's site names none (accreditation null). Mitchell Tech
  names no national accreditor and shows two different costs (brochure $16,628 vs a "$4,000" line). SDSU's page shows the SD Advantage
  estimate below the resident one at the same per-credit rate (possible typo). Mount Marty's RN-to-BSN appears only in its 2025-26
  catalog. Northern State's CCNE decision (visit Sept 2026) isn't posted. Augustana ABSN credits: 50 (tuition page) vs 47 (plan).
- **Tuition (`SD.tuition`, added 2026-11-19):** all 12 schools, College Scorecard 2025-26, no manual mappings. South Dakota's technical
  colleges are run by the state Board of Technical Education with one statewide rate (no local districts), so they're labeled "in-state".
- **Refresh:** the board posts each year's annual education report in spring; add the new year and keep the last three.


# Data sources (schools page — Nebraska, added 2026-11-20)

Nebraska: **18 schools / 68 programs / 17 transfer agreements** in `data/schools/ne.js` (verified 2026-11-20), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** Nebraska Board of Nursing "Nebraska Approved Nursing Education Programs" (dhhs.ne.gov/licensure/Documents/NebraskaApprovedNursingEdPrograms.pdf,
  updated 10/2026; the board approves pre-licensure programs only). Baccalaureate: Bryan College of Health Sciences, Clarkson College, College of
  Saint Mary, Creighton, Herzing (initial), Midland, Nebraska Methodist College, Nebraska Wesleyan, Union Adventist, UNMC, WGU (initial). Associate
  degree: Central, Herzing (initial), Metropolitan, Mid-Plains, Northeast, Southeast and Western Nebraska community colleges (the list's heading
  says 8 but names 7). Graduate and RN-to-BSN programs at those schools are included, plus Bellevue University (RN-to-BSN only).
- **NCLEX-RN pass rates:** the board's own site posts no per-program table (its meeting minutes only summarise quarterly results). The board's
  "NEBRASKA BOARD OF NURSING / NCLEX-RN PASS RATES 2021-2025" table is posted by Mid-Plains Community College
  (mpcc.edu/academics/programs/academics-files/associate_degree_pass_rates_2025.pdf; the 2020-2024 edition gives the same 2023-2024 figures), and
  that copy shows the **associate degree rows only**. Those rows are used for the six community-college ADNs (2023-2025, calendar year, first-time).
  **Cross-check** against NCSBN's yearly NCLEX statistics (Nebraska, associate degree, Jan-Dec): passed counts match exactly every year (2025: 235;
  2024: 212; 2023: 247 incl. Purdue Global-Lincoln, closed March 2023); NCSBN counts one more tester each year (280 / 227 / 262 vs 279 / 226 / 261).
  Southeast's 2025 row prints "48 48 87.50%"; 87.5% of 48 = 42, which matches the NCSBN total, so 87.5% is shown (noted on the card).
  **Bachelor's programs:** no board per-program figures could be found, so each card shows the school's own published rate where there is one
  (UNMC combined traditional + accelerated; Creighton and Nebraska Methodist, whose pages don't say "first-time"; College of Saint Mary; Union
  Adventist 2022-2024) and otherwise "check with the school". Nebraska Wesleyan's latest year-by-year figures are from 2018-2019 and aren't shown.
- **Excluded / not added:** no private for-profit RN programs are on the roster (Herzing has been a nonprofit since 2015, per its own
  announcement). Herzing's ADN and BSN: Herzing's own pages don't list Nebraska as eligible, so only its graduate NP programs open to Nebraska
  nurses (FNP, PMHNP, AGACNP) are included; its MSN Direct Entry (Herzing lists Lincoln/Omaha) isn't on the board's roster, so it's left out.
  Creighton's DNP nurse anesthesia (no students until its COA decision, expected May 2027). Midland's RN-to-BSN (paused, no next start).
  Nebraska Wesleyan's RN-BSN and RN-to-MSN (only in the 2022-23 catalog). Creighton's Phoenix ABSN (already in Arizona). All PN-only programs,
  post-graduate certificates, and MSN education/leadership/informatics tracks.
- **LPN bridges (9):** Mid-Plains, Northeast, WNCC and Southeast LPN-to-ADN; Clarkson, Nebraska Methodist, College of Saint Mary, Midland and Union
  Adventist LPN-to-BSN. Central's and Metro's ADNs are PN-then-RN ladders (Metro requires a finished PN program first; its own PN graduates don't
  need a license), so they carry no bridge flag; from Fall 2026 Southeast's ADN also starts with a PN year (new curriculum pending accreditation).
- **Agreements (17):** the UNMC Nebraska RN to BSN Collaborative (guaranteed early admission with a 3.25 GPA) from all six community-college ADNs
  (the page looks dated, © 2014, so cards say check with the school); Clarkson's signed RN-to-BSN articulations with all six (2026-27 transfer
  plans); Nebraska Methodist transfer guides from Central, Northeast, Southeast and Metro; Central → Bellevue (signed Oct 29, 2026). Dropped:
  Mid-Plains → Bryan / Midland / Bellevue (only search-result text of a catalog page that wouldn't load; Bryan has no RN-to-BSN and Midland's is
  paused); duplicates recorded by two agents.
- **Spot check (2026-11-20):** WNCC ADN admission (TEAS + critical thinking 60, prerequisite GPA 3.0, May 15 deadline, nursing assistant registry,
  4 semesters), UNMC traditional BSN (3.0 prerequisite GPA, Oct 1 / Jan 15 / Apr 1, $464 per credit resident on the 2026-27 cost sheet; CCNE) and
  Clarkson nurse anesthesia (36 months, 3.0 GPA, one year critical care, Dec 1 deadline, $1,212 per credit, COA through June 2036) matched the
  cited pages.
- **Known gaps / owner attention:** **WGU's** Nebraska pre-licensure BSN: its program page says the board approved it (Omaha clinical district), but
  its state-licensure page leaves Nebraska off (card says check with the school). **Metro CC's 2025 rate was 75.9%** (66 of 87), below the national
  86.7%. Bryan's and Midland's main sites returned 403, so their records come from their catalog sites; a few Midland facts (tuition, LPN-to-BSN
  GPA and length) come from search-engine copies of Midland's own pages (each card says so). CCC, WNCC and MPCC catalogs were unreadable, so some
  credit totals and prerequisites are null. WNCC states its latest ACEN decision as "initial Accreditation". Creighton's Grand Island site no longer
  appears on current pages (only Omaha is listed). UNMC's catalog returned 503 (graduate credits unconfirmed).
- **Tuition (`NE.tuition`, added 2026-11-20):** 15 of 18 schools, College Scorecard 2025-26. Overrides: Southeast Community College Area → 181640,
  Nebraska Methodist College → 181297. Left out: UNMC (no tuition reported), Herzing and WGU (home campus out of state). Nebraska's community
  colleges charge one Nebraska-resident rate (no in-district rate), so they're labeled "in-state".
- **Refresh:** look each spring for the board's new NCLEX-RN table (and ask the board whether it publishes the bachelor's rows).
