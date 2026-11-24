// Checks the schools data against the project's rules (CLAUDE.md, docs/SCHOOLS_SPEC.md).
// Run from the project folder:   node tests/check_data.js
// Options:  --stale-days=270   also list records last checked more than N days ago (a warning, not a failure)
//           --markdown         print the stale list as Markdown (used by the monthly GitHub check)
// Exits with code 1 if any rule is broken, so the deploy workflow stops before the site goes live.
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
// Every state file in data/schools (two-letter name), so a new state is checked automatically.
const STATES = fs.readdirSync(path.join(ROOT, "data/schools")).filter(f => /^[a-z]{2}\.js$/.test(f)).map(f => f.slice(0, 2)).sort();
const args = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, "").split("=")).map(([k, v]) => [k, v ?? true]));

// Load the same plain scripts the browser loads, in a sandbox with just enough of `window`.
const ctx = { window: { matchMedia: () => ({ matches: false }) }, localStorage: { getItem: () => null, setItem() {} }, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "js/data.js"), "utf8") + ";this.__roles = Object.keys(byId);", ctx);
for (const s of STATES) vm.runInContext(fs.readFileSync(path.join(ROOT, `data/schools/${s}.js`), "utf8"), ctx);
const ROLES = new Set(ctx.__roles);
const SCHOOLS = ctx.window.SCHOOLS || {};

const errors = [], stale = [];
const today = new Date();
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const isUrl = u => typeof u === "string" && /^https:\/\/[^\s]+$/.test(u);
const isDate = d => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(new Date(d + "T00:00:00Z"));
const URLS = new Map();   // url -> records that cite it (for --urls, used by the monthly link check)
const cite = (url, where) => {
  if (!isUrl(url)) return;
  const list = URLS.get(url) || URLS.set(url, []).get(url);
  if (!list.includes(where)) list.push(where);
};
function sourced(where, rec) {
  cite(rec.source_url, where); cite(rec.url, where);
  const pr = rec.nclex_pass_rate; if (pr) cite(pr.source_url, where + " (pass rate)");
  if (!isUrl(rec.source_url)) err(where, `source_url missing or not https (${rec.source_url})`);
  if (!isDate(rec.last_verified)) return err(where, `last_verified missing or not YYYY-MM-DD (${rec.last_verified})`);
  const d = new Date(rec.last_verified + "T00:00:00Z");
  if (d > today) err(where, `last_verified ${rec.last_verified} is in the future`);
  const age = Math.floor((today - d) / 86400000);
  if (args["stale-days"] && age > +args["stale-days"]) stale.push({ where, last: rec.last_verified, age, url: rec.source_url });
}

// Structured admissions details (XX.admissions, docs/ADMISSIONS_FIELDS.md). Every value is a real value,
// "not_published" (the school doesn't say) or "see_text" (too conditional for one value). A state that has the
// block must cover every one of its programs, and every number must appear in the school's quoted wording.
const CATS = new Set("ap1 ap2 ap anatomy physiology micro bio chem chem_ob math stats eng1 eng2 psych lifespan soc nutrition patho pharm speech medterm humanities other".split(" "));
const SELECT = new Set(["points", "competitive", "lottery", "waitlist", "first_come", "all_qualified", "see_text", "not_published"]);
const TOK = new Set(["not_published", "see_text"]);
const tok = (v, extra = []) => TOK.has(v) || extra.includes(v);
const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
const said = (n, text) => typeof text === "string" && (new RegExp(`(^|[^\\d.])${String(n).replace(".", "\\.")}0*(?![\\d])`).test(text)
  || (Number.isInteger(n) && WORDS[n] && new RegExp(`\\b${WORDS[n]}\\b`, "i").test(text)));
