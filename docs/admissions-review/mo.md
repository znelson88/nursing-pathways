# MO admissions re-research: differences from the earlier records

What each school publishes now, compared with the program records the site showed before. Cards now show the
re-researched details (MO.admissions in data/schools/mo.js). Closures or paused admissions are flagged here,
never removed automatically.

## Research of 2026-11-25

### St. Louis Community College: Nursing, Associate in Applied Science (AAS) (`stlcc-adn`)

Seat counts now published (192/semester across 4 campuses; RN Bridge 36/semester). COM 200 / SOC 101 recorded as a one-of choice. Otherwise matches the existing record.

### St. Louis Community College: Nursing AAS - RN Bridge (LPN/Paramedic to RN) (`stlcc-adn-lpn-bridge`)

RN Bridge seat cap now published (36 per semester). BIO 208/BIO 203/PSY 205 are required before specific nursing courses (NUR 153/170/251), not necessarily before applying (by_when see_text). Otherwise matches.

### St. Charles Community College: Associate of Science in Nursing (ADN) (`stchas-cc-adn`)

Nursing page now publishes a 3.0 minimum GPA (14+ credits), science courses C or better and fewer than 5 years old, and deadlines (Spring 2027 Oct 20, 2026; Fall 2027 Feb 1, 2027). The existing record's 'points (HESI A2 scores, GPA and A&P I grade)' selection description could not be confirmed on any live school page (it came from search indexing of a page that now 404s); the live page says only 'Selective admission'. | gpa_overall_min is see_text: the page says '3.0 GPA (14+ credits)' without saying whether it is cumulative. The prerequisite course list is only in the online catalog (catalog.stchas.edu), which returned HTTP 403 to automated fetching, and the 'Am I Ready to Apply?' checklist (SharePoint) returned 401, so prerequisites are not_published. HESI valid_months see_text: within two years of the program start date. max_attempts: up to three per calendar year, three weeks apart. Contact alliedhealth@stchas.edu. | Partial findings: deadline: Spring 2027: apply by October 20, 2026 (passed); Fall 2027: apply by February 1, 2027.

### St. Charles Community College: LPN to ADN Bridge Program (`stchas-cc-adn-lpn-bridge`)

New details now on the nursing page: HESI LPN-to-RN/ADN Mobility minimum 600; active, unencumbered LPN license issued by a US state; minimum 6 months LPN work experience; science courses C or better; deadlines Oct 20, 2026 (Spring 2027) and Feb 1, 2027 (Fall 2027). | Requires an active, unencumbered LPN license issued by a US state and a minimum of 6 months work experience as an LPN. No GPA listed for the Bridge on the page. The course list is only in the online catalog (HTTP 403) and the SharePoint checklist (401); prerequisites not_published. | Partial findings: deadline: Spring 2027: apply by October 20, 2026 (passed); Fall 2027: apply by February 1, 2027.

### Jefferson College: Bi-Level Nursing Program - Level I/PN (certificate) then Level II/RN (A.A.S. in Nursing) (`jeffco-mo-adn`)

The 2.8 GPA minimum is calculated on nursing pre/corequisite courses only (gpa_prereq_min), not cumulative. Rubric total is 15 points plus a 1-point healthcare-experience bonus. The program web page shows the Fall 2027 Day deadline as 'Tuesday, April 06, 2026' (apparent typo); the packet says April 06, 2027. Otherwise matches.

### Jefferson College: Level II/RN LPN to RN Bridge (advanced placement), A.A.S. in Nursing (`jeffco-mo-adn-lpn-bridge`)

Selection is a published 15-point rubric (HESI Mobility, GPA, corequisite courses completed), not 'space-available' as in the existing record. The 2.8 GPA is on pre/corequisite courses only.

### East Central College: Associate of Applied Science Degree in Nursing (pre-licensure/generic) (`east-central-adn`)

Points max 21 computed from the rubric's top bands (3+10+6+2; the school does not state a total). Retaken courses after failure earn no points. The program web page says HESI composite 'greater than 75%' while the packet says '75% or greater'; packet used. Otherwise matches the existing record.

### East Central College: LPN to RN Bridge Program (AAS in Nursing) (`east-central-adn-lpn-bridge`)

Mobility exam may be taken twice (30 days apart) per testing cycle (Feb-August). Rubric includes References and Mobility-score bands (750=0 ... above 950=5). Bridge is offered at Rolla. Otherwise matches.

### Mineral Area College: Associate of Science in Nursing (RN) (`mineral-area-adn`)

The 2027-28 brochure does not mention the existing record's 'single attempt', '14 days between attempts', 'TEAS completion date May 21, 2027' or the online-lab proficiency exam (73%, two attempts); those could not be re-confirmed (they may be in a separate notice). Otherwise matches.

### Mineral Area College: Associate of Science in Nursing - Advanced Placement (LPN to RN Bridge) (`mineral-area-adn-lpn-bridge`)

ADN 1420 Bridge Course is a summer course taken after selection (required for MAC PN graduates of more than 5 years prior and all transfer students), not an application prerequisite; left out of prerequisites. Otherwise matches.

### Three Rivers College: Associate of Applied Science - Nursing (RN) (`three-rivers-mo-adn`)

No material change. Conflict: the web page lists Sikeston RN deadlines only for 2026 and 2028, while the application form lists the Sikeston Day Program with a March 1 deadline and no year.

### Three Rivers College: RN Bridge Program (LPN-to-RN and Paramedic-to-RN), AAS Nursing (`three-rivers-mo-adn-lpn-bridge`)

The catalog lists only BIOL 231, ENGL 111, MATH 161 as Bridge prerequisites while the web page also lists ACAD 101; by_when set to see_text because the web page says 'no later than the Spring semester of the application deadline' and the catalog says 'prior to beginning the nursing program'. Otherwise matches.

### State Technical College of Missouri: Nursing - Associate of Applied Science (LPN to RN) (`state-tech-mo-adn`)

ACT minimums conflict: the admissions page now lists ACT Math 18 / Reading 18 / English 18 and Accuplacer Next Gen Math 241 / Reading 250 / Writing 250, while the 2026-27 handbook lists ACT Algebra 22 / English 18 / Reading 18 and Accuplacer 265 / 251 / 250 (existing record uses ACT Math 22). Minimum grade C for the non-science prerequisites and the 'A&P within 5 years of program start' rule in the existing record are not stated in the ADN section of the handbook or on the admissions page (the 5-year A&P transfer rule appears in the Practical Nursing section only), so those are recorded as not_published. New on the admissions page: 4 hours of observation with an LPN or RN (Applicant Observation Form).

### Moberly Area Community College: Associate Degree Nursing (ADN) - two-year program (`moberly-cc-adn`)

Math requirement differs between pages: the ADN admission-criteria page says "The program requires MTH140 or higher" (or placement into MTH140 / MTH042 / MTH095), while the 2026-27 handbook says students must place into quantitative reasoning without corequisite (or complete it with corequisite with a C before classes start). Score sheet (revised 4/30/2026) now published: GPA, TEAS, gen-ed course grades, previous education, with deductions for repeated science/algebra courses.

### Moberly Area Community College: LPN to ADN Bridge Program (`moberly-cc-adn-lpn-bridge`)

Prerequisite list still conflicts: the bridge admission-criteria web page lists 20 hours (BIO205, BIO209, PSY101, PSY205, LAL101, MTH140 or higher) with no Sociology, while the 2026-27 catalog lists 23 hours including SOC101. SOC101 recorded with see_text.

### Metropolitan Community College (Kansas City): Professional Nursing (A.A.S.) (`mcc-kc-adn`)

Fall 2027 deadline changed: checklist and Apply page now say Jan 18 - Mar 18, 2027 (existing record: Jan 15 - Mar 29, 2027 checklist / Jan 18 - Mar 31, 2027 program page). Minimum prerequisite grade still conflicts (checklist B vs Apply page C), so min_grade is see_text.

### Metropolitan Community College (Kansas City): LPN to ADN Bridge (A.A.S.) (`mcc-kc-adn-lpn-bridge`)

Apply page now gives a third Summer 2027 deadline (Mar 18, 2027) in addition to the checklist's Mar 29 and the overview's Mar 19. Minimum grade conflict: checklist B vs Apply page C.

### Crowder College: Registered Nursing: Paramedic to RN Bridge (Associate of Science in Nursing) (`crowder-adn-paramedic-bridge`)

Neosho now has a published window: the current flyer (revised 02 12 2026) and the November 2026 checklist list March 1 - June 1 for Neosho in addition to August 1 - November 1 for McDonald County (existing record had only McDonald County).

### Ozarks Technical Community College: Nursing — Registered Nursing (A.S.N.) Completion (LPN or Paramedic to RN) (`otc-adn-lpn-bridge`)

Admission page itself lists no HESI minimum; the 800 minimum appears on the Candidate Selection Form (Version 3, updated 02/20/26). Otherwise matches existing record.

### Bolivar Technical College: Professional Nursing (Associate of Science Degree in Nursing) (`bolivar-tech-adn`)

Catalog minimum grade for prerequisites is stated only as the general transfer rule (C or higher) and the 10-year limit applies to transferred science courses; existing record shows C as a flat rule.

