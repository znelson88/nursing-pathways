# Re-researching a built state's admissions details — standard procedure

The scheduled task follows this unattended, one state (or one wave of a big state) per run, using the
"Admissions refresh" table in docs/STATE_QUEUE.md. It is the procedure used for the Colorado pilot (PR #32,
2026-11-24). Read CLAUDE.md first (facts first, nothing guessed, plain language) and docs/ADMISSIONS_FIELDS.md.

**Merging (owner's decision, 2026-11-24, same rule as adding states):** the task merges its own pull request once every
check passes; the owner reviews after it's live. It never pushes directly to `main`, never merges with a failing or
pending check, never bypasses a site's bot protection, never enters credentials, and **never removes a program**:
closures and paused admissions are flagged for the owner. If a step can't be done honestly, it records why and stops.

## 0. Before starting
Same as docs/ADD_A_STATE.md step 0 (clean `main`, pull, gh at `"/c/Program Files/GitHub CLI/gh.exe"`), plus:
- An open pull request from this task (`Admissions refresh:` or `Add state:` in the title): merge it if every check
  passed and it's MERGEABLE (step 9), otherwise report it and stop.
- If the latest "Test and deploy" run on `main` failed only in its `package`/`deploy` jobs, re-run it once (step 9).
- If a row is `in progress (branch admissions/xx)`, check out that branch and continue. Otherwise take the first `todo`
  row and create branch `admissions/<xx>`.

## 1. Inputs
- Number of waves: 1 if the state has up to ~120 programs, otherwise `ceil(programs / 120)` (the row says which wave
  is next, e.g. `wave 2 of 3 next`).
- `node tools/state-build/admissions_inputs.js --state XX --out <scratch>/adm-xx [--wave N --waves M]` writes
  `in/A.json, B.json, ...` (about 12 programs each, never splitting a school) and empty `out/`.
- Copy tools/state-build/ADMISSIONS_BRIEF.md to `<scratch>/adm-xx/BRIEF.md`, replacing `{STATE_NAME}` and `{TODAY}`.

## 2. Research (parallel agents)
- Launch one general-purpose agent per group **in parallel**. Each is told: read the brief; its input file; write
  valid JSON to `out/<letter>.json` with every program id; WebFetch/WebSearch only; no browser; never bypass bot
  protection; edit no project files; reply with its plain-text report.
- Read every report.

## 3. Review what came back (you, not an agent)
Edit the research JSON (never the brief's rules) where needed:
- **Site couldn't be read** (blocked, empty redirects, refused connections), **values only from search-result
  excerpts**, or **an empty prerequisite list that means "couldn't verify"**: replace that program's record with a
  placeholder `{ "status": "unreachable", "last_verified": "<today>", "notes": "<school>'s website could not be read on
  <today> (<what happened>). Admissions details are not recorded yet: check with the school.", "changes": "<agent's
  notes>" }`. The card keeps the older text and says it couldn't be re-checked.
- **Older admission cycle used** when a newer one is posted: switch to the newer one (brief rule 7).
- **Closed, paused, or no longer admitting**: keep the record; make sure `deadline`/`notes` say so; list it for the
  owner in the PR and summary. Don't delete programs or change other files to hide them.

## 4. Apply and validate
1. `node tools/state-build/apply_admissions.js --state XX --research <scratch>/adm-xx/out --today <YYYY-MM-DD> --review docs/admissions-review/xx.md`
   (re-running keeps records from earlier waves; it turns sentences in number fields into `see_text` and logs them).
2. `node tests/check_data.js`. Until the last wave, the only allowed problems are "program … has no admissions record"
   for schools in later waves. Fix every other problem at the source (the research JSON) and re-apply. Never weaken a rule.

## 5. Spot-check (you, not an agent)
Pick 3 researched programs from different agents (a two-year ADN, a university BSN/ABSN, a graduate or RN-to-BSN
program). For each, ask a web-fetch agent to read the record's first source page and answer yes/no with a short quote
for: GPA minimum, prerequisite list and grades, recency limit, exam and minimums, selection method/points, retake rule,
deadline. Fix any mismatch in the research JSON, re-apply, and record what you checked and found.

## 6. Tests
- `node tests/check_data.js` (last wave: must say "All data rules pass") and `python tests/smoke.py` (all PASS).
- Intermediate waves: commit, push the branch, set the row to `in progress (branch admissions/xx), wave N+1 of M next`,
  and stop without a pull request (step 10).

## 7. Docs (last wave)
- docs/DATA_SOURCES.md: a short "Structured admissions: <State>" section like Colorado's — programs filled vs.
  placeholders and why, spot check, notable differences, anything flagged for the owner.
- CLAUDE.md: add the state to the "Structured admissions" bullet's list.
- docs/STATE_QUEUE.md: set the row to `PR open` with counts.

## 8. Pull request
Commit on `admissions/<xx>` (message ends with the Co-Authored-By line from the session's instructions), push, open
`Admissions refresh: <Name> (<n> programs)`. Body: counts (filled / placeholders), coverage of the main fields for entry
programs, programs flagged for the owner (closed, paused, conflicts), spot-check results, test results. End with the PR
attribution line from the session's instructions. Wait for its checks (`gh pr checks <n> --watch`).

## 9. Merge and publish
Same rules as docs/ADD_A_STATE.md step 11: merge only when every check passed, it's MERGEABLE, both local tests passed
and the spot check passed (`gh pr merge <n> -R znelson88/nursing-pathways --merge`). Watch the `main` run; confirm
`https://nursingpaths.com/data/schools/<xx>.js?<random>` contains `<XX>.admissions = {`. If only `package`/`deploy`
failed, wait ~5 minutes and re-run the **whole** run once with `gh run rerun <id>` (never `--failed`: that uploads a
second site package and fails with "Multiple artifacts named github-pages"). If that fails too, report and stop.
Set the row to `done` in the next PR.

## 10. Can't finish
Commit what's done to the branch, push it, set the row to `in progress (branch admissions/xx)` with what's left, stop.

## When every row is done
The scheduled task goes back to docs/ADD_A_STATE.md (new states), which now includes the admissions research.