function checkAdmissions(st, d) {
  const ids = new Set((d.programs || []).map(p => p.id));
  for (const id of ids) if (!d.admissions[id]) err(`${st} admissions`, `program ${id} has no admissions record`);
  for (const [id, a] of Object.entries(d.admissions)) {
    const w = `${st} admissions ${id}`, wd = a.wording || {};
    if (!ids.has(id)) err(w, "no program with this id");
    // A school whose site couldn't be read gets a placeholder: the tool shows "check with the school".
    if (a.status === "unreachable") {
      if (!a.notes) err(w, "an unreachable record must say why in notes");
      if (!isDate(a.last_verified)) err(w, "last_verified missing or not YYYY-MM-DD");
      continue;
    }
    if (!Array.isArray(a.source_urls) || !a.source_urls.length || !a.source_urls.every(isUrl)) err(w, "source_urls must be a non-empty list of https links");
    (a.source_urls || []).forEach(u => cite(u, w));
    sourced(w, { source_url: (a.source_urls || [])[0], last_verified: a.last_verified });
    if (!Array.isArray(a.prerequisites)) err(w, "prerequisites must be a list");
    for (const [i, r] of (a.prerequisites || []).entries()) {
      const rw = `${w} prerequisite ${i + 1} (${r.course})`;
      if (!r.course) err(rw, "needs a course name");
      if (!CATS.has(r.category)) err(rw, `category "${r.category}" is not on the list`);
      if (!(tok(r.min_grade) || /^([A-D][+-]?|P)$/.test(r.min_grade))) err(rw, `min_grade "${r.min_grade}" must be a letter grade, not_published or see_text`);
      if (!(tok(r.within_years, ["none"]) || (Number.isInteger(r.within_years) && r.within_years > 0 && r.within_years <= 25))) err(rw, `within_years "${r.within_years}" must be a whole number of years, none, not_published or see_text`);
      else if (Number.isInteger(r.within_years) && !said(r.within_years, wd.prerequisites) && !said(r.within_years, a.notes)) err(rw, `within_years ${r.within_years} doesn't appear in the school's wording`);
      if (!tok(r.by_when, ["apply", "start"])) err(rw, `by_when "${r.by_when}" must be apply, start, not_published or see_text`);
      if (!(r.one_of == null || typeof r.one_of === "string")) err(rw, "one_of must be null or a group label");
    }
    if ("deadline" in a && typeof a.deadline !== "string") err(w, "deadline must be text or not_published");
    const R = a.rules;
    if (!R || typeof R !== "object") { err(w, "needs a rules block"); continue; }
    for (const k of ["gpa_overall_min", "gpa_prereq_min", "gpa_science_min"]) {
      const v = R[k];
      if (typeof v === "number") { if (!(v > 0 && v <= 4)) err(w, `${k} ${v} is not on a 4.0 scale`); else if (!said(v, wd.gpa)) err(w, `${k} ${v} doesn't appear in the school's GPA wording`); }
      else if (!tok(v)) err(w, `${k} must be a number, not_published or see_text (${v})`);
    }
    const ex = R.exam;
    if (ex && typeof ex === "object") {
      if (!ex.name) err(w, "exam needs a name");
      for (const k of ["min_overall", "max_attempts", "valid_months"]) {
        const v = ex[k];
        if (typeof v === "number") { if (!said(v, wd.exam) && !(k === "valid_months" && v % 12 === 0 && said(v / 12, wd.exam))) err(w, `exam ${k} ${v} doesn't appear in the school's exam wording`); }
        else if (!tok(v, ["none"])) err(w, `exam ${k} must be a number, none, not_published or see_text (${v})`);
      }
      if ("valid_years" in ex) err(w, "exam uses valid_months, not valid_years");
      if (!(typeof ex.min_sections === "string")) err(w, "exam min_sections must be text, not_published or see_text");
    } else if (!tok(ex, ["none"])) err(w, `exam must be an exam record, none, not_published or see_text (${ex})`);
    if (!SELECT.has(R.selection)) err(w, `selection "${R.selection}" is not one of ${[...SELECT].join(", ")}`);
    const pt = R.points;
    if (R.selection === "points") {
      if (pt && typeof pt === "object") {
        if (typeof pt.max === "number") { if (!said(pt.max, wd.points) && !said(pt.max, wd.selection)) err(w, `points max ${pt.max} doesn't appear in the school's wording`); }
        else if (!tok(pt.max)) err(w, "points max must be a number or not_published");
        if (!(isUrl(pt.sheet_url) || tok(pt.sheet_url))) err(w, "points sheet_url must be an https link or not_published");
        cite(pt.sheet_url, w + " (points sheet)");
        if (!Array.isArray(pt.earns_points)) err(w, "points earns_points must be a list");
      } else if (!tok(pt)) err(w, "selection is points, so points must be a points record or not_published");
    } else if (!(pt === "not_applicable" || tok(pt))) err(w, "points must be not_applicable unless selection is points");
    const rt = R.retakes;
    if (rt && typeof rt === "object") {
      if (!["first", "latest", "highest", "average", "see_text"].includes(rt.counts)) err(w, `retakes counts "${rt.counts}" is not first, latest, highest, average or see_text`);
      for (const k of ["max_attempts", "window_years"]) if (!(typeof rt[k] === "number" || tok(rt[k]))) err(w, `retakes ${k} must be a number or not_published`);
    } else if (!tok(rt)) err(w, `retakes must be a retake record, not_published or see_text (${rt})`);
    if (typeof R.local_priority !== "string") err(w, "local_priority must be text, none or not_published");
    const se = R.seats;
    if (se && typeof se === "object") { if (!isUrl(se.source_url)) err(w, "seats needs an https source_url"); cite(se.source_url, w + " (seats)"); }
    else if (se !== "not_published") err(w, "seats must be a seats record or not_published");
  }
}

