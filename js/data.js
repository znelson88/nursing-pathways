// Nursing Pathways — data and pure calculations (pay, taxes, cost, routes).
// Loaded before app.js; top-level consts are shared across both classic scripts.
// Every figure here has a source listed in docs/DATA_SOURCES.md. Update both together.
const narrow=()=>window.matchMedia("(max-width:860px)").matches;
const GROUPS = {
  entry:  {name:"Ways in",            a:180, col:"--g-entry"},
  bedside:{name:"Bedside specialties",a:240, col:"--g-bedside"},
  beyond: {name:"Beyond the bedside", a:300, col:"--g-beyond"},
  lead:   {name:"Leadership & teaching", a:0, col:"--g-lead"},
  aprn:   {name:"Advanced practice (APRN)", a:60, col:"--g-aprn"},
  degree: {name:"Graduate degrees & research", a:120, col:"--g-degree"},
  hub:    {name:"The license", a:0, col:"--g-hub"}
};
const DEF = {
  bedside:{time:"Can start right after licensure; specialty certification usually needs about 2 years of experience."},
  beyond:{time:"Most roles want 1–3 years of bedside experience first."},
  lead:{},
  aprn:{path:"BSN → MSN or DNP in the specialty → national board exam → state APRN license", time:"2–4 years of graduate school, usually after 1–2+ years as an RN"}
};
// id, group, label, credential signature, about, path, time, certification
const N = [
 ["rn","hub","Registered Nurse","RN","The license every path runs through. Graduate from an approved program, pass the NCLEX-RN and get licensed by a state board. Arizona, Colorado and Missouri are in the Nurse Licensure Compact, so one multistate license works across member states. California is not in the compact. In 2025, 86.7% of US-educated first-time test takers passed the NCLEX-RN.","Approved program → NCLEX-RN → state license","Exam is taken within a few months of graduating","NCLEX-RN"],

 ["cna","entry","CNA","CNA","Certified nursing assistant. Hands-on care under an RN: bathing, vitals, helping patients move. Not a nursing license, but many students work as CNAs for experience and pay.","State-approved course → state competency exam","4–12 weeks","State CNA registry"],
 ["lpn","entry","LPN / LVN","LPN","Licensed practical nurse (called LVN in California and Texas). Gives medications, wound care and monitoring under an RN or provider, often in long-term care and clinics.","Practical nursing certificate → NCLEX-PN","12–18 months","NCLEX-PN"],
 ["diploma","entry","Diploma RN","RN","Hospital-run RN programs. Once the main route, now only a few dozen remain, mostly in Pennsylvania, New Jersey and Ohio. Graduates usually go on to an RN-to-BSN.","Hospital diploma program → NCLEX-RN","2–3 years",""],
 ["adn","entry","ADN","ADN, RN","Associate degree in nursing, usually at a community college. The fastest and cheapest route to the RN license. Many hospitals then expect a BSN within a few years.","Prerequisites → ADN → NCLEX-RN","2 years after prerequisites (about 3 total)",""],
 ["bsn","entry","BSN","BSN, RN","Four-year bachelor's degree. Preferred by most hospitals and Magnet facilities and required for military nursing and most graduate programs. The NAU, UArizona and UCCS programs are this route.","4-year BSN → NCLEX-RN","4 years",""],
 ["absn","entry","Accelerated BSN","BSN, RN","For people who already hold a bachelor's in another field. Full-time and intense, with little room for a job on the side.","Prior bachelor's + science prerequisites → ABSN → NCLEX-RN","12–18 months",""],
 ["demsn","entry","Direct-entry MSN","MSN, RN","A master's-level entry for non-nursing bachelor's holders, such as UArizona's MEPN. You finish with RN licensure and a master's degree.","Prior bachelor's → entry-level MSN → NCLEX-RN","15 months–3 years",""],

 ["rnbsn","degree","RN-to-BSN","BSN, RN","Online completion degree for ADN and diploma nurses, usually done while working. Many employers help pay for it.","Working RN → online BSN completion","9–24 months",""],
 ["msn","degree","MSN","MSN, RN","Master of Science in Nursing. The gateway to most nurse practitioner, midwife and specialist roles, plus education, informatics and leadership tracks. RN-to-MSN bridges let ADN nurses skip a separate BSN. Nurse anesthesia is the exception: it now requires a doctorate.","BSN (or RN-to-MSN bridge) → MSN","2–3 years from a BSN",""],
 ["pmc","degree","Post-master's certificate","MSN, APRN, FNP-C, PMHNP-BC","Adds a second specialty without a whole new degree. A common example is a family NP adding psychiatric mental health.","MSN or DNP → certificate in new specialty → board exam","1–2 years",""],
 ["dnp","degree","DNP","DNP, APRN","Doctor of Nursing Practice, the clinical doctorate. Many schools now offer NP and midwifery tracks as BSN-to-DNP programs. Nurse anesthesia programs award their own doctorate, so you don't need a DNP before applying.","BSN-to-DNP, or MSN-to-DNP","3–4 years from a BSN; 1–2 years from an MSN",""],
 ["phd","degree","PhD in Nursing","PhD, RN","Research doctorate focused on producing new knowledge. Leads to nurse scientist and tenure-track faculty roles. Many programs come with funding.","BSN or MSN → PhD","4–6 years",""],
 ["scientist","degree","Nurse scientist","PhD, RN, FAAN","Designs and runs funded research on care, outcomes and health systems at universities, hospitals and federal agencies.","PhD → often a postdoc","After the PhD",""],

 ["medsurg","bedside","Medical-surgical","BSN, RN, CMSRN","Adults recovering from surgery or managing acute illness. The most common first job, and the base for nearly every other specialty.","","","CMSRN"],
 ["icu","bedside","ICU / critical care","BSN, RN, CCRN","Ventilators, continuous drips and unstable patients. ICU time is required for nurse anesthesia school and is a strong base for acute-care NP and flight nursing.","New-grad ICU residency, or 1–2 years med-surg first","","CCRN"],
 ["er","bedside","Emergency","BSN, RN, CEN","Triage and fast decisions for every age and condition. Leads naturally to flight nursing, forensic nursing and emergency NP roles.","","","CEN"],
 ["peds","bedside","Pediatrics","BSN, RN, CPN","Infants through teens in hospitals and clinics, with families as part of the care team.","","","CPN"],
 ["ld","bedside","Labor & delivery","BSN, RN, RNC-OB","Monitoring labor, assisting births and early postpartum care. The usual path toward midwifery.","","","RNC-OB"],
 ["nicu","bedside","NICU","BSN, RN, RNC-NIC","Premature and critically ill newborns. NICU experience is typically required for neonatal NP programs.","","","RNC-NIC"],
 ["onc","bedside","Oncology","BSN, RN, OCN","Chemotherapy, symptom management and long-term relationships with cancer patients, inpatient or in infusion centers.","","","OCN"],
 ["or","bedside","Operating room","BSN, RN, CNOR","Circulating and scrub roles during surgery. With extra training, RNs can become first assistants.","","","CNOR; CRNFA after an RNFA program"],
 ["psych","bedside","Psychiatric","BSN, RN, PMH-BC","Inpatient and outpatient mental health and substance use care. The common base for psych NP programs.","","","PMH-BC"],
 ["cardiac","bedside","Cardiac / step-down","BSN, RN, PCCN","Telemetry, step-down, cardiac ICU and cath lab work.","","","PCCN or CV-BC"],
 ["dialysis","bedside","Dialysis / nephrology","BSN, RN, CNN","Kidney failure care in dialysis centers and hospitals. Steady schedules, often with few nights or weekends.","","","CNN (needs a nursing bachelor's and 3,000 nephrology hours) or CDN"],
 ["hospice","bedside","Hospice & palliative","RN, CHPN","Comfort-focused care at the end of life, at home or in facilities.","","","CHPN"],

 ["home","beyond","Home health","RN","Visiting patients at home after hospital stays. Independent work with a car as your office.","","",""],
 ["public","beyond","Public health","BSN, RN","Health departments: vaccinations, disease investigation and community programs. A BSN is usually preferred.","","",""],
 ["school","beyond","School nurse","BSN, RN, NCSN","Care for students during the school day, chronic condition plans and health screenings. Some states require extra school nurse certification.","","","NCSN"],
 ["tele","beyond","Telehealth & triage","RN","Phone and video triage for health systems and insurers. Often fully remote.","","",""],
 ["travel","beyond","Travel nurse","BSN, RN, CCRN","Short contracts, typically 13 weeks, in hospitals around the country. Usually needs 1–2 years in a specialty. A compact license makes it easier.","","",""],
 ["flight","beyond","Flight / transport","BSN, RN, CFRN","Helicopter, fixed-wing and ground critical care transport. Employers usually want 3+ years of ICU or ER experience; some accept 2.","","","CFRN or CTRN"],
 ["military","beyond","Military Nurse Corps","BSN, RN","Commissioned officer in the Army, Navy or Air Force. A BSN is required. ROTC scholarships and loan repayment are available.","BSN → commission as an officer","",""],
 ["corr","beyond","Correctional","RN","Health care for people in jails and prisons, often with heavy mental health needs.","","",""],
 ["occ","beyond","Occupational health","RN, COHN","Workplace injury care, screenings and safety programs for employers.","","","COHN"],
 ["sane","beyond","Forensic / SANE","RN, SANE-A","Sexual assault nurse examiners give care and collect evidence after assaults, and may testify in court.","ER or women's health experience + SANE training","","SANE-A or SANE-P"],
 ["legal","beyond","Legal nurse consultant","BSN, RN, LNCC","Reviews medical records and explains care for law firms and insurers. Often freelance.","","Usually 5+ years of clinical experience first","LNCC (requires 5 years as an RN plus legal consulting hours)"],
 ["aesth","beyond","Aesthetics","RN, CANS","Injectables and skin treatments in med spas. What an RN may do on their own depends on state law.","","","CANS"],
 ["info","beyond","Informatics","MSN, RN, NI-BC","Builds and supports electronic health record systems and trains staff on them. Bridges nursing and IT.","","","Informatics Nursing (NI-BC, ANCC)"],
 ["case","beyond","Case management","BSN, RN, CCM","Coordinates discharges, insurance approvals and follow-up care for hospitals and insurers.","","","CCM"],
 ["ip","beyond","Infection prevention","BSN, RN, CIC","Tracks hospital infections, runs outbreak investigations and sets prevention policy.","","","CIC"],
 ["woc","beyond","Wound, ostomy & continence","BSN, RN, CWOCN","Specialist consultant for complex wounds, ostomies and pressure injuries.","","","CWOCN"],
 ["research","beyond","Clinical research nurse","BSN, RN, CCRP","Runs study visits for drug and device trials at hospitals and research sites.","","","CCRP or CCRC"],
 ["industry","beyond","Pharma & health tech","BSN, RN","Clinical educator, medical science liaison and product roles at drug, device and software companies.","","",""],
 ["entre","beyond","Nurse entrepreneur","DNP, APRN, FNP-C","Own clinic, IV or aesthetics business, staffing agency or consulting firm. NPs in full-practice states can run independent practices.","","",""],

 ["charge","lead","Charge nurse","BSN, RN","Runs the unit for a shift: assignments, patient flow and escalations. The first step into leadership.","","1–3 years in on the unit",""],
 ["manager","lead","Nurse manager","MSN, RN, NE-BC","Round-the-clock responsibility for a unit: staffing, budget and quality. BSN usually required; MSN often preferred.","","","NE-BC"],
 ["director","lead","Director of nursing","MSN, RN, NE-BC","Oversees several units or a service line.","","","NE-BC"],
 ["cno","lead","Chief nursing officer","DNP, RN, NEA-BC","Top nurse executive for a hospital or health system. Usually holds an MSN or DNP, sometimes with an MBA or MHA.","","","NEA-BC"],
 ["educator","lead","Clinical nurse educator","MSN, RN, NPD-BC","Trains staff and new graduates inside a hospital and runs nurse residency programs.","","","NPD-BC"],
 ["faculty","lead","Nursing faculty","PhD, RN, CNE","Teaches in ADN, BSN and graduate programs. An MSN is enough for clinical instructor jobs; tenure-track roles need a doctorate.","","","CNE"],
 ["quality","lead","Quality & patient safety","MSN, RN, CPHQ","Measures outcomes, investigates errors and leads improvement projects.","","","CPHQ"],
 ["policy","lead","Health policy","DNP, RN","Advocacy and policy work for nursing associations, government agencies and legislatures.","","",""],

 ["fnp","aprn","Family NP","MSN, APRN, FNP-C","Primary care for all ages: diagnosing, prescribing and managing chronic conditions. The most common NP track.","","","FNP-C or FNP-BC"],
 ["agpcnp","aprn","Adult-gero primary care NP","MSN, APRN, AGPCNP-BC","Primary care for teens through older adults.","","","AGPCNP-BC"],
 ["agacnp","aprn","Adult-gero acute care NP","MSN, APRN, AGACNP-BC","Hospital-based NP on ICU, hospitalist and specialty teams. ICU experience is usually expected.","","","AGACNP-BC or ACNPC-AG"],
 ["pnp","aprn","Pediatric NP","MSN, APRN, CPNP-PC","Primary or acute care for children.","","","CPNP-PC or CPNP-AC"],
 ["pmhnp","aprn","Psych-mental health NP","MSN, APRN, PMHNP-BC","Diagnoses mental health conditions and prescribes treatment across the lifespan. Widely reported as one of the highest-demand NP specialties.","","","PMHNP-BC"],
 ["whnp","aprn","Women's health NP","MSN, APRN, WHNP-BC","Gynecologic, reproductive and prenatal care.","","","WHNP-BC"],
 ["nnp","aprn","Neonatal NP","MSN, APRN, NNP-BC","Manages premature and sick newborns. Programs typically require about 2 years of NICU experience.","","","NNP-BC"],
 ["enp","aprn","Emergency NP","MSN, APRN, FNP-C, ENP-C","Emergency department and urgent care. Usually an FNP first, then an emergency certificate and board exam.","FNP + emergency experience or post-master's certificate","","ENP-C"],
 ["cns","aprn","Clinical nurse specialist","MSN, APRN, ACCNS-AG","Expert in a population or specialty who improves care across units through teaching, research and consulting.","","","ACCNS-AG, AGCNS-BC and others"],
 ["cnm","aprn","Certified nurse-midwife","MSN, APRN, CNM","Prenatal care, births and gynecologic care in hospitals, birth centers and clinics. A graduate degree is required.","BSN → labor & delivery experience (recommended) → midwifery MSN or DNP","2–3 years","CNM (AMCB)"],
 ["crna","aprn","Nurse anesthetist","DNP, CRNA","Gives anesthesia for surgery, childbirth and procedures. Students entering programs since 2022 must earn a doctorate. At least 1 year of ICU experience is required, and most applicants have 2 or more.","BSN → ICU experience → doctoral nurse anesthesia program → NBCRNA exam","About 3 years of school after ICU experience","CRNA (NBCRNA)"]
];
// ---------- Western US money data ----------
// Pay: annual state medians, BLS OEWS 2025 (via AmericaByNumbers). nat = US median.
const STATES = {AK:"Alaska",AZ:"Arizona",CA:"California",CO:"Colorado",HI:"Hawaii",ID:"Idaho",MT:"Montana",NV:"Nevada",NM:"New Mexico",OR:"Oregon",UT:"Utah",WA:"Washington",WY:"Wyoming"};
// Nurse Licensure Compact member states. Shared by the map page (app.js) and the schools page
// (schools.js), so a cross-state route can honestly say whether an RN license carries over.
// California is NOT a member — a nurse moving there applies for licensure by endorsement.
const NLC = new Set(["AZ","CO","ID","MO","MT","NM","UT","WA","WY"]);
const PAY = {
  cna:{name:"Nursing assistants",nat:42260,st:{AK:46370,AZ:44780,CA:47630,CO:47380,HI:45350,ID:38650,MT:40900,NV:45490,NM:39390,OR:49830,UT:39840,WA:49180,WY:39160}},
  lpn:{name:"LPNs / LVNs",nat:64400,st:{AK:80800,AZ:77070,CA:79750,CO:73880,HI:71140,ID:63800,MT:62210,NV:76160,NM:59330,OR:80470,UT:63230,WA:83150,WY:63460}},
  rn:{name:"Registered nurses",nat:97550,st:{AK:109480,AZ:99500,CA:140270,CO:100260,HI:136320,ID:92460,MT:85280,NV:103670,NM:94340,OR:129010,UT:84600,WA:124200,WY:83760}},
  np:{name:"Nurse practitioners",nat:132300,st:{AK:155170,AZ:134420,CA:168520,CO:132930,HI:135570,ID:132540,MT:137210,NV:140670,NM:137520,OR:155680,UT:130920,WA:156100,WY:132200}},
  cnm:{name:"Nurse midwives",nat:134040,st:{AK:133430,AZ:140960,CA:203840,CO:137610,HI:170110,NM:123350,OR:146900,UT:130930,WA:158970}},
  crna:{name:"Nurse anesthetists",nat:236590,st:{AK:341210,AZ:248660,CA:292410,CO:205020,ID:263130,MT:277380,OR:272330,WA:274390,WY:255250},
        gap:"BLS publishes no figure for Colorado, Hawaii or Nevada; Colorado here is a third-party estimate. BLS figures for New Mexico ($129k) and Utah ($127k) look anomalous and are left out."},
  mgr:{name:"Health services managers",nat:123860,st:{AK:132240,AZ:128850,CA:141480,CO:134910,HI:147630,ID:117770,MT:105840,NV:119990,NM:124300,OR:141690,UT:114980,WA:145290,WY:108030}},
  fac:{name:"Nursing faculty",nat:80250,st:{AK:85650,AZ:78980,CA:81960,CO:82530,HI:129530,ID:90890,MT:77980,NV:96500,NM:79380,OR:78050,UT:82320,WA:81630,WY:72590}}
};
Object.values(PAY).forEach(p=>{const e=Object.entries(p.st);p.lo=e.reduce((a,b)=>b[1]<a[1]?b:a);p.hi=e.reduce((a,b)=>b[1]>a[1]?b:a);});
const SCALE = 260000;
let pickState = "none";
try{const s=localStorage.getItem("np-state"); if(s&&(STATES[s]||s==="none"))pickState=s;}catch(e){}
const RNnote = {
  up:"Usually above the RN median for the state. Night, critical care and on-call differentials add up.",
  mid:"Usually close to the RN median for the state.",
  low:"Often below the RN median for the state."
};
// id: [pay key or null, note]
const P = {
  cna:["cna","Hospital CNAs usually earn more than nursing home CNAs."],
  lpn:["lpn","Most LPN jobs are in long-term care, clinics and home health. California and Texas call them LVNs."],
  diploma:["rn","Diploma, ADN and BSN nurses often start at similar pay; the BSN pays off through promotions and specialty roles."],
  adn:["rn","New graduates usually start near the low end of their state's range. Big metros pay more than small towns in the same state."],
  bsn:["rn","New graduates usually start near the low end of their state's range. Big metros pay more than small towns in the same state."],
  absn:["rn","Same RN pay as any other new graduate."],
  demsn:["rn","Starts at RN pay; the master's helps later with leadership and teaching jobs."],
  rn:["rn","California and Hawaii pay the most before taxes, but state income tax and housing eat into it. After both, Washington comes out on top because it has no state income tax. Utah ends up last."],
  rnbsn:["rn","Many hospitals pay a small raise or bonus for finishing a BSN."],
  msn:[null,"Pay depends on the role the MSN leads to: see the nurse practitioner, leadership and faculty roles."],
  pmc:["np","Adds a second NP specialty, such as psych, which can raise demand for your skills."],
  dnp:[null,"A DNP rarely changes NP pay much by itself; it matters most for nurse anesthetists, executives and faculty."],
  phd:["fac","Most PhD-prepared nurses work in academia or research."],
  scientist:["fac","Research roles funded by grants often pay above the faculty median."],
  medsurg:["rn",RNnote.mid], icu:["rn",RNnote.up], er:["rn",RNnote.up], peds:["rn",RNnote.mid],
  ld:["rn",RNnote.mid], nicu:["rn",RNnote.mid], onc:["rn",RNnote.mid], or:["rn",RNnote.up+" OR call pay is common."],
  psych:["rn",RNnote.mid], cardiac:["rn",RNnote.up], dialysis:["rn",RNnote.mid], hospice:["rn",RNnote.mid],
  home:["rn","Often paid per visit, so it varies with your caseload."],
  public:["rn",RNnote.low+" Government jobs offset it with benefits and regular hours."],
  school:["rn",RNnote.low+" Many school nurses follow a district pay scale and work a school-year calendar."],
  tele:["rn",RNnote.mid], travel:["rn","Travel contracts often pay well above staff rates, including housing stipends. They swing with demand."],
  flight:["rn",RNnote.up], military:[null,"Paid on the military officer pay scale, which is the same everywhere, plus a tax-free housing allowance that depends on where you're stationed."],
  corr:["rn",RNnote.mid], occ:["rn",RNnote.mid], sane:["rn","Often an add-on to an ER or clinic job, with on-call pay for exams."],
  legal:[null,"Freelance consultants bill by the hour, so income depends on how many cases you take."],
  aesth:["rn","Often base pay plus commission or per-treatment bonuses."],
  info:["rn",RNnote.up+" Senior informatics roles can pay well above it."],
  case:["rn",RNnote.mid], ip:["rn",RNnote.mid], woc:["rn",RNnote.mid], research:["rn",RNnote.mid],
  industry:[null,"Often above the RN median, especially medical science liaison and sales-adjacent roles, but no public state figures exist."],
  entre:[null,"Depends entirely on the business."],
  charge:["rn",RNnote.up+" Charge pay is usually an hourly add-on."],
  manager:["mgr","BLS groups nurse managers with all health services managers. Unit managers usually sit in the middle."],
  director:["mgr","Directors usually sit above the state median."],
  cno:["mgr","Chief nursing officers usually earn well above these medians, especially in large systems."],
  educator:["rn",RNnote.mid], faculty:["fac","Clinical instructors with an MSN sit lower; tenured professors with a doctorate sit higher. Faculty often earn less than experienced bedside RNs."],
  quality:["rn",RNnote.up], policy:[null,"Varies widely by employer: associations, agencies and legislatures pay very differently."],
  fnp:["np","After taxes and cost of living, Alaska, Washington and Wyoming lead for NPs, all states without an income tax. Hawaii ends up last."], agpcnp:["np",""], agacnp:["np","Hospital-based acute care NPs often land above the state median."],
  pnp:["np",""], pmhnp:["np","Psych NPs are in high demand and often land above the state median."], whnp:["np",""],
  nnp:["np","Neonatal NPs often land above the state median."], enp:["np","Emergency NPs often land above the state median."],
  cns:["rn","BLS counts clinical nurse specialists with RNs. CNSs usually earn well above the RN median."],
  cnm:["cnm","California pays far more than the rest of the West."], crna:["crna","The highest-paid nursing role. Alaska's figure is unusually high."]
};
// Cost across the western US: [range, note, kind]. "pub" = published price, "est" = estimate from published rates or typical ranges.
const CERT = ["Exam about $250–$500","No extra degree needed. You pay a certification exam fee once you have the required practice hours, and many employers reimburse it.","est"];
const NPCOST = ["$25,000–$80,000","Public in-state NP programs. Example: CU Anschutz charges Colorado residents $820 per credit for 45–60 credits. Out-of-state and private programs often run $80,000–$120,000+.","est"];
const COST = {
  cna:["$500–$2,500","Community college or Red Cross course plus the state exam. Example: Community College of Denver, about $1,500. Many nursing homes and hospitals train CNAs for free.","est"],
  lpn:["$8,000–$30,000","Community college certificates sit at the low end; private and for-profit schools at the high end.","est"],
  diploma:["Few or none in the West","Most remaining hospital diploma programs are in the eastern US.","est"],
  adn:["$5,000–$35,000","Public community colleges. California's are among the cheapest in the country; Pikes Peak State College in Colorado runs about $29,600 for residents with books and fees (2025–26). For-profit ADN programs can top $40,000–$100,000. Prerequisites are extra.","est"],
  bsn:["$35,000–$170,000 for 4 years","Public schools. In-state ranges from about $35,000 (Cal State) and $55,000–$70,000 (NAU, UArizona, UCCS). WUE, where nursing qualifies (NAU and UCCS do; UArizona doesn't), runs about $75,000–$100,000. Full out-of-state rates run about $110,000–$170,000. Private schools often run $150,000–$250,000.","est"],
  absn:["$30,000–$90,000","Public programs at the low end, private at the high end. Working during these programs is hard, so add living costs.","est"],
  demsn:["$50,000–$120,000","Examples include UArizona's MEPN. Few public options exist, so many are private.","est"],
  rn:["$300–$600","NCLEX-RN exam ($200) plus a state license application, which runs about $100–$350 depending on the state (California is about $350 plus fingerprinting).","est"],
  rnbsn:["$7,000–$20,000","Online completion programs. Example: CU Anschutz charged Colorado residents $2,500 per semester (2025–26). Many hospitals help pay.","est"],
  msn:NPCOST, pmc:["$12,000–$35,000","About 20–30 credits at graduate rates.","est"],
  dnp:["$25,000–$120,000","MSN-to-DNP at public schools sits at the low end; BSN-to-DNP and private programs at the high end.","est"],
  phd:["Often funded","Many PhD students get tuition waivers plus a stipend. Unfunded programs can cost $40,000–$100,000.","est"],
  scientist:["Postdoc is paid","After the PhD, postdoctoral positions pay a salary instead of charging tuition.","est"],
  military:["Can be free","Army, Navy and Air Force ROTC scholarships cover tuition, and the services offer loan repayment for nurses.","est"],
  info:["$0–$60,000","Some start with only a certification; many add an MSN in informatics.","est"],
  sane:["Often employer-paid","A 40-hour SANE course plus supervised exams before the certification test.","est"],
  aesth:["Several thousand dollars","Injector training courses, usually paid out of pocket.","est"],
  legal:["Exam plus training course","Optional LNCC certification after several years of practice.","est"],
  industry:["No added school","Hired for clinical experience; an MSN or MBA helps for senior roles.","est"],
  entre:["Business startup costs","Licensing, insurance and space, on top of whatever clinical degree the business needs.","est"],
  charge:["No added school","Comes from experience on the unit.","est"],
  manager:["$25,000–$60,000","An MSN in leadership is often expected for managers.","est"],
  director:["$25,000–$60,000","An MSN in leadership; some add an MBA or MHA.","est"],
  cno:["$25,000–$120,000+","An MSN or DNP, often with an MBA or MHA as well.","est"],
  educator:["$25,000–$60,000","An MSN in nursing education.","est"],
  faculty:["$25,000–$100,000","An MSN for clinical teaching; a DNP or PhD (often funded) for tenure track.","est"],
  quality:CERT, policy:["Varies","Often an MSN, DNP or MPH.","est"],
  enp:["$12,000–$30,000","A post-master's emergency certificate after becoming an FNP.","est"],
  crna:["$85,000–$195,000","Real 2026–27 examples: Missouri State about $85,000–$91,000 (same rate in or out of state), UArizona about $115,000 (estimate), Idaho State about $129,000 in-state, Midwestern University (private) about $171,000. CU Anschutz lists a new public nurse anesthesia DNP at $1,583 per credit for Colorado residents (about $64,000 a year), so check its status. Students generally can't work during the program, so living costs come on top.","est"],
  cnm:NPCOST, cns:NPCOST
};
["fnp","agpcnp","agacnp","pnp","pmhnp","whnp","nnp"].forEach(k=>COST[k]=NPCOST);
const money=n=>{const a=Math.abs(n),sg=n<0?"−":"";return a<1000?sg+"$"+Math.round(a):sg+"$"+Math.round(a/1000)+"k";};
// BEA Regional Price Parities 2024 (released Feb 2026), all items (US = 100)
const RPP = {MO:90.8,AK:102.4,AZ:100.7,CA:110.7,CO:103.1,HI:110.0,ID:95.5,MT:94.6,NV:100.0,NM:92.2,OR:103.4,UT:98.9,WA:107.0,WY:92.7};
let adj=false; try{adj=localStorage.getItem("np-adj")==="1"}catch(e){}
// ---------- 2026 take-home pay, single filer, wages only ----------
const brk=(x,b)=>{let t=0;for(let i=0;i<b.length;i++){const [lo,r]=b[i],hi=i+1<b.length?b[i+1][0]:Infinity;if(x>lo)t+=(Math.min(x,hi)-lo)*r;}return t;};
const FED=[[0,.10],[12400,.12],[50400,.22],[105700,.24],[201775,.32],[256225,.35],[640600,.37]];
function fedTax(g){return brk(Math.max(0,g-16100),FED);}
function fica(g){return Math.min(g,184500)*.062+g*.0145+Math.max(0,g-200000)*.009;}
const STAX={
  AK:()=>0, NV:()=>0, WA:()=>0, WY:()=>0,
  AZ:g=>Math.max(0,g-16100)*.025,
  MO:g=>brk(Math.max(0,g-16100),[[0,0],[1348,.02],[2696,.025],[4044,.03],[5392,.035],[6740,.04],[8088,.045],[9436,.047]]),
  CO:g=>Math.max(0,g-16100)*.044,
  ID:g=>brk(Math.max(0,g-16100),[[0,0],[4811,.053]]),
  MT:g=>brk(Math.max(0,g-16100),[[0,.047],[47500,.0565]]),
  NM:g=>brk(Math.max(0,g-16100),[[0,.015],[5500,.032],[16500,.043],[33500,.047],[66500,.049],[210000,.059]]),
  UT:g=>Math.max(0,g*.0445-Math.max(0,966-.013*Math.max(0,g-18213))),
  CA:g=>Math.max(0,brk(Math.max(0,g-5540),[[0,.01],[11079,.02],[26264,.04],[41452,.06],[57542,.08],[72724,.093],[371479,.103],[445771,.113],[742953,.123],[1000000,.133]])-153),
  HI:g=>brk(Math.max(0,g-8000-1144),[[0,.014],[9600,.032],[14400,.055],[19200,.064],[24000,.068],[36000,.072],[48000,.076],[125000,.079],[175000,.0825],[225000,.09],[275000,.10],[325000,.11]]),
  OR:g=>{const f=fedTax(g),cap=g<=125000?8750:g>=145000?0:8750*(145000-g)/20000;
         return Math.max(0,brk(Math.max(0,g-2910-Math.min(f,cap)),[[0,.0475],[4550,.0675],[11400,.0875],[125000,.099]])-(g<=100000?263:0));}
};
function net(st,g){return g-fedTax(g)-fica(g)-(st&&STAX[st]?STAX[st](g):0);}
const val=(s,v)=>{const t=net(s,v);return adj?t/(RPP[s]/100):t;};
// Degree steps: pay key, the pay you had before, program cost range
const NPSTEP={pay:"np",base:"rn",cost:[25000,80000],what:"an NP degree"};
const VAL = {
  lpn:{pay:"lpn",base:"cna",cost:[8000,30000],what:"an LPN certificate"},
  adn:{pay:"rn",base:"cna",cost:[5000,35000],what:"an ADN"},
  bsn:{pay:"rn",base:"cna",cost:[35000,170000],what:"a BSN"},
  absn:{pay:"rn",base:"cna",cost:[30000,90000],what:"an accelerated BSN",lost:true},
  demsn:{pay:"rn",base:"cna",cost:[50000,120000],what:"a direct-entry MSN",lost:true},
  msn:NPSTEP, fnp:NPSTEP, agpcnp:NPSTEP, agacnp:NPSTEP, pnp:NPSTEP, pmhnp:NPSTEP, whnp:NPSTEP, nnp:NPSTEP,
  cnm:{pay:"cnm",base:"rn",cost:[25000,80000],what:"a midwifery degree"},
  crna:{pay:"crna",base:"rn",cost:[85000,195000],what:"a nurse anesthesia doctorate",lost:true},
  manager:{pay:"mgr",base:"rn",cost:[25000,60000],what:"a leadership MSN"},
  director:{pay:"mgr",base:"rn",cost:[25000,60000],what:"a leadership MSN"},
  faculty:{pay:"fac",base:"rn",cost:[25000,100000],what:"a graduate degree for teaching"}
};
const RATE={ug:0.0652, gr:0.0807};  // federal Direct loan rates for 2026–27
["lpn","adn","bsn","absn"].forEach(k=>VAL[k]=Object.assign({},VAL[k],{lvl:"ug"}));
const pmt=(P,r)=>P*(r/12)/(1-Math.pow(1+r/12,-120));
// ---------- Full pathways: steps with cost and years ----------
const STEP={
  cna:{n:"CNA course",c:[500,2500],y:[.1,.25],ug:1},
  lpn:{n:"LPN certificate",c:[8000,30000],y:[1,1.5],ug:1},
  adn:{n:"ADN, with prerequisites",c:[5000,35000],y:[2.5,4],ug:1},
  bsn:{n:"BSN",c:[35000,170000],y:[4,4],ug:1},
  prior:{n:"Bachelor's in another field (most applicants already have it)",c:[35000,170000],y:[4,4],ug:1},
  absn:{n:"Accelerated BSN",c:[30000,90000],y:[1,1.5],ug:1},
  demsn:{n:"Direct-entry MSN",c:[50000,120000],y:[1.25,3]},
  nclex:{n:"NCLEX-RN + license",c:[300,600],y:[0,0],ug:1},
  rnbsn:{n:"RN-to-BSN (while working)",c:[7000,20000],y:[.75,2],ug:1},
  rnexp:{n:"RN experience (you're earning)",c:[0,0],y:[1,2],work:1},
  specexp:{n:"Experience in the specialty (you're earning)",c:[0,0],y:[1,2],work:1},
  icuexp:{n:"ICU experience (you're earning)",c:[0,0],y:[1,3],work:1},
  cert:{n:"Certification exam",c:[250,500],y:[0,0],ug:1},
  msn:{n:"NP or specialty MSN",c:[25000,80000],y:[2,3]},
  leadmsn:{n:"MSN in leadership or education",c:[25000,60000],y:[2,3]},
  pmc:{n:"Post-master's certificate",c:[12000,35000],y:[1,2]},
  dnp:{n:"BSN-to-DNP",c:[50000,120000],y:[3,4]},
  phd:{n:"PhD (often funded)",c:[0,100000],y:[4,6]},
  crna:{n:"Nurse anesthesia doctorate",c:[85000,195000],y:[3,3]},
  enp:{n:"Emergency NP certificate",c:[12000,30000],y:[1,2]},
  exec:{n:"MBA, MHA or DNP for executives",c:[25000,120000],y:[2,4]},
  mgrexp:{n:"Management experience (you're earning)",c:[0,0],y:[3,8],work:1}
};
const R_ADN=["adn","nclex"], R_BSN=["bsn","nclex"];
const rr=(n,steps)=>({n,steps});
const NPR=[rr("BSN route",[...R_BSN,"rnexp","msn"]),rr("ADN route",[...R_ADN,"rnexp","rnbsn","msn"])];
const SPEC=[rr("BSN route",[...R_BSN,"specexp","cert"]),rr("ADN route",[...R_ADN,"specexp","cert"])];
const ROUTES={
  cna:[rr("Direct",["cna"])], lpn:[rr("Direct",["lpn"])],
  adn:[rr("Community college",[...R_ADN])], bsn:[rr("University",[...R_BSN])],
  absn:[rr("Second-degree route",["prior","absn","nclex"])], demsn:[rr("Second-degree route",["prior","demsn","nclex"])],
  rn:[rr("BSN route",[...R_BSN]),rr("ADN route",[...R_ADN]),rr("LPN bridge",["lpn","adn","nclex"])],
  rnbsn:[rr("ADN, then BSN online",[...R_ADN,"rnbsn"])],
  msn:NPR, cnm:NPR, cns:NPR, fnp:NPR, agpcnp:NPR, agacnp:NPR, pnp:NPR, pmhnp:NPR, whnp:NPR, nnp:NPR,
  pmc:[rr("BSN route",[...R_BSN,"rnexp","msn","pmc"])],
  enp:[rr("BSN route",[...R_BSN,"rnexp","msn","specexp","enp"])],
  dnp:[rr("BSN-to-DNP",[...R_BSN,"rnexp","dnp"]),rr("MSN, then DNP",[...R_BSN,"rnexp","msn","pmc"])],
  phd:[rr("BSN-to-PhD",[...R_BSN,"phd"])], scientist:[rr("BSN-to-PhD",[...R_BSN,"phd"])],
  crna:[rr("BSN route",[...R_BSN,"icuexp","crna"]),rr("ADN route",[...R_ADN,"icuexp","rnbsn","crna"])],
  manager:[rr("BSN route",[...R_BSN,"rnexp","leadmsn"])], director:[rr("BSN route",[...R_BSN,"rnexp","leadmsn","mgrexp"])],
  cno:[rr("BSN route",[...R_BSN,"rnexp","leadmsn","mgrexp","exec"])],
  educator:[rr("BSN route",[...R_BSN,"rnexp","leadmsn"])], faculty:[rr("MSN route",[...R_BSN,"rnexp","leadmsn"]),rr("PhD route",[...R_BSN,"phd"])],
  military:[rr("BSN route",[...R_BSN])], charge:[rr("BSN route",[...R_BSN,"rnexp"]),rr("ADN route",[...R_ADN,"rnexp"])],
  info:[rr("BSN route",[...R_BSN,"rnexp","cert"]),rr("With an MSN",[...R_BSN,"rnexp","leadmsn"])]
};
// dnp "MSN, then DNP": reuse pmc cost range as the MSN-to-DNP top-up
STEP.msndnp={n:"MSN-to-DNP",c:[25000,60000],y:[1,2]};
ROUTES.dnp[1].steps[ROUTES.dnp[1].steps.length-1]="msndnp";
function routesFor(n){return ROUTES[n.id]||((n.g==="bedside"||n.g==="beyond")?SPEC:null);}
const tot=(steps,i)=>steps.reduce((a,k)=>a+STEP[k].c[i],0);
const yrs=(steps,i)=>steps.reduce((a,k)=>a+STEP[k].y[i],0);
const fyr=(a,b)=>fy(a)===fy(b)&&b>=1?`${fy(b)} yrs`:b<1?`${Math.max(1,Math.round(a*12))}–${Math.round(b*12)} months`:`${fy(a)}–${fy(b)} yrs`;
const fy=y=>{const r=Math.round(y*2)/2;return (r%1?Math.floor(r)+"½":r)+"";};
function pathHTML(n){
  const R=routesFor(n); if(!R)return "";
  const all=R.map(r=>({r,lo:tot(r.steps,0),hi:tot(r.steps,1),yl:yrs(r.steps,0),yh:yrs(r.steps,1)}));
  return `<section class="money"><h3>Full pathway from the start <span class="src">Estimate</span></h3>
   ${all.map(x=>{const mid=x.lo+x.hi||1;
     return `<div class="route"><div class="rtop"><b>${x.r.n}</b><span>${fyr(x.yl,x.yh)}</span></div>
      <div class="amt sm">${money(x.lo)}–${money(x.hi)}</div>
      <div class="stack" aria-hidden="true">${x.r.steps.filter(k=>STEP[k].c[1]>0).map(k=>`<span style="flex:${(STEP[k].c[0]+STEP[k].c[1])/mid*100}" title="${STEP[k].n}"></span>`).join("")}</div>
      <ol class="steps">${x.r.steps.map(k=>{const t=STEP[k];return `<li class="${t.work?"work":""}"><span>${t.n}</span><span>${t.work?"earning":t.c[1]?money(t.c[0])+"–"+money(t.c[1]):"—"}</span></li>`}).join("")}</ol></div>`;}).join("")}
   <div class="note">Tuition and fees for every step, in order, using the same western ranges as above. Years working as a nurse add time but not cost, since you're earning a paycheck; they're often required before the next program will admit you. Low end assumes in-state public schools all the way; high end assumes out-of-state or private.</div></section>`;
}
function pathDebt(n){
  const R=routesFor(n); if(!R||R.length===0)return null;
  const school=k=>!STEP[k].work;
  let best=null,worst=null;
  R.forEach(r=>{const lo=tot(r.steps,0),hi=tot(r.steps,1);
    const m=i=>r.steps.filter(school).reduce((a,k)=>a+pmt(STEP[k].c[i],STEP[k].ug?RATE.ug:RATE.gr),0);
    if(!best||lo<best.c)best={c:lo,m:m(0)}; if(!worst||hi>worst.c)worst={c:hi,m:m(1)};});
  return {best,worst};
}
const BASENAME={cna:"nursing assistant pay",rn:"RN pay"};

