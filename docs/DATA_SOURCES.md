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

California is **in progress — waves 1-2** (23 schools / 58 programs, verified 2026-11-06), in `data/schools/ca.js`.
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
