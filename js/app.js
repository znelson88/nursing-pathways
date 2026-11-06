// Nursing Pathways — map, list, search, job details and page behavior.
// Depends on js/data.js. Also holds some per-role content tables (GATES, AID, LIFE, practice rules).
const col=g=>`var(${GROUPS[g].col})`;
const all=Object.values(byId);
const TIERS=[
  {n:"Start here", d:"No nursing license needed yet", groups:[["",["cna","lpn"]]]},
  {n:"Nursing school", d:"Pick one route to the RN exam", groups:[["",["adn","bsn","absn","demsn","diploma"]]]},
  {n:"Get your RN license", d:"", groups:[["",["rn"]]]},
  {n:"Work as an RN", d:"No more school required; many jobs want experience first", groups:[
    ["Bedside specialties",["medsurg","icu","er","peds","ld","nicu","onc","or","psych","cardiac","dialysis","hospice"]],
    ["Beyond the bedside",["home","public","school","tele","travel","flight","military","corr","occ","sane","case","ip","woc","research","info","legal","aesth"]],
    ["Early leadership",["charge","quality"]]]},
  {n:"More school (optional)", d:"Usually while working as an RN", groups:[["",["rnbsn","msn","pmc","dnp","phd"]]]},
  {n:"Advanced roles", d:"Need a graduate degree or years of experience", groups:[
    ["Advanced practice (APRN)",["fnp","agpcnp","agacnp","pnp","pmhnp","whnp","nnp","enp","cns","cnm","crna"]],
    ["Leadership & teaching",["manager","director","cno","educator","faculty","policy"]],
    ["Research & business",["scientist","industry","entre"]]]}
];
const TIER_OF={};
const svg=document.getElementById("map");
const tl=document.getElementById("tlines");
const nodeEls={}; const edgeEls=[];
document.getElementById("tiers").innerHTML=TIERS.map((t,i)=>`<section class="tier" data-tier="${i}" aria-label="Step ${i+1}: ${t.n}">
  <header class="thead"><span class="tnum" aria-hidden="true">${i+1}</span><div><h3>${t.n}</h3>${t.d?`<p>${t.d}</p>`:""}${i===3?`<p class="tnote" hidden>Every job in this step starts from the RN license.</p>`:""}</div></header>
  ${t.groups.map(([gn,ids])=>`<div class="tgroup">${gn?`<span class="tglabel">${gn}</span>`:""}<div class="tchips">${ids.map(id=>{TIER_OF[id]=i;const n=byId[id];
     return n.g==="hub"?`<button type="button" class="rchip hub" data-id="rn"><b>Registered Nurse (RN)</b><small>Pass the NCLEX-RN exam. Every job below runs through this license.</small></button>`
       :`<button type="button" class="rchip" data-id="${id}" style="--c:${col(n.g)}"><i aria-hidden="true"></i>${n.label}</button>`;}).join("")}</div></div>`).join("")}
</section>`).join("");
document.querySelectorAll("#tiers .rchip").forEach(b=>{const id=b.dataset.id; nodeEls[id]=b;
  b.addEventListener("click",()=>{select(id);openPanel();});});
let curRoute={nodes:[],edges:[]};
const BSNEQ=new Set(["bsn","absn","demsn"]), DEFAULT_SRC=["bsn","adn","cna","lpn","absn","demsn","diploma"];
function bfs(sources,target,exclude){const prev={},q=[];sources.forEach(x=>{if(!(x in prev)){prev[x]=null;q.push(x);}});
  while(q.length){const x=q.shift(); if(x===target)break; (to[x]||[]).forEach(y=>{if(exclude&&exclude.has(y))return; if(!(y in prev)){prev[y]=x;q.push(y);}});}
  if(!(target in prev))return null; const p=[]; for(let c=target;c!=null;c=prev[c])p.unshift(c); return p;}
function mkRoute(paths){const nodes=new Set(),edges=[];paths.forEach(p=>{p.forEach(x=>nodes.add(x));for(let i=1;i<p.length;i++)edges.push([p[i-1],p[i]]);});
  return {nodes:[...nodes].sort((a,b)=>TIER_OF[a]-TIER_OF[b]),edges};}
function computeRoute(t){
  const at=(typeof startKey!=="undefined"&&STARTS[startKey]&&STARTS[startKey].at)||null;
  const srcs=at?[at]:DEFAULT_SRC;
  if(TIER_OF[t]<=1){ if(at&&at!==t){const p=bfs([at],t); if(p)return mkRoute([p]);} return mkRoute([[t]]); }
  let p1=(at&&TIER_OF[at]>=2)?[at]:(bfs(srcs,"rn")||bfs(DEFAULT_SRC,"rn"));
  if(t==="rn"||t===p1[p1.length-1])return mkRoute([p1]);
  const S=p1.slice().reverse(), ex=new Set(); if(p1.some(x=>BSNEQ.has(x)))ex.add("rnbsn");
  const p2=bfs(S,t,ex)||bfs(S,t)||bfs(["rn"],t);
  return mkRoute([p1,p2||[t]]);
}
function routeHTML(id){
  const r=curRoute; if(r.nodes.length<2)return "";
  const st=STARTS[startKey]&&STARTS[startKey].at;
  return `<div class="rline"><h3>${st?"Your route from "+byId[r.nodes[0]].label:"One common route here"}</h3><div class="rsteps">${r.nodes.map((x,i)=>`${i?'<span class="rarr" aria-hidden="true">→</span>':""}<button type="button" data-go="${x}" class="rstep${x===id?" here":""}">${byId[x].label}</button>`).join("")}</div>
   <p class="note">${r.edges.some(([a,b])=>GATES[a+">"+b])?"Includes years of work experience along the way. ":""}Other routes are in <b>Money</b> under Full pathway.</p></div>`;
}
function drawLines(){
  tl.innerHTML="";
  if(!svg.classList.contains("sel")||svg.hidden)return;
  const id=curId, M=svg.getBoundingClientRect();
  tl.setAttribute("width",M.width); tl.setAttribute("height",M.height); tl.setAttribute("viewBox",`0 0 ${M.width} ${M.height}`);
  const R=e=>{const r=e.getBoundingClientRect();return {x:r.left-M.left,y:r.top-M.top,w:r.width,h:r.height};};
  const seen=new Set(), pairs=[];
  curRoute.edges.forEach(([a,b])=>{seen.add(a+">"+b);pairs.push([a,b,"lroute"]);});
  (from[id]||[]).forEach(f=>{if(!seen.has(f+">"+id))pairs.push([f,id,"lin"]);});
  if(id!=="rn")(to[id]||[]).forEach(t=>{if(!seen.has(id+">"+t))pairs.push([id,t,"lout"]);});
  let out=`<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" fill="currentColor"/></marker></defs>`;
  pairs.forEach(([a,b,cls])=>{
    if(!nodeEls[a]||!nodeEls[b]||nodeEls[a].classList.contains("fout")||nodeEls[b].classList.contains("fout"))return;
    const A=R(nodeEls[a]),B=R(nodeEls[b]);
    let x1,y1,x2,y2,d;
    if(B.y>A.y+A.h-2){x1=A.x+A.w/2;y1=A.y+A.h;x2=B.x+B.w/2;y2=B.y;const k=Math.max(18,(y2-y1)*.5);d=`M${x1},${y1} C${x1},${y1+k} ${x2},${y2-k} ${x2},${y2-2}`;}
    else if(B.y+B.h<A.y+2){x1=A.x+A.w/2;y1=A.y;x2=B.x+B.w/2;y2=B.y+B.h;const k=Math.max(18,(y1-y2)*.5);d=`M${x1},${y1} C${x1},${y1-k} ${x2},${y2+k} ${x2},${y2+2}`;}
    else{const left=B.x<A.x; x1=left?A.x:A.x+A.w; y1=A.y+A.h/2; x2=left?B.x+B.w:B.x; y2=B.y+B.h/2; const k=Math.max(14,Math.abs(x2-x1)*.25);
         d=`M${x1},${y1} C${x1+(left?-k:k)},${y1-22} ${x2+(left?k:-k)},${y2-22} ${x2+(left?2:-2)},${y2}`;}
    out+=`<path class="${cls}${GATES[a+">"+b]?" gated":""}" d="${d}" marker-end="url(#arr)"/>`;
  });
  tl.innerHTML=out;
}

// ================= Practical layer =================
// ---- Gates: experience or entry requirements on a path (edge "from>to")
const GATES = {
  "icu>crna":"At least 1 year of full-time critical care (ICU), plus a BSN. Many schools prefer adult ICU; whether pediatric or neonatal ICU counts varies, and ER, step-down and OR usually don't. Admitted students usually have 2–3+ years.",
  "icu>agacnp":"Usually 1+ year of acute or critical care.",
  "nicu>nnp":"About 2 years in a Level III or IV NICU within the last 5 years.",
  "icu>flight":"Employers usually want 3+ years of ICU or ER; some accept 2.",
  "er>flight":"Employers usually want 3+ years of ICU or ER; some accept 2.",
  "medsurg>travel":"Agencies usually want 1–2 years in your specialty.",
  "icu>travel":"Agencies usually want 1–2 years in your specialty.",
  "er>travel":"Agencies usually want 1–2 years in your specialty.",
  "rn>travel":"Agencies usually want 1–2 years in your specialty.",
  "msn>fnp":"Many programs ask for 1–2 years as an RN; some admit new graduates.",
  "msn>pmhnp":"Many programs ask for 1–2 years as an RN; psych experience helps.",
  "ld>cnm":"Labor and delivery experience helps but isn't required; most midwifery programs don't require it.",
  "rn>icu":"Some hospitals hire new graduates into ICU residencies; others want 1–2 years of med-surg first.",
  "medsurg>icu":"Some hospitals hire new graduates into ICU residencies; others want 1–2 years of med-surg first.",
  "rn>charge":"Usually 1–3 years on the unit.",
  "charge>manager":"Usually several years of charge or supervisory experience; many employers want an MSN.",
  "er>sane":"A 40-hour SANE course plus supervised exams.",
  "er>enp":"Requires NP education and FNP certification first; ER experience counts toward the emergency NP requirements.",
  "fnp>enp":"FNP certification plus emergency experience or a post-master's emergency certificate.",
  "director>cno":"Usually 5+ years in nursing leadership."
};
const COMPETITIVE = {
  adn:"Community college ADN programs often fill fast; some use waitlists or points systems.",
  bsn:"Competitive entry. Schools turned away about 75,000 qualified BSN applications in 2025 because of too few faculty and clinical sites. Many schools admit to \"pre-nursing\" first and make you apply again for the nursing program, so ask whether admission is direct.",
  absn:"Competitive entry; prerequisite science grades weigh heavily.",
  demsn:"Competitive entry; few seats.",
  crna:"Very competitive. Expect interviews, a strong science GPA and usually CCRN certification.",
  nnp:"Competitive; limited seats nationwide.",
  cnm:"Limited seats; clinical placements are the bottleneck."
};
function gatesHTML(n){
  const inGates=(from[n.id]||[]).map(f=>[f,GATES[f+">"+n.id]]).filter(x=>x[1]);
  const comp=COMPETITIVE[n.id];
  if(!inGates.length&&!comp)return "";
  return `<section class="gate"><h3>Before you can get in</h3>
   ${comp?`<p><span class="gtag">Competitive entry</span> ${comp}</p>`:""}
   ${inGates.map(([f,t])=>`<p><b>From ${byId[f].label}:</b> ${t}</p>`).join("")}</section>`;
}

