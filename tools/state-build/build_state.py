"""Assemble data/schools/<xx>.js from research JSON files plus the state board's NCLEX-RN figures.

Usage (from the project folder):
  python -I tools/state-build/build_state.py --state WA --research <dir with A.json B.json ...> \
         --nclex <nclex.json> [--config <config.json>] [--today 2026-11-12]

nclex.json (built from the state board's own data — see docs/ADD_A_STATE.md):
  { "board": "Washington State Board of Nursing", "source_url": "https://...", "basis": "First-time NCLEX-RN pass rate ...",
    "programs": { "<program id> | <institution id>|adn | <institution id>|bsn | <institution id>":
                   { "<campus label>": [ {"year": 2025, "rate": 0.93, "tested": 41}, ... ] } },
    "new_programs": ["<institution id>", ...] }      (new programs with no results yet)
config.json (all optional):
  { "exclude": ["inst-id"], "alias": {"guessed-program-id": "real-program-id"}, "type_fix": {"inst-id": "community_college"},
    "bridge": {"program-id": "lpn"}, "https_hosts": ["host.example.edu"], "notes_for_cost": {"program-id": "extra text"} }
"""
import argparse, json, pathlib, sys

ap = argparse.ArgumentParser()
ap.add_argument("--state", required=True); ap.add_argument("--research", required=True)
ap.add_argument("--nclex", required=True); ap.add_argument("--config"); ap.add_argument("--today", required=True)
a = ap.parse_args()
ST = a.state.upper(); ROOT = pathlib.Path(__file__).resolve().parents[2]
cfg = json.loads(pathlib.Path(a.config).read_text(encoding="utf-8")) if a.config else {}
nx = json.loads(pathlib.Path(a.nclex).read_text(encoding="utf-8"))
PRE = {"adn", "diploma", "bsn", "absn", "demsn"}
GRAD = {"fnp", "agpcnp", "agacnp", "pnp", "pmhnp", "whnp", "nnp", "enp", "cns", "cnm", "crna"}

inst, progs, agrs = [], [], []
files = sorted(pathlib.Path(a.research).glob("*.json"))
files = [f for f in files if f.name not in ("nclex.json", "config.json")]
for f in files:
    d = json.loads(f.read_text(encoding="utf-8"))
    inst += d.get("institutions", []); progs += d.get("programs", []); agrs += d.get("agreements", [])

EX = set(cfg.get("exclude", []))
inst = [i for i in inst if i["id"] not in EX]
iids = {i["id"] for i in inst}
progs = [p for p in progs if p["institution"] in iids]
for i in inst:
    if i["id"] in cfg.get("type_fix", {}): i["type"] = cfg["type_fix"][i["id"]]
for p in progs:
    if p["id"] in cfg.get("bridge", {}): p["bridge_from"] = cfg["bridge"][p["id"]]
    if p["credential"] == "rnbsn" or p["credential"] in GRAD: p["open_entry"] = True
    else: p.pop("open_entry", None)
    if p["id"] in cfg.get("notes_for_cost", {}) and p.get("cost"):
        p["cost"]["basis"] = (p["cost"].get("basis") or "") + " " + cfg["notes_for_cost"][p["id"]]
for ag in agrs:
    ag["to_program"] = cfg.get("alias", {}).get(ag.get("to_program"), ag.get("to_program"))
    ag["from_program"] = cfg.get("alias", {}).get(ag.get("from_program"), ag.get("from_program"))
for rec in inst + progs + agrs:
    for k in ("url", "source_url"):
        v = rec.get(k)
        if isinstance(v, str) and v.startswith("http://") and v[7:].split("/")[0] in cfg.get("https_hosts", []):
            rec[k] = "https://" + v[7:]

