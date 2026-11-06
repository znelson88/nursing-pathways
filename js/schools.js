// Schools page — builds a step-by-step route through real, verified programs toward a chosen job.
// Reads ?job=&state=&start= from the career map's link. Depends on js/data.js (shared byId / to)
// and on the per-state data file (window.SCHOOLS[state]) loaded before this script.
(function () {
  "use strict";
  const qs = new URLSearchParams(location.search);
  const jobSel = document.getElementById("job");
  const stSel = document.getElementById("state");
  const schoolSel = document.getElementById("startSchool");
  const routeEl = document.getElementById("route");
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pct = r => (r == null ? "—" : Math.round(r * 100) + "%");

  // ---- Job dropdown (real jobs/roles only; degrees like ADN/BSN/MSN/DNP are steps, not goals) ----
  const NOT_A_JOB = new Set(["diploma", "adn", "bsn", "absn", "demsn", "rnbsn", "msn", "pmc", "dnp", "phd"]);
  const jobs = Object.values(byId).filter(n => n.g !== "hub" && !NOT_A_JOB.has(n.id)).sort((a, b) => a.label.localeCompare(b.label));
  jobSel.innerHTML = `<option value="rn">Registered Nurse (RN)</option>` + jobs.map(n => `<option value="${n.id}">${esc(n.label)}</option>`).join("");
  if (qs.get("job") && byId[qs.get("job")]) jobSel.value = qs.get("job");

  // ---- "Show schools from" filter: All states, plus one option per loaded state ----
  // This only narrows which START schools are listed. Routing always uses every state's data,
  // so an online step (RN-to-BSN, graduate) can cross a state line while an in-person ADN/BSN
  // start stays where the student actually is.
  const LOADED = ["CO", "AZ", "CA"].filter(s => window.SCHOOLS && window.SCHOOLS[s]);
  stSel.innerHTML = `<option value="ALL">All states</option>` +
    LOADED.map(s => `<option value="${s}">${esc(fullState(s))}</option>`).join("");
  // Arrive on the state the map linked from, but with every state now selectable.
  if (LOADED.includes(qs.get("state"))) stSel.value = qs.get("state");

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

  function startingSchools(data) {
    if (!data) return [];
    return data.institutions.filter(inst =>
      data.programs.some(p => p.institution === inst.id && ENTRY.includes(p.credential)));
  }
  function entryCredential(data, schoolId) {
    const creds = data.programs.filter(p => p.institution === schoolId).map(p => p.credential);
    for (const c of ENTRY) if (creds.includes(c)) return c;
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
  function buildRoute(data, schoolId, goal) {
    const startCred = entryCredential(data, schoolId);
    if (!startCred) return { steps: [], note: "nostart" };
    const startState = stateOf(data, schoolId);        // the state the student is physically in
    const sameState = p => (p._state === startState ? 1 : 0);
    const seq = sequence(startCred, goal);
    const progCreds = new Set(data.programs.map(p => p.credential));
    const steps = [];
    let currentSchool = schoolId, lastProgram = null, missing = null;

    let stepIndex = 0;
    seq.forEach(cred => {
      if (cred === "rn") { steps.push({ kind: "license" }); return; }
      if (!progCreds.has(cred)) {
        // No program in our data for this credential. If it's the GOAL and a real program-type
        // credential, flag it honestly; if it's an intermediate (e.g. "msn" absorbed by a
        // BS-to-DNP) or a work role, just skip it.
        if (cred === goal && PROGRAM_CREDS.has(cred)) missing = cred;
        return;
      }
      const all = data.programs.filter(p => p.credential === cred);
      // Can the student stay at their current school for this credential?
      const here = all.filter(p => p.institution === currentSchool);
      let primary, transfer, agr;
      if (here.length) {
        primary = here[0]; transfer = false;
        agr = lastProgram ? agreement(data, lastProgram.id, primary.id) : null;
      } else {
        // Move schools. Prefer a program reachable by a cited agreement from the last program;
        // otherwise any program that is open by credential (admits holders of the prior credential).
        const away = all.filter(p => p.institution !== currentSchool);
        const linked = lastProgram ? away.filter(p => agreement(data, lastProgram.id, p.id)) : [];
        const pool = (linked.length ? linked : away.filter(p => p.open_entry)).slice();
        if (!pool.length) { missing = cred; return; }
        // Prefer a program in the student's own state; only cross a state line when there's no
        // same-state option (and then only because the program is online / open to out-of-state).
        pool.sort((a, b) => (sameState(b) - sameState(a)) || (score(b) - score(a)));
        primary = pool[0]; transfer = true;
        agr = lastProgram ? agreement(data, lastProgram.id, primary.id) : null;
      }
      // Other verified options for this step (not for the very first/entry step, which is the
      // school the student already chose). Same credential, reachable by agreement or open entry.
      const alternatives = (stepIndex === 0 && !lastProgram) ? [] :
        all.filter(p => p.id !== primary.id &&
          (p.open_entry || (lastProgram && agreement(data, lastProgram.id, p.id))))
          .sort((a, b) => (sameState(b) - sameState(a)) || (score(b) - score(a))).slice(0, 3);
      // Does this step send the student out of their home state? (only possible for an online step)
      const crossState = transfer && startState && primary._state !== startState;
      steps.push({ kind: "program", primary, alternatives, transfer, agreement: agr, crossState, startState, first: stepIndex === 0 });
      currentSchool = primary.institution;
      lastProgram = primary;
      stepIndex++;
    });

    // Did we actually reach the goal? (goal may be a work role reached by experience, not a degree.)
    const reached = progCreds.has(goal) ? steps.some(s => s.kind === "program" && s.primary.credential === goal) : true;
    return { steps, missing, reachedGoal: reached, goalIsProgram: PROGRAM_CREDS.has(goal), startState };
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
    if (!list || !list.length) return na(null, "None listed here");
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
      ${p.prerequisites ? field("Prerequisites", prereqHTML(p.prerequisites)) : ""}
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
    if (step.agreement) return agreementHTML(step.agreement);
    if (step.transfer) {
      const crossNote = step.crossState
        ? ` We don't have a verified ${esc(fullState(step.startState))} program in our data for this step,
           so the closest confirmed option is in <b>${esc(fullState(step.primary._state))}</b>. It admits
           qualified out-of-state nurses who hold the credential shown below, but check its <b>Format</b>
           on the card — it may require attending in ${esc(fullState(step.primary._state))} — and confirm
           with the school before you rely on it.`
        : "";
      return `<div class="agr"><span class="agrtag">How you get in</span>
        <p>No special transfer agreement with your starting school is required. Programs like this admit
        nurses who hold the degree and license shown below from any accredited school — see the admission
        details on the card.${crossNote}</p></div>`;
    }
    return `<div class="agr"><span class="agrtag">Continue at the same school</span>
      <p>This next step is offered at the same school, so you stay put — see the admission details on the card.</p></div>`;
  }

  function render() {
    const scope = stSel.value || "ALL", goal = jobSel.value;
    const data = combinedData();                 // route is always built against every loaded state
    const goalLabel = jobLabel(goal);
    document.getElementById("title").textContent = `Schools and programs: ${goalLabel}`;
    document.getElementById("lede").textContent =
      `A common, verified route through real programs toward ${goalLabel}. Start at any school below; a route continues in another state only when no in-state program is in our data for a step. Every fact shows its source and the date it was last checked.`;

    // Start-school selector. List every start school, narrowed by the "Show schools from" filter.
    // Label each with its state so a cross-state choice is obvious. Preserve the current choice
    // across re-renders, otherwise rebuilding the <option> list resets it to the first school.
    const allStarts = startingSchools(data);
    const starts = scope === "ALL" ? allStarts : allStarts.filter(s => s._state === scope);
    const prevStart = schoolSel.value;
    schoolSel.innerHTML = starts.length
      ? starts.map(s => `<option value="${s.id}">${esc(s.name)}${scope === "ALL" ? ` — ${esc(fullState(s._state))}` : ""}</option>`).join("")
      : `<option value="">No schools loaded yet</option>`;
    if (starts.some(s => s.id === prevStart)) schoolSel.value = prevStart;
    schoolSel.disabled = !starts.length;
    // keep URL in sync (state = the current filter scope)
    const p = new URLSearchParams({ job: goal, state: scope }); if (qs.get("start")) p.set("start", qs.get("start"));
    history.replaceState(null, "", "?" + p);

    if (!starts.length) { routeEl.innerHTML = buildingMsg(data); return; }
    const schoolId = schoolSel.value || starts[0].id;
    const r = buildRoute(data, schoolId, goal);
    const startName = instName(data, schoolId);
    const startState = stateOf(data, schoolId);

    if (!r.steps.length) { routeEl.innerHTML = buildingMsg(data); return; }

    let html = `<p class="rintro">Starting at <b>${esc(startName)}</b> in <b>${esc(fullState(startState))}</b>, here is a realistic route toward <b>${esc(goalLabel)}</b>. ` +
      `Where a step changes schools — or continues in another state — the connection and its source are shown.</p>`;

    let n = 0;
    r.steps.forEach(step => {
      if (step.kind === "license") {
        html += `<div class="milestone"><span class="mdot">✓</span> <div><b>Pass the NCLEX-RN → become a licensed Registered Nurse (RN)</b><p class="muted">Taken after the program above. Needed before any of the steps that follow.</p></div></div>`;
        return;
      }
      n++;
      html += connectionHTML(step);
      html += `<section class="step"><div class="stepnum" aria-hidden="true">${n}</div><div class="stepbody">`;
      if (step.transfer) html += `<p class="xfer">↪ Move to a new school</p>`;
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
    } else if (!r.goalIsProgram) {
      html += `<div class="gap"><b>${esc(goalLabel)} is a role you move into as a nurse, not a separate degree program.</b>
        <p>Get the RN license (and, where needed, the experience shown on the career map). This page focuses on the school programs along the way.</p></div>`;
    }

    html += `<p class="disclaim">Programs, costs, prerequisites and pass rates change. Always confirm current details with each school before you rely on them.</p>`;
    routeEl.innerHTML = html;
  }

  function buildingMsg(data) {
    return `<div class="gap"><b>No start schools are listed for this filter yet.</b>
      <p>We currently cover ${esc(coveredStates(data))}. Switch "Show schools from" back to <b>All states</b> to see every verified route through real programs. Every school fact shows its source and the date it was last checked, and nothing is made up.</p></div>`;
  }
  function coveredStates(data) {
    const names = (data._states || []).map(fullState);
    return names.length <= 1 ? (names[0] || "no states") :
      names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
  }
  function fullState(st) { return { CO: "Colorado", AZ: "Arizona", CA: "California" }[st] || st; }
  function credLabel(c) { return byId[c] ? byId[c].label : c; }

  jobSel.onchange = stSel.onchange = schoolSel.onchange = render;
  render();
})();