// ---- Program vetting checklist
const VET_ENTRY = [
  "<b>Accreditation:</b> the nursing program should be accredited by CCNE, ACEN or CNEA. Grad schools, the military and many employers require it.",
  "<b>First-time NCLEX pass rate:</b> the national rate for US-educated first-time test takers was 86.7% in 2025 (RN) and 86.6% (PN). Look for a program at or above that over several years; many state boards flag programs below about 75–80%. Your state board of nursing publishes each school's rate.",
  "<b>Direct admission or a second application:</b> if you must apply again after pre-nursing, ask what share of pre-nursing students get in.",
  "<b>Completion rate:</b> what share of students who start finish on time.",
  "<b>Clinical placements:</b> where students train and whether the school arranges it.",
  "<b>Full cost:</b> ask for every program fee, not just tuition."
];
const VET_GRAD = [
  "<b>Accreditation:</b> CCNE or ACEN for NP and midwifery programs (midwifery: ACME); COA for nurse anesthesia.",
  "<b>Board pass rate:</b> ask for the first-time certification pass rate (AANPCB or ANCC for NPs, NBCRNA for CRNAs, AMCB for midwives).",
  "<b>Clinical placements:</b> ask whether the school finds your preceptors. Many online NP programs make students find their own, which can delay graduation.",
  "<b>Format and travel:</b> required campus visits, and whether you can work during the program.",
  "<b>Full cost:</b> per-credit tuition times all credits, plus clinical and program fees."
];
const VET_FOR = {lpn:"e",adn:"e",bsn:"e",absn:"e",demsn:"e",diploma:"e",rnbsn:"e",msn:"g",pmc:"g",dnp:"g",fnp:"g",agpcnp:"g",agacnp:"g",pnp:"g",pmhnp:"g",whnp:"g",nnp:"g",enp:"g",cns:"g",cnm:"g",crna:"g"};
function vetHTML(n){
  const k=VET_FOR[n.id]; if(!k)return "";
  const L=k==="e"?VET_ENTRY:VET_GRAD;
  return `<details class="vet"><summary>How to vet a program before you apply</summary><ul>${L.map(x=>`<li>${x}</li>`).join("")}</ul></details>`;
}

// ---- First job reality
const FIRSTJOB = ["rn","adn","bsn","absn","demsn","diploma","medsurg"];
function firstJobHTML(n){
  if(!FIRSTJOB.includes(n.id))return "";
  return `<section class="gate soft"><h3>Your first nursing job</h3>
   <p>Expect nights, weekends and holidays at first, often on a med-surg unit. Turnover is high early on: in 2025, 22.7% of newly hired hospital RNs (at all experience levels) left within their first year. Many hospitals run 12-month <b>nurse residency programs</b> to support new graduates, so ask about one in every interview.</p></section>`;
}

// ---- Ways to cut the cost
const AID = {
  emp:{n:"Employer tuition help",t:"Employers can pay up to $5,250 a year tax-free toward tuition or student loans. Example: Intermountain Health pays 100% of RN-to-BSN tuition up to $5,250 a year for a 2-year work commitment. Many hospitals also pay for CNA and LPN-to-RN training.",src:"https://intermountainhealthcare.org/careers/explore-careers/join-nursing-team/tuition-reimbursement"},
  ncs:{n:"NURSE Corps Scholarship (HRSA)",t:"Pays full tuition and fees, books and supplies, and a monthly stipend for students in diploma, ADN, BSN and graduate (including NP) nursing programs. In return you work at least 2 years at a designated Critical Shortage Facility. Taxable and competitive; check HRSA for the next application cycle.",src:"https://bhw.hrsa.gov/funding/apply-scholarship/nurse-corps"},
  nclrp:{n:"NURSE Corps Loan Repayment (HRSA)",t:"Pays 60% of your nursing loans over 2 years at a Critical Shortage Facility, plus 25% more for an optional third year (85% total). Open to RNs, APRNs (NPs, CRNAs, midwives, clinical nurse specialists) and nurse faculty. Awards are taxable.",src:"https://bhw.hrsa.gov/funding/apply-loan-repayment/nurse-corps"},
  pslf:{n:"Public Service Loan Forgiveness",t:"Nurses working full-time at nonprofit or government hospitals can have remaining federal loans forgiven, tax-free, after 120 qualifying payments. For new loans made on or after July 1, 2026, only the new income-based RAP plan counts toward PSLF.",src:"https://edfinancial.studentaid.gov/income-driven-repaymentinformation-center/rap"},
  nflp:{n:"Nurse Faculty Loan Program (HRSA)",t:"Cancels up to 85% of graduate loans over 4 years of full-time teaching. Apply through a participating school.",src:"https://www.hrsa.gov/grants/find-funding/HRSA-26-079"},
  mil:{n:"Military",t:"Army ROTC nursing scholarships cover full tuition plus a stipend (8-year commitment, 4 on active duty). The Army and Air Force offer nurse accession bonuses up to $30,000 and loan repayment. The Air Force's HPSP pays for CRNA, FNP and midwifery school with a 3-year commitment.",src:"https://www.registerednursing.org/?p=46824"},
  va:{n:"Veterans Affairs",t:"VA nurses can get up to about $47,000 toward a BSN or graduate degree (NNEI), and EDRP-approved VA jobs repay up to $200,000 of loans over 5 years.",src:"https://www.va.gov/files/2025-07/NNEI%20Program%20Details%2001-2025.pdf"},
  ihs:{n:"Indian Health Service",t:"Repays up to $50,000 of loans for a 2-year commitment at facilities serving American Indian and Alaska Native communities; renewable.",src:"https://www.ihs.gov/loanrepayment/"},
  state:{n:"State loan repayment",t:"Colorado Health Service Corps pays NPs and midwives up to $90,000 for 3 years in underserved areas. Missouri's Nurse Loan Repayment pays $10,000 (RN) or $20,000 (APRN) for 2 years in a shortage area. Arizona's program covers NPs and midwives ($40,000–$50,000 for 2 years); it paused new awards in 2025, so check whether it has reopened.",src:"https://cdphe.colorado.gov/colorado-health-service-corps-prospective-applicants"}
};
const NPAID=["ncs","nclrp","pslf","state","mil","va"];
const AID_FOR = {
  cna:["emp"], lpn:["emp"], adn:["emp","ncs","pslf"], bsn:["ncs","mil","pslf","emp"], absn:["ncs","pslf"], demsn:["ncs","pslf"], diploma:["emp","ncs"],
  rn:["nclrp","pslf","emp","va","ihs"], rnbsn:["emp","va","nclrp","pslf"],
  msn:NPAID, fnp:NPAID, agpcnp:NPAID, agacnp:NPAID, pnp:NPAID, pmhnp:NPAID, whnp:NPAID, nnp:NPAID, enp:NPAID, cns:["nclrp","pslf","emp"], cnm:NPAID,
  pmc:["emp","nclrp","pslf"], dnp:["emp","nflp","pslf","mil"], phd:["nflp"], faculty:["nflp","nclrp"], scientist:["nflp"],
  crna:["mil","pslf","nclrp"], military:["mil"], manager:["emp","pslf"], director:["emp","pslf"], cno:["emp"], educator:["emp","pslf"]
};
function aidHTML(n){
  const ks=AID_FOR[n.id]||((n.g==="bedside"||n.g==="beyond")?["emp","nclrp","pslf"]:null); if(!ks)return "";
  return `<section class="money aid"><h3>Ways to cut the cost</h3>
   <div class="aidl">${ks.map(k=>`<details><summary>${AID[k].n}</summary><p>${AID[k].t} <a href="${AID[k].src}" target="_blank" rel="noopener">Details</a></p></details>`).join("")}</div>
   <div class="note">Most of these require a work commitment. Breaking it usually means paying the money back, sometimes with penalties.</div></section>`;
}

// ---- Where you can practice (late 2026)
const PRACTICE_STATES={AK:"Alaska",AZ:"Arizona",CA:"California",CO:"Colorado",HI:"Hawaii",ID:"Idaho",MO:"Missouri",MT:"Montana",NV:"Nevada",NM:"New Mexico",OR:"Oregon",UT:"Utah",WA:"Washington",WY:"Wyoming"};
const NLC = new Set(["AZ","CO","ID","MO","MT","NM","UT","WA","WY"]);
const NPFPA = {AK:"full",AZ:"full",CO:"full",HI:"full",ID:"full",MT:"full",NV:"full",NM:"full",OR:"full",UT:"full",WA:"full",WY:"full",CA:"restricted",MO:"restricted"};
const CRNAOPT = {AK:"yes",AZ:"yes",CA:"yes",CO:"yes",ID:"yes",MT:"yes",NM:"yes",OR:"yes",WA:"yes",UT:"partial",WY:"partial",HI:"no",NV:"no",MO:"no"};
const NPROLES=new Set(["fnp","agpcnp","agacnp","pnp","pmhnp","whnp","nnp","enp","entre"]);
function practiceHTML(n){
  let title,rule,cls,legend;
  if(n.id==="rn"||n.id==="travel"||n.id==="tele"){
    title="Nurse Licensure Compact"; rule=k=>NLC.has(k)?["ok","Member"]:["no","Not a member"];
    legend="One multistate RN license lets you work in all 43 member jurisdictions without a new license. Matters most for travel nurses and telehealth. Nevada, Oregon, California, Hawaii and Alaska require their own license.";
  } else if(NPROLES.has(n.id)){
    title="NP practice authority"; rule=k=>NPFPA[k]==="full"?["ok","Full practice"]:["no","Restricted"];
    legend="Full practice means NPs can diagnose, treat and prescribe, and open their own practice, without a physician agreement. 27 states and DC allow it. California lets NPs work without physician supervision in certain group settings after 3 years of transition to practice, and in any setting after about 3 more; Missouri requires a collaborative agreement with a physician.";
  } else if(n.id==="crna"){
    title="CRNA physician supervision"; rule=k=>CRNAOPT[k]==="yes"?["ok","Opted out"]:CRNAOPT[k]==="partial"?["mid","Partial"]:["no","Required"];
    legend="States that opt out of Medicare's physician-supervision rule let CRNAs work without anesthesiologist or surgeon supervision, which widens job options, especially in rural hospitals. 27 states have opted out.";
  } else return "";
  const pick=(pickState!=="none"&&PRACTICE_STATES[pickState])?pickState:null;
  const rows=Object.entries(PRACTICE_STATES).map(([k,v])=>{const r=rule(k);return `<span class="pst ${r[0]}${k===pick?" me":""}" title="${v}: ${r[1]}">${k}</span>`}).join("");
  const pr=pick?rule(pick):null;
  return `<section class="money"><h3>Where you can practice <span class="src">Late 2026</span></h3>
   <div class="amt sm">${title}</div>
   ${pick?`<div class="note"><b>${PRACTICE_STATES[pick]}:</b> ${pr[1]}</div>`:""}
   <div class="pgrid">${rows}</div>
   <div class="note">${legend}</div></section>`;
}

