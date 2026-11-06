// California school, program and transfer data for the Schools page.
// Same format and rules as co.js / az.js (see docs/SCHOOLS_SPEC.md and CLAUDE.md): every record carries
// source_url + last_verified; unknown values are null (the page says "Not published / Check with the
// school"); credential values reuse the career map's role ids; open_entry:true marks a program that
// admits anyone holding the prior credential.
//
// California notes:
//  - Authoritative spines: the California Board of Registered Nursing (BRN) approved prelicensure-program
//    list (rn.ca.gov/education/rnprograms.shtml) says which programs are legitimate, and the BRN's
//    by-school first-time NCLEX pass-rate table (rn.ca.gov/education/passrates.shtml) supplies the
//    outcomes stored on each program. ASSIST.org governs community-college -> CSU/UC course transfer.
//  - California is NOT a Nurse Licensure Compact state. A nurse moving to or from California applies for
//    licensure by endorsement (the Schools page's cross-state hand-off already states this). California
//    RN-to-BSN programs here require a California RN license, and several online ones admit California
//    residents only — noted on each card.
//  - Deliberately excluded (per SCHOOLS_SPEC scope — private for-profit / unaccredited chains): West Coast
//    University, Chamberlain, Carrington, Unitek, Stanbridge, Gurnick, Arizona College of Nursing, etc.;
//    University of Phoenix (not enrolling) and UMass Global (closing). SDSU's Accelerated 2nd-Bachelor's
//    (ASBSN) is omitted for now because its own page says it is still pending BRN approval and CCNE
//    accreditation. SF State's concurrent "ADN-BSN" collaborative (dual community-college + SFSU model)
//    is not yet included as a routable program.
//  - Built in verified waves. Wave 1 (this file): the CSU BSN backbone (Long Beach, San Diego State,
//    Sacramento, San Francisco State, Fullerton), three community-college ADNs (City College of SF,
//    San Diego City, Pasadena), one entry-level master's (SF State), and five RN-to-BSN completions
//    (CSULB, SDSU, Sac State, Dominguez Hills, Fullerton). UC campuses, more community colleges, private
//    universities and the APRN / CRNA / CNM specialties come in later waves.
//
// All facts verified 2026-11-06 from each institution's own website and the BRN. See docs/DATA_SOURCES.md.

