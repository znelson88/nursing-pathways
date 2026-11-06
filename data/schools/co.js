// Colorado school, program and transfer data for the Schools page.
// Plain (non-module) script: it attaches to window.SCHOOLS so the page works from a
// double-clicked file as well as over HTTP, matching data.js and app.js. One file per state.
//
// RULES (see docs/SCHOOLS_SPEC.md and CLAUDE.md):
//  - Every record carries source_url and last_verified (YYYY-MM-DD). No source -> it doesn't go in.
//  - Unknown values are null, never a guess. The page shows "Not published" / "Check with the school".
//  - credential values reuse the career map's role ids (cna, lpn, adn, bsn, rnbsn, msn, fnp, crna, ...).
//  - open_entry:true marks a program that admits anyone holding the previous credential (e.g. an
//    RN-to-BSN that takes any accredited ADN+RN, or a graduate program that takes any accredited BSN+RN),
//    so the route can offer it without a school-to-school agreement.
//
// All facts verified 2026-11-05 from each institution's own website. See docs/DATA_SOURCES.md for the log.

(function () {
  const CO = {
    state: "CO",
    updated: "2026-11-05",

    institutions: [
      { id: "trinidad-state", name: "Trinidad State College", type: "community_college", city: "Trinidad", campuses: ["Trinidad", "Valley (Alamosa)"], url: "https://trinidadstate.edu/nursing", source_url: "https://trinidadstate.edu/nursing", last_verified: "2026-11-05" },
      { id: "pikes-peak", name: "Pikes Peak State College", type: "community_college", city: "Colorado Springs", campuses: ["Center for Healthcare Education and Simulation (CHES), Colorado Springs"], url: "https://www.pikespeak.edu/programs/nursing/index.php", source_url: "https://www.pikespeak.edu/programs/nursing/index.php", last_verified: "2026-11-05" },
      { id: "pueblo-cc", name: "Pueblo Community College", type: "community_college", city: "Pueblo", campuses: ["Pueblo", "Fremont", "Mancos (Southwest)"], url: "https://pueblocc.edu/programs/nur", source_url: "https://pueblocc.edu/programs/nur", last_verified: "2026-11-05" },
      { id: "front-range", name: "Front Range Community College", type: "community_college", city: "Westminster", campuses: ["Larimer (Fort Collins)", "Westminster"], url: "https://www.frontrange.edu/programs-courses/program-list/nursing-program/index.html", source_url: "https://www.frontrange.edu/programs-courses/program-list/nursing-program/index.html", last_verified: "2026-11-05" },
      { id: "cu-anschutz", name: "University of Colorado College of Nursing (Anschutz)", type: "public_university", city: "Aurora", campuses: ["Anschutz Medical Campus (Aurora)"], url: "https://nursing.cuanschutz.edu/", source_url: "https://nursing.cuanschutz.edu/about/accreditation", last_verified: "2026-11-05" },
      { id: "unco", name: "University of Northern Colorado", type: "public_university", city: "Greeley", campuses: ["Greeley", "Loveland", "Online"], url: "https://extended.unco.edu/current-students/graduate/nursing-dnp-fnp-noco-ol-c14/", source_url: "https://extended.unco.edu/current-students/graduate/nursing-dnp-fnp-noco-ol-c14/", last_verified: "2026-11-05" },
      { id: "csu-pueblo", name: "Colorado State University Pueblo", type: "public_university", city: "Pueblo", campuses: ["Pueblo", "Online"], url: "https://www.csupueblo.edu/online/nursing/rn-to-bsn.html", source_url: "https://www.csupueblo.edu/online/nursing/rn-to-bsn.html", last_verified: "2026-11-05" },
      { id: "uccs", name: "University of Colorado Colorado Springs (Johnson Beth-El)", type: "public_university", city: "Colorado Springs", campuses: ["Colorado Springs", "Online"], url: "https://johnsonbethel.uccs.edu/academics/programs/rn-to-bsn-and-dual-enrollment-option", source_url: "https://johnsonbethel.uccs.edu/academics/nursing", last_verified: "2026-11-05" },
      { id: "msu-denver", name: "Metropolitan State University of Denver", type: "public_university", city: "Denver", campuses: ["Denver", "Online"], url: "https://www.msudenver.edu/online/rn-bsn/", source_url: "https://www.msudenver.edu/online/rn-bsn/", last_verified: "2026-11-05" },
      { id: "rocky-vista", name: "Rocky Vista University (Colorado)", type: "private_nonprofit", city: "Englewood", campuses: ["Colorado Campus (Englewood / Parker)"], url: "https://www.rvu.edu/doctor-nurse-anesthesia-practice/", source_url: "https://www.rvu.edu/doctor-nurse-anesthesia-practice/", last_verified: "2026-11-05" },
      { id: "arapahoe", name: "Arapahoe Community College", type: "community_college", city: "Littleton", campuses: ["Littleton", "Castle Rock", "Lone Tree"], url: "https://www.arapahoe.edu/academics-programs/programs/nursing", source_url: "https://www.arapahoe.edu/academics-programs/programs/nursing", last_verified: "2026-11-05" },
      { id: "colorado-mesa", name: "Colorado Mesa University", type: "public_university", city: "Grand Junction", campuses: ["Grand Junction"], url: "https://www.coloradomesa.edu/health-sciences/undergraduate/nursing/index.html", source_url: "https://www.coloradomesa.edu/health-sciences/undergraduate/nursing/bachelor.html", last_verified: "2026-11-05" },
      { id: "regis", name: "Regis University (Loretto Heights School of Nursing)", type: "private_nonprofit", city: "Denver", campuses: ["Denver (Northwest Denver campus)"], url: "https://explore.regis.edu/nursing", source_url: "https://www.regis.edu/academics/majors-and-programs/undergraduate/nursing-bsn", last_verified: "2026-11-05" },
      { id: "adams-state", name: "Adams State University", type: "public_university", city: "Alamosa", campuses: ["Alamosa"], url: "https://www.adams.edu/academics/undergraduate/nursing/", source_url: "https://www.adams.edu/academics/undergraduate/nursing/", last_verified: "2026-11-05" },
      { id: "colorado-christian", name: "Colorado Christian University", type: "private_nonprofit", city: "Lakewood", campuses: ["Lakewood (main campus)"], url: "https://www.ccu.edu/ccu/nursing/bsn/", source_url: "https://catalog.ccu.edu/programs/NURS.BSN", last_verified: "2026-11-05" },
      { id: "aims", name: "Aims Community College", type: "community_college", city: "Greeley", campuses: ["Greeley"], url: "https://www.aims.edu/degrees-certificates/nursing", source_url: "https://www.aims.edu/degrees-certificates/nursing", last_verified: "2026-11-05" },
      { id: "cncc", name: "Colorado Northwestern Community College", type: "community_college", city: "Craig", campuses: ["Craig"], url: "https://www.cncc.edu/degrees/craig/nursing", source_url: "https://www.cncc.edu/degrees/cte/nursing/information.php", last_verified: "2026-11-05" },
      { id: "lamar", name: "Lamar Community College", type: "community_college", city: "Lamar", campuses: ["Lamar"], url: "https://lamarcc.edu/program/nursing/", source_url: "https://lamarcc.edu/program/nursing/", last_verified: "2026-11-05" },
      { id: "morgan", name: "Morgan Community College", type: "community_college", city: "Fort Morgan", campuses: ["Fort Morgan"], url: "https://www.morgancc.edu/area-of-study/nursing-adn/", source_url: "https://catalog.morgancc.edu/nursing-program/associate-of-applied-science/nursing", last_verified: "2026-11-05" },
      { id: "northeastern-jc", name: "Northeastern Junior College", type: "community_college", city: "Sterling", campuses: ["Sterling"], url: "https://www.njc.edu/program/nursing", source_url: "https://www.njc.edu/program/nursing/adn-steps-admission", last_verified: "2026-11-05" },
      { id: "otero", name: "Otero College", type: "community_college", city: "La Junta", campuses: ["La Junta"], url: "https://otero.edu/academics-programs/degrees-certificates/nursing/", source_url: "https://otero.edu/academics-programs/degrees-certificates/nursing/", last_verified: "2026-11-05" },
      { id: "colorado-mesa-montrose", name: "Colorado Mesa University — Montrose", type: "public_university", city: "Montrose", campuses: ["Montrose"], url: "https://www.coloradomesa.edu/health-sciences/undergraduate/nursing/associate.html", source_url: "https://catalog.coloradomesa.edu/areas-study/nursing/nursing-aas/", last_verified: "2026-11-05" },
      { id: "red-rocks", name: "Red Rocks Community College", type: "community_college", city: "Arvada", campuses: ["Arvada"], url: "https://www.rrcc.edu/academic-programs/nursing", source_url: "https://www.rrcc.edu/academic-programs/nursing", last_verified: "2026-11-05" },
      { id: "cca", name: "Community College of Aurora", type: "community_college", city: "Centennial", campuses: ["Centennial (Campus for Healthcare & First Responders)"], url: "https://ccaurora.edu/programs/health-science-department/nursing-aas/", source_url: "https://ccaurora.edu/programs/health-science-department/nursing-aas/", last_verified: "2026-11-05" },
      { id: "denver-college-nursing", name: "Denver College of Nursing", type: "private_nonprofit", city: "Denver", campuses: ["Denver"], url: "https://www.denvercollegeofnursing.edu/", source_url: "https://www.denvercollegeofnursing.edu/programs/associate-degree-in-nursing.html", last_verified: "2026-11-05" },
      { id: "adventhealth", name: "AdventHealth University (Denver)", type: "private_nonprofit", city: "Greenwood Village", campuses: ["Greenwood Village"], url: "https://www.ahu.edu/denver/nursing", source_url: "https://www.ahu.edu/programs/bs-nursing/admissions", last_verified: "2026-11-05" },
      { id: "concordia-denver", name: "Concordia University, St. Paul — Denver", type: "private_nonprofit", city: "Greenwood Village", campuses: ["Greenwood Village (Denver)"], url: "https://global.csp.edu/programs/absn-denver/", source_url: "https://global.csp.edu/programs/absn-denver/", last_verified: "2026-11-05" },
      { id: "colorado-mountain", name: "Colorado Mountain College", type: "public_university", city: "Glenwood Springs", campuses: ["Breckenridge", "Spring Valley (Glenwood Springs)", "Steamboat Springs"], url: "https://coloradomtn.edu/programs/nursing/bachelor-science-nursing/", source_url: "https://coloradomtn.edu/programs/academic-pathways/nursing-allied-health/bachelor-science-nursing/", last_verified: "2026-11-05" }
    ],

    programs: [
      // ================= Associate Degree Nursing (ADN -> RN) — the starting schools =================
      {
        id: "trinidad-state-adn", institution: "trinidad-state", credential: "adn",
        name: "Associate Degree Nursing (Nursing AAS)",
        length: "4 semesters (about 2 years) after prerequisites",
        format: "In person, at the Trinidad and Valley (Alamosa) campuses; traditional or evening/weekend",
        prerequisites: [
          { course: "English Composition", code: "ENG 1021", min_grade: null },
          { course: "Human Growth and Development", code: "PSY 2440", min_grade: null },
          { course: "Human Anatomy and Physiology I", code: "BIO 2101", min_grade: null }
        ],
        admission: {
          entrance_exam: "HESI Nursing Admission test", selection: "points",
          gpa: "3.0 GPA on the required prerequisite courses and a 2.5 cumulative GPA; points are awarded for GPA, extra completed courses and the admission-exam score. No waitlist or deferments.",
          deadline: "Apply in January for an August (fall) start; prerequisites must be finished before August.",
          notes: "Students must pass every program course with a grade of C or higher. LPN-to-ADN and Paramedic-to-ADN bridges exist, and a Practical Nurse (PN) exit is available after the first year."
        },
        cost: { amount: null, basis: "A single program tuition figure is not published. The nursing pages list per-credit program fees ($57.95/credit), standardized-testing costs (~$500 over two years), a lab kit ($145), the NCLEX-RN fee ($200) and other supplies. Colorado residents may use the College Opportunity Fund to lower tuition.", year: "2025-26" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, by campus (reported by Trinidad State from Colorado DORA data)",
          by_campus: {
            "Trinidad": [{ year: 2025, rate: 0.96 }, { year: 2024, rate: 0.90 }, { year: 2023, rate: 0.89 }, { year: 2022, rate: 0.84 }],
            "Valley (Alamosa)": [{ year: 2025, rate: 1.00 }, { year: 2024, rate: 1.00 }, { year: 2023, rate: 1.00 }, { year: 2022, rate: 1.00 }]
          },
          source_url: "https://trinidadstate.edu/nursing"
        },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Colorado State Board of Nursing",
        source_url: "https://www.trinidadstate.edu/nursing/nursing-admission-information.html",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: ""
      },
      {
        id: "pikes-peak-adn", institution: "pikes-peak", credential: "adn",
        name: "Associate Degree in Nursing (AAS)",
        length: "4 semesters (56.5 credits) after prerequisites",
        format: "In person, at the Center for Healthcare Education and Simulation (CHES), Colorado Springs",
        prerequisites: [
          { course: "English Composition I", code: "ENG 1021", min_grade: "C" },
          { course: "Human Growth & Development", code: "PSY 2440", min_grade: "C" },
          { course: "Human Anatomy & Physiology I", code: "BIO 2101", min_grade: "C" },
          { course: "Microbiology", code: "BIO 2104", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "TEAS (Reading & Math at or above 70%, Science at or above 60% to earn points)",
          selection: "points (max 73; ties broken by randomization)",
          gpa: "Posted GPA must be 2.5 or higher to be eligible",
          deadline: "Spring cohort: apply Oct 15-31; Fall cohort: apply May 15-31",
          notes: "BIO prerequisites must be within 7 years. MAT 1120, BIO 2102 and BIO 2116 are taken inside the program, not before admission."
        },
        cost: { amount: 19733, basis: "In-state NUR tuition for the full 56.5-credit program ($370.40/credit) is about $19,733. With fees, books, clinical and licensing, the college estimates about $29,592 total for residents. Non-resident tuition is higher.", year: "2025-26" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate by term (official college pass-rate table, 2026)",
          by_campus: { "By term": [{ year: "Spring 2025", rate: 0.96 }, { year: "Fall 2024", rate: 1.00 }, { year: "Spring 2024", rate: 1.00 }, { year: "Fall 2023", rate: 0.964 }, { year: "Spring 2023", rate: 0.975 }] },
          source_url: "https://www.pikespeak.edu/programs/nursing/adn/Pass%20Rates%20Table_2026.pdf"
        },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN)",
        source_url: "https://www.pikespeak.edu/programs/nursing/adn/nursing-application.php",
        last_verified: "2026-11-05", academic_year: "2025-26",
        notes: "The ADN pages say the curriculum is guided by the Colorado State Board of Nursing but don't explicitly state program approval. A 2025 college press release called it the state's #1 ADN program with a 100% NCLEX rate; the term-by-term table above is the authoritative figure."
      },
      {
        id: "pueblo-cc-adn", institution: "pueblo-cc", credential: "adn",
        name: "Associate Degree Nursing (AAS)",
        length: "70 credits total (46.5 nursing + 24 general education). Length in terms isn't stated on the official pages.",
        format: "In person (day), at the Pueblo, Fremont and Mancos (Southwest) campuses",
        prerequisites: [
          { course: "English Composition", code: "ENG 1021", min_grade: "C" },
          { course: "Human Growth and Development", code: "PSY 2440", min_grade: "C" },
          { course: "Anatomy and Physiology I", code: "BIO 2101", min_grade: "C" },
          { course: "Anatomy and Physiology II", code: "BIO 2102", min_grade: "C" },
          { course: "Microbiology", code: "BIO 2104", min_grade: "C" },
          { course: "Dietary Nutrition (or HWE 1050 Human Nutrition)", code: "HPR 1010", min_grade: "C" },
          { course: "Math for Clinical Calculations", code: "MAT 1120", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "TEAS Version 7 (Reading & Math scored; a composite of 58.6 or below is ineligible)",
          selection: "points (a 100-point scoring tool; competitive)",
          gpa: "Minimum 2.80 GPA on the prerequisite courses",
          deadline: "Fall cycle: applications open about April 1 and close late May",
          notes: "Seven courses must meet the 2.80 GPA. All biology courses must be completed within 10 years of entry."
        },
        cost: { amount: 17263, basis: "Full-program in-state tuition with the College Opportunity Fund (resident): about $17,263 (46.5 nursing credits at $276.40 + 24 general-ed at $183.75). Without COF: about $25,441. Excludes books, uniforms and licensing.", year: "2026-27" },
        nclex_pass_rate: {
          basis: "2024 first-time NCLEX-RN pass rate across all three campuses combined, all nursing programs (an ADN-only figure isn't published)",
          by_campus: { "All campuses (all nursing programs)": [{ year: 2024, rate: 0.9263 }] },
          source_url: "https://pueblocc.edu/programs/nur"
        },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); all nursing programs approved by the Higher Learning Commission and the Colorado State Board of Nursing",
        source_url: "https://pueblocc.edu/document/adn-application-process",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: ""
      },
      {
        id: "front-range-adn", institution: "front-range", credential: "adn",
        name: "Associate of Applied Science (AAS) in Nursing",
        length: "4 semesters (71.5 credits)",
        format: "In person, at the Larimer (Fort Collins) and Westminster campuses",
        prerequisites: [
          { course: "Biology Foundations", code: "BIO 1010", min_grade: "C" },
          { course: "Human Anatomy & Physiology I w/Lab", code: "BIO 2101", min_grade: "C" },
          { course: "English Composition I or II", code: "ENG 1021/1022", min_grade: "C" },
          { course: "Human Growth & Development", code: "PSY 2440", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "HESI A-2 (minimum average 80% in the required subjects)",
          selection: "competitive ranking; the top 40 applicants are admitted each fall and spring",
          gpa: "Minimum 3.0 GPA on prerequisites",
          deadline: "Fall 2027 admission: applications Feb 22 - Mar 1, 2027",
          notes: "Prerequisites must be within 10 years. Microbiology (BIO 2104) and nutrition (HPR 1010 or HWE 1050) may be in progress at application; admitted class size can be reduced by clinical-site limits."
        },
        cost: { amount: null, basis: "No single ADN tuition figure is published on the nursing pages; the college lists general per-credit tuition. (The $357/credit net figure on FRCC's site is for the BSN, not the ADN.)", year: null },
        nclex_pass_rate: {
          basis: "2024 first-time NCLEX-RN pass rate for the AAS/ADN program (cited by FRCC to the Colorado State Board of Nursing)",
          by_campus: { "AAS/ADN": [{ year: 2024, rate: 0.99 }] },
          source_url: "https://www.frontrange.edu/programs-courses/program-list/nursing-program/index.html"
        },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN)",
        source_url: "https://www.frontrange.edu/programs-courses/program-list/nursing-program/westminster-campus-nursing/associate-degree-admissions.html",
        last_verified: "2026-11-05", academic_year: "2026-27",
        notes: "An explicit Colorado State Board of Nursing program-approval statement wasn't found; the board is named as the NCLEX data source and the licensing body."
      },

      // ================= RN-to-BSN completion (open to any accredited ADN + RN license) =================
      {
        id: "trinidad-state-rnbsn", institution: "trinidad-state", credential: "rnbsn", open_entry: true,
        name: "RN-to-BSN (bachelor's completion)",
        length: "120 total credits; about 4 semesters. Full- or part-time; fall, spring or summer start.",
        format: "100% online. Practicum hours (22.5 Leadership, 45 Community Health) done where you live.",
        prerequisites: [],
        admission: { entrance_exam: null, selection: "open to qualified applicants", gpa: null, deadline: null,
          notes: "Graduate of an associate or diploma nursing program with a current, unencumbered U.S. RN license. Accepts up to 89.5 transfer credits (C or higher); at least 30.5 credits earned at Trinidad State. A concurrent 'dual-enrollment' BSN track lets current ADN students start BSN courses after their first nursing semester. No application or program fee." },
        cost: { amount: null, basis: "Tuition is charged per credit and depends on residency and course level; a single program price is not published. Out-of-state students pay the in-state rate for NUR 3000/4000-level courses.", year: "2025-26" },
        nclex_pass_rate: { basis: "Not applicable — a bachelor's-completion program for nurses who are already licensed.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://trinidadstate.edu/rn-bsn/", last_verified: "2026-11-05", academic_year: "2026-27", notes: ""
      },
      {
        id: "pikes-peak-rnbsn", institution: "pikes-peak", credential: "rnbsn", open_entry: true,
        name: "RN-to-BSN", length: null,
        format: "100% online (8-week courses); some classes require in-person practicum/clinical hours.",
        prerequisites: [],
        admission: { entrance_exam: null, selection: null, gpa: null, deadline: null,
          notes: "Open to licensed RNs; a dual-enrollment option lets current ADN students take bachelor's courses. Admission details, total credits and cost weren't published on the pages we could open — check with the school." },
        cost: { amount: null, basis: "Not published on the program page (links to the general tuition page).", year: null },
        nclex_pass_rate: { basis: "Not applicable — bachelor's-completion program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://www.pikespeak.edu/programs/nursing/rn-bsn/index.php", last_verified: "2026-11-05", academic_year: null, notes: "" },
      {
        id: "pueblo-cc-rnbsn", institution: "pueblo-cc", credential: "rnbsn", open_entry: true,
        name: "RN-to-BSN (Bachelor of Science in Nursing)",
        length: "120 total credits (up to 71.5 transferred; 30.5 BSN nursing + 18 general education)",
        format: "Online; 8-week courses, designed for working nurses.",
        prerequisites: [],
        admission: { entrance_exam: null, selection: "selective admissions application", gpa: null, deadline: "Fall July 31, Spring Nov 30, Summer Mar 31",
          notes: "Graduate of an accredited ADN program, or dual-enroll while in good standing in PCC's ADN program. Credit is given based on a valid, unencumbered RN license; starts every semester." },
        cost: { amount: 16102, basis: "Full-program tuition with the College Opportunity Fund (resident): about $16,102 (30.5 BSN nursing credits at $419.50 + 18 general-ed at $183.75). Without COF: about $21,728.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — bachelor's-completion program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE) — accreditation runs through June 30, 2028",
        source_url: "https://pueblocc.edu/programs/nur/bsn", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "front-range-rnbsn", institution: "front-range", credential: "rnbsn", open_entry: true,
        name: "RN-to-BSN Completion Program",
        length: "120 credits; can be completed in four full-time semesters (68 practicum hours).",
        format: "Online, with practicum coursework.",
        prerequisites: [],
        admission: { entrance_exam: null, selection: "three application periods per year", gpa: "Minimum 2.0 GPA in nursing courses", deadline: null,
          notes: "A nurse with an ADN and a current Colorado or compact RN license, or a current FRCC ADN student who has completed their first semester (provisionally admitted)." },
        cost: { amount: 357, basis: "$357 per credit net for Colorado residents ($461/credit in-state tuition less a $104/credit COF stipend).", year: null },
        nclex_pass_rate: { basis: "Not applicable — bachelor's-completion program.", by_campus: null, source_url: null },
        accreditation: "Sources disagree: FRCC's RN-to-BSN FAQ lists CCNE (shown through June 30, 2026, a window that has now passed), while FRCC's main nursing page lists ACEN. Confirm the current accreditor with the school.",
        source_url: "https://www.frontrange.edu/programs-courses/program-list/nursing-program/rn-to-bsn/index.html", last_verified: "2026-11-05", academic_year: null,
        notes: "Accreditation is stated inconsistently across FRCC's own pages — shown here as a conflict rather than picking one." },
      {
        id: "csu-pueblo-rnbsn", institution: "csu-pueblo", credential: "rnbsn", open_entry: true,
        name: "Registered Nurse to BSN (RN-BSN)",
        length: "120 total credits (30 nursing); about 1-2 years in 8-week terms.",
        format: "Online.",
        prerequisites: [],
        admission: { entrance_exam: null, selection: null, gpa: null, deadline: null,
          notes: "Open to licensed RNs, including associate-degree and diploma nurses. Explicitly admits students enrolled in a Colorado community college ADN program (who must pass the NCLEX-RN and be licensed to take the remaining BSN courses). Progression requires a B or better and a 3.0 nursing GPA." },
        cost: { amount: 440, basis: "$440 per credit hour, one rate regardless of residency.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — bachelor's-completion program.", by_campus: null, source_url: null },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN)",
        source_url: "https://www.csupueblo.edu/online/nursing/rn-to-bsn.html", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "uccs-rnbsn", institution: "uccs", credential: "rnbsn", open_entry: true,
        name: "Nursing, BSN: RN to BSN",
        length: "126 total credits (at least 30 taken at UCCS); about 1-1.5 years in 8-week courses.",
        format: "Online (delivered entirely online).",
        prerequisites: [],
        admission: { entrance_exam: null, selection: null, gpa: "Cumulative 2.5 GPA from all colleges attended", deadline: null,
          notes: "For students with an active, unrestricted RN license; a dual-enrollment option exists for current ADN students. General-education courses taken at a Colorado community college transfer." },
        cost: { amount: 367, basis: "$367 per credit hour, a fixed rate that also includes course fees (year not stated on the page).", year: null },
        nclex_pass_rate: { basis: "Not applicable — bachelor's-completion program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://johnsonbethel.uccs.edu/academics/programs/rn-to-bsn-and-dual-enrollment-option", last_verified: "2026-11-05", academic_year: null, notes: "" },
      {
        id: "msu-denver-rnbsn", institution: "msu-denver", credential: "rnbsn", open_entry: true,
        name: "Online RN to BSN (BRNCO)",
        length: "As few as 2 semesters, up to 6. Total credits not published on the pages we could open (accepts up to 80 transfer credits).",
        format: "100% online and asynchronous — no required live login times or campus visits.",
        prerequisites: [],
        admission: { entrance_exam: null, selection: null, gpa: null, deadline: null,
          notes: "For licensed registered nurses and students dual-enrolled in an ADN program; upper-division credit is given for holding an active RN license. Whether Colorado community college / CCCS graduates are named specifically wasn't stated." },
        cost: { amount: 326.25, basis: "Colorado residents with COF about $326.25/credit; out-of-state (WUE/RIT) about $663.40/credit. Planning estimates, subject to change.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — bachelor's-completion program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://www.msudenver.edu/online/rn-bsn/", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },

      // ================= Graduate / advanced-practice programs (open to any accredited BSN + RN) =================
      {
        id: "cu-anschutz-fnp", institution: "cu-anschutz", credential: "fnp", open_entry: true,
        name: "BS-to-DNP — Family Nurse Practitioner",
        length: "About 3 years (9 semesters). 56 lecture ('didactic') credits plus 1,000+ clinical hours. Earns a master's and then the DNP.",
        format: "Mostly online, with limited on-campus requirements at the Anschutz Medical Campus in Aurora.",
        prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 degree GPA (a GRE score or graduate credits accepted if below 3.0)", deadline: "Fall entry: applications open Aug 15, priority deadline Jan 15.",
          notes: "Requires a Bachelor of Science in Nursing from a regionally accredited institution with CCNE or ACEN program accreditation, and an active, unrestricted U.S. RN license. Offered as BS-to-DNP (and as an MS)." },
        cost: { amount: null, basis: "Estimated total tuition $67,240 (Colorado resident) or $109,060 (non-resident), 2026-27, excluding fees, a one-time $140 matriculation fee and ~$2,000 books/supplies. CU's per-credit graduate tuition is $820 (resident/WRGP) / $1,330 (non-resident).", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate (nurse practitioner) program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE) — covers CU's baccalaureate, master's, DNP and post-graduate APRN certificate",
        source_url: "https://nursing.cuanschutz.edu/academics/graduate-programs/bs-dnp/fnp", last_verified: "2026-11-05", academic_year: "2026-27",
        notes: "Admission facts from CU's BS-DNP admission-requirements pages; CCNE statement from CU's student handbook (program pages themselves cite only the Higher Learning Commission)." },
      {
        id: "cu-anschutz-agacnp", institution: "cu-anschutz", credential: "agacnp", open_entry: true,
        name: "BS-to-DNP — Adult-Gerontology Acute Care NP",
        length: "About 3 years (9 semesters); 47 classroom credits plus 1,000+ clinical hours.",
        format: "Graduate program at the Anschutz Medical Campus, Aurora; delivery varies by specialty (confirm with CU).",
        prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 degree GPA (GRE or graduate credits accepted if below 3.0)", deadline: null,
          notes: "Requires a BSN and an active, unrestricted U.S. RN license (shared BS-to-DNP requirements). Offered as BS-to-DNP and MS." },
        cost: { amount: null, basis: "Per-credit graduate tuition 2026-27: $820 resident/WRGP, $1,330 non-resident (tuition only); 47 classroom credits. See CU's tuition page for a full estimate.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate (nurse practitioner) program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.cuanschutz.edu/degrees-programs/graduate-programs/bs-dnp/ag-acnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "cu-anschutz-agpcnp", institution: "cu-anschutz", credential: "agpcnp", open_entry: true,
        name: "BS-to-DNP — Adult-Gerontology Primary Care NP",
        length: null,
        format: "Graduate program at the Anschutz Medical Campus, Aurora; delivery varies by specialty (confirm with CU).",
        prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 degree GPA (GRE or graduate credits accepted if below 3.0)", deadline: null,
          notes: "Requires a BSN and an active, unrestricted U.S. RN license (shared BS-to-DNP requirements). Offered as BS-to-DNP and MS. Credit count not confirmed here." },
        cost: { amount: null, basis: "Per-credit graduate tuition 2026-27: $820 resident/WRGP, $1,330 non-resident (tuition only). See CU's tuition page for a full estimate.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate (nurse practitioner) program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.cuanschutz.edu/degrees-programs/graduate-programs/bs-dnp/ag-pcnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "cu-anschutz-pmhnp", institution: "cu-anschutz", credential: "pmhnp", open_entry: true,
        name: "BS-to-DNP — Psychiatric Mental Health NP",
        length: "About 3 years (9 semesters); 52 classroom credits plus 1,000+ clinical hours.",
        format: "Graduate program at the Anschutz Medical Campus, Aurora; delivery varies by specialty (confirm with CU).",
        prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 degree GPA (GRE or graduate credits accepted if below 3.0)", deadline: null,
          notes: "Requires a BSN and an active, unrestricted U.S. RN license (shared BS-to-DNP requirements). Offered as BS-to-DNP and MS." },
        cost: { amount: null, basis: "Per-credit graduate tuition 2026-27: $820 resident/WRGP, $1,330 non-resident (tuition only); 52 classroom credits. See CU's tuition page for a full estimate.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate (nurse practitioner) program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.cuanschutz.edu/degrees-programs/graduate-programs/bs-dnp/pmhnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "cu-anschutz-whnp", institution: "cu-anschutz", credential: "whnp", open_entry: true,
        name: "BS-to-DNP — Women's Health NP",
        length: null,
        format: "Graduate program at the Anschutz Medical Campus, Aurora; delivery varies by specialty (confirm with CU).",
        prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 degree GPA (GRE or graduate credits accepted if below 3.0)", deadline: null,
          notes: "Requires a BSN and an active, unrestricted U.S. RN license (shared BS-to-DNP requirements). Offered as BS-to-DNP and MS. Credit count not confirmed here." },
        cost: { amount: null, basis: "Per-credit graduate tuition 2026-27: $820 resident/WRGP, $1,330 non-resident (tuition only). See CU's tuition page for a full estimate.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate (nurse practitioner) program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.cuanschutz.edu/degrees-programs/graduate-programs/bs-dnp/whnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "cu-anschutz-pnp", institution: "cu-anschutz", credential: "pnp", open_entry: true,
        name: "BS-to-DNP — Pediatric NP (Primary Care and Acute Care tracks)",
        length: null,
        format: "Graduate program at the Anschutz Medical Campus, Aurora; delivery varies by specialty (confirm with CU).",
        prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 degree GPA (GRE or graduate credits accepted if below 3.0)", deadline: null,
          notes: "Requires a BSN and an active, unrestricted U.S. RN license (shared BS-to-DNP requirements). CU offers both Primary Care and Acute Care pediatric tracks. Credit count not confirmed here." },
        cost: { amount: null, basis: "Per-credit graduate tuition 2026-27: $820 resident/WRGP, $1,330 non-resident (tuition only). See CU's tuition page for a full estimate.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate (nurse practitioner) program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.cuanschutz.edu/degrees-programs/graduate-programs/bs-dnp/pnp-pc", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "cu-anschutz-cns", institution: "cu-anschutz", credential: "cns", open_entry: true,
        name: "BS-to-DNP — Adult-Gerontology Clinical Nurse Specialist",
        length: null,
        format: "Graduate program at the Anschutz Medical Campus, Aurora; delivery varies by specialty (confirm with CU).",
        prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 degree GPA (GRE or graduate credits accepted if below 3.0)", deadline: null,
          notes: "Requires a BSN and an active, unrestricted U.S. RN license (shared BS-to-DNP requirements). Note: CU's admissions page currently lists this Adult-Gerontology CNS track as paused for both Fall 2027 and Spring 2027 (across the MS, BS-to-DNP and Post-Graduate Certificate options). Confirm with the College of Nursing whether and when it reopens before planning around it." },
        cost: { amount: null, basis: "Per-credit graduate tuition 2026-27: $820 resident/WRGP, $1,330 non-resident (tuition only). See CU's tuition page for a full estimate.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.cuanschutz.edu/admissions", last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "cu-anschutz-cnm", institution: "cu-anschutz", credential: "cnm", open_entry: true,
        name: "BSN-to-DNP — Nurse-Midwifery",
        length: "About 3 years (9 semesters); 59 credit hours plus 1,000+ clinical hours.",
        format: "Graduate program at the Anschutz Medical Campus, Aurora; delivery varies by specialty (confirm with CU).",
        prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 degree GPA (GRE or graduate credits accepted if below 3.0)", deadline: null,
          notes: "Requires a BSN and an active, unrestricted U.S. RN license (shared BS-to-DNP requirements). Graduates can sit for the Certified Nurse-Midwife (CNM) exam. Offered as BS-to-DNP and MS." },
        cost: { amount: null, basis: "Per-credit graduate tuition 2026-27: $820 resident/WRGP, $1,330 non-resident (tuition only); 59 credit hours. See CU's tuition page for a full estimate.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE) and the Accreditation Commission for Midwifery Education (ACME)",
        source_url: "https://nursing.cuanschutz.edu/degrees-programs/graduate-programs/bs-dnp/midwifery", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "unco-fnp", institution: "unco", credential: "fnp", open_entry: true,
        name: "DNP — Family Nurse Practitioner",
        length: null,
        format: "Greeley / Loveland plus online (Extended Campus cohort).",
        prerequisites: [],
        admission: { entrance_exam: null, selection: null, gpa: null, deadline: null,
          notes: "A BSN and an active RN license are required; GPA, total credits and other details are not confirmed here — check with UNC's program admissions." },
        cost: { amount: 802, basis: "$802 per credit, a flat rate for all students with no separate student or technology fees (some courses may have course fees). Total depends on the number of credits.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate (nurse practitioner) program.", by_campus: null, source_url: null },
        accreditation: null,
        source_url: "https://extended.unco.edu/current-students/graduate/nursing-dnp-fnp-noco-ol-c14/", last_verified: "2026-11-05", academic_year: "2026-27",
        notes: "A second FNP option. Accreditation, GPA and total credits aren't confirmed from a primary source — shown as 'Check with the school'." },
      {
        id: "rocky-vista-crna", institution: "rocky-vista", credential: "crna", open_entry: true,
        name: "Doctor of Nurse Anesthesia Practice (DNAP)",
        length: null,
        format: "Rocky Vista University's Colorado Campus (Englewood / Parker).",
        prerequisites: [],
        admission: { entrance_exam: null, selection: "highly competitive", gpa: null, deadline: null,
          notes: "Rocky Vista is a private university. Nurse-anesthesia programs generally require a BSN, an active RN license and critical-care (ICU) experience; confirm current requirements with the school. Details beyond accreditation and location aren't gathered here." },
        cost: { amount: null, basis: "Not gathered here — check with the school.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a doctoral nurse-anesthesia program.", by_campus: null, source_url: null },
        accreditation: "Council on Accreditation of Nurse Anesthesia Educational Programs (COA)",
        source_url: "https://www.rvu.edu/doctor-nurse-anesthesia-practice/", last_verified: "2026-11-05", academic_year: null,
        notes: "The only Colorado nurse-anesthesia program we've verified. Included so this path reaches a real program; most fields still need confirmation with the school." },

      // ---- Arapahoe Community College: ADN + its own RN-to-BSN ----
      {
        id: "arapahoe-adn", institution: "arapahoe", credential: "adn",
        name: "Nursing AAS (RN)",
        length: "5-semester plan (the first semester is completed before admission)",
        format: "In person; Littleton campus",
        prerequisites: [
          { course: "English Composition", code: "ENG 1021", min_grade: "C" },
          { course: "Human Growth and Development", code: "PSY 2440", min_grade: "C" },
          { course: "Human Anatomy and Physiology I", code: "BIO 2101", min_grade: "C" },
          { course: "Dietary Nutrition (or HWE 1050 Human Nutrition)", code: "HPR 1010", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "HESI A2 (at least 70% English Composite and 70% Math)",
          selection: "competitive points (max 80; ties broken by random selection)",
          gpa: "Minimum combined 3.0 GPA on prerequisites",
          deadline: "Spring applications Nov 6-20, 2026; Fall applications open Apr 5-17, 2027 (dates stated inconsistently on ACC's page — confirm)",
          notes: "Requires a CNA license and an info session. Co-requisites BIO 2102, BIO 2104, BIO 2116 are also reviewed. An LPN-to-ADN bridge exists."
        },
        cost: { amount: null, basis: "No single program figure is published. Per-credit nursing tuition (2026-27, excluding fees): resident on-campus $392.40, resident online $503.95, non-resident on-campus $754.25. Nursing course fees apply (e.g. HESI testing $312.25).", year: "2026-27" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (ADN program page)",
          by_campus: { "AAS/ADN": [{ year: 2025, rate: 0.8876 }, { year: 2024, rate: 0.9634 }, { year: 2023, rate: 1.00 }] },
          source_url: "https://www.arapahoe.edu/nursing/nursing-aas-rn"
        },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Colorado State Board of Nursing",
        source_url: "https://www.arapahoe.edu/nursing/nursing-aas-rn",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: ""
      },
      {
        id: "arapahoe-rnbsn", institution: "arapahoe", credential: "rnbsn", open_entry: true,
        name: "RN-BSN Completion Program",
        length: "120 total credits (48.5 upper-division completion credits)",
        format: "Online.",
        prerequisites: [],
        admission: { entrance_exam: null, selection: null, gpa: null, deadline: "Fall June 30, Spring Oct 15, Summer Apr 1",
          notes: "Requires an active, unencumbered U.S. RN license. ACC Nursing AAS students can dual-enroll and start BSN coursework online." },
        cost: { amount: 535.50, basis: "$535.50 per credit (resident, on-campus, 2026-27); non-resident on-campus $532.15.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — bachelor's-completion program.", by_campus: null, source_url: null },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN). ACC's pages state the accreditation decision inconsistently (Initial vs Continuing) — confirm with the school.",
        source_url: "https://www.arapahoe.edu/nursing/rn-bsn-completion-program", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },

      // ---- Pre-licensure BSN / Accelerated BSN (entry-level ways in, no prior RN needed) ----
      {
        id: "msu-denver-bsn", institution: "msu-denver", credential: "bsn",
        name: "Traditional Nursing Option (pre-licensure BSN)",
        length: "4-term program (no summer courses)",
        format: "On campus, Denver. Fall and spring cohorts.",
        prerequisites: [
          { course: "Anatomy & Physiology I (w/ lab)", code: "BIO 2310", min_grade: "C" },
          { course: "Anatomy & Physiology II (w/ lab)", code: "BIO 2320", min_grade: "C" },
          { course: "Microbiology for Nursing (w/ lab)", code: "BIO 2000", min_grade: "C" },
          { course: "Clinical Pathophysiology", code: "PUB 4600", min_grade: "C" },
          { course: "Introduction to Nutrition", code: "NUT 2040", min_grade: "C" },
          { course: "Psychology of Human Development", code: "PSY 2210", min_grade: "C" },
          { course: "Introduction to Statistics", code: "MTH 1210", min_grade: "C" },
          { course: "Principles of Chemistry with Lab", code: "CHE 1100/1150", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "Casper Assessment ($70) — not TEAS or HESI",
          selection: "competitive 10-point scale (prereq GPA, Casper, MSU Denver credits); admitted students average ~3.5 prereq GPA",
          gpa: "2.75 cumulative GPA in the prerequisite courses (2.74 or below is ineligible)",
          deadline: "Fall 2027: opens Dec 1, 2026, closes Feb 15, 2027",
          notes: "For students pursuing a first or second bachelor's. The nursing application is free."
        },
        cost: { amount: null, basis: "Estimated total program tuition/fees about $42,206 (for non-residents and residents who have used their COF). A residents-with-COF total on the page appears to be a typo. No academic year attached.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, Traditional option",
          by_campus: { "Traditional (TNO)": [{ year: 2025, rate: 0.97 }, { year: 2024, rate: 1.00 }, { year: 2023, rate: 0.96 }, { year: 2022, rate: 0.96 }] },
          source_url: "https://www.msudenver.edu/nursing/prospective-students"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://www.msudenver.edu/nursing/traditional-and-accelerated-nursing-options/",
        last_verified: "2026-11-05", academic_year: null, notes: "" },
      {
        id: "msu-denver-absn", institution: "msu-denver", credential: "absn",
        name: "Accelerated Nursing Option (pre-licensure BSN)",
        length: "4-term continuous program including summer courses",
        format: "On campus, Denver.",
        prerequisites: [
          { course: "Anatomy & Physiology I (w/ lab)", code: "BIO 2310", min_grade: "C" },
          { course: "Anatomy & Physiology II (w/ lab)", code: "BIO 2320", min_grade: "C" },
          { course: "Microbiology for Nursing (w/ lab)", code: "BIO 2000", min_grade: "C" },
          { course: "Clinical Pathophysiology", code: "PUB 4600", min_grade: "C" },
          { course: "Introduction to Nutrition", code: "NUT 2040", min_grade: "C" },
          { course: "Psychology of Human Development", code: "PSY 2210", min_grade: "C" },
          { course: "Introduction to Statistics", code: "MTH 1210", min_grade: "C" },
          { course: "Principles of Chemistry with Lab", code: "CHE 1100/1150", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "Casper Assessment ($70) — not TEAS or HESI",
          selection: "competitive 10-point scale (as for the Traditional option)",
          gpa: "2.75 cumulative GPA in the prerequisite courses",
          deadline: "Fall 2027: opens Dec 1, 2026, closes Feb 15, 2027 (ANO moves to fall-start cohorts from Fall 2027)",
          notes: "Requires a previous bachelor's degree; general-studies requirements are satisfied by that prior degree."
        },
        cost: { amount: null, basis: "Estimated total program tuition/fees about $42,206 (non-residents and residents who have used COF); the residents-with-COF figure on the page appears to be a typo. No academic year attached.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, Accelerated option",
          by_campus: { "Accelerated (ANO)": [{ year: 2025, rate: 0.90 }, { year: 2024, rate: 0.92 }, { year: 2023, rate: 1.00 }, { year: 2022, rate: 0.93 }] },
          source_url: "https://www.msudenver.edu/nursing/prospective-students"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://www.msudenver.edu/nursing/traditional-and-accelerated-nursing-options/",
        last_verified: "2026-11-05", academic_year: null, notes: "" },
      {
        id: "colorado-mesa-bsn", institution: "colorado-mesa", credential: "bsn",
        name: "Traditional BSN (pre-licensure)",
        length: "Four-year degree; the nursing portion is 4 semesters after admission (120-121 total credits)",
        format: "On campus, Grand Junction; daytime classes with some evening/weekend clinicals.",
        prerequisites: [
          { course: "Human Anatomy & Physiology I + lab", code: "BIOL 209/209L", min_grade: "C" },
          { course: "Human Anatomy & Physiology II + lab", code: "BIOL 210/210L", min_grade: "C" },
          { course: "Pathophysiology", code: "BIOL 241", min_grade: "C" },
          { course: "Introduction to Microbiology + lab", code: "BIOL 250/250L", min_grade: "C" },
          { course: "Statistics", code: "STAT 200 or 215", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None (no TEAS/HESI on the official pages)",
          selection: "holistic, points-based (prereq GPA 65 pts + interview 30 pts); up to 50 seats twice a year",
          gpa: "Minimum 3.0 GPA in the prerequisite courses",
          deadline: "Jan 15 and Aug 15 (11:59 PM MST)",
          notes: "Upper-division / competitive secondary admission: enter as Pre-BSN, finish lower-division prerequisites (within 10 years), then apply separately. Top scorers are interviewed."
        },
        cost: { amount: null, basis: "Nursing-specific tuition isn't published on the program pages (they direct to Student Accounts). The BSN info packet lists books ~$2,074, lab fees ~$987 and incidentals $3,386-$7,586.", year: "2026-27" },
        nclex_pass_rate: { basis: "The college's page states about 90% of traditional BSN graduates pass the NCLEX on the first try, but gives no year (self-reported).", by_campus: null, source_url: "https://www.coloradomesa.edu/health-sciences/undergraduate/nursing/rn-bsn.html" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://catalog.coloradomesa.edu/areas-study/nursing/nursing-bsn/",
        last_verified: "2026-11-05", academic_year: "2026-27",
        notes: "An explicit Colorado State Board of Nursing approval statement wasn't found verbatim. CMU also offers an associate RN degree at its Montrose campus (not listed here yet)." },
      {
        id: "regis-bsn", institution: "regis", credential: "bsn",
        name: "Traditional BSN (pre-licensure)",
        length: "Four-year degree (two years pre-nursing + two years nursing); 120 credits; 756 clinical hours",
        format: "On campus, Denver, with weekday clinicals across the Front Range.",
        prerequisites: [],
        admission: {
          entrance_exam: "None stated",
          selection: null, gpa: null,
          deadline: "High-school applicants rolling (Early Action Oct 15, First-Year Jan 1); transfer (BSN major) opens Sept 15, deadline Feb 1, starts in June",
          notes: "A private Jesuit university. High-school students can enter a pre-nursing track with a guaranteed BSN seat if guidelines are met by the end of sophomore year. Regis doesn't publish a specific prerequisite course list for the traditional BSN — pre-nursing requirements total 58 credit hours, completed before the nursing major; see Regis's BSN application-requirements page."
        },
        cost: { amount: 48490, basis: "$48,490 for the 2026-27 academic year ($24,245 per semester).", year: "2026-27" },
        nclex_pass_rate: { basis: "No current pass rate published on the program page (the nursing hub shows a 99.2% figure for accelerated students, 2018-19).", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://www.regis.edu/academics/majors-and-programs/undergraduate/nursing-bsn",
        last_verified: "2026-11-06", academic_year: "2026-27",
        notes: "A Colorado State Board of Nursing approval statement wasn't found on Regis's pages." },
      {
        id: "regis-absn", institution: "regis", credential: "absn",
        name: "Accelerated BSN (second-degree, pre-licensure)",
        length: "One year (12 months), three semesters",
        format: "On campus, Denver, Monday-Friday; clinicals across the Denver metro.",
        prerequisites: [
          { course: "Human Anatomy (or A&P I) + lab", code: null, min_grade: "C-" },
          { course: "Human Physiology (or A&P II) + lab", code: null, min_grade: "C-" },
          { course: "Microbiology + lab", code: null, min_grade: "C-" },
          { course: "Chemistry + lab", code: null, min_grade: "C-" },
          { course: "Health Care Ethics (Regis HCE 430 or an approved transfer equivalent)", code: "HCE 430", min_grade: "C-" },
          { course: "Religious Studies (from a religious-studies or philosophy department)", code: null, min_grade: "C-" }
        ],
        admission: {
          entrance_exam: "None — standardized exams are not reviewed",
          selection: "application via NursingCAS",
          gpa: "Minimum 2.75 cumulative GPA",
          deadline: "January start: deadline June 15; May start: deadline Dec 1 (dates render inconsistently on the page — confirm)",
          notes: "For students with a previous non-nursing bachelor's or higher degree. All prerequisites must be C- or better; the four sciences carry labs and must be within the last 10 years, with 3 of the 4 done by the application deadline and all four before the program starts."
        },
        cost: { amount: null, basis: "$599 per credit (2026 and 2027). 120 total credits, 64 completed at Regis.", year: "2026" },
        nclex_pass_rate: { basis: "99.2% first-time pass rate for accelerated students (2018-19); more recent figures aren't published on the program page.", by_campus: null, source_url: "https://explore.regis.edu/nursing" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://www.regis.edu/academics/majors-and-programs/undergraduate/nursing-bsn-accelerated",
        last_verified: "2026-11-06", academic_year: "2026",
        notes: "A Colorado State Board of Nursing approval statement wasn't found on Regis's pages." },

      // ---- University pre-licensure BSN / Accelerated BSN / Direct-entry MSN (board-verified pass rates) ----
      {
        id: "cu-anschutz-bsn", institution: "cu-anschutz", credential: "bsn",
        name: "Traditional BSN (pre-licensure)",
        length: "2 years (6 semesters), starting every June",
        format: "In person; most classes at the Anschutz Medical Campus, Aurora (some at Lone Tree).",
        prerequisites: [
          { course: "Human Anatomy (or A&P I)", code: null, min_grade: "C" },
          { course: "Human Physiology (or A&P II)", code: null, min_grade: "C" },
          { course: "Microbiology", code: null, min_grade: "C" },
          { course: "Statistics", code: null, min_grade: "C" },
          { course: "General Chemistry", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None (holistic review; includes an Interview Day and writing sample)",
          selection: "highly competitive, holistic",
          gpa: "3.0 (in the 60 prerequisite credits, or in the five sciences if you already hold a bachelor's)",
          deadline: "Applications open Aug 15, priority Nov 15, for a Summer start",
          notes: "Open to students with or without a prior bachelor's; those without one first complete 60 prerequisite credits. Prerequisites within 10 years; three references required."
        },
        cost: { amount: null, basis: "Estimated total tuition (2026-27): CO residents $40,854; residents with COF stipend $33,198; eligible Western-state residents $61,248; non-residents $71,676. Excludes fees, a $140 matriculation fee, and prerequisite coursework.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "Traditional": [{ year: 2025, rate: 0.9354 }, { year: "8-qtr", rate: 0.93 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://nursing.cuanschutz.edu/degrees-programs/undergraduate/trad",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "cu-anschutz-absn", institution: "cu-anschutz", credential: "absn",
        name: "Accelerated BSN (UCAN, second-degree)",
        length: "1 year (3 semesters)",
        format: "In person; most classes at the Legacy Campus, Lone Tree (some at Aurora).",
        prerequisites: [
          { course: "Human Anatomy (or A&P I)", code: null, min_grade: "C" },
          { course: "Human Physiology (or A&P II)", code: null, min_grade: "C" },
          { course: "Microbiology", code: null, min_grade: "C" },
          { course: "Statistics", code: null, min_grade: "C" },
          { course: "General Chemistry", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None (holistic; Interview Day)",
          selection: "CU's most competitive undergraduate pathway",
          gpa: "3.0 prerequisite GPA (overall 3.0 strongly suggested)",
          deadline: "Spring start: opens Mar 1, priority Jun 15. Fall start: opens Sep 1, priority Jan 15.",
          notes: "Requires a bachelor's degree earned before the program starts. Prerequisites within 10 years; healthcare experience advised (the page gives an inconsistent 400-700 hours — confirm)."
        },
        cost: { amount: null, basis: "Estimated total tuition (2026-27), same as the Traditional path: CO residents $40,854; residents with COF $33,198; Western-state $61,248; non-residents $71,676. Excludes fees and prerequisites.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "Accelerated": [{ year: 2025, rate: 0.9851 }, { year: "8-qtr", rate: 0.99 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://nursing.cuanschutz.edu/degrees-programs/undergraduate/ucan",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "uccs-bsn", institution: "uccs", credential: "bsn",
        name: "Traditional BSN (pre-licensure)",
        length: "Four-year option; 127 total credits",
        format: "In person, Colorado Springs. Admits Colorado residents / intended residents.",
        prerequisites: [
          { course: "Human Anatomy", code: "HPNU 3050", min_grade: "C" },
          { course: "Human Physiology", code: "HPNU 3060", min_grade: "C" },
          { course: "Microbiology (lecture & lab)", code: "BIOL 2030/2130", min_grade: "C" },
          { course: "Pathophysiology", code: "NURS 3010", min_grade: "C" },
          { course: "Statistics for Nurses", code: "NURS 2060", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS Pre-Admission Assessment",
          selection: "competitive (two application opportunities)",
          gpa: "Prerequisite GPA 3.0 or higher at the end of the application semester",
          deadline: "Fall cycle Jan 1 - Mar 1; Spring cycle Sep 1 - Nov 1",
          notes: "Open to students with or without a prior degree. General-ed courses need C-; HPNU/NURS courses need C."
        },
        cost: { amount: 598, basis: "On-campus nursing tuition (Fall 2026): $598/credit resident (a $116/credit COF stipend applies), $1,107/credit non-resident, plus a $14/credit nursing course fee. No single program total is published.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "Traditional": [{ year: 2025, rate: 0.93 }, { year: "8-qtr", rate: 0.96 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://johnsonbethel.uccs.edu/academics/nursing/bsn",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "uccs-absn", institution: "uccs", credential: "absn",
        name: "Accelerated BSN",
        length: "16 months, full-time; 68 total credits; summer start",
        format: "In person, Colorado Springs.",
        prerequisites: [
          { course: "Human Anatomy", code: "HPNU 3050", min_grade: "C" },
          { course: "Human Physiology", code: "HPNU 3060", min_grade: "C" },
          { course: "Microbiology (lecture & lab)", code: "BIOL 2030/2130", min_grade: "C" },
          { course: "Pathophysiology", code: "NURS 3010", min_grade: "C" },
          { course: "Statistics for Nurses", code: "NURS 2060", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS Pre-Admission Exam",
          selection: "competitive (competitive scores required)",
          gpa: "Pathway One (prior bachelor's) 3.0; Pathway Two (59+ credits) 3.25 prerequisite GPA",
          deadline: "Applications accepted Jul 10 - Jan 10; decisions early February",
          notes: "Pathway One is for students with a bachelor's in another field; Pathway Two needs 59+ undergraduate credits including the prerequisites. A&P must be C or better."
        },
        cost: { amount: 598, basis: "On-campus nursing tuition (Fall 2026): $598/credit resident, $1,107/credit non-resident, plus a $14/credit nursing fee. Accelerated — the tuition calculator doesn't apply; no single total published.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "Accelerated": [{ year: 2025, rate: 0.85 }, { year: "8-qtr", rate: 0.92 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://johnsonbethel.uccs.edu/academics/nursing/accelerated-bsn",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "unco-bsn", institution: "unco", credential: "bsn",
        name: "Traditional BSN (pre-licensure)",
        length: "9 semesters; 120 total credits",
        format: "In person, Greeley.",
        prerequisites: [
          { course: "Intro to Human Anatomy & Physiology", code: "BIO 245", min_grade: "C-" },
          { course: "Advanced Human Anatomy & Physiology", code: "BIO 246", min_grade: "C-" },
          { course: "Allied Health Microbiology", code: "BIO 251", min_grade: "C-" },
          { course: "Pathophysiology", code: "NURS 326", min_grade: "C-" },
          { course: "Introduction to Statistical Analysis", code: "STAT 150", min_grade: "C-" }
        ],
        admission: {
          entrance_exam: "HESI (averaged across 4 categories; no minimum score)",
          selection: "competitive, weighted (GPA 50%, HESI 20%, Casper 10%, references 10%, UNC credits 10%); ~50% acceptance",
          gpa: "Minimum cumulative 3.0 (open-admission route)",
          deadline: "Open-admission cycles: spring start applies Jul-Sep; fall start applies Nov-Jan (exact dates in UNC's cycle calendar)",
          notes: "Upper-division: students complete prerequisites, then apply competitively to the Clinical Phase. Up to 4 prerequisites may be in progress at application."
        },
        cost: { amount: null, basis: "In-state undergraduate tuition about $4,869.75 per semester for 15 credits after the COF stipend (2026-27); non-resident about $13,047. Nursing carries additional program/differential fees not published as a single figure.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "BSN": [{ year: 2025, rate: 0.893 }, { year: "8-qtr", rate: 0.85 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://www.unco.edu/nhs/nursing/bachelor-science-nursing/",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "unco-absn", institution: "unco", credential: "absn",
        name: "Second-Degree (Accelerated) BSN",
        length: "20 months (5 consecutive semesters); summer start",
        format: "UNC describes this track inconsistently — 'fully online' on one page and 'primarily on the Greeley campus' on another. Confirm with UNC.",
        prerequisites: [],
        admission: {
          entrance_exam: "HESI (as for the traditional BSN)",
          selection: "competitive",
          gpa: "See the traditional BSN (not separately published here)",
          deadline: "Second-degree summer start: apply Nov-Jan",
          notes: "For students who already hold a bachelor's degree. UNC doesn't publish a separate prerequisite course list for this second-degree track (it directs applicants to its Pre-Clinical Nursing page); see the traditional BSN above for UNC's nursing prerequisites and confirm with UNC which apply."
        },
        cost: { amount: null, basis: "Charged at UNC's undergraduate tuition plus nursing fees; a single program total isn't published. See the traditional BSN figures.", year: "2026-27" },
        nclex_pass_rate: { basis: "The Colorado Board lists UNC's BSN pass rate once (see the traditional BSN); a separate figure for the second-degree track isn't broken out.", by_campus: null, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://www.unco.edu/nhs/nursing/bachelor-science-nursing/",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "Delivery format is stated inconsistently across UNC's pages — flagged rather than guessed." },
      {
        id: "csu-pueblo-bsn", institution: "csu-pueblo", credential: "bsn",
        name: "Basic BSN (traditional pre-licensure)",
        length: "About 120 credits; 4-year degree with the nursing portion in the final two years",
        format: "In person + online; Pueblo campus. Starts in January.",
        prerequisites: [
          { course: "Human Physiology & Anatomy I (+lab)", code: "BIOL 223/223L", min_grade: "C" },
          { course: "Human Physiology & Anatomy II (+lab)", code: "BIOL 224/224L", min_grade: "C" },
          { course: "Microbiology (+lab)", code: "BIOL 206/206L", min_grade: "C" },
          { course: "Principles of Chemistry (+lab)", code: "CHEM 111/111L", min_grade: "C" },
          { course: "Introduction to Statistics", code: "MATH 156", min_grade: "C" },
          { course: "Nursing Pathophysiology", code: "NSG 207", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None (no TEAS/HESI; ACT/SAT only for direct-from-high-school freshmen)",
          selection: "very competitive; by admission score (prerequisite/gen-ed GPA and holistic factors)",
          gpa: "Minimum 3.00 on required general-education and prerequisite courses (no C- accepted)",
          deadline: "May 25 each year",
          notes: "Basic Admission Pathway (no prior degree); applicants complete about half the prerequisites first. ~90 students admitted per year."
        },
        cost: { amount: null, basis: "No per-credit or total tuition figure is published for the on-campus pre-licensure BSN; the nursing pages link to the general Tuition & Fees page. (The $440/credit online rate applies to the RN-to-BSN, not this program.)", year: null },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "Basic BSN": [{ year: 2025, rate: 0.81 }, { year: "8-qtr", rate: 0.80 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Colorado State Board of Nursing",
        source_url: "https://catalog.csupueblo.edu/school-of-nursing/nursing-bsn/",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "csu-pueblo-absn", institution: "csu-pueblo", credential: "absn",
        name: "Degree-Plus Accelerated BSN (second-degree)",
        length: "14 months; starts in May",
        format: "Classroom, internet and clinical; Pueblo School of Nursing.",
        prerequisites: [
          { course: "Anatomy & Physiology I & II (+labs)", code: "BIOL 223/224", min_grade: "C" },
          { course: "Microbiology (+lab)", code: "BIOL 206", min_grade: "C" },
          { course: "Chemistry (+lab)", code: "CHEM 111", min_grade: "C" },
          { course: "Statistics", code: "MATH 156", min_grade: "C" },
          { course: "Pathophysiology", code: "NSG 207", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None (no TEAS/HESI)",
          selection: "very competitive; by admission score",
          gpa: "3.0 prerequisite GPA (no C- accepted)",
          deadline: "October 1 of the year before the May start",
          notes: "Requires a previous non-nursing bachelor's degree; about half the prerequisites completed before applying. ~40 students/year."
        },
        cost: { amount: null, basis: "No per-credit or total tuition figure is published for the on-campus accelerated BSN; the nursing pages link to the general Tuition & Fees page.", year: null },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "Accelerated": [{ year: 2025, rate: 0.86 }, { year: "8-qtr", rate: 0.87 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Colorado State Board of Nursing",
        source_url: "https://www.csupueblo.edu/nursing-bs/pathways.html",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "csu-pueblo-demsn", institution: "csu-pueblo", credential: "demsn",
        name: "3+2 Direct-Entry MSN (Nursing Leadership)",
        length: "5 years (bachelor's + master's together); 169 total credits",
        format: "Fort Collins campus (pre-nursing at CSU Fort Collins) in partnership with CSU Pueblo's School of Nursing.",
        prerequisites: [
          { course: "Physiology", code: "BMS 300 / HES 300", min_grade: "C" },
          { course: "Human Gross Anatomy", code: "BMS 301", min_grade: "C" },
          { course: "Microbial Biology (+lab)", code: "LIFE 205/206", min_grade: "C" },
          { course: "Pathophysiology", code: "HES 390", min_grade: "C" },
          { course: "Statistics", code: "STAT 201/301", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None (no TEAS/HESI)",
          selection: "competitive",
          gpa: "Progression requires a 3.0 GPA (a specific admission cutoff isn't published)",
          deadline: "January 1",
          notes: "Direct entry (no prior nursing). Only open to students transferring into it from CSU Fort Collins' Pre-Nursing program. Graduates sit for the NCLEX-RN and finish with a master's. (The only Direct-Entry MSN approved in Colorado.)"
        },
        cost: { amount: null, basis: "Not published on the program/catalog pages.", year: null },
        nclex_pass_rate: { basis: "Not separately listed on the Colorado Board's approved-programs list for this entry-level master's.", by_campus: null, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Part of CSU Pueblo's ACEN-accredited, Colorado Board-approved School of Nursing",
        source_url: "https://catalog.csupueblo.edu/school-of-nursing/nursing-3-2-direct-entry-nursing-leadership-concentration-ms/",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "adams-state-bsn", institution: "adams-state", credential: "bsn",
        name: "Bachelor of Science in Nursing (pre-licensure)",
        length: "4 years (8 semesters); about 126 credits",
        format: "In person, Alamosa. Clinical rotations require travel (can be 140+ miles from campus).",
        prerequisites: [
          { course: "Anatomy & Physiology I (+lab)", code: "BIOL 205", min_grade: "C" },
          { course: "Anatomy & Physiology II (+lab)", code: "BIOL 206", min_grade: "C" },
          { course: "Microbiology for Non-Majors (+lab)", code: "BIOL 215", min_grade: "C" },
          { course: "Introductory Chemistry (+lab)", code: "CHEM 111/111L", min_grade: "C" },
          { course: "Introduction to Statistics (w/lab)", code: "PSYC 211", min_grade: "C" },
          { course: "Lifespan Development for Nurses", code: "PSYC 233", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None (portfolio: short answers, a 2-page essay, resume, references)",
          selection: "competitive packet review",
          gpa: "3.0 recommended (no hard minimum stated); C or better in prerequisites",
          deadline: "Early admission Jan 1 - Apr 30; regular May 1 - Jul 15",
          notes: "Enter as a Pre-nursing major, then apply to the nursing department after prerequisites. Transfer students accepted. Adams State also has an online RN-to-BSN (post-licensure)."
        },
        cost: { amount: null, basis: "CO resident on-campus tuition about $420.18/credit after the COF stipend (2026-27); nursing (NURS) courses add $82.00/credit. No single program total is published.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "BSN": [{ year: 2025, rate: 1.00 }, { year: "8-qtr", rate: 0.89 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://www.adams.edu/academics/undergraduate/nursing/apply/",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "colorado-christian-bsn", institution: "colorado-christian", credential: "bsn",
        name: "Bachelor of Science in Nursing (pre-licensure)",
        length: "120 credits (60 prerequisite + 60 nursing); the nursing major runs 6 semesters (~2 years)",
        format: "In-seat / blended at the Lakewood campus (theory, lab and simulation on campus; clinicals placed near you when possible).",
        prerequisites: [
          { course: "21 biological-science credits (anatomy, physiology, microbiology, chemistry)", code: null, min_grade: "C" },
          { course: "plus general-education and biblical-studies credits (60 total prerequisite credits)", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS (benchmarks: ~68% overall)",
          selection: "competitive (about 48 seats); includes interviews",
          gpa: "Cumulative 3.0 and science-prerequisite 3.0",
          deadline: "August start: due May 1; January start: due September 1",
          notes: "Private Christian university. Upper-division/transfer: enter as Pre-Nursing, finish ~60 prerequisite credits, then apply as a junior. Science prerequisites within 5 years."
        },
        cost: { amount: null, basis: "Per-credit (Summer 2026-Spring 2027): nursing core courses $628/credit; general-education courses $494/credit. Plus technology/textbook and program fees (e.g. ATI packages). No single total published.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "BSN": [{ year: 2025, rate: 0.91 }, { year: "8-qtr", rate: 0.92 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://www.ccu.edu/ccu/nursing/bsn/requirements/",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "Individual prerequisite course codes aren't listed on CCU's (JavaScript-rendered) catalog pages." },

      // ---- More ADN community colleges (board-verified pass rates) ----
      {
        id: "aims-adn", institution: "aims", credential: "adn",
        name: "Associate Degree Nursing (AAS), RN Track",
        length: "4 semesters (69.5 credits: 17 prerequisite + 52.5 nursing)",
        format: "In person, Greeley campus",
        prerequisites: [
          { course: "Human Anatomy & Physiology I (+lab)", code: "BIO 2101", min_grade: "C" },
          { course: "Human Anatomy & Physiology II (+lab)", code: "BIO 2102", min_grade: "C" },
          { course: "English Composition I", code: "ENG 1021", min_grade: "C" },
          { course: "Human Nutrition", code: "HWE 1050", min_grade: "C" },
          { course: "Introduction to Statistics", code: "MAT 1260", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "HESI A2 (minimum 75% in Reading, Vocabulary and Math)",
          selection: "competitive points (28-point scale)",
          gpa: "Cumulative 2.5 (on the last 45 credit hours)",
          deadline: "Apply Apr 12 - May 7, 2027; no late submissions",
          notes: "Requires a current CNA license and being 18+ at program start. BIO 2104 Microbiology and PSY 2440 also required. Science prerequisites within 10 years. An LPN-to-RN track also exists."
        },
        cost: { amount: 15426, basis: "Estimated full-program tuition: in-district $9,590, in-state $15,426, WUE $22,624, out-of-state $43,876, plus ~$1,076 lab/course fees.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "AAS/ADN": [{ year: 2025, rate: 0.96 }, { year: "8-qtr", rate: 0.95 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Colorado State Board of Nursing",
        source_url: "https://www.aims.edu/degrees-certificates/nursing/requirements",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "cncc-adn", institution: "cncc", credential: "adn",
        name: "Associate of Applied Science in Nursing (AAS-ADN)",
        length: "4 nursing semesters (about 2 years) after prerequisites; ~71.5 credits",
        format: "In person, Craig campus (prerequisites can be taken at any CNCC campus)",
        prerequisites: [
          { course: "English Composition", code: "ENG 1021", min_grade: "C" },
          { course: "Human Growth and Development", code: "PSY 2440", min_grade: "C" },
          { course: "Anatomy and Physiology I", code: "BIO 2101", min_grade: "C" },
          { course: "Anatomy and Physiology II", code: "BIO 2102", min_grade: "C" },
          { course: "Microbiology", code: "BIO 2104", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS (proficient or higher)",
          selection: "competitive points, plus an optional Guaranteed Admission track",
          gpa: "2.8 or higher (on at least 12 prerequisite credits)",
          deadline: "Admission materials and TEAS due April 15",
          notes: "Science prerequisites within 7 years. Guaranteed Admission track needs a Letter of Intent by March 15. WUE tuition excludes nursing."
        },
        cost: { amount: null, basis: "Nursing (NUR) courses are charged about $276.40/credit for in-state students after the COF stipend; no single program total is published.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "AAS/ADN": [{ year: 2025, rate: 1.00 }, { year: "8-qtr", rate: 0.93 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Colorado State Board of Nursing",
        source_url: "https://www.cncc.edu/degrees/cte/nursing/pre-nursing.php",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "lamar-adn", institution: "lamar", credential: "adn",
        name: "Associate of Applied Science in Nursing (A.D.N.)",
        length: "5 semesters (69.5 credits: 13 prerequisite + 56.5 nursing); August to May",
        format: "In person, full-time on the Lamar campus",
        prerequisites: [
          { course: "Biology Foundations (or BIO 1111 General College Biology I)", code: "BIO 1010", min_grade: "C" },
          { course: "Human Anatomy & Physiology I", code: "BIO 2101", min_grade: "C" },
          { course: "English Composition I", code: "ENG 1021", min_grade: "C" },
          { course: "Human Growth and Development", code: "PSY 2440", min_grade: "C" },
          { course: "Dietary Nutrition (or HWE 1050 Human Nutrition)", code: "HPR 1010", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "Kaplan Admission Exam (minimum score 65)",
          selection: "competitive (based on prerequisite GPA, entrance-exam score and capacity)",
          gpa: "Stated inconsistently on Lamar's own pages: 2.75 on the program page, 2.5 in the catalog — confirm with the school",
          deadline: "Application opens April 1 and closes June 30; new cohort each fall",
          notes: "All biology prerequisites within 7 years. Level I completers may also sit the NCLEX-PN."
        },
        cost: { amount: null, basis: "Nursing tuition about $276.40/credit for in-state students after the COF stipend ($399.05 out-of-state); no single program total is published.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "AAS/ADN": [{ year: 2025, rate: 0.73 }, { year: "8-qtr", rate: 0.70 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Colorado State Board of Nursing",
        source_url: "https://lamarcc.edu/program/nursing/",
        last_verified: "2026-11-05", academic_year: "2026-27",
        notes: "Minimum GPA is stated inconsistently across Lamar's own pages (2.75 vs 2.5) — shown as a conflict, not resolved by guessing." },
      {
        id: "morgan-adn", institution: "morgan", credential: "adn",
        name: "Associate of Applied Science in Nursing",
        length: "4 semesters after a 13-credit prerequisite block (67.5 credits total)",
        format: "In person, Fort Morgan",
        prerequisites: [
          { course: "Biology Foundations", code: "BIO 1010", min_grade: "C" },
          { course: "Human Anatomy and Physiology I", code: "BIO 2101", min_grade: "C" },
          { course: "Human Growth and Development", code: "PSY 2440", min_grade: "C" },
          { course: "English Composition", code: "ENG 1021", min_grade: "C" },
          { course: "Dietary Nutrition", code: "HPR 1010", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "Kaplan Admission test (plus an ACCUPLACER Arithmetic score of 265)",
          selection: "competitive points (prerequisite GPA, BIO 2101 grade, Kaplan score, health work experience, service-area residence)",
          gpa: "2.5 on the prerequisite courses",
          deadline: "Application period May 1 - June 15",
          notes: "BIO 2101 within the last 7 years."
        },
        cost: { amount: null, basis: "Not published on an accessible official page (Morgan's tuition pages block automated access) — check with the school.", year: null },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "AAS/ADN": [{ year: 2025, rate: 0.80 }, { year: "8-qtr", rate: 0.84 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Colorado State Board of Nursing",
        source_url: "https://catalog.morgancc.edu/nursing-program/associate-of-applied-science/nursing",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "northeastern-jc-adn", institution: "northeastern-jc", credential: "adn",
        name: "Associate Degree Nursing (AAS)",
        length: "4 nursing semesters after prerequisites (67.5 credits); about 3 years total",
        format: "In person, Sterling",
        prerequisites: [
          { course: "English Composition I", code: "ENG 1021", min_grade: "C" },
          { course: "Dietary Nutrition (or HWE 1050 Human Nutrition)", code: "HPR 1010", min_grade: "C" },
          { course: "Anatomy & Physiology I", code: "BIO 2101", min_grade: "C" },
          { course: "Anatomy & Physiology II", code: "BIO 2102", min_grade: "C" },
          { course: "Human Growth & Development", code: "PSY 2440", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "Kaplan Nursing Admissions Exam ($50)",
          selection: "competitive points (Student Screening Survey; higher GPA scores higher)",
          gpa: "Cumulative 2.5 or higher",
          deadline: "Applications open Jan 1 until the class is full; apply by April 1 for preferential consideration",
          notes: "Only one A&P course required at application; science prerequisites within 7 years."
        },
        cost: { amount: null, basis: "In-state tuition about $183.75/credit after the COF stipend (2026-27); no single program total is published.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate, 8-quarter (Colorado Board of Nursing list; the 2025 single-year rate was suppressed for a small cohort)", by_campus: { "AAS/ADN": [{ year: "8-qtr", rate: 0.95 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Colorado State Board of Nursing",
        source_url: "https://www.njc.edu/program/nursing/adn-steps-admission",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "otero-adn", institution: "otero", credential: "adn",
        name: "Nursing AAS (RN)",
        length: "2 years full-time (3-8 semesters); about 71.5-76.5 credits",
        format: "In person, La Junta",
        prerequisites: [
          { course: "Biology Foundations (or BIO 1111 General College Biology I)", code: "BIO 1010", min_grade: "C" },
          { course: "Human Anatomy & Physiology I (+lab)", code: "BIO 2101", min_grade: "C" },
          { course: "Human Growth & Development", code: "PSY 2440", min_grade: "C" },
          { course: "English Composition", code: "ENG 1021", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS (meet the posted benchmarks)",
          selection: "competitive points (a 100-point Nursing Admissions Rubric)",
          gpa: "Cumulative 2.5 on the required pre-admission courses",
          deadline: "Rolling — selections continue each year until slots fill",
          notes: "Science prerequisites within 7 years. An LPN-to-RN bridge (about 3 semesters) and a PN/CNA exit also exist."
        },
        cost: { amount: null, basis: "In-state tuition about $183.75/credit after the COF stipend, plus a $92.65/credit nursing differential and $1,000.50/semester ATI fee (2026-27). No single program total is published.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "AAS/ADN": [{ year: 2025, rate: 0.40 }, { year: "8-qtr", rate: 0.51 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Colorado State Board of Nursing",
        source_url: "https://otero.edu/academics-programs/degrees-certificates/nursing/",
        last_verified: "2026-11-05", academic_year: "2026-27",
        notes: "The Colorado Board's recent first-time pass rates for this program are comparatively low — shown as published." },

      // ---- Final wave: Montrose ADN, interim-approval ADNs, and private-college BSN/ABSN/ADN ----
      {
        id: "colorado-mesa-montrose-adn", institution: "colorado-mesa-montrose", credential: "adn",
        name: "Associate of Applied Science (AAS) in Nursing",
        length: "79 credits; six semesters over about three years",
        format: "In person, Montrose campus",
        prerequisites: [
          { course: "Human Anatomy & Physiology I (+lab)", code: "BIOL 209/209L", min_grade: "C" },
          { course: "Human Anatomy & Physiology II (+lab)", code: "BIOL 210/210L", min_grade: "C" },
          { course: "Pathophysiology", code: "BIOL 241", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None (no TEAS/HESI)",
          selection: "competitive points (prerequisite GPA 65 pts + interview 30 pts); up to 20 seats, every other year",
          gpa: "Minimum 3.0 GPA in nursing prerequisite courses",
          deadline: "January 15 (5:00 PM MST)",
          notes: "Science prerequisites within 10 years. Graduates can continue to CMU's online RN-to-BSN."
        },
        cost: { amount: null, basis: "A Montrose/AAS-specific tuition figure isn't published; CMU charges a different (CTE) tuition rate for associate-degree courses. See CMU Student Accounts.", year: "2026-27" },
        nclex_pass_rate: { basis: "8-quarter first-time NCLEX-RN pass rate (Colorado Board of Nursing list; the 2025 single-year rate was suppressed for a small cohort)", by_campus: { "AAS (Montrose)": [{ year: "8-qtr", rate: 0.94 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Colorado State Board of Nursing (listed with interim status)",
        source_url: "https://www.coloradomesa.edu/health-sciences/documents/aas-nursing-eligibility-criteria.pdf",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "red-rocks-adn", institution: "red-rocks", credential: "adn",
        name: "Associate of Applied Science in Nursing",
        length: "71.5 credits; nursing courses run over the final four semesters",
        format: "In person (one hybrid class), Arvada campus; no summer sessions",
        prerequisites: [
          { course: "Biology Foundations (or BIO 1111 General College Biology)", code: "BIO 1010", min_grade: "C" },
          { course: "Human Anatomy & Physiology I or II (+lab)", code: "BIO 2101/2102", min_grade: "C" },
          { course: "English Composition I", code: "ENG 1021", min_grade: "C" },
          { course: "Human Growth and Development", code: "PSY 2440", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "TEAS or HESI A2 (overall 65% or higher)",
          selection: "competitive review plus a required on-campus interview; a waitlist is used",
          gpa: "Combined prerequisite GPA 3.0 (C or better in each)",
          deadline: "Fall 2027 cohort: Mar 15 - Apr 26, 2027 (apply via NursingCAS)",
          notes: "A new program — complete 3 of the 4 prerequisites and be enrolled in the 4th to apply. (Prerequisite course codes are stated inconsistently across RRCC's own pages.)"
        },
        cost: { amount: null, basis: "Nursing tuition about $379.25/credit for in-state students on campus ($263.25 after the COF stipend); no single program total is published.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not published yet — this is a new program on interim approval; the first class graduates May 2027, so no NCLEX data exists.", by_campus: null, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Approved by the Colorado State Board of Nursing on interim status (a new program); not yet nationally accredited (pursuing ACEN)",
        source_url: "https://www.rrcc.edu/academic-programs/nursing",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "cca-adn", institution: "cca", credential: "adn",
        name: "Nursing AAS",
        length: "73.5 credits; a full-time 5-6 semester sequence",
        format: "In person, Centennial Campus for Healthcare & First Responders",
        prerequisites: [
          { course: "English Composition I", code: "ENG 1021", min_grade: "C" },
          { course: "General Psychology I", code: "PSY 1001", min_grade: "C" },
          { course: "Human Growth and Development", code: "PSY 2440", min_grade: "C" },
          { course: "Human Anatomy & Physiology I (+lab)", code: "BIO 2101", min_grade: "C" },
          { course: "Human Anatomy & Physiology II (+lab)", code: "BIO 2102", min_grade: "C" },
          { course: "Microbiology (+lab)", code: "BIO 2104", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "TEAS Version 7 (cumulative benchmark 63; HESI considered case-by-case)",
          selection: "competitive points (80-point ranking)",
          gpa: "Combined prerequisite GPA 3.0",
          deadline: "Fall 2027 application opens April 1, 2027",
          notes: "A new program. Science prerequisites within 7 years. BIO 1010 Biology Foundations and a nutrition course are also required."
        },
        cost: { amount: null, basis: "Resident nursing (ADN) tuition about $392.40/credit on campus ($276.40 after the COF stipend); CO Online $503.95. No single program total is published.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not published yet — this is a new program on interim approval, not yet nationally accredited (pursuing ACEN).", by_campus: null, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Approved by the Colorado State Board of Nursing on interim status (a new program); 'does not have national nursing accreditation' yet (pursuing ACEN)",
        source_url: "https://ccaurora.edu/programs/health-science-department/nursing-aas/",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "denver-college-nursing-adn", institution: "denver-college-nursing", credential: "adn",
        name: "Associate Degree in Nursing (ADN)",
        length: "As little as 18 months; six quarters of nursing coursework; 110 quarter credits (86 nursing + 24 transferred general education)",
        format: "On campus, Denver (general-education courses may be done online); four start dates per year",
        prerequisites: [
          { course: "Anatomy & Physiology I (+lab)", code: null, min_grade: "C" },
          { course: "Anatomy & Physiology II (+lab)", code: null, min_grade: "C" },
          { course: "Human Growth & Development", code: null, min_grade: "C" },
          { course: "Introduction to Algebra", code: null, min_grade: "C" },
          { course: "English Composition", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "Wonderlic SLE (score 22 on a single attempt) or, failing that, HESI A2 (75% English and Math)",
          selection: "committee review (personal statement, healthcare/volunteer experience and GPA)",
          gpa: "2.0 or higher on prerequisite coursework (no C- grades)",
          deadline: null,
          notes: "At least 75% of the program must be completed at DCN. (DCN is a private, single-purpose college; its pages don't state for-profit vs nonprofit.)"
        },
        cost: { amount: null, basis: "DCN's pages give two figures: program tuition about $38,872-40,472, with an estimated total (books, fees) of about $45,403. No academic year is stated.", year: null },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "ADN": [{ year: 2025, rate: 0.84 }, { year: "8-qtr", rate: 0.87 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "ACEN and CCNE accredited; approved by the Colorado State Board of Nursing",
        source_url: "https://www.denvercollegeofnursing.edu/programs/associate-degree-in-nursing.html",
        last_verified: "2026-11-05", academic_year: null,
        notes: "The Colorado Board list shows an old web address (denverschoolofnursing.edu); the current site is denvercollegeofnursing.edu." },
      {
        id: "denver-college-nursing-absn", institution: "denver-college-nursing", credential: "absn",
        name: "Bachelor of Science in Nursing (accelerated, pre-licensure)",
        length: "As little as 21 months; seven quarters of nursing coursework; 180 quarter credits (100 nursing + 80 transferred general education)",
        format: "Hybrid classroom + lab, Denver campus; four start dates per year",
        prerequisites: [
          { course: "Microbiology (+lab)", code: null, min_grade: "C" },
          { course: "Anatomy & Physiology (+labs)", code: null, min_grade: "C" },
          { course: "Statistics", code: null, min_grade: "C" },
          { course: "Human Growth & Development", code: null, min_grade: "C" },
          { course: "Nutrition", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "Wonderlic SLE (22) or HESI A2 (75% English and Math)",
          selection: "committee review (personal statement, experience and GPA; GPA alone doesn't decide)",
          gpa: "2.0 or higher (no C- grades)",
          deadline: null,
          notes: "Accelerated training for people from non-nursing fields. A shorter prerequisite track (21 semester credits) applies if you already hold a bachelor's; otherwise about 56 semester credits of prerequisites. A&P and Microbiology within 7 years."
        },
        cost: { amount: null, basis: "DCN's pages give two figures: program tuition about $52,863-59,930, with a potential total near $65,903. No academic year is stated.", year: null },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "BSN": [{ year: 2025, rate: 0.80 }, { year: "8-qtr", rate: 0.84 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "ACEN and CCNE accredited; approved by the Colorado State Board of Nursing",
        source_url: "https://www.denvercollegeofnursing.edu/programs/bachelor-of-science-in-nursing.html",
        last_verified: "2026-11-05", academic_year: null, notes: "" },
      {
        id: "adventhealth-bsn", institution: "adventhealth", credential: "bsn",
        name: "Bachelor of Science in Nursing (pre-licensure)",
        length: "About 3 years (minimum nine trimesters); 120 credits",
        format: "On campus, Greenwood Village (daytime only)",
        prerequisites: [
          { course: "Principles of Chemistry", code: "CHEM 101", min_grade: "C" },
          { course: "Anatomy and Physiology I (+lab)", code: "BIOL 101", min_grade: "C" },
          { course: "Anatomy and Physiology II (+lab)", code: "BIOL 102", min_grade: "C" },
          { course: "Principles of Microbiology (+lab)", code: "BIOL 225", min_grade: "C" },
          { course: "Developmental Psychology", code: "PSYC 128", min_grade: "C" },
          { course: "Introduction to Applied Statistics", code: "STAT 205", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS version 7 (composite 62.5% or higher)",
          selection: "competitive (meeting the minimums doesn't guarantee a seat; ~24 Denver seats)",
          gpa: "Minimum 3.0 in the cognate and non-cognate prerequisites",
          deadline: "April 30 (Fall trimester start)",
          notes: "No prior degree required; apply first to General Studies, then complete prerequisites. A faith-based (Seventh-day Adventist) university."
        },
        cost: { amount: 590, basis: "$590 per credit hour (2026-27, university-wide undergraduate rate); no Denver/BSN-specific total is published. A $300/trimester matriculation fee and other fees apply.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "BSN": [{ year: 2025, rate: 0.81 }, { year: "8-qtr", rate: 0.79 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://www.ahu.edu/programs/bs-nursing/admissions",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "concordia-denver-absn", institution: "concordia-denver", credential: "absn",
        name: "Accelerated BSN (ABSN)",
        length: "16 months; starts in January, May and September",
        format: "Hybrid (online coursework + in-person skills labs and clinicals), Denver campus (Greenwood Village)",
        prerequisites: [
          { course: "Human Anatomy and Physiology I", code: "BIO 315", min_grade: "C" },
          { course: "Human Anatomy and Physiology II", code: "BIO 316", min_grade: "C" },
          { course: "Microbiology", code: "BIO 300", min_grade: "C" },
          { course: "Chemistry for Health Sciences", code: "CHE 105", min_grade: "C" },
          { course: "Lifespan Development", code: "PSY 150", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS (65% or greater; waivable by completing 3 of 4 CSP science courses)",
          selection: "meet all requirements, then apply (background check and acknowledgment form)",
          gpa: "Cumulative 3.0 and science 3.0",
          deadline: "Three starts a year (Jan, May, Sep); no fixed deadline published",
          notes: "Requires 54 non-nursing college credits or a non-nursing bachelor's. A private Lutheran (LCMS) university."
        },
        cost: { amount: 850, basis: "$850 per credit hour (Denver ABSN, 2026-27), plus an ATI fee (~$3,484) and lab fees (~$900). No single total published.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Colorado Board of Nursing approved-programs list)", by_campus: { "Accelerated": [{ year: 2025, rate: 0.7887 }, { year: "8-qtr", rate: 0.80 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Colorado State Board of Nursing",
        source_url: "https://global.csp.edu/programs/absn-denver/",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "colorado-mountain-bsn", institution: "colorado-mountain", credential: "bsn",
        name: "Bachelor of Science in Nursing (Traditional Pathway, pre-licensure)",
        length: "4-year degree (two years lower-division, then two years of nursing); 61 prerequisite credits",
        format: "Mostly in person at the Breckenridge, Spring Valley (Glenwood Springs) and Steamboat Springs campuses (you can't switch campuses once admitted)",
        prerequisites: [
          { course: "General College Biology (+lab)", code: "BIO 1111", min_grade: "C" },
          { course: "Anatomy & Physiology I (+lab)", code: "BIO 2101", min_grade: "C" },
          { course: "Anatomy & Physiology II (+lab)", code: "BIO 2102", min_grade: "C" },
          { course: "Microbiology (+lab)", code: "BIO 2104", min_grade: "C" },
          { course: "General College Chemistry (+lab)", code: "CHE 1111", min_grade: "C" },
          { course: "Introduction to Statistics", code: "MAT 1260", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "TEAS and CASPer (TEAS awards admission points; no minimum stated)",
          selection: "points-based (prerequisite and general-education grades, degrees, residency); upper-division is selective",
          gpa: "Minimum cumulative 2.4 (most admitted students are around 3.0+)",
          deadline: "Fall 2027 cohort: February 5, 2027",
          notes: "Upper-division: the first two years are open admission, then you apply into the final two years. The older CMC ADN is no longer enrolling new students; its RN-to-BSN is paused. (Prerequisite codes are from CMC's reference packet — confirm the current catalog.)"
        },
        cost: { amount: null, basis: "BS Nursing per-credit tuition (2026-27): about $189/credit in-district, $299/credit in-state, $639/credit out-of-state; plus a $450/semester nursing program fee. No single program total is published.", year: "2026-27" },
        nclex_pass_rate: { basis: "8-quarter first-time NCLEX-RN pass rate (Colorado Board of Nursing list; the 2025 single-year rate was suppressed for a small cohort)", by_campus: { "BSN": [{ year: "8-qtr", rate: 0.96 }] }, source_url: "https://dpo.colorado.gov/Nursing/Education" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Colorado State Board of Nursing (listed with interim status)",
        source_url: "https://coloradomtn.edu/programs/academic-pathways/nursing-allied-health/bachelor-science-nursing/",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" }
    ],

    // Steps within one school. Cross-school graduate steps don't use these — those programs are
    // open_entry (they admit any accredited BSN + RN license), so the route connects them directly.
    agreements: [
      { id: "trinidad-adn-to-rnbsn", name: "Continue at Trinidad State (ADN -> RN-to-BSN)", type: "internal", from_program: "trinidad-state-adn", to_program: "trinidad-state-rnbsn",
        basis: "Same school. Trinidad State's online RN-to-BSN admits graduates of an associate/diploma nursing program who hold an RN license; its dual-enrollment track lets ADN students start BSN courses after their first nursing semester.",
        conditions: "Current, unencumbered U.S. RN license; up to 89.5 transfer credits (C or higher), at least 30.5 earned at TSC.",
        source_url: "https://trinidadstate.edu/rn-bsn/", last_verified: "2026-11-05" },
      { id: "pikes-peak-adn-to-rnbsn", name: "Continue at Pikes Peak (ADN -> RN-to-BSN)", type: "internal", from_program: "pikes-peak-adn", to_program: "pikes-peak-rnbsn",
        basis: "Same school. Pikes Peak offers an online RN-to-BSN and a dual-enrollment option that lets current ADN students take bachelor's courses.",
        conditions: "Licensed RN (or current ADN student for dual enrollment).",
        source_url: "https://www.pikespeak.edu/programs/nursing/rn-bsn/index.php", last_verified: "2026-11-05" },
      { id: "pueblo-adn-to-rnbsn", name: "Continue at Pueblo CC (ADN -> RN-to-BSN)", type: "internal", from_program: "pueblo-cc-adn", to_program: "pueblo-cc-rnbsn",
        basis: "Same school. Existing PCC ADN students are eligible for dual enrollment into the RN-BSN after their first-year courses; graduates may transfer up to 71.5 credits.",
        conditions: "Good standing in the PCC ADN program, or an accredited ADN plus a valid RN license.",
        source_url: "https://pueblocc.edu/programs/nur/bsn", last_verified: "2026-11-05" },
      { id: "frcc-adn-to-rnbsn", name: "Continue at Front Range (ADN -> RN-to-BSN)", type: "internal", from_program: "front-range-adn", to_program: "front-range-rnbsn",
        basis: "Same school. Current FRCC ADN students may apply to the RN-to-BSN during their first semester (provisional admission); ADN graduates with an RN license also qualify.",
        conditions: "Current RN license (2.0 nursing GPA), or a current FRCC ADN student past the first semester.",
        source_url: "https://www.frontrange.edu/programs-courses/program-list/nursing-program/rn-to-bsn/index.html", last_verified: "2026-11-05" },
      { id: "arapahoe-adn-to-rnbsn", name: "Continue at Arapahoe (ADN -> RN-BSN)", type: "internal", from_program: "arapahoe-adn", to_program: "arapahoe-rnbsn",
        basis: "Same school. Arapahoe's online RN-BSN admits licensed RNs, and current ACC Nursing AAS students can dual-enroll to start BSN coursework online.",
        conditions: "Active, unencumbered U.S. RN license (or a current ACC Nursing AAS student for dual enrollment).",
        source_url: "https://www.arapahoe.edu/nursing/rn-bsn-completion-program", last_verified: "2026-11-05" }
    ]
  };

  window.SCHOOLS = window.SCHOOLS || {};
  window.SCHOOLS.CO = CO;
})();
