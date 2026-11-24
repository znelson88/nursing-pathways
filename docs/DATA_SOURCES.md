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


# Data sources (schools page — Kansas, added 2026-11-20)

Kansas: **37 schools / 81 programs / 80 transfer agreements** in `data/schools/ks.js` (verified 2026-11-20), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** Kansas State Board of Nursing "Undergraduate Prelicensure Programs" (ksbn.kansas.gov/wp-content/uploads/Education/Prelicensure-Programs.pdf,
  revised 2025-12; linked from ksbn.kansas.gov/programs/) plus its "KSBN Approved Graduate Nursing Schools in Kansas" (last revised 6/2021, so
  graduate programs were confirmed on each school's current pages). Every public and private nonprofit RN program on the list is included:
  15 community colleges, 5 technical colleges (Fort Hays Tech North Central at Beloit and Hays, Manhattan Tech, Salina Tech, Washburn Tech,
  WSU Tech), 6 public universities and 11 private nonprofits. The roster calls many college programs "1 + 1" (a PN year, then a PN license,
  then the RN year) or "bi-level" (one application, optional PN exit). Like North Dakota's ladder, these ADN records carry no `bridge_from`
  because new students enter through the school's own PN year; the cards describe both routes.
- **NCLEX-RN pass rates:** the board's "Multi-Year Pass Rates RN" table (ksbn.kansas.gov/wp-content/uploads/2022/04/Multi-Year-Pass-Rates-RN.pdf,
  all first-time candidates educated in Kansas, calendar years through Dec 31, 2025, data dated 1/12/2026). Cards show 2023-2025. The table
  gives **rates only, no number tested**, so the per-program figures can't be added up against the statewide total (Kansas 2025: 89.19%;
  ADN 88.45%, BSN 89.86%) the way Missouri's could; rows were read from the PDF's column layout (new programs leave earlier columns blank:
  Ottawa's first figure is 2025, WSU Tech's 2024, Fort Hays Tech Beloit's 2023). The board reports one BSN figure per school (KU's covers
  Kansas City and Salina, Wichita State's covers Wichita and the K-State Manhattan site) and one ADN figure per college; bridge tracks show
  their college's figure. New, no results yet: Barclay College BSN, Southwestern College BSN, Washburn Tech ADN (first cohort Aug 2025).
- **Excluded:** private for-profit — Chamberlain University (Overland Park), Galen College of Nursing (Wichita), Rasmussen University
  (Overland Park, Topeka). **Donnelly College** (board conditional approval, no new admits). PN-only programs (Allied Health Career Training,
  Mid-America College of Health Sciences, Flint Hills Tech, Hutchinson's McPherson PN, JCCC's and KCKCC's PN). Not on the board's roster
  yet, so left out: **KU's Direct-Entry MSN** and **MidAmerica Nazarene's Direct Entry MSN** (both first cohorts in 2027). Not admitting /
  no longer listed: Wichita State's accelerated BSN ("not enrolling"), Barclay's online RN-BSN (no 2026-27 applications), Southwestern's,
  Hesston's, Kansas Wesleyan's, Saint Mary's and MNU's RN-to-BSN and MNU's AGPCNP (not on current pages). Post-master's certificates and
  education/leadership tracks as usual.
- **Bridges (13):** LPN-only tracks at Butler, Cloud County, JCCC, Neosho, Dodge City, Hutchinson (June start), WSU Tech, Washburn
  (LPN-to-BSN), Hesston and Newman (LPN-to-BSN); LPN-or-paramedic at KCKCC (also RRTs) and Hutchinson (online, January start); Colby's
  paramedic/RRT-to-ADN.
- **Agreements (80):** 24 same-school steps (BSN/RN-to-BSN → the school's DNP/CRNA programs, competitive). 56 college → university:
  Fort Hays State's guaranteed RN-to-BSN admission (16 colleges), Wichita State RN-to-BSN partners (13, incl. WSU Tech, Manhattan Tech and
  Fort Hays Tech), KU's Community College Nursing Partnership (concurrent ADN + KU BSN at Butler, Cloud County, Fort Scott, Hutchinson,
  JCCC, KCKCC, Labette, Neosho) and other KU RN-to-BSN partnerships, Washburn transfer guides (incl. Washburn Tech), Pittsburg State's
  ADN-to-BSN Jumpstart (5 colleges), Cloud County → Ottawa University concurrent program (2022 brochure; check with the school). Dropped:
  partners outside Kansas (Grand Canyon, Chamberlain, Missouri/Oklahoma/Arkansas colleges) and pre-nursing transfer plans into a traditional
  BSN (Newman, Southwestern–Cowley, Hesston–Sterling).
- **Spot check (2026-11-20):** Labette ADN (bi-level Level I PN / Level II RN, TEAS Proficient, 3.00 GPA to be considered, CNA, March 4, 2027
  in the packet, ACEN continuing, $132 per credit Kansas resident + $85 health-care course fee), Pittsburg State BSN (Dec 15 deadline, TEAS
  65.0%, 3.0 GPA / 2.50 science-math, CNA, 120 hours, CCNE, $326 per credit 2026-27) and Newman's nurse anesthesia DNAP (36 months, 88 credits,
  3.0 GPA or 3.2 last 60 hours, 1 year ICU, $1,321 per credit 2026-27 + $3,300 yearly program fee) matched the cited pages. Newman's program
  page still says the next COA review is May 2026; the COA renewal (June 3, 2026) is from Newman's own news page.
- **Known gaps / owner attention:** **Bethel College's** site (bethelks.edu) returned 403 everywhere, so its BSN facts come from search-engine
  copies of its own pages (card says check with the school; cost null). **JCCC's** site was blocked too (same treatment). Newman's,
  Benedictine's and MNU's catalogs, Wichita State's, Washburn's and Fort Hays State's catalogs were unreadable, so some prerequisites and
  deadlines are null. **Conditional board approval:** Fort Scott (ADN) and Seward County (ADN level) — noted on the cards. Neosho's ACEN status
  is "continuing with conditions"; KU's nurse-midwifery ACME status is "continued accreditation - on probation" (KU's own page). Low recent
  rates: Ottawa University BSN 69.23% (2025, first class), WSU Tech ADN 77.78% (2025), Seward 80.00% (2025). Coffeyville's ADN is board-approved
  only (no national accreditation). The roster PDF is dated 2025-12 — the newest the board posts.
- **Tuition (`KS.tuition`, added 2026-11-20):** 36 of 37 schools, College Scorecard 2025-26. Kansas community colleges are county-based
  districts with a lower in-district rate (JCCC's College Navigator page shows in-district $2,424 vs in-state $2,904 for 2024-25), so the 15
  community colleges are labeled "in-district"; the technical colleges and universities "in-state". Overrides: University of Kansas → 155317
  (Lawrence, university-wide undergraduate rate; the School of Nursing is at KU Medical Center), Bethel College-North Newton → 154749, Barton
  County Community College → 154697, Washburn Institute of Technology → 155423. Left out: Ottawa University-Kansas City (Scorecard reports no
  tuition; its cards show the school's own per-credit prices).
- **Refresh:** re-pull the roster and the board's Multi-Year Pass Rates RN table each January (the new year's figures appear mid-January).


# Data sources (schools page — Oklahoma, added 2026-11-21)

Oklahoma: **32 schools / 88 programs / 17 transfer agreements** in `data/schools/ok.js` (verified 2026-11-21), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** Oklahoma Board of Nursing "State Approved Nursing Education Programs" lists, linked from
  oklahoma.gov/nursing/education/education-program-types.html: Associate Degree (ed-schls2.pdf, revised 09/23/26; "17 programs on 34
  campuses"), Baccalaureate Degree (ed-schls3.pdf, revised 09/23/26; "16 programs across 33 campuses") and APRN (ed-schls4.pdf, revised
  10/6/25). Every public and private nonprofit RN program is included: 14 two-year colleges (all with an LPN or LPN/paramedic bridge
  track), Mid-America Christian (new ADN, provisional approval), 9 public universities and 7 private nonprofit universities. Southeastern
  Oklahoma State is included for its RN-to-BSN only (not a pre-licensure school). Cameron University has no nursing degree (OU teaches its
  BSN on Cameron's Lawton campus), so it is not listed.
- **NCLEX-RN pass rates:** the board's "First-Time NCLEX-RN Candidate Ten-Year Pass Rate Percentage by Calendar Year" table
  (oklahoma.gov/content/dam/ok/en/nursing/documents/nclexpass1.pdf, 2015-2025). Cards show 2023-2025; the table gives the number tested
  only for 2025. **Cross-check:** the 2025 per-program rows add up to 2,755 candidates against the board's statewide 2,746 (9 more,
  0.3%), and the implied passes (2,217) give exactly the board's statewide 80.47%; the small gap couldn't be traced (likely a late
  correction in one row), so figures are used as published. The board reports by campus; cards list each campus. Online bridge rows
  (Carl Albert, Eastern, Murray incl. its Duncan career-mobility site, Rose State, Western) are shown on the bridge records; Oklahoma
  Christian's online and Chickasaw Nation (Ada) tracks and Tulsa's online ABSN have their own rows. The board lists one row per school for
  OU's BSN (by site, incl. "Online"), OCU, UCO and others, so their accelerated and LPN tracks show the school figure. New, no results
  yet: Mid-America Christian ADN and Northeastern State BSN (provisional approval). Southern Nazarene had no 2025 first-time takers.
- **Excluded:** private for-profit — **ATA College** (Tulsa; its July 2026 catalog: LLC owned by A Technological Advantage, Inc.,
  licensed as a private vocational school) and **Central Oklahoma College** (Oklahoma City; its catalog: "Central State Beauty Academy,
  Inc. dba Central Oklahoma College", ACCSC-accredited). Closed sites on the board's table: Marian University (OKC) and Oklahoma Christian's
  Integris Baptist and Mercy Hospital sites. **OU's nurse anesthesia DNP**: OU's pages still show COA initial accreditation pending with
  no enrollment until it is granted (planned Spring 2027 start) — add it once accredited. OU's Neonatal CNS track (page 404, not on OU's
  current DNP menu). Not admitting: Tulsa's RN-to-BSN/RN-to-MSN ("not accepting applications at this time"); East Central has no current
  RN-to-BSN; Oklahoma Christian, OBU and SNU offer no RN-to-BSN. Post-master's certificates and education/leadership tracks as usual.
- **Bridges (24):** 12 LPN-only (Carl Albert, Seminole, Redlands, Western, East Central "LPN Pathways", Langston, NWOSU, SWOSU, OU, OCU,
  OBU, OKWU) and 12 LPN-or-paramedic (Connors, Eastern, NEO, OSUIT, TCC, Murray, NOC, OCCC, OSU-OKC, Rose State, MACU, Rogers State).
  OCCC's BADNAP (accelerated ADN for bachelor's holders) admits new students, so it sits inside OCCC's ADN record.