// ---- Job outlook (BLS 2025–35)
const GROWTH = {cna:3, lpn:3, rn:6, np:41, crna:10, cnm:11};

edgeEls.forEach(p=>{if(GATES[p.dataset.a+">"+p.dataset.b])p.classList.add("gated");});

// ---------- Lifestyle tags (typical; varies by employer) ----------
// n = nights common, w = weekends/holidays, c = on call, m = mostly Mon–Fri, r = remote possible, p = physically demanding
const LIFE = {
  cna:"nwp", lpn:"nwp", medsurg:"nwp", icu:"nwp", er:"nwp", peds:"nw", ld:"nwcp", nicu:"nw", onc:"nw", or:"cmp",
  psych:"nw", cardiac:"nwp", dialysis:"wp", hospice:"cw", home:"c", public:"m", school:"m", tele:"nr",
  travel:"nwp", flight:"nwcp", military:"nw", corr:"nw", occ:"m", sane:"nc", legal:"mr", aesth:"w",
  info:"mr", case:"mr", ip:"m", woc:"m", research:"m", industry:"mr", entre:"",
  charge:"nw", manager:"mc", director:"mc", cno:"mc", educator:"m", faculty:"mr", quality:"mr", policy:"m",
  fnp:"m", agpcnp:"m", agacnp:"nw", pnp:"m", pmhnp:"mr", whnp:"m", nnp:"nwc", enp:"nw", cns:"m", cnm:"nwc", crna:"c",
  scientist:"mr"
};
const LT = {n:"Nights common", w:"Weekends & holidays", c:"On call", m:"Mostly Mon–Fri", r:"Remote possible", p:"Physically demanding"};
const FITS = [
  {k:"nonights", n:"No nights", ok:t=>!t.includes("n")},
  {k:"mf", n:"Mostly Mon–Fri", ok:t=>t.includes("m")},
  {k:"remote", n:"Remote possible", ok:t=>t.includes("r")},
  {k:"easy", n:"Easier on the body", ok:t=>!t.includes("p")}
];
const fitOn = new Set();
function applyFilters(){
  const fits=[...fitOn].map(k=>FITS.find(f=>f.k===k));
  all.forEach(n=>{
    const t=LIFE[n.id];
    const pass=n.g==="hub"||!fits.length||t===undefined||fits.every(f=>f.ok(t));
    nodeEls[n.id].classList.toggle("fout",!pass); n._out=!pass;
  });
  fitEl.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",fitOn.has(b.dataset.k)));
  renderActive(); if(typeof view!=="undefined"){if(view==="list")renderList(); else drawLines();}
}
const fitEl=document.getElementById("fit");
FITS.forEach(f=>{const b=document.createElement("button");b.type="button";b.textContent=f.n;b.dataset.k=f.k;b.setAttribute("aria-pressed","false");
  b.onclick=()=>{fitOn.has(f.k)?fitOn.delete(f.k):fitOn.add(f.k);applyFilters();};fitEl.appendChild(b);});
function lifeHTML(n){
  const t=LIFE[n.id]; if(t===undefined||t==="")return "";
  const on=Object.keys(LT).filter(k=>t.includes(k));
  const nightsOff=!t.includes("n")?`<span class="ltag">No nights</span>`:"";
  return `<div class="links"><h3>What the schedule is usually like</h3><div class="tags">${on.map(k=>`<span class="ltag">${LT[k]}</span>`).join("")}${nightsOff}</div></div>`;
}

// ---------- Start from where you are ----------
const STARTS = {
  none:{n:"Choose your starting point", at:null, next:[]},
  hs:{n:"High school student or graduate", at:"cna", next:[["cna","Work while you study"],["adn","2–3 yrs, cheapest RN route"],["bsn","4 yrs, most job options"],["lpn","12–18 months"],["military","BSN with an ROTC scholarship"]]},
  cna:{n:"CNA", at:"cna", next:[["lpn","12–18 months"],["adn","Ask your employer about tuition help"],["bsn","4 yrs"]]},
  lpn:{n:"LPN / LVN", at:"lpn", next:[["adn","LPN-to-RN bridge, about 1–2 yrs"],["bsn","LPN-to-BSN bridge"]]},
  bach:{n:"Bachelor's degree in another field", at:"absn", next:[["absn","12–18 months"],["demsn","15 months–3 yrs, ends with an MSN"]]},
  adnrn:{n:"RN with an associate degree (ADN)", at:"rn", next:[["rnbsn","9–24 months online"],["msn","RN-to-MSN bridge"],["medsurg","Build bedside experience"],["icu","Required for CRNA (after a BSN); expected for acute care NP"]]},
  bsnrn:{n:"RN with a BSN", at:"rn", next:[["icu","Gate for CRNA, acute care NP, flight"],["charge","Leadership after 1–3 yrs"],["travel","After 1–2 yrs in a specialty"],["fnp","NP: 2–4 yrs of grad school"],["pmhnp","Widely reported as high-demand"],["crna","After 1–3 yrs of ICU"]]},
  msnap:{n:"Nurse practitioner or MSN", at:"msn", next:[["pmc","Add a second NP specialty"],["dnp","MSN-to-DNP, 1–2 yrs"],["faculty","Teach clinicals with an MSN"],["entre","Own practice in full-practice states"]]}
};
const startSel=document.getElementById("startAt"), nextEl=document.getElementById("nextsteps");
startSel.innerHTML=Object.entries(STARTS).map(([k,v])=>`<option value="${k}">${v.n}</option>`).join("");
let startKey="none"; try{const s=localStorage.getItem("np-start"); if(s&&STARTS[s])startKey=s;}catch(e){}
startSel.value=startKey;
function renderStart(go){
  const st=STARTS[startKey];
  all.forEach(m=>nodeEls[m.id].classList.remove("next"));
  if(!st.at){nextEl.innerHTML="";return;}
  nextEl.innerHTML=`<span class="nsh">Your realistic next steps</span><div class="nsl">${st.next.map(([id,why])=>`<button type="button" data-next="${id}" style="--c:${col(byId[id].g)}"><i></i>${byId[id].label} <small>${why}</small></button>`).join("")}</div>`;
  nextEl.querySelectorAll("[data-next]").forEach(b=>b.onclick=()=>{select(b.dataset.next);focusNode(b.dataset.next);openPanel();});
  if(go){select(st.at);focusNode(st.at);
  }
  st.next.forEach(([id])=>nodeEls[id].classList.add("next"));
}
startSel.addEventListener("change",()=>{startKey=startSel.value;try{localStorage.setItem("np-start",startKey)}catch(e){}renderStart(startKey!=="none");renderActive();});

// group color key
const STAGES=["entry","degree","bedside","beyond","lead","aprn"];
document.getElementById("key").innerHTML=STAGES.map(g=>`<span style="--c:${col(g)}"><i></i>${GROUPS[g].name}</span>`).join("");
document.getElementById("count").textContent=`${all.length-1} nursing roles · 6 steps · all built on one RN license`;

// panel
const panel=document.getElementById("panel");
function chips(ids,fromId){if(!ids||!ids.length)return `<span class="none">Nothing further on this map</span>`;
  return ids.map(i=>`<button data-go="${i}" style="--c:${col(byId[i].g)}"><i></i>${byId[i].label}${fromId&&GATES[fromId+">"+i]?` <span class="gmark" title="Experience required first">⏳</span>`:""}</button>`).join("");}