### Franklin Technology Center - Adult Education: RN Diploma (`franklin-tech-diploma`)

Application fee: web page $25 vs 2026-27 handbook $50 (still conflicting). "Up to 20" applicants in the existing record was not found on the current page or handbook; handbook says selection is based on an interview benchmark (web page also mentions a completed essay).

### Lincoln University: Bachelor of Science in Nursing (BSN) (`lincoln-mo-bsn`)

Program page now lists "English Composition" generally rather than Composition I and II. BSN application (rev. 2/2026) also asks applicants to complete the online Nursing Informational Session Packet and quiz and to meet with a nursing advisor; essay required. Deadline labels on the application form conflict with the program page.

### University of Missouri (Columbia) - Sinclair School of Nursing: Bachelor of Science in Nursing (Traditional BSN) (`mizzou-bsn`)

Could not re-verify the 3.25 pre-nursing GPA, the video interview, or the six science courses: the MU catalog (catalog.missouri.edu) refused connections (ECONNREFUSED) on every attempt, and the nursing site pages do not state them. The only 3.25 on the nursing site is the GPA to transfer INTO pre-nursing, not a clinical-major minimum. A search-engine summary suggested the catalog may state a 3.0 minimum, a resume and video interview responses, and C in science courses, but that is snippet-only and not used. Recommend keeping the existing record flagged until the catalog can be read. | Prerequisites recorded as not_published because the course list could not be read on any reachable school page (do not treat as "no prerequisites"). English proficiency for non-native speakers: TOEFL iBT composite 84 with speaking 26, IELTS 6.5 with speaking 8, or Duolingo 105. Honors pre-nursing freshmen must apply for Nursing Scholar admission before the end of their first semester. "Clinical application criteria are subject to change." The undergraduate handbook is hosted on SharePoint and was not read. | Partial findings: deadline: To start clinical in the spring: apply by September 15; to start clinical in the fall: apply by January 31 (next: Fall 2027 clinical start, apply by Jan 31, 2027; the online application opens at least one month before each deadline)

### University of Missouri (Columbia) - Sinclair School of Nursing: RN to BSN Online (`mizzou-rnbsn`)

Deadline: the existing record says year-round, but Mizzou Online lists term deadlines (Aug 1 fall, Jan 1 spring, Mar 1 summer). Added: 2.0 minimum GPA for MU courses; school may request a personal interview.

### University of Missouri-Kansas City School of Nursing and Health Studies: BSN-DNP Nurse Anesthesia (CRNA) track, with University Health Truman Medical Center School of Nurse Anesthesia (`umkc-crna`)

Existing record had no criteria. University Health's own application PDF (2022) lists a 3.2 BSN/MSN GPA, General Chemistry I, Organic Chemistry I with lab, health assessment (B or better), 1 year critical care RN experience, CCRN, and a Sept 1 deadline.

### University of Missouri-St. Louis College of Nursing: Nursing BSN (Traditional) (`umsl-bsn`)

Check sheet sets minimum grade C (not C+) for all non-science required courses; existing record says C+. The 2.75 GPA and the 5-year limit on chemistry/A&P/micro in the existing record come from the bulletin and could not be confirmed (the traditional check sheet states no time limit). Added repeat policy: required courses may be repeated once, no more than 3 courses repeated.

### University of Missouri-St. Louis College of Nursing: Accelerated BSN (`umsl-absn`)

Statistics and Human Growth/Lifespan Development minimum grade is C on both the check sheet and the degree page (existing record C+ from the bulletin; conflict resolved toward C). Added course codes and the 5-year limit (within 5 years of anticipated start) for chemistry, A&P I/II and microbiology. The existing 3.0 GPA (bulletin) could not be confirmed.

### University of Missouri-St. Louis College of Nursing: Nursing 68C to BSN (for Army Practical Nursing Specialists, MOS 68C) (`umsl-bsn-68c`)

UMSL Bulletin (bulletin.umsl.edu) refused connections (ECONNREFUSED) on every attempt on 2026-11-25, so bulletin-only rules (GPA, application process, deadlines) could not be read. Eligibility: UMSL undergraduate application; completed Army Practical Nursing program (Medical Education Training Campus) and served as an Army 68C LPN; JST showing MOS-68C; unencumbered LPN license; able to attend in person and do clinicals at St. Louis-area sites. Prerequisite list ([]) reflects the degree page only; the bulletin may list more. | Partial findings: deadline: not_published

### University of Missouri-St. Louis College of Nursing: RN to BSN (`umsl-rnbsn`)

Existing 2.5 GPA (bulletin) could not be confirmed on a reachable school page. | UMSL Bulletin (bulletin.umsl.edu) refused connections (ECONNREFUSED) on every attempt on 2026-11-25, so bulletin-only rules (GPA, application process, deadlines) could not be read. Degree page describes a part-time "Hybrid Online and In-Person" format. For RNs with an ADN or nursing diploma; confirm GPA, licensure timing and deadlines with the school. | Partial findings: deadline: not_published

### Missouri State University School of Nursing: Nursing (Pre-licensure, 4-year program) BSN (`missouri-state-bsn`)

Prerequisite list and minimum grades could not be re-verified: the pre-nursing curriculum page now redirects to the Undergraduate landing page, the Registrar catalog program page returns 404, and catalog.missouristate.edu returns 403. Search excerpts (not counted) suggest C/C- or better, a 7- or 8-year recency rule and a list of statistics options; existing prerequisite rows (KIN 250+252 or BMS 307+308, BIO 212+213, DTN 240, statistics) remain unconfirmed. Other fields (3.0 GPA, no TEAS, 3 x 25-point scoring, 112 per cohort, deadlines) match the existing record. | Apply via NursingCAS after admission to Missouri State; resume must use the school's template and must not include GPA/grade info; personal statement not scored. FAQ: wait to apply until final grades for completed courses are submitted, or include an unofficial schedule of enrolled courses. Waiting list is not carried over between application periods. Transfer applicants advised to apply by Dec 1 (fall) or May 1 (spring) so transcripts arrive. Seats: 112 per cohort (fall and spring cohorts). Prerequisites are [] only because the course list could not be read - not because there are none. | Partial findings: deadline: Fall 2027: apply Dec 1, 2026 - Feb 1, 2027 (10:59 pm Central). The Spring 2027 deadline (Sep 1, 2026) has passed; spring cycles run Jul 1 - Sep 1. No late applications.

### Missouri State University School of Nursing: Accelerated BSN (`missouri-state-absn`)

Existing record says applications Feb 1 - Apr 1; school pages now say opens December 1, with deadline April 1 (AdmissionReqs page) or February 1 (Explore Nursing page) - conflict. Program length also differs between pages (15 months on the Undergraduate page, 14 months on the Explore page). | For students with a previous non-nursing bachelor's degree. Prerequisites and GPA not readable on the ABSN page; do not assume the 4-year BSN's 3.0 applies. | Partial findings: deadline: Fall 2027: opens Dec 1, 2026. The Application and Admission Requirements page gives an April 1 deadline, but the Explore Nursing page lists 'Fall 2027: December 1, 2026 - February 1' - confirm with the school.

### Missouri State University School of Nursing: Nursing Completion Program for Registered Nurses (BSN-C) (`missouri-state-rnbsn`)

GPA 2.50 confirmed (Missouri State Online page); the 'at least 30 hours' and 'lower GPAs considered individually' details from the archived catalog could not be re-checked (catalog 403; BSN-C requirements page shows only 'Loading'). | Current RN license with no restrictions, or dual enroll while completing an ASN/ADN program (provisional acceptance; non-clinical coursework until licensed). Apply to Missouri State as a transfer student declaring BSN-completion, then request admission to BSN-C. Advisor release needed to register. | Partial findings: deadline: No application deadlines published; start in the spring, fall or summer (five start times each year, 8-week courses).

### Missouri State University School of Nursing: MSN - Adult Gerontology-Acute Care Nurse Practitioner (`missouri-state-agacnp`)

Could not re-verify the existing GPA (3.25 on last 60 hours), GRE-if-below-3.25 rule, prerequisite courses (pathophysiology, research, health assessment, informatics, graduate inferential statistics, C or higher) or one-year experience rule: the MSN Application and Admission Requirements page shows only 'Apply to this program through NursingCAS. Review the sections below' - the sections are catalog-loaded and the catalog is blocked (403). Existing values remain unconfirmed; the MSN admission page itself no longer 404s. | Missouri State's requirement pages load their admission/prerequisite sections from the online catalog (catalog.missouristate.edu), which returned HTTP 403 to automated reading; those sections showed only 'Loading' or nothing. Not bypassed. BSN and RN license required per existing record (not re-confirmed here). Selection left not_published because no method is described. | Partial findings: deadline: not_published

### Missouri State University School of Nursing: MSN - Family Nurse Practitioner (`missouri-state-fnp`)

