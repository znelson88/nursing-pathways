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