function costHTML(n){
  const c=COST[n.id]||(n.g==="bedside"||n.g==="beyond"?CERT:null);
  if(!c)return "";
  return `<section class="money"><h3>Cost of this step, western US <span class="src ${c[2]}">${c[2]==="pub"?"Published":"Estimate"}</span></h3>
    <div class="amt">${c[0]}</div><div class="note">${c[1]}</div></section>`;
}
function rangeOf(d){
  const e=Object.entries(d.st).map(([k,v])=>[k,val(k,v)]);
  return {lo:e.reduce((a,b)=>b[1]<a[1]?b:a),hi:e.reduce((a,b)=>b[1]>a[1]?b:a),rows:e.sort((a,b)=>b[1]-a[1])};
}
function payHTML(n){
  const p=P[n.id]||["rn",""]; const d=p[0]&&PAY[p[0]];
  let body;
  if(!d){body=`<div class="amt">Varies</div>`;}
  else {
    const r=rangeOf(d), pc=v=>Math.min(v/SCALE*100,100);
    const l=pc(r.lo[1]),w=pc(r.hi[1])-l;
    const raw=pickState!=="none"?d.st[pickState]:null, sv=raw?val(pickState,raw):null;
    body=`<div class="amt">${money(r.lo[1])}–${money(r.hi[1])}</div>
     <div class="note">Take-home pay at the median for ${d.name.toLowerCase()}, lowest to highest western state${adj?", adjusted for cost of living":""}. New graduates usually start below the median.</div>
     <div class="track" role="img" aria-label="Take-home from ${money(r.lo[1])} in ${STATES[r.lo[0]]} to ${money(r.hi[1])} in ${STATES[r.hi[0]]}">
       <span class="rng" style="left:${l}%;width:${Math.max(w,1)}%"></span>
       ${sv?`<span class="pin" style="left:${pc(sv)}%" title="${STATES[pickState]}"></span>`:""}
     </div>
     <div class="ticks"><span>${STATES[r.lo[0]]}: <b>${money(r.lo[1])}</b></span><span>${STATES[r.hi[0]]}: <b>${money(r.hi[1])}</b></span></div>
     ${pickState==="none"?"":`<div class="keyrow"><span><i class="k-pin"></i>${STATES[pickState]}: <b>${sv?money(sv):"no data"}</b>${raw?` take-home${adj?" (adjusted)":""} from <b>${money(raw)}</b> gross pay`:""}</span></div>`}
     ${d.gap?`<div class="note">${d.gap}</div>`:""}
     <details class="rank"><summary>Most take-home after cost of living: ${rankTop(d)}</summary>${rankRows(d)}</details>`;
  }
  const gr=p[0]&&GROWTH[p[0]]!=null?`<div class="note"><b>Job growth:</b> ${GROWTH[p[0]]}% projected nationally for ${PAY[p[0]].name.toLowerCase()}, 2025–35 (BLS)${GROWTH[p[0]]>=10?", much faster than average":GROWTH[p[0]]>=5?", faster than average":""}.</div>`:"";
  return `<section class="money"><h3>Typical take-home pay, western US ${d?`<span class="src pub">BLS 2025 · 2026 taxes</span>`:""}</h3>${body}${p[1]?`<div class="note">${p[1]}</div>`:""}${gr}</section>`;
}
function realRows(d){return Object.entries(d.st).map(([k,v])=>[k,v,net(k,v)/(RPP[k]/100)]).sort((a,b)=>b[2]-a[2]);}
function rankTop(d){return realRows(d).slice(0,3).map(r=>STATES[r[0]]).join(", ");}
function rankRows(d){
  const rows=realRows(d), mx=rows[0][2];
  return `<div class="rk">${rows.map((r,i)=>`<div class="rkrow${r[0]===pickState?" me":""}"><span class="rkn">${i+1}. ${STATES[r[0]]}</span><span class="rkb"><span style="width:${(r[2]/mx*100).toFixed(1)}%"></span></span><span class="rkv">${money(r[2])}</span></div>`).join("")}</div>
  <div class="note">Take-home pay divided by the state's price level, so ${money(100000)} take-home in a state 10% pricier than average counts as about ${money(90900)}. Housing is the biggest driver of the price level.</div>`;
}
function debtHTML(n){
  const v=VAL[n.id]; if(!v)return "";
  const P1=PAY[v.pay];
  const where=(pickState!=="none"&&P1.st[pickState])?pickState:null;
  const gross=where?P1.st[where]:P1.nat, pay=net(where,gross), place=where?STATES[where]:"the US overall (federal taxes only)";
  const lvl=v.lvl||"gr", r=RATE[lvl];
  const rows=v.cost.map(c=>{const m=pmt(c,r);return {c,m,ratio:c/pay,share:m*12/pay};});
  const zone=sh=>sh<=0.10?["good","Comfortable"]:sh<=0.20?["ok","Manageable"]:["slow","Heavy"];
  const z=zone(rows[1].share), z0=zone(rows[0].share);
  const pct=x=>Math.round(x*100)+"%";
  const limit=lvl==="ug"
    ?"Federal loans for a dependent undergraduate top out at $31,000 in total, so the high end of this range would need parent PLUS or private loans."
    :"For MSN, DNP and nurse anesthesia programs, federal loans currently allow up to $50,000 a year and $200,000 in total, under a June 2026 court order while lawsuits over the rule are still pending. If the government wins, the cap returns to $20,500 a year and $100,000 total. Nursing PhD programs are already held to that lower cap.";
  return `<section class="money"><h3>Debt check <span class="src">If fully borrowed</span></h3>
   <div class="debt">
     ${rows.map((x,i)=>{const zz=zone(x.share);return `<div class="drow"><span class="dlbl">This step only · ${i?"pricier program":"cheaper program"}</span>
       <span class="dval"><b>${money(x.c)}</b> debt · <b>$${Math.round(x.m).toLocaleString()}</b>/mo</span>
       <span class="verdict ${zz[0]}">${pct(x.share)} of take-home · ${zz[1]}</span></div>`}).join("")}
     ${(()=>{const pd=pathDebt(n); if(!pd||(pd.worst.c<=v.cost[1]+1000))return "";
       return [["Whole pathway · cheapest route",pd.best],["Whole pathway · priciest route",pd.worst]].map(([lb,x])=>{const sh=x.m*12/pay,zz=zone(sh);
       return `<div class="drow whole"><span class="dlbl">${lb}</span><span class="dval"><b>${money(x.c)}</b> debt · <b>$${Math.round(x.m).toLocaleString()}</b>/mo</span><span class="verdict ${zz[0]}">${pct(sh)} of take-home · ${zz[1]}</span></div>`}).join("");})()}
   </div>
   <div class="note">Ten-year standard repayment at the 2026–27 federal ${lvl==="ug"?"undergraduate":"graduate"} rate (${(r*100).toFixed(2)}%), against ${money(pay)} take-home (from a ${money(gross)} median salary) for this role in ${place}. As a rough rule of thumb used here, payments under about 10% of take-home pay are comfortable and above 20% get hard (a common guideline is 10% of gross pay). New graduates usually start below the median.</div>
   <div class="note">${limit}</div>
   ${(AID_FOR[n.id]||[]).includes("nclrp")?`<div class="note"><b>Cut it down:</b> NURSE Corps loan repayment could pay ${money(v.cost[1]*.6)}–${money(v.cost[1]*.85)} of the pricier debt for 2–3 years at a shortage-area facility, and PSLF forgives what's left after 10 years at a nonprofit hospital.</div>`:""}</section>`;
}
function valueHTML(n){
  const v=VAL[n.id]; if(!v)return "";
  const P1=PAY[v.pay], P0=PAY[v.base];
  let where=pickState, fallback=false;
  if(where==="none"||!P1.st[where]||!P0.st[where]){where=null;fallback=pickState!=="none";}
  const gA=where?P1.st[where]:P1.nat, gB=where?P0.st[where]:P0.nat;
  const after=net(where,gA), before=net(where,gB), raise=after-before;
  const place=where?STATES[where]:"the US overall (federal taxes only)";
  if(raise<=0){
    return `<section class="money"><h3>Value of the degree</h3><span class="verdict neg">Pays less</span>
    <div class="note">In ${place}, take-home at the median for this role is ${money(after)} against ${money(before)} for ${BASENAME[v.base]}, so ${v.what} doesn't pay for itself in salary. People choose it for schedule, teaching or career reasons.</div></section>`;
  }
  const yrs=v.cost.map(c=>c/raise), fmt=y=>y<1?"under 1":(Math.round(y*2)/2).toString().replace(".5","½");
  const mid=(yrs[0]+yrs[1])/2, cls=mid<=2?"good":mid<=5?"ok":"slow", lbl=mid<=2?"Pays for itself fast":mid<=5?"Pays for itself in a few years":"Slow to pay for itself";
  const ten=v.cost.map(c=>raise*10-c);
  return `<section class="money"><h3>Value of the degree</h3>
   <span class="verdict ${cls}">${lbl}</span>
   <div class="amt">${fmt(yrs[0])}–${fmt(yrs[1])} years</div>
   <div class="note">to earn back the cost of ${v.what} (${money(v.cost[0])}–${money(v.cost[1])}) from the take-home raise over ${BASENAME[v.base]} in ${place}: ${money(before)} → ${money(after)} a year after taxes, about <b>${money(raise)} more</b> (${money(gA-gB)} before taxes).${fallback?` No ${STATES[pickState]} figure for this role, so US medians are used.`:""}</div>
   <dl class="mini"><div><dt>10 years later, after paying for school</dt><dd>${money(ten[1])} to ${money(ten[0])} ahead</dd></div></dl>
   <div class="note">After taxes, before loan interest.${v.lost?" Most students can't work during this program, so lost wages add to the real cost.":""} Cheaper in-state programs pay back at the fast end.</div></section>`;
}
function moneyHTML(n){
  const amt=h=>{const m=h.match(/class="amt[^"]*">([^<]*)</);return m?m[1]:"";};
  const cost=costHTML(n), path=pathHTML(n), aid=aidHTML(n), pay=payHTML(n), value=valueHTML(n), debt=debtHTML(n);
  const R=routesFor(n); let totS="";
  if(R){const rs=R.map(r=>({n:r.n,lo:tot(r.steps,0),hi:tot(r.steps,1)})); const c=rs.reduce((a,b)=>(b.lo+b.hi<a.lo+a.hi?b:a)), mx=Math.max(...rs.map(r=>r.hi));
    totS=`${money(c.lo)}–${money(c.hi)}<small>${c.n}${mx>c.hi?`; up to ${money(mx)} by other routes`:""}</small>`;}
  else if(cost)totS=amt(cost)+"<small>this step only</small>";
  const payA=amt(pay), valA=/Pays less/.test(value)?"Pays less than "+BASENAME[VAL[n.id].base]:amt(value);
  const rows=[["Total school cost from day one",totS],["Typical take-home pay",payA&&payA!=="Varies"?payA+"<small>a year, across western states</small>":payA],["Earns back the cost in",valA]].filter(r=>r[1]);
  const sum=rows.length?`<section class="msum"><h3>In short</h3><dl>${rows.map(r=>`<div><dt>${r[0]}</dt><dd>${r[1].replace(/^([^<]*)/,"<span>$1</span>")}</dd></div>`).join("")}</dl><p class="note">Tap a section below for the details.</p></section>`:"";
  const verdict=h=>{const m=h.match(/class="verdict [a-z]+">([^<]*)</);return m?m[1]:"";};
  const nAid=(aid.match(/<details>/g)||[]).length;
  const sec=(cls,title,head,html)=>html?`<details class="msec ${cls}"><summary><span>${title} ${(html.match(/<span class="src[^"]*">[^<]*<\/span>/)||[""])[0]}</span><b>${head}</b></summary>${html}</details>`:"";
  return sum
    +sec("","Cost of this step",amt(cost),cost)
    +sec("","Full pathway, step by step",R?`${R.length} route${R.length>1?"s":""}`:"",path)
    +sec("aidsec","Ways to cut the cost",nAid?`${nAid} programs`:"",aid)
    +sec("","Take-home pay by state",payA,pay)
    +sec("","Value of the degree",valA,value)
    +sec("","Debt check",verdict(debt),debt);
}
let curTab="over";
function glanceHTML(n){
  const cells=[];
  const R=routesFor(n);
  if(R){const rs=R.map(r=>({n:r.n,lo:tot(r.steps,0),hi:tot(r.steps,1),yl:yrs(r.steps,0),yh:yrs(r.steps,1),work:r.steps.some(k=>STEP[k].work)}));
        const c=rs.reduce((a,b)=>(b.lo+b.hi<a.lo+a.hi?b:a)), maxhi=Math.max(...rs.map(r=>r.hi));
        const yl=Math.min(...rs.map(r=>r.yl)),yh=Math.max(...rs.map(r=>r.yh));
        cells.push(["Time, start to finish",fyr(yl,yh),rs.some(r=>r.work)?"includes years working as a nurse":""]);
        cells.push(["School cost, cheapest route",`${money(c.lo)}–${money(c.hi)}`,`${c.n}${maxhi>c.hi?`; other routes up to ${money(maxhi)}`:""}`]);}
  else if(n.time||(DEF[n.g]||{}).time){cells.push(["Typical time",n.time||DEF[n.g].time,""]);}
  const p=P[n.id]||(n.g!=="entry"&&n.g!=="degree"?["rn",""]:null); const d=p&&p[0]&&PAY[p[0]];
  if(d){const st=(pickState!=="none"&&d.st[pickState])?pickState:null; const g=st?d.st[st]:d.nat;
        cells.push(["Typical take-home pay",`≈ ${money(st?val(st,g):net(null,g))}/yr`,`<b>${st?`${STATES[st]} median, after taxes`:"US median, federal taxes only"}</b> — half earn more, half less; new grads start lower`]);}
  const v=VAL[n.id];
  if(v){const P1=PAY[v.pay],P0=PAY[v.base];const st=(pickState!=="none"&&P1.st[pickState]&&P0.st[pickState])?pickState:null;
        const r=net(st,st?P1.st[st]:P1.nat)-net(st,st?P0.st[st]:P0.nat);
        cells.push(["Raise covers school in",r>0?fyr(v.cost[0]/r,Math.max(1,v.cost[1]/r)):"Pays less",r>0?"the after-tax raise over "+BASENAME[v.base]:"than "+BASENAME[v.base]]);}
  const t=LIFE[n.id];
  const tags=t?Object.keys(LT).filter(k=>t.includes(k)).map(k=>LT[k]).join(" · "):"";
  const gated=(from[n.id]||[]).some(f=>GATES[f+">"+n.id]), comp=COMPETITIVE[n.id];
  const warn=gated||comp?`<div class="gwarn"><span aria-hidden="true">⏳</span><span>${[gated?"Needs work experience before you can apply":"",comp?"Competitive entry":""].filter(Boolean).join(" · ")}. See <b>Getting in</b>.</span></div>`:"";
  if(!cells.length&&!tags&&!warn)return "";
  return `<div class="glance">${cells.map(c=>`<div class="gcell"><small>${c[0]}</small><b>${c[1]}</b>${c[2]?`<span>${c[2]}</span>`:""}</div>`).join("")}${tags?`<div class="gcell gwide"><small>Schedule</small><span style="color:var(--ink)">${tags}</span></div>`:""}</div>${warn}`;
}
function schoolsLink(id){const p=new URLSearchParams({job:id});if(["CO","AZ","CA"].includes(pickState))p.set("state",pickState);if(startKey&&startKey!=="none")p.set("start",startKey);return "schools.html?"+p;}
function select(id){
  curId=id; const n=byId[id];
  all.forEach(m=>nodeEls[m.id].classList.remove("on","cur","anc","route"));
  curRoute=computeRoute(id);
  curRoute.nodes.forEach(i=>nodeEls[i].classList.add("route"));
  const near=new Set([id,...(to[id]||[]),...(from[id]||[])]);
  near.forEach(i=>nodeEls[i].classList.add("on")); nodeEls[id].classList.add("cur");
  document.querySelectorAll(".tnote").forEach(e=>e.hidden=id!=="rn");
  svg.classList.add("sel");
  const d=DEF[n.g]||{};
  const path=n.path||d.path, time=n.time||d.time;
  panel.style.setProperty("--c",col(n.g));
  const panes={
    over:`${routeHTML(id)}<p>${n.about}</p>${lifeHTML(n)}
      <div class="links"><h3>Comes from</h3><div>${chips(from[id])}</div></div>
      <div class="links"><h3>Leads to</h3><div>${chips(to[id],id)}</div></div>
      ${firstJobHTML(n)}`,
    getin:`<dl>${path?`<div><dt>Path</dt><dd>${path}</dd></div>`:""}${time?`<div><dt>Typical time</dt><dd>${time}</dd></div>`:""}${n.cert?`<div><dt>Exam or certification</dt><dd>${n.cert}</dd></div>`:""}</dl>
      ${gatesHTML(n)}${vetHTML(n)}`,
    money:moneyHTML(n),
    where:practiceHTML(n)
  };
  const names={over:"Overview",getin:"Getting in",money:"Money",where:"Practice"};
  const avail=Object.keys(panes).filter(k=>panes[k].replace(/<[^>]*>|\s/g,"").length>0);
  if(!avail.includes(curTab))curTab="over";
  panel.innerHTML=`<div class="phead"><span class="tag"><i></i>${GROUPS[n.g].name}</span><span class="pbtns"><button class="preset" type="button" aria-label="Reset map">↺ Reset</button><button class="tomap" type="button">↑ Map</button></span></div>
   <div class="ptop"><h2>${n.label}</h2>
   <div class="badge"><small>Your title would read</small><span>Your Name, ${n.sig}</span></div>
   ${glanceHTML(n)}
   <a class="schoolsbtn" href="${schoolsLink(id)}">Find real schools and programs for this path <span aria-hidden="true">→</span></a></div>
   <div class="tabs" role="tablist">${avail.map(k=>`<button type="button" role="tab" id="tab-${k}" aria-controls="pane-${k}" aria-selected="${k===curTab}" tabindex="${k===curTab?0:-1}" data-tab="${k}">${names[k]}</button>`).join("")}</div>
   ${avail.map(k=>`<div class="tabpane" role="tabpanel" id="pane-${k}" aria-labelledby="tab-${k}" ${k===curTab?"":"hidden"}>${panes[k]}</div>`).join("")}`;
  const tabs=[...panel.querySelectorAll("[data-tab]")];
  const show=k=>{curTab=k;tabs.forEach(t=>{const on=t.dataset.tab===k;t.setAttribute("aria-selected",on);t.tabIndex=on?0:-1;});
    panel.querySelectorAll(".tabpane").forEach(p=>p.hidden=p.id!=="pane-"+k);};
  tabs.forEach((t,i)=>{t.onclick=()=>show(t.dataset.tab);
    t.onkeydown=e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();const j=(i+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;tabs[j].focus();show(tabs[j].dataset.tab);}};});
  panel.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{select(b.dataset.go);focusNode(b.dataset.go);openPanel();});
  panel.querySelector(".preset").onclick=()=>resetMap();
  const tm=panel.querySelector(".tomap");
  tm.textContent=view==="list"?"↑ List":"↑ Map";tm.setAttribute("aria-label",view==="list"?"Back to list":"Back to map");tm.removeAttribute("aria-label");tm.onclick=backUp;
  linkTerms(panel.querySelector(".ptop")); panel.querySelectorAll(".tabpane").forEach(linkTerms);
  drawLines();
  try{localStorage.setItem("np-sel",id)}catch(e){}
  if(typeof syncReset==="function")syncReset();
}

