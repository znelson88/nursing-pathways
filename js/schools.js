// Schools page — builds a step-by-step route through real, verified programs toward a chosen job.
// Reads ?job=&state=&start= from the career map's link. Depends on js/data.js (shared byId / to)
// and on the per-state data file (window.SCHOOLS[state]) loaded before this script.
(function () {
  "use strict";
  const qs = new URLSearchParams(location.search);
  const jobSel = document.getElementById("job");
  const startStateSel = document.getElementById("startState");
  const finishStateSel = document.getElementById("finishState");
  const schoolSel = document.getElementById("startSchool");
  const routeEl = document.getElementById("route");
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pct = r => (r == null ? "—" : Math.round(r * 100) + "%");

  // ---- Job dropdown (real jobs/roles only; degrees like ADN/BSN/MSN/DNP are steps, not goals) ----
  const NOT_A_JOB = new Set(["diploma", "adn", "bsn", "absn", "demsn", "rnbsn", "msn", "pmc", "dnp", "phd"]);
  const jobs = Object.values(byId).filter(n => n.g !== "hub" && !NOT_A_JOB.has(n.id)).sort((a, b) => a.label.localeCompare(b.label));
  jobSel.innerHTML = `<option value="rn">Registered Nurse (RN)</option>` + jobs.map(n => `<option value="${n.id}">${esc(n.label)}</option>`).join("");
  // Only honour ?job= when it's an actual job in the dropdown; a degree id (bsn/adn/…) or junk
  // falls back to the default (RN) so the URL stays tidy instead of going blank.
  if (qs.get("job") && [...jobSel.options].some(o => o.value === qs.get("job"))) jobSel.value = qs.get("job");

  // ---- Starting state + Finishing state ----
  // You pick the state you're starting in (which fills the starting-school list below), and the state
  // you want to FINISH in. When they match it's an ordinary in-state route; when they differ the route
  // hands off from the start state to the finish state after the RN license (see buildRoute).
  const LOADED = SCHOOL_STATES.filter(s => window.SCHOOLS && window.SCHOOLS[s]);
  const stateOpts = LOADED.map(s => `<option value="${s}">${esc(fullState(s))}</option>`).join("");
  startStateSel.innerHTML = stateOpts;
  finishStateSel.innerHTML = stateOpts;
  // Default the starting state to the one the map linked from (?state=), else the first loaded state.
  startStateSel.value = LOADED.includes(qs.get("state")) ? qs.get("state") : LOADED[0];
  // Default: finish where you start. A ?finish= link can preset a cross-state move.
  finishStateSel.value = LOADED.includes(qs.get("finish")) ? qs.get("finish") : startStateSel.value;
  document.getElementById("covered").textContent = "Schools and programs · " + coveredStates({ _states: LOADED });

  // ---- "I'm starting as" (same keys as the career map's STARTS, passed as ?start=) ----
  // held: the credential the person already has, so the route begins AFTER it (RN holders skip
  // the school picker and the NCLEX). entry: which kind of program a career changer starts in.
  const STARTS = {
    none:  { n: "New to nursing" },
    hs:    { n: "High school student or graduate" },
    cna:   { n: "CNA" },
    lpn:   { n: "LPN / LVN" },
    bach:  { n: "Bachelor's degree in another field", entry: ["absn", "demsn"] },
    adnrn: { n: "RN with an associate degree (ADN)", held: "adn" },
    bsnrn: { n: "RN with a BSN", held: "bsn" },
    msnap: { n: "Nurse practitioner or MSN", held: "msn" }
  };
  // Credentials each kind of licensed nurse already has, so the route doesn't repeat them.
  const HAVE = {
    adn: new Set(["cna", "lpn", "diploma", "adn", "rn"]),
    bsn: new Set(["cna", "lpn", "diploma", "adn", "rn", "bsn", "absn", "demsn", "rnbsn"]),
    msn: new Set(["cna", "lpn", "diploma", "adn", "rn", "bsn", "absn", "demsn", "rnbsn", "msn"])
  };
  // School-dropdown groups (institution.type), in display order.
  const SCHOOL_GROUPS = [
    ["community_college", "Community colleges"],
    ["public_university", "Public universities"],
    ["private_nonprofit", "Private nonprofit colleges and universities"],
    ["other", "Other schools"]
  ];
  const TYPE_LABEL = { community_college: "Community college", public_university: "Public university", private_nonprofit: "Private nonprofit" };
  let rendered = false;            // first render honours ?school=; later renders keep the user's pick
  let cmpSort = "pass", cmpType = "all";   // "Help me choose" sort and filter
  const startAsSel = document.getElementById("startAs");
  startAsSel.innerHTML = Object.entries(STARTS).map(([k, v]) => `<option value="${k}">${esc(v.n)}</option>`).join("");
  startAsSel.value = STARTS[qs.get("start")] ? qs.get("start") : "none";

  const jobLabel = id => (!id || !byId[id] ? "Registered Nurse" : (byId[id].g === "hub" ? "Registered Nurse" : byId[id].label));

  // ---- Which credentials can begin a path (used to list "starting" schools) ----
  const ENTRY = ["cna", "lpn", "diploma", "adn", "bsn", "absn", "demsn"]; // rough tier order, lowest first
  const BSNEQ = new Set(["bsn", "absn", "demsn"]); // already a bachelor's — no RN-to-BSN step needed
  // Credentials you enrol in (a program you'd find on this page), vs. work roles reached by experience.
  const PROGRAM_CREDS = new Set([
    "cna", "lpn", "diploma", "adn", "bsn", "absn", "demsn", "rnbsn", "msn", "pmc", "dnp", "phd",
    "fnp", "agpcnp", "agacnp", "pnp", "pmhnp", "whnp", "nnp", "enp", "cns", "cnm", "crna"
  ]);
  const APRN = new Set(["fnp", "agpcnp", "agacnp", "pnp", "pmhnp", "whnp", "nnp", "enp", "cns", "cnm", "crna"]);
  // Education backbone the route may walk: every program credential plus the RN license.
  const EDU = new Set([...PROGRAM_CREDS, "rn"]);
  // All loaded states merged into one dataset, each record tagged with its state (`_state`).
  // Institution and program ids are unique across states, so the merge is safe. The route is
  // always built against this combined set, which is what lets a path cross state lines.
  function combinedData() {
    const out = { institutions: [], programs: [], agreements: [], tuition: {}, _states: LOADED.slice() };
    LOADED.forEach(s => {
      const d = (window.SCHOOLS && window.SCHOOLS[s]) || {};
      Object.assign(out.tuition, d.tuition || {});
      (d.institutions || []).forEach(i => out.institutions.push(Object.assign({ _state: s }, i)));
      (d.programs || []).forEach(p => out.programs.push(Object.assign({ _state: s }, p)));
      (d.agreements || []).forEach(a => out.agreements.push(Object.assign({ _state: s }, a)));
    });
    return out;
  }
  const stateOf = (data, id) => { const i = data.institutions.find(x => x.id === id); return i ? i._state : null; };

  function startingSchools(data, entry) {
    if (!data) return [];
    entry = entry || ENTRY;
    return data.institutions.filter(inst =>
      data.programs.some(p => p.institution === inst.id && entry.includes(p.credential)));
  }
  function entryCredential(data, schoolId, entry) {
    const creds = data.programs.filter(p => p.institution === schoolId).map(p => p.credential);
    for (const c of (entry || ENTRY)) if (creds.includes(c)) return c;
    return null;
  }

  // ---- Shortest credential path over the career-map graph (shared `to` from data.js) ----
  function bfs(start, goal) {
    if (start === goal) return [start];
    const prev = { [start]: null }, q = [start];
    while (q.length) {
      const x = q.shift();
      if (x === goal) break;
      // Only step through EDUCATION nodes (degrees/credentials + the RN license). This keeps the
      // schools route on the "go to school" backbone and ignores the career map's experience-based
      // shortcuts (e.g. ICU -> Acute-Care NP), which would wrongly skip the BSN and grad-school steps.
      (to[x] || []).forEach(y => { if (y !== goal && !EDU.has(y)) return; if (!(y in prev)) { prev[y] = x; q.push(y); } });
    }
    if (!(goal in prev)) return null;
    const p = []; for (let c = goal; c != null; c = prev[c]) p.unshift(c);
    return p;
  }
  // Credential sequence from a starting credential to the goal, routed through the RN license.
  function sequence(startCred, goal) {
    if (goal === startCred) return [startCred];
    const toRn = bfs(startCred, "rn");
    if (goal === "rn") return toRn || [startCred, "rn"];
    // If start is already an RN-or-later credential, go straight; else go to RN first, then onward.
    const beforeRn = toRn && toRn.indexOf(goal) !== -1 && toRn.indexOf(goal) < toRn.length - 1;
    if (beforeRn) return toRn.slice(0, toRn.indexOf(goal) + 1);
    const seg1 = toRn || [startCred];
    let seg2 = bfs("rn", goal) || bfs(startCred, goal) || [goal];
    // Safeguard: an advanced-practice goal always requires a bachelor's and a graduate program.
    // If the graph gave a shortcut that skipped them, insert them so the route is educationally honest.
    if (APRN.has(goal) && !seg2.some(c => c === "rnbsn" || c === "bsn" || c === "msn" || c === "dnp")) {
      seg2 = ["rn", "rnbsn", "msn", goal];
    }
    const seen = new Set(), out = [];
    seg1.concat(seg2).forEach(c => { if (!seen.has(c)) { seen.add(c); out.push(c); } });
    // If the student already holds a bachelor's (started at a BSN/ABSN) or a master's (direct-entry MSN),
    // don't make them do an RN-to-BSN (or a second master's) on the way to a graduate goal.
    if (BSNEQ.has(startCred)) {
      let drop = new Set(["rnbsn"]);
      if (startCred === "demsn") drop.add("msn");
      return out.filter(c => !drop.has(c));
    }
    return out;
  }

  // ---- Build the ordered list of steps (program cards + the RN-license milestone) ----
  // opts.entry: program types a career changer starts in (e.g. ABSN for bachelor's holders).
  // opts.held + opts.startState: an already-licensed nurse — no starting school; the route begins
  // after the credentials they hold (HAVE[held]).
  function buildRoute(data, schoolId, goal, finishState, opts) {
    opts = opts || {};
    const held = opts.held || null;
    let startState, seq;
    if (held) {
      startState = opts.startState;
      // From an MSN, go straight to the specialty; if the graph has no such edge, use the BSN route.
      const path = (held === "msn" && bfs("msn", goal)) || sequence(held === "msn" ? "bsn" : held, goal);
      seq = path.filter(c => !HAVE[held].has(c));
    } else {
      const startCred = entryCredential(data, schoolId, opts.entry);
      if (!startCred) return { steps: [], note: "nostart" };
      startState = stateOf(data, schoolId);             // the state the student starts in (physically)
      seq = sequence(startCred, goal);
    }
    finishState = finishState || startState;            // where they want to finish; same unless moving
    const progCreds = new Set(data.programs.map(p => p.credential));
    const steps = [];
    let currentSchool = held ? null : schoolId, lastProgram = null, missing = null;

    let stepIndex = 0, afterRn = !!held, handoffDone = false;
    seq.forEach(cred => {
      if (cred === "rn") { steps.push({ kind: "license" }); afterRn = true; return; }
      if (!progCreds.has(cred)) {
        // No program in our data for this credential. If it's the GOAL and a real program-type
        // credential, flag it honestly; if it's an intermediate (e.g. "msn" absorbed by a
        // BS-to-DNP) or a work role, just skip it.
        if (cred === goal && PROGRAM_CREDS.has(cred)) missing = cred;
        return;
      }
      // Before the RN license the route stays in the starting state; after it, the route aims for the
      // state the student wants to FINISH in. They're the same unless this is a cross-state move.
      const preferState = afterRn ? finishState : startState;
      const sameState = p => (p._state === preferState ? 1 : 0);
      const prevSchoolState = currentSchool ? stateOf(data, currentSchool) : startState;

      const all = data.programs.filter(p => p.credential === cred);
      // Stay at the current school only when it's already in the state we're aiming for this step —
      // otherwise a same-school RN-to-BSN would quietly override a planned move to another state.
      const here = all.filter(p => p.institution === currentSchool);
      let primary, transfer, agr;
      if (here.length && prevSchoolState === preferState) {
        primary = here[0]; transfer = false;
        agr = lastProgram ? agreement(data, lastProgram.id, primary.id) : null;
      } else {
        // Move schools. Prefer a program reachable by a cited agreement from the last program;
        // otherwise any program that is open by credential (admits holders of the prior credential).
        const away = all.filter(p => p.institution !== currentSchool);
        const linked = lastProgram ? away.filter(p => agreement(data, lastProgram.id, p.id)) : [];
        const pool = (linked.length ? linked : away.filter(p => p.open_entry)).slice();
        if (!pool.length) { missing = cred; return; }
        // Prefer a program in the state we're aiming for; cross a line only when there's no option
        // there (and then only because the program is online / open to out-of-state nurses).
        pool.sort((a, b) => (sameState(b) - sameState(a)) || (score(b) - score(a)));
        primary = pool[0]; transfer = true;
        agr = lastProgram ? agreement(data, lastProgram.id, primary.id) : null;
      }
      // Other verified options for this step (not for the very first/entry step, which is the
      // school the student already chose). Same credential, reachable by agreement or open entry.
      const alternatives = (stepIndex === 0 && !lastProgram && !held) ? [] :
        all.filter(p => p.id !== primary.id &&
          (p.open_entry || (lastProgram && agreement(data, lastProgram.id, p.id))))
          .sort((a, b) => (sameState(b) - sameState(a)) || (score(b) - score(a))).slice(0, 3);

      const landed = primary._state;
      // A fallback cross: we wanted preferState but have no verified program there, so we landed elsewhere.
      const crossState = transfer && landed !== preferState;
      // The intended hand-off: the first post-license step that actually reaches the finish state,
      // when the student asked to finish somewhere other than where they started.
      const isHandoff = afterRn && finishState !== startState && landed === finishState &&
        prevSchoolState !== finishState && !handoffDone;
      if (isHandoff) handoffDone = true;
      // Name the "move" pill with the destination state whenever a step changes states.
      const crossedInto = (transfer && landed !== prevSchoolState) ? landed : null;

      steps.push({
        kind: "program", primary, alternatives, transfer, agreement: agr,
        crossState, handoff: isHandoff, crossedInto, preferState, landedState: landed,
        startState, finishState, first: stepIndex === 0 && !isHandoff && !crossState,
        heldStart: !!held && stepIndex === 0
      });
      currentSchool = primary.institution;
      lastProgram = primary;
      stepIndex++;
    });

    // Did we actually reach the goal? (goal may be a work role reached by experience, not a degree.)
    const reached = progCreds.has(goal) ? steps.some(s => s.kind === "program" && s.primary.credential === goal) : true;
    return { steps, missing, reachedGoal: reached, goalIsProgram: PROGRAM_CREDS.has(goal), startState, finishState, held };
  }
  function agreement(data, fromId, toId) {
    const list = data.agreements || [];
    const direct = list.find(a => a.from_program === fromId && a.to_program === toId);
    if (direct) return direct;
    // A bridge program awards the same degree as the school's standard program, so the school's transfer
    // agreements for that degree apply to bridge graduates too.
    const from = data.programs.find(p => p.id === fromId);
    if (!from || !from.bridge_from) return null;
    return list.find(a => a.to_program === toId && data.programs.some(p =>
      p.id === a.from_program && p.institution === from.institution && p.credential === from.credential)) || null;
  }
  // "Completeness" score so the most fully-verified option is shown first.
  function score(p) {
    let s = 0;
    if (p.accreditation) s += 2;
    if (p.cost && (p.cost.amount != null || p.cost.basis)) s += 1;
    if (p.admission && p.admission.gpa) s += 1;
    if (p.length) s += 1;
    return s;
  }

  // ---------- Rendering ----------
  function instName(data, id) { const i = data.institutions.find(x => x.id === id); return i ? i.name : id; }
  function srcLine(url, date, record) {
    const link = url ? `<a href="${esc(url)}" target="_blank" rel="noopener">Source</a>` : `<span class="nosrc">No source link</span>`;
    const rep = record ? reportLinkHTML(record) : "";
    return `<p class="src">${link}${date ? ` · Last checked ${esc(date)}` : ""}${rep ? ` · ${rep}` : ""}</p>`;
  }
  function field(label, value) {
    return `<div class="fld"><span class="fl">${esc(label)}</span><span class="fv">${value}</span></div>`;
  }
  function na(v, fallback) { return (v == null || v === "") ? `<span class="muted">${fallback || "Not published — check with the school"}</span>` : esc(v); }

  function prereqHTML(list) {
    if (!list || !list.length) return na(null, "Not published — check with the school");
    return `<ul class="prereq">` + list.map(c =>
      `<li>${esc(c.course)}${c.code ? ` <span class="code">${esc(c.code)}</span>` : ""}${c.min_grade ? ` · min grade ${esc(c.min_grade)}` : ""}</li>`).join("") + `</ul>`;
  }
  // What a cost.amount is measured in. Totals often mention a per-credit rate in their description
  // ("$19,733 for the 56.5-credit program at $370.40/credit"), so a mention of "credit" alone isn't
  // enough: a per-credit amount is a small number AND described per credit.
  function costUnit(c) {
    const b = (c && c.basis) || "";
    if (c && c.amount != null && c.amount < 2500 && /credit|unit/i.test(b)) return "credit";
    if (/academic year|per year|a year/i.test(b) && !/program|all semesters/i.test(b)) return "year";
    return "program";
  }
  // School-wide yearly tuition (College Scorecard), e.g. "$4,618 a year in-state, $7,564 out-of-state".
  function tuitionText(t) {
    const yr = `<b>$${Number(t.in_state).toLocaleString()}</b> a year`;
    if (t.out_of_state == null || t.out_of_state === t.in_state) return `${yr}${t.out_of_state === t.in_state ? " for every student" : ` ${esc(t.in_label)}`}`;
    return `${yr} ${esc(t.in_label)}, $${Number(t.out_of_state).toLocaleString()} out-of-state`;
  }
  // Only for pre-licensure (entry) programs without their own published price: a school's undergraduate
  // rate says little about graduate or RN-to-BSN pricing, and nothing when the program has a real figure.
  function schoolTuition(data, p) {
    if (!p || !ENTRY.includes(p.credential) || (p.cost && p.cost.amount != null)) return null;
    return (data.tuition && data.tuition[p.institution]) || null;
  }
  function tuitionHTML(t) {
    return `<p class="tuit">School-wide tuition and fees: ${tuitionText(t)} <span class="muted">(${esc(t.year)})</span>.
      <span class="muted">This is the school's general rate for full-time undergraduates. Nursing programs often charge extra course and clinical fees, so expect the total to be higher.${t.notes ? " " + esc(t.notes) : ""}
      <a href="${esc(t.source_url)}" target="_blank" rel="noopener">Source: College Scorecard</a> · Last checked ${esc(t.last_verified)}</span></p>`;
  }
  function costHTML(cost) {
    if (!cost) return na(null);
    const u = costUnit(cost);
    const amt = cost.amount != null ? `<b>${usd(cost.amount)}</b>${u === "credit" ? "/credit" : u === "year" ? "/year" : ""}` : "";
    return `${amt ? amt + " — " : ""}${cost.basis ? esc(cost.basis) : na(null)}${cost.year ? ` <span class="muted">(${esc(cost.year)})</span>` : ""}`;
  }
  function admissionHTML(a) {
    if (!a) return na(null);
    const bits = [];
    if (a.entrance_exam) bits.push(`<b>Entrance exam:</b> ${esc(a.entrance_exam)}`);
    if (a.selection) bits.push(`<b>Selection:</b> ${esc(a.selection)}`);
    if (a.gpa) bits.push(`<b>GPA:</b> ${esc(a.gpa)}`);
    if (a.deadline) bits.push(`<b>When to apply:</b> ${esc(a.deadline)}`);
    if (a.notes) bits.push(esc(a.notes));
    return bits.length ? bits.map(b => `<p>${b}</p>`).join("") : na(null);
  }
  function passRateHTML(pr) {
    if (!pr) return na(null);
    if (!pr.by_campus) return `<span class="muted">${esc(pr.basis || "Not applicable")}</span>`;
    const rows = Object.entries(pr.by_campus).map(([campus, series]) => {
      const cells = series.map(s => `<span class="yr">${s.year}: <b>${pct(s.rate)}</b>${s.tested ? ` <span class="muted">(${s.tested} tested)</span>` : ""}</span>`).join(" ");
      return `<div class="prrow"><span class="camp">${esc(campus)}</span> ${cells}</div>`;
    }).join("");
    const link = pr.source_url ? ` <a href="${esc(pr.source_url)}" target="_blank" rel="noopener">source</a>` : "";
    return `${rows}<p class="prbasis muted">${esc(pr.basis)}${link}</p>`;
  }

  function programCard(data, p, opts) {
    opts = opts || {};
    return `<article class="pcard${opts.alt ? " alt" : ""}">
      <div class="pchead">
        <h3>${esc(p.name)}</h3>
        <p class="pinst">${esc(instName(data, p.institution))}${p._state ? ` <span class="pstate">${esc(fullState(p._state))}</span>` : ""}</p>
      </div>
      ${field("Length", na(p.length))}
      ${field("Format", na(p.format))}
      ${p.open_entry
        ? field("Prerequisites", `<span class="muted">No college-course prerequisites — you qualify by holding the degree and license shown under Admission.</span>`)
        : field("Prerequisites", prereqHTML(p.prerequisites))}
      ${field("Admission", admissionHTML(p.admission))}
      ${field("Cost", costHTML(p.cost) + (schoolTuition(data, p) ? tuitionHTML(schoolTuition(data, p)) : ""))}
      ${field("NCLEX-RN pass rate", passRateHTML(p.nclex_pass_rate))}
      ${field("Accreditation", na(p.accreditation))}
      ${p.notes ? `<p class="pnote">${esc(p.notes)}</p>` : ""}
      ${srcLine(p.source_url, p.last_verified, `${p.name} at ${instName(data, p.institution)} (${p.id})`)}
    </article>`;
  }
  function agreementHTML(agr) {
    if (!agr) return "";
    const tag = agr.type === "internal" ? "Continue at the same school" : (agr.type === "open_admission" ? "How you get in" : "Transfer agreement");
    return `<div class="agr">
      <span class="agrtag">${esc(tag)}</span>
      <p>${esc(agr.basis)}</p>
      ${agr.conditions ? `<p class="agrcond"><b>Conditions:</b> ${esc(agr.conditions)}</p>` : ""}
      ${srcLine(agr.source_url, agr.last_verified)}
    </div>`;
  }
  // The connecting block before a step: a cited agreement if we have one, otherwise an honest
  // synthesized note (never shown before the first step).
  function connectionHTML(step) {
    if (step.first) return "";
    if (step.handoff) {
      const compact = (typeof NLC !== "undefined") && NLC.has(step.startState) && NLC.has(step.finishState);
      const license = compact
        ? `Your <b>RN license carries over</b> — ${esc(fullState(step.startState))} and ${esc(fullState(step.finishState))} are both Nurse Licensure Compact states, so one multistate license covers both.`
        : `${esc(fullState(step.finishState))} is <b>not</b> in the Nurse Licensure Compact, so you'll apply to its board of nursing for an RN license by endorsement when you move — plan for that extra step.`;
      return `<div class="agr handoff"><span class="agrtag">↪ Move to ${esc(fullState(step.finishState))}</span>
        <p>This is where your plan crosses state lines. ${license} The program below admits nurses who
        already hold the accredited nursing degree and RN license shown under Admission, so a nurse coming from
        ${esc(fullState(step.startState))} qualifies. If you also finished college prerequisite courses in
        ${esc(fullState(step.startState))}, they usually transfer — but confirm each course with the
        school, because we don't track cross-state course-by-course credit.</p></div>`;
    }
    if (step.agreement) return agreementHTML(step.agreement);
    if (step.transfer) {
      const crossNote = step.crossState
        ? ` We don't have a verified ${esc(fullState(step.preferState))} program in our data for this step,
           so the closest confirmed option is in <b>${esc(fullState(step.landedState))}</b>. It admits
           qualified out-of-state nurses who hold the credential shown below, but check its <b>Format</b>
           on the card — it may require attending in ${esc(fullState(step.landedState))} — and confirm
           with the school before you rely on it.`
        : "";
      return `<div class="agr"><span class="agrtag">How you get in</span>
        <p>${step.heldStart ? "" : "No special transfer agreement with your starting school is required. "}Programs like this admit
        nurses who hold the degree and license shown below from any accredited school — see the admission
        details on the card.${crossNote}</p></div>`;
    }
    return `<div class="agr"><span class="agrtag">Continue at the same school</span>
      <p>This next step is offered at the same school, so you stay put — see the admission details on the card.</p></div>`;
  }

  function render() {
    const goal = jobSel.value;
    const startStateV = startStateSel.value || LOADED[0];
    const finishStateV = finishStateSel.value || startStateV;
    const data = combinedData();                 // route is always built against every loaded state
    const goalLabel = jobLabel(goal);
    document.getElementById("title").textContent = `Schools and programs: ${goalLabel}`;
    document.getElementById("lede").textContent =
      `A common, verified route through real programs toward ${goalLabel}. Pick where you're starting and where you want to finish; if those differ, the route hands off between states after the RN license. Every fact shows its source and the date it was last checked.`;

    const startKey = startAsSel.value;
    const who = STARTS[startKey] || STARTS.none;
    const held = who.held || null;
    // Bridge programs (bridge_from: lpn / lpn_or_paramedic / paramedic) need an existing license, so they're
    // only offered to people starting as an LPN, and for them they come first.
    const lpnStart = startKey === "lpn";
    data.programs = data.programs.filter(p => !p.bridge_from || (lpnStart && /lpn/.test(p.bridge_from)));
    if (lpnStart) data.programs.sort((a, b) => (b.bridge_from ? 1 : 0) - (a.bridge_from ? 1 : 0));
    const lpnNote = (schoolIdOrNull, stateCode) => {
      if (!lpnStart) return "";
      const bridgeHere = schoolIdOrNull && data.programs.some(p => p.institution === schoolIdOrNull && p.bridge_from);
      if (bridgeHere) return `<div class="gap"><b>This route starts with an LPN-to-RN bridge.</b>
        <p>It's for nurses who already hold an LPN license, so it's shorter than the standard entry. Check the admission details for license and experience rules.</p></div>`;
      const anyInState = data.programs.some(p => p.bridge_from && p._state === stateCode);
      if (!schoolIdOrNull && anyInState) return `<div class="gap"><b>Schools with an LPN-to-RN bridge show it on their card.</b>
        <p>A bridge is shorter than the standard entry because it counts your LPN license. Schools without one show their standard entry; ask them what your license counts for.</p></div>`;
      return `<div class="gap"><b>${anyInState ? "This school has no LPN-to-RN bridge in our data." : "We don't list LPN-to-RN bridge programs for this state yet."}</b>
        <p>${schoolIdOrNull ? "The route below uses the standard entry." : "Where a school offers an LPN-to-RN bridge, its card shows the bridge."} Many nursing programs give LPNs advanced placement or a shorter bridge, so ask each school what your LPN license counts for.</p></div>`;
    };

    // Starting-school selector: only schools in the chosen STARTING state (the cascade). Preserve the
    // current choice across re-renders, otherwise rebuilding the <option> list resets it.
    // A bachelor's holder sees schools with an accelerated or direct-entry program; an RN doesn't
    // need a starting school at all (their route begins after the license).
    let entry = who.entry || null;
    let starts = held ? [] : startingSchools(data, entry).filter(s => s._state === startStateV);
    if (!held && entry && !starts.length) { entry = null; starts = startingSchools(data).filter(s => s._state === startStateV); }
    const prevStart = schoolSel.value;
    // First option = "help me choose" (value ""), which shows the comparison instead of one route.
    // Schools are grouped by type and sorted A–Z so people can find theirs.
    schoolSel.innerHTML = held
      ? `<option value="">Not needed: you're already an RN</option>`
      : starts.length
        ? `<option value="">Not sure yet: help me choose</option>` + SCHOOL_GROUPS.map(([type, label]) => {
            const g = starts.filter(s => (SCHOOL_GROUPS.some(x => x[0] === s.type) ? s.type : "other") === type)
              .sort((a, b) => a.name.localeCompare(b.name));
            return g.length ? `<optgroup label="${esc(label)}">` + g.map(s =>
              `<option value="${s.id}">${esc(s.name)}${s.city ? ` (${esc(s.city)})` : ""}</option>`).join("") + `</optgroup>` : "";
          }).join("")
        : `<option value="">No schools in our data yet</option>`;
    if (starts.some(s => s.id === prevStart)) schoolSel.value = prevStart;
    else if (!rendered && starts.some(s => s.id === qs.get("school"))) schoolSel.value = qs.get("school");
    else schoolSel.value = "";
    rendered = true;
    schoolSel.disabled = held || !starts.length;
    // keep URL in sync
    const p = new URLSearchParams({ job: goal, state: startStateV, finish: finishStateV });
    if (startKey !== "none") p.set("start", startKey);
    if (schoolSel.value) p.set("school", schoolSel.value);
    history.replaceState(null, "", "?" + p);

    if (!held && !starts.length) { routeEl.innerHTML = buildingMsg(data); return; }
    if (!held && !schoolSel.value) {
      routeEl.innerHTML = compareHTML(data, starts, goal, goalLabel, startStateV, finishStateV, entry, startKey, lpnNote);
      return;
    }
    const schoolId = held ? null : schoolSel.value;
    const r = buildRoute(data, schoolId, goal, finishStateV, { held, entry, startState: startStateV });
    const startState = held ? startStateV : stateOf(data, schoolId);
    const crossing = finishStateV !== startState;
    const finishBit = crossing ? `, finishing in <b>${esc(fullState(finishStateV))}</b>` : ``;

    let html;
    if (held) {
      const heldLabel = { adn: "an RN with an associate degree", bsn: "an RN with a BSN", msn: "a nurse with a master's in nursing" }[held];
      if (!r.steps.length && !r.missing) {
        const why = goal === "rn"
          ? `You're already a Registered Nurse, so there's no more school for this goal. Pick a different <b>Goal job</b> to see the programs that come next.`
          : `You already have the RN license ${esc(goalLabel)} needs. It's a job you move into with experience (see the career map), so no more school is required.`;
        routeEl.innerHTML = `<div class="gap"><b>No more school needed for ${esc(goalLabel)}.</b><p>${why}</p></div>`;
        return;
      }
      html = `<p class="rintro">As <b>${esc(heldLabel)}</b> in <b>${esc(fullState(startState))}</b>${finishBit}, ` +
        `your route starts after the license you already hold. Here is a realistic route toward <b>${esc(goalLabel)}</b>.</p>`;
    } else {
      if (!r.steps.length) { routeEl.innerHTML = buildingMsg(data); return; }
      html = `<button type="button" class="tocmp" data-pick="">← Compare all starting schools</button>` +
        `<p class="rintro" tabindex="-1">Starting at <b>${esc(instName(data, schoolId))}</b> in <b>${esc(fullState(startState))}</b>${finishBit}` +
        `, here is a realistic route toward <b>${esc(goalLabel)}</b>. ` +
        `Where a step changes schools — or states — the connection and its source are shown.</p>`;
    }
    html += glanceHTML(data, r.steps);

    html += lpnNote(schoolId, startState);
    if (held === "msn" && r.steps.length) {
      html += `<div class="gap"><b>You may not need a second full degree.</b>
        <p>The program below is the one we list for this specialty, and it may be built for nurses with a bachelor's. Many schools offer a shorter post-master's certificate or an MSN-to-DNP path for nurses who already hold an MSN. We don't list those yet, so ask each school what your master's counts for.</p></div>`;
    }

    // When the goal is a role reached by experience (not its own degree), say so up front so the
    // generic nursing-degree card below isn't mistaken for a wrong answer.
    if (!r.goalIsProgram && r.steps.length) {
      html += `<div class="gap"><b>${esc(goalLabel)} is a role you grow into as a working nurse — there's no separate "${esc(goalLabel)}" degree.</b>
        <p>${held
          ? `You already have the RN license. The steps below are the schooling this role usually expects; from there it's the job you move into with experience (see the career map).`
          : `The steps below get you to the RN license; from there it's the job you move into with experience (see the career map). This is the schooling that gets you there.`}</p></div>`;
    }

    let n = 0;
    r.steps.forEach(step => {
      if (step.kind === "license") {
        html += `<div class="milestone"><span class="mdot">✓</span> <div><b>Pass the NCLEX-RN → become a licensed Registered Nurse (RN)</b><p class="muted">Taken after the program above. Needed before any of the steps that follow.</p></div></div>`;
        return;
      }
      n++;
      html += connectionHTML(step);
      html += `<section class="step" id="step-${n}"><div class="stepnum" aria-hidden="true">${n}</div><div class="stepbody">`;
      if (step.transfer && !(step.heldStart && !step.crossedInto)) html += `<p class="xfer">↪ Move to ${step.crossedInto ? esc(fullState(step.crossedInto)) : "a new school"}</p>`;
      html += programCard(data, step.primary);
      const alts = step.alternatives || [];
      if (alts.length) {
        html += `<details class="alts"><summary>${alts.length} other verified option${alts.length > 1 ? "s" : ""} for this step</summary>` +
          alts.map(o => programCard(data, o, { alt: true })).join("") + `</details>`;
      }
      html += `</div></section>`;
    });

    if (r.missing && (r.missing === "msn" || r.missing === "dnp")) {
      // A generic graduate degree isn't a standalone program here — it's earned through a specialty.
      html += `<div class="gap"><b>${esc(credLabel(r.missing))} here isn't a standalone program — it's earned through a specific advanced-practice track.</b>
        <p>Choose a role like <b>Family NP</b>, <b>Psych-Mental Health NP</b> or <b>Nurse anesthetist</b> above to see the real programs (each is at the ${esc(credLabel(r.missing))} or doctoral level).</p></div>`;
    } else if (r.missing) {
      html += `<div class="gap"><b>We don't have a verified ${esc(credLabel(r.missing))} program in our data yet.</b>
        <p>We currently cover ${esc(coveredStates(data))}. The route above is confirmed as far as we can source it; the remaining step is being added, and nothing here is guessed.</p></div>`;
    }

    html += `<p class="disclaim">Programs, costs, prerequisites and pass rates change. Always confirm current details with each school before you rely on them.${reportURL("x") ? ` Spotted something wrong? ${reportLinkHTML(`Route: ${goalLabel} from ${held ? "an RN license" : instName(data, schoolId)}`, "Tell us")}.` : ""}</p>`;
    routeEl.innerHTML = html;
  }

  // ---------- Route at a glance: the whole plan in one line before the detailed cards ----------
  function glanceHTML(data, steps) {
    const progs = steps.filter(s => s.kind === "program");
    if (!progs.length) return "";
    let n = 0;
    const items = steps.map(s => {
      if (s.kind === "license") return `<li class="glic"><span class="mdot" aria-hidden="true">✓</span> RN license</li>`;
      n++;
      const cred = s.primary.credential;
      return `<li><a href="#step-${n}"><span class="gnum">${n}</span><span><b>${esc(byId[cred] ? byId[cred].label : cred)}</b>
        <small>${esc(instName(data, s.primary.institution).replace(/\s*\(.*\)$/, ""))}</small></span></a></li>`;
    }).join("");
    const nSchools = new Set(progs.map(s => s.primary.institution)).size;
    const states = [...new Set(progs.map(s => s.primary._state))];
    const tail = states.length > 1 ? ` across ${states.length} states` : "";
    return `<nav class="glance" aria-label="Your route at a glance"><p class="gh">Your route at a glance:
      <b>${progs.length}</b> program${progs.length === 1 ? "" : "s"} at <b>${nSchools}</b> school${nSchools === 1 ? "" : "s"}${tail}</p>
      <ol>${items}</ol></nav>`;
  }

  // ---------- "Help me choose": compare every starting school in the state ----------
  // Most recent first-time pass rate across campuses: { year, lo, hi } or null if not published.
  // Years come as 2025, "Spring 2025", "Fall 2024", "2024-25", "Q2 2026" or "recent"; turn them into
  // a sortable number (later = bigger) while keeping the original label for display.
  function yearKey(y) {
    if (typeof y === "number") return y;
    const s = String(y || ""), m = s.match(/(\d{4})(?:-(\d{2}))?/);
    if (!m) return 0;
    let k = +m[1];
    if (m[2]) k += 0.9;                       // academic year 2024-25 ends in 2025
    else if (/fall/i.test(s)) k += 0.7;
    else if (/q(\d)/i.test(s)) k += (+s.match(/q(\d)/i)[1]) * 0.2;
    else if (/spring/i.test(s)) k += 0.3;
    return k;
  }
  function latestPass(p) {
    const pr = p && p.nclex_pass_rate;
    if (!pr || !pr.by_campus) return null;
    const latest = Object.values(pr.by_campus).filter(s => Array.isArray(s) && s.length).map(series =>
      series.reduce((a, b) => (yearKey(b.year) > yearKey(a.year) ? b : a), series[0])).filter(x => x && x.rate != null);
    if (!latest.length) return null;
    const top = Math.max(...latest.map(x => yearKey(x.year)));
    const same = latest.filter(x => yearKey(x.year) === top);
    const rates = same.map(x => x.rate);
    const tested = same.every(x => x.tested) ? same.reduce((a, x) => a + x.tested, 0) : null;
    return { year: same[0].year, lo: Math.min(...rates), hi: Math.max(...rates), campuses: latest.length, tested };
  }
  function passShort(lp) {
    if (!lp) return `<span class="muted">Not published</span>`;
    const r = lp.lo === lp.hi ? pct(lp.lo) : `${pct(lp.lo)}–${pct(lp.hi)}`;
    const yl = String(lp.year).replace(/^(\d+)-qtr$/, "last $1 quarters");
    return `<b>${r}</b> <span class="muted">(${esc(yl)}${lp.lo !== lp.hi ? ", by campus" : ""}${lp.tested ? `, ${lp.tested} tested` : ""})</span>`;
  }
  // Short cost for the comparison. The full basis is on the program card in the route.
  function costShort(c, t) {
    if (!c || c.amount == null) return t ? `${tuitionText(t)} <span class="muted">(school-wide, ${esc(t.year)})</span>` : `<span class="muted">Not published</span>`;
    const u = costUnit(c);
    const own = `<b>${usd(c.amount)}</b>${u === "credit" ? " per credit" : u === "year" ? " per year" : " for the program"}`;
    return t ? `${own}<br><span class="muted">School-wide (${esc(t.year)}):</span> ${tuitionText(t)}` : own;
  }
  const usd = n => "$" + Number(n).toLocaleString("en-US", Number.isInteger(Number(n)) ? {} : { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const firstClause = s => String(s || "").split(/;\s|\.\s/)[0];

  function compareHTML(data, starts, goal, goalLabel, startState, finishState, entry, startKey, lpnNoteFn) {
    let rows = starts.map(s => {
      const cred = entryCredential(data, s.id, entry);
      const prog = data.programs.find(p => p.institution === s.id && p.credential === cred);
      const r = buildRoute(data, s.id, goal, finishState, { entry });
      const progSteps = r.steps.filter(x => x.kind === "program");
      return {
        s, cred, prog, lp: latestPass(prog), reached: !r.missing, missing: r.missing,
        tu: (data.tuition && data.tuition[s.id]) || null,
        nProg: progSteps.length, nSchools: new Set(progSteps.map(x => x.primary.institution)).size
      };
    });
    const total = rows.length;
    const noneReach = rows.length && rows.every(x => !x.reached) ? rows[0].missing : null;
    if (cmpType === "cc") rows = rows.filter(x => x.s.type === "community_college");
    if (cmpType === "uni") rows = rows.filter(x => x.s.type !== "community_college");
    const passKey = x => (x.lp ? (x.lp.lo + x.lp.hi) / 2 : -1);
    const byName = (a, b) => a.s.name.localeCompare(b.s.name);
    const tuitKey = x => (x.tu ? x.tu.in_state : Infinity);
    rows.sort(cmpSort === "steps" ? (a, b) => (a.nProg - b.nProg) || (passKey(b) - passKey(a)) || byName(a, b)
      : cmpSort === "az" ? byName
      : cmpSort === "tuition" ? (a, b) => (tuitKey(a) - tuitKey(b)) || byName(a, b)
      : (a, b) => (passKey(b) - passKey(a)) || byName(a, b));

    const sel = (name, val, opts) => `<select data-cmp="${name}">` + opts.map(([v, l]) =>
      `<option value="${v}"${v === val ? " selected" : ""}>${esc(l)}</option>`).join("") + `</select>`;
    let html = `<p class="rintro">You haven't picked a school yet. There ${total === 1 ? "is" : "are"} <b>${total}</b>
      school${total === 1 ? "" : "s"} in <b>${esc(fullState(startState))}</b> where you can start toward
      <b>${esc(goalLabel)}</b>${startKey === "bach" ? " with an accelerated or direct-entry program for people who already have a bachelor's" : ""}.
      Compare them, then pick one to see its full route.</p>`;
    if (noneReach && noneReach !== "msn" && noneReach !== "dnp") {
      html += `<div class="gap"><b>We don't have a verified ${esc(credLabel(noneReach))} program in our data yet.</b>
        <p>We currently cover ${esc(coveredStates(data))}. Each route below is confirmed as far as we can source it; the last step is being added, and nothing here is guessed.</p></div>`;
    }
    html += lpnNoteFn ? lpnNoteFn(null, startState) : "";
    html += `<div class="cmpbar">
      <label><span>Sort by</span>${sel("sort", cmpSort, [["pass", "Highest NCLEX pass rate"], ["tuition", "Lowest yearly tuition"], ["steps", "Fewest programs to the goal"], ["az", "Name (A–Z)"]])}</label>
      <label><span>Show</span>${sel("type", cmpType, [["all", "All schools"], ["cc", "Community colleges"], ["uni", "Universities and 4-year colleges"]])}</label>
    </div>`;
    if (!rows.length) {
      html += `<div class="gap"><b>No schools of that type here in our data.</b><p>Choose <b>All schools</b> above.</p></div>`;
      return html;
    }
    html += `<div class="cgrid">` + rows.map(x => {
      const p = x.prog;
      const credName = byId[x.cred] ? byId[x.cred].label : x.cred;
      const routeLine = x.reached
        ? `<b>${x.nProg}</b> program${x.nProg === 1 ? "" : "s"} at <b>${x.nSchools}</b> school${x.nSchools === 1 ? "" : "s"}`
        : `<span class="muted">Not complete in our data yet</span>`;
      return `<article class="ccard">
        <h3>${esc(x.s.name)}</h3>
        <p class="pinst">${esc([x.s.city, TYPE_LABEL[x.s.type]].filter(Boolean).join(" · "))}</p>
        <dl class="cstats">
          <div><dt>Starts with</dt><dd>${esc(credName)}: ${esc(p ? p.name : "")}</dd></div>
          <div><dt>Length</dt><dd>${p && p.length ? esc(firstClause(p.length)) : `<span class="muted">Not published</span>`}</dd></div>
          <div><dt>NCLEX-RN pass rate</dt><dd>${passShort(x.lp)}</dd></div>
          <div><dt>Cost</dt><dd>${costShort(p && p.cost, x.tu)}</dd></div>
          <div><dt>Route to ${esc(goalLabel)}</dt><dd>${routeLine}</dd></div>
        </dl>
        <button type="button" class="cpick" data-pick="${esc(x.s.id)}">See this route <span aria-hidden="true">→</span></button>
      </article>`;
    }).join("") + `</div>`;
    html += `<p class="disclaim">Pass rates are for first-time NCLEX-RN takers, as reported by the state board of nursing or the school; the most recent year differs by school. Cost is the nursing program's own price where the school publishes one; otherwise it's the school-wide yearly tuition and fees for full-time undergraduates from the U.S. Department of Education's College Scorecard, which leaves out extra nursing fees, books and living costs. "Lowest yearly tuition" sorts by that school-wide figure. Full details, prerequisites and sources are on each route. Always confirm with the school.${reportURL("x") ? ` Spotted something wrong? ${reportLinkHTML(`School comparison: ${fullState(startState)}`, "Tell us")}.` : ""}</p>`;
    return html;
  }

  function buildingMsg(data) {
    return `<div class="gap"><b>No starting schools in our data for this state yet.</b>
      <p>We currently cover ${esc(coveredStates(data))}. Choose a different <b>Starting state</b> to see every verified route through real programs. Every school fact shows its source and the date it was last checked, and nothing is made up.</p></div>`;
  }
  function coveredStates(data) {
    const names = (data._states || []).map(fullState);
    return names.length <= 1 ? (names[0] || "no states") :
      names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
  }
  function fullState(st) { return US_STATE_NAMES[st] || st; }
  function credLabel(c) { return byId[c] ? byId[c].label : c; }

  jobSel.onchange = startAsSel.onchange = finishStateSel.onchange = schoolSel.onchange = render;
  // The finish state follows the starting state unless the person chose a different finish on purpose.
  let lastStart = startStateSel.value;
  startStateSel.onchange = () => {
    if (finishStateSel.value === lastStart) finishStateSel.value = startStateSel.value;
    lastStart = startStateSel.value;
    render();
  };
  // Comparison controls and "See this route" / "Compare all" buttons live inside the route area.
  routeEl.addEventListener("change", e => {
    const k = e.target.dataset && e.target.dataset.cmp;
    if (!k) return;
    if (k === "sort") cmpSort = e.target.value; else cmpType = e.target.value;
    render();
    const again = routeEl.querySelector(`[data-cmp="${k}"]`); if (again) again.focus();
  });
  routeEl.addEventListener("click", e => {
    const b = e.target.closest("[data-pick]");
    if (!b) return;
    schoolSel.value = b.dataset.pick;
    render();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    routeEl.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    const target = b.dataset.pick ? routeEl.querySelector(".rintro") : routeEl.querySelector("[data-pick]");
    if (target) target.focus({ preventScroll: true });
  });
  render();
})();