Could not re-verify the existing GPA (3.25 on last 60 hours), GRE-if-below-3.25 rule, prerequisite courses (pathophysiology, research, health assessment, informatics, graduate inferential statistics, C or higher) or one-year experience rule: the MSN Application and Admission Requirements page shows only 'Apply to this program through NursingCAS. Review the sections below' - the sections are catalog-loaded and the catalog is blocked (403). Existing values remain unconfirmed; the MSN admission page itself no longer 404s. | Missouri State's requirement pages load their admission/prerequisite sections from the online catalog (catalog.missouristate.edu), which returned HTTP 403 to automated reading; those sections showed only 'Loading' or nothing. Not bypassed. BSN and RN license required per existing record (not re-confirmed here). Selection left not_published because no method is described. FNP page: 'You're not required to find your own clinical placement while in the program. We can schedule that.' | Partial findings: deadline: not_published

### Missouri State University School of Nursing: MSN - Psychiatric-Mental Health Nurse Practitioner (`missouri-state-pmhnp`)

Could not re-verify the existing GPA (3.25 on last 60 hours), GRE-if-below-3.25 rule, prerequisite courses (pathophysiology, research, health assessment, informatics, graduate inferential statistics, C or higher) or one-year experience rule: the MSN Application and Admission Requirements page shows only 'Apply to this program through NursingCAS. Review the sections below' - the sections are catalog-loaded and the catalog is blocked (403). Existing values remain unconfirmed; the MSN admission page itself no longer 404s. | Missouri State's requirement pages load their admission/prerequisite sections from the online catalog (catalog.missouristate.edu), which returned HTTP 403 to automated reading; those sections showed only 'Loading' or nothing. Not bypassed. BSN and RN license required per existing record (not re-confirmed here). Selection left not_published because no method is described. The PMHNP track page itself was not fetched separately. | Partial findings: deadline: not_published

### Missouri State University School of Nursing: BSN to DNP - Adult Gerontology-Acute Care Nurse Practitioner (`missouri-state-agacnp-dnp`)

DNP Application and Admission Requirements page lists only: apply through NursingCAS; BSN from an accredited program (international/non-accredited reviewed individually). No GPA, GRE, experience or deadline published on the DNP pages; further criteria may be in the catalog, which returned 403. Combined master's and doctorate. | Partial findings: deadline: not_published

### Missouri State University School of Nursing: BSN to DNP - Family Nurse Practitioner (`missouri-state-fnp-dnp`)

DNP Application and Admission Requirements page lists only: apply through NursingCAS; BSN from an accredited program (international/non-accredited reviewed individually). No GPA, GRE, experience or deadline published on the DNP pages; further criteria may be in the catalog, which returned 403. Combined master's and doctorate. | Partial findings: deadline: not_published

### Missouri State University School of Nursing: BSN to DNP - Psychiatric-Mental Health Nurse Practitioner (`missouri-state-pmhnp-dnp`)

DNP Application and Admission Requirements page lists only: apply through NursingCAS; BSN from an accredited program (international/non-accredited reviewed individually). No GPA, GRE, experience or deadline published on the DNP pages; further criteria may be in the catalog, which returned 403. Combined master's and doctorate. | Partial findings: deadline: not_published

### Missouri State University School of Nursing: Doctor of Nurse Anesthesia Practice (RN to DNAP) (`missouri-state-crna`)

Deadline: existing record's June 15, 2026 (summer 2027 entry) has passed; school now lists Mar 1 - Jun 7, 2027 for Summer 2028. GPA 3.00 on last 60 hours and the one-year experience minimum could not be re-verified (catalog-loaded, 403; FAQ gives no minimum length). Application is via the university's graduate application portal, not NursingCAS. | Bachelor's degree and RN license required. Critical care experience must be in a U.S. critical care area where the nurse routinely manages invasive hemodynamic monitors, cardiac assist devices, mechanical ventilation or vasoactive infusions; other areas may be considered. Shadowing not required but strongly encouraged. Cohort begins early June and runs 36 months. Deposit conflict persists: Program Requirements page says 'The confirmation deposit is now $1,000'; RN-DNAP cost page lists a $500 confirmation deposit. | Partial findings: deadline: Summer 2028 (RN to DNAP admits for summer only): application opens March 1, 2027; deadline June 7, 2027. Interview dates TBD.

### Southeast Missouri State University: Bachelor of Science in Nursing (BSN) (`semo-bsn`)

Microbiology code: the handbook and curriculum pattern say BS240, but the program page now lists BS340 'Microorganisms and the Human Hosts'. Chemistry lab shown on program page as CH181 with CH184 lab vs CH181/081/001 in handbook. Pathophysiology (NS274 in the Spring 2027+ curriculum) is now in the pre-nursing-course list for students admitted Spring 2027 and later, replacing NS271 in that list. HL113 Medical Terminology appears on the program page as a required support course. Otherwise GPA 2.80, 45 hours, HESI A2 + ranking 60/25/15 and Feb 15 / Sep 15 dates match the existing record.

### Southeast Missouri State University: Nursing (RN-BSN) Online (`semo-rnbsn`)

Handbook now titled Fall 2026 (existing note cited 2022/2025-26). Program page lists the core prerequisites as A&P I and II, Microbiology, English Composition II, Chemistry 'and the majority of the non-nursing courses'; statistics is listed as required but 'may be transferred in or completed at Southeast', so it may not be needed before admission. Otherwise consistent with existing record (2.5 GPA, 7 states, first come first served).

### Southeast Missouri State University: Master of Science in Nursing - Family Nurse Practitioner (`semo-fnp`)

The 2026-27 degree map and program page now say 'Spring, Summer and Fall admission available' and part-time plans are available; the 2025-26 map (existing source_url) said the FNP track starts in the fall. Department application PDF/email step and BLS requirement appear in the 2025-26 map but not in the 2026-27 map or program page, which say to apply at semo.edu/apply.

### University of Central Missouri School of Nursing: Nursing BS - Pre-Licensure (Generic) Option (`ucm-bsn`)

New on page: students admitted fall 2023 or later must also have all general education courses completed; science prerequisites over 10 years old must be evaluated. Otherwise matches the existing record (2.75 GPA, Jan 1 / Jul 1, one repeat, more than one D/F ineligible, direct admission ACT 24 / HS GPA 3.00 / UCM GPA 3.50 / max 40 per semester).

### University of Central Missouri School of Nursing: Master of Science in Nursing - Family Nurse Practitioner track (`ucm-fnp`)

Clinical location wording: 'practica for clinical courses in the state of Missouri or the greater Kansas City area' (existing record said clinicals in KS/MO). Otherwise matches.

## Research of 2026-11-25

### St. Louis Community College: Nursing, Associate in Applied Science (AAS) (`stlcc-adn`)

Seat counts now published (192/semester across 4 campuses; RN Bridge 36/semester). COM 200 / SOC 101 recorded as a one-of choice. Otherwise matches the existing record.

### St. Louis Community College: Nursing AAS - RN Bridge (LPN/Paramedic to RN) (`stlcc-adn-lpn-bridge`)

RN Bridge seat cap now published (36 per semester). BIO 208/BIO 203/PSY 205 are required before specific nursing courses (NUR 153/170/251), not necessarily before applying (by_when see_text). Otherwise matches.

### St. Charles Community College: Associate of Science in Nursing (ADN) (`stchas-cc-adn`)

Nursing page now publishes a 3.0 minimum GPA (14+ credits), science courses C or better and fewer than 5 years old, and deadlines (Spring 2027 Oct 20, 2026; Fall 2027 Feb 1, 2027). The existing record's 'points (HESI A2 scores, GPA and A&P I grade)' selection description could not be confirmed on any live school page (it came from search indexing of a page that now 404s); the live page says only 'Selective admission'. | gpa_overall_min is see_text: the page says '3.0 GPA (14+ credits)' without saying whether it is cumulative. The prerequisite course list is only in the online catalog (catalog.stchas.edu), which returned HTTP 403 to automated fetching, and the 'Am I Ready to Apply?' checklist (SharePoint) returned 401, so prerequisites are not_published. HESI valid_months see_text: within two years of the program start date. max_attempts: up to three per calendar year, three weeks apart. Contact alliedhealth@stchas.edu. | Partial findings: deadline: Spring 2027: apply by October 20, 2026 (passed); Fall 2027: apply by February 1, 2027.

### St. Charles Community College: LPN to ADN Bridge Program (`stchas-cc-adn-lpn-bridge`)

New details now on the nursing page: HESI LPN-to-RN/ADN Mobility minimum 600; active, unencumbered LPN license issued by a US state; minimum 6 months LPN work experience; science courses C or better; deadlines Oct 20, 2026 (Spring 2027) and Feb 1, 2027 (Fall 2027). | Requires an active, unencumbered LPN license issued by a US state and a minimum of 6 months work experience as an LPN. No GPA listed for the Bridge on the page. The course list is only in the online catalog (HTTP 403) and the SharePoint checklist (401); prerequisites not_published. | Partial findings: deadline: Spring 2027: apply by October 20, 2026 (passed); Fall 2027: apply by February 1, 2027.

### Jefferson College: Bi-Level Nursing Program - Level I/PN (certificate) then Level II/RN (A.A.S. in Nursing) (`jeffco-mo-adn`)