// ---------- Personalize sheet + active choices ----------
const sheet=document.getElementById("sheet"), sheetback=document.getElementById("sheetback"), pzbtn=document.getElementById("pzbtn");
function openSheet(){sheet.hidden=false;sheetback.hidden=!narrow();pzbtn.setAttribute("aria-expanded","true");
  const f=sheet.querySelector("select");if(f)f.focus({preventScroll:!narrow()});}
function closeSheet(){sheet.hidden=true;sheetback.hidden=true;pzbtn.setAttribute("aria-expanded","false");pzbtn.focus({preventScroll:true});}
pzbtn.onclick=()=>sheet.hidden?openSheet():closeSheet();
document.getElementById("sheetdone").onclick=closeSheet;
sheetback.onclick=closeSheet;
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!sheet.hidden)closeSheet();});
function clearAll(){fitOn.clear();startKey="none";startSel.value="none";try{localStorage.setItem("np-start","none")}catch(e){}
  renderStart(false);
applyFilters();select("rn");unselect();drawLines();syncReset();}
document.getElementById("clearall").onclick=clearAll;
function renderActive(){
  const el=document.getElementById("active"); if(!el)return;
  const items=[];
  if(startKey!=="none")items.push({t:`Starting as <b>${STARTS[startKey].n}</b>`,x:()=>{startKey="none";startSel.value="none";try{localStorage.setItem("np-start","none")}catch(e){}renderStart(false);renderActive();}});
  items.push({t:pickState!=="none"?`State: <b>${STATES[pickState]}</b>`:`State: <b>not set (US averages)</b>`});
  if(adj)items.push({t:`Cost of living adjusted`,x:()=>{adj=false;adjBox.checked=false;try{localStorage.setItem("np-adj","0")}catch(e){}select(curId);renderActive();if(view==="list")renderList();}});
  fitOn.forEach(k=>{const f=FITS.find(x=>x.k===k);items.push({t:f.n,x:()=>{fitOn.delete(k);applyFilters();}});});
  const nf=fitOn.size+(startKey!=="none"?1:0);
  const pzn=document.getElementById("pzn"); pzn.hidden=!nf; pzn.textContent=nf;
  el.innerHTML=items.map((it,i)=>`<span class="achip">${it.t}${it.x?`<button type="button" class="x" data-i="${i}" aria-label="Remove">×</button>`:`<button type="button" class="x" data-open aria-label="Change">✎</button>`}</span>`).join("")+(nf?`<button type="button" class="aclear">Clear filters</button>`:"")+(fitOn.size&&view==="map"?`<span class="fnote">Faded jobs don't match your filters.</span>`:"");
  el.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>items[+b.dataset.i].x());
  el.querySelectorAll("[data-open]").forEach(b=>b.onclick=openSheet);
  const c=el.querySelector(".aclear"); if(c)c.onclick=clearAll;
}

// state picker
const stSel=document.getElementById("st"); let curId="rn";
stSel.innerHTML=`<option value="none">Not set (use US averages)</option>`+Object.entries(STATES).map(([k,v])=>`<option value="${k}">${v}</option>`).join("");
stSel.value=pickState;
stSel.addEventListener("change",()=>{pickState=stSel.value;try{localStorage.setItem("np-state",pickState)}catch(e){}select(curId);renderActive();if(view==="list")renderList();});

const adjBox=document.getElementById("adj"); adjBox.checked=adj;
adjBox.addEventListener("change",()=>{adj=adjBox.checked;try{localStorage.setItem("np-adj",adj?"1":"0")}catch(e){}select(curId);renderActive();if(view==="list")renderList();});

// ---------- Map / List views ----------
const map=document.getElementById("map"), listEl=document.getElementById("list"), mapwrap=document.getElementById("mapwrap");
let view="map"; try{const v=localStorage.getItem("np-view"); if(v==="list"||v==="map")view=v;}catch(e){}
let sortKey="pay";
function focusNode(id){ if(view!=="map")return; const e=nodeEls[id]; if(!e)return; const r=e.getBoundingClientRect();
  if(r.top<70||r.bottom>innerHeight-20) e.scrollIntoView({behavior:"smooth",block:"center"}); }
