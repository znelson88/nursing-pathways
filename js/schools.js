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
  const LOADED = ["CO", "AZ", "CA"].filter(s => window.SCHOOLS && window.SCHOOLS[s]);
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
    const out = { institutions: [], programs: [], agreements: [], _states: LOADED.slice() };
    LOADED.forEach(s => {
      const d = (window.SCHOOLS && window.SCHOOLS[s]) || {};
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
    return (data.agreements || []).find(a => a.from_program === fromId && a.to_program === toId) || null;
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
  function srcLine(url, date) {
    const link = url ? `<a href="${esc(url)}" target="_blank" rel="noopener">Source</a>` : `<span class="nosrc">No source link</span>`;
    return `<p class="src">${link}${date ? ` · Last checked ${esc(date)}` : ""}</p>`;
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
  function costHTML(cost) {
    if (!cost) return na(null);
    const amt = cost.amount != null ? `<b>$${Number(cost.amount).toLocaleString()}</b>${/credit/i.test(cost.basis || "") ? "/credit" : ""}` : "";
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
      const cells = series.map(s => `<span class="yr">${s.year}: <b>${pct(s.rate)}</b></span>`).join(" ");
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
      ${field("Cost", costHTML(p.cost))}
      ${field("NCLEX-RN pass rate", passRateHTML(p.nclex_pass_rate))}
      ${field("Accreditation", na(p.accreditation))}
      ${p.notes ? `<p class="pnote">${esc(p.notes)}</p>` : ""}
      ${srcLine(p.source_url, p.last_verified)}
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

    // Starting-school selector: only schools in the chosen STARTING state (the cascade). Preserve the
    // current choice across re-renders, otherwise rebuilding the <option> list resets it.
    // A bachelor's holder sees schools with an accelerated or direct-entry program; an RN doesn't
    // need a starting school at all (their route begins after the license).
    let entry = who.entry || null;
    let starts = held ? [] : startingSchools(data, entry).filter(s => s._state === startStateV);
    if (!held && entry && !starts.length) { entry = null; starts = startingSchools(data).filter(s => s._state === startStateV); }
    const prevStart = schoolSel.value;
    schoolSel.innerHTML = held
      ? `<option value="">Not needed: you're already an RN</option>`
      : starts.length
        ? starts.map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join("")
        : `<option value="">No schools in our data yet</option>`;
    if (starts.some(s => s.id === prevStart)) schoolSel.value = prevStart;
    else if (starts.some(s => s.id === qs.get("school"))) schoolSel.value = qs.get("school");
    schoolSel.disabled = held || !starts.length;
    // keep URL in sync
    const p = new URLSearchParams({ job: goal, state: startStateV, finish: finishStateV });
    if (startKey !== "none") p.set("start", startKey);
    if (schoolSel.value) p.set("school", schoolSel.value);
    history.replaceState(null, "", "?" + p);

    if (!held && !starts.length) { routeEl.innerHTML = buildingMsg(data); return; }
    const schoolId = held ? null : (schoolSel.value || starts[0].id);
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
      html = `<p class="rintro">Starting at <b>${esc(instName(data, schoolId))}</b> in <b>${esc(fullState(startState))}</b>${finishBit}` +
        `, here is a realistic route toward <b>${esc(goalLabel)}</b>. ` +
        `Where a step changes schools — or states — the connection and its source are shown.</p>`;
    }

    if (startKey === "lpn") {
      html += `<div class="gap"><b>We don't list LPN-to-RN bridge programs yet.</b>
        <p>The route below uses the standard entry. Many nursing programs give LPNs advanced placement or a shorter bridge, so ask each school what your LPN license counts for.</p></div>`;
    }
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
      html += `<section class="step"><div class="stepnum" aria-hidden="true">${n}</div><div class="stepbody">`;
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

    html += `<p class="disclaim">Programs, costs, prerequisites and pass rates change. Always confirm current details with each school before you rely on them.</p>`;
    routeEl.innerHTML = html;
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
  function fullState(st) { return { CO: "Colorado", AZ: "Arizona", CA: "California" }[st] || st; }
  function credLabel(c) { return byId[c] ? byId[c].label : c; }

  jobSel.onchange = startAsSel.onchange = startStateSel.onchange = finishStateSel.onchange = schoolSel.onchange = render;
  render();
})();