const E = `cna>lpn cna>adn cna>bsn lpn>adn lpn>bsn adn>rn bsn>rn absn>rn diploma>rn demsn>rn
rn>rnbsn adn>rnbsn diploma>rnbsn rnbsn>msn bsn>msn bsn>dnp bsn>phd demsn>dnp bsn>military
msn>dnp msn>phd msn>pmc msn>fnp msn>agpcnp msn>agacnp msn>pnp msn>pmhnp msn>whnp msn>nnp msn>cns msn>cnm
dnp>fnp dnp>agpcnp dnp>agacnp dnp>pnp dnp>pmhnp dnp>whnp dnp>nnp dnp>cns dnp>cnm adn>msn fnp>pmc medsurg>agpcnp
msn>educator msn>faculty msn>info msn>manager msn>director
dnp>cno dnp>faculty dnp>policy phd>scientist phd>faculty phd>policy pmc>pmhnp pmc>enp
rn>medsurg rn>icu rn>er rn>peds rn>ld rn>nicu rn>onc rn>or rn>psych rn>cardiac rn>dialysis rn>hospice
rn>home rn>public rn>school rn>tele rn>travel rn>corr rn>occ rn>case rn>research rn>aesth rn>info rn>charge
medsurg>icu medsurg>er medsurg>cardiac medsurg>onc medsurg>woc medsurg>ip medsurg>case medsurg>charge medsurg>travel medsurg>home medsurg>legal
icu>crna icu>agacnp icu>flight icu>cns icu>travel icu>legal er>flight er>enp er>sane er>travel er>tele
peds>pnp peds>school nicu>nnp ld>cnm ld>whnp ld>sane ld>nicu psych>pmhnp psych>corr onc>research onc>hospice hospice>home
cardiac>icu dialysis>home or>industry military>flight info>industry research>industry research>scientist public>policy public>school
aesth>entre fnp>entre pmhnp>entre cnm>entre crna>entre fnp>tele fnp>enp ip>quality case>quality
charge>manager manager>director director>cno charge>educator educator>faculty quality>director cno>policy`
 .trim().split(/\s+/).map(s=>s.split(">"));

const byId = {};
N.forEach(r=>{byId[r[0]] = {id:r[0],g:r[1],label:r[2],sig:r[3],about:r[4],path:r[5],time:r[6],cert:r[7]};});
const edges = E.filter(([a,b])=>byId[a]&&byId[b]);
const from = {}, to = {};
edges.forEach(([a,b])=>{(to[a]=to[a]||[]).push(b);(from[b]=from[b]||[]).push(a);});

// ---------- Tiered map: start → school → license → work → more school → advanced ----------