function setView(v){
  view=v; try{localStorage.setItem("np-view",v)}catch(e){}
  map.hidden=v!=="map"; listEl.hidden=v!=="list"; if(typeof syncReset==="function")syncReset();
  document.querySelectorAll("[data-view]").forEach(b=>b.setAttribute("aria-checked",b.dataset.view===v));
  document.getElementById("howto").innerHTML=v==="map"
    ?"Read top to bottom: start, school, license, then jobs. Tap any job to draw its lines to where it comes from and where it leads. Lines show common next steps, not required ones; <b>dashed lines</b> need work experience first."
    :"Every nursing job in one list. Sort it, then tap a job for details. Switch to <b>Map</b> to see how the steps connect.";
  document.getElementById("key").hidden=v!=="map";
  if(v==="list")renderList(); else drawLines();
}
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>setView(b.dataset.view));
const CAREER=all.filter(n=>["bedside","beyond","lead","aprn"].includes(n.g)||["cna","lpn","rn","scientist"].includes(n.id));
function roleStats(n){
  const p=P[n.id]||((n.g==="bedside"||n.g==="beyond")?["rn",""]:null);
  const key=p&&p[0], d=key&&PAY[key];
  let pay=null;
  if(d){const st=(pickState!=="none"&&d.st[pickState])?pickState:null; pay=st?val(st,d.st[st]):net(null,d.nat);}
  const R=routesFor(n); let cheap=null,time=null;
  if(R){const rs=R.map(r=>({n:r.n,lo:tot(r.steps,0),hi:tot(r.steps,1),yl:yrs(r.steps,0),yh:yrs(r.steps,1)}));
    cheap=rs.reduce((a,b)=>(b.lo+b.hi<a.lo+a.hi?b:a));
    time={yl:Math.min(...rs.map(r=>r.yl)),yh:Math.min(...rs.map(r=>r.yh))};}
  return {pay,rnlike:key==="rn"&&n.id!=="rn",cheap,time};
}
function renderList(){
  const fits=[...fitOn].map(k=>FITS.find(f=>f.k===k));
  const big=1e12;
  let rows=CAREER.map(n=>({n,s:roleStats(n)})).filter(({n})=>!fits.length||(LIFE[n.id]!==undefined&&fits.every(f=>f.ok(LIFE[n.id]))));
  if(sortKey==="pay")rows.sort((a,b)=>((b.s.pay??-1)-(a.s.pay??-1))||a.n.label.localeCompare(b.n.label));
  if(sortKey==="fast")rows.sort((a,b)=>((a.s.time?a.s.time.yl:big)-(b.s.time?b.s.time.yl:big))||((a.s.time?a.s.time.yh:big)-(b.s.time?b.s.time.yh:big)));
  if(sortKey==="cheap")rows.sort((a,b)=>((a.s.cheap?a.s.cheap.lo:big)-(b.s.cheap?b.s.cheap.lo:big))||((a.s.cheap?a.s.cheap.hi:big)-(b.s.cheap?b.s.cheap.hi:big)));
  const where=pickState!=="none"?`${STATES[pickState]}, after taxes`:"the US (federal taxes only; pick a state for state taxes)";
  listEl.innerHTML=`<div class="lhead">
      <div class="seg" role="radiogroup" aria-label="Sort jobs">${[["pay","Highest take-home pay"],["fast","Fastest to start"],["cheap","Cheapest school"]].map(([k,t])=>`<button type="button" role="radio" aria-checked="${k===sortKey}" data-sort="${k}">${t}</button>`).join("")}</div>
      <span class="lcount">${rows.length} jobs${fits.length?" match your filters":""}</span></div>
    <p class="note">Typical take-home pay in ${where}${adj?", adjusted for cost of living":""}; new graduates start lower. Jobs that BLS doesn't track separately are grouped under RN pay. Time and school cost are for the cheapest route from day one.</p>
    ${listRows(rows)}`;
  listEl.querySelectorAll("[data-sort]").forEach(b=>b.onclick=()=>{sortKey=b.dataset.sort;renderList();});
  listEl.querySelectorAll(".lrow").forEach(b=>b.onclick=()=>{select(b.dataset.id);listEl.querySelectorAll(".lrow").forEach(r=>r.classList.toggle("cur",r===b));openPanel();});
}
function rowHTML(n,s,rank){return `<button type="button" class="lrow${n.id===curId?" cur":""}" role="listitem" data-id="${n.id}" style="--c:${col(n.g)}">
      <span class="lrank">${rank}</span>
      <span class="lname"><i aria-hidden="true"></i><b>${n.label}${(from[n.id]||[]).some(f=>GATES[f+">"+n.id])?` <span class="lgate" title="Needs work experience first" aria-label="needs work experience first">⏳</span>`:""}</b><small>${GROUPS[n.g].name}</small></span>
      <span class="lcell"><small>Take-home</small>${s.pay!=null?`<b>${money(s.pay)}/yr</b>${s.rnlike?"<em>≈ RN pay</em>":""}`:"<b>Varies</b>"}</span>
      <span class="lcell"><small>Time</small><b>${s.time?fyr(s.time.yl,s.time.yh):"Varies"}</b></span>
      <span class="lcell"><small>School cost</small><b>${s.cheap?`${money(s.cheap.lo)}–${money(s.cheap.hi)}`:"Varies"}</b></span>
      ${LIFE[n.id]?`<span class="lsched">${Object.keys(LT).filter(k=>LIFE[n.id].includes(k)).map(k=>LT[k]).join(" · ")}</span>`:""}
    </button>`;}
function listRows(rows){
  if(sortKey!=="pay")return `<div class="lrows" role="list">${rows.map(({n,s},i)=>rowHTML(n,s,i+1)).join("")}</div>`;
  const own=rows.filter(r=>!r.s.rnlike), tied=rows.filter(r=>r.s.rnlike).sort((a,b)=>a.n.label.localeCompare(b.n.label));
  const rnRow=own.find(r=>r.n.id==="rn"), rnPay=rnRow?rnRow.s.pay:(tied[0]&&tied[0].s.pay);
  let html=`<div class="lrows" role="list">`, k=0, placed=!tied.length;
  const group=()=>`</div><details class="lgroup"><summary><span><b>${tied.length} more jobs paid like RNs</b><small>BLS doesn't track these specialties separately, so they share the RN figure of ${money(rnPay)}/yr. Tap to see them.</small></span></summary><div class="lrows" role="list">${tied.map(({n,s})=>rowHTML(n,s,"=")).join("")}</div></details><div class="lrows" role="list">`;
  own.forEach(r=>{html+=rowHTML(r.n,r.s,++k); if(!placed&&r.n.id==="rn"){html+=group();placed=true;}});
  if(!placed)html+=group();
  return html+`</div>`;
}

// ---------- Phone details sheet ----------
let lastFocus=null;
const smooth=()=>matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth";
const nudge=document.getElementById("nudge"), nudgetxt=document.getElementById("nudgetxt");
const panelInView=()=>{const r=panel.getBoundingClientRect();return r.top<innerHeight-120;};
function openPanel(){ if(!narrow())return; lastFocus=document.activeElement;
  if(panelInView()){nudge.hidden=true;return;}
  nudgetxt.textContent=(byId[curId].g==="hub"?"Registered Nurse":byId[curId].label)+" details below"; nudge.hidden=false; }
nudge.onclick=()=>{nudge.hidden=true; panel.scrollIntoView({behavior:smooth(),block:"start"});};
addEventListener("scroll",()=>{if(!nudge.hidden&&panelInView())nudge.hidden=true;},{passive:true});
addEventListener("resize",()=>{if(!narrow())nudge.hidden=true;});
const resetBtn=document.getElementById("resetmap");
function syncReset(){resetBtn.hidden=!(view==="map"&&svg.classList.contains("sel"));}
function unselect(){svg.classList.remove("sel");all.forEach(m=>nodeEls[m.id].classList.remove("on","cur","anc","route"));document.querySelectorAll(".tnote").forEach(e=>e.hidden=true);}
function resetMap(){select("rn");unselect();drawLines();nudge.hidden=true;try{localStorage.setItem("np-sel","rn")}catch(e){}
  syncReset(); mapwrap.scrollIntoView({behavior:smooth(),block:"start"}); }
resetBtn.onclick=resetMap;
const filtersEl=document.getElementById("filters"), filtersHome=document.createComment("filters"), sgridEl=document.querySelector("#sheet .sgrid");
filtersEl.before(filtersHome);
const smallMQ=matchMedia("(max-width:640px)");
function placeFilters(){ if(smallMQ.matches){if(filtersEl.parentElement!==sgridEl){sgridEl.appendChild(filtersEl);filtersEl.classList.add("sblock");}}
  else if(filtersEl.parentElement===sgridEl){filtersHome.after(filtersEl);filtersEl.classList.remove("sblock");} }
placeFilters(); smallMQ.addEventListener?smallMQ.addEventListener("change",placeFilters):smallMQ.addListener(placeFilters);
function backUp(){ const t=(lastFocus&&lastFocus.isConnected&&lastFocus!==document.body)?lastFocus:(view==="list"?listEl:mapwrap);
  t.scrollIntoView({behavior:smooth(),block:t===mapwrap||t===listEl?"start":"center"}); if(t.focus)t.focus({preventScroll:true}); }

// ---------- Question buttons ----------
function runQuestion(k){
  if(k==="sched"){openSched(); return;}
  if(k==="pay"||k==="fast"||k==="cheap")sortKey=k;
  setView("list"); mapwrap.scrollIntoView({behavior:"smooth",block:"start"});
}
document.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>runQuestion(b.dataset.q));
const schedq=document.getElementById("schedq"), sqopts=document.getElementById("sqopts"), sqGo=document.getElementById("sqGo");
let sqSel=new Set();
function renderSched(){sqopts.innerHTML=FITS.map(f=>`<button type="button" data-k="${f.k}" aria-pressed="${sqSel.has(f.k)}">${f.n}</button>`).join("");
  sqGo.disabled=!sqSel.size;
  sqopts.querySelectorAll("button").forEach(b=>b.onclick=()=>{sqSel.has(b.dataset.k)?sqSel.delete(b.dataset.k):sqSel.add(b.dataset.k);renderSched();sqopts.querySelector(`[data-k="${b.dataset.k}"]`).focus();});}
function openSched(){sqSel=new Set(fitOn);renderSched();schedq.hidden=false;schedq.scrollIntoView({behavior:"smooth",block:"center"});setTimeout(()=>{const f=sqopts.querySelector("button");if(f)f.focus({preventScroll:true});},300);}
sqGo.onclick=()=>{fitOn.clear();sqSel.forEach(k=>fitOn.add(k));schedq.hidden=true;sortKey="pay";setView("list");applyFilters();mapwrap.scrollIntoView({behavior:"smooth",block:"start"});};
document.getElementById("sqCancel").onclick=()=>{schedq.hidden=true;};