The 2.8 GPA minimum is calculated on nursing pre/corequisite courses only (gpa_prereq_min), not cumulative. Rubric total is 15 points plus a 1-point healthcare-experience bonus. The program web page shows the Fall 2027 Day deadline as 'Tuesday, April 06, 2026' (apparent typo); the packet says April 06, 2027. Otherwise matches.

### Jefferson College: Level II/RN LPN to RN Bridge (advanced placement), A.A.S. in Nursing (`jeffco-mo-adn-lpn-bridge`)

Selection is a published 15-point rubric (HESI Mobility, GPA, corequisite courses completed), not 'space-available' as in the existing record. The 2.8 GPA is on pre/corequisite courses only.

### East Central College: Associate of Applied Science Degree in Nursing (pre-licensure/generic) (`east-central-adn`)

Points max 21 computed from the rubric's top bands (3+10+6+2; the school does not state a total). Retaken courses after failure earn no points. The program web page says HESI composite 'greater than 75%' while the packet says '75% or greater'; packet used. Otherwise matches the existing record.

### East Central College: LPN to RN Bridge Program (AAS in Nursing) (`east-central-adn-lpn-bridge`)

Mobility exam may be taken twice (30 days apart) per testing cycle (Feb-August). Rubric includes References and Mobility-score bands (750=0 ... above 950=5). Bridge is offered at Rolla. Otherwise matches.

### Mineral Area College: Associate of Science in Nursing (RN) (`mineral-area-adn`)

The 2027-28 brochure does not mention the existing record's 'single attempt', '14 days between attempts', 'TEAS completion date May 21, 2027' or the online-lab proficiency exam (73%, two attempts); those could not be re-confirmed (they may be in a separate notice). Otherwise matches.

### Mineral Area College: Associate of Science in Nursing - Advanced Placement (LPN to RN Bridge) (`mineral-area-adn-lpn-bridge`)

ADN 1420 Bridge Course is a summer course taken after selection (required for MAC PN graduates of more than 5 years prior and all transfer students), not an application prerequisite; left out of prerequisites. Otherwise matches.

### Three Rivers College: Associate of Applied Science - Nursing (RN) (`three-rivers-mo-adn`)

No material change. Conflict: the web page lists Sikeston RN deadlines only for 2026 and 2028, while the application form lists the Sikeston Day Program with a March 1 deadline and no year.

### Three Rivers College: RN Bridge Program (LPN-to-RN and Paramedic-to-RN), AAS Nursing (`three-rivers-mo-adn-lpn-bridge`)

The catalog lists only BIOL 231, ENGL 111, MATH 161 as Bridge prerequisites while the web page also lists ACAD 101; by_when set to see_text because the web page says 'no later than the Spring semester of the application deadline' and the catalog says 'prior to beginning the nursing program'. Otherwise matches.

### State Technical College of Missouri: Nursing - Associate of Applied Science (LPN to RN) (`state-tech-mo-adn`)

ACT minimums conflict: the admissions page now lists ACT Math 18 / Reading 18 / English 18 and Accuplacer Next Gen Math 241 / Reading 250 / Writing 250, while the 2026-27 handbook lists ACT Algebra 22 / English 18 / Reading 18 and Accuplacer 265 / 251 / 250 (existing record uses ACT Math 22). Minimum grade C for the non-science prerequisites and the 'A&P within 5 years of program start' rule in the existing record are not stated in the ADN section of the handbook or on the admissions page (the 5-year A&P transfer rule appears in the Practical Nursing section only), so those are recorded as not_published. New on the admissions page: 4 hours of observation with an LPN or RN (Applicant Observation Form).

### Moberly Area Community College: Associate Degree Nursing (ADN) - two-year program (`moberly-cc-adn`)

Math requirement differs between pages: the ADN admission-criteria page says "The program requires MTH140 or higher" (or placement into MTH140 / MTH042 / MTH095), while the 2026-27 handbook says students must place into quantitative reasoning without corequisite (or complete it with corequisite with a C before classes start). Score sheet (revised 4/30/2026) now published: GPA, TEAS, gen-ed course grades, previous education, with deductions for repeated science/algebra courses.

### Moberly Area Community College: LPN to ADN Bridge Program (`moberly-cc-adn-lpn-bridge`)

Prerequisite list still conflicts: the bridge admission-criteria web page lists 20 hours (BIO205, BIO209, PSY101, PSY205, LAL101, MTH140 or higher) with no Sociology, while the 2026-27 catalog lists 23 hours including SOC101. SOC101 recorded with see_text.

### Metropolitan Community College (Kansas City): Professional Nursing (A.A.S.) (`mcc-kc-adn`)

Fall 2027 deadline changed: checklist and Apply page now say Jan 18 - Mar 18, 2027 (existing record: Jan 15 - Mar 29, 2027 checklist / Jan 18 - Mar 31, 2027 program page). Minimum prerequisite grade still conflicts (checklist B vs Apply page C), so min_grade is see_text.

### Metropolitan Community College (Kansas City): LPN to ADN Bridge (A.A.S.) (`mcc-kc-adn-lpn-bridge`)

Apply page now gives a third Summer 2027 deadline (Mar 18, 2027) in addition to the checklist's Mar 29 and the overview's Mar 19. Minimum grade conflict: checklist B vs Apply page C.

### Crowder College: Registered Nursing: Paramedic to RN Bridge (Associate of Science in Nursing) (`crowder-adn-paramedic-bridge`)

Neosho now has a published window: the current flyer (revised 02 12 2026) and the November 2026 checklist list March 1 - June 1 for Neosho in addition to August 1 - November 1 for McDonald County (existing record had only McDonald County).

### Ozarks Technical Community College: Nursing — Registered Nursing (A.S.N.) Completion (LPN or Paramedic to RN) (`otc-adn-lpn-bridge`)

Admission page itself lists no HESI minimum; the 800 minimum appears on the Candidate Selection Form (Version 3, updated 02/20/26). Otherwise matches existing record.

### Bolivar Technical College: Professional Nursing (Associate of Science Degree in Nursing) (`bolivar-tech-adn`)

Catalog minimum grade for prerequisites is stated only as the general transfer rule (C or higher) and the 10-year limit applies to transferred science courses; existing record shows C as a flat rule.

### Franklin Technology Center - Adult Education: RN Diploma (`franklin-tech-diploma`)

Application fee: web page $25 vs 2026-27 handbook $50 (still conflicting). "Up to 20" applicants in the existing record was not found on the current page or handbook; handbook says selection is based on an interview benchmark (web page also mentions a completed essay).

### Lincoln University: Bachelor of Science in Nursing (BSN) (`lincoln-mo-bsn`)

Program page now lists "English Composition" generally rather than Composition I and II. BSN application (rev. 2/2026) also asks applicants to complete the online Nursing Informational Session Packet and quiz and to meet with a nursing advisor; essay required. Deadline labels on the application form conflict with the program page.

### University of Missouri (Columbia) - Sinclair School of Nursing: Bachelor of Science in Nursing (Traditional BSN) (`mizzou-bsn`)

Could not re-verify the 3.25 pre-nursing GPA, the video interview, or the six science courses: the MU catalog (catalog.missouri.edu) refused connections (ECONNREFUSED) on every attempt, and the nursing site pages do not state them. The only 3.25 on the nursing site is the GPA to transfer INTO pre-nursing, not a clinical-major minimum. A search-engine summary suggested the catalog may state a 3.0 minimum, a resume and video interview responses, and C in science courses, but that is snippet-only and not used. Recommend keeping the existing record flagged until the catalog can be read. | Prerequisites recorded as not_published because the course list could not be read on any reachable school page (do not treat as "no prerequisites"). English proficiency for non-native speakers: TOEFL iBT composite 84 with speaking 26, IELTS 6.5 with speaking 8, or Duolingo 105. Honors pre-nursing freshmen must apply for Nursing Scholar admission before the end of their first semester. "Clinical application criteria are subject to change." The undergraduate handbook is hosted on SharePoint and was not read. | Partial findings: deadline: To start clinical in the spring: apply by September 15; to start clinical in the fall: apply by January 31 (next: Fall 2027 clinical start, apply by Jan 31, 2027; the online application opens at least one month before each deadline)

### University of Missouri (Columbia) - Sinclair School of Nursing: RN to BSN Online (`mizzou-rnbsn`)

Deadline: the existing record says year-round, but Mizzou Online lists term deadlines (Aug 1 fall, Jan 1 spring, Mar 1 summer). Added: 2.0 minimum GPA for MU courses; school may request a personal interview.

### University of Missouri-Kansas City School of Nursing and Health Studies: BSN-DNP Nurse Anesthesia (CRNA) track, with University Health Truman Medical Center School of Nurse Anesthesia (`umkc-crna`)

Existing record had no criteria. University Health's own application PDF (2022) lists a 3.2 BSN/MSN GPA, General Chemistry I, Organic Chemistry I with lab, health assessment (B or better), 1 year critical care RN experience, CCRN, and a Sept 1 deadline.

### University of Missouri-St. Louis College of Nursing: Nursing BSN (Traditional) (`umsl-bsn`)

