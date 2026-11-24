// Write (or replace) the structured admissions block in a state file from admissions research JSON.
// Usage (from the project folder):
//   node tools/state-build/apply_admissions.js --state CO --research <dir with A.json B.json ...> --today 2026-11-24
// Each research file looks like { "admissions": { "<program id>": {...} }, "report": "..." } (ADMISSIONS_BRIEF.md).
// The block goes just above the `window.SCHOOLS = ...` line, between two marker comments, as XX.admissions = {...};
// so the rest of the hand-checked file is untouched. Re-running rewrites only the block: records already in it are
// kept unless the new research replaces them, so a big state can be done in waves (one research dir per wave).
// Field rules live in docs/ADMISSIONS_FIELDS.md; run node tests/check_data.js afterwards.
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const args = Object.fromEntries(process.argv.slice(2).join(" ").split(/\s*--/).filter(Boolean).map(s => { const i = s.indexOf(" "); return i < 0 ? [s, true] : [s.slice(0, i), s.slice(i + 1).trim()]; }));
const ST = String(args.state || "").toUpperCase();
if (!/^[A-Z]{2}$/.test(ST) || !args.research || !args.today) { console.error("Need --state XX --research <dir> --today YYYY-MM-DD"); process.exit(2); }
const ROOT = path.resolve(__dirname, "../..");
const file = path.join(ROOT, `data/schools/${ST.toLowerCase()}.js`);
let src = fs.readFileSync(file, "utf8");

const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(src, ctx);
const ids = new Set(ctx.window.SCHOOLS[ST].programs.map(p => p.id));
const before = Object.assign({}, ctx.window.SCHOOLS[ST].admissions || {});   // earlier waves / earlier runs

// A number field that holds a sentence ("Twice in 365 days") becomes "see_text"; the sentence is kept in that
// topic's wording so nothing the school said is lost. Reported so a person can turn it into a number later.
const TOK = ["not_published", "see_text", "none"];
function tidy(id, rec) {
  const ex = rec.rules && rec.rules.exam, rt = rec.rules && rec.rules.retakes;
  // Exam validity is stated in months by almost every school; older research used valid_years.
  if (ex && typeof ex === "object" && "valid_years" in ex) {
    const y = ex.valid_years; delete ex.valid_years;
    ex.valid_months = typeof y === "number" ? Math.round(y * 12) : y;
  }
  const fix = (obj, key, topic) => {
    const v = obj && obj[key];
    if (v == null || typeof v === "number" || TOK.includes(v)) return;
    const m = /^\s*(\d+(?:\.\d+)?)\s*%?\s*$/.exec(String(v));   // "68%" -> 68
    if (m) { obj[key] = +m[1]; return; }
    obj[key] = "see_text";
    rec.wording = rec.wording || {};
    const w = rec.wording[topic] || "";
    if (!w.toLowerCase().includes(String(v).toLowerCase())) rec.wording[topic] = (w ? w + " " : "") + String(v);
    console.log(`tidied ${id}: ${topic} ${key} "${v}" -> see_text`);
  };
  if (ex && typeof ex === "object") for (const k of ["min_overall", "max_attempts", "valid_months"]) fix(ex, k, "exam");
  if (rt && typeof rt === "object") for (const k of ["max_attempts", "window_years"]) fix(rt, k, "retakes");
}

const adm = {}, changes = [];
for (const f of fs.readdirSync(args.research).filter(f => f.endsWith(".json")).sort()) {
  const d = JSON.parse(fs.readFileSync(path.join(args.research, f), "utf8"));
  for (const [id, rec] of Object.entries(d.admissions || {})) {
    if (!ids.has(id)) { console.log(`skipped ${id} (${f}): not a program in ${ST}`); continue; }
    if (adm[id]) console.log(`note: ${id} appears in more than one file; using ${f}`);
    const { changes: ch, ...keep } = rec;
    tidy(id, keep);
    if (ch) changes.push(`${id}: ${ch}`);
    adm[id] = keep;
  }
}
const fresh = Object.keys(adm).length;
let kept = 0;
for (const [id, rec] of Object.entries(before)) if (!adm[id] && ids.has(id)) { adm[id] = rec; kept++; }
const missing = [...ids].filter(id => !adm[id]);

// Keep the state file's own program order so the block reads alongside the records above it.
const order = [...ids].filter(id => adm[id]);
const START = `  // ---- Structured admissions (begin; written by tools/state-build/apply_admissions.js — see docs/ADMISSIONS_FIELDS.md) ----`;
const END = `  // ---- Structured admissions (end) ----`;
const block = [START,
  `  // One record per program: standard prerequisite categories and the admission rules as values, "not_published" or`,
  `  // "see_text", with the school's own wording. Researched ${args.today} from each school's own site.`,
  `  ${ST}.admissions = {`,
  order.map(id => `    ${JSON.stringify(id)}: ${JSON.stringify(adm[id])}`).join(",\n"),
  `  };`, END].join("\n");

const re = new RegExp(`${START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
if (re.test(src)) src = src.replace(re, block);
else {
  const anchor = "  window.SCHOOLS = window.SCHOOLS || {};";
  if (!src.includes(anchor)) { console.error(`Couldn't find "${anchor.trim()}" in ${file}`); process.exit(1); }
  src = src.replace(anchor, block + "\n\n" + anchor);
}
fs.writeFileSync(file, src, "utf8");
console.log(`${ST}: ${fresh} records from this research, ${kept} kept from before; ${order.length} of ${ids.size} programs covered.`);
if (missing.length) console.log("missing:", missing.join(", "));
if (changes.length) console.log("\nDifferences the research found (review these):\n" + changes.map(c => "  - " + c).join("\n"));

// --review <path>: append this research's differences to a Markdown review list for the owner
// (docs/admissions-review/XX.md), one section per program, so they can see what changed on the cards.
if (args.review && changes.length) {
  const S = ctx.window.SCHOOLS[ST];
  const inst = Object.fromEntries(S.institutions.map(i => [i.id, i.name]));
  const prog = Object.fromEntries(S.programs.map(p => [p.id, p]));
  const out = path.resolve(ROOT, args.review);
  let md = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : `# ${ST} admissions re-research: differences from the earlier records\n\n` +
    `What each school publishes now, compared with the program records the site showed before. Cards now show the\n` +
    `re-researched details (${ST}.admissions in data/schools/${ST.toLowerCase()}.js). Closures or paused admissions are flagged here,\n` +
    `never removed automatically.\n\n`;
  md += `## Research of ${args.today}\n\n`;
  for (const c of changes) {
    const id = c.slice(0, c.indexOf(":")), p = prog[id];
    md += `### ${p ? `${inst[p.institution]}: ${p.name}` : id} (\`${id}\`)\n\n${c.slice(c.indexOf(":") + 1).trim()}\n\n`;
  }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, md, "utf8");
  console.log(`review list: ${changes.length} program(s) written to ${args.review}`);
}
