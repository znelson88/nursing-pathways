// Split a state's programs into research groups for the admissions re-research (ADMISSIONS_BRIEF.md).
// Usage (from the project folder):
//   node tools/state-build/admissions_inputs.js --state AZ --out <scratch dir> [--per-group 12] [--wave 1 --waves 3]
// Writes <out>/in/A.json, B.json, ... (each: schools with their current program records, never splitting a school
// across groups) and prints the groups. --wave N --waves M takes the Nth of M roughly equal slices of the state's
// schools (in file order), for big states done over several runs; the slices are the same every run.
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const args = Object.fromEntries(process.argv.slice(2).join(" ").split(/\s*--/).filter(Boolean).map(s => { const i = s.indexOf(" "); return i < 0 ? [s, true] : [s.slice(0, i), s.slice(i + 1).trim()]; }));
const ST = String(args.state || "").toUpperCase();
if (!/^[A-Z]{2}$/.test(ST) || !args.out) { console.error("Need --state XX --out <dir>"); process.exit(2); }
const ROOT = path.resolve(__dirname, "../..");
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, `data/schools/${ST.toLowerCase()}.js`), "utf8"), ctx);
const S = ctx.window.SCHOOLS[ST];
const per = +(args["per-group"] || 12);
let schools = S.institutions.map(i => ({ inst: i, progs: S.programs.filter(p => p.institution === i.id) })).filter(s => s.progs.length);
if (args.wave) {
  const n = +args.waves, w = +args.wave, total = schools.reduce((a, s) => a + s.progs.length, 0);
  let acc = 0; schools = schools.filter(s => { const k = Math.min(n, Math.floor(acc / total * n) + 1); acc += s.progs.length; return k === w; });
}
const groups = [];
for (const s of schools) {
  const g = groups[groups.length - 1];
  if (!g || g.n + s.progs.length > per) groups.push({ n: s.progs.length, list: [s] }); else { g.n += s.progs.length; g.list.push(s); }
}
fs.mkdirSync(path.join(args.out, "in"), { recursive: true });
fs.mkdirSync(path.join(args.out, "out"), { recursive: true });
groups.forEach((g, i) => {
  const name = String.fromCharCode(65 + i);
  const data = g.list.map(s => ({ institution: { id: s.inst.id, name: s.inst.name, url: s.inst.url, campuses: s.inst.campuses },
    programs: s.progs.map(p => ({ id: p.id, credential: p.credential, name: p.name, bridge_from: p.bridge_from, source_url: p.source_url,
      prerequisites: p.prerequisites, admission: p.admission, notes: p.notes })) }));
  fs.writeFileSync(path.join(args.out, "in", name + ".json"), JSON.stringify(data, null, 1));
  console.log(`${name}: ${g.n} programs — ${g.list.map(s => s.inst.id).join(", ")}`);
});
console.log(`${ST}${args.wave ? ` wave ${args.wave}/${args.waves}` : ""}: ${groups.reduce((a, g) => a + g.n, 0)} programs in ${groups.length} groups.`);