Check sheet sets minimum grade C (not C+) for all non-science required courses; existing record says C+. The 2.75 GPA and the 5-year limit on chemistry/A&P/micro in the existing record come from the bulletin and could not be confirmed (the traditional check sheet states no time limit). Added repeat policy: required courses may be repeated once, no more than 3 courses repeated.

### University of Missouri-St. Louis College of Nursing: Accelerated BSN (`umsl-absn`)

Statistics and Human Growth/Lifespan Development minimum grade is C on both the check sheet and the degree page (existing record C+ from the bulletin; conflict resolved toward C). Added course codes and the 5-year limit (within 5 years of anticipated start) for chemistry, A&P I/II and microbiology. The existing 3.0 GPA (bulletin) could not be confirmed.

### University of Missouri-St. Louis College of Nursing: Nursing 68C to BSN (for Army Practical Nursing Specialists, MOS 68C) (`umsl-bsn-68c`)

UMSL Bulletin (bulletin.umsl.edu) refused connections (ECONNREFUSED) on every attempt on 2026-11-25, so bulletin-only rules (GPA, application process, deadlines) could not be read. Eligibility: UMSL undergraduate application; completed Army Practical Nursing program (Medical Education Training Campus) and served as an Army 68C LPN; JST showing MOS-68C; unencumbered LPN license; able to attend in person and do clinicals at St. Louis-area sites. Prerequisite list ([]) reflects the degree page only; the bulletin may list more. | Partial findings: deadline: not_published

### University of Missouri-St. Louis College of Nursing: RN to BSN (`umsl-rnbsn`)

Existing 2.5 GPA (bulletin) could not be confirmed on a reachable school page. | UMSL Bulletin (bulletin.umsl.edu) refused connections (ECONNREFUSED) on every attempt on 2026-11-25, so bulletin-only rules (GPA, application process, deadlines) could not be read. Degree page describes a part-time "Hybrid Online and In-Person" format. For RNs with an ADN or nursing diploma; confirm GPA, licensure timing and deadlines with the school. | Partial findings: deadline: not_published

### Missouri State University School of Nursing: Nursing (Pre-licensure, 4-year program) BSN (`missouri-state-bsn`)

Prerequisite list and minimum grades could not be re-verified: the pre-nursing curriculum page now redirects to the Undergraduate landing page, the Registrar catalog program page returns 404, and catalog.missouristate.edu returns 403. Search excerpts (not counted) suggest C/C- or better, a 7- or 8-year recency rule and a list of statistics options; existing prerequisite rows (KIN 250+252 or BMS 307+308, BIO 212+213, DTN 240, statistics) remain unconfirmed. Other fields (3.0 GPA, no TEAS, 3 x 25-point scoring, 112 per cohort, deadlines) match the existing record. | Apply via NursingCAS after admission to Missouri State; resume must use the school's template and must not include GPA/grade info; personal statement not scored. FAQ: wait to apply until final grades for completed courses are submitted, or include an unofficial schedule of enrolled courses. Waiting list is not carried over between application periods. Transfer applicants advised to apply by Dec 1 (fall) or May 1 (spring) so transcripts arrive. Seats: 112 per cohort (fall and spring cohorts). Prerequisites are [] only because the course list could not be read - not because there are none. | Partial findings: deadline: Fall 2027: apply Dec 1, 2026 - Feb 1, 2027 (10:59 pm Central). The Spring 2027 deadline (Sep 1, 2026) has passed; spring cycles run Jul 1 - Sep 1. No late applications.

### Missouri State University School of Nursing: Accelerated BSN (`missouri-state-absn`)

Existing record says applications Feb 1 - Apr 1; school pages now say opens December 1, with deadline April 1 (AdmissionReqs page) or February 1 (Explore Nursing page) - conflict. Program length also differs between pages (15 months on the Undergraduate page, 14 months on the Explore page). | For students with a previous non-nursing bachelor's degree. Prerequisites and GPA not readable on the ABSN page; do not assume the 4-year BSN's 3.0 applies. | Partial findings: deadline: Fall 2027: opens Dec 1, 2026. The Application and Admission Requirements page gives an April 1 deadline, but the Explore Nursing page lists 'Fall 2027: December 1, 2026 - February 1' - confirm with the school.

### Missouri State University School of Nursing: Nursing Completion Program for Registered Nurses (BSN-C) (`missouri-state-rnbsn`)

GPA 2.50 confirmed (Missouri State Online page); the 'at least 30 hours' and 'lower GPAs considered individually' details from the archived catalog could not be re-checked (catalog 403; BSN-C requirements page shows only 'Loading'). | Current RN license with no restrictions, or dual enroll while completing an ASN/ADN program (provisional acceptance; non-clinical coursework until licensed). Apply to Missouri State as a transfer student declaring BSN-completion, then request admission to BSN-C. Advisor release needed to register. | Partial findings: deadline: No application deadlines published; start in the spring, fall or summer (five start times each year, 8-week courses).

### Missouri State University School of Nursing: MSN - Adult Gerontology-Acute Care Nurse Practitioner (`missouri-state-agacnp`)

Could not re-verify the existing GPA (3.25 on last 60 hours), GRE-if-below-3.25 rule, prerequisite courses (pathophysiology, research, health assessment, informatics, graduate inferential statistics, C or higher) or one-year experience rule: the MSN Application and Admission Requirements page shows only 'Apply to this program through NursingCAS. Review the sections below' - the sections are catalog-loaded and the catalog is blocked (403). Existing values remain unconfirmed; the MSN admission page itself no longer 404s. | Missouri State's requirement pages load their admission/prerequisite sections from the online catalog (catalog.missouristate.edu), which returned HTTP 403 to automated reading; those sections showed only 'Loading' or nothing. Not bypassed. BSN and RN license required per existing record (not re-confirmed here). Selection left not_published because no method is described. | Partial findings: deadline: not_published

### Missouri State University School of Nursing: MSN - Family Nurse Practitioner (`missouri-state-fnp`)

Could not re-verify the existing GPA (3.25 on last 60 hours), GRE-if-below-3.25 rule, prerequisite courses (pathophysiology, research, health assessment, informatics, graduate inferential statistics, C or higher) or one-year experience rule: the MSN Application and Admission Requirements page shows only 'Apply to this program through NursingCAS. Review the sections below' - the sections are catalog-loaded and the catalog is blocked (403). Existing values remain unconfirmed; the MSN admission page itself no longer 404s. | Missouri State's requirement pages load their admission/prerequisite sections from the online catalog (catalog.missouristate.edu), which returned HTTP 403 to automated reading; those sections showed only 'Loading' or nothing. Not bypassed. BSN and RN license required per existing record (not re-confirmed here). Selection left not_published because no method is described. FNP page: 'You're not required to find your own clinical placement while in the program. We can schedule that.' | Partial findings: deadline: not_published

### Missouri State University School of Nursing: MSN - Psychiatric-Mental Health Nurse Practitioner (`missouri-state-pmhnp`)

Could not re-verify the existing GPA (3.25 on last 60 hours), GRE-if-below-3.25 rule, prerequisite courses (pathophysiology, research, health assessment, informatics, graduate inferential statistics, C or higher) or one-year experience rule: the MSN Application and Admission Requirements page shows only 'Apply to this program through NursingCAS. Review the sections below' - the sections are catalog-loaded and the catalog is blocked (403). Existing values remain unconfirmed; the MSN admission page itself no longer 404s. | Missouri State's requirement pages load their admission/prerequisite sections from the online catalog (catalog.missouristate.edu), which returned HTTP 403 to automated reading; those sections showed only 'Loading' or nothing. Not bypassed. BSN and RN license required per existing record (not re-confirmed here). Selection left not_published because no method is described. The PMHNP track page itself was not fetched separately. | Partial findings: deadline: not_published

### Missouri State University School of Nursing: BSN to DNP - Adult Gerontology-Acute Care Nurse Practitioner (`missouri-state-agacnp-dnp`)

DNP Application and Admission Requirements page lists only: apply through NursingCAS; BSN from an accredited program (international/non-accredited reviewed individually). No GPA, GRE, experience or deadline published on the DNP pages; further criteria may be in the catalog, which returned 403. Combined master's and doctorate. | Partial findings: deadline: not_published

### Missouri State University School of Nursing: BSN to DNP - Family Nurse Practitioner (`missouri-state-fnp-dnp`)

DNP Application and Admission Requirements page lists only: apply through NursingCAS; BSN from an accredited program (international/non-accredited reviewed individually). No GPA, GRE, experience or deadline published on the DNP pages; further criteria may be in the catalog, which returned 403. Combined master's and doctorate. | Partial findings: deadline: not_published

### Missouri State University School of Nursing: BSN to DNP - Psychiatric-Mental Health Nurse Practitioner (`missouri-state-pmhnp-dnp`)

DNP Application and Admission Requirements page lists only: apply through NursingCAS; BSN from an accredited program (international/non-accredited reviewed individually). No GPA, GRE, experience or deadline published on the DNP pages; further criteria may be in the catalog, which returned 403. Combined master's and doctorate. | Partial findings: deadline: not_published

### Missouri State University School of Nursing: Doctor of Nurse Anesthesia Practice (RN to DNAP) (`missouri-state-crna`)