NEW = set(nx.get("new_programs", []))
def rates(p):
    if p["credential"] == "demsn" and p["id"] not in nx["programs"]:
        return {"basis": f"Not reported separately by the {nx['board']} for this entry-level master's; check with the school.", "by_campus": None, "source_url": None}
    if p["institution"] in NEW:
        return {"basis": f"New program: no graduates appear in the {nx['board']}'s NCLEX-RN results yet.", "by_campus": None, "source_url": None}
    grp = "bsn" if p["credential"] in ("bsn", "absn") else "adn"
    for key in (p["id"], f"{p['institution']}|{grp}", p["institution"]):
        if key in nx["programs"]:
            by = nx["programs"][key]
            n = sum(s[0].get("tested", 0) for s in by.values() if s)
            yr = max((s[0]["year"] for s in by.values() if s), default="")
            basis = nx["basis"] + (f"; {n} tested in {yr}" if n else "")
            if key != p["id"] and p["credential"] in ("bsn", "absn"):
                basis += ". The board reports one figure for all of the school's BSN tracks"
            return {"basis": basis, "by_campus": by, "source_url": nx["source_url"]}
    # No board figure: keep a school-published rate the research agent recorded (allowed when the board publishes none).
    own = p.get("nclex_pass_rate")
    if isinstance(own, dict) and own.get("by_campus") and own.get("source_url"):
        return own
    return {"basis": f"No {nx['board']} NCLEX-RN figure found for this program; check with the school.", "by_campus": None, "source_url": None}

for p in progs:
    if p["credential"] in PRE: p["nclex_pass_rate"] = rates(p)
    elif not p.get("nclex_pass_rate"): p["nclex_pass_rate"] = {"basis": "Not applicable — a program for licensed nurses.", "by_campus": None, "source_url": None}

pids = {p["id"] for p in progs}
kept = [x for x in agrs if x.get("from_program") in pids and x.get("to_program") in pids]
dropped = [x for x in agrs if x not in kept]

js = lambda o: "      " + json.dumps(o, ensure_ascii=False)
out = f'''// {ST} school, program and transfer data for the Schools page (built with tools/state-build/build_state.py).
// Plain (non-module) script attached to window.SCHOOLS, like the other state files. RULES: every record carries
// source_url and last_verified; unknown values are null, never a guess; credential values reuse the career map's
// role ids; open_entry marks programs that admit anyone holding the prior credential; bridge_from marks programs that
// require an existing LPN/paramedic license. Sources and exclusions: docs/DATA_SOURCES.md.
// Master roster and NCLEX-RN figures: {nx["board"]}. Program facts verified {a.today} from each school's own site.

(function () {{
  const {ST} = {{
    state: "{ST}",
    updated: "{a.today}",

    institutions: [
{",\n".join(js(i) for i in inst)}
    ],

    programs: [
{",\n".join(js(p) for p in progs)}
    ],

    agreements: [
{",\n".join(js(x) for x in kept)}
    ]
  }};

  window.SCHOOLS = window.SCHOOLS || {{}};
  window.SCHOOLS.{ST} = {ST};
}})();
'''
target = ROOT / f"data/schools/{ST.lower()}.js"
if target.exists() and "tuition = {" in target.read_text(encoding="utf-8"):
    sys.exit(f"{target} already has a tuition block; rebuild would drop it. Remove the block first or re-add tuition after.")
target.write_text(out, encoding="utf-8", newline="\n")
creds = {}
for p in progs: creds[p["credential"]] = creds.get(p["credential"], 0) + 1
print(f"{ST}: institutions {len(inst)}, programs {len(progs)}, agreements kept {len(kept)}, dropped {len(dropped)}")
for x in dropped: print("  dropped agreement:", x.get("id"), x.get("from_program"), "->", x.get("to_program"))
print("credentials:", creds)
print("bridges:", sum(1 for p in progs if p.get("bridge_from")))
print("pre-licensure without a board figure:", [p["id"] for p in progs if p["credential"] in PRE and not p["nclex_pass_rate"].get("by_campus")])
