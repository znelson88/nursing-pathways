// Nursing Pathways — map, list, search, job details and page behavior.
// Depends on js/data.js. Also holds some per-role content tables (GATES, AID, LIFE, practice rules).
const col=g=>`var(${GROUPS[g].col})`;
const all=Object.values(byId);
const TIERS=[
  {n:"Start here", d:"Nursing school doesn't require a license or a health-care job first", groups:[["Optional: work first as",["cna","lpn"]],["What you need to start nursing school",["@hs","@bach"]]]},
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
// What you actually need to start each nursing-school route (shown as labels in "Start here").
const ENTRY_LABEL={"@hs":["High school diploma or GED","For ADN, BSN or Diploma RN"],"@bach":["Bachelor's degree in another field","For an accelerated BSN or direct-entry MSN"]};
const ENTRY_FROM={adn:"@hs",bsn:"@hs",diploma:"@hs",absn:"@bach",demsn:"@bach"};
const TIER_OF={};
const svg=document.getElementById("map");
const tl=document.getElementById("tlines");
const nodeEls={}; const edgeEls=[];
document.getElementById("tiers").innerHTML=TIERS.map((t,i)=>`<section class="tier" data-tier="${i}" aria-label="Step ${i+1}: ${t.n}">
  <header class="thead"><span class="tnum" aria-hidden="true">${i+1}</span><div><h3>${t.n}</h3>${t.d?`<p>${t.d}</p>`:""}${i===3?`<p class="tnote" hidden>Every job in this step starts from the RN license.</p>`:""}</div></header>
  ${t.groups.map(([gn,ids])=>`<div class="tgroup">${gn?`<span class="tglabel">${gn}</span>`:""}<div class="tchips">${ids.map(id=>{TIER_OF[id]=i;if(ENTRY_LABEL[id])return `<span class="entry" data-entry="${id}"><b>${ENTRY_LABEL[id][0]}</b><small>${ENTRY_LABEL[id][1]}</small></span>`;const n=byId[id];
     return n.g==="hub"?`<button type="button" class="rchip hub" data-id="rn"><b>Registered Nurse (RN)</b><small>Pass the NCLEX-RN exam. Every job below runs through this license.</small></button>`
       :`<button type="button" class="rchip" data-id="${id}" style="--c:${col(n.g)}"><i aria-hidden="true"></i>${n.label}</button>`;}).join("")}</div></div>`).join("")}
</section>`).join("");
document.querySelectorAll("#tiers .entry").forEach(e=>{nodeEls[e.dataset.entry]=e;});
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
  const first=curRoute.nodes[0]||id;
  if(ENTRY_FROM[first])pairs.push([ENTRY_FROM[first],first,first===id&&curRoute.nodes.length<2?"lentry":"lroute"]);
  curRoute.edges.forEach(([a,b])=>{seen.add(a+">"+b);pairs.push([a,b,"lroute"]);});
  (from[id]||[]).forEach(f=>{if(!seen.has(f+">"+id))pairs.push([f,id,(TIER_OF[f]===0&&TIER_OF[id]===1)?"lopt":"lin"]);});
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
  state:{n:"State loan repayment",t:"Colorado Health Service Corps pays NPs and midwives up to $90,000 for 3 years in underserved areas. Missouri's former nurse loan repayment program has been replaced by its Health Professional Loan Repayment Program, which lists hospital RNs ($10,000 with an associate degree, $35,000 with a bachelor's or master's, for 2 years of full-time work in an area of need) but not nurse practitioners. Arizona's program covers NPs and midwives ($40,000–$50,000 for 2 years); it paused new awards in 2025, so check whether it has reopened.",src:"https://cdphe.colorado.gov/colorado-health-service-corps-prospective-applicants"}
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
// NLC (Nurse Licensure Compact members) now lives in data.js so the schools page can use it too.
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
function applyFilters(){ drawLines(); }
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
let startKey="none"; try{localStorage.removeItem("np-start")}catch(e){}  // no "I'm starting as" picker any more
function renderStart(){}

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
function schoolsLink(id){const p=new URLSearchParams({job:id});if(SCHOOL_STATES.includes(pickState))p.set("state",pickState);if(startKey&&startKey!=="none")p.set("start",startKey);return "schools.html?"+p;}
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
function renderActive(){}
let curId="rn";

// ---------- Map / List views ----------
const map=document.getElementById("map"), mapwrap=document.getElementById("mapwrap");
const view="map"; try{localStorage.removeItem("np-view")}catch(e){}
function focusNode(id){ if(view!=="map")return; const e=nodeEls[id]; if(!e)return; const r=e.getBoundingClientRect();
  if(r.top<70||r.bottom>innerHeight-20) e.scrollIntoView({behavior:"smooth",block:"center"}); }
function setView(){ syncReset(); drawLines(); }

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
function backUp(){ const t=(lastFocus&&lastFocus.isConnected&&lastFocus!==document.body)?lastFocus:mapwrap;
  t.scrollIntoView({behavior:smooth(),block:t===mapwrap?"start":"center"}); if(t.focus)t.focus({preventScroll:true}); }


const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

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


// ---------- First visit: teach the glossary affordance ----------
// First-timers don't realise underlined acronyms are tap-for-definition. Show one dismissible hint,
// with a real term button as the example, so a single tap both defines a word and teaches the pattern.
(function(){
  let seen=false; try{seen=localStorage.getItem("np-gloss-tip")==="1";}catch(e){}
  if(seen)return;
  const vb=document.getElementById("key"); if(!vb)return;
  const tip=document.createElement("div"); tip.className="glosstip";
  tip.innerHTML=`<span aria-hidden="true">💡</span><p>New to the lingo? Underlined words like <button type="button" class="term" data-t="BSN" aria-label="BSN: show definition">BSN</button> have a plain-English definition — tap one.</p><button type="button" class="gtipx" aria-label="Dismiss this tip">×</button>`;
  vb.insertAdjacentElement("beforebegin",tip);
  const close=()=>{try{localStorage.setItem("np-gloss-tip","1")}catch(e){} tip.remove();};
  tip.querySelector(".gtipx").onclick=close;
}());

// start
let start="rn"; try{const s=localStorage.getItem("np-sel"); if(s&&byId[s])start=s;}catch(e){}
select(start);
if(start==="rn"){unselect();}
renderStart(false);
applyFilters();
setView();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>drawLines());

// "Report an error" in the footer (shown only once REPORT_FORM in data.js has the form's address).
(function(){const rf=document.getElementById("reportfoot");if(!rf)return;
  const h=reportLinkHTML("Career map (pay, cost, routes or job details)","Report an error");
  if(h){rf.innerHTML=`<b>Spotted something wrong?</b> ${h} and say which job and number.`;rf.hidden=false;}}());