Deadline: existing record's June 15, 2026 (summer 2027 entry) has passed; school now lists Mar 1 - Jun 7, 2027 for Summer 2028. GPA 3.00 on last 60 hours and the one-year experience minimum could not be re-verified (catalog-loaded, 403; FAQ gives no minimum length). Application is via the university's graduate application portal, not NursingCAS. | Bachelor's degree and RN license required. Critical care experience must be in a U.S. critical care area where the nurse routinely manages invasive hemodynamic monitors, cardiac assist devices, mechanical ventilation or vasoactive infusions; other areas may be considered. Shadowing not required but strongly encouraged. Cohort begins early June and runs 36 months. Deposit conflict persists: Program Requirements page says 'The confirmation deposit is now $1,000'; RN-DNAP cost page lists a $500 confirmation deposit. | Partial findings: deadline: Summer 2028 (RN to DNAP admits for summer only): application opens March 1, 2027; deadline June 7, 2027. Interview dates TBD.

### Southeast Missouri State University: Bachelor of Science in Nursing (BSN) (`semo-bsn`)

Microbiology code: the handbook and curriculum pattern say BS240, but the program page now lists BS340 'Microorganisms and the Human Hosts'. Chemistry lab shown on program page as CH181 with CH184 lab vs CH181/081/001 in handbook. Pathophysiology (NS274 in the Spring 2027+ curriculum) is now in the pre-nursing-course list for students admitted Spring 2027 and later, replacing NS271 in that list. HL113 Medical Terminology appears on the program page as a required support course. Otherwise GPA 2.80, 45 hours, HESI A2 + ranking 60/25/15 and Feb 15 / Sep 15 dates match the existing record.

### Southeast Missouri State University: Nursing (RN-BSN) Online (`semo-rnbsn`)

Handbook now titled Fall 2026 (existing note cited 2022/2025-26). Program page lists the core prerequisites as A&P I and II, Microbiology, English Composition II, Chemistry 'and the majority of the non-nursing courses'; statistics is listed as required but 'may be transferred in or completed at Southeast', so it may not be needed before admission. Otherwise consistent with existing record (2.5 GPA, 7 states, first come first served).

### Southeast Missouri State University: Master of Science in Nursing - Family Nurse Practitioner (`semo-fnp`)

The 2026-27 degree map and program page now say 'Spring, Summer and Fall admission available' and part-time plans are available; the 2025-26 map (existing source_url) said the FNP track starts in the fall. Department application PDF/email step and BLS requirement appear in the 2025-26 map but not in the 2026-27 map or program page, which say to apply at semo.edu/apply.

### University of Central Missouri School of Nursing: Nursing BS - Pre-Licensure (Generic) Option (`ucm-bsn`)

New on page: students admitted fall 2023 or later must also have all general education courses completed; science prerequisites over 10 years old must be evaluated. Otherwise matches the existing record (2.75 GPA, Jan 1 / Jul 1, one repeat, more than one D/F ineligible, direct admission ACT 24 / HS GPA 3.00 / UCM GPA 3.50 / max 40 per semester).

### University of Central Missouri School of Nursing: Master of Science in Nursing - Family Nurse Practitioner track (`ucm-fnp`)

Clinical location wording: 'practica for clinical courses in the state of Missouri or the greater Kansas City area' (existing record said clinicals in KS/MO). Otherwise matches.

## Research of 2026-11-25

### Truman State University: Bachelor of Science in Nursing (`truman-bsn`)

No substantive change: ACT 20 (including science), 2.75 GPA, up to 60 per fall, competitive committee review all re-confirmed. Deadline conflict (Aug 1 rolling vs Jan 15) still present. Combined Ability Score 160 still appears only on the program page. Newly confirmed: a test score is required for nursing even though Truman is otherwise test-optional.

### Missouri Southern State University: Nursing, BS (Pre-Licensure BSN) (`mssu-bsn`)

Mostly unchanged (2.8 GPA, HESI A2 75% with one retake, C or better with one repeat, holistic review, 30 fall / 20 spring). Conflicts found: the 2026-27 handbook lists chemistry as CHEM 121/122 or CHEM 140/141 (web page: CHEM 125 or CHEM 151) and statistics option SOC 405 (web page: SOC 350); handbook describes the HESI minimum as 75% overall (web page: 75% on required sections). Handbook adds a preference for applicants who have met all science and math requirements and says prerequisites may be completed within one semester of application.

### Missouri Southern State University: LPN-to-BSN track (`mssu-bsn-lpn-bridge`)

No substantive change. Same course-code conflicts as mssu-bsn (handbook CHEM 121/122 or 140/141 and SOC 405 vs web CHEM 125/151 and SOC 350). Handbook clarifies the NACE exam awards credit for NURS 307 and NURS 314 (8 credit hours) and may be repeated once.

### Missouri Southern State University: Nursing, RN to BSN (online) (`mssu-rnbsn`)

Existing record lists no prerequisites; the AY 2025-26 applicant checklist and AY 2026-27 RN to BSN handbook list nine prerequisite areas (A&P I and II, microbiology, chemistry, nutrition, college algebra, statistics, general psychology, economics/sociology) with C or better in 2 or fewer attempts, plus all Core 42 general education. GPA 2.8 and Apr 1 / Jul 1 / Oct 1 deadlines confirmed from the handbook.

### Missouri Western State University: Nursing (Bachelor of Science in Nursing) - Pre-Licensure (`missouri-western-bsn`)

Seats: the current Admission and Application Process page says about 60 admitted twice per year (fall and spring); the existing record and the older FAQ page say 50 per semester. Application: the current page describes MoWest's own BSN application portal with a $65 fee and does not mention NursingCAS (existing record says via NursingCAS; the Traditional BSN page still links a NursingCAS portal) - check with the school. New details: support course list (ALH 106, BIO 101, 250, 251, 375, CHE 101/111, PHL 230/231, PSY 101, 240, General Studies Math, all C or higher), 10-year limit on BIO 250/251/375 and PSY 240, TEAS valid 3 years / 2 attempts per calendar year / highest score used, 250-300 word essay.

### Missouri Western State University: LPN-BSN Pathway (`missouri-western-bsn-lpn-bridge`)

Existing record lists no prerequisites; the 2026-27 LPN-BSN sample plan lists ALH 106, BIO 101, BIO 250, BIO 251, BIO 375, CHE 101 or 111, PHL 230 or 231, PSY 240 and General Studies Math (C or higher; 10-year limit on starred courses). The pathway page adds general psychology and says general biology and medical terminology may be waived (the sample plan short list omits PSY 101, which is still a general-studies requirement).

### Missouri Western State University: RN-BSN Track (`missouri-western-rnbsn`)

No substantive change; existing record keeps the three prerequisite courses in notes with an empty prerequisites list - they are now listed as rows (with conditional acceptance allowed if not yet complete).

### Saint Louis University Trudy Busch Valentine School of Nursing: Accelerated One-Year B.S.N. (A.B.S.N.) (`slu-absn`)

Existing record lists General Psychology (PSY 1010) and course codes for chemistry, statistics, ethics and A&P; the current page lists no course codes and no General Psychology prerequisite, and lists Chemistry as one 3-credit course (no separate lab). Current page adds arts, theology/religion, philosophy or ethics, humanities and a humanities-or-social-science choice (3 credits each) for bachelor's holders.

### Saint Louis University Trudy Busch Valentine School of Nursing: M.S.N. Nurse Practitioner - Adult-Gerontological Acute Care (also offered as B.S.N.-D.N.P.) (`slu-agacnp`)

Existing record lists deadlines Fall July 15, Spring Dec. 15, Summer April 15; the current MSN and BSN-DNP pages list no dated deadlines and say applications are reviewed on a rolling basis throughout the year.

### Saint Louis University Trudy Busch Valentine School of Nursing: M.S.N. Nurse Practitioner - Family (also offered as B.S.N.-D.N.P.) (`slu-fnp`)

Existing record lists deadlines Fall July 15, Spring Dec. 15, Summer April 15; the current MSN and BSN-DNP pages list no dated deadlines and say applications are reviewed on a rolling basis throughout the year.

### Saint Louis University Trudy Busch Valentine School of Nursing: M.S.N. Nurse Practitioner - Psychiatric-Mental Health (also offered as B.S.N.-D.N.P.) (`slu-pmhnp`)

Existing record lists deadlines Fall July 15, Spring Dec. 15, Summer April 15; the current MSN and BSN-DNP pages list no dated deadlines and say applications are reviewed on a rolling basis throughout the year.

### Barnes-Jewish College Goldfarb School of Nursing: Bachelor of Science in Nursing (BSN) Upper Division Option (`goldfarb-bsn`)

Apply page now states a 5-year limit for A&P I/II and Microbiology (catalog and program page still say 7 years). Apply page lists a Fall deadline of July 30, 2027 (existing record lists only Spring Nov. 30 and Summer Apr. 12). Otherwise matches existing record.

### Barnes-Jewish College Goldfarb School of Nursing: Bachelor of Science in Nursing (BSN) Weekend/Evening Option (`goldfarb-bsn-evening`)