const instIds = new Map(), progIds = new Map();
for (const st of STATES.map(s => s.toUpperCase())) {
  const d = SCHOOLS[st];
  if (!d) { err(st, "state file did not attach to window.SCHOOLS"); continue; }
  for (const i of d.institutions || []) {
    const w = `${st} institution ${i.id}`;
    if (!i.id || !i.name) err(w, "needs id and name");
    if (instIds.has(i.id)) err(w, `duplicate id (also in ${instIds.get(i.id)})`); instIds.set(i.id, st);
    sourced(w, i);
  }
  for (const p of d.programs || []) {
    const w = `${st} program ${p.id}`;
    if (progIds.has(p.id)) err(w, `duplicate id (also in ${progIds.get(p.id)})`); progIds.set(p.id, st);
    if (!(d.institutions || []).some(i => i.id === p.institution)) err(w, `institution "${p.institution}" not found in ${st}`);
    if (!ROLES.has(p.credential)) err(w, `credential "${p.credential}" is not a career-map role id`);
    if (p.cost && p.cost.amount != null && !(typeof p.cost.amount === "number" && p.cost.amount >= 0)) err(w, "cost.amount must be a number or null");
    const pr = p.nclex_pass_rate;
    if (pr && pr.by_campus) for (const [campus, series] of Object.entries(pr.by_campus)) {
      if (!Array.isArray(series)) { err(w, `pass rate for ${campus} is not a list`); continue; }
      for (const e of series) if (e.rate != null && !(e.rate >= 0 && e.rate <= 1)) err(w, `pass rate ${e.rate} for ${campus} is not between 0 and 1`);
    }
    sourced(w, p);
  }
  if (d.admissions) checkAdmissions(st, d);
  for (const t of Object.entries(d.tuition || {})) {
    const [id, rec] = t, w = `${st} tuition ${id}`;
    if (!(d.institutions || []).some(i => i.id === id)) err(w, "no institution with this id");
    if (!Number.isInteger(rec.unitid)) err(w, "unitid must be the federal IPEDS id");
    if (!/^\d{4}-\d{2}$/.test(rec.year || "")) err(w, `year must look like 2025-26 (${rec.year})`);
    if (typeof rec.in_state !== "number") err(w, "in_state must be a number");
    if (!["in-state", "in-district"].includes(rec.in_label)) err(w, `in_label must be in-state or in-district (${rec.in_label})`);
    sourced(w, rec);
  }
}
// Agreements may connect programs across states, so check them once every id is known.
for (const st of STATES.map(s => s.toUpperCase())) for (const a of (SCHOOLS[st] && SCHOOLS[st].agreements) || []) {
  const w = `${st} agreement ${a.id}`;
  if (!progIds.has(a.from_program)) err(w, `from_program "${a.from_program}" not found`);
  if (!progIds.has(a.to_program)) err(w, `to_program "${a.to_program}" not found`);
  sourced(w, a);
}

if (args.urls) {
  // The site's own pages cite sources too (the career map's sources live on how-it-works.html).
  for (const [file, label] of [["index.html", "Career map"], ["how-it-works.html", "How the numbers work page"]]) {
    if (!fs.existsSync(path.join(ROOT, file))) continue;
    const html = fs.readFileSync(path.join(ROOT, file), "utf8");
    for (const m of html.matchAll(/<a\b[^>]*\bhref="(https:\/\/[^"]+)"/g)) cite(m[1].replace(/&amp;/g, "&"), label);
  }
  console.log(JSON.stringify([...URLS].map(([url, where]) => ({ url, where })), null, 1));
  process.exit(0);
}
if (args.markdown) {
  if (stale.length) {
    console.log(`### ${stale.length} record(s) last checked more than ${args["stale-days"]} days ago\n`);
    console.log("| Record | Last checked | Source |\n|---|---|---|");
    stale.sort((a, b) => b.age - a.age).forEach(s => console.log(`| ${s.where} | ${s.last} (${s.age} days) | ${s.url} |`));
  } else console.log(`No records are older than ${args["stale-days"]} days.`);
  if (errors.length) console.log(`\n### ${errors.length} rule problem(s)\n\n` + errors.map(e => `- ${e}`).join("\n"));
} else {
  console.log(`Checked ${instIds.size} institutions and ${progIds.size} programs in ${STATES.length} states.`);
  if (stale.length) console.log(`${stale.length} record(s) older than ${args["stale-days"]} days (re-verify soon).`);
  if (errors.length) console.log(`\n${errors.length} problem(s):\n` + errors.map(e => "  - " + e).join("\n"));
  else console.log("All data rules pass.");
}
process.exit(errors.length ? 1 : 0);
