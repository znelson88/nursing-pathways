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

California is **in progress — wave 1** (9 schools / 15 programs, verified 2026-11-06), in `data/schools/ca.js`.
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
**Later waves:** UC campuses (UCLA, UCI, UCSF, UC Davis), private universities (Samuel Merritt, USF, USD,
Azusa Pacific, Loma Linda, Point Loma, Mount Saint Mary's, Dominican, CBU, etc.), more community-college ADNs
by region, and the APRN / CRNA / CNM specialties. Re-verify before each academic year.