- **Agreements (17):** 8 same-school steps (BSN/RN-to-BSN → the school's DNP: OU, Tulsa incl. CRNA, OCU, NWOSU, ORU). 9 college → university
  RN-to-BSN: TCC, Rose State, Connors and OSU-OKC → UCO (UCO catalog transfer plans; pages blocked automated reading, so years are
  unconfirmed), NOC and Redlands → NWOSU, Western → SWOSU (signed 2023), OSU-OKC → OSU Stillwater (priority admission), Murray State →
  OU (signed 2026-27 map). Dropped: Murray at Southeastern → Southeastern RN-BSN (the 2021 MOU only says an RN-BSN "may" be developed),
  Eastern → East Central (ECU no longer lists an RN-to-BSN), pre-nursing transfer plans into a traditional BSN (TCC → OU/TU/OCU, Rose State
  → UCO, Seminole → ECU) and out-of-state partners (Carl Albert → Arkansas Tech).
- **Spot check (2026-11-21):** OCCC ADN (Accuplacer Next-Gen Reading 250, 2.5 retention GPA, ranked by up to 29 preference points then
  GPA, 70-71 credits, resident program estimate $10,656.51 / non-resident $17,557.71 AY26) matched OCCC's Prospective Nursing Student
  Information PDF; SWOSU BSN (2.50 retention GPA, fall window Sep 1 - Feb 1, spring Feb 2 - Jul 1) matched its BSN page, and its ACEN
  accreditation is now cited from swosu.edu/nursing/accreditation.php; NWOSU BSN-to-DNP FNP (73 credits, 1,020 practicum hours, 3- or
  4-year plans, Oct 1 - Feb 1 applications, CCNE, $440 in-state per credit + $300 online + $350 residency) matched its pages. OCU's FNP
  page was the first graduate pick but returned 403 to a plain request, so NWOSU's was checked instead.
- **Known gaps / owner attention:** sites that blocked automated reading — **Rogers State, UCO, OSU-OKC, NEO, OSUIT, Oklahoma State
  (Stillwater)** — so their facts come partly from search-engine copies of the schools' own pages (each card says so; check with the
  school), with many nulls (OSU's accreditation is null). **Board warnings/conditions** (from the roster, noted on cards): "Full Approval w/
  Warning" for Connors, Seminole State, NOC Stillwater, Redlands, Langston (Langston campus), Oklahoma Christian online BSN, ORU and SNU;
  Conditional for Langston Tulsa and SWOSU's online LPN-to-BSN; Provisional for Northeastern State's BSN and Mid-America Christian's ADN
  (ACEN candidate). **Low 2025 rates** (statewide 80.47%): Connors Muskogee 49.46% (93 takers), Oklahoma Christian online BSN 57.69% (52),
  Langston 64.29%, ORU 64.52%, Tulsa online ABSN 64.86% (first class), OU Lawton 66.67%, SWOSU online LPN-to-BSN 68.99% (129). Southern
  Nazarene's BSN had no 2025 takers but its site shows no pause (check). Seminole's online LPN track isn't confirmed as still admitting.
  Many deadlines differ between a school's own pages (recorded as both, "check with the school").
- **Tuition (`OK.tuition`, added 2026-11-21):** all 32 schools, College Scorecard 2025-26. Oklahoma's two-year colleges charge one
  resident rate statewide (no county in-district rate), so every school is labeled "in-state". Overrides: Oklahoma State → 207388 (Main
  Campus), University of Oklahoma → 207500 (Norman, university-wide undergraduate rate; the Health Sciences Center reports no tuition),
  University of Tulsa → 207971, Oklahoma City University → 207458.
- **Refresh:** re-pull the three roster PDFs and the ten-year NCLEX-RN table each spring (the board updates the table after the calendar year).

# Data sources (schools page — Texas wave 1, added 2026-11-21)

Texas wave 1: **107 schools / 228 programs / 93 transfer agreements** in `data/schools/tx.js` (verified 2026-11-21), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`. Texas is a "very large" state, so wave 1 covers
every public and private nonprofit **pre-licensure RN program** (ADN incl. LVN/paramedic bridges, BSN, accelerated BSN, LVN-to-BSN,
diploma, alternate/direct-entry MSN) and each school's **RN-to-BSN**. **Graduate NP/CRNA/CNM/CNS programs are wave 2** (routes to
those jobs fall back out of state until then).

- **Master roster:** Texas Board of Nursing "Texas Approved Pre-Licensure Professional Nursing Education Programs"
  (bon.texas.gov/pdfs/education_pdfs/education_programs/ApprovedRNSchools.pdf, dated 11/12/26: 74 ADN, 62 BSN, 1 diploma, 2
  alternate-entry MSN = 139 programs), linked from bon.texas.gov/education_programs.asp.html. Included: 55 two-year colleges, 29
  public universities, 23 private nonprofits (incl. Covenant School of Nursing's hospital diploma). Lone Star College's five campus
  programs, San Jacinto's Central/South programs, Howard College's Big Spring/San Angelo programs and TSTC's Harlingen/West Texas
  programs are each one school with campuses. Fairfield University (Connecticut nonprofit) is included and labeled as an out-of-state
  university's Austin site because the board counts it.
- **NCLEX-RN pass rates:** the board's "RN Pass Rates for Last 5 Years" table (RN 5YR-25.pdf, same folder; calendar years
  2021-2025, passed/tested by program). Cards show 2023-2025. **Cross-check:** the per-program rows add up exactly to the board's
  ADN, BSN, diploma and MSN totals for 2025 and 2024 (2025: 16,451 tested / 14,580 passed statewide, also matching the board's April
  2026 report, agenda item 3-2-13) and for 2023 BSN/MSN/diploma; older ADN years are short by about 200 takers (closed programs no
  longer listed; not used on cards). The board reports one row per school for most BSNs (all tracks); University of St. Thomas's
  accelerated BSN and the two alternate-entry MSNs have their own rows. New, no results yet: Houston City College (replaced Houston
  Community College's closed ADN), Lamar Institute of Technology, Palo Alto, Northeast Lakeview, Coastal Bend (re-opened LVN-to-ADN;
  the old closed program's results are not used), Hardin-Simmons, St. Mary's and UNT Health Science Center.
- **Excluded — private for-profit** (College Navigator showed a high-traffic notice, so catalogs, regulators or the Carnegie
  Classifications/IPEDS profile were used): American Career College, ECPI University, Galen College of Nursing (HCA), South College,
  Southern Careers Institute, Southwest University at El Paso, The College of Health Care Professions, Arizona College of Nursing,
  Chamberlain (4 campuses), Denver College of Nursing, West Coast University, Western Technical College, **Baptist Health System School
  of Health Professions** (Carnegie/IPEDS: private for-profit; parent VHS San Antonio Partners LLC), **Rio Grande Valley College**
  (Carnegie/IPEDS: private for-profit) and **South University** (Carnegie/IPEDS lists the Austin campus as for-profit; a Perdoceo
  purchase was signed Sept 2026). **Not researched (ownership unconfirmed):** Texas Health School and Texas School of Health Sciences —
  no ownership statement found on their own sites; left out of wave 1 pending a check. Closed programs on the board list (Aspen, College
  of Nursing and Advanced Health Professions, Houston Community College's old ADN, Coastal Bend's old ADN) are not used.
- **Left out, not admitting or not confirmed:** Alvin College's new RN-to-BSN ("pending final program approval" on its own page);
  UTHealth Houston's RN-to-BSN (new admissions on hold from Fall 2026); Schreiner's new ADN (on the roster as initial approval but not on
  Schreiner's site yet); RN-to-BSN tracks the roster or older pages mention but the school's current pages don't list (TAMUCC, Concordia,
  ACU, Howard Payne, McMurry, UMHB, Angelo State, UT Austin, UT San Antonio); Midwestern State's ACCEL BSN and Texas State's
  second-degree track (current pages don't show them). RN-to-BSN-only universities not on the pre-licensure roster (e.g. Lubbock
  Christian) are wave 2.
- **Orchestrator decisions:** UTA's Accelerated Online BSN, UTHealth Houston's Pacesetter and Texas Tech El Paso's Accelerated BSN are
  listed as regular BSNs (`bsn`), because none requires a prior bachelor's degree. TTUHSC's Veteran to BSN is a BSN with no
  `bridge_from` (it needs military medic training, not a license). Lamar State College Orange's generic ADN is included from the
  school's own BON-approval release (Jan 2025 start) although the roster names only its LVN track.
- **Bridges (64):** LVN-to-ADN tracks (`lpn`), LVN/paramedic tracks (`lpn_or_paramedic`), paramedic-only tracks (Blinn, Tyler JC,
  Howard College, Vernon) and LVN-to-BSN at Prairie View, Sam Houston, Tarleton, WTAMU, SWAU and Wayland.
- **Agreements (93):** 14 same-school ADN → RN-to-BSN steps and 79 college → university RN-to-BSN partnerships (UT Tyler concurrent
  enrollment, TTUHSC early decision/articulation, Sam Houston joint admission, SFA SONIC, Midwestern State partner colleges, TWU blended
  ADN/BSN, Texas A&M RN-BSN, Lamar University pathways, East Texas A&M). 33 pairs found by both schools' agents were merged. Dropped:
  partners not in wave 1 (Lubbock Christian, UH-Victoria, UH-Clear Lake, Texas A&M-Central Texas) and RN-to-BSNs not confirmed above.
- **Spot check (2026-11-21):** McLennan CC ADN (two years after prerequisites, HESI A2, Spring 2027 deadline Oct 19, 2026 / Fall 2027
  May 10, 2027, ACEN continuing accreditation, about $13,077 total for county residents with no year stated) matched its ADN and cost
  pages; Texas State BSN (Round Rock; TEAS 85% Priority / 70% General and External; NURS GPA 3.0, science GPA 3.5/3.0; deadlines Jan 1,
  Jan 15, Mar 15, 2027) matched its admission-requirements page; UT Austin Alternate Entry MSN (3 years full-time from each summer,
  Aug 1 - Oct 1 window, 3.0 GPA, seven prerequisites with C- or better, non-nursing bachelor's) matched its page, including the page's own
  24-vs-23 credit discrepancy noted on the card.
- **Known gaps / owner attention:** many school sites or catalogs blocked automated reading (Tyler JC, Central Texas College, Blinn,
  Prairie View, Sul Ross, the Laredo, Dallas College, Texas State, UTA and UT Austin catalogs and others), so some records rest on the
  schools' PDFs or search copies of their own pages, with many nulls (38 pre-licensure records have no stated accreditation). **Board
  approval:** Sul Ross State's BSN is on **Conditional** approval. **ACEN conditions:** College of the Mainland, Galveston and Dallas
  College ADNs. **Low 2025 rates** (statewide 88.63%): Sul Ross 57% (7 takers), Wayland 59% (17), TSTC West Texas 63%, St. Thomas
  accelerated BSN 71% (231) and Houston BSN 77%, Hill College 74%, WGU 75% (145), TSTC Harlingen 78%, Tarleton 78% (193), Amarillo 79%
  (236), East Texas A&M 79%, Hallmark 80%. Hallmark is included as a nonprofit on its own statement (nonprofit since 2013) and is only an
  ACEN candidate (expires March 2027). Several roster tracks weren't found on the schools' sites (Collin and Laredo paramedic/allied
  tracks, South Texas and Vernon apprenticeships, Amarillo's Dumas and Ranger's Brownwood sites).
- **Tuition (`TX.tuition`, added 2026-11-21):** 98 of 107 schools, College Scorecard 2025-26. Texas community colleges are taxing
  districts with an in-district rate, so 51 of them are labeled "in-district" (not Lamar State College Orange/Port Arthur, Lamar Institute
  of Technology or TSTC, which charge one state rate). Overrides: Alvin 222567, San Jacinto 227979, Collin 247834, Austin CC 222992, Blinn
  223427, WTAMU 229814, TWU 229179, Lamar University 226091, Texas State 228459, University of Houston 225511, Baylor 223232, TCU 228875,
  plus confirmed name matches (UT and A&M campuses; UT San Antonio = 229027 after the 2025 merger; TTUHSC El Paso 492689). Left out (no
  Scorecard tuition or no Texas record): Fairfield (Austin site), Patty Hanks Shelton, WGU Texas, Hallmark, Covenant, UTHealth Houston,
  UTMB, Texas Tech HSC (Lubbock), UNT Health Science Center.
- **Refresh:** re-pull the roster and the five-year NCLEX-RN table each spring. **Wave 2:** graduate APRN programs (NP, CRNA, CNM,
  CNS) at these schools plus graduate-only and RN-to-BSN-only universities.

## Texas wave 2 — graduate APRN programs (added 2026-11-22)

Texas now totals **112 schools / 325 programs / 98 agreements**. Wave 2 added **94 graduate APRN programs, 3 RN-to-BSNs, 5 schools
and 5 agreements** (verified 2026-11-22 from each school's own site by six parallel research agents, merged into the wave-1 file with
the same build rules: graduate and RN-to-BSN programs are open entry; pre-licensure records and pass rates are unchanged).

- **Roster:** the Texas Board of Nursing's 2025 Nursing Education Program Information Survey, graduate edition, as published by the
  Texas Center for Nursing Workforce Studies ("2025 Admission, Enrollment, and Graduation — Graduate Nursing Programs",
  dshs.texas.gov/sites/default/files/chs/cnws/NEPIS/2025/Graduate/2025-gnepis-enrollment-graduation-admissions-spreadsheet_final.pdf):
  40 graduate nursing programs with enrollment by track (NP, CNS, nurse anesthetist, nurse-midwife). The board does not approve
  APRN programs separately (22 TAC 221.3 requires an accredited program), so this survey is the official list. Each school's own
  site decided which tracks are currently admitting.
- **Specialties added:** FNP 35, PMHNP 19, pediatric NP 11 (primary and acute), AGACNP 10, nurse anesthesia 8 (UT Tyler, UTHealth
  Houston, UT San Antonio, UTMB, TCU, Baylor College of Medicine, Texas Wesleyan, UIW), neonatal NP 4, AGPCNP 3, nurse-midwifery 2
  (Baylor, TTUHSC), CNS 1 (UT Austin), WHNP 1 (TWU). MSN and BSN-to-DNP versions of one specialty are separate records.
- **New schools:** Baylor College of Medicine (graduate-only, BSN-DNP nurse anesthesia), Texas Wesleyan University (nurse anesthesia
  DNAP, MSN and DNP FNP; private nonprofit per College Scorecard), Lubbock Christian University (RN-to-BSN, MSN FNP), Texas A&M
  University-Victoria (formerly University of Houston-Victoria, moved to the A&M System Sept 1, 2025; RN-to-BSN; id `uhv`) and Texas
  A&M University-Central Texas (RN-to-BSN).
- **Agreements (5):** Covenant diploma → LCU (integrated BSN), Victoria College ADN → A&M-Victoria (concurrent ADN/BSN), Central Texas
  College, McLennan and Austin CC ADNs → A&M-Central Texas (transfer pathway sheets).
- **Left out:** post-master's certificates and post-master's DNPs everywhere; Baylor's U.S. Army Graduate Program in Anesthesia Nursing
  (applicants must join the Army and owe five years of service — not an open civilian route); TCU's CNS (on the survey, not on TCU's
  current program list); HCU's pediatric NP (no new students after Fall 2025); UMHB's AGACNP ("not currently accepting applications");
  McMurry/Patty Hanks MSN-FNP (still in the 2025-26 catalog but gone from the current nursing page and inquiry form — treated as not
  admitting); University of Houston-Clear Lake (RN-to-BSN phasing out in 2026, no APRN tracks). No APRN program found at Tarleton,
  Lamar (FPMHNP and nurse anesthesia "being developed"), ACU, Wayland, Texas Tech El Paso (survey shows NP enrollment; the site lists
  only a leadership MSN) or UTEP's CRNA (survey hint only).
- **Spot check (2026-11-22):** Baylor College of Medicine nurse anesthesia (June 1 deadline / June 15 documents, 3.0 GPA, GRE, 1 year ICU
  with 2 preferred, Texas or compact RN, CCRN encouraged) matched its admissions page; Texas State online MSN-FNP (43 credits, $502 per
  credit, 3.25 GPA, Texas RN, 1 year RN experience, deadlines 12/17/26, 5/3/27, 7/28/27, CCNE) matched its page, which states a $21,084
  total that does not equal $502 x 43 (noted on the card); Lubbock Christian RN-to-BSN (online, 2.5 GPA, current or pending RN, 120 hours
  incl. 42 validation hours, ACEN) matched its catalog; its $530 per hour rate is on LCU's tuition page (cited).
- **Known gaps / owner attention:** many catalogs blocked automated reading (UTA, UTEP, UTHealth, UT San Antonio, TTUHSC El Paso, the
  A&M campuses, TWU, SFASU, Midwestern State, Baylor, Texas Wesleyan, ACU). **Prairie View's** FNP and **A&M-Central Texas** (whole
  site 403) rest on search excerpts of their own pages. Accreditation to watch: TAMIU's MSN ("approved by ACEN until 2026"), TCU's
  nurse anesthesia (COA through 2026, review by December 2026), Texas Wesleyan's MSN-FNP (CCNE visit Nov 4-6, 2026), Prairie View
  (ACEN/CCNE visits fall 2025, outcome not found). New anesthesia programs: UT Tyler (first class 2025), UIW (first class Fall 2026),
  UTMB (no graduates yet). Many graduate costs are null (no figure on the program page) and several pages disagree on deadlines; each
  card says so. Residency limits: UT Tyler APRN students must live and do clinicals in Texas; TWU's campus NP tracks, Angelo State and
  several others require Texas residency or a Texas RN license.
- **Tuition:** College Scorecard 2025-26 added for Texas Wesleyan, LCU, A&M-Victoria and A&M-Central Texas (`TX.tuition` now 102
  schools); Baylor College of Medicine has no Scorecard tuition figure.

# Data sources (schools page — Minnesota, added 2026-11-22)

Minnesota: **46 schools / 104 programs / 60 transfer agreements** in `data/schools/mn.js` (verified 2026-11-22), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** Minnesota Board of Nursing "Approved Professional Nursing Programs" page
  (mn.gov/boards/nursing/education/approved-professional-nursing-programs, read 2026-11-22: baccalaureate, entry-level master's and
  associate degree lists) checked against Appendix A1 (licensure-preparing programs, as of Dec 31, 2025: 25 ADN, 22 baccalaureate, 4
  entry-level master's) and Appendix H (advanced practice programs) of the board's **2025 Annual Nursing Education Program Report**
  (mn.gov/boards/assets/2025_Annual_Educ_Rpt_revised_tcm21-378590.pdf). The board's other HTML pages (advanced practice list, corrective
  action list) returned a "verify you are human" page on the next request, so they were not read; the annual report PDF covers the same
  ground. Included: 22 Minnesota State and tribal two-year colleges, 8 public universities (seven Minnesota State universities incl.
  Southwest Minnesota State for its RN-to-BSN only, and the University of Minnesota), and 16 private nonprofits incl. Augsburg (RN-to-BSN +
  DNP FNP only) and Mayo Clinic School of Health Sciences (nurse anesthesia DNAP only).
- **NCLEX-RN pass rates:** the board's "Number and First-time Success Rate of NCLEX-RN Candidates Educated in Minnesota" table
  (mn.gov/boards/assets/2022-2025_RN_NCLEX_tcm21-280648.pdf, ADN and baccalaureate/higher pages, calendar years 2022-2025 with counts).
  Cards show 2023-2025. **Cross-check:** the ADN rows add up exactly to the board's ADN totals for 2022-2024 (2025: 1,713 tested vs the
  board's 1,714, 81.73% vs 81.74%); the baccalaureate/master's rows match exactly for 2022 and 2025 (2023 and 2024 totals are one candidate
  higher than the rows). The one-candidate gaps couldn't be traced; figures are used as published. The board reports one row per school
  (St. Scholastica, UMN and others cover all sites and BSN tracks) and separate "Master" rows for the entry-level master's programs at
  Metro State, St. Catherine, UMN and St. Thomas. New, no results yet: **University of St. Thomas BSN**. Saint Mary's BSN is new (first
  results in 2025).
- **Excluded:** private for-profit — **Rasmussen University** (ADN at Mankato, Moorhead [voluntary closure effective Dec 31, 2027] and
  St. Cloud; BSN; MSN NP), **Chamberlain University** (BSN, Shoreview), **Capella University** (BSN; MSN NP) and **Walden University**
  (MSN/DNP NP). **Minneapolis School of Anesthesia**: Metro State no longer accepts applications to their joint DNP, and the new DNAP with
  Northwestern Health Sciences University is still awaiting approvals and COA review (first cohort 2027 or 2028 per its own pages) — add
  it once it enrolls. Also left out: Winona State's proposed Direct-Entry MS (pending board approval), UMN's Pediatric CNS (not accepting
  applications) and post-DNP AGACNP certificate, Saint Mary's, Bethel's and Crown's RN-to-BSNs (only in older catalogs), Herzing's online
  NP programs (run by its online division, not the Minneapolis campus).
- **Bridges (18):** LPN-only main programs at Alexandria, Pine Tech, Minnesota West, Northland and St. Cloud Tech (the board marks these
  "admits LPNs only"); separate LPN tracks at Anoka-Ramsey, Inver Hills (thin data — confirm it still admits), Minneapolis College, Lake
  Superior, Fond du Lac, Central Lakes, Minnesota North, M State, Northwest Tech, Ridgewater and South Central; Century's track takes LPNs
  or paramedics; Herzing's LPN-to-BSN.
- **Agreements (60):** St. Cloud State's RN-to-BS memorandum with 22 Minnesota State colleges (meeting the terms doesn't guarantee
  admission; "Hibbing Community College" mapped to Minnesota North); Bemidji State's Operation LEAD (7 colleges, guaranteed admission);
  MSU Moorhead dual/automatic acceptance (8); MSU Mankato Maverick Advance Plan and partners (6; Riverland's plan dates from 2022 — check);
  Augsburg RN-BSN partners (8); Winona State dual admission (Minnesota State College Southeast, Riverland); Metro State (Anoka-Ramsey,
  South Central); St. Scholastica (Lake Superior, Fond du Lac); 3 same-school steps to an FNP (Metro State, St. Catherine, CSB/SJU). Eleven
  pathways found by both the college's and the university's research agent were kept once. Not recorded: the Minnesota Alliance for
  Nursing Education (MANE) dual admission with Metro State (being phased out; no current partner list), UMN's Saint Paul College pathway
  (Saint Paul College has no RN program), out-of-state partners (UW-Green Bay, UW-Superior, Mayville State, Minot State, UND).
- **Spot check (2026-11-22):** RCTC ADN (HSRT exam, 2.5 cumulative and science GPA, ranked by HSRT/10 + science-GPA points, deadlines
  March 1 / Sept 15, LPN Mobility needs a MN LPN license and C in BIOL 1217/CHEM 1117/ENGL 1117) matched its admission and FAQ pages;
  Winona State BSN (TEAS 58.7, 3.0 GPA holistic / 3.75 direct admission, Oct 1 and Feb 15 deadlines, 90-100 admitted per term, CCNE,
  Winona and Rochester) matched; Mayo DNAP (3.25 GPA, two years ICU, CCRN, July 1 - Sept 1 window, 39 months, $796/credit, $72,691 total)
  matched — the total has no year on the page, so the card now says so.
- **Known gaps / owner attention:** **Mayo's COA accreditation** is shown on its page as "October 2024 to 2026" — check it was renewed.
  **Accreditation with conditions:** ACEN conditions at Anoka-Ramsey (follow-up report due Feb 2027), Minneapolis College, Lake Superior and
  South Central; Saint Mary's BSN moved to "Approved with Conditions" by the board (June 2025 minutes; the school's pages don't say).
  **Low 2025 first-time rates** (board minimum 75%; statewide 83.44%): Fond du Lac 57.14% (14 takers), Northwest Tech 69.79% (96), Inver
  Hills 70.33% (91), Metro State BSN 70.97% (31), MSU Moorhead 73.47% (49). Ridgewater received a board reprimand (June 2026) over a
  faculty licensing issue; approval unchanged. Inver Hills is merging with Dakota County Technical College (summer 2027). St. Catherine's
  entry-level master's isn't taking applications until April 1, 2027 (Spring 2028 start). Pages that blocked automated reading: Riverland
  (main nursing page; cost null), Minneapolis College (application page), M State (nursing page redirects to a login), and the St.
  Scholastica, Bethany Lutheran, St. Catherine, Bethel, CSP and Crown catalogs. Many costs are per credit or college-wide; several are null
  (Pine Tech, Central Lakes, M State, Minnesota West, Northwest Tech, Bemidji State, some DNPs).
- **Not an NLC state:** the compact bill (HF 1925 / SF 2608) was introduced in 2025 and never left committee (revisor.mn.gov).
- **Tuition (`MN.tuition`, added 2026-11-22):** 45 of 46 schools, College Scorecard 2025-26. Minnesota State colleges charge one resident
  rate statewide (no local district rate), so every school is labeled "in-state". Overrides: Minneapolis College → 174136 (the name match
  picked Minnesota North), University of Minnesota → 174066 (Twin Cities), Central Lakes → 173203 (Brainerd), CSB/SJU → 174747 (College of
  Saint Benedict), Concordia → 173300 (Moorhead). Skipped: Mayo Clinic School of Health Sciences (graduate-only; Scorecard's figure isn't
  comparable).
- **Refresh:** re-pull the board's NCLEX-RN table and annual education report each spring.


# Data sources (schools page — Iowa, added 2026-11-23)

Iowa: **37 schools / 86 programs / 44 transfer agreements** in `data/schools/ia.js` (verified 2026-11-23), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** the board's own "List of nursing programs approved by the Iowa Board of Nursing" (a Google Sheet linked from
  dial.iowa.gov/i-need/licenses/medical/nursing-professional-midwifery/nursing-education/iowa-nursing-education-programs) returned
  "410 Gone" on 2026-11-23, so the roster is the board's **Nursing Education & Licensing Data Report** (dial.iowa.gov/media/8940,
  "Approved Nursing Education Program Sites": associate, bachelor's and graduate program locations; education data from 2022-23)
  checked against every program in the board's **"RN Program Data 2025"** NCLEX table. Included: 15 community colleges, the
  University of Iowa, Iowa State, UNI, Purdue University Global's Iowa ASN sites, and 18 private nonprofits.
- **NCLEX-RN pass rates:** "RN Program Data 2025" (linked from the board's Nursing Program Statistics page; NCSBN program summary,
  calendar years 2021-2025 with counts; cards show 2023-2025). The board reports one row per school (Mercy's ASN and BSN, St. Luke's
  ASN and accelerated BSN, and the University of Iowa's BSN and Master's entry are separate rows; Drake's row is its accelerated BSN).
  **Cross-check:** the 2024 rows add up to 2,091 first-time takers / 1,940 passed; NCSBN's 2024 Report 1 for the Iowa board
  (dial.iowa.gov/media/8864) says 2,091 / 1,941 — the one-pass gap is rounding in St. Ambrose's rate (printed "89.11" with no %).
  New, no results yet: **UNI** (BSN first graduates spring 2027; ABSN first cohort Aug 2026) and **Iowa State's accelerated BSN**
  (first cohort summer 2027). Graceland's small Iowa row (1-2 takers a year) predates its new residential Lamoni BSN (fall 2025);
  the card says so.
- **Excluded / not added:** Iowa Wesleyan University (closed 2023; still in the board's table). Upper Iowa University (stopped
  admitting to its RN-to-BSN June 2023; only a 3+1 pre-nursing pathway into Allen College). Clarke's DNP (teach-out through May 2028,
  no new students) and Clarke's RN-to-BSN (not in the 2026-27 catalog). St. Luke's RN-to-BSN ("no longer accepting applications").
  Northwestern College's RN-to-BSN (page gone; not among current programs). Graceland's accelerated BSN in Independence, Missouri
  (out of state). Grand View's RN-to-BSN couldn't be confirmed (missing from current pages), so it isn't listed. No private for-profit
  RN programs are on Iowa's roster. **Purdue University Global** is included: it calls itself "a public, nonprofit institution" and
  College Navigator lists it as public (IPEDS 489779); it is operated with Kaplan, which some readers will find surprising.
  **Waldorf University** is included: the U.S. Department of Education approved its conversion to nonprofit status (Feb 2025).
- **Bridges (9):** separate LPN-only entries at Kirkwood, NICC, NIACC, Southeastern, DMACC, Iowa Central, Iowa Lakes and Purdue
  Global, and St. Ambrose's online LPN-to-BSN. Most Iowa community colleges run a PN-then-ADN ladder (the first year earns a practical
  nursing diploma); at Hawkeye, Iowa Valley, Iowa Western, NCC, Southwestern and WITCC the ADN year itself requires the PN year or an
  LPN license. These are explained in the card notes, not marked as bridges, because new students reach them through the PN year.
- **Agreements (44):** University of Iowa RN-BSN 3+1 (14 colleges; NCC appears on UI's online RN-BSN page but not on its separate 3+1
  page — check), Briar Cliff (8 colleges; its list doesn't say RN-BSN vs BSN — check), Mount Mercy (4 colleges incl. EICC early
  admission), Iowa State (DMACC 3+1, Iowa Valley 2026, Kirkwood), Purdue Global, Waldorf (NIACC, Iowa Lakes), Morningside, St. Ambrose,
  and UI's U2G fast track from its RN-BSN into its DNP NP tracks. Dropped: partners outside Iowa, Loras (no RN program on the roster),
  agreements into programs that don't exist (Allen has no RN-to-BSN; Northwestern's and St. Luke's are closed), and 18 duplicates
  found by both schools' agents.
- **Spot check (2026-11-23):** Kirkwood ADN ($27,791.58 estimated total incl. $17,633 tuition at $229/credit, 77 credits, 2.75
  prerequisite GPA with B- in critical courses, "limited and competitive", CNEA through 2027), Coe BSN (2.70 cumulative GPA, standard
  vs direct entry with direct entry capped at one-third of enrollment) and University of Iowa nurse anesthesia DNP (June 1 deadline,
  one year ICU, BLS/ACLS/PALS, interview in Iowa City, CCNE + COA) matched the schools' pages.
- **Known gaps / owner attention:** **Eastern Iowa Community College** is on Iowa Board of Nursing **conditional approval and
  improvement status** (NCLEX below the 80% benchmark; 2025: 70.09% of 117); a board visit in December 2026 decides its status.
  **Low 2025 first-time rates:** William Penn 50.00% (18 takers; its BSN has only interim board approval), Hawkeye 59.15% (71), Dordt
  69.57% (23), EICC 70.09%, Drake ABSN 72.22% (18; ACEN candidacy until May 2027), Purdue Global 77.11% (83). **Mergers:** St. Luke's
  College is joining Morningside University (interim through 2026); St. Ambrose became Mount Mercy's parent in June 2025 (final federal
  step pending) — records stay under each school's own name for now. Coe's CCNE accreditation runs to June 30, 2027 with a fall 2026
  review; result not posted. Dordt's new MSN-FNP has conditional board approval and CCNE pending. Mercy College of Health Sciences is
  now Mercy Health Sciences University (mercyhealthu.edu). Pages that blocked automated reading: dordt.edu, uiu.edu, the uiowa and
  iastate catalogs, and the NIACC, EICC, NICC, Kirkwood, Iowa Valley, Indian Hills and Iowa Central catalogs. Many costs are null or per
  credit (EICC, NIACC, SCC, Iowa Valley, Iowa Central, UI/ISU/UNI program costs, William Penn BSN).
- **NLC state:** Iowa is a Nurse Licensure Compact member (Iowa Code ch. 152E; the board's Nurse Licensure Compact page).
- **Tuition (`IA.tuition`, added 2026-11-23):** 35 of 37 schools, College Scorecard 2025-26. Iowa's community colleges charge one
  Iowa-resident rate (no separate in-district rate), so all are labeled "in-state". Overrides: EICC → 153311 (Eastern Iowa Community
  College District), Iowa Valley → 153922 (Marshalltown Community College; Ellsworth reports the same rate), Mercy → 153977,
  Graceland → 153366 (Lamoni). Skipped: Allen College (no tuition reported to Scorecard) and Purdue Global (home campus in Indiana).
- **Refresh:** re-check the board's roster sheet link (it may be re-shared) and the yearly RN Program Data table each spring.

# Data sources (schools page — Arkansas, added 2026-11-23)

Arkansas: **36 schools / 94 programs / 33 transfer agreements** in `data/schools/ar.js` (verified 2026-11-23), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** the Arkansas State Board of Nursing's approved-program pages (healthy.arkansas.gov/boards-commissions/boards/
  nursing-arkansas-state-board/education/approved-nursing-programs/): "Approved Registered Nursing Associate Degree Programs",
  "Approved Registered Nursing Baccalaureate Degree Programs" and "Post-Baccalaureate Degree Programs" (no revised date shown; read
  2026-11-23). Included: 19 two-year colleges (incl. the ARNEC consortium), 11 public universities and 6 private nonprofits (Baptist Health
  College Little Rock, Jefferson Regional School of Nursing, Harding, John Brown, Ouachita Baptist, Philander Smith).
- **NCLEX-RN pass rates:** the board's "Arkansas Programs – 5 Year NCLEX Licensure Exam Results" (ADN and BSN/Master's-entry tables,
  posted 8/11/2026, linked from the board's NCLEX Exam page). Columns are labeled 2022-2026 but are **fiscal years (July-June)**: UAM's own
  table ("Annual results July 1 – June 30 as reported by the Arkansas State Board of Nursing") matches the board's columns exactly
  (board "2025" BSN 9 of 10 = UAM 2024-25 9 of 10). Cards show 2025-26, 2024-25 and 2023-24 with counts; all campuses of a college are
  combined (Harding's MEPN is its own row; UAMS's BSN and ABSN share one row). **Cross-check:** for all five years the per-program rows add
  up exactly to the board's Arkansas ADN and BSN totals (2025-26: ADN 1,496 / 1,263; BSN 951 / 840; together 2,447 = the all-RN total).
  New, no results yet: Philander Smith BSN, South Arkansas College's traditional RN (SATRN) and UA Rich Mountain's traditional RN.
- **Excluded / not added:** Southeast Arkansas College (closed to new admissions Dec 2023). UAPB's pre-licensure BSN (closed to new
  admissions May 2026; its online RN-BSN is kept). UA Hope-Texarkana (takes part only as an ARNEC site; no program of its own). SAU
  Magnolia's RN-to-BSN (only in the 2025-26 catalog, application page gone — not confirmed as admitting). UARK's DNP AGACNP (not accepting
  students), UCA's BSN-to-DNP (not accepting; MSN FNP kept), Ouachita's online RN-to-BSN (search excerpt says it no longer takes new
  students; page blocked). No private for-profit RN programs are on Arkansas's roster.
- **Bridges (25):** many Arkansas two-year RN programs admit only licensed LPNs (some also paramedics): ARNEC, ASU-Beebe, ASU Three Rivers,
  SAU Tech, UACC Morrilton, Ozarka, ATU-Ozark and UAM's AAS. Most other colleges run a generic track plus a bridge (separate records). Also
  UARK's online LPN-to-BSN and ATU's LPN-to-BSN.
- **Agreements (33):** UCA's RN-to-BSN transfer list (16 colleges, plus ARNEC via UAHT's checklist), UAMS memoranda with 7 colleges
  (they cover UAMS's online RN-to-MNSc, which awards the BSN on the way — mapped to `uams-rnbsn`), NPC's 3+1 with UAM on the NPC campus and
  NPC's agreements with ATU, HSU and UARK, Cossatot → ATU, and internal ADN → RN-BSN at Baptist Health, UALR and ATU. Dropped: 7 duplicates
  found by both schools' agents and UAHT's (no program). Not added: ATU "Nursing" MOUs of unstated type and UAMS "BSN" agreements that are
  scanned images.
- **Spot check (2026-11-23):** UCA BSN (2.75 cumulative / 2.5 science GPA, 125 seats, Feb 15 – Mar 15 for Summer II, ranked by GPA and
  deficits, CCNE), UAMS DNP nurse anesthesia (36 months, 95.5 credits, 2,295 clinical hours, $30,000 a year resident, April 1 – July 1, CCRN,
  COA through fall 2035) and PCCUA's AAS (63 hours, Nelson-Denny + ATI Critical Thinking 55, June 1, ranked by ATI score) matched. Fixed:
  UAMS's "20 per cohort" (not on its pages) removed; PCCUA's ACEN "continuing" wording softened to the seal shown on the page.
- **Known gaps / owner attention:** **Low 2025-26 first-time rates:** UA Cossatot 61.5% (13 takers, new program), UA-EACC 64.7% (17),
  UACC Batesville 67.5% (80), ASU-Mountain Home 72.1% (61), Arkansas State ADN 75.8% (124), ASU Three Rivers 75.8% (62), Ozarka 77.4% (31); the
  board's rule is above 75% two years running for continued full approval. **Baptist Health College Little Rock** is on ACEN "Continuing
  Accreditation with Conditions" and board conditional approval. **UAPB** nursing is only an ACEN candidate (to April 2027). UAMS's
  nurse-midwifery program is new (first class fall 2026; ACME pre-accreditation). UA Rich Mountain's traditional RN says "pending final
  approval". North Arkansas College was renamed UA Northark (April 2026). Jefferson Regional's catalog still points students to Southeast
  Arkansas College (closed) for general education. Many costs are per credit or null (BRTC, NWACC, Northark, Ozarka, UACCM, A-State ADN/BSN,
  UAFS ABSN, Philander). Pages that blocked automated reading: the A-State, ATU, SAU, Harding, JBU, Northark, UAFS, UARM, NPC and UAM catalogs
  and obu.edu pages.
- **NLC state:** Arkansas is a Nurse Licensure Compact member (board's Compact page: original compact 2000, current compact since
  Jan 19, 2018).
- **Tuition (`AR.tuition`, added 2026-11-23):** 33 of 36 schools, College Scorecard 2025-26. Labeled **in-district** for the 8 colleges
  whose own pages show a local/in-county rate (ANC, UACC Batesville, UA-EACC, PCCUA, NPC, SouthArk, UACC Morrilton, Cossatot); the other
  two-year colleges are labeled in-state because College Navigator showed a high-traffic notice (not retried), so a local rate there is
  unconfirmed. Overrides: SAU → 107983 (Main Campus, not SAU Tech), Cossatot → 106795, Northark → 107460, UA Rich Mountain → 107743, UAM →
  106485. Skipped: ARNEC (consortium, no Scorecard record), Jefferson Regional and UAMS (no tuition reported to Scorecard).
- **Refresh:** the board posts new 5-year tables each August; re-check UARM's and SouthArk's new programs and BHCLR's conditions.


# Data sources (schools page — Louisiana, added 2026-11-24)

Louisiana: **31 schools / 111 programs / 19 transfer agreements** in `data/schools/la.js` (verified 2026-11-24), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** the Louisiana State Board of Nursing's "LSBN Approved Nursing Education Programs" PDF
  (lsbn.state.la.us/wp-content/uploads/credentialing/schools.pdf, linked from lsbn.state.la.us/schools-nursing/; no revised date shown;
  read 2026-11-24): one diploma program, 13 associate degree programs, 19 baccalaureate programs and the graduate APRN programs.
  Windows' own web client got a 403 from lsbn.state.la.us, but the site's pages and PDFs loaded normally through WebFetch (no block was
  bypassed). Included: 10 two-year colleges (LCTCS colleges, LSU Eunice, Southern University at Shreveport), 12 public universities and 9
  private nonprofits (Baton Rouge General's diploma school, FranU, Dillard, Louisiana Christian, Loyola, Tulane, Holy Cross, Herzing's
  Metairie campus and William Carey University's Baton Rouge site — both out-of-state nonprofits that the roster counts as Louisiana programs).
- **NCLEX-RN pass rates:** the board's annual reports (lsbn.state.la.us/annual-reports/): Appendix B1 "Performance of First Time
  Candidates of Nursing Education Programs in Louisiana on NCLEX-RN" in the 2025 and 2024 reports and Appendix C1 in the 2023 report
  (calendar years, with counts). Cards show 2023-2025; all campuses combined (the board reports one row per program type per school).
  **Cross-check:** every year's per-program rows add up exactly to the board's totals (2025: 2,593 tested / 2,321 passed = 89.51%; 2024:
  2,514 / 2,351; 2023: 2,454 / 2,280). New, no results yet: Tulane's accelerated BSN (first cohort fall 2024; Tulane reports its first
  graduates passed in 2026). Northshore's ASN (first class 2025) and SUNO's BSN (initial approval) have 2025 only; Loyola's BSN 2024-2025.
- **Excluded / not added:** Chamberlain University (private for-profit; 131 of the 2025 first-time takers). Out-of-state schools the
  roster lists only for clinical placements (Emory, WGU, Southwest Mississippi CC, Bradley, Georgetown and others). FranU's RN-to-BSN
  (not in the 2026-27 catalog), Loyola's and Holy Cross's RN-to-BSN (no longer listed), UL Lafayette's BSN-DNP (not admitting),
  McNeese's DNP PMHNP (post-master's only). The roster's ICMSN Adult Health NP/CNS and Adult PMHNP tracks and SUBR's Gerontology NP/CNS
  appear on no school page (likely old roster entries). Agreements dropped: BRCC → Southern (leads to an online MSN), BRCC → Holy Cross and
  BRCC → FranU (those RN-to-BSNs no longer run), and six duplicates found by two agents.
- **Bridges (20):** every two-year college runs a generic ASN plus an LPN-to-RN track (separate records); LSUA also has a paramedic track
  and NSU's "Transition to RN" takes LPNs and paramedics. LPN-to-BSN at NSU, McNeese, Nicholls, Southeastern, ULM, Dillard and Herzing.
- **Agreements (19):** NSU's RN-to-BSN articulation list (BPCC, LDCC, Louisiana Tech, SUSLA, BRCC, Baton Rouge General, Delgado, Fletcher,
  LSUE, SOWELA), SOWELA → McNeese/ULL/ULM, LSUE → McNeese, BRCC → McNeese, Delgado → LSUHNO (EARN) and Nicholls, Fletcher → Nicholls,
  and Louisiana Tech's integrated ASN → RN-BSN. Several BRCC and Delgado agreement documents date from 2011-2018 (noted on each).
- **Spot check (2026-11-24):** Fletcher ASN (5 semesters / 69 credits, HESI A2 75% per section, 2.75 prerequisite GPA, ACEN continuing,
  $14,853.50 total in the 2026-27 handbook), Nicholls BSN (ATI TEAS Proficient, 2.75 GPA in the first 35 hours, CCNE, $9,554 2026-27
  in-state) and FranU DNP nurse anesthesia (36 months, 100 credits, 2,500 clinical hours, 3.0 GPA, June 1, CCRN before interview, COA to
  2028, $115,233.16 total) matched. Fixed: Nicholls's "ranked by GPA, TEAS and repeats" (no ranking method is published), and Fletcher's
  cost now notes that its separate 2026-27 cost sheet says $14,517.00.
- **Known gaps / owner attention:** **Low 2025 first-time rates:** Southern University Baton Rouge BSN 69.3% (114 takers), SUNO 66.7% (9),
  Loyola BSN 74.3% (35), Dillard 76.9% (26), Louisiana Delta 77.0% (74), BRCC 78.6% (131). **Dillard** is on board **probation**, while
  its own pages say "conditionally approved" / "Full Approval" (conflict noted). **Louisiana Christian** restructured its BSN in 2023
  (board initial approval; its 2023-2024 board figures, 56% and 69.6%, are from the old curriculum; no 2025 takers). Louisiana Tech's
  RN-to-BSN and Northshore's ASN are only ACEN candidates; LSUHNO's and Loyola's midwifery programs are ACME pre-accredited. Sites that
  blocked automated reading or failed certificate checks: subr.edu, suno.edu, susla.edu, northshorecollege.edu, solacc.edu, ladelta.edu,
  bpcc.edu, and the Delgado, LSUE, SLCC, McNeese, Southeastern and LSUHNO catalogs — those records rely on catalogs, handbooks or search
  excerpts of the schools' own pages and carry "check with the school". Many costs are null or per credit (Delgado, SOWELA, SLCC,
  Northshore, LDCC, BPCC, SUSLA, SUBR, SUNO, Herzing, NSU pre-licensure).
- **NLC state:** Louisiana has been a Nurse Licensure Compact member since July 1, 2019 (board's Nurse Licensure Compact page).
- **Tuition (`LA.tuition`, added 2026-11-24):** 28 of 31 schools, College Scorecard 2025-26. All labeled in-state: Louisiana's community and
  technical colleges are one statewide system with no local district rate (Scorecard's in- and out-of-state figures are equal for them).
  Override: Tulane → 160755. Skipped: Baton Rouge General and LSU Health New Orleans (no tuition reported to Scorecard) and William Carey
  (home campus in Mississippi).
- **Refresh:** the board posts each year's annual report (with Appendix B1) in the spring; re-check Tulane's first board results,
  Dillard's approval status and Louisiana Christian's new curriculum.


# Data sources (schools page — Wisconsin, added 2026-11-24)

Wisconsin: **39 schools / 132 programs / 140 transfer agreements** in `data/schools/wi.js` (verified 2026-11-24), built with
docs/ADD_A_STATE.md: every fact from the school's own site, unknowns left `null`.

- **Master roster:** the Wisconsin Board of Nursing's "Approved Nursing Schools — In-State Schools" list on the DSPS site
  (dsps.wi.gov/a-z-boards-and-councils-list/nursing/schools-programs/, revised August 26, 2026). It lists schools, not programs, so each
  school's own site supplied its programs. Included: the 16 Wisconsin Technical College System colleges and Lac Courte Oreilles Ojibwe
  University (tribal; typed community college), 7 UW System universities and 15 private nonprofits (Herzing University's Brookfield,
  Kenosha and Madison campuses are one record; Herzing is a 501(c)(3) nonprofit per its own About page).
- **NCLEX-RN pass rates:** the board's yearly NCLEX tables. 2025 is the table on the board's NCLEX Pass Rate page
  (dsps.wi.gov/a-z-boards-and-councils-list/nursing/nclex-pass-rate/). The 2023 and 2024 tables are the board's own PDFs
  (dsps.wi.gov/Documents/2023YearlyPassRate_WI.pdf and "2024YearlyPass Rate_WI.pdf"), which went offline when DSPS moved to its new site;
  they were read from the Internet Archive's copies (web.archive.org, captured 2024-05-18 and 2025-07-26). Rows use NCSBN program codes
  (US505xxxxx) and give "exams delivered", passed and rate per program for the calendar year. **Cross-check:** the board doesn't say whether
  these are first-time takers, and its totals don't match NCSBN's Wisconsin first-time, U.S.-educated figures (2025: board rows 4,065 delivered /
  3,866 passed = 95.1%; NCSBN Table 8 for Wisconsin 3,890 / 3,440 = 88.4%; 2024: 4,246 / 4,078 vs 4,068 / 3,761). NCSBN counts everyone
  testing for a Wisconsin license (including graduates of out-of-state and online programs), while the board's rows appear to follow Wisconsin
  programs' graduates; school-published figures match the board rows (Viterbo 2023 142/143; UW-Milwaukee 2024 270 at 95.93%). So every card
  says "exams delivered and passed per program; the board does not say whether repeat attempts are counted". UW-Milwaukee reports one code
  for its Milwaukee, Waukesha and Parkside BSN sites and its Direct Entry MN; Herzing's BSN is shown by campus. New, no results yet:
  Lakeland's BSN (run with Moraine Park); Concordia's Direct Entry MSN has no separate board row.
- **Excluded / not added:** private for-profit — Arizona College of Nursing (Milwaukee; "authorized to admit, not yet approved"), Bryant &
  Stratton College and Rasmussen University (Green Bay, Wausau). Board NCLEX rows for schools no longer on the roster: Cardinal Stritch
  (closed 2023), Holy Family College (closed), Columbia College of Nursing (merged into Alverno in 2020), George Williams College of Aurora
  University (not on the 2026 roster), College of Menominee Nation (one 2023 taker; not on the roster), Herzing College's old ADN (closed).
  UW-Eau Claire's CNS track (on hold), Concordia's ABSN (replaced by its Direct Entry MSN), Mount Mary's RN-to-BSN and its 1-2-1 with MATC
  (pages removed), Alverno's RN-to-BSN (may be suspended; not confirmed). The Mayo Clinic Health System–Franciscan anesthesia school in
  La Crosse isn't a separate record: Viterbo grants the DNP.
- **Roster notes:** **UW-Stevens Point** offers no standalone pre-licensure BSN on its own site; its route is the 1+2+1 with Mid-State,
  Northcentral and Nicolet (ADN, then UWSP's RN-to-BSN), so it is RN-to-BSN only here. **UW-Superior** ("authorized to admit, not yet board
  approved") shows only a new online RN-to-BSN (first offered 2025-26, seeking CCNE). **Carroll University's Milwaukee ADN** (board row
  US50408700) is Carroll's own six-semester evening ADN (NLN CNEA). **Lakeland University's** BSN is delivered jointly with Moraine Park
  Technical College.
- **Bridges (18):** 14 technical-college LPN-to-ADN entries, paramedic-to-RN at Madison College, FVTC and NWTC, and Herzing's LPN-to-BSN.
  Every WTCS ADN also has a practical-nursing exit after the first year. CVTC's "advanced placement" entry wasn't described clearly enough to
  add as a bridge.
- **Agreements (140):** most come from the 2021 statewide agreement between all 16 WTCS colleges and UW's BSN@Home online RN-to-BSN
  (Madison, Milwaukee, Eau Claire, Oshkosh, Green Bay, Stevens Point; UW-Superior honors it). That agreement was due for review on
  June 1, 2026 — check that it was renewed. Named partnerships: MATC → UW-Milwaukee, Mid-State/Northcentral/Nicolet → UW-Stevens Point
  (1+2+1), Northwood → UW-Superior, Northcentral → UW Oshkosh, Moraine Park → Lakeland, Western → Viterbo, and WTCS → Concordia, Herzing,
  Marian, Viterbo, Lakeland and Edgewood (ADN-to-MSN) routes listed on the colleges' transfer pages. Dropped: 26 duplicates found by two
  agents, and two pointing to RN-to-BSN programs that no longer run (Mount Mary, Alverno).
- **Spot check (2026-11-24):** Madison College ADN (65 credits / 2 years, $14,906.30 estimated program cost, $157.45 per credit 2026-27, ACEN
  continuing accreditation, Madison/Reedsburg/Watertown), UW-Green Bay BSN (3.00 GPA, 30 college credits, resume + video reflection, two
  attempts per prerequisite, January 15 / August 15 deadlines) and UW Oshkosh DNP nurse anesthesia (95 credits / 36 months, 3.0 GPA, CCRN,
  one year of critical-care experience, three references incl. a CRNA, December 1 deadline, $105,133.65 program tuition) matched the schools'
  pages. No fixes were needed.
- **Known gaps / owner attention:** **Low board rates:** Lac Courte Oreilles ADN 35% in 2025 (20 delivered; 35-38% in 2023-2024 too), Mount
  Mary BSN 70% (30), Herzing's Madison ADN 75% (4), Carroll's Milwaukee ADN 84.6% (13). **LCO's** pages contradict each other on ACEN status
  (a release says initial accreditation in 2024; the program page and catalog still say candidacy) — flagged "check with the school".
  Southwest Tech has ACEN continuing accreditation with conditions. Sites that blocked automated reading or refused connections:
  northwoodtech.edu (facts from its FY26 cost-sheet PDFs), Nicolet's transfer guides, the UW-Madison and UW-Eau Claire catalogs, Marquette's
  catalog, Wisconsin Lutheran's and Carroll's catalogs, WCTC's and Moraine Park's catalogs, Lakeshore's 2-2-1 page. Some UW-Madison and UWEC
  values come from search excerpts of the schools' own pages and say so. Lakeshore Technical College's site now redirects to lakeshore.edu.
- **NLC state:** Wisconsin joined the enhanced Nurse Licensure Compact on January 19, 2018 (NCSBN NLC map; the board's NCLEX page explains
  Wisconsin multistate licenses).
- **Tuition (`WI.tuition`, added 2026-11-24):** all 39 schools, College Scorecard 2025-26. All labeled in-state: WTCS tuition is set statewide
  (every college charges the same per-credit rate, $157.45 in 2026-27), so there is no local district rate. Overrides: Nicolet → 239442,
  UW-Milwaukee → 240453 (not the UW Flex record), UW-Madison → 240444, UW-Eau Claire → 240268, UW Oshkosh → 240365, Herzing → 240392
  (Herzing University-Madison; its Brookfield and Kenosha campuses report separately).
- **Refresh:** the board posts each year's table on its NCLEX page early in the year (save a copy — older years are taken down). Re-check
  UW-Superior's and UW-Stevens Point's pre-licensure plans, Lakeland's first results, LCO's accreditation and the BSN@Home agreement renewal.

## Structured admissions: Colorado pilot (added 2026-11-24)

- **What:** `CO.admissions` in data/schools/co.js — one record per program with standard prerequisite categories, GPA
  minimums, entrance exam, selection method, points sheet, retake rule, local priority and seats, each a value,
  `"not_published"` or `"see_text"`, with the school's own wording and source links. Field rules:
  docs/ADMISSIONS_FIELDS.md and tools/state-build/ADMISSIONS_BRIEF.md. Written by tools/state-build/apply_admissions.js.
  Program cards show it in place of the older prerequisite and admission text (owner approved 2026-11-24).
- **Method:** five research agents re-read every Colorado program on the schools' own sites (program pages, admissions
  packets, points/ranking PDFs, handbooks, catalogs). 50 of 53 programs filled; 287 prerequisite rows (the visible
  records list 167).
- **Couldn't be read (placeholders, "check with the school"):** Lamar CC (every lamarcc.edu page returned an empty
  redirect; catalog certificate expired), AdventHealth University (ahu.edu blocks automated reading; search excerpts
  were not used), CSU Pueblo 3+2 Direct-Entry MSN (catalog.csupueblo.edu refused connections). CSU Pueblo's BSN/ABSN
  GPA and retake fields are `not_published` for the same reason.
- **Spot check (orchestrator):** Pikes Peak ADN (GPA 2.5 posted, 7/15-year limits, 73 points, randomized ties, TEAS
  70/60 and 2 attempts, BIO attempts averaged: all match), Rocky Vista CRNA (3.00 GPAs, GRE 300 within 3 years, organic
  chem/biochem B within 5 years: match), UNC BSN (agent had used the Spring 2027 criteria; switched to the current
  Summer/Fall 2027 PDF: HESI minimum 80% or 70% depending on prerequisite GPA, HESI 25%/surveys 5%, second attempt
  counts). The brief now says to use the newest admission cycle.
- **Differences from the visible records:** listed per program in docs/admissions-review/CO.md; the cards now show the
  re-researched details, and 20 outdated or missing deadlines in co.js were updated from the same research (e.g. UCCS BSN's prerequisite list is outdated; Front Range uses a published 100-point table; CU Anschutz BS-to-DNP
  tracks require statistics and nursing research).

## Structured admissions: Arizona (added 2026-11-24)

- **What:** `AZ.admissions` in data/schools/az.js, same fields and tooling as the Colorado pilot
  (docs/REFRESH_ADMISSIONS.md). Four research agents re-read all 42 Arizona programs on the schools' own sites.
- **Filled:** 42 of 42 (no "couldn't re-check" placeholders).
- **Partly blocked (gaps recorded as `not_published`, nothing bypassed):** maricopa.edu district pages and several
  Maricopa college pages returned 403; Maricopa's record rests on Scottsdale CC's March 2026 prep-guide PDFs and Estrella
  Mountain's nursing FAQ (both Maricopa colleges). Mohave's catalog (catalog.mohave.edu) returned 403, so Mohave uses its
  program page only. catalog.pima.edu returned 403; Pima uses its program page and points rubric (revised 10/01/2026).
  Coconino's old tip-sheet and FAQ PDFs now return 404.
- **Orchestrator corrections:** ASU BSN/ABSN points `max` set to `not_published` (ASU publishes a 50% GPA / 50% TEAS
  weighting, not a point total; the agent's "2.000" was its own arithmetic). U of A nurse anesthesia deadline no longer
  guesses a year. NAU's "only once per application cycle" HESI rule is recorded as 1 attempt.
- **Spot check (orchestrator):** Arizona Western ADN (2.5 GPA, HESI 75% on Math/English/Cumulative within 24 months, 3
  retests per 12 months after 60 days, 445 points, ties by date then lottery, Mar 1 / Sep 1: all match the application
  PDF); GCU BSN (3.25 prerequisite GPA, HESI 80/80/75 in one attempt, 4 attempts in 2 years, 7-year limit, 40%/15%
  weights, Jan 15/May 15/Sep 15: match the students.gcu.edu page and the Fall 2026 handbook); U of A nurse anesthesia
  (B-or-better science and statistics prerequisites within 10 years, 1 year ICU in the last 3, CCRN/ACLS/BLS/PALS,
  Aug 1 deadline, Summer 2028 next start: match).
- **Flagged for the owner (not removed):** ASU's nurse anesthesia DNP says it is pending COA accreditation; NAU says
  Traditional at Pima West, Compressed at North Valley and Yuma, and the Flagstaff ABSN are not accepting applications,
  and its DNP is not admitting; GCU's main-campus BSN now admits only students without prior college credit (others are
  pointed to the ABSN), and GCU's NP handbook (cumulative 3.0, no conditional admits) conflicts with the older "GPA or
  GRE/GMAT" record; Coconino now uses the TEAS (66.1%) with one fall intake of about 30, not the NLN NEX twice a year;
  Maricopa's quoted wait is about 7-8 semesters, not 2-3; Pima no longer requires WRT 101 to apply.
- **Differences per program:** docs/admissions-review/az.md.
