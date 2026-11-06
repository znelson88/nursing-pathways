// Arizona school, program and transfer data for the Schools page.
// Same format and rules as co.js (see docs/SCHOOLS_SPEC.md and CLAUDE.md): every record carries
// source_url + last_verified; unknown values are null (the page says "Not published / Check with the
// school"); credential values reuse the career map's role ids; open_entry:true marks a program that
// admits anyone holding the prior credential; agreements connect steps (type "internal" or "concurrent").
//
// Arizona note: the state Board of Nursing's approved-programs list and NCLEX table sit behind a
// Cloudflare challenge that blocks automated access, so each program's facts — including its OWN published
// NCLEX pass rate where available, and its board approval — come from the institution's own website.
// Arizona's signature route is the Maricopa Concurrent Enrollment Program (CEP): earn a community-college
// ADN and a university BSN at the same time (ASU, NAU, GCU).

(function () {
  const AZ = {
    state: "AZ",
    updated: "2026-11-05",

    institutions: [
      { id: "asu", name: "Arizona State University (Edson College)", type: "public_university", city: "Phoenix", campuses: ["Downtown Phoenix", "Polytechnic", "West Valley"], url: "https://nursingandhealth.asu.edu/", source_url: "https://nursingandhealth.asu.edu/programs/bsn/traditional", last_verified: "2026-11-05" },
      { id: "u-arizona", name: "University of Arizona College of Nursing", type: "public_university", city: "Tucson", campuses: ["Tucson", "Gilbert"], url: "https://nursing.arizona.edu/", source_url: "https://nursing.arizona.edu/academics/bachelor-science-nursing-bsn", last_verified: "2026-11-05" },
      { id: "nau", name: "Northern Arizona University (Sanghi College of Nursing)", type: "public_university", city: "Flagstaff", campuses: ["Flagstaff", "Yuma", "North Valley (Phoenix)"], url: "https://in.nau.edu/college-nursing/", source_url: "https://in.nau.edu/college-nursing/undergraduate-degrees-programs/bs-nursing/", last_verified: "2026-11-05" },
      { id: "gcu", name: "Grand Canyon University", type: "private_nonprofit", city: "Phoenix", campuses: ["Phoenix"], url: "https://www.gcu.edu/", source_url: "https://www.gcu.edu/degree-programs/bsn-pre-licensure", last_verified: "2026-11-05" },
      { id: "maricopa", name: "MaricopaNursing (Maricopa Community Colleges)", type: "community_college", city: "Phoenix (metro)", campuses: ["Chandler-Gilbert", "Estrella Mountain", "GateWay", "Glendale", "Mesa", "Paradise Valley", "Phoenix College", "Scottsdale"], url: "https://www.maricopa.edu/degrees-certificates/nursing", source_url: "https://www.maricopa.edu/degrees-certificates/health-sciences/nursing-3812-aas", last_verified: "2026-11-05" },
      { id: "pima", name: "Pima Community College", type: "community_college", city: "Tucson", campuses: ["West Campus (Tucson)"], url: "https://www.pima.edu/academics-programs/degrees-certificates/health-sciences/nursing/", source_url: "https://www.pima.edu/academics-programs/degrees-certificates/health-sciences/nursing/aas/index.html", last_verified: "2026-11-05" },
      { id: "central-arizona", name: "Central Arizona College", type: "community_college", city: "Coolidge", campuses: ["Signal Peak", "San Tan"], url: "https://centralaz.edu/divisions-programs/nursing-health-emergency-careers/nursing-aas/", source_url: "https://centralaz.edu/divisions-programs/nursing-health-emergency-careers/nursing-aas/", last_verified: "2026-11-05" },
      { id: "eastern-arizona", name: "Eastern Arizona College", type: "community_college", city: "Thatcher", campuses: ["Thatcher"], url: "https://eac.edu/academics/programs/nursing/", source_url: "https://catalog.eac.edu/programs/20702", last_verified: "2026-11-05" },
      { id: "mohave", name: "Mohave Community College", type: "community_college", city: "Kingman", campuses: ["Kingman", "Lake Havasu City", "Bullhead City", "Colorado City"], url: "https://www.mohave.edu/academics/certificates/nursing/", source_url: "https://www.mohave.edu/academics/certificates/nursing/", last_verified: "2026-11-05" },
      { id: "yavapai", name: "Yavapai College", type: "community_college", city: "Prescott", campuses: ["Prescott", "Verde Valley (Clarkdale)"], url: "https://www.yc.edu/nursing", source_url: "https://www.yc.edu/v6/schools/hewe/docs/nursing/app-info-guide.pdf", last_verified: "2026-11-05" },
      { id: "arizona-western", name: "Arizona Western College", type: "community_college", city: "Yuma", campuses: ["Yuma"], url: "https://azwestern.edu/career-and-technical-education/nursing", source_url: "https://azwestern.edu/career-and-technical-education/nursing", last_verified: "2026-11-05" },
      { id: "coconino", name: "Coconino Community College", type: "community_college", city: "Flagstaff", campuses: ["Flagstaff (Fourth Street)"], url: "https://www.coconino.edu/nursing-aas", source_url: "https://www.coconino.edu/info/nursing-program", last_verified: "2026-11-05" },
      { id: "cochise", name: "Cochise College", type: "community_college", city: "Douglas", campuses: ["Douglas", "Sierra Vista", "Benson"], url: "https://www.cochise.edu/programs/nursing-allied-health/nursing/index.html", source_url: "https://www.cochise.edu/programs/nursing-allied-health/nursing/index.html", last_verified: "2026-11-05" },
      { id: "northland-pioneer", name: "Northland Pioneer College", type: "community_college", city: "Show Low", campuses: ["Show Low (White Mountain)", "Winslow (Little Colorado)"], url: "https://www.npc.edu/rn", source_url: "https://www.npc.edu/rn", last_verified: "2026-11-05" },
      { id: "creighton", name: "Creighton University (Phoenix)", type: "private_nonprofit", city: "Phoenix", campuses: ["Phoenix"], url: "https://www.creighton.edu/healthsciences/phoenix/college-nursing-programs", source_url: "https://www.creighton.edu/academics/programs/accelerated-bachelor-science-nursing-absn", last_verified: "2026-11-05" }
    ],

    programs: [
      // ================= Community-college ADN (makes RNs) =================
      {
        id: "maricopa-adn", institution: "maricopa", credential: "adn",
        name: "Associate in Applied Science (AAS) in Nursing",
        length: "4-semester nursing sequence (Blocks); 62-75 total credits",
        format: "In person, at eight metro-Phoenix colleges (Chandler-Gilbert, Estrella Mountain, GateWay, Glendale, Mesa, Paradise Valley, Phoenix College, Scottsdale)",
        prerequisites: [
          { course: "Human Biology / General Biology", code: "BIO 156/181", min_grade: "C" },
          { course: "Human Anatomy & Physiology I", code: "BIO 201", min_grade: "C" },
          { course: "Fundamental Chemistry", code: "CHM 130", min_grade: "C" },
          { course: "First-Year Composition", code: "ENG 101", min_grade: "C" },
          { course: "College Mathematics", code: "MAT 140/141/142", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "HESI A2 (minimum 80% English composite, 75% math)",
          selection: "Standard AAS uses a non-competitive waitlist/queue (about 2-3 semester wait); the CEP track is competitive",
          gpa: null,
          deadline: "Apply to the MaricopaNursing pool; placed in the queue when prerequisites are done",
          notes: "All program courses need a C or better. Co-requisites: BIO 202, BIO 205, ENG 102, PSY 101. The Nurse Assistant requirement is paused July 2025-June 2027. LPN and paramedic advanced placement (enter at Block 2/3) also exist."
        },
        cost: { amount: null, basis: "In-state tuition $97/credit (2026-27); the program's own estimate of the full cost (tuition, fees, books, background, immunizations) is about $11,108.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate varies by college (consortium-wide figures are in MaricopaNursing's outcomes document). Example — Phoenix College: 92.45% (2023), 98% (2024).", by_campus: { "Phoenix College (example)": [{ year: 2024, rate: 0.98 }, { year: 2023, rate: 0.9245 }] }, source_url: "https://www.phoenixcollege.edu/academics/departments/nursing" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Arizona State Board of Nursing",
        source_url: "https://www.maricopa.edu/degrees-certificates/health-sciences/nursing-3812-aas",
        last_verified: "2026-11-05", academic_year: "2026-27",
        notes: "One shared curriculum across the eight colleges. Its Concurrent Enrollment Program (CEP) lets you earn a university BSN at the same time — see the connection below." },
      {
        id: "pima-adn", institution: "pima", credential: "adn",
        name: "Nursing (ADN), AAS",
        length: "60-61 credits; 5-6 semesters (about 64 weeks), cohort model",
        format: "West Campus (Tucson); offered in person, online and hybrid components",
        prerequisites: [
          { course: "Human Anatomy & Physiology I", code: "BIO 201IN", min_grade: "B" },
          { course: "Human Anatomy & Physiology II", code: "BIO 202IN", min_grade: "B" },
          { course: "College mathematics (MAT 142 or higher)", code: "MAT 142", min_grade: "C" },
          { course: "English Composition", code: "WRT 101", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "NLN Nursing Entrance Exam (not TEAS/HESI)",
          selection: "competitive, point-based",
          gpa: null,
          deadline: "Spring deadline Sep 1 (window Jul 1-Sep 1); Fall deadline Feb 1 (window Dec 1-Feb 1)",
          notes: "WRT 101 is completed in the first block, not required to apply. An LPN-to-ADN transition and a concurrent BSN partnership (with NAU, ASU or GCU) also exist."
        },
        cost: { amount: 17364, basis: "Estimated full program cost $17,363.60 (2026-27, in-state, full-time): general tuition $7,828 + differential $5,100 + fees $60 + course fees $1,374 + materials $2,279.60.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Pima's published outcomes)", by_campus: { "ADN": [{ year: 2024, rate: 0.9521 }, { year: 2023, rate: 0.9240 }, { year: 2022, rate: 0.8901 }] }, source_url: "https://www.pima.edu/academics-programs/degrees-certificates/health-sciences/nursing/aas/outcomes.html" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Arizona State Board of Nursing",
        source_url: "https://catalog.pima.edu/preview_program.php?catoid=17&poid=3749",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "central-arizona-adn", institution: "central-arizona", credential: "adn",
        name: "Nursing, Associate of Applied Science (AAS) — RN Traditional",
        length: "4 semesters; 60 total credits",
        format: "In person; Signal Peak and San Tan campuses; clinicals in Pinal and Maricopa counties",
        prerequisites: [
          { course: "Anatomy & Physiology I", code: "BIO 201", min_grade: "C" },
          { course: "Anatomy & Physiology II", code: "BIO 202", min_grade: "C" },
          { course: "College Composition I (eligibility)", code: "ENG 101", min_grade: null },
          { course: "College Mathematics (eligibility)", code: "MAT 141", min_grade: null },
          { course: "Microbiology (co-requisite)", code: "BIO 205", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "HESI (80% minimum on Reading/Grammar/Vocabulary/Math, 70% on Anatomy & Physiology)",
          selection: "highly competitive, points-based",
          gpa: "Cumulative 2.75 or higher",
          deadline: "March 1 for Fall; October 2 for Spring",
          notes: "A/P within 5 years. An LNA or LPN license must be included in the application. An informational session is required. An LPN-to-RN bridge also exists."
        },
        cost: { amount: null, basis: "About $90/credit for Arizona residents (2026-27) for 100-200 level courses; no single program total is published (course/special fees extra).", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (CAC's published figures)", by_campus: { "AAS/ADN": [{ year: 2024, rate: 0.9808 }, { year: 2023, rate: 0.8919 }, { year: 2022, rate: 0.8696 }] }, source_url: "https://centralaz.edu/divisions-programs/nursing-health-emergency-careers/nursing-aas/" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Arizona State Board of Nursing",
        source_url: "https://centralaz.edu/resources/AOI/NursingRNTraditionalEmphasisAASmap.pdf",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "eastern-arizona-adn", institution: "eastern-arizona", credential: "adn",
        name: "Nursing, Associate of Applied Science (AAS)",
        length: "4 semesters (2 years) after prerequisites; minimum 69 credits",
        format: "In person on the Thatcher campus, with online components",
        prerequisites: [
          { course: "Fundamental Chemistry (or higher)", code: "CHM 130", min_grade: "C" },
          { course: "Introduction to Psychology", code: "PSY 101", min_grade: "C" },
          { course: "Anatomy & Physiology I", code: "BIO 201", min_grade: "C" },
          { course: "Math (placement into MAT 154 or MAT 100)", code: "MAT 154", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS (Proficient or higher; $87)",
          selection: "competitive, points-based (anonymous ranking); ~30-36 seats/semester; no waitlist",
          gpa: null,
          deadline: "Typically ~April 1 (Fall start) / ~November 1 (Spring start)",
          notes: "Nursing (NUR) courses require a B or better. LPN advanced placement and an LPN exit are available."
        },
        cost: { amount: null, basis: "Per-credit/per-semester (AZ resident, 2025-26): 9 credits $882, 12 credits $1,176; plus books (~$1,395), lab/tech fee ($575/sem), ATI fee ($190/sem) and other fees. No single program total published.", year: "2025-26" },
        nclex_pass_rate: { basis: "EAC publishes a program goal (at least 90% first-time), not an achieved annual rate on its public pages.", by_campus: null, source_url: "https://eac.edu/academics/programs/nursing/" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Arizona State Board of Nursing",
        source_url: "https://eac.edu/wp-content/uploads/2026/03/nursing-faq-25-26-Final.pdf",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "mohave-adn", institution: "mohave", credential: "adn",
        name: "Associate of Applied Science (AAS) in Nursing",
        length: "24-month program; 68-72 total credits (4 nursing semesters after prerequisites)",
        format: "Traditional + remote learning; classes in Kingman, Lake Havasu City, Bullhead City and Colorado City",
        prerequisites: [
          { course: "Human Anatomy & Physiology I (+lab)", code: "BIO 201", min_grade: null },
          { course: "Human Anatomy & Physiology II (+lab)", code: "BIO 202", min_grade: null },
          { course: "Fundamental Chemistry (+lab, or higher)", code: "CHM 130", min_grade: null },
          { course: "English Composition", code: "ENG 101", min_grade: null },
          { course: "Microbiology (+lab) — prerequisite from Fall 2026", code: "BIO 205", min_grade: null }
        ],
        admission: {
          entrance_exam: "ATI TEAS v7 (from Fall 2027, Proficient or higher required)",
          selection: null,
          gpa: "Minimum 3.0 on the required prerequisite courses",
          deadline: "May 1 for a Fall start; October 1 for a Spring start",
          notes: "LPN and paramedic advanced placement (course credit) are available."
        },
        cost: { amount: null, basis: "About $94/credit for Arizona residents (2026) for 100-200 level courses; no single program total is published.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Mohave's published outcomes)", by_campus: { "AAS/ADN (first-time)": [{ year: "2024-25", rate: 0.8655 }, { year: "2023-24", rate: 0.9079 }, { year: "2022-23", rate: 0.7569 }] }, source_url: "https://www.mohave.edu/academics/certificates/nursing/" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Arizona State Board of Nursing",
        source_url: "https://www.mohave.edu/academics/certificates/nursing/",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "yavapai-adn", institution: "yavapai", credential: "adn",
        name: "Associate of Applied Science (AAS) in Nursing",
        length: "24-month program (4 sequential semesters); 28 prerequisite + 40.5 nursing credits",
        format: "In person, Prescott and Verde Valley (Clarkdale) campuses",
        prerequisites: [
          { course: "Anatomy & Physiology I", code: "BIO 201", min_grade: null },
          { course: "Anatomy & Physiology II", code: "BIO 202", min_grade: null },
          { course: "Microbiology", code: "BIO 205", min_grade: null },
          { course: "English Composition I", code: "ENG 101", min_grade: null },
          { course: "Statistics", code: "MAT 167", min_grade: null }
        ],
        admission: {
          entrance_exam: "ATI TEAS (minimum cumulative 60.0%, taken at Yavapai)",
          selection: "competitive points (1000-point system: prereq GPA, TEAS, gen-ed, residency, YC credits)",
          gpa: "Prerequisite GPA 2.5 or higher",
          deadline: "Spring 2027 cohort: apply Aug 3 - Oct 22, 2026",
          notes: "A current AZ CNA/LNA (or AHS 114) is required. Keep a 78% average in nursing courses. An LPN-to-RN bridge (12 months) and LPN step-out also exist."
        },
        cost: { amount: null, basis: "Nursing (NSG) courses $209/credit x 40.5 = about $8,465, plus about $5,282 prerequisite tuition and books/fees (AZ resident, 2026-27). Per-credit: $116 standard, $143 science, $209 nursing.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Yavapai's published outcomes)", by_campus: { "AAS/ADN": [{ year: 2024, rate: 0.9451 }, { year: 2025, rate: 0.8416 }] }, source_url: "https://www.yc.edu/v6/schools/hewe/docs/nursing/05-program-success-rates.pdf" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Arizona State Board of Nursing",
        source_url: "https://www.yc.edu/v6/schools/hewe/docs/nursing/app-info-guide.pdf",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },

      // ================= RN-to-BSN completion =================
      {
        id: "yavapai-rnbsn", institution: "yavapai", credential: "rnbsn", open_entry: true,
        name: "RN-to-BSN (bachelor's completion)",
        length: "12 months (three consecutive semesters including summer)",
        format: "100% online",
        prerequisites: [],
        admission: { entrance_exam: null, selection: null, gpa: null, deadline: null,
          notes: "For licensed RNs. Yavapai AAS graduates are automatically accepted pending NCLEX-RN passage and licensure." },
        cost: { amount: null, basis: "Charged at Yavapai's bachelor's (300-400 level) tuition; a single program total isn't published here.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a bachelor's-completion program for licensed nurses.", by_campus: null, source_url: null },
        accreditation: "Yavapai College (approved by the Arizona State Board of Nursing); confirm program accreditation with the school",
        source_url: "https://www.yc.edu/v6/schools/hewe/docs/nursing/app-info-guide.pdf",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },

      // ================= University pre-licensure BSN / Accelerated BSN / Direct-entry MSN =================
      {
        id: "asu-bsn", institution: "asu", credential: "bsn",
        name: "Traditional Prelicensure BSN",
        length: "16-month (year-round) or 24-month (academic-year) schedule",
        format: "On campus at Downtown Phoenix, Polytechnic or West Valley",
        prerequisites: [{ course: "Critical (prerequisite) courses — biology, chemistry, A&P, statistics, etc.", code: null, min_grade: "C" }],
        admission: {
          entrance_exam: "ATI TEAS",
          selection: "selective — based on Select GPA and TEAS score",
          gpa: "3.50 minimum critical-course GPA (first-year direct admission needs ~3.80, or 3.50 plus a 25 ACT / 1230 SAT)",
          deadline: "Advancement deadlines Feb 1 (Summer/Fall) and Sep 1 (Spring); first-year priority Nov 1",
          notes: "Specific prerequisite course codes are in ASU's nursing information packet."
        },
        cost: { amount: null, basis: "ASU directs applicants to its tuition calculator; no single program figure is published.", year: null },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (ASU Edson facts & figures)", by_campus: { "BSN": [{ year: 2024, rate: 0.95 }] }, source_url: "https://nursingandhealth.asu.edu/about/facts-and-figures" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved to operate by the Arizona State Board of Nursing",
        source_url: "https://nursingandhealth.asu.edu/programs/bsn/traditional",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "asu-absn", institution: "asu", credential: "absn",
        name: "Accelerated BSN (post-baccalaureate)",
        length: "12 months (three-semester, year-round)",
        format: "Downtown Phoenix (spring, with an Arizona-resident 'Learn Where You Live' remote option) or West Valley (fall)",
        prerequisites: [{ course: "A prior bach's degree in another field, or ~70 credit hours", code: null, min_grade: null }],
        admission: { entrance_exam: null, selection: "competitive, space limited", gpa: null,
          deadline: "Spring cohort Sep 1; Fall cohort Feb 1",
          notes: "A full-time upper-division clinical program. Specific entrance-exam/GPA details are in ASU's information packet." },
        cost: { amount: null, basis: "ASU directs applicants to its tuition calculator; no single figure is published.", year: null },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (ASU reports ~97% for the accelerated BSN)", by_campus: { "Accelerated BSN": [{ year: "recent", rate: 0.97 }] }, source_url: "https://nursingandhealth.asu.edu/programs/bsn/accelerated" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Arizona State Board of Nursing",
        source_url: "https://nursingandhealth.asu.edu/programs/bsn/accelerated",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "asu-demsn", institution: "asu", credential: "demsn",
        name: "MS in Nursing — Entry to Nursing Practice (MEPN direct-entry)",
        length: "15-16 months, full-time; 53 credits",
        format: "On campus; makes a non-nurse into an RN (and earns a master's)",
        prerequisites: [{ course: "A bachelor's degree in another field", code: null, min_grade: null }],
        admission: { entrance_exam: null, selection: "competitive", gpa: null, deadline: null,
          notes: "A direct-entry master's for career changers; graduates sit for the NCLEX-RN. ASU reports a 100% first-attempt pass rate." },
        cost: { amount: null, basis: "ASU directs applicants to its tuition calculator; no single figure is published.", year: null },
        nclex_pass_rate: { basis: "ASU reports a 100% first-attempt NCLEX-RN pass rate for this entry-to-practice MS.", by_campus: null, source_url: "https://nursingandhealth.asu.edu/MEPN-ABSN-campaign" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Arizona State Board of Nursing",
        source_url: "https://nursingandhealth.asu.edu/MEPN-ABSN-campaign",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "u-arizona-bsn", institution: "u-arizona", credential: "bsn",
        name: "Bachelor of Science in Nursing — Conventional Pathway",
        length: "2 years (4 semesters, no summers); 120 total credits",
        format: "In person, Tucson Health Sciences Campus",
        prerequisites: [{ course: "Composition, chemistry, A&P I/II, biology, microbiology, statistics, lifespan development, nutrition", code: null, min_grade: "B" }],
        admission: {
          entrance_exam: "None stated",
          selection: "selective",
          gpa: "Transfer/change-of-major: cumulative 3.6",
          deadline: "Transfer Summer/Fall Feb 1, Spring Oct 1; change-of-major every December and May",
          notes: "A separate BSN Direct Admit (BSN-DA) route exists for first-year/freshman applicants."
        },
        cost: { amount: null, basis: "Estimated total tuition & fees (2026-27): Arizona residents $30,412; non-residents $88,316.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (UArizona published)", by_campus: { "BSN": [{ year: 2025, rate: 0.93 }] }, source_url: "https://nursing.arizona.edu/academics/bachelor-science-nursing-bsn" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.arizona.edu/academics/bachelor-science-nursing-bsn/conventional",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "u-arizona-absn", institution: "u-arizona", credential: "absn",
        name: "BSN — Integrative Health Accelerated Pathway",
        length: "15-17 months (accelerated); 120 total credits",
        format: "Hybrid (online + in-person), distance campus in Gilbert, AZ",
        prerequisites: [{ course: "Same prerequisites as the conventional BSN (B or better)", code: null, min_grade: "B" }],
        admission: {
          entrance_exam: "None stated",
          selection: "selective",
          gpa: "Transfer/change-of-major: cumulative 3.6",
          deadline: "Transfer Summer/Fall Feb 1, Spring Oct 1",
          notes: "An accelerated, year-round BSN with an integrative-health emphasis."
        },
        cost: { amount: null, basis: "Estimated total tuition & fees (2026-27): Arizona residents $32,650; non-residents $81,030.", year: "2026-27" },
        nclex_pass_rate: { basis: "See the conventional BSN (UArizona reports one program pass rate).", by_campus: null, source_url: "https://nursing.arizona.edu/academics/bachelor-science-nursing-bsn" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.arizona.edu/academics/bachelor-science-nursing-bsn/integrative-health",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "u-arizona-demsn", institution: "u-arizona", credential: "demsn",
        name: "Master of Science — Entry to the Profession of Nursing (MEPN)",
        length: "15-16 months, full-time",
        format: "On campus at Tucson or Gilbert; makes a non-nurse into an RN (and earns a master's)",
        prerequisites: [{ course: "A bachelor's degree in any field", code: null, min_grade: null }],
        admission: { entrance_exam: "HESI A2 or ATI TEAS (direct-admit recent AZ-university grads may be exempt)", selection: "competitive", gpa: "3.0", deadline: null,
          notes: "A direct-entry master's for career changers; graduates become RNs." },
        cost: { amount: null, basis: "Estimated total (2026-27): MEPN Tucson residents $49,996, non-residents $85,548; MEPN Gilbert residents $45,686, non-residents $64,607.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not published separately here.", by_campus: null, source_url: "https://nursing.arizona.edu/costs-financial-aid" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.arizona.edu/academics/master-science-entry-profession-nursing-mepn",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "nau-bsn", institution: "nau", credential: "bsn",
        name: "Bachelor of Science in Nursing (Traditional / Compressed)",
        length: "Traditional: ~2 years (4 semesters). A Compressed option runs 16 months (fall/spring/summer).",
        format: "Hybrid; Flagstaff and Yuma campuses (also a Compressed option at North Valley/Phoenix)",
        prerequisites: [{ course: "30-32 units of prerequisites (biology, chemistry/labs, nutrition, psychology, statistics)", code: null, min_grade: null }],
        admission: {
          entrance_exam: "HESI A2 (used to screen and rank applicants)",
          selection: "competitive (HESI + Select GPA ranking)",
          gpa: "3.0 or higher in nursing and prerequisite courses",
          deadline: "Spring apply Jul 1 - Sep 10; Fall apply Feb 1 - Mar 25 (Compressed summer: Oct 1 - Nov 8)",
          notes: "Up to 5 in-progress prerequisites allowed at application."
        },
        cost: { amount: null, basis: "No nursing-specific undergraduate tuition figure is published; NAU directs to its Student Accounts semester-rate page.", year: null },
        nclex_pass_rate: { basis: "NAU states its NCLEX pass rates are 'consistently over 90%' but doesn't publish year-by-year numbers.", by_campus: null, source_url: "https://nau.edu/nursing/about/frequently-asked-questions/" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://in.nau.edu/college-nursing/undergraduate-degrees-programs/bs-nursing/",
        last_verified: "2026-11-05", academic_year: "2026-27",
        notes: "NAU also runs the Maricopa Concurrent Enrollment Program (see the connections) and a Global BSN." },
      {
        id: "nau-absn", institution: "nau", credential: "absn",
        name: "BSN — Accelerated Option (second-degree)",
        length: "12 months",
        format: "North Valley (Phoenix) campus, with some online/blended coursework",
        prerequisites: [{ course: "A prior bachelor's degree + 27 prerequisite units", code: null, min_grade: null }],
        admission: {
          entrance_exam: "HESI A2",
          selection: "first-come, first-served enrollment",
          gpa: "3.0 (as for the traditional BSN)",
          deadline: "Summer Feb 10 - Mar 24; Fall Jun 1 - Jul 8; Spring Oct 7 - Nov 18",
          notes: "Admits 30 students per year. Requires a bachelor's degree complete by program start."
        },
        cost: { amount: null, basis: "No dollar figure is published on the program page.", year: null },
        nclex_pass_rate: { basis: "NAU publishes only a college-wide 'over 90%' claim, no program-specific number.", by_campus: null, source_url: "https://in.nau.edu/college-nursing/undergraduate-degrees-programs/bs-nursing-accelerated/" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://in.nau.edu/college-nursing/undergraduate-degrees-programs/bs-nursing-accelerated/",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "gcu-bsn", institution: "gcu", credential: "bsn",
        name: "Bachelor of Science in Nursing (Pre-Licensure)",
        length: "123 credits (traditional, on-campus)",
        format: "On campus, Phoenix",
        prerequisites: [{ course: "Admission into the nursing program (no separate prerequisite list published)", code: null, min_grade: null }],
        admission: {
          entrance_exam: "None stated",
          selection: null,
          gpa: "2.8+ unweighted (or 2.5+ with ACT 19 / SAT 1000)",
          deadline: null,
          notes: "No application fee, personal statement or essay required. GCU calls itself a private, nonprofit Christian university (this status is publicly contested)."
        },
        cost: { amount: null, basis: "Listed at $8,250 per semester (campus); GCU doesn't state an academic year or per-credit rate.", year: null },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (GCU Phoenix, as listed on the program page)", by_campus: { "Phoenix": [{ year: "Q2 2026", rate: 0.9811 }] }, source_url: "https://www.gcu.edu/degree-programs/bsn-pre-licensure" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); institutionally accredited by the Higher Learning Commission. GCU does not state Arizona Board program approval (it cites the board only as its NCLEX data source).",
        source_url: "https://www.gcu.edu/degree-programs/bsn-pre-licensure",
        last_verified: "2026-11-05", academic_year: null, notes: "" },
      {
        id: "gcu-absn", institution: "gcu", credential: "absn",
        name: "Accelerated BSN (ABSN) — Phoenix",
        length: "As few as 16 months",
        format: "Hybrid (online coursework + in-person immersive learning), Phoenix",
        prerequisites: [{ course: "At least 60 non-nursing college credits, or a completed non-nursing bachelor's", code: null, min_grade: null }],
        admission: { entrance_exam: "None stated", selection: null, gpa: "3.0 cumulative", deadline: "Three start dates each year",
          notes: "Transfers a minimum of 60 of the required 123 credits." },
        cost: { amount: 850, basis: "$850 per credit (campus); GCU doesn't state an academic year. Total depends on credits required.", year: null },
        nclex_pass_rate: { basis: "Not published separately for the ABSN; see GCU's pre-licensure BSN figure.", by_campus: null, source_url: "https://www.gcu.edu/degree-programs/absn-accelerated-bsn/arizona/phoenix" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://www.gcu.edu/degree-programs/absn-accelerated-bsn/arizona/phoenix",
        last_verified: "2026-11-05", academic_year: null, notes: "" },

      // ================= University RN-to-BSN completions (open to any accredited ADN + RN) =================
      {
        id: "asu-rnbsn", institution: "asu", credential: "rnbsn", open_entry: true,
        name: "Online RN-to-BSN", length: "As little as 14 months; 120 total credits (at least 36 at ASU); 7.5-week sessions",
        format: "Online (also available in person).", prerequisites: [],
        admission: { entrance_exam: null, selection: null, gpa: "Minimum 2.50 transfer GPA", deadline: null,
          notes: "Requires an associate degree in nursing from a regionally accredited institution and an active RN license in good standing. (Not available to residents of TN or WA.)" },
        cost: { amount: null, basis: "No per-credit or total figure is published on the program page (ASU uses a tuition estimator); a $75 application fee applies.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a bachelor's-completion program for licensed nurses.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://asuonline.asu.edu/online-degree-programs/undergraduate/bachelor-science-nursing-rn-bsn/",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "nau-rnbsn", institution: "nau", credential: "rnbsn", open_entry: true,
        name: "RN-to-BSN (Option for Registered Nurses)", length: "120 total credits (30 nursing); semester-based",
        format: "Online (clinical projects done locally).", prerequisites: [],
        admission: { entrance_exam: null, selection: null, gpa: null, deadline: null,
          notes: "For RNs who graduated from an accredited associate-degree or diploma program and hold a current RN license. Arizona community-college RN graduates can transfer up to 90 units." },
        cost: { amount: null, basis: "No per-credit tuition is published on the program pages; NAU markets it as the most affordable online RN-to-BSN in Arizona.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a bachelor's-completion program for licensed nurses.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://in.nau.edu/college-nursing/undergraduate-degrees-programs/rn-bs-nursing/",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },

      // ================= University graduate / advanced-practice programs (open to any accredited BSN + RN) =================
      // ---- ASU (DNP specialties) ----
      {
        id: "asu-fnp", institution: "asu", credential: "fnp", open_entry: true,
        name: "DNP — Advanced Nursing Practice (Family Nurse Practitioner)", length: null,
        format: "Doctor of Nursing Practice; delivery varies by specialty.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 (last 60 hours)", deadline: null,
          notes: "Requires a BSN or MSN in nursing and a current, unencumbered RN license." },
        cost: { amount: null, basis: "ASU directs applicants to its tuition calculator; no single figure is published.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate (nurse practitioner) program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Arizona State Board of Nursing",
        source_url: "https://degrees.asu.edu/masters-phd/major/ASU00/NUANPFNDNP/advanced-nursing-practice-family-nurse-practitioner-dnp",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "asu-agacnp", institution: "asu", credential: "agacnp", open_entry: true,
        name: "DNP — Advanced Nursing Practice (Adult-Gerontology Acute Care NP)", length: null,
        format: "Doctor of Nursing Practice.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 (last 60 hours)", deadline: null, notes: "Requires a BSN or MSN in nursing and a current, unencumbered RN license." },
        cost: { amount: null, basis: "ASU directs applicants to its tuition calculator.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Arizona State Board of Nursing",
        source_url: "https://nursingandhealth.asu.edu/programs/dnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "asu-agpcnp", institution: "asu", credential: "agpcnp", open_entry: true,
        name: "DNP — Advanced Nursing Practice (Adult-Gerontology Nurse Practitioner)", length: null,
        format: "Doctor of Nursing Practice.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 (last 60 hours)", deadline: null, notes: "Requires a BSN or MSN in nursing and a current, unencumbered RN license. (ASU titles this adult-gero track without 'primary care'.)" },
        cost: { amount: null, basis: "ASU directs applicants to its tuition calculator.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Arizona State Board of Nursing",
        source_url: "https://nursingandhealth.asu.edu/programs/dnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "asu-pnp", institution: "asu", credential: "pnp", open_entry: true,
        name: "DNP — Advanced Nursing Practice (Pediatric Nurse Practitioner)", length: null,
        format: "Doctor of Nursing Practice; primary-care and acute-care pediatric tracks.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 (last 60 hours)", deadline: null, notes: "Requires a BSN or MSN in nursing and a current, unencumbered RN license." },
        cost: { amount: null, basis: "ASU directs applicants to its tuition calculator.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Arizona State Board of Nursing",
        source_url: "https://nursingandhealth.asu.edu/programs/dnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "asu-pmhnp", institution: "asu", credential: "pmhnp", open_entry: true,
        name: "DNP — Advanced Nursing Practice (Psychiatric Mental Health NP)", length: null,
        format: "Doctor of Nursing Practice.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 (last 60 hours)", deadline: null, notes: "Requires a BSN or MSN in nursing and a current, unencumbered RN license." },
        cost: { amount: null, basis: "ASU directs applicants to its tuition calculator.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Arizona State Board of Nursing",
        source_url: "https://degrees.asu.edu/masters-phd/major/ASU00/NUANPCFDNP/advanced-nursing-practice-psychiatric-mental-health-nurse-practitioner-dnp",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "asu-whnp", institution: "asu", credential: "whnp", open_entry: true,
        name: "DNP — Advanced Nursing Practice (Women's Health Nurse Practitioner)", length: null,
        format: "Doctor of Nursing Practice.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 (last 60 hours)", deadline: null, notes: "Requires a BSN or MSN in nursing and a current, unencumbered RN license." },
        cost: { amount: null, basis: "ASU directs applicants to its tuition calculator.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Arizona State Board of Nursing",
        source_url: "https://nursingandhealth.asu.edu/programs/dnp/womens-health-nurse-practitioner-dnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "asu-crna", institution: "asu", credential: "crna", open_entry: true,
        name: "DNP — Advanced Nursing Practice (Nurse Anesthesia)", length: null,
        format: "Doctor of Nursing Practice (nurse anesthesia).", prerequisites: [],
        admission: { entrance_exam: null, selection: "highly competitive", gpa: "3.0 (last 60 hours)", deadline: null, notes: "Requires a BSN or MSN in nursing and a current, unencumbered RN license; nurse-anesthesia programs also require critical-care (ICU) experience." },
        cost: { amount: null, basis: "ASU directs applicants to its tuition calculator.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a doctoral nurse-anesthesia program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the Arizona State Board of Nursing",
        source_url: "https://nursingandhealth.asu.edu/programs/dnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      // ---- University of Arizona (DNP specialties) ----
      {
        id: "u-arizona-fnp", institution: "u-arizona", credential: "fnp", open_entry: true,
        name: "DNP — Family Nurse Practitioner", length: "68 credits",
        format: "Doctor of Nursing Practice (online options).", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 in nursing coursework", deadline: null, notes: "Requires a BSN or MSN and a current, unencumbered RN license." },
        cost: { amount: 1053, basis: "About $1,053 per credit (68 credits) for the online DNP-FNP; academic year not stated.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://online.arizona.edu/programs/graduate/online-doctor-nursing-practice-nursing-family-nurse-practitioner-dnp",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "u-arizona-agacnp", institution: "u-arizona", credential: "agacnp", open_entry: true,
        name: "DNP — Adult-Gerontology Acute Care Nurse Practitioner", length: null,
        format: "Doctor of Nursing Practice.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 in nursing coursework", deadline: null, notes: "Requires a BSN or MSN and a current, unencumbered RN license." },
        cost: { amount: null, basis: "Per-credit tuition via UArizona (the main costs page links per-specialty details).", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.arizona.edu/academics/doctor-nursing-practice-dnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "u-arizona-pnp", institution: "u-arizona", credential: "pnp", open_entry: true,
        name: "DNP — Pediatric Nurse Practitioner", length: null,
        format: "Doctor of Nursing Practice.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 in nursing coursework", deadline: null, notes: "Requires a BSN or MSN and a current, unencumbered RN license." },
        cost: { amount: null, basis: "Per-credit tuition via UArizona.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.arizona.edu/academics/doctor-nursing-practice-dnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "u-arizona-pmhnp", institution: "u-arizona", credential: "pmhnp", open_entry: true,
        name: "DNP — Psychiatric Mental Health Nurse Practitioner", length: null,
        format: "Doctor of Nursing Practice.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 in nursing coursework", deadline: null, notes: "Requires a BSN or MSN and a current, unencumbered RN license." },
        cost: { amount: null, basis: "Per-credit tuition via UArizona.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.arizona.edu/academics/doctor-nursing-practice-dnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "u-arizona-cnm", institution: "u-arizona", credential: "cnm", open_entry: true,
        name: "DNP — Nurse-Midwifery", length: null,
        format: "Doctor of Nursing Practice (also a Nurse-Midwifery graduate certificate).", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 in nursing coursework", deadline: null, notes: "Requires a BSN or MSN and a current, unencumbered RN license." },
        cost: { amount: null, basis: "Per-credit tuition via UArizona.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://nursing.arizona.edu/academics/doctor-nursing-practice-dnp", last_verified: "2026-11-05", academic_year: "2026-27",
        notes: "The only verified nurse-midwifery program in Arizona." },
      {
        id: "u-arizona-crna", institution: "u-arizona", credential: "crna", open_entry: true,
        name: "DNP — Nurse Anesthesiology", length: "3-year, full-time hybrid program",
        format: "Online didactic with on-campus intensives in Tucson (anatomy, simulation) and clinical residency.", prerequisites: [],
        admission: { entrance_exam: null, selection: "highly competitive", gpa: "3.0 in nursing coursework (plus additional anesthesia requirements)", deadline: null, notes: "Requires a BSN or MSN and a current, unencumbered RN license; nurse-anesthesia programs also require critical-care (ICU) experience. There is no certificate option." },
        cost: { amount: null, basis: "Per-credit tuition via UArizona.", year: null },
        nclex_pass_rate: { basis: "National certification first-time pass rate (UArizona): 99% (2025), 88% (2024), 88% (2023).", by_campus: null, source_url: "https://nursing.arizona.edu/academics/doctor-nursing-practice-dnp/specialties/nurse-anesthesiology" },
        accreditation: "Council on Accreditation of Nurse Anesthesia Educational Programs (COA)",
        source_url: "https://nursing.arizona.edu/academics/doctor-nursing-practice-dnp/specialties/nurse-anesthesiology",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      // ---- NAU (MS in Nursing — Advanced Practice) ----
      {
        id: "nau-fnp", institution: "nau", credential: "fnp", open_entry: true,
        name: "MS in Nursing — Advanced Practice (Family Nurse Practitioner)", length: "48-51 credits",
        format: "Online with some blended coursework.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 in nursing coursework", deadline: null, notes: "Requires a BSN (or an ADN plus a bachelor's in another field) and a current RN license in good standing." },
        cost: { amount: null, basis: "A program fee of about $3,600/semester applies; base tuition isn't published on a nursing page.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://in.nau.edu/college-nursing/graduate-degrees-programs/ms-nursing-advanced-practice/", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "nau-pmhnp", institution: "nau", credential: "pmhnp", open_entry: true,
        name: "MS in Nursing — Advanced Practice (Psychiatric Mental Health NP)", length: "48-51 credits",
        format: "Online with some blended coursework.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 in nursing coursework", deadline: null, notes: "Requires a BSN (or an ADN plus a bachelor's in another field) and a current RN license in good standing." },
        cost: { amount: null, basis: "A program fee of about $3,600/semester applies; base tuition isn't published on a nursing page.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://in.nau.edu/college-nursing/graduate-degrees-programs/ms-nursing-advanced-practice/", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      // ---- GCU (MSN NP specialties) ----
      {
        id: "gcu-fnp", institution: "gcu", credential: "fnp", open_entry: true,
        name: "MSN — Family Nurse Practitioner", length: null,
        format: "Online with clinical placements.", prerequisites: [],
        admission: { entrance_exam: null, selection: null, gpa: "Minimum GPA, or GRE/GMAT scores", deadline: null, notes: "Requires a BSN and a current, unencumbered RN license." },
        cost: { amount: 760, basis: "About $760 per credit (online); academic year not stated.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://www.gcu.edu/degree-programs/online-degrees/fnp", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "gcu-agacnp", institution: "gcu", credential: "agacnp", open_entry: true,
        name: "MSN — Acute Care NP (Adult-Gerontology emphasis)", length: "53 credits",
        format: "Online with clinical placements.", prerequisites: [],
        admission: { entrance_exam: null, selection: null, gpa: "Minimum GPA, or GRE/GMAT scores", deadline: null, notes: "Requires a BSN, a current unencumbered RN license and at least one year of recent full-time RN experience." },
        cost: { amount: 760, basis: "About $760 per credit (online); academic year not stated.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://www.gcu.edu/degree-programs/msn-acute-care-practitioner", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "gcu-pmhnp", institution: "gcu", credential: "pmhnp", open_entry: true,
        name: "MSN — Psychiatric Mental Health Nurse Practitioner", length: null,
        format: "Online with clinical placements.", prerequisites: [],
        admission: { entrance_exam: null, selection: null, gpa: "Minimum GPA, or GRE/GMAT scores", deadline: null, notes: "Requires a BSN and a current, unencumbered RN license." },
        cost: { amount: 760, basis: "About $760 per credit (online); academic year not stated.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE)",
        source_url: "https://www.gcu.edu/degree-programs/online-degrees/nursing/np", last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },

      // ================= More community-college ADN + a private accelerated BSN (wave 2) =================
      {
        id: "arizona-western-adn", institution: "arizona-western", credential: "adn",
        name: "Associate of Applied Science (AAS) in Nursing",
        length: "2 years (5 semesters); 66 total credits",
        format: "Campus-based, Yuma (classroom, lab, clinical with some online)",
        prerequisites: [
          { course: "Freshman Composition I", code: "ENG 101", min_grade: "C" },
          { course: "Anatomy & Physiology I", code: "BIO 201", min_grade: "C" },
          { course: "Eligibility for College Mathematics", code: "MAT 142", min_grade: null }
        ],
        admission: {
          entrance_exam: "HESI A2 (75% or higher on Math, English composite and cumulative)",
          selection: "competitive 445-point ranking; top 50 offered seats (ties broken by date, then lottery)",
          gpa: "Overall 2.5 or higher",
          deadline: "March 1 for Fall; September 1 for Spring",
          notes: "A current AZ CNA/LNA is required. A PN (LPN) exit after the third semester and LPN advanced placement exist. Concurrent BSN agreements with NAU, ASU and GCU."
        },
        cost: { amount: null, basis: "Estimated ~$14,220 (AZ resident): 66 credits x $100 tuition + course fees ($1,530/sem) + books/health-safety. No single billed total published.", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (AWC published)", by_campus: { "AAS/ADN": [{ year: 2024, rate: 0.9683 }, { year: 2025, rate: 0.8830 }, { year: 2023, rate: 0.9816 }] }, source_url: "https://www.azwestern.edu/sites/default/files/programs/nursing/NCLEX_Pass_Rate_2019-2025.pdf" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Arizona State Board of Nursing",
        source_url: "https://azwestern.edu/career-and-technical-education/nursing",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "coconino-adn", institution: "coconino", credential: "adn",
        name: "Nursing (AAS Degree)",
        length: "4 semesters; minimum 89 credits (39 nursing)",
        format: "Core nursing classes in person at the Flagstaff (Fourth Street) campus; clinicals mostly Flagstaff",
        prerequisites: [
          { course: "College Composition I & II", code: "ENG 101/102", min_grade: "C" },
          { course: "College Mathematics (or higher)", code: "MAT 140", min_grade: "C" },
          { course: "Anatomy & Physiology I", code: "BIO 201", min_grade: "C" },
          { course: "Anatomy & Physiology II", code: "BIO 202", min_grade: "C" },
          { course: "Fundamental Chemistry", code: "CHM 130", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "NLN Nursing Entrance Exam (NEX) — minimum 50th percentile (TEAS no longer used)",
          selection: "competitive; no waiting list; up to 20 seats each Fall and Spring",
          gpa: "3.0 on prerequisite courses",
          deadline: "Spring 2027: September 4, 2026 (noon)",
          notes: "An AZ CNA/LNA and a Level 1 fingerprint card are required. Concurrent BSN partnership (CEP) with NAU, GCU and ASU."
        },
        cost: { amount: null, basis: "$244/credit (2026-27); no single program total is published (39 nursing credits plus prerequisites, fees and licensing costs).", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Coconino published)", by_campus: { "AAS/ADN": [{ year: 2025, rate: 0.90 }, { year: 2024, rate: 0.9630 }, { year: 2023, rate: 0.8966 }] }, source_url: "https://www.coconino.edu/info/nursing-program" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN) — initial accreditation. (Program-approval wording by the Arizona State Board of Nursing wasn't found on the pages reviewed.)",
        source_url: "https://www.coconino.edu/info/nursing-program",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "cochise-adn", institution: "cochise", credential: "adn",
        name: "Nursing, Associate of Applied Science (AAS)",
        length: "4 semesters (2 years); about 79 credits (27 prerequisite + 52 nursing)",
        format: "Lectures at the Downtown Center; labs at Douglas, Sierra Vista and Benson",
        prerequisites: [
          { course: "English Composition I", code: "ENG 101", min_grade: "C" },
          { course: "College Mathematics", code: "MAT 142", min_grade: "B" },
          { course: "Update to Pharmacology", code: "NUR 203", min_grade: "B" },
          { course: "Anatomy & Physiology I", code: "BIO 201", min_grade: "B" },
          { course: "Anatomy & Physiology II", code: "BIO 202", min_grade: "B" },
          { course: "Microbiology", code: "BIO 205", min_grade: "B" }
        ],
        admission: {
          entrance_exam: "ATI TEAS (66.1 or higher)",
          selection: "competitive entry",
          gpa: null,
          deadline: "April 30 (postmark) for fall entry",
          notes: "Science courses within 7 years (NUR 203 within 5), each with a B or better. A fingerprint clearance card is required. An LPN-to-RN bridge also exists."
        },
        cost: { amount: 14641, basis: "About $14,641 for all semesters including prerequisites (2024-25, excluding NCLEX fees); nursing tuition about $133-135/credit.", year: "2024-25" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (Cochise published)", by_campus: { "AAS/ADN": [{ year: 2025, rate: 1.00 }, { year: 2024, rate: 0.9375 }, { year: 2023, rate: 0.9104 }] }, source_url: "https://www.cochise.edu/programs/nursing-allied-health/nursing/nursing-data-research.html" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Arizona State Board of Nursing",
        source_url: "https://www.cochise.edu/programs/nursing-allied-health/nursing/index.html",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "northland-pioneer-adn", institution: "northland-pioneer", credential: "adn",
        name: "Registered Nursing (RN), AAS",
        length: "72 credits (32 general education + 40 nursing core); two years of nursing after prerequisites",
        format: "In person; Show Low (White Mountain) and Winslow (Little Colorado) campuses",
        prerequisites: [
          { course: "General Biology I", code: "BIO 181", min_grade: "C" },
          { course: "Anatomy & Physiology I & II", code: "BIO 201/202", min_grade: "C" },
          { course: "Microbiology", code: "BIO 205", min_grade: "C" },
          { course: "Fundamental Chemistry", code: "CHM 130", min_grade: "C" },
          { course: "College Composition I & II", code: "ENL 101/102", min_grade: "C" },
          { course: "Developmental Psychology", code: "PSY 240", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "HESI Admission Test (no minimum score published)",
          selection: null,
          gpa: "Cumulative 3.0 recommended (not required)",
          deadline: "Apply in the fall; prerequisites complete by July 1",
          notes: "A multiple-exit program: a current/unrestricted AZ LNA/CNA (or NAT 101) is required to enter; students can exit after year one as an LPN. LPN-to-RN (57 cr) and Paramedic-to-RN (65 cr) tracks also exist."
        },
        cost: { amount: null, basis: "Per-credit tuition (2026-27): in-district (Navajo/Apache) $75, in-state $94, out-of-state $376; plus nursing course fees (~$500 each for several courses).", year: "2026-27" },
        nclex_pass_rate: { basis: "First-time NCLEX-RN pass rate (NPC published)", by_campus: { "RN/AAS": [{ year: 2024, rate: 1.00 }, { year: 2023, rate: 0.97 }, { year: 2022, rate: 0.92 }] }, source_url: "https://www.npc.edu/rn" },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the Arizona State Board of Nursing",
        source_url: "https://www.npc.edu/rn",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" },
      {
        id: "creighton-absn", institution: "creighton", credential: "absn",
        name: "Accelerated BSN (ABSN) — Phoenix",
        length: "12 months; 58 credits",
        format: "On campus, Phoenix",
        prerequisites: [
          { course: "Human Anatomy / A&P I", code: null, min_grade: "C" },
          { course: "Human Physiology / A&P II", code: null, min_grade: "C" },
          { course: "Microbiology", code: null, min_grade: "C" },
          { course: "General Chemistry", code: null, min_grade: "C" },
          { course: "Statistics, nutrition, ethics, psychology (and others)", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None (TEAS and HESI are not required)",
          selection: "by application",
          gpa: "Cumulative 3.0 or higher",
          deadline: "August start: priority Apr 1, final May 1. January start: priority Sep 1, final Oct 1.",
          notes: "Requires a prior bachelor's degree in another field. A private Jesuit Catholic university."
        },
        cost: { amount: 55425, basis: "$55,425 for the entire program (2026-27).", year: "2026-27" },
        nclex_pass_rate: { basis: "Creighton reports a 94% overall NCLEX pass rate over the past 5 years (program-wide, not Phoenix-only).", by_campus: null, source_url: "https://www.creighton.edu/academics/programs/accelerated-bachelor-science-nursing-absn" },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); the Phoenix program is approved by the Arizona State Board of Nursing",
        source_url: "https://www.creighton.edu/academics/programs/accelerated-bachelor-science-nursing-absn",
        last_verified: "2026-11-05", academic_year: "2026-27", notes: "" }
    ],

    agreements: [
      {
        id: "yavapai-adn-to-rnbsn", name: "Continue at Yavapai (ADN -> RN-to-BSN)", type: "internal",
        from_program: "yavapai-adn", to_program: "yavapai-rnbsn",
        basis: "Same school. Yavapai's 100% online RN-to-BSN automatically accepts its own AAS graduates once they pass the NCLEX-RN and are licensed.",
        conditions: "Pass the NCLEX-RN and hold an RN license.",
        source_url: "https://www.yc.edu/v6/schools/hewe/docs/nursing/app-info-guide.pdf", last_verified: "2026-11-05"
      }
    ]
  };

  window.SCHOOLS = window.SCHOOLS || {};
  window.SCHOOLS.AZ = AZ;
})();