Apply page states a 5-year limit for A&P I/II and Microbiology (catalog says 7). Existing record has no deadline; Apply page lists Spring Nov. 30, 2026, Summer Apr. 12, 2027, Fall July 30, 2027.

### Barnes-Jewish College Goldfarb School of Nursing: Bachelor of Science in Nursing (BSN) Accelerated Option (`goldfarb-absn`)

Apply page states a 5-year limit for A&P I/II and Microbiology (catalog says 7). Apply page adds a Fall 2027 deadline of July 30, 2027.

### Barnes-Jewish College Goldfarb School of Nursing: MSN Adult-Gerontology Acute Care Nurse Practitioner Concentration (DNP AGACNP concentration also offered) (`goldfarb-agacnp`)

Existing record has no deadline; program page lists Spring Nov. 30 and Summer Apr. 12. Start terms Spring and Fall.

### Barnes-Jewish College Goldfarb School of Nursing: MSN Family Nurse Practitioner Concentration (DNP FNP concentration also offered) (`goldfarb-fnp`)

The program web page now requires "Minimum of 1 year of full-time equivalent RN experience at time of admission"; the existing record (and the 2026-27 catalog) says no work-experience requirement. Program page lists Spring Nov. 30 and Summer Apr. 12 deadlines (existing record had none).

### Barnes-Jewish College Goldfarb School of Nursing: MSN Adult-Gerontology Primary Care Nurse Practitioner Track (DNP AGPCNP concentration also offered) (`goldfarb-agpcnp`)

The program web page now requires "Minimum of 1 year of full-time equivalent RN experience at time of admission"; the existing record (and the 2026-27 catalog) says no work-experience requirement. Program page lists Spring Nov. 30 and Summer Apr. 12 deadlines (existing record had none).

### Barnes-Jewish College Goldfarb School of Nursing: MSN Psychiatric Mental Health Nurse Practitioner Concentration (DNP PMHNP concentration also offered) (`goldfarb-pmhnp`)

The program web page now requires "Minimum of 1 year of full-time equivalent RN experience at time of admission"; the existing record (and the 2026-27 catalog) says no work-experience requirement. Program page lists Spring Nov. 30 and Summer Apr. 12 deadlines (existing record had none).

### Barnes-Jewish College Goldfarb School of Nursing: Doctor of Nursing Practice (DNP) Nurse Anesthesia Track (`goldfarb-crna`)

Program web page adds requirements not in the existing record or catalog: minimum 3.0 science GPA; prerequisite grade B- or higher (catalog says "satisfactory grade"); A&P at least 6 credit hours; current CCRN certification with AACN score report required (existing record says CCRN not mentioned); minimum 12 months full-time ICU experience at the application deadline (OR and NICU not accepted; PACU/ED may be considered only with ventilator, invasive monitoring and vasoactive infusion care, as in the existing record); GRE/GMAT explicitly not required; shadowing encouraged, not required; cohort of 15-20.

### Maryville University of Saint Louis: Bachelor of Science in Nursing - Freshman Direct Entry (`maryville-bsn`)

Program pages give no GPA, ACT/SAT, exam, or course rules; they refer to the catalog's Undergraduate Admissions Requirements (catalog.maryville.edu), which returned HTTP 403 to automated fetch. Program page lists term starts Spring 2027 (Jan. 11) and Fall 2027 (Aug. 23) and says 'free transcript evaluation, quick admission decisions, and no application fee.' Confirm requirements with Maryville admissions (1-800-627-9855).

### Maryville University of Saint Louis: Bachelor of Science in Nursing - Fast Track (transfer) (`maryville-bsn-fast-track`)

Specific prerequisite list, GPA and grade minimums are not on the program pages; the catalog (catalog.maryville.edu) returned HTTP 403. A third-party site cites a 3.25 cumulative GPA and 7-year science limit, unverified on Maryville's own site, so not used. Term starts listed: Spring 2027 Jan. 11, Fall 2027 Aug. 23.

### Maryville University of Saint Louis: Online MSN - Family Nurse Practitioner (BSN to DNP FNP also offered) (`maryville-fnp`)

Admissions pages now say applicants below the GPA minimum submit 'one letter of recommendation'; existing record (and the degree page) say personal statement. Otherwise unchanged.

### Maryville University of Saint Louis: Online MSN - Adult-Gerontology Primary Care Nurse Practitioner (BSN to DNP AGPCNP also offered) (`maryville-agpcnp`)

Admissions pages now say applicants below the GPA minimum submit 'one letter of recommendation'; existing record (and the degree page) say personal statement. Otherwise unchanged.

### Maryville University of Saint Louis: Online MSN - Adult-Gerontology Acute Care Nurse Practitioner (BSN to DNP AGACNP also offered) (`maryville-agacnp`)

Admissions pages now say applicants below the GPA minimum submit 'one letter of recommendation'; existing record (and the degree page) say personal statement. Otherwise unchanged.

### Maryville University of Saint Louis: Online MSN - Pediatric Nurse Practitioner (BSN to DNP PNP also offered) (`maryville-pnp`)

Admissions pages now say applicants below the GPA minimum submit 'one letter of recommendation'; existing record (and the degree page) say personal statement. Otherwise unchanged.

### Maryville University of Saint Louis: Online MSN - Psychiatric Mental Health Nurse Practitioner (BSN to DNP PMHNP also offered) (`maryville-pmhnp`)

Admissions pages now say applicants below the GPA minimum submit 'one letter of recommendation'; existing record (and the degree page) say personal statement. Otherwise unchanged.

### Missouri Baptist University (Mary Pillsbury School of Nursing): Bachelor of Science in Nursing (Traditional) (`mobap-bsn`)

Existing record had no GPA, selection or deadline. Admission Policy PDF (rev. 8/2025) adds: 3.0 minimum (high-school unweighted GPA for direct entry; overall college GPA for open cohort seats), competitive review with waitlist, Jul 15-Nov 1 application window, up to 40 students/year, C-or-better in Intro Chemistry, Intro Biology, College Algebra and Probability & Statistics, and a one-repeat limit for the B-required sciences.

### Missouri Baptist University (Mary Pillsbury School of Nursing): Accelerated BSN (`mobap-absn`)

Confirms 3.2 GPA, no TEAS, March 1, 2027 deadline. New vs existing record: learnmore page explicitly says 'NO bachelor's degree required' (record said pages did not state it); policy PDF adds C-or-better in Intro Chemistry, Intro Biology, College Algebra and Probability & Statistics, one-repeat limit for B-required sciences, competitive review, waitlist, and up to 32 students per year.

### Webster University: Doctor of Nurse Anesthesia Practice (DNAP) with an Emphasis in Health Administration (`webster-crna`)

Program page now says approximately 60-80 applicants complete the process each year (new detail). Program page gives recency as 'within the last 5 to 6 years' for competitiveness while catalog says within the last 5 years. CCRN: program page says Adult CCRN preferred with score sheet; catalog lists only 'Upload CCRN score sheet', not a requirement.

### Mercy's Southeast Missouri Hospital College of Nursing and Health Sciences: Associate of Applied Science in Nursing (`mercy-cape-adn`)

sehcollege.edu still returns 403 to automated reading, so current requirements could not be verified. The only admissions documents found are 2021-era Southeast Health fact sheets on the college's old media host (res.cloudinary.com/.../southeast-health-site-362/...), which listed a 2.50 GPA and ATI TEAS 70% with 45% science; these predate the Mercy ownership and were not used. The empty prerequisites list means requirements are unknown, not that there are none.

### Mercy's Southeast Missouri Hospital College of Nursing and Health Sciences: Practical Nursing Bridge Program to the Associate Degree Nursing Program (`mercy-cape-adn-lpn-bridge`)

For LPNs. sehcollege.edu returns 403 to automated reading; no current requirements could be verified. The empty prerequisites list means requirements are unknown, not that there are none.

### Rockhurst University – Saint Luke's College of Nursing and Health Sciences: Bachelor of Science in Nursing (BSN), Saint Luke's College of Nursing and Health Sciences (`saint-lukes-bsn`)

No substantive change found. Page no longer shows (or the fetch did not return) the 'meeting minimums does not guarantee admission' sentence. Open electives (11 cr) omitted from prerequisite rows as they are not a specific course.

### Rockhurst University – Saint Luke's College of Nursing and Health Sciences: Hybrid Accelerated Bachelor of Science in Nursing (ABSN) (`saint-lukes-absn`)

Deadline changed: the Nov 20, 2026 deadline / Jan 11, 2027 start is no longer listed; the page now shows the next start as May 17, 2027 with no deadline date. Page now states a separate 2.7 prerequisite GPA (existing record merged it into one GPA sentence).

### Rockhurst University – Saint Luke's College of Nursing and Health Sciences: Registered Nurse to Bachelor of Science in Nursing (RN-BSN) (`saint-lukes-rnbsn`)

Requirements now found in the program page FAQ: minimum cumulative GPA 2.0 with no grade below C; active unencumbered license; U.S. citizenship or permanent residency; maximum 36 nursing credit hours from an associate/diploma program; up to 90 transfer credits. Existing record said requirements were not listed.