// ---------- Search with everyday words ----------
const SYN={
  rn:["registered nurse","rn","nurse"], cna:["nursing assistant","aide","nurse aide","assistant"], lpn:["practical nurse","vocational nurse","lvn"],
  adn:["associate degree","community college","2 year"], bsn:["bachelor","bachelors","4 year","university"], absn:["second degree","accelerated","career change"],
  demsn:["second degree","career change","masters entry"], rnbsn:["rn to bsn","online bsn"], msn:["masters","master's","graduate school"],
  dnp:["doctor","doctorate","doctor of nursing"], phd:["doctor","doctorate","research"], pmc:["certificate","second specialty"],
  fnp:["nurse practitioner","np","family","primary care"], agpcnp:["nurse practitioner","np","adult","primary care"], agacnp:["nurse practitioner","np","hospital np","acute care"],
  pnp:["nurse practitioner","np","kids","children","pediatric np"], pmhnp:["nurse practitioner","np","mental health","psychiatric","psych np"], whnp:["nurse practitioner","np","women's health","womens health","gyn","ob gyn"],
  nnp:["nurse practitioner","np","baby","newborn","neonatal","preemie"], enp:["nurse practitioner","np","er np","emergency np","urgent care"],
  crna:["anesthesia","anesthetist","anesthesiology","anaesthesia","nurse anesthetist","put people to sleep"], cnm:["midwife","midwifery","birth","baby","delivering babies","pregnancy"],
  cns:["clinical nurse specialist","specialist"], er:["er","er nurse","emergency room","trauma","emergency"], icu:["intensive care","critical care","icu"],
  ld:["baby","babies","labor","delivery","birth","maternity","ob","pregnancy","baby nurse"], nicu:["baby","babies","newborn","neonatal","preemie","baby nurse"],
  peds:["kids","children","child","pediatric"], onc:["cancer","chemo","oncology"], or:["surgery","surgical","operating room","or nurse"],
  psych:["mental health","psychiatric","behavioral health"], cardiac:["heart","cardiac","cardiology","cath lab"], dialysis:["kidney","renal","dialysis"],
  hospice:["end of life","palliative","dying"], medsurg:["med surg","hospital floor","general hospital"],
  home:["home health","visiting nurse","in-home"], public:["community","health department","public health"], school:["school","schools","kids"],
  tele:["remote","phone","telehealth","work from home","virtual"], travel:["travel","traveling","contract"], flight:["helicopter","air ambulance","transport","flight"],
  military:["army","navy","air force","military","veteran"], corr:["prison","jail","correctional"], occ:["workplace","occupational","employee health"],
  sane:["forensic","sexual assault","sane"], legal:["law","lawyer","legal","court"], aesth:["botox","injector","med spa","cosmetic","aesthetics"],
  info:["computer","tech","technology","it","data","epic","informatics"], case:["case manager","discharge","insurance"], ip:["infection","infection control"],
  woc:["wound","ostomy"], research:["research","clinical trials","studies"], industry:["pharma","pharmaceutical","sales","tech company"],
  entre:["business","own business","entrepreneur","own practice"], charge:["charge","shift lead","leader"], manager:["manager","boss","leadership","management"],
  director:["director","leadership"], cno:["executive","chief","ceo","leadership"], educator:["teach","teaching","trainer","educator"],
  faculty:["teacher","professor","teach","instructor","teaching"], quality:["quality","safety","patient safety"], policy:["government","advocacy","politics","policy"],
  scientist:["research","scientist","researcher"]
};
const MORE_SYN={
  rn:["enfermera","enfermero","registered"], cna:["nursing home","long-term care","auxiliar de enfermeria","auxiliar"], lpn:["nursing home","long-term care"],
  adn:["bridge","lpn to rn","lpn-to-rn"], bsn:["lpn to bsn"], rnbsn:["bridge","rn to bsn","online"], msn:["bridge","rn to msn"],
  fnp:["dermatology","enfermera practicante"], agpcnp:["geriatric","geriatrics","elderly","older adults","old people","seniors","gero","enfermera practicante"],
  agacnp:["enfermera practicante"], pnp:["enfermera practicante"], pmhnp:["enfermera practicante"], whnp:["enfermera practicante"], nnp:["enfermera practicante"], enp:["enfermera practicante"],
  crna:["anestesia","anestesista"], cnm:["partera"], peds:["kid"], home:["elderly","seniors","old people","geriatric"], hospice:["elderly"], aesth:["dermatology","skin"],
  dialysis:["kidney"],
  absn:["absn","second career","career changer","over 50","older adult student","changing careers"], demsn:["demsn","direct entry msn","second career","over 50","changing careers"],
  adn:["2 years","two years","cna to rn","medic","corpsman","68w","combat medic","no bachelor"], lpn:["cna to lpn","no degree","without a degree","medic","corpsman","68w"],
  cna:["no degree","without a degree","no experience","quickest"], military:["corpsman","medic","68w","combat medic","navy corpsman"],
  ld:["l&d","l and d"], or:["or","circulating nurse","scrub nurse","perioperative"], woc:["wound care","wocn","woc","ostomy nurse"],
  msn:["rn to np","rn to msn"], fnp:["rn to np","fnp"], pmhnp:["pmhnp","psychiatric nurse practitioner","psych np"], agpcnp:["agpcnp"], agacnp:["agacnp","acnp"], pnp:["pnp"], whnp:["whnp"], nnp:["nnp"], enp:["enp"],
  crna:["crna"], cnm:["cnm"], cns:["cns"], rn:["enfermeria"], bsn:["enfermeria","licenciatura"]
};
Object.entries(MORE_SYN).forEach(([k,v])=>SYN[k]=(SYN[k]||[]).concat(v));
const STOP=new Set(["nurse","nurses","nursing","a","an","the","job","jobs","career","careers","become","becoming","to","be","how","i","want","work","in","as","much","does","do","make","makes","what","whats","is","are","for","of","with","vs","versus","or","and","my","me","get","good","best","pay","paid","salary","money","about","de","la","el","una","un","que","cuanto","cual","can","there","need","should","will","would","its","it"]);
const words=x=>x.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9' ]+/g," ").split(/\s+/).filter(Boolean);
function lev(a,b){if(Math.abs(a.length-b.length)>2)return 9;const d=[];for(let i=0;i<=a.length;i++){d[i]=[i];}for(let j=1;j<=b.length;j++)d[0][j]=j;
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length];}
const VOCAB={}; all.forEach(n=>{const sigLast=n.sig.split(",").pop(); VOCAB[n.id]=new Set([...words(n.label),...words(sigLast).filter(w=>w.length>1),...(SYN[n.id]||[]).flatMap(words)]);});
function tokScore(t,set){if(set.has(t))return 1;let best=0;
  for(const w of set){
    if(t.length>=3&&w.startsWith(t)&&(t.length>=5||w.length-t.length<=2))best=Math.max(best,.8);
    else if(t.length>=4&&w.length>=4&&t[0]===w[0]){const dd=lev(t,w); if(dd<=(t.length>=7?2:1))best=Math.max(best,.6);}
  }return best;}
function searchRoles(v){
  const raw=words(v).join(" "); if(!raw)return [];
  const toks=raw.split(" ").filter(t=>!STOP.has(t));
  return all.map(n=>{
    const lab=words(n.label).join(" "), syn=(SYN[n.id]||[]).map(x=>words(x).join(" "));
    let sc=0;
    if(lab===raw)sc=200; else if(lab.startsWith(raw))sc=150; else if(syn.includes(raw))sc=140;
    else if(syn.some(x=>x.includes(" ")&&(" "+raw+" ").includes(" "+x+" ")))sc=125;
    if(toks.length){const ts=toks.map(t=>tokScore(t,VOCAB[n.id])), matched=ts.filter(x=>x>0).length;
      if(matched){const t=60*ts.reduce((a,b)=>a+b,0)/toks.length+(matched===toks.length?20:0); sc=sc?sc+t:40+t;}}
    return [n,sc];
  }).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]||a[0].label.localeCompare(b[0].label)).slice(0,8).map(x=>x[0]);
}
// Topics: questions about money, licenses and places, answered by opening the right section
const US_STATES={alabama:0,alaska:"AK",arizona:"AZ",arkansas:0,california:"CA",colorado:"CO",connecticut:0,delaware:0,florida:0,georgia:0,hawaii:"HI",idaho:"ID",illinois:0,indiana:0,iowa:0,kansas:0,kentucky:0,louisiana:0,maine:0,maryland:0,massachusetts:0,michigan:0,minnesota:0,mississippi:0,missouri:0,montana:"MT",nebraska:0,nevada:"NV","new hampshire":0,"new jersey":0,"new mexico":"NM","new york":0,"north carolina":0,"north dakota":0,ohio:0,oklahoma:0,oregon:"OR",pennsylvania:0,"rhode island":0,"south carolina":0,"south dakota":0,tennessee:0,texas:0,utah:"UT",vermont:0,virginia:0,washington:"WA","west virginia":0,wisconsin:0,wyoming:"WY"};
const cap=x=>x.replace(/\b\w/g,c=>c.toUpperCase());
function topicsFor(t){
  const r=" "+words(t).join(" ")+" ", out=[];
  const has=re=>re.test(r);
  if(has(/ (loans?|scholarships?|forgiv\w*|financial aid|grants?|gi bill|fafsa|debt|pay for (nursing )?school|becas?|prestamos?|pslf|repayment) /))
    out.push({k:"aid",t:"Ways to pay less for school: scholarships, loan repayment and forgiveness"});
  if(has(/ (compact|multistate|multi state|nlc|another state|other states?|different state|move to another|transfer my license|license in another) /))
    out.push({k:"nlc",t:"Which states share one RN license (the Nurse Licensure Compact)"});
  else if(has(/ (nclex|licen[sc]e|licensing|licensure|boards?|state exam) /))
    out.push({k:"nclex",t:"How the RN license and the NCLEX exam work"});
  for(const [nm,code] of Object.entries(US_STATES)){
    if(r.includes(" "+nm+" ")&&!(nm==="washington"&&/ dc /.test(r))&&!(nm==="virginia"&&r.includes(" west virginia "))){
      out.push(code?{k:"state",code,t:`Use ${cap(nm)} pay, taxes and cost of living`}:{k:"nostate",t:`${cap(nm)} isn't one of the 13 western states here, so pay uses US averages. Pick a state`}); break; } }
  if(has(/ (diabetes|diabetic|cdces) /))out.push({k:"note",t:"Diabetes educator isn't its own step on this map. It's a certification (CDCES) that RNs can earn after at least 2 years of practice and 1,000 hours teaching diabetes care. The closest jobs:",ids:["case","public","medsurg"]});
  return out;
}
function openSection(id,tab,sel){
  closeRes(); q.value=""; select(id); if(view==="map")focusNode(id);
  const tb=panel.querySelector(`[data-tab="${tab}"]`); if(tb)tb.click();
  const tg=sel?panel.querySelector(sel):null; if(tg&&tg.tagName==="DETAILS")tg.open=true;
  (tg||panel).scrollIntoView({behavior:smooth(),block:"start"});
}
function runTopic(tp){
  if(tp.k==="aid"){const id=(svg.classList.contains("sel")&&AID_FOR[curId])?curId:"bsn"; openSection(id,"money",".msec.aidsec");}
  else if(tp.k==="nlc")openSection("rn","where");
  else if(tp.k==="nclex")openSection("rn","getin");
  else if(tp.k==="state"){closeRes();q.value="";const was=svg.classList.contains("sel");stSel.value=tp.code;stSel.dispatchEvent(new Event("change"));if(!was){unselect();drawLines();syncReset();}openSheet();}
  else if(tp.k==="nostate"){closeRes();q.value="";openSheet();}
}
const INTENT=[[/pay|money|salary|earn|make|income|wage|rich|highest|sueldo|salario|gana|ganan|cuanto/,"pay","See jobs ranked by take-home pay"],[/fast|quick|soon|short|fastest/,"fast","See the fastest ways to start earning"],
  [/cheap|cost|afford|price|tuition|free/,"cheap","See the cheapest ways in"],[/night|schedule|weekend|hours|shift|day job|part.?time|prn|per.?diem|flexib/,"sched","Pick a schedule and see jobs that fit (most nursing jobs offer part-time or per-diem shifts)"]];
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const q=document.getElementById("q"), qres=document.getElementById("qres");
function closeRes(){qres.hidden=true;q.setAttribute("aria-expanded","false");}
function pickRole(id){closeRes();q.value="";select(id);if(view==="map")focusNode(id);else renderList();openPanel();}
function showRes(){
  const v=q.value, t=v.trim(); if(!t){closeRes();return;}
  const tps=topicsFor(t), note=tps.find(x=>x.k==="note");
  let items=searchRoles(v); if(note)items=[...note.ids.map(i=>byId[i]),...items.filter(n=>!note.ids.includes(n.id))].slice(0,8);
  const intent=INTENT.find(([re])=>re.test(t.toLowerCase()));
  let html=tps.map((tp,i)=>tp.k==="note"?`<div class="qnone">${tp.t}</div>`:`<button type="button" role="option" class="qopt qintent" data-topic="${i}">${tp.t} →</button>`).join("");
  if(intent)html+=`<button type="button" role="option" class="qopt qintent" data-intent="${intent[1]}">${intent[2]} →</button>`;
  html+=items.map(n=>`<button type="button" role="option" class="qopt" data-id="${n.id}" style="--c:${col(n.g)}"><i aria-hidden="true"></i><span>${n.label}</span><small>${GROUPS[n.g].name}</small></button>`).join("");
  if(!items.length&&!intent&&!tps.length)html=`<div class="qnone">No match for “${esc(t)}”. Try a job like <b>nurse practitioner</b>, <b>ER</b> or <b>school nurse</b>, or <button type="button" class="linkbtn" data-intent="list">browse every job in the list</button>.</div>`;
  qres.innerHTML=html; qres.hidden=false; q.setAttribute("aria-expanded","true");
  qres.querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>pickRole(b.dataset.id));
  qres.querySelectorAll("[data-topic]").forEach(b=>b.onclick=()=>runTopic(tps[+b.dataset.topic]));
  qres.querySelectorAll("[data-intent]").forEach(b=>b.onclick=()=>{closeRes();q.value="";runQuestion(b.dataset.intent);});
}
q.addEventListener("input",showRes);
q.addEventListener("focus",()=>{if(q.value.trim())showRes();});
q.addEventListener("keydown",e=>{
  if(e.key==="Enter"){e.preventDefault();const f=qres.querySelector("[data-topic],[data-id],[data-intent]");if(f)f.click();}
  else if(e.key==="ArrowDown"){const f=qres.querySelector("button");if(f){e.preventDefault();f.focus();}}
  else if(e.key==="Escape")closeRes();});