(function () {
  const CA = {
    state: "CA",
    updated: "2026-11-06",

    institutions: [
      { id: "csulb", name: "California State University, Long Beach", type: "public_university", city: "Long Beach", campuses: ["Long Beach"], url: "https://www.csulb.edu/college-of-health-human-services/school-of-nursing", source_url: "https://www.csulb.edu/college-of-health-human-services/school-of-nursing/bsn-program", last_verified: "2026-11-06" },
      { id: "sdsu", name: "San Diego State University", type: "public_university", city: "San Diego", campuses: ["San Diego"], url: "https://nursing.sdsu.edu/", source_url: "https://nursing.sdsu.edu/about/accreditation", last_verified: "2026-11-06" },
      { id: "csus", name: "California State University, Sacramento (Sacramento State)", type: "public_university", city: "Sacramento", campuses: ["Sacramento"], url: "https://www.csus.edu/college/health-human-services/nursing/", source_url: "https://www.csus.edu/college/health-human-services/nursing/", last_verified: "2026-11-06" },
      { id: "csudh", name: "California State University, Dominguez Hills", type: "public_university", city: "Carson", campuses: ["Carson", "Online (statewide; California residents)"], url: "https://www.csudh.edu/son", source_url: "https://www.csudh.edu/son/about", last_verified: "2026-11-06" },
      { id: "sfsu", name: "San Francisco State University", type: "public_university", city: "San Francisco", campuses: ["San Francisco"], url: "https://www.nursing.sfsu.edu/", source_url: "https://www.nursing.sfsu.edu/", last_verified: "2026-11-06" },
      { id: "csuf", name: "California State University, Fullerton", type: "public_university", city: "Fullerton", campuses: ["Fullerton"], url: "https://nursing.fullerton.edu/", source_url: "https://nursing.fullerton.edu/about/accreditation.html", last_verified: "2026-11-06" },
      { id: "ccsf", name: "City College of San Francisco", type: "community_college", city: "San Francisco", campuses: ["Ocean Campus (San Francisco)"], url: "https://www.ccsf.edu/degrees-certificates/registered-nursing", source_url: "https://www.ccsf.edu/academics/schools/allied-health-physical-education-social-services/registered-nursing-department/rn-program-admissions", last_verified: "2026-11-06" },
      { id: "sdcity", name: "San Diego City College", type: "community_college", city: "San Diego", campuses: ["San Diego"], url: "https://www.sdcity.edu/academics/schools-programs/math-sci-nurse/nursing/index.aspx", source_url: "https://www.sdcity.edu/academics/schools-programs/math-sci-nurse/nursing/index.aspx", last_verified: "2026-11-06" },
      { id: "pasadena-cc", name: "Pasadena City College", type: "community_college", city: "Pasadena", campuses: ["Pasadena (Foothill Campus)"], url: "https://pasadena.edu/academics/divisions/health-sciences/nursing-programs/rn/", source_url: "https://pasadena.edu/academics/divisions/health-sciences/nursing-programs/rn/", last_verified: "2026-11-06" }
    ],

    programs: [
      // ================= Community-college ADN (makes RNs) — the starting schools =================
      {
        id: "ccsf-adn", institution: "ccsf", credential: "adn",
        name: "Registered Nursing (Associate Degree in Nursing, AS)",
        length: "2 years (4 nursing semesters) after prerequisites",
        format: "In person, Ocean Campus (San Francisco); classroom, skills lab and hospital clinical",
        prerequisites: [
          { course: "General Human Anatomy (+lab)", code: "BIO 108", min_grade: "C" },
          { course: "Introduction to Human Physiology (+lab)", code: "BIO 111 or 112", min_grade: "C" },
          { course: "Introduction to Microbiology (+lab)", code: "BIO 120", min_grade: "C" },
          { course: "Academic Reading and Writing", code: "ENGL C1000", min_grade: "C" },
          { course: "Math 60 or higher, or Statistics", code: "MATH 60 / STAT", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS Version 7 (overall composite 62% or higher; the first two attempts are considered)",
          selection: "Multi-criteria screening plus a lottery",
          gpa: "2.5 overall in Anatomy, Physiology, Microbiology and English; C or better in each required prerequisite",
          deadline: "Apply once a year: Jan 9 - Feb 20, 2026 for the 2026-27 cohort",
          notes: "Anatomy, Physiology and Microbiology must be within 7 years. A separate RN-program application is required beyond CCSF admission; background check, drug screen and health exam apply. Group B courses (sociology or anthropology, psychology, oral communication) are required for graduation. Chemistry is no longer a listed prerequisite."
        },
        cost: { amount: null, basis: "California's community-college enrollment fee is $46/credit for state residents; CCSF doesn't publish a single program total. A 2021 handout estimated several hundred to a few thousand dollars for fees, books, background check, CPR, immunizations and supplies.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table)",
          by_campus: { "ADN": [{ year: "2024-25", rate: 0.9221 }, { year: "2023-24", rate: 1.00 }, { year: "2022-23", rate: 0.8462 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Approved by the California Board of Registered Nursing. CCSF's accessible nursing pages don't state ACEN or CCNE accreditation (board approval only).",
        source_url: "https://www.ccsf.edu/academics/schools/allied-health-physical-education-social-services/registered-nursing-department/rn-program-admissions",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "sdcity-adn", institution: "sdcity", credential: "adn",
        name: "Associate Degree Nursing (Generic RN), AS",
        length: "2 years (nursing courses run in 8-week blocks; summers off)",
        format: "In person, San Diego City College; campus lab plus hospital/agency clinical",
        prerequisites: [
          { course: "Human Anatomy (+lab)", code: "BIO 230", min_grade: "C" },
          { course: "Human Physiology (+lab)", code: "BIO 235", min_grade: "C" },
          { course: "Microbiology (+lab)", code: "BIO 205", min_grade: "C" },
          { course: "English Composition", code: "ENGL C1000", min_grade: "C" },
          { course: "Statistics", code: "STAT C1000 (or PSYC 258)", min_grade: "C" },
          { course: "General Psychology", code: "PSYC C1000", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS Version 7 (overall 62% or higher to apply)",
          selection: "Multi-criteria 100-point screen plus a lottery (applicants who meet the minimum with 75 points enter the lottery)",
          gpa: "2.5 in the three sciences and 2.5 in the general-education set",
          deadline: "One Fall cohort; the application window is posted on the program website",
          notes: "No recency requirement on the sciences (as of 2024). American Heart Association CPR is required for admission; a CNA/LVN or healthcare experience earns points but isn't required. No letters of recommendation. Not currently accepting transfers from other nursing programs."
        },
        cost: { amount: null, basis: "The program estimates about $8,000-$10,000 total over the two years for uniforms, books, supplies, ATI, testing, background check and health requirements. California's community-college enrollment fee ($46/credit for residents) applies separately.", year: "2026" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table). The 2024-25 period had only 1 test-taker, so the 2023-24 figure is the meaningful recent rate.",
          by_campus: { "ADN": [{ year: "2023-24", rate: 1.00 }, { year: "2022-23", rate: 1.00 }, { year: "2021-22", rate: 0.9841 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the California Board of Registered Nursing",
        source_url: "https://www.sdcity.edu/academics/schools-programs/math-sci-nurse/nursing/index.aspx",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "pasadena-cc-adn", institution: "pasadena-cc", credential: "adn",
        name: "Registered Nursing (Associate in Science, ADN)",
        length: "Nursing courses in 4 semesters (about 2 years), plus any remaining degree requirements",
        format: "In person, Foothill Campus (Pasadena); campus plus clinical",
        prerequisites: [
          { course: "English Composition", code: "ENGL C1000", min_grade: "C" },
          { course: "Human Anatomy (+lab)", code: "ANAT 025", min_grade: "C" },
          { course: "Human Physiology (+lab)", code: "PHYO 001", min_grade: "C" },
          { course: "Microbiology (+lab)", code: "MICR 002", min_grade: "C" },
          { course: "Chemistry (Chem 002A preferred; Chem 22 or 1A accepted)", code: "CHEM 002A", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS 7 (minimum score 62 to apply)",
          selection: "Multi-criteria 100-point screen; ties broken by random selection (lottery). About 28-32 admitted per cycle from 400-600 applications; admitted scores typically 75-90",
          gpa: "Minimum 2.5 across English, Anatomy, Physiology, Chemistry and Microbiology",
          deadline: "Apr 1 - Apr 15 for Fall; Aug 1 - Aug 15 for Spring (no late materials)",
          notes: "Additional BRN-required courses (nutrition, psychology, sociology, communication, statistics and a critical-thinking course) must be C or better. A Social Security number is required for admission; health clearances and a drug screen apply."
        },
        cost: { amount: null, basis: "California's community-college enrollment fee ($46/credit for residents) applies; Pasadena doesn't publish a single program total on the nursing pages.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table)",
          by_campus: { "ADN": [{ year: "2024-25", rate: 0.9425 }, { year: "2023-24", rate: 0.9815 }, { year: "2022-23", rate: 0.9091 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Approved by the California Board of Registered Nursing. ACEN candidate for initial accreditation (candidacy as published expired 2026-03-18; the college's pages don't confirm the current status — confirm with the school).",
        source_url: "https://pasadena.edu/academics/divisions/health-sciences/nursing-programs/rn/admissions.php",
        last_verified: "2026-11-06", academic_year: "2026-27",
        notes: "ACEN status is shown as published (candidate), not resolved by guessing."
      },

      // ================= University pre-licensure BSN / Accelerated BSN / Entry-Level Master's =================
      {
        id: "csulb-bsn", institution: "csulb", credential: "bsn",
        name: "Bachelor of Science in Nursing (pre-licensure)",
        length: "5 semesters of full-time study",
        format: "In person, Long Beach campus",
        prerequisites: [
          { course: "Human Anatomy (lecture + lab)", code: "BIO 208", min_grade: "C" },
          { course: "Human Physiology (lecture + lab)", code: "BIO 207", min_grade: "C" },
          { course: "Chemistry (lecture + lab)", code: "CHEM 111A/111B/140 (or equiv.)", min_grade: "C" },
          { course: "Microbiology (lecture + lab)", code: "BIO 201", min_grade: "C" },
          { course: "Statistics", code: "STAT 108/118 (or equiv.)", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "Casper (CSP-10100 Undergraduate Health Sciences situational-judgment test) — not TEAS/HESI",
          selection: "Competitive, ranked; the top 125 are invited to a communication exercise, and not all qualified applicants are invited",
          gpa: "Cumulative 3.25 minimum; prerequisite GPA 3.0; C or better in each prerequisite",
          deadline: "Fall: Cal State Apply Aug 1 - Nov 30, nursing application Oct 1 - Feb 1. Spring: Cal State Apply Jul 1 - Aug 31, nursing application Jul 1 - Sep 21",
          notes: "Requires CSU admission plus a separate School of Nursing BSN application. Oral/written communication and critical-thinking general-education courses are also required. Background check, drug test, immunizations and BLS certification on admission."
        },
        cost: { amount: null, basis: "Standard CSU tuition and fees apply; no single program figure is published on the nursing pages.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table)",
          by_campus: { "BSN": [{ year: "2024-25", rate: 0.9882 }, { year: "2023-24", rate: 1.00 }, { year: "2022-23", rate: 0.975 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); listed on the California BRN's approved prelicensure-program list",
        source_url: "https://www.csulb.edu/college-of-health-human-services/school-of-nursing/bsn-program",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "sdsu-bsn", institution: "sdsu", credential: "bsn",
        name: "Bachelor of Science in Nursing (pre-licensure)",
        length: null,
        format: "In person, San Diego campus (direct-entry freshman and transfer paths lead to the same pre-licensure BS)",
        prerequisites: [
          { course: "Human Anatomy (+lab)", code: null, min_grade: "C" },
          { course: "Human Physiology (+lab)", code: null, min_grade: "C" },
          { course: "Microbiology (+lab)", code: null, min_grade: "C" },
          { course: "Chemistry", code: null, min_grade: "C" },
          { course: "Statistics", code: null, min_grade: "C" },
          { course: "Oral + Written Communication and Critical Thinking", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS (minimum individual score 80%; HESI not accepted)",
          selection: "80-point ranking system; no letters, statements or volunteer service considered. Transfer applicants need 60+ transferable units; second-bachelor's applicants compete in the traditional program",
          gpa: "Cumulative below 3.20 is not eligible; a prerequisite GPA below 3.00 earns no points",
          deadline: "Fall 2027: apply via Cal State Apply Oct 1 - Nov 30, 2026 (the detailed points criteria currently posted are from the closed Fall 2026 cycle and may be updated for Fall 2027)",
          notes: "Prerequisites can't be taken credit/no-credit (unless satisfied by AP). The separate freshman 'Direct Entry' path requires a 3.0 A-G GPA and a B in intermediate algebra, biology and chemistry."
        },
        cost: { amount: null, basis: "Standard CSU tuition and fees apply; no single program figure is published on the program pages.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table)",
          by_campus: { "BSN": [{ year: "2024-25", rate: 0.9104 }, { year: "2023-24", rate: 0.9554 }, { year: "2022-23", rate: 0.884 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing (stated on SDSU's accreditation page)",
        source_url: "https://nursing.sdsu.edu/academics/undergraduate/transfer",
        last_verified: "2026-11-06", academic_year: "2026-27",
        notes: "Program length and delivery format aren't published on SDSU's accessible pages."
      },
      {
        id: "csus-bsn", institution: "csus", credential: "bsn",
        name: "Traditional (Pre-Licensure) BSN",
        length: null,
        format: "In person, Sacramento campus",
        prerequisites: [
          { course: "Human Anatomy or A&P I (+lab)", code: null, min_grade: "C-" },
          { course: "Human Physiology or A&P II (+lab)", code: null, min_grade: "C-" },
          { course: "Microbiology (+lab)", code: null, min_grade: "C-" },
          { course: "Chemistry", code: null, min_grade: "C-" },
          { course: "Statistics", code: null, min_grade: "C-" },
          { course: "Written, Oral and Critical-Thinking communication", code: null, min_grade: "C-" }
        ],
        admission: {
          entrance_exam: "ATI TEAS (minimum 75%) — Casper and SAT are no longer used",
          selection: "Points-based ranking (minimum 60 points to apply; maximum stated inconsistently as 84 vs 88 on the page). Up to 80 students admitted each semester",
          gpa: "Science GPA 3.0 and Nursing GPA 3.3 across the eight prerequisites and four co-requisites",
          deadline: "Fall: university app Oct 1 - Nov 30, supplemental Feb 1 - Mar 1. Spring: university app Jul 1 - Sep 15, supplemental Sep 1 - Oct 1",
          notes: "California residency is required (the program is impacted). Two-step application (Cal State Apply, then a School of Nursing supplemental). A $35 evaluation fee applies."
        },
        cost: { amount: null, basis: "Standard CSU tuition and fees apply; no single program figure is published (a $35 non-refundable BSN evaluation fee is stated).", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table)",
          by_campus: { "BSN": [{ year: "2024-25", rate: 0.9662 }, { year: "2023-24", rate: 0.9778 }, { year: "2022-23", rate: 0.9485 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); listed on the California BRN's approved prelicensure-program list",
        source_url: "https://www.csus.edu/college/health-human-services/nursing/traditional.html",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "sfsu-bsn", institution: "sfsu", credential: "bsn",
        name: "Bachelor of Science in Nursing (pre-licensure)",
        length: "2 years",
        format: "In person, San Francisco (Burk Hall)",
        prerequisites: [
          { course: "Human Anatomy (+lab)", code: "BIOL 220", min_grade: "C" },
          { course: "Human Physiology (+lab)", code: "BIOL 212/213", min_grade: "C" },
          { course: "Survey of Chemistry (+lab)", code: "CHEM 101/102", min_grade: "C" },
          { course: "General Microbiology (+lab)", code: "BIOL 210/211", min_grade: "C" },
          { course: "Statistics", code: "MATH 124", min_grade: null }
        ],
        admission: {
          entrance_exam: "ATI TEAS (score 78 or higher, within three attempts)",
          selection: "Impacted since 1992; typically 1,000+ applications for about 60 seats a year. California residents / in-state-eligible only; no international or visa applicants",
          gpa: "Minimum prerequisite GPA 3.0 (four sciences plus statistics)",
          deadline: "Fall: Cal State Apply Oct 1 - Jan 18, NursingCAS Dec 1 - Jan 18. Spring: Cal State Apply & NursingCAS Aug 1 - Sep 7",
          notes: "First-degree applicants only (second-degree applicants are directed to the Entry-Level Master's). Sciences must be within 7 years and can't be credit/no-credit. Applies via Cal State Apply plus a NursingCAS supplemental."
        },
        cost: { amount: null, basis: "Standard CSU tuition and fees apply; no single program figure is published on the program page.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, BSN (California BRN school pass-rate table)",
          by_campus: { "BSN": [{ year: "2024-25", rate: 0.8182 }, { year: "2023-24", rate: 0.9574 }, { year: "2022-23", rate: 0.8544 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); listed on the California BRN's approved prelicensure-program list",
        source_url: "https://www.nursing.sfsu.edu/bsn",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "sfsu-demsn", institution: "sfsu", credential: "demsn",
        name: "Entry-Level Master's (ELM) — MS in Nursing for non-nurses",
        length: "6 semesters (NCLEX-RN eligible after 4 semesters)",
        format: "In person, San Francisco (Burk Hall)",
        prerequisites: [
          { course: "Human Anatomy (+lab)", code: "BIOL 220", min_grade: "C" },
          { course: "Human Physiology (+lab)", code: "BIOL 212/213", min_grade: "C" },
          { course: "Survey of Chemistry (+lab)", code: "CHEM 101/102", min_grade: "C" },
          { course: "General Microbiology (+lab)", code: "BIOL 210/211", min_grade: "C" },
          { course: "Statistics", code: "MATH 124", min_grade: null }
        ],
        admission: {
          entrance_exam: null,
          selection: "Impacted; California residents / in-state-eligible only; no international or visa applicants",
          gpa: "3.0 or above in the last 60 semester units",
          deadline: "Cal State Apply Oct 1 - Feb 1; NursingCAS Dec 15 - Feb 1",
          notes: "Requires a bachelor's degree in another field. Health-related work or volunteer experience, a personal statement and three letters of recommendation are required; a clinical-nurse-specialist emphasis is chosen at application. Graduates sit for the NCLEX-RN."
        },
        cost: { amount: null, basis: "Standard CSU tuition and fees apply; no single program figure is published on the program page.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, entry-level master's (California BRN school pass-rate table)",
          by_campus: { "ELM/MSN": [{ year: "2024-25", rate: 0.7391 }, { year: "2023-24", rate: 0.7727 }, { year: "2022-23", rate: 0.775 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); listed on the California BRN's approved entry-level master's program list",
        source_url: "https://www.nursing.sfsu.edu/elmsn",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "csuf-bsn", institution: "csuf", credential: "bsn",
        name: "Traditional BSN (pre-licensure, first-time freshman pathway)",
        length: "8 semesters (4 years) or 10 semesters (5 years), full-time cohort",
        format: "In person, Fullerton; clinicals within 50 miles of campus",
        prerequisites: [
          { course: "Prerequisite course list isn't published for this freshman pathway (science prerequisites need a B-, non-sciences a C)", code: null, min_grade: null }
        ],
        admission: {
          entrance_exam: "None — TEAS and HESI are not required or accepted for this pathway",
          selection: "Impacted, highly competitive, holistic; 40 new students a year; fall admission only. California residents only; transfers and international applicants are not accepted (this is the freshman-entry pathway)",
          gpa: "Admission minimum GPA isn't published; to keep major status after admission, 3.0 cumulative and 3.0 prerequisite GPA",
          deadline: "Cal State Apply, Aug 1 - Nov 30 each year",
          notes: "For students coming directly from high school (A-G coursework; SAT/ACT not required). A Social Security number or ITIN is required for the background check and California RN licensure. Second-degree students use the Accelerated BSN instead."
        },
        cost: { amount: null, basis: "Standard CSU tuition and fees apply; no single program figure is published on the program pages.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, CSU Fullerton (California BRN school pass-rate table)",
          by_campus: { "BSN": [{ year: "2024-25", rate: 0.9487 }, { year: "2023-24", rate: 0.9853 }, { year: "2022-23", rate: 0.9688 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); prelicensure pathways approved by the California Board of Registered Nursing",
        source_url: "https://nursing.fullerton.edu/programs/elfreshmen/admissionreq.html",
        last_verified: "2026-11-06", academic_year: "2026-27",
        notes: "This is the freshman-entry pathway; career changers with a prior degree use the Accelerated BSN."
      },
      {
        id: "csuf-absn", institution: "csuf", credential: "absn",
        name: "Accelerated BSN (second-degree, pre-licensure)",
        length: null,
        format: "In person, Fullerton",
        prerequisites: [
          { course: "Human Anatomy (+lab)", code: null, min_grade: "B" },
          { course: "Human Physiology (+lab)", code: null, min_grade: "B" },
          { course: "Microbiology (+lab)", code: null, min_grade: "B" },
          { course: "Chemistry (general/inorganic/organic/integrated, +lab)", code: null, min_grade: "B" },
          { course: "Statistics", code: null, min_grade: "C" },
          { course: "Introductory Psychology", code: null, min_grade: "C" },
          { course: "Introductory Sociology or Cultural Anthropology", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "Casper situational-judgment test (required); TEAS not accepted",
          selection: "Impacted, holistic; California residents only",
          gpa: "At least 3.25 in the most recent 60 semester units of graded transferable coursework",
          deadline: "Fall 2027 admission (Cal State Apply); prerequisites complete by end of Fall 2026 (the Casper deadline is on a separate dates-and-fees page)",
          notes: "Requires a prior bachelor's in any field from a regionally accredited institution. Science prerequisites need a B and must be within 5 years. English composition, critical thinking and oral communication are waived for second-degree applicants."
        },
        cost: { amount: null, basis: "No single program figure is published on the program pages; standard CSU tuition and fees apply.", year: null },
        nclex_pass_rate: {
          basis: "The California BRN lists one CSU Fullerton first-time NCLEX figure (see the Traditional BSN); a separate Accelerated-only rate isn't broken out here.",
          by_campus: null,
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); prelicensure pathways approved by the California Board of Registered Nursing",
        source_url: "https://nursing.fullerton.edu/programs/acceleratedbsn/admissionreq.html",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },

      // ================= RN-to-BSN completions (open to any accredited ADN + California RN license) =================
      {
        id: "csulb-rnbsn", institution: "csulb", credential: "rnbsn", open_entry: true,
        name: "Online RN-to-BSN",
        length: "12-18 months",
        format: "Fully online (asynchronous); a community-health course includes about 90 clinical hours near the student",
        prerequisites: [],
        admission: {
          entrance_exam: null, selection: null, gpa: "Minimum 2.75 GPA in required ADN coursework",
          deadline: "Dates stated inconsistently on the page (one says opens Jul 1, 2026 / deadline Sep 30, 2026; another Oct 1, 2026 - Apr 1, 2027) — confirm with the school",
          notes: "Requires California residency, an active unrestricted California RN license (NCLEX-RN passed), and graduation from an accredited ADN program. Required sciences and a statistics course with a C or better. Offered through CSULB's College of Professional and Continuing Education."
        },
        cost: { amount: 600, basis: "$600 per credit; the 26-credit program totals about $15,600 (the page also cites an approximate $17,000 total), 2026-27, subject to change.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a bachelor's-completion program for licensed nurses.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE) — CSULB's BSN programs are CCNE-accredited",
        source_url: "https://www.cpace.csulb.edu/courses/bachelor-of-science-in-nursing-online-rn-to-bsn",
        last_verified: "2026-11-06", academic_year: "2026-27",
        notes: "Online enrollment is limited to California residents, and a California RN license is required."
      },
      {
        id: "sdsu-rnbsn", institution: "sdsu", credential: "rnbsn", open_entry: true,
        name: "RN-to-BS (bachelor's completion)",
        length: "8 to 15 months (6-12 months for second-degree students)",
        format: "Hybrid, mostly online; a 90-hour community-health clinical is done in person at an assigned site",
        prerequisites: [],
        admission: {
          entrance_exam: null, selection: "A competitive selection applies when applications exceed spaces", gpa: "Cumulative 3.0 or higher",
          deadline: "Fall 2027: open Aug 1, submit by Oct 1, deadline Nov 30. Spring filing Aug 1 - Sep 15",
          notes: "For registered nurses with an ADN or diploma from an institutionally accredited nursing program (may start with RN licensure pending the NCLEX). 120 total units; up to 70 transferred from the ADN; 18 units credited after passing the NCLEX."
        },
        cost: { amount: null, basis: "The program cites an approximate tuition of $15,000; see SDSU's tuition and fee schedule.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a bachelor's-completion program for licensed nurses.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://nursing.sdsu.edu/academics/undergraduate/rn-program-overview",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "csus-rnbsn", institution: "csus", credential: "rnbsn", open_entry: true,
        name: "RN to BSN (for students who hold an RN license)",
        length: "120 total units (44 nursing units; at least 30 units in residence at Sac State)",
        format: null,
        prerequisites: [],
        admission: {
          entrance_exam: null, selection: "A competitive selection applies when applications exceed spaces", gpa: "Cumulative GPA 2.6 (last 60 semester units of graded transferable work)",
          deadline: "Fall: Jan 1 - Jun 1. Spring: Aug 1 - Nov 1 (strictly enforced)",
          notes: "Requires a valid California RN license before the second semester and California residency. Prerequisite sciences, chemistry, communication and statistics with a C or better (may be in progress at admission). A $35 evaluation fee applies."
        },
        cost: { amount: null, basis: "Standard CSU tuition and fees apply; no single program figure is published (a $35 RN-BSN evaluation fee is stated).", year: null },
        nclex_pass_rate: { basis: "Not applicable — a bachelor's-completion program for licensed nurses.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE) — Sac State's baccalaureate nursing program is CCNE-accredited",
        source_url: "https://www.csus.edu/college/health-human-services/nursing/rn-to-bsn.html",
        last_verified: "2026-11-06", academic_year: "2026-27",
        notes: "Requires a California RN license and California residency."
      },
      {
        id: "csudh-rnbsn", institution: "csudh", credential: "rnbsn", open_entry: true,
        name: "RN-to-BSN (online)",
        length: null,
        format: "Online (statewide, California residents only); a health-assessment course meets by Zoom and a community-health course requires clinical hours in the student's area",
        prerequisites: [],
        admission: {
          entrance_exam: null, selection: "Must meet both university and School of Nursing requirements; 60+ transferable units (max 70 from community colleges)", gpa: "Overall 2.0 for university admission; second-bachelor's applicants need 2.5 from the first degree",
          deadline: "Spring: Jul 1 - Nov 1. Fall: Aug 1 - Jun 1 (Cal State Apply; nursing major code 12031; $70 fee)",
          notes: "Open to graduates of any regionally accredited ADN program who hold an active, unencumbered California RN license (first-time NCLEX takers may start before passing; licensure is required before clinical courses). Online enrollment is restricted to California residents. Prerequisites, including the CSU 'Golden Four' plus sciences, must be complete before applying."
        },
        cost: { amount: null, basis: "Per-credit tuition isn't published on the RN-BSN pages (a $70 Cal State Apply fee is stated).", year: null },
        nclex_pass_rate: { basis: "Not applicable — a bachelor's-completion program for licensed nurses.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE) — CSUDH's BSN, MSN and post-graduate APRN certificates are CCNE-accredited",
        source_url: "https://www.csudh.edu/son/programs/rn-bsn/admission",
        last_verified: "2026-11-06", academic_year: "2026-27",
        notes: "Online enrollment is limited to California residents, and an active California RN license is required."
      },
      {
        id: "csuf-rnbsn", institution: "csuf", credential: "rnbsn", open_entry: true,
        name: "RN-BSN (post-licensure)",
        length: "Full-time plan is 2 semesters",
        format: "Campus-based and distance (online) options",
        prerequisites: [],
        admission: {
          entrance_exam: null, selection: "Not impacted — all qualified applicants can be admitted", gpa: "2.75 cumulative (or 2.75 in the last 60 units for post-baccalaureate applicants)",
          deadline: "Not published on the page (Cal State Apply)",
          notes: "Requires an ADN or equivalent from a regionally accredited institution plus a current unencumbered California RN license or eligibility (full-time students must obtain the California RN license within the first semester). Sciences, chemistry, statistics and college math with a C or better; communication and critical-thinking courses are waived for post-baccalaureate applicants."
        },
        cost: { amount: null, basis: "No single program figure is published on the program pages; standard CSU tuition and fees apply.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a bachelor's-completion program for licensed nurses.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://nursing.fullerton.edu/programs/rnbsn/admissionreq.html",
        last_verified: "2026-11-06", academic_year: "2026-27",
        notes: "Requires a California RN license (or licensure within the first semester)."
      }
    ],

    // No same-school ADN -> RN-to-BSN steps in wave 1: the community-college ADNs here are ADN-only, and
    // the universities' RN-to-BSN programs are open_entry completions the route reaches across schools.
    agreements: []
  };

  window.SCHOOLS = window.SCHOOLS || {};
  window.SCHOOLS.CA = CA;
})();
