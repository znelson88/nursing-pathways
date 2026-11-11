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
//  - Added 2026-11-06: California State University, Fresno ("Fresno State") — pre-licensure BSN, RN-to-BSN
//    and the MSN Family NP option. (Fresno City College, the community-college ADN, was already included.)
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
      { id: "pasadena-cc", name: "Pasadena City College", type: "community_college", city: "Pasadena", campuses: ["Pasadena (Foothill Campus)"], url: "https://pasadena.edu/academics/divisions/health-sciences/nursing-programs/rn/", source_url: "https://pasadena.edu/academics/divisions/health-sciences/nursing-programs/rn/", last_verified: "2026-11-06" },

      // ---- Wave 2 institutions (UC + private universities + more community colleges) ----
      { id: "ucla", name: "University of California, Los Angeles (Joe C. Wen School of Nursing)", type: "public_university", city: "Los Angeles", campuses: ["Los Angeles (Westwood)"], url: "https://www.nursing.ucla.edu/", source_url: "https://nursing.ucla.edu/admissions-programs/academic-programs", last_verified: "2026-11-06" },
      { id: "uci", name: "University of California, Irvine (Sue & Bill Gross School of Nursing)", type: "public_university", city: "Irvine", campuses: ["Irvine"], url: "https://nursing.uci.edu/", source_url: "https://nursing.uci.edu/degrees-and-programs/", last_verified: "2026-11-06" },
      { id: "ucsf", name: "University of California, San Francisco (School of Nursing)", type: "public_university", city: "San Francisco", campuses: ["San Francisco (Mission Bay / Parnassus)"], url: "https://nursing.ucsf.edu/", source_url: "https://graduate.ucsf.edu/academics/professional-doctorates/dnp", last_verified: "2026-11-06" },
      { id: "uc-davis", name: "University of California, Davis (Betty Irene Moore School of Nursing)", type: "public_university", city: "Sacramento", campuses: ["Sacramento"], url: "https://health.ucdavis.edu/nursing/", source_url: "https://health.ucdavis.edu/nursing/academics/Accreditation.html", last_verified: "2026-11-06" },
      { id: "samuel-merritt", name: "Samuel Merritt University", type: "private_nonprofit", city: "Oakland", campuses: ["Oakland", "Sacramento", "San Francisco Peninsula (Foster City)", "Fresno", "Online"], url: "https://www.samuelmerritt.edu/colleges/college-nursing", source_url: "https://www.samuelmerritt.edu/college-nursing/bachelor-science-nursing", last_verified: "2026-11-06" },
      { id: "loma-linda", name: "Loma Linda University (School of Nursing)", type: "private_nonprofit", city: "Loma Linda", campuses: ["Loma Linda", "Murrieta (Entry-Level MS)"], url: "https://nursing.llu.edu/", source_url: "https://nursing.llu.edu/programs", last_verified: "2026-11-06" },
      { id: "usf", name: "University of San Francisco (School of Nursing and Health Professions)", type: "private_nonprofit", city: "San Francisco", campuses: ["San Francisco (Hilltop)", "Sacramento"], url: "https://www.usfca.edu/nursing", source_url: "https://www.usfca.edu/nursing/programs/undergraduate/nursing", last_verified: "2026-11-06" },
      { id: "usd", name: "University of San Diego (Hahn School of Nursing and Health Science)", type: "private_nonprofit", city: "San Diego", campuses: ["San Diego"], url: "https://www.sandiego.edu/nursing/", source_url: "https://graduate.catalog.sandiego.edu/academics/collegeandschools/nursingandhealth", last_verified: "2026-11-06" },
      { id: "azusa-pacific", name: "Azusa Pacific University (School of Nursing)", type: "private_nonprofit", city: "Azusa", campuses: ["Azusa", "Inland Empire", "San Diego", "Online"], url: "https://www.apu.edu/nursing/", source_url: "https://www.apu.edu/programs/bsn/", last_verified: "2026-11-06" },
      { id: "santa-rosa-jc", name: "Santa Rosa Junior College", type: "community_college", city: "Santa Rosa", campuses: ["Santa Rosa"], url: "https://adn.santarosa.edu/", source_url: "https://adn.santarosa.edu/getting-started", last_verified: "2026-11-06" },
      { id: "sacramento-city", name: "Sacramento City College", type: "community_college", city: "Sacramento", campuses: ["Sacramento"], url: "https://scc.losrios.edu/nursing", source_url: "https://scc.losrios.edu/academics/nursing-program-details/rn-program-details-and-application-requirements", last_verified: "2026-11-06" },
      { id: "fresno-city", name: "Fresno City College", type: "community_college", city: "Fresno", campuses: ["Fresno"], url: "https://www.fresnocitycollege.edu/academics/guided-pathways/healthcare-wellness/programs/nursing.html", source_url: "https://www.fresnocitycollege.edu/academics/divisions/apa-division/registered-nursing/rn-apply.html", last_verified: "2026-11-06" },
      { id: "mt-sac", name: "Mt. San Antonio College", type: "community_college", city: "Walnut", campuses: ["Walnut"], url: "https://www.mtsac.edu/nursing/adnprogram.html", source_url: "https://catalog.mtsac.edu/programs/programsaz/nursing/licensed-nursing-registered-nursing-rn-generic-option-degree/", last_verified: "2026-11-06" },
      { id: "riverside-city", name: "Riverside City College", type: "community_college", city: "Riverside", campuses: ["Riverside"], url: "https://www.rcc.edu/programs/nursing.html", source_url: "https://www.rcc.edu/assets/documents/pathways/health-related-science/nursing/ADN%20InfoSheet.pdf", last_verified: "2026-11-06" },

      // ---- Added 2026-11-06: California State University, Fresno (Fresno State). Fresno City College (ADN) is a separate institution above. ----
      { id: "csu-fresno", name: "California State University, Fresno (Fresno State)", type: "public_university", city: "Fresno", campuses: ["Fresno"], url: "https://chhs.fresnostate.edu/nursing/", source_url: "https://www.rn.ca.gov/education/rnprograms.shtml", last_verified: "2026-11-06" }
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
      {
        id: "csu-fresno-bsn", institution: "csu-fresno", credential: "bsn",
        name: "Bachelor of Science in Nursing (pre-licensure)",
        length: "Five-semester nursing sequence; the degree requires a minimum of 120 semester units",
        format: null,
        prerequisites: [
          { course: "Oral Communication (GE A1)", code: "COMM 3, 7 or 8", min_grade: "C" },
          { course: "English Composition (GE A2)", code: "ENGL 5B or 10", min_grade: "C" },
          { course: "Critical Thinking (GE A3)", code: "SOC 3 preferred", min_grade: "C" },
          { course: "Statistics (GE B4)", code: "MATH 11 or PH 92", min_grade: "C" },
          { course: "Introduction to Chemistry (+lab)", code: "CHEM 3A", min_grade: "C" },
          { course: "Microbiology (+lab)", code: "BIOL 20", min_grade: "C" },
          { course: "Human Anatomy & Physiology I", code: "BIOL 67A", min_grade: "C" },
          { course: "Human Anatomy & Physiology II", code: "BIOL 67B", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS (score 75% or higher)",
          selection: "Impacted; admission is competitive and based on prerequisite GPA, with no waiting list. Preference is given to U.S. military veterans who meet the minimums",
          gpa: "Minimum 3.0 across the eight prerequisite courses",
          deadline: "Applies through Cal State Apply plus a NursingCAS supplemental; specific dates are not published on the program page",
          notes: "Applicants must be an admitted transfer student or a current Fresno State Pre-Health student. Each prerequisite needs a grade of C or better (credit/no-credit not accepted)."
        },
        cost: { amount: null, basis: "No single program figure is published on the nursing pages; standard CSU tuition and fees apply (the California BRN's program directory lists CSU Fresno's BSN tuition and fees at about $28,493).", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table; listed as \"CSU Fresno\")",
          by_campus: { "BSN": [{ year: "2024-25", rate: 0.9474 }, { year: "2023-24", rate: 0.9655 }, { year: "2022-23", rate: 0.8939 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); listed on the California BRN's approved prelicensure-program list (Baccalaureate, approved annual enrollment 140)",
        source_url: "https://chhs.fresnostate.edu/nursing/degrees-programs/bsn.html",
        last_verified: "2026-11-06", academic_year: "2026-27",
        notes: "The program is on impacted status (applications exceed seats, no waiting list). Confirm the current application cycle with the School of Nursing."
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
      },
      {
        id: "csu-fresno-rnbsn", institution: "csu-fresno", credential: "rnbsn", open_entry: true,
        name: "RN to BSN (for associate-degree RNs)",
        length: "Nursing courses across three semesters (41 nursing units within the 120-unit degree)",
        format: "Online, except one 90-hour community-health clinical course; clinical placements are limited to the Fresno State service area",
        prerequisites: [],
        admission: {
          entrance_exam: null,
          selection: "University admission plus graduation from a board-approved / accredited nursing program",
          gpa: "Cumulative GPA of at least 2.75 across all courses taken",
          deadline: "NursingCAS — Fall: Feb 1 – Mar 6; Spring: Jul 1 – Aug 7. University application — Fall: Jul 1 – Jan 15; Spring: Jul 1 – Aug 31",
          notes: "Requires an active California RN license by the end of the first semester. Eight prerequisites (English composition, speech, critical thinking, statistics, general chemistry with lab, two anatomy & physiology courses with labs, and microbiology with lab) each need a grade of C or better and must be completed the semester before applying; credit/no-credit and international prerequisites are not accepted."
        },
        cost: { amount: null, basis: "No single program figure is published on the nursing pages; standard CSU tuition and fees apply (a $50 NursingCAS supplemental fee is noted).", year: null },
        nclex_pass_rate: { basis: "Not applicable — a bachelor's-completion program for licensed nurses.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE) — Fresno State's baccalaureate nursing program is CCNE-accredited",
        source_url: "https://chhs.fresnostate.edu/nursing/degrees-programs/rn-bsn.html",
        last_verified: "2026-11-06", academic_year: "2026-27",
        notes: "Requires a California RN license (by the end of the first semester)."
      },

      // ============================= WAVE 2 =============================
      // ---- University pre-licensure BSN / Accelerated BSN (start schools) ----
      {
        id: "ucla-bsn", institution: "ucla", credential: "bsn",
        name: "Bachelor of Science (pre-licensure)",
        length: "Four-year program, entered as a first-year student",
        format: "In person, Los Angeles (Westwood)",
        prerequisites: [
          { course: "Chemistry sequence (general + organic)", code: "CHEM 20A/20B/30A (UCLA)", min_grade: null },
          { course: "Life Sciences", code: "LS 7A/7C (UCLA)", min_grade: null },
          { course: "Human Physiology", code: "Physiological Science 3 (UCLA)", min_grade: null },
          { course: "Human Anatomy", code: "Physiological Science 13 (UCLA)", min_grade: null }
        ],
        admission: {
          entrance_exam: "None stated",
          selection: "Highly selective; freshman entry plus a limited number of junior-level transfers",
          gpa: "Not published (a C average or better in science and math is required)",
          deadline: "Freshmen apply via the UC Application plus the School of Nursing Supplemental Application",
          notes: "UCLA lists BS transfer prerequisites inconsistently across its pages (two different course-number lists) — confirm with admissions. A 45-unit LVN option does not lead to the UCLA BS."
        },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; no single program figure is published.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, baccalaureate (California BRN school pass-rate table)",
          by_campus: { "BSN": [{ year: "2024-25", rate: 0.9216 }, { year: "2023-24", rate: 0.9362 }, { year: "2022-23", rate: 0.8889 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the University of California and the California Board of Registered Nursing",
        source_url: "https://nursing.ucla.edu/programs-admissions/academic-programs/bachelor-of-science",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "uci-bsn", institution: "uci", credential: "bsn",
        name: "Bachelor of Science in Nursing Science (pre-licensure)",
        length: "About 4 years",
        format: "In person, Irvine",
        prerequisites: [
          { course: "High-school biology and chemistry with labs (freshman entry; each lab course C or better)", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None mentioned",
          selection: "Competitive and highly selective; small cohort limited by clinical placements. Admission decisions made by UC Irvine Undergraduate Admissions, not the school",
          gpa: "Freshman: 3.0 high-school GPA or higher. Change-of-major (current UCI students): C or higher at UCI / B or higher elsewhere in prerequisites",
          deadline: "Freshman/transfer via the UC Application by November 30; change-of-major by July 31",
          notes: "A supplemental nursing application is no longer required for freshmen. Transfer prerequisites are handled by UCI Admissions (check ASSIST)."
        },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; not published as a single program figure.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, baccalaureate (California BRN school pass-rate table)",
          by_campus: { "BSN": [{ year: "2024-25", rate: 0.9130 }, { year: "2023-24", rate: 0.9583 }, { year: "2022-23", rate: 0.86 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Listed on the California BRN's approved prelicensure-program list. UCI's own pages don't state CCNE or ACEN accreditation (they link to CCNE and the BRN only) — confirm program accreditation with the school.",
        source_url: "https://nursing.uci.edu/degrees-and-programs/undergraduate-nursing-science/",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "loma-linda-bsn", institution: "loma-linda", credential: "bsn",
        name: "Bachelor of Science in Nursing (pre-licensure)",
        length: "Quarter-based; four-year degree (advanced-placement plans for military)",
        format: "In person, Loma Linda; classroom, lab and clinical",
        prerequisites: [
          { course: "Anatomy & Physiology I (+lab)", code: null, min_grade: "C" },
          { course: "Anatomy & Physiology II (+lab)", code: null, min_grade: "C" },
          { course: "General/Organic/Biochemistry (+lab)", code: null, min_grade: "C" },
          { course: "Microbiology (+lab)", code: null, min_grade: "C" },
          { course: "College Algebra or Statistics", code: null, min_grade: "C" },
          { course: "English sequence, Public Speaking, Psychology, Sociology/Anthropology, Nutrition", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS and a Critical Thinking assessment",
          selection: "Personal statement, three recommendation letters, transcripts; meeting minimums doesn't guarantee an interview",
          gpa: "Minimum 3.0 cumulative and prerequisite",
          deadline: "Feb 1 (Fall start), Jul 1 (Winter start), Oct 1 (Spring start)",
          notes: "A prior degree isn't required. Transfer applicants must come from a BSN program (ADN graduates are not considered). A Seventh-day Adventist university; religion units are a graduation requirement, not an admission bar."
        },
        cost: { amount: null, basis: "No single program figure is published; see Loma Linda's expected cost of attendance.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table; Loma Linda reports one combined figure)",
          by_campus: { "BSN": [{ year: "2024-25", rate: 0.9139 }, { year: "2023-24", rate: 0.9507 }, { year: "2022-23", rate: 0.8882 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing (\"The California State Board has approved all programs offered at the Loma Linda University School of Nursing\")",
        source_url: "https://nursing.llu.edu/programs/bs-nursing",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "samuel-merritt-bsn", institution: "samuel-merritt", credential: "bsn",
        name: "Bachelor of Science in Nursing (pre-licensure)",
        length: "2 years (4 semesters)",
        format: "In person, Oakland; clinicals across Northern California",
        prerequisites: [
          { course: "Human Anatomy (+lab)", code: null, min_grade: "C" },
          { course: "Human Physiology (+lab)", code: null, min_grade: "C" },
          { course: "Chemistry (+lab)", code: null, min_grade: "C" },
          { course: "Microbiology (+lab)", code: null, min_grade: "C" },
          { course: "Statistics, Nutrition, Lifespan Development, English, Communication, Sociology/Anthropology and others (17 courses total)", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "HESI A2 (75% each subject) or ATI TEAS (65% each subject; TEAS from Spring 2027)",
          selection: "60+ transferable units with all prerequisites, at least one recent full-time term, and short-answer responses",
          gpa: "3.0 recommended (on prerequisites and the four sciences)",
          deadline: "Oct 1, 2026 for a Spring 2027 standard start",
          notes: "A prior degree isn't required. Application via NursingCAS ($60 fee); $350 deposit."
        },
        cost: { amount: null, basis: "Samuel Merritt publishes an all-inclusive annual Tuition Guide rather than a single program total.", year: "2026-27" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, baccalaureate (California BRN school pass-rate table; the BRN reports SMU's BSN and Accelerated BSN together)",
          by_campus: { "BSN": [{ year: "2024-25", rate: 0.7925 }, { year: "2023-24", rate: 0.8585 }, { year: "2022-23", rate: 0.8205 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); listed on the California BRN's approved prelicensure-program list",
        source_url: "https://www.samuelmerritt.edu/college-nursing/bachelor-science-nursing",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "samuel-merritt-absn", institution: "samuel-merritt", credential: "absn",
        name: "Accelerated BSN (pre-licensure)",
        length: "12 months (3 semesters)",
        format: "In person; Oakland, Sacramento, San Francisco Peninsula and Fresno (each intake at a subset of campuses)",
        prerequisites: [
          { course: "Human Anatomy (+lab)", code: null, min_grade: "C" },
          { course: "Human Physiology (+lab)", code: null, min_grade: "C" },
          { course: "Chemistry (+lab)", code: null, min_grade: "C" },
          { course: "Microbiology (+lab)", code: null, min_grade: "C" },
          { course: "Pharmacology + Pathophysiology, Statistics, Nutrition, Lifespan Development and general-education courses", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "HESI A2 (75% each subject) or ATI TEAS (65% each subject)",
          selection: "Criteria plus short-answer responses; 75+ transferable units required",
          gpa: "3.0 recommended (last 60 units and six science prerequisites)",
          deadline: "Nov 1, 2026 (Summer 2027 priority, all campuses); Apr 1, 2027 (Summer 2027 standard)",
          notes: "A bachelor's degree is not required (75 semester units). Application via NursingCAS ($60 fee); $350 deposit."
        },
        cost: { amount: null, basis: "Samuel Merritt publishes an all-inclusive annual Tuition Guide rather than a single program total.", year: "2026-27" },
        nclex_pass_rate: {
          basis: "The California BRN reports Samuel Merritt's baccalaureate NCLEX figure as one number (see the BSN); a separate Accelerated-only rate isn't broken out.",
          by_campus: null,
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); listed on the California BRN's approved prelicensure-program list",
        source_url: "https://www.samuelmerritt.edu/college-nursing/accelerated-bachelor-science-nursing",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "usf-bsn", institution: "usf", credential: "bsn",
        name: "Bachelor of Science in Nursing (pre-licensure)",
        length: "First-year students: 8 semesters; transfers: 6-8 semesters",
        format: "In person, San Francisco (Hilltop); transfers who finished clinical prerequisites may use the Sacramento campus",
        prerequisites: [
          { course: "Human Anatomy", code: null, min_grade: null },
          { course: "Human Physiology", code: null, min_grade: null },
          { course: "Microbiology", code: null, min_grade: null },
          { course: "General Psychology", code: null, min_grade: null }
        ],
        admission: {
          entrance_exam: "None published",
          selection: "Selective holistic review (academic preparation plus a personal statement)",
          gpa: "Not published (first-year applicants below a C average in science/math are not admitted)",
          deadline: "First-year Fall: Early Action/ED I Nov 2, ED II & Regular Jan 15. Transfer: Fall Mar 1, Spring Nov 2",
          notes: "A Jesuit Catholic university (faith isn't an admission requirement). Background check and 10-panel drug screen before clinical coursework."
        },
        cost: { amount: null, basis: "No single program figure is published; see USF's cost and financial-aid page.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, baccalaureate (California BRN school pass-rate table)",
          by_campus: { "BSN": [{ year: "2024-25", rate: 0.8955 }, { year: "2023-24", rate: 0.94 }, { year: "2022-23", rate: 0.8654 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://www.usfca.edu/nursing/programs/undergraduate/nursing",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "azusa-pacific-bsn", institution: "azusa-pacific", credential: "bsn",
        name: "Bachelor of Science in Nursing (traditional, pre-licensure)",
        length: "4-4.5 years (cohort-based); 69-71 units",
        format: "In person, Azusa (Main Campus); clinical each semester plus simulation",
        prerequisites: [
          { course: "High-school (or college) Chemistry", code: "CHEM 101", min_grade: "B" },
          { course: "High-school (or college) Biology", code: "BIOL 101", min_grade: "B" },
          { course: "Anatomy (+lab) — after acceptance, before nursing", code: null, min_grade: "C" },
          { course: "Chemistry (+lab) — after acceptance, before nursing", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None published",
          selection: "Reviewed by Undergraduate Admissions, then the School of Nursing Admissions Committee; decisions by March 1",
          gpa: "Minimum cumulative 3.5",
          deadline: "November 15",
          notes: "An evangelical Christian university (faith isn't stated as an admission requirement). A professional recommendation, a one-page nursing-goals statement and a resume are required; $500 deposit by April 10."
        },
        cost: { amount: null, basis: "No single program figure is published; APU lists per-unit cost and a net-price calculator.", year: "2026-27" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, baccalaureate (California BRN school pass-rate table)",
          by_campus: { "BSN": [{ year: "2024-25", rate: 0.8216 }, { year: "2023-24", rate: 0.8915 }, { year: "2022-23", rate: 0.80 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); the traditional baccalaureate program is approved by the California Board of Registered Nursing",
        source_url: "https://www.apu.edu/programs/bsn/",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },

      // ---- Direct-entry (entry-level) master's for non-nurses (start schools; demsn) ----
      {
        id: "ucla-demsn", institution: "ucla", credential: "demsn",
        name: "Master's Entry Clinical Nursing (MECN) — MSN for non-nurses",
        length: "2-year prelicensure program (includes a summer)",
        format: "In person, Los Angeles; some science prerequisites offered online in summer",
        prerequisites: [
          { course: "Chemistry (inorganic, organic, biochemistry)", code: null, min_grade: "C" },
          { course: "Human Anatomy", code: "Physiological Science 13 (UCLA)", min_grade: "C" },
          { course: "Human Physiology", code: "Physiological Science 3 (UCLA)", min_grade: "C" },
          { course: "Microbiology", code: null, min_grade: "C" },
          { course: "Statistics, Nutrition, Epidemiology, Introductory & Lifespan Psychology, English and communication", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None stated",
          selection: "Three letters of recommendation; competitive",
          gpa: "Bachelor's degree with a B (3.0) average or better",
          deadline: "Applications open after Oct 1, 2026; deadline Nov 1, 2026 (Fall 2027 entry)",
          notes: "A direct-entry master's for applicants holding a bachelor's in another field. Graduates are eligible for the NCLEX-RN. One prerequisite may be met by an AP score of 4+."
        },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; no single program figure is published.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, master's-entry (California BRN school pass-rate table, UCLA MSN row)",
          by_campus: { "MECN/MSN": [{ year: "2024-25", rate: 0.8507 }, { year: "2023-24", rate: 1.00 }, { year: "2022-23", rate: 0.8529 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the University of California and the California Board of Registered Nursing",
        source_url: "https://nursing.ucla.edu/programs-admissions/academic-programs/master-of-science-entry",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "uci-demsn", institution: "uci", credential: "demsn",
        name: "Master's Entry Program in Nursing (MEPN) — MSN for non-nurses",
        length: "Two-year, full-time program",
        format: "In person, Irvine; concentration in Community and Population Health Nursing",
        prerequisites: [],
        admission: {
          entrance_exam: "Not required (NursingCAS no longer required for MEPN from Fall 2026)",
          selection: "Competitive", gpa: "Not published",
          deadline: "UC Irvine Graduate Application opens Oct 1, 2026; deadline Nov 30, 2026 (Fall 2027 start)",
          notes: "A direct-entry master's for applicants who already hold a non-nursing bachelor's degree. Graduates qualify for the NCLEX-RN and California public-health-nurse certification."
        },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; not published as a single program figure.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, master's-entry (California BRN school pass-rate table, UCI MSN row)",
          by_campus: { "MEPN/MSN": [{ year: "2024-25", rate: 1.00 }, { year: "2023-24", rate: 0.9444 }, { year: "2022-23", rate: 0.9474 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Listed on the California BRN's approved prelicensure-program list. UCI's own pages don't state CCNE/ACEN accreditation — confirm with the school.",
        source_url: "https://nursing.uci.edu/degrees-and-programs/masters-entry-program-in-nursing/",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "uc-davis-demsn", institution: "uc-davis", credential: "demsn",
        name: "Master's Entry Program in Nursing (MEPN) — MSN for non-nurses",
        length: "18 months (six consecutive quarters including two summers), beginning in June",
        format: "In person, Sacramento campus only (not offered part-time or online)",
        prerequisites: [
          { course: "Human Anatomy (+lab, within 5 years)", code: null, min_grade: "C" },
          { course: "Human Physiology (+lab, within 5 years)", code: null, min_grade: "C" },
          { course: "Chemistry (+lab)", code: null, min_grade: "C" },
          { course: "Microbiology (+lab)", code: null, min_grade: "C" },
          { course: "Statistics (or epidemiology), Psychology, Sociology/Anthropology, Lifespan Development, Communication", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "None (no GRE, MCAT or TEAS required)",
          selection: "NursingCAS screen, then an invited UC Davis Graduate Studies application; one cohort a year",
          gpa: "Minimum 3.0 overall bachelor's GPA and 3.0 science-prerequisite GPA",
          deadline: "Nov 1 via NursingCAS (Summer 2027 applications open Aug 6, 2026)",
          notes: "A direct-entry master's requiring a non-nursing bachelor's degree. Graduates qualify for the NCLEX-RN and public-health-nurse certification."
        },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; no single program figure is published.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, master's-entry (California BRN school pass-rate table, UC Davis row)",
          by_campus: { "MEPN/MSN": [{ year: "2024-25", rate: 0.8913 }, { year: "2023-24", rate: 0.9268 }, { year: "2022-23", rate: 0.9302 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://health.ucdavis.edu/nursing/admissions/FAQ-MEPN.html",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "usd-demsn", institution: "usd", credential: "demsn",
        name: "Master's Entry Program in Nursing (MEPN) — MSN for non-nurses",
        length: "18 months (four full-time terms); 58 units",
        format: "In person, San Diego; 960 clinical hours (full-time only)",
        prerequisites: [
          { course: "Anatomy (+lab)", code: null, min_grade: null },
          { course: "Physiology (+lab)", code: null, min_grade: null },
          { course: "Microbiology (+lab)", code: null, min_grade: null },
          { course: "Psychology", code: null, min_grade: null },
          { course: "Statistics", code: null, min_grade: null }
        ],
        admission: {
          entrance_exam: "None published",
          selection: "Transcripts, recommendations, personal statement; two cycles a year",
          gpa: "Not published (minimum grades apply to prerequisites)",
          deadline: "Not published on the program page",
          notes: "A direct-entry master's requiring a non-nursing bachelor's degree. Prepares for the NCLEX-RN; it does not prepare students for nurse-practitioner licensure (USD's only pre-licensure route — USD has no undergraduate BSN)."
        },
        cost: { amount: 110200, basis: "Estimated tuition about $110,200 (58 units at $1,900/unit, 2026-27).", year: "2026-27" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table, University of San Diego/Hahn row)",
          by_campus: { "MEPN/MSN": [{ year: "2024-25", rate: 0.9643 }, { year: "2023-24", rate: 1.00 }, { year: "2022-23", rate: 0.88 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); the MEPN and NP programs have California Board of Registered Nursing approval",
        source_url: "https://www.sandiego.edu/nursing/academic-programs/mepn/",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "usf-demsn", institution: "usf", credential: "demsn",
        name: "Clinical Nurse Leader (ME) — MSN for non-nurses",
        length: "2 years (68 units); NCLEX taken in the 5th semester",
        format: "In person, San Francisco; 1,000+ clinical/internship hours",
        prerequisites: [],
        admission: {
          entrance_exam: "Not published", selection: "Not published", gpa: "Not published",
          deadline: "San Francisco: Spring admission Sep 1; Fall admission Feb 1",
          notes: "A direct-entry master's requiring a bachelor's degree in a non-nursing field. (USF's Orange County campus applications are currently paused.)"
        },
        cost: { amount: null, basis: "Not published on the program page.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, master's-entry (California BRN school pass-rate table, USF MSN row)",
          by_campus: { "ME/MSN": [{ year: "2024-25", rate: 0.8288 }, { year: "2023-24", rate: 0.9505 }, { year: "2022-23", rate: 0.8626 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://www.usfca.edu/nursing/programs/graduate/masters/msn/program-overview/me-msn",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "samuel-merritt-demsn", institution: "samuel-merritt", credential: "demsn",
        name: "Entry-Level MSN (Family NP or Psych-Mental-Health NP track) — for non-nurses",
        length: "39 months (NCLEX-RN eligible after the first 4 semesters)",
        format: "In person; clinicals across Northern California",
        prerequisites: [
          { course: "Human Anatomy (+lab)", code: null, min_grade: "C" },
          { course: "Human Physiology (+lab)", code: null, min_grade: "C" },
          { course: "Chemistry (+lab)", code: null, min_grade: "C" },
          { course: "Microbiology (+lab)", code: null, min_grade: "C" },
          { course: "Statistics, Nutrition, Lifespan Development and general-education courses", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "HESI A2 (75%) or ATI TEAS (65% each subject; recommended)",
          selection: "Short-answer responses; second-language proficiency valued",
          gpa: "3.0 recommended (recent 60 units and four sciences)",
          deadline: "Dec 1, 2026 (Spring 2027 standard; classes begin Jan 2027)",
          notes: "A direct-entry master's requiring a bachelor's in another field. Completes pre-licensure first (BSN-equivalency letter; no BSN degree awarded), then the FNP or PMHNP graduate phase."
        },
        cost: { amount: null, basis: "Samuel Merritt publishes an all-inclusive annual Tuition Guide rather than a single program total.", year: "2026-27" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate, master's-entry (California BRN school pass-rate table, Samuel Merritt MSN row)",
          by_campus: { "ELMSN/MSN": [{ year: "2024-25", rate: 0.85 }, { year: "2023-24", rate: 0.8767 }, { year: "2022-23", rate: 0.7835 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); listed on the California BRN's approved prelicensure-program list",
        source_url: "https://www.samuelmerritt.edu/entry-level-master-science-nursing-family-nurse-practitioner",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "loma-linda-demsn", institution: "loma-linda", credential: "demsn",
        name: "Entry-Level MS in Nursing (Population Health) — for non-nurses",
        length: "24 months over 3 academic years (includes summers)",
        format: "Accelerated; didactic and most clinicals at the Murrieta campus; peds/psych rotations at Loma Linda",
        prerequisites: [
          { course: "Anatomy & Physiology I & II (+labs)", code: null, min_grade: "C" },
          { course: "General/Organic/Biochemistry (+lab)", code: null, min_grade: "C" },
          { course: "Microbiology (+lab)", code: null, min_grade: "C" },
          { course: "Statistics/Algebra, English, Public Speaking, Psychology, Sociology/Anthropology, Nutrition", code: null, min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS and a Critical Thinking assessment",
          selection: "Standardized interview with nursing faculty; personal essay, transcripts, three letters; healthcare experience preferred",
          gpa: "Minimum 3.30 undergraduate",
          deadline: "Jul 1 (all documents)",
          notes: "A direct-entry master's requiring a non-nursing bachelor's degree (Year 1 is NCLEX-RN prelicensure content). A Seventh-day Adventist university."
        },
        cost: { amount: null, basis: "No single program figure is published; see Loma Linda's expected cost of attendance.", year: null },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table; Loma Linda reports one combined figure covering the BS and entry-level MS).",
          by_campus: { "ELM/MS": [{ year: "2024-25", rate: 0.9139 }, { year: "2023-24", rate: 0.9507 }, { year: "2022-23", rate: 0.8882 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://nursing.llu.edu/programs/entry-level-masters-elm",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "azusa-pacific-demsn", institution: "azusa-pacific", credential: "demsn",
        name: "Entry-Level MSN (ELM) — for non-nurses",
        length: "Accelerated; prelicensure phase 18 months (earns a BSN, then the MSN)",
        format: "Accelerated prelicensure (simulation + clinical); postlicensure MSN self-paced. Azusa, Inland Empire, San Diego, Online",
        prerequisites: [
          { course: "Human Anatomy (+lab)", code: null, min_grade: null },
          { course: "Human Physiology (+lab)", code: null, min_grade: null },
          { course: "Organic Chemistry (+lab) and Biochemistry", code: null, min_grade: null },
          { course: "Microbiology (+lab)", code: null, min_grade: null },
          { course: "Communication, Psychology, Human Development, Statistics, Research Methods", code: null, min_grade: null }
        ],
        admission: {
          entrance_exam: "Not published",
          selection: "Faculty/department-chair review; two recommendations, a personal statement and a resume",
          gpa: "Minimum 3.0 cumulative (provisional admission possible below 3.0)",
          deadline: "Spring Sep 15; Summer Jan 15; Fall May 15",
          notes: "A direct-entry master's requiring a non-nursing bachelor's degree; feeds into APU's FNP, PNP, AGPCNP or PMHNP tracks. An evangelical Christian university."
        },
        cost: { amount: null, basis: "APU publishes a per-unit rate ($895/credit) and a cost range rather than a single total (roughly $95,000-$112,000 base for the full ELM).", year: "2026-27" },
        nclex_pass_rate: {
          basis: "The California BRN lists Azusa Pacific's baccalaureate NCLEX figure (see the BSN); a separate entry-level-master's rate isn't broken out here.",
          by_campus: null,
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://www.apu.edu/programs/entry-level-masters-in-nursing/",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },

      // ---- RN-to-BSN completion (open to any accredited ADN + RN license) ----
      {
        id: "samuel-merritt-rnbsn", institution: "samuel-merritt", credential: "rnbsn", open_entry: true,
        name: "RN-to-BSN (bachelor's completion)",
        length: "About 12 months",
        format: "Online",
        prerequisites: [],
        admission: {
          entrance_exam: null, selection: null, gpa: null, deadline: null,
          notes: "For licensed registered nurses who hold an accredited associate degree in nursing. See Samuel Merritt's College of Nursing page for current admission details."
        },
        cost: { amount: null, basis: "Samuel Merritt publishes an all-inclusive annual Tuition Guide rather than a single program total.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a bachelor's-completion program for licensed nurses.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE) — Samuel Merritt's baccalaureate nursing program is CCNE-accredited",
        source_url: "https://www.samuelmerritt.edu/colleges/college-nursing",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },

      // ---- More community-college ADN (start schools, by region) ----
      {
        id: "santa-rosa-jc-adn", institution: "santa-rosa-jc", credential: "adn",
        name: "Associate Degree Nursing (AS in Nursing)",
        length: "4 semesters (about 2 years) after prerequisites",
        format: "In person, Santa Rosa; campus plus clinical",
        prerequisites: [
          { course: "Human Anatomy (+lab)", code: "Anatomy 1", min_grade: "C" },
          { course: "Human Physiology (+lab)", code: "Physiology 1", min_grade: "C" },
          { course: "Microbiology", code: "Microbiology 5 or 60", min_grade: "C" },
          { course: "English (transferable reading/composition)", code: "English C1000", min_grade: "C" },
          { course: "Food and Nutrition", code: "FDNT 62 or 10", min_grade: "C" },
          { course: "Psychology", code: "Psychology C1000", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS 7 (minimum 62%)",
          selection: "Chancellor's-office multi-criteria composite, then a randomized lottery for applicants scoring 80%+",
          gpa: "No numeric minimum; prerequisites and English must be C or better",
          deadline: "Once a year: Oct 2, 2026 - Feb 7, 2027 (entry Fall 2027/Spring 2028)",
          notes: "A very impacted program with no waitlist (reapply yearly). Online science prerequisites taken after Summer 2022 are not accepted. Health clearances, immunizations, background check, drug screen and CPR before confirmation."
        },
        cost: { amount: null, basis: "California's community-college enrollment fee is $46/credit for residents; SRJC doesn't publish a single program total on its accessible pages.", year: "2026-27" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table)",
          by_campus: { "ADN": [{ year: "2024-25", rate: 0.9649 }, { year: "2023-24", rate: 0.989 }, { year: "2022-23", rate: 0.9082 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Approved by the California Board of Registered Nursing. SRJC's accessible ADN pages state only institutional (ACCJC) accreditation; program-level ACEN/CCNE isn't published there.",
        source_url: "https://adn.santarosa.edu/getting-started",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "sacramento-city-adn", institution: "sacramento-city", credential: "adn",
        name: "Registered Nursing (Associate in Science, AS)",
        length: "2 years",
        format: "In person, Sacramento; a portion of each course is online, with hospital/SNF/community clinicals",
        prerequisites: [
          { course: "Anatomy and Physiology", code: "BIOL 430", min_grade: "C" },
          { course: "Anatomy and Physiology", code: "BIOL 431", min_grade: "C" },
          { course: "General Microbiology", code: "BIOL 440", min_grade: "C" },
          { course: "English", code: "ENGL C1000", min_grade: "C" },
          { course: "Communication", code: "COMM C1000", min_grade: "C" },
          { course: "Psychology / social-behavioral science", code: "PSYC C1000", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS 7 (overall 62% to apply)",
          selection: "Multi-criteria criterion form (70-point minimum), then a random lottery; no waitlist",
          gpa: "Minimum 3.0 in science courses and 2.5 in non-science courses",
          deadline: "Feb 1 - Feb 28, 2027",
          notes: "Post-acceptance: drug screen, background check, CPR and a health screening."
        },
        cost: { amount: null, basis: "California's community-college enrollment fee ($46/credit for residents) applies; no single program total is published.", year: "2026-27" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table)",
          by_campus: { "ADN": [{ year: "2024-25", rate: 0.96 }, { year: "2023-24", rate: 0.9778 }, { year: "2022-23", rate: 0.9483 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the California Board of Registered Nursing",
        source_url: "https://scc.losrios.edu/academics/nursing-program-details/rn-program-details-and-application-requirements",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "fresno-city-adn", institution: "fresno-city", credential: "adn",
        name: "Registered Nursing (Associate in Science, ADN)",
        length: "Four-semester nursing sequence (AS degree)",
        format: "In person, Fresno; classroom plus hospital and simulation clinical",
        prerequisites: [
          { course: "Human Anatomy", code: "BIOL 20 (or 21A)", min_grade: "C" },
          { course: "Human Physiology", code: "BIOL 22 (or 21B)", min_grade: "C" },
          { course: "Microbiology", code: "BIOL 31", min_grade: "C" },
          { course: "General Chemistry", code: "CHEM 3A (or equiv.)", min_grade: "C" },
          { course: "English (reading & composition)", code: "ENGL C1000", min_grade: "C" },
          { course: "Statistics", code: "STAT C1000", min_grade: "C" },
          { course: "General Psychology", code: "PSYC C1000", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS (minimum 62% to be considered; scored up to 50 points)",
          selection: "Multi-criteria screening rubric, then a lottery",
          gpa: "Minimum 2.5 across the eight required prerequisites and the degree general-education courses",
          deadline: "Jan 20 - Feb 9, 2027 (entry Fall 2027/Spring 2028); prerequisites complete by Dec 2026",
          notes: "One of the largest community-college ADN programs in California. A separate LVN-to-RN track and military advanced placement exist. Background check and health requirements after acceptance."
        },
        cost: { amount: null, basis: "California's community-college enrollment fee ($46/credit for residents) applies; no single program total is published.", year: "2026-27" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table)",
          by_campus: { "ADN": [{ year: "2024-25", rate: 0.7817 }, { year: "2023-24", rate: 0.8927 }, { year: "2022-23", rate: 0.7426 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Approved by the California Board of Registered Nursing (continuing approval). ACEN candidate for initial accreditation (since July 2023).",
        source_url: "https://www.fresnocitycollege.edu/academics/divisions/apa-division/registered-nursing/rn-apply.html",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "mt-sac-adn", institution: "mt-sac", credential: "adn",
        name: "Registered Nursing (RN) Generic Option (AS)",
        length: "2 years; 63-66 total units",
        format: "In person, Walnut; clinical at local hospitals and health agencies",
        prerequisites: [
          { course: "Human Anatomy", code: "ANAT 10A or 35", min_grade: "C" },
          { course: "Human Physiology", code: "ANAT 10B or 36", min_grade: "C" },
          { course: "Microbiology", code: "MICR 1 or 22", min_grade: "C" },
          { course: "English Composition", code: "ENGL C1000", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS (composite 70% or higher required; also adds merit points)",
          selection: "Multi-criteria points-based ranking (100-point maximum); admitted twice a year",
          gpa: "Minimum 2.5 in the science prerequisites (no grade below C) and 2.5 cumulative",
          deadline: "Twice yearly (Fall and Spring); current cycle referenced is Spring 2027",
          notes: "Online science labs are not accepted; sciences within 7 years (tightening to 5 years from June 2027). Also requires public speaking, introductory and developmental psychology and math eligibility. Background check, drug screen, physical and CPR before clinical."
        },
        cost: { amount: null, basis: "California's community-college enrollment fee ($46/credit for residents) applies; no single program total is published.", year: "2026-27" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table)",
          by_campus: { "ADN": [{ year: "2024-25", rate: 0.9292 }, { year: "2023-24", rate: 0.9649 }, { year: "2022-23", rate: 0.887 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); fully approved by the California Board of Registered Nursing",
        source_url: "https://catalog.mtsac.edu/programs/programsaz/nursing/licensed-nursing-registered-nursing-rn-generic-option-degree/",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },
      {
        id: "riverside-city-adn", institution: "riverside-city", credential: "adn",
        name: "Associate Degree Nursing (Traditional RN, AS)",
        length: "4 semesters plus an intersession (73-74-unit program)",
        format: "In person, Riverside; campus plus clinical",
        prerequisites: [
          { course: "Human Anatomy", code: "Biology 50A", min_grade: "C" },
          { course: "Human Physiology", code: "Biology 50B", min_grade: "C" },
          { course: "Microbiology", code: "Biology 55", min_grade: "C" },
          { course: "Developmental Psychology (Birth to Death)", code: "Psychology 9", min_grade: "C" },
          { course: "Chemistry (AP score 3+ or one college course)", code: "Chemistry 2A/3", min_grade: "C" }
        ],
        admission: {
          entrance_exam: "ATI TEAS 7 (minimum 62% to be eligible; also points-scored)",
          selection: "Multi-criteria rank-order points plus random selection among equal ranks; no waitlist",
          gpa: "Cumulative 2.0 or higher; minimum 2.5 in the three sciences and 2.5 in the degree general-education courses",
          deadline: "Spring: early June - early July. Fall: early October - early November. May apply with prerequisites in progress",
          notes: "Each term 44-90 traditional candidates are accepted. Also offers concurrent ADN/BSN and advanced-placement pathways. Health exam, immunizations, CPR, background check and drug screen before enrollment."
        },
        cost: { amount: null, basis: "Riverside publishes an itemized estimate of about $7,500 for the program (resident $46/credit enrollment fee plus books, testing, uniforms, background check and health requirements).", year: "2023-24" },
        nclex_pass_rate: {
          basis: "First-time NCLEX-RN pass rate (California BRN school pass-rate table)",
          by_campus: { "ADN": [{ year: "2024-25", rate: 0.9657 }, { year: "2023-24", rate: 0.988 }, { year: "2022-23", rate: 0.9533 }] },
          source_url: "https://www.rn.ca.gov/education/passrates.shtml"
        },
        accreditation: "Accreditation Commission for Education in Nursing (ACEN); approved by the California Board of Registered Nursing",
        source_url: "https://www.rcc.edu/assets/documents/pathways/health-related-science/nursing/ADN%20InfoSheet.pdf",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: ""
      },

      // ---- Graduate advanced-practice programs (open to any accredited BSN + California RN license) ----
      {
        id: "ucla-fnp", institution: "ucla", credential: "fnp", open_entry: true,
        name: "BSN-to-DNP — Family Nurse Practitioner",
        length: null, format: "Doctor of Nursing Practice; Los Angeles.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 minimum", deadline: "Fall 2027: deadline Dec 1, 2026",
          notes: "Requires a BSN (or entry-level master's in nursing) from an accredited program, an active California RN license (mandatory at application), and two years of RN experience. Required courses: statistics, nursing research, advanced physical assessment, human physiology." },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; no single program figure is published.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate (nurse practitioner) program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the University of California and the California Board of Registered Nursing",
        source_url: "https://nursing.ucla.edu/programs-admissions/academic-programs/doctor-of-nursing-practice-0",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "ucla-agacnp", institution: "ucla", credential: "agacnp", open_entry: true,
        name: "BSN-to-DNP — Adult-Gerontology Acute Care NP",
        length: null, format: "Doctor of Nursing Practice; Los Angeles.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 minimum", deadline: "Fall 2027: deadline Dec 1, 2026",
          notes: "Requires a BSN (or entry-level master's in nursing), an active California RN license, and two years of RN experience (shared BSN-to-DNP requirements)." },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; no single program figure is published.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://nursing.ucla.edu/programs-admissions/academic-programs/doctor-of-nursing-practice-0",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "ucla-agpcnp", institution: "ucla", credential: "agpcnp", open_entry: true,
        name: "BSN-to-DNP — Adult-Gerontology Primary Care NP",
        length: null, format: "Doctor of Nursing Practice; Los Angeles.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 minimum", deadline: "Fall 2027: deadline Dec 1, 2026",
          notes: "Requires a BSN (or entry-level master's in nursing), an active California RN license, and two years of RN experience (shared BSN-to-DNP requirements)." },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; no single program figure is published.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://nursing.ucla.edu/programs-admissions/academic-programs/doctor-of-nursing-practice-0",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "ucla-pnp", institution: "ucla", credential: "pnp", open_entry: true,
        name: "BSN-to-DNP — Pediatric NP (Dual Primary/Acute Care)",
        length: null, format: "Doctor of Nursing Practice; Los Angeles.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 minimum", deadline: "Fall 2027: deadline Dec 1, 2026",
          notes: "Requires a BSN (or entry-level master's in nursing), an active California RN license, and two years of RN experience (shared BSN-to-DNP requirements)." },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; no single program figure is published.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://nursing.ucla.edu/programs-admissions/academic-programs/doctor-of-nursing-practice-0",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "ucsf-cnm", institution: "ucsf", credential: "cnm", open_entry: true,
        name: "BSN-Entry-to-DNP — Nurse-Midwifery",
        length: "11-quarter hybrid program", format: "Hybrid (in-person + online), San Francisco Bay Area clinical sites.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive (no GRE)", gpa: "3.0 minimum", deadline: "Fall 2026: apply by Feb 15, 2026 (a later cycle referenced Feb 2027)",
          notes: "Requires a BSN or MSN from an accredited program and an active California RN license. A statistics course within 5 years is required. UCSF's MEPN (direct entry) is paused and its MS is closed — this DNP is the active entry point." },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; see the UCSF Registrar.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate (nurse-midwifery) program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); the nurse-midwifery specialty has conditional accreditation from the Accreditation Commission for Midwifery Education (ACME). The BSN-Entry-to-DNP track is noted as under review by the California BRN.",
        source_url: "https://nursing.ucsf.edu/bsn-entry-dnp-advanced-nursing-focus",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "ucsf-fnp", institution: "ucsf", credential: "fnp", open_entry: true,
        name: "BSN-Entry-to-DNP — Family Nurse Practitioner",
        length: "11-quarter hybrid program", format: "Hybrid (in-person + online), San Francisco Bay Area clinical sites.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive (no GRE)", gpa: "3.0 minimum", deadline: "Fall 2026: apply by Feb 15, 2026 (a later cycle referenced Feb 2027)",
          notes: "Requires a BSN or MSN from an accredited program and an active California RN license. A statistics course within 5 years is required. (UCSF's MEPN is paused and its MS is closed.)" },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; see the UCSF Registrar.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE). The BSN-Entry-to-DNP track is noted as under review by the California BRN.",
        source_url: "https://nursing.ucsf.edu/bsn-entry-dnp-advanced-nursing-focus",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "ucsf-agacnp", institution: "ucsf", credential: "agacnp", open_entry: true,
        name: "BSN-Entry-to-DNP — Adult-Gerontology Acute Care NP",
        length: "11-quarter hybrid program", format: "Hybrid (in-person + online), San Francisco Bay Area clinical sites.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive (no GRE)", gpa: "3.0 minimum", deadline: "Fall 2026: apply by Feb 15, 2026 (a later cycle referenced Feb 2027)",
          notes: "Requires a BSN or MSN and an active California RN license, plus two years of inpatient RN practice for this acute-care specialty. A statistics course within 5 years is required." },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; see the UCSF Registrar.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE). The BSN-Entry-to-DNP track is noted as under review by the California BRN.",
        source_url: "https://nursing.ucsf.edu/bsn-entry-dnp-advanced-nursing-focus",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "uc-davis-fnp", institution: "uc-davis", credential: "fnp", open_entry: true,
        name: "DNP — Family Nurse Practitioner",
        length: "3 years (12 quarters, year-round)", format: "Integrated hybrid (online + four in-person immersions at Sacramento); clinicals in California primary care.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive (no GRE/MCAT)", gpa: "3.0 bachelor's GPA and 3.0 prerequisite-science GPA", deadline: "Application period mid-September to January 5",
          notes: "For working registered nurses who hold a bachelor's degree (any major) and an active RN license. Science prerequisites may be waived for applicants holding a BSN or entry-level prelicensure master's." },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; no single figure is published.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://health.ucdavis.edu/nursing/academics/programs/dnp-fnp.html",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "uc-davis-crna", institution: "uc-davis", credential: "crna", open_entry: true,
        name: "DNP — Nurse Anesthesia",
        length: "3 years (year-round)", format: "Integrated hybrid; on-campus simulation in Sacramento plus clinical rotations across UC Health.", prerequisites: [],
        admission: { entrance_exam: null, selection: "highly competitive", gpa: "3.0 minimum", deadline: "Application period mid-September to November 1",
          notes: "Requires a BSN (or a bachelor's in another field plus an MSN), an active RN license, at least one year of full-time critical-care RN experience, and 8+ hours shadowing a CRNA or anesthesiologist. The UC system's first nurse-anesthesia program (first graduating class 2028)." },
        cost: { amount: null, basis: "UC Regents-set tuition and fees; a DNP-NA loan program is available.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a doctoral nurse-anesthesia program.", by_campus: null, source_url: null },
        accreditation: "Council on Accreditation of Nurse Anesthesia Educational Programs (COA), effective January 2025",
        source_url: "https://health.ucdavis.edu/nursing/academics/programs/dnp-nurse-anesthesia.html",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "loma-linda-fnp", institution: "loma-linda", credential: "fnp", open_entry: true,
        name: "BS-to-DNP — Family Nurse Practitioner",
        length: "About 3 years 9 months (full-time); part-time available", format: "Hybrid; Loma Linda, clinicals within a 90-mile radius.", prerequisites: [],
        admission: { entrance_exam: null, selection: "Emotional Intelligence interview if granted", gpa: "3.0 minimum (cumulative and nursing)", deadline: "Apr 15 (Fall start), Oct 1 (Winter start)",
          notes: "Requires a baccalaureate in nursing from an accredited program, a current unencumbered U.S. RN license (a California RN license before classes start), and one year of RN experience before clinical courses. A Seventh-day Adventist university." },
        cost: { amount: null, basis: "No single program figure is published; see Loma Linda's expected cost of attendance.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://nursing.llu.edu/programs/family-nurse-practitioner-concentration",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "loma-linda-pmhnp", institution: "loma-linda", credential: "pmhnp", open_entry: true,
        name: "BS-to-DNP — Psychiatric Mental Health NP",
        length: null, format: "Hybrid; Loma Linda.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 minimum", deadline: "Apr 15 (Fall), Oct 1 (Winter)",
          notes: "Requires a baccalaureate in nursing, a current unencumbered U.S. RN license (California RN before classes start), and one year of RN experience before clinical courses (shared BS-to-DNP requirements)." },
        cost: { amount: null, basis: "No single program figure is published; see Loma Linda's expected cost of attendance.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://nursing.llu.edu/programs/psychiatric-mental-health-nurse-practitioner-concentration",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "loma-linda-agpcnp", institution: "loma-linda", credential: "agpcnp", open_entry: true,
        name: "BS-to-DNP — Adult-Gerontology NP (Primary Care)",
        length: null, format: "Hybrid; Loma Linda.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 minimum", deadline: "Apr 15 (Fall), Oct 1 (Winter)",
          notes: "Requires a baccalaureate in nursing, a current unencumbered U.S. RN license (California RN before classes start), and one year of RN experience before clinical courses (shared BS-to-DNP requirements)." },
        cost: { amount: null, basis: "No single program figure is published; see Loma Linda's expected cost of attendance.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://nursing.llu.edu/programs/adult-gerontology-nurse-practitioner-concentration",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "loma-linda-pnp", institution: "loma-linda", credential: "pnp", open_entry: true,
        name: "BS-to-DNP — Pediatric NP (Primary Care)",
        length: null, format: "Hybrid; Loma Linda.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 minimum", deadline: "Apr 15 (Fall), Oct 1 (Winter)",
          notes: "Requires a baccalaureate in nursing, a current unencumbered U.S. RN license (California RN before classes start), and one year of RN experience before clinical courses (shared BS-to-DNP requirements). An Acute Care Pediatric NP track is also offered." },
        cost: { amount: null, basis: "No single program figure is published; see Loma Linda's expected cost of attendance.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://nursing.llu.edu/programs/pediatric-nurse-practitioner-concentration",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "loma-linda-nnp", institution: "loma-linda", credential: "nnp", open_entry: true,
        name: "BS-to-DNP — Neonatal NP",
        length: null, format: "Hybrid; Loma Linda.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 minimum", deadline: "Apr 15 (Fall), Oct 1 (Winter)",
          notes: "Requires a baccalaureate in nursing, a current unencumbered U.S. RN license (California RN before classes start), and RN experience before clinical courses (NICU experience is typically expected for this specialty — confirm with the school)." },
        cost: { amount: null, basis: "No single program figure is published; see Loma Linda's expected cost of attendance.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://nursing.llu.edu/programs/neonatal-nurse-practitioner-nnp-concentration",
        last_verified: "2026-11-06", academic_year: "2026-27",
        notes: "One of the few verified neonatal-NP programs in our data." },
      {
        id: "loma-linda-cns", institution: "loma-linda", credential: "cns", open_entry: true,
        name: "BS-to-DNP — Adult-Gerontology Clinical Nurse Specialist",
        length: null, format: "Hybrid; Loma Linda.", prerequisites: [],
        admission: { entrance_exam: null, selection: "competitive", gpa: "3.0 minimum", deadline: "Apr 15 (Fall), Oct 1 (Winter)",
          notes: "Requires a baccalaureate in nursing, a current unencumbered U.S. RN license (California RN before classes start), and one year of RN experience before clinical courses (shared BS-to-DNP requirements)." },
        cost: { amount: null, basis: "No single program figure is published; see Loma Linda's expected cost of attendance.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://nursing.llu.edu/programs/cns-adult-gerontology",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "loma-linda-crna", institution: "loma-linda", credential: "crna", open_entry: true,
        name: "DNP — Nurse Anesthesia",
        length: "39 months, full-time", format: "Hybrid (classroom + distance education); Loma Linda.", prerequisites: [],
        admission: { entrance_exam: null, selection: "highly competitive", gpa: "3.0 minimum (cumulative, nursing and science)", deadline: "Application window May 1 - Jul 1 (documents due Aug 1)",
          notes: "Requires a baccalaureate in nursing, a current unencumbered U.S. RN license (a California RN before classes start), and at least one year of full-time critical-care RN experience. CCRN preferred; BLS/ACLS/PALS before clinicals." },
        cost: { amount: null, basis: "No single program figure is published; see Loma Linda's expected cost of attendance.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a doctoral nurse-anesthesia program.", by_campus: null, source_url: null },
        accreditation: "Council on Accreditation of Nurse Anesthesia Educational Programs (COA); Loma Linda's programs are approved by the California Board of Registered Nursing",
        source_url: "https://nursing.llu.edu/programs/certified-registered-nurse-anesthetist-crna",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "samuel-merritt-crna", institution: "samuel-merritt", credential: "crna", open_entry: true,
        name: "Doctor of Nurse Anesthesia Practice (DNAP)",
        length: "36 months (9 semesters; 24-month clinical residency)", format: "Hybrid; Oakland (partnership with Kaiser Permanente Northern California).", prerequisites: [],
        admission: { entrance_exam: null, selection: "highly competitive, holistic", gpa: "3.25 minimum (cumulative, last 60 units and science)", deadline: "Via NursingCAS (deadline not published on the page)",
          notes: "Requires a bachelor's, master's or doctoral degree in nursing, a current unencumbered California RN license (out-of-state applicants must hold a CA license at matriculation), the CCRN, and 24+ months and 4,160+ hours of critical-care RN experience within the last 5 years. 8+ hours of CRNA shadowing; no GRE." },
        cost: { amount: null, basis: "Samuel Merritt publishes an all-inclusive annual Tuition Guide rather than a single program total.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a doctoral nurse-anesthesia program.", by_campus: null, source_url: null },
        accreditation: "Council on Accreditation of Nurse Anesthesia Educational Programs (COA), 10-year accreditation effective May 2024",
        source_url: "https://www.samuelmerritt.edu/college-nursing/doctor-nurse-anesthesia-practice",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "usf-pmhnp", institution: "usf", credential: "pmhnp", open_entry: true,
        name: "DNP — Psychiatric Mental Health NP",
        length: null, format: "Hybrid (online + in-person); year-round; teaching weekends.", prerequisites: [],
        admission: { entrance_exam: null, selection: "holistic (no GRE)", gpa: "3.0 or higher recommended", deadline: "Not stated on the overview page",
          notes: "Requires a BSN or a master's degree in any field from an accredited institution and documentation of an RN license (California / unencumbered per the program's certificate pages). Three letters of recommendation; international applications not currently accepted." },
        cost: { amount: null, basis: "Not published on the program page.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://www.usfca.edu/nursing/programs/graduate/psychiatric-mental-health-nurse-practitioner/program-overview",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "usd-fnp", institution: "usd", credential: "fnp", open_entry: true,
        name: "MSN — Family Nurse Practitioner",
        length: "53 units", format: "On campus, San Diego (graduate level).", prerequisites: [],
        admission: { entrance_exam: null, selection: "qualified applicants are interviewed", gpa: "3.0 minimum", deadline: "Fall 2027 start: domestic June 30, 2027",
          notes: "Requires a BSN from an accredited college/university and an active, unencumbered California RN license (out-of-state applicants must have California endorsement in progress at admission). A statistics course is required (may be in progress). Two letters, a statement of purpose and an interview." },
        cost: { amount: 100700, basis: "Estimated tuition about $100,700 (53 units at $1,900/unit, 2026-27).", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://graduate.catalog.sandiego.edu/programs/major-MSN-GR-M-NU-MSN-FNP2",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "usd-pmhnp", institution: "usd", credential: "pmhnp", open_entry: true,
        name: "MSN — Psychiatric Mental Health NP",
        length: "53 units", format: "On campus, San Diego (graduate level).", prerequisites: [],
        admission: { entrance_exam: null, selection: "qualified applicants are interviewed", gpa: "3.0 minimum", deadline: "Fall 2027 start: domestic June 30, 2027",
          notes: "Requires a BSN and an active, unencumbered California RN license (out-of-state applicants must have California endorsement in progress). A statistics course is required. Graduates are eligible for California NP certification and ANCC board certification." },
        cost: { amount: 100700, basis: "Estimated tuition about $100,700 (53 units at $1,900/unit, 2026-27).", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://graduate.catalog.sandiego.edu/programs/major-MSN-GR-M-NU-MSN-PMH",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "usd-cns", institution: "usd", credential: "cns", open_entry: true,
        name: "MSN — Adult-Gerontology Clinical Nurse Specialist",
        length: "45 units", format: "On campus, San Diego (graduate level).", prerequisites: [],
        admission: { entrance_exam: null, selection: "qualified applicants are interviewed", gpa: "3.0 minimum", deadline: "Spring 2027: domestic Nov 1, 2026; Fall 2027: domestic Aug 1, 2027",
          notes: "Requires a BSN and an active, unencumbered California RN license (out-of-state applicants must have California endorsement in progress). A statistics course is required." },
        cost: { amount: 85500, basis: "Estimated tuition about $85,500 (45 units at $1,900/unit, 2026-27).", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); approved by the California Board of Registered Nursing",
        source_url: "https://graduate.catalog.sandiego.edu/academics/collegeandschools/nursingandhealth",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "azusa-pacific-fnp", institution: "azusa-pacific", credential: "fnp", open_entry: true,
        name: "MSN — Family Nurse Practitioner",
        length: "44-56 units", format: "Azusa, Inland Empire or San Diego.", prerequisites: [],
        admission: { entrance_exam: null, selection: "faculty review of the complete file", gpa: "3.0 cumulative (provisional possible below)", deadline: "Fall start: priority Apr 1, final Jun 15. Spring start: priority Oct 20",
          notes: "Requires a BSN from an NLN- or CCNE-accredited program and a California RN license (verified via the Board's BreEZe system). Undergraduate health-assessment, pathophysiology, research, statistics and leadership courses are expected. FNP requires 540+ supervised direct-care hours. An evangelical Christian university." },
        cost: { amount: null, basis: "APU lists a per-unit rate ($895/credit) and a cost range rather than a single total.", year: "2026-27" },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE); the NP program is approved by the California Board of Registered Nursing",
        source_url: "https://www.apu.edu/programs/msn-np/",
        last_verified: "2026-11-06", academic_year: "2026-27", notes: "" },
      {
        id: "csu-fresno-fnp", institution: "csu-fresno", credential: "fnp", open_entry: true,
        name: "MSN — Nurse Practitioner, Primary Care (Family / FNP option)",
        length: "Minimum 43 units; 750 FNP practicum hours", format: null, prerequisites: [],
        admission: { entrance_exam: null, selection: "Faculty review of the complete file; admission to the NP program is not guaranteed", gpa: "Cumulative GPA 3.0",
          deadline: "Application opens October 1 and closes May 1",
          notes: "Requires a BSN from an NLN- or CCNE-accredited program and a current California RN license. Introductory statistics and research courses, a physical-assessment course (or validation), current CPR, malpractice insurance and three letters of recommendation are required. RNs with a non-nursing bachelor's are reviewed case by case." },
        cost: { amount: null, basis: "No program tuition figure is published on the nursing pages; standard CSU graduate tuition and fees apply.", year: null },
        nclex_pass_rate: { basis: "Not applicable — a graduate program.", by_campus: null, source_url: null },
        accreditation: "Commission on Collegiate Nursing Education (CCNE), accredited through 2035; approved by the California Board of Registered Nursing",
        source_url: "https://chhs.fresnostate.edu/nursing/degrees-programs/msn.html",
        last_verified: "2026-11-06", academic_year: "2026-27",
        notes: "Fresno State offers only the Family (FNP) nurse-practitioner option at the MSN level; its PMHNP and FNP post-master's certificates require an already-licensed nurse practitioner, so they are not entry routes. The Entry-Level Master's option is no longer offered." }
    ],

    // No same-school ADN -> RN-to-BSN steps: the community-college ADNs here are ADN-only, and the
    // universities' RN-to-BSN and graduate programs are open_entry (reached across schools by credential).
    agreements: []
  };

  // ---- School-wide tuition (added 2026-11-11) ----
  // Tuition and required fees for ONE academic year, full-time first-time undergraduates, from the U.S.
  // Department of Education's College Scorecard API (IPEDS data). Scorecard's year key 2025 = academic
  // year 2025-26: its key 2024 matches College Navigator's 2024-25 column exactly (checked on Trinidad
  // State and Aims). For community colleges the resident figure is the IN-DISTRICT rate (Scorecard
  // documents TUITIONFEE_IN as in-district; Aims' figure matches College Navigator's in-district row).
  // Labeled "in-district" only where a district rate exists (Aims, Colorado Mountain College, Arizona's
  // county community colleges); Colorado state-system and California community colleges charge every
  // state resident the same rate, so they're labeled "in-state".
  // This is the school's general rate, NOT a nursing program price: nursing courses often add fees.
  // Branch campuses of out-of-state universities are left out (a home-campus rate would mislead).
  CA.tuition = {
    "csulb": {"unitid": 110583, "federal_name": "California State University-Long Beach", "year": "2025-26", "in_state": 8338, "out_of_state": 21658, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?110583", "last_verified": "2026-11-11"},
    "sdsu": {"unitid": 122409, "federal_name": "San Diego State University", "year": "2025-26", "in_state": 9180, "out_of_state": 25500, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?122409", "last_verified": "2026-11-11"},
    "csus": {"unitid": 110617, "federal_name": "California State University-Sacramento", "year": "2025-26", "in_state": 9014, "out_of_state": 22334, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?110617", "last_verified": "2026-11-11"},
    "csudh": {"unitid": 110547, "federal_name": "California State University-Dominguez Hills", "year": "2025-26", "in_state": 7853, "out_of_state": 21173, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?110547", "last_verified": "2026-11-11"},
    "sfsu": {"unitid": 122597, "federal_name": "San Francisco State University", "year": "2025-26", "in_state": 8324, "out_of_state": 21644, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?122597", "last_verified": "2026-11-11"},
    "csuf": {"unitid": 110565, "federal_name": "California State University-Fullerton", "year": "2025-26", "in_state": 7952, "out_of_state": 21272, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?110565", "last_verified": "2026-11-11"},
    "ccsf": {"unitid": 112190, "federal_name": "City College of San Francisco", "year": "2025-26", "in_state": 1696, "out_of_state": 16096, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?112190", "last_verified": "2026-11-11"},
    "sdcity": {"unitid": 122339, "federal_name": "San Diego City College", "year": "2025-26", "in_state": 1154, "out_of_state": 10010, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?122339", "last_verified": "2026-11-11"},
    "pasadena-cc": {"unitid": 121044, "federal_name": "Pasadena City College", "year": "2025-26", "in_state": 1180, "out_of_state": 11380, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?121044", "last_verified": "2026-11-11"},
    "ucla": {"unitid": 110662, "federal_name": "University of California-Los Angeles", "year": "2025-26", "in_state": 15729, "out_of_state": 53331, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?110662", "last_verified": "2026-11-11"},
    "uci": {"unitid": 110653, "federal_name": "University of California-Irvine", "year": "2025-26", "in_state": 16235, "out_of_state": 53837, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?110653", "last_verified": "2026-11-11"},
    "uc-davis": {"unitid": 110644, "federal_name": "University of California-Davis", "year": "2025-26", "in_state": 17346, "out_of_state": 54948, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?110644", "last_verified": "2026-11-11"},
    "loma-linda": {"unitid": 117636, "federal_name": "Loma Linda University", "year": "2025-26", "in_state": 21032, "out_of_state": 21032, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?117636", "last_verified": "2026-11-11"},
    "usf": {"unitid": 122612, "federal_name": "University of San Francisco", "year": "2025-26", "in_state": 62462, "out_of_state": 62462, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?122612", "last_verified": "2026-11-11"},
    "usd": {"unitid": 122436, "federal_name": "University of San Diego", "year": "2025-26", "in_state": 62420, "out_of_state": 62420, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?122436", "last_verified": "2026-11-11"},
    "azusa-pacific": {"unitid": 109785, "federal_name": "Azusa Pacific University", "year": "2025-26", "in_state": 45340, "out_of_state": 45340, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?109785", "last_verified": "2026-11-11"},
    "santa-rosa-jc": {"unitid": 123013, "federal_name": "Santa Rosa Junior College", "year": "2025-26", "in_state": 1318, "out_of_state": 10930, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?123013", "last_verified": "2026-11-11"},
    "sacramento-city": {"unitid": 122180, "federal_name": "Sacramento City College", "year": "2025-26", "in_state": 1288, "out_of_state": 12472, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?122180", "last_verified": "2026-11-11"},
    "fresno-city": {"unitid": 114789, "federal_name": "Fresno City College", "year": "2025-26", "in_state": 1334, "out_of_state": 10714, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?114789", "last_verified": "2026-11-11"},
    "mt-sac": {"unitid": 119164, "federal_name": "Mt San Antonio College", "year": "2025-26", "in_state": 1364, "out_of_state": 11136, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?119164", "last_verified": "2026-11-11"},
    "riverside-city": {"unitid": 121901, "federal_name": "Riverside City College", "year": "2025-26", "in_state": 1428, "out_of_state": 12498, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?121901", "last_verified": "2026-11-11"},
    "csu-fresno": {"unitid": 110556, "federal_name": "California State University-Fresno", "year": "2025-26", "in_state": 8224, "out_of_state": 21544, "in_label": "in-state", "source_url": "https://collegescorecard.ed.gov/school/?110556", "last_verified": "2026-11-11"}
  };

  window.SCHOOLS = window.SCHOOLS || {};
  window.SCHOOLS.CA = CA;
})();