qres.addEventListener("keydown",e=>{const bs=[...qres.querySelectorAll("button")],i=bs.indexOf(document.activeElement);
  if(e.key==="ArrowDown"&&i<bs.length-1){e.preventDefault();bs[i+1].focus();}
  else if(e.key==="ArrowUp"){e.preventDefault();(i>0?bs[i-1]:q).focus();}
  else if(e.key==="Escape"){closeRes();q.focus();}});
document.addEventListener("click",e=>{if(!e.target.closest(".search"))closeRes();});

// ---------- Plain-language definitions ----------
const GLOSS={
  CNA:"Certified nursing assistant: hands-on care under a nurse. A short course, not a nursing license.",
  LPN:"Licensed practical nurse: a license below RN, usually about a year of school.",
  LVN:"Licensed vocational nurse: the California and Texas name for an LPN.",
  RN:"Registered nurse: the main nursing license, earned by passing the NCLEX-RN exam.",
  ADN:"Associate degree in nursing: a 2-year RN degree, usually at a community college.",
  BSN:"Bachelor of Science in Nursing: a 4-year RN degree.",
  ABSN:"Accelerated BSN: a 12–18 month BSN for people who already have a bachelor's in another field.",
  MSN:"Master of Science in Nursing: a graduate degree, often for nurse practitioners.",
  DNP:"Doctor of Nursing Practice: a clinical doctorate. DNP nurses may be called \"doctor,\" but they aren't physicians (MDs).",
  DNAP:"Doctor of Nurse Anesthesia Practice: the doctorate many nurse anesthesia programs award.",
  PhD:"A research doctorate, for nurse scientists and professors.",
  NP:"Nurse practitioner: an advanced nurse who diagnoses, treats and prescribes.",
  APRN:"Advanced practice registered nurse: the umbrella term for nurse practitioners, nurse anesthetists, nurse-midwives and clinical nurse specialists.",
  CRNA:"Certified registered nurse anesthetist: gives anesthesia for surgery and procedures.",
  CNM:"Certified nurse-midwife: cares for people through pregnancy and birth.",
  CNS:"Clinical nurse specialist: an expert nurse who improves care across a unit or specialty.",
  FNP:"Family nurse practitioner: an NP who gives primary care to all ages.",
  "NCLEX-RN":"The national exam you must pass to get an RN license.",
  NCLEX:"The national licensing exam for nurses (NCLEX-RN for RNs, NCLEX-PN for LPNs).",
  ICU:"Intensive care unit: the hospital unit for the sickest patients.",
  NICU:"Newborn intensive care unit.",
  ER:"Emergency room.",
  OR:"Operating room.",
  WUE:"Western Undergraduate Exchange: students from western states pay up to 150% of in-state tuition at participating schools instead of full out-of-state tuition.",
  WRGP:"Western Regional Graduate Program: the same kind of discount for graduate programs.",
  PSLF:"Public Service Loan Forgiveness: federal student loans are forgiven after 10 years of payments while you work for a nonprofit or government employer.",
  RAP:"Repayment Assistance Plan: the federal income-based loan repayment plan that started in 2026.",
  HRSA:"Health Resources and Services Administration: the federal agency that runs NURSE Corps.",
  CCNE:"A nursing school accreditor. Accreditation means the program meets national standards.",
  ACEN:"A nursing school accreditor. Accreditation means the program meets national standards.",
  CNEA:"A nursing school accreditor. Accreditation means the program meets national standards.",
  COA:"The accreditor for nurse anesthesia programs.",
  CCRN:"A certification for critical care nurses, often expected before nurse anesthesia school.",
  BLS:"Bureau of Labor Statistics: the federal agency that publishes the pay data used here.",
  ROTC:"A college military officer training program that can pay tuition in exchange for service.",
  HPSP:"Health Professions Scholarship Program: military scholarships for graduate health programs.",
  VA:"US Department of Veterans Affairs, a large employer of nurses.",
  AANPCB:"A board that certifies nurse practitioners.",
  ANCC:"A board that certifies nurses and nurse practitioners.",
  NBCRNA:"The board that certifies nurse anesthetists.",
  AMCB:"The board that certifies nurse-midwives.",
  MEPN:"University of Arizona's master's-entry nursing program for people with a bachelor's in another field."
};
const TERMKEYS=Object.keys(GLOSS).sort((a,b)=>b.length-a.length);
const TERMRE=new RegExp("(^|[^A-Za-z0-9-])("+TERMKEYS.map(k=>k.replace(/-/g,"\\-")).join("|")+")(?=s?(?![A-Za-z0-9]))","g");
function linkTerms(root){
  if(!root)return; const seen=new Set();
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:t=>{const p=t.parentElement;
    if(!p||p.closest("button,a,h2,summary,.term,script,style"))return NodeFilter.FILTER_REJECT;
    TERMRE.lastIndex=0; return TERMRE.test(t.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;}});
  const nodes=[]; while(w.nextNode())nodes.push(w.currentNode);
  nodes.forEach(t=>{
    const s=t.nodeValue; let last=0, m, frag=document.createDocumentFragment(), changed=false; TERMRE.lastIndex=0;
    while((m=TERMRE.exec(s))){const term=m[2], start=m.index+m[1].length;
      if(seen.has(term))continue; seen.add(term); changed=true;
      frag.appendChild(document.createTextNode(s.slice(last,start)));
      const b=document.createElement("button"); b.type="button"; b.className="term"; b.dataset.t=term; b.textContent=term; b.setAttribute("aria-label",term+": show definition");
      frag.appendChild(b); last=start+term.length;}
    if(changed){frag.appendChild(document.createTextNode(s.slice(last))); t.replaceWith(frag);}
  });
}
const tip=document.createElement("div"); tip.className="tip"; tip.hidden=true; tip.setAttribute("role","tooltip"); document.body.appendChild(tip);
function showTip(b){
  tip.innerHTML=`<b>${b.dataset.t}</b>${GLOSS[b.dataset.t]}`; tip.hidden=false;
  const r=b.getBoundingClientRect(), w=Math.min(300,innerWidth-24);
  tip.style.width=w+"px"; tip.style.left=Math.min(Math.max(12,r.left),innerWidth-w-12)+scrollX+"px"; tip.style.top=(r.bottom+scrollY+6)+"px";
}
document.addEventListener("click",e=>{const b=e.target.closest(".term"); if(b){e.stopPropagation();e.preventDefault();
  if(!tip.hidden&&tip.dataset.for===b.dataset.t){tip.hidden=true;tip.dataset.for="";return;} tip.dataset.for=b.dataset.t; showTip(b); return;}
  if(!e.target.closest(".tip"))tip.hidden=true;},true);
document.addEventListener("keydown",e=>{if(e.key==="Escape")tip.hidden=true;});
document.getElementById("panel").addEventListener("scroll",()=>{tip.hidden=true;});
let rz; window.addEventListener("resize",()=>{clearTimeout(rz);rz=setTimeout(()=>{tip.hidden=true;drawLines();},120);});

// ---------- First visit: two questions ----------
const welcome=document.getElementById("welcome"), wStart=document.getElementById("wStart"), wState=document.getElementById("wState");
wStart.innerHTML=Object.entries(STARTS).map(([k,v])=>`<option value="${k}">${k==="none"?"I'm just exploring":v.n}</option>`).join("");
wState.innerHTML=`<option value="none">Another state (use US averages)</option>`+Object.entries(STATES).map(([k,v])=>`<option value="${k}">${v}</option>`).join("");
wStart.value=startKey; wState.value=pickState;
let welcomed=false; try{welcomed=localStorage.getItem("np-welcomed")==="1";}catch(e){}
welcome.hidden=welcomed;
function doneWelcome(){welcome.hidden=true; try{localStorage.setItem("np-welcomed","1")}catch(e){}}
document.getElementById("wSkip").onclick=doneWelcome;
document.getElementById("wGo").onclick=()=>{
  startKey=wStart.value; startSel.value=startKey; pickState=wState.value; stSel.value=pickState;
  try{localStorage.setItem("np-start",startKey);localStorage.setItem("np-state",pickState);}catch(e){}
  doneWelcome();
  if(startKey!=="none"){renderStart(true);} else {select(curId);}
  renderActive(); if(view==="list")renderList();
  (startKey!=="none"?document.getElementById("nextsteps"):mapwrap).scrollIntoView({behavior:"smooth",block:"start"});
};

// ---------- First visit: teach the glossary affordance ----------
// First-timers don't realise underlined acronyms are tap-for-definition. Show one dismissible hint,
// with a real term button as the example, so a single tap both defines a word and teaches the pattern.
(function(){
  let seen=false; try{seen=localStorage.getItem("np-gloss-tip")==="1";}catch(e){}
  if(seen)return;
  const vb=document.querySelector(".viewbar"); if(!vb)return;
  const tip=document.createElement("div"); tip.className="glosstip";
  tip.innerHTML=`<span aria-hidden="true">💡</span><p>New to the lingo? Underlined words like <button type="button" class="term" data-t="BSN">BSN</button> have a plain-English definition — tap one.</p><button type="button" class="gtipx" aria-label="Dismiss this tip">×</button>`;
  vb.insertAdjacentElement("afterend",tip);
  const close=()=>{try{localStorage.setItem("np-gloss-tip","1")}catch(e){} tip.remove();};
  tip.querySelector(".gtipx").onclick=close;
}());

// start
let start="rn"; try{const s=localStorage.getItem("np-sel"); if(s&&byId[s])start=s;}catch(e){}
select(start);
if(start==="rn"){unselect();}
renderStart(false);
applyFilters();
setView(view);syncReset();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>drawLines());