### Avila University: Accelerated Bachelor of Science in Nursing (ABSN) (`avila-absn`)

Prerequisite list on the current page adds General Psychology and Nutrition (not in the existing record); the existing 'Developmental Psychology' row is now worded 'Lifespan Development'.

### William Jewell College: Bachelor of Science in Nursing (Traditional Four-Year BSN; Three-Year BSN option) (`william-jewell-bsn`)

Pathophysiology removed from the prerequisite rows: the January 2026 curriculum guide places NUR 221 Human Pathophysiology in the first nursing semester (Junior Fall, alongside NUR 232, which requires program admission); the program page only sets rules for transferred Pathophysiology. Chemistry's B- rule comes only from the curriculum guide ('all Science prerequisites'); the program page names only Anatomy, Physiology and Microbiology for B-, so science grade minimums are see_text.

### Park University: Nursing (Pre-Licensure), B.S.N. (`park-u-bsn`)

No substantive change. GPA rules are recorded as two separate minimums (2.8 overall from the admissions page; 3.0 on foundation math and science from the handbook) rather than a conflict. TEAS minimum still conflicts (60 vs 58.7%).

### Graceland University: Nursing: BSN-RN (Bachelor of Science in Nursing for Beginning Professional Students, Independence Campus) (`graceland-bsn`)

No substantive change. Note the admissions page itself conflicts on GPA (2.5 January / 2.75 June vs 2.75 for all), so GPA fields set to see_text. Graceland course codes for stats, med term, psych, lifespan and sociology added from the catalog's Independence supporting-course list.

### Graceland University: MSN: Family Nurse Practitioner (Online) (`graceland-fnp`)

Adds the graduate catalog's 2.50 minimum cumulative BSN GPA (existing record had no GPA) and the 1,000-hour RN experience priority.

### Graceland University: MSN: Adult & Gerontology Acute Care Nurse Practitioner (Online) (`graceland-agacnp`)

Adds the graduate catalog's 2.50 minimum cumulative BSN GPA and the 1,000-hour RN experience priority.

### Graceland University: MSN: Psychiatric Mental Health Nurse Practitioner (Online) (`graceland-pmhnp`)

Adds the graduate catalog's 2.50 minimum cumulative BSN GPA and the 1,000-hour RN experience priority.

### Western Governors University: Nursing (Prelicensure) B.S. — Missouri (`wgu-mo-bsn`)

Existing record lists 10 college courses as prerequisites. Current WGU catalog and admissions pages list no admission course prerequisites: those courses (Intro to Chemistry, A&P I/II, Microbiology, Pathophysiology, Applied Healthcare Statistics, Applied Algebra, Intro Psych, Human Growth and Development, Intro Sociology) are part of the WGU pre-nursing curriculum (terms 1-4), with transfer credit possible at C or better and a 5-year limit on A&P I/II, Micro and Patho. Prerequisites set to []. Exam: catalog accepts HESI A2 or ATI TEAS within five years (admissions page names only TEAS).

### Western Governors University: Master of Science in Nursing – Family Nurse Practitioner (BSN to MSN) (`wgu-mo-fnp`)

Catalog FNP excluded states now: California, DC, Louisiana, Massachusetts, New York, North Dakota, Washington (program page omits Massachusetts). Missouri remains eligible.

### Western Governors University: Master of Science, Nursing – Psychiatric Mental Health Nurse Practitioner (BSN to MSN) (`wgu-mo-pmhnp`)

Catalog PMHNP excluded states now: Arizona, California, DC, Louisiana, Massachusetts, New York, North Dakota, Washington, Wisconsin (existing record listed CA, DC, LA, NY, ND, WA; program page still shows the shorter list). Missouri remains eligible.

### Central Methodist University: Bachelor of Science, Nursing (BSN) (`central-methodist-bsn`)

No substantive change. Pathophysiology moved out of the prerequisite list: it is only strongly recommended before admission (can be taken alongside first nursing courses with Program Director approval; B required to progress).

### Central Methodist University: Accelerated Nursing (ABSN) (`central-methodist-absn`)

No substantive change. Exam set to see_text: requirements page omits it but the application PDF still references TEAS V. (A search snippet cited a Feb 1 deadline; not found on the pages fetched.)

### Missouri Valley University (formerly Missouri Valley College): Nursing (BSN) — traditional 2+2 (`missouri-valley-bsn`)

No substantive change. The 2.75 GPA is specifically 'in core and prerequisite nursing classes', not an overall GPA. Catalog adds a TEAS retake limit (no more than three times in one year) not in the existing record. Catalog wording lists '7 credit hours of human anatomy and physiology' rather than naming BIOL 275/285.

### Missouri Valley University (formerly Missouri Valley College): Nursing: LPN to BSN (`missouri-valley-bsn-lpn-bridge`)

No substantive change. Catalog adds a TEAS retake limit (no more than three times in one year).

### Columbia College: Associate of Science in Nursing (ASN), Barbara J. Bilger Family Nursing Program (`columbia-college-mo-adn`)

No substantive change. The 3.0 GPA and Kaplan 60 are recommendations, not minimums. The admissions page names only the Kaplan exam (no HESI A2 mention there); the existing record's HESI A2 note from the handbook/cost page was not re-checked.

### Columbia College: Bachelor of Science in Nursing (Traditional BSN) (`columbia-college-mo-bsn`)

No substantive change. 3.0 GPA is a recommendation, not a minimum.

### Stephens College: Nursing (B.S.N.) (`stephens-bsn`)

No substantive change vs the existing record (which already used the 2026-27 handbook). The nursing-admissions FAQ page still shows older criteria (GPA 2.5, preferred ACT 22/SAT 1100, essay, Nov 1 January-transfer deadline, BIO 112/CHE 111/EDU 114/PSY 111 required courses) that conflict with the 2026-27 handbook (GPA 3.4, ACT 20/SAT 1000 minimums, essay removed).

### Southwest Baptist University (Mercy College of Health Professions): Associate of Science in Nursing (ASN) (`sbu-adn`)

No substantive change found. Current program page names no minimum prerequisite grade, time limit, deadline or selection method; those come only from the 2022-23 catalog PDF (the current catalog.sbuniv.edu pages are blocked with 403). The 2022-23 catalog also had a 5-year science limit and a two-attempt limit on prerequisite sciences not in the existing record. Existing record's 'August 1' spring deadline is the BSN's 2022-23 deadline, not the ASN's.

### Southwest Baptist University (Mercy College of Health Professions): LPN-Paramedic to Associate of Science in Nursing (ASN) Bridge (`sbu-adn-lpn-bridge`)

No substantive change. Bridge page describes it as 'a three-semester program' (summer bridge course plus semesters 3-4).

### Southwest Baptist University (Mercy College of Health Professions): Bachelor of Science in Nursing (pre-licensure BSN, Bolivar) (`sbu-bsn`)

No substantive change. Selection worksheet scoring is not published, so selection is competitive rather than points.

### College of the Ozarks: Nursing Major, B.S.N. (`college-ozarks-bsn`)

Could not re-verify the catalog-derived details in the existing record (BIO 164/174, CHE 134/144, ENG 103, PSY 103 with C-; HESI A2 76% benchmark; March 1 application / June 1 notification; one repeated D/F rule): catalog.cofo.edu returns HTTP 403 to automated fetches. The nursing web page itself confirms only the 2.75 cumulative GPA, preferred ACT 21, one year of prerequisites, assessments and an interview. Prerequisite list reduced to a single placeholder row rather than unverified courses. | Must first be admitted to College of the Ozarks (work college; separate competitive admission). Preferred (not minimum) ACT composite 21. Applicants should show integrity, a teachable spirit, positive communication skills and emotional stability. Course list, grades, exam and deadline: check the catalog or contact the nursing program director.

### Hannibal-LaGrange University (Craigmiles School of Nursing): Associate of Science in Nursing (ASN) (`hannibal-lagrange-adn`)

Behavioral science requirement is 6 credits with RECOMMENDED courses (PSY 113, PSY 225, SOC 113), not a fixed PSY 113 + SOC 113 pair; rows now one_of 'bs' (pick courses totaling 6 credits). Added PSY 225 option. 5-year limit applies to science prerequisites (waivable for practicing LPNs). Otherwise consistent with the existing record.

### Hannibal-LaGrange University (Craigmiles School of Nursing): LPN-ADN Bridge - Associate of Science in Nursing (advanced placement) (`hannibal-lagrange-adn-lpn-bridge`)

Behavioral science is 6 credits from recommended courses (PSY 113, PSY 225, SOC 113), not a fixed PSY 113 + SOC 113 pair. Only Microbiology is named as required before admission, plus 'a majority' of ASN support courses. Otherwise consistent with the existing record.

### Culver-Stockton College (School of Nursing with Hannibal Regional): Bachelor of Science in Nursing - Culver-Stockton College School of Nursing with Hannibal Regional (3-year BSN) (`culver-stockton-bsn`)

Added COM 115 Fundamentals of Speech (semester 1 course). PSY 101/SOC 102 and MAT 205/MAT 110 recorded as either/or pairs. Otherwise consistent with the existing record (exams still listed as currently waived).

