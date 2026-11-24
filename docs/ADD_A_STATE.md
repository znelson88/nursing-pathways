# Adding a state to the schools page — standard procedure

This is the procedure used for Colorado, Arizona, California and Missouri. The scheduled "Add next state" task
follows it unattended, so every step says exactly what to do and when to stop. Read CLAUDE.md first (standing
decisions: facts first, nothing guessed, plain language).

**Merging (owner's decision, 2026-11-16):** the task merges its own pull request once every check passes (step 11);
the owner reviews each state after it is live. It never pushes directly to `main`, never merges with a failing or
pending check, and never bypasses a site's bot protection (captchas,
"verify you are human", 403 walls), and never enters credentials.** If a step can't be done honestly, it records
why and stops.

## 0. Before starting
1. Work in the project folder `C:\Users\zach\OneDrive\Desktop\Claude Worker\nursing-pathways-site\nursing-pathways-site`.
   `gh` is at `"/c/Program Files/GitHub CLI/gh.exe"` (not on PATH). Repo: `znelson88/nursing-pathways`.
2. `git status` must be clean and the branch `main`. If not, stop and report (don't stash or discard anyone's work).
3. `git pull --ff-only origin main`.
4. If a state pull request is already open (`gh pr list -R znelson88/nursing-pathways --state open --search "Add state in:title"`):
   if all its checks passed and GitHub says MERGEABLE, merge it as in step 11 and carry on. If it only conflicts in
   docs/queue/notes files, merge `origin/main` into its branch in a separate worktree (keep both sides), re-run both
   tests, push, wait for checks, then merge. If a check failed or code/data files conflict, **don't merge or start a
   new state**: report it, do step 12 if any merged state is `tuition pending`, then stop.
5. If a row is `in progress (branch state/xx)`, check out that branch and continue it. Otherwise pick the first row
   marked `todo` in docs/STATE_QUEUE.md (west to east) and create branch `state/<xx>` (lowercase code).

## 1. Master roster (the state board of nursing)
- Find the state Board of Nursing's **official list of approved RN programs** (associate/ADN, diploma, baccalaureate,
  entry-level master's). Note its URL and "revised" date. Use WebSearch/WebFetch; board PDFs can be downloaded into a
  scratch folder with PowerShell `Invoke-WebRequest` (it completes incomplete certificate chains properly — never turn
  certificate checks off). Extract PDF text with `python -I` + pypdf.
- If the board's list can't be read honestly (blocked), look for another official board document (annual report,
  NCLEX table that names every program). If there is no official roster at all, set the queue row to
  `blocked: no readable board roster` and stop.

## 2. NCLEX-RN pass rates (the board's own figures)
- Prefer the board's per-program first-time NCLEX-RN results for the last **three calendar (or academic) years**.
- **Cross-check:** if the board also gives a statewide total, the per-program numbers you parse must add up to it
  (Missouri: 3,661 tested / 3,246 passed in 2025 matched exactly). If they don't, find out why before using them.
- Write `nclex.json` (format at the top of tools/state-build/build_state.py): keys are a program id, an
  `<institution>|adn` / `<institution>|bsn` group, or an institution id; values are `{campus label: [{year, rate, tested}]}`.
  List brand-new programs (initial approval, no graduates yet) in `new_programs`.
- If the board publishes **no** per-program figures (Arizona's sit behind bot protection), tell the research agents to
  record each school's own published rate (BRIEF rule 6 exception) and leave `programs` empty.

## 3. Scope and exclusions (same rules for every state)
- Include every **public and private nonprofit** RN program on the roster, plus those schools' RN-to-BSN and graduate
  APRN programs (NP specialties, CRNA, CNM, CNS), plus graduate-only nonprofits with APRN/CRNA programs.
- Exclude: **private for-profit** schools (check the school's catalog/consumer disclosures or its College Navigator
  listing — e.g. Chamberlain, Concorde, Arizona College of Nursing, West Coast, Galen, Research College [HCA]);
  schools/programs **closing, not admitting, or paused**; branch sites of **out-of-state** universities (unless the
  state's roster counts them and they're nonprofit — then label them).
- Big states (TX, FL, PA, NY, IL, OH, MI, NC): do **wave 1** = every pre-licensure program + RN-to-BSN; set the queue row
  to `wave 1 merged` after merge and do graduate programs as wave 2 in a later run.

## 4. Research (parallel agents)
- Group the roster's institutions into 4–6 groups of at most ~10 (e.g. community colleges by region, public
  universities, private universities by region). Give every institution a short unique id (lowercase-hyphen, no
  state prefix needed) and **check it isn't already used** in data/schools/*.js.
- Copy tools/state-build/BRIEF.md into a scratch folder, replacing `{STATE_NAME}` and `{TODAY}`. Launch one
  general-purpose agent per group **in parallel**, each told: read the brief, its institutions with ids and roster
  hints (campuses, roster names, codes), the list of all ids in the state (for agreements), and its JSON output path.
- When they finish, read every report. Decide: exclusions (for-profit / closing / paused), id aliases for agreement
  partners, type fixes, any bridge flags the agents missed. Put them in `config.json`.

## 5. Build and validate
1. `python -I tools/state-build/build_state.py --state <XX> --research <dir> --nclex <nclex.json> --config <config.json> --today <YYYY-MM-DD>`
2. `node tests/check_data.js` must say "All data rules pass" (it checks every state file automatically). Fix problems
   at the source (e.g. `https_hosts` for http links that work over https — test one first).

## 5b. Admissions details (since 2026-11-24)
Every new state also gets its structured admissions block (docs/ADMISSIONS_FIELDS.md), the same way as the admissions
refresh (docs/REFRESH_ADMISSIONS.md steps 1-5):
1. `node tools/state-build/admissions_inputs.js --state <XX> --out <scratch>/adm` and copy
   tools/state-build/ADMISSIONS_BRIEF.md there with `{STATE_NAME}`/`{TODAY}` filled in.
2. Launch one general-purpose agent per group in parallel (WebFetch/WebSearch only, no project edits).
3. Review the results as in REFRESH_ADMISSIONS step 3 (unreachable placeholders; newest admission cycle; flag closures).
4. `node tools/state-build/apply_admissions.js --state <XX> --research <scratch>/adm/out --today <date>` (no `--review`:
   a new state has no earlier records to compare), then `node tests/check_data.js` must pass with every program covered.
Big states done in waves: research admissions for the programs added in that wave.

## 6. Wire the state into the site (three small edits)
- js/data.js: append the code to `SCHOOL_STATES`.
- schools.html: add `<script src="data/schools/<xx>.js"></script>` after the last state's script tag.
- js/data.js `NLC`: confirm the state's Nurse Licensure Compact status on ncsbn.org and add/remove its code.

## 7. Tuition (College Scorecard)
- Dry run: `python -I tools/state-build/add_tuition.py --state <XX> --today <date> --cache <scratch dir>` and review every
  `CHECK` line (fix with `--map id=UNITID`, or `--skip` for out-of-state branches / unmatched).
- District rates: Scorecard's resident figure is the in-district rate. Find out whether the state's community
  colleges charge a local in-district rate (most district-run systems do; statewide systems like Colorado's and
  California's don't). If they do, pass their ids in `--district`. When unsure, check one college's College
  Navigator page with a single WebFetch (in-district row vs in-state row) — if it shows a high-traffic notice, don't
  retry; leave those labeled in-state and note it.
- Key: the script uses the owner's personal api.data.gov key automatically (saved outside the repo in
  `~/.scorecard_api_key`; it prints "personal key"). Never copy the key into the repo, a PR or a log.
- Then re-run with `--write`. If Scorecard says it's over its rate limit, skip this step, mark the queue row
  `tuition pending`, and say so in the PR.

## 8. Spot-check (you, not an agent)
- Pick 3 records from different agents (one community college ADN, one university BSN, one graduate program) and
  compare length/admission/cost/accreditation with the cited page using WebFetch, plus their admissions records
  (GPA minimum, prerequisites and grades, recency, exam, selection/points, retake rule, deadline). Fix anything wrong at the source;
  if a figure is real but on a different page, cite that page in the note. Record what you checked.

## 9. Tests
- Add 3 checks for the state to tests/smoke.py (copy the Missouri block): the comparison lists its start schools;
  one route renders with a board pass-rate link (or school-published rate); nothing shows NaN/undefined.
- `python tests/smoke.py` and `node tests/check_data.js` must both pass.

## 10. Docs
- docs/DATA_SOURCES.md: a section like Missouri's — roster (URL, revised date), NCLEX method and cross-check,
  exclusions with reasons, known gaps (blocked sites, nulls), spot-check, tuition status.
- CLAUDE.md "Current state": one bullet for the state (counts, anything new).
- docs/STATE_QUEUE.md: set the row to `PR open` with counts.

## 11. Pull request
- Commit on `state/<xx>` (message ends with the Co-Authored-By line from the session's instructions), push the
  branch, and open a PR titled `Add state: <Name> (<n> schools, <m> programs)`. The body lists: counts, roster and
  NCLEX sources, exclusions and why, gaps, spot-check results, tuition status, test results. End it with the PR
  attribution line from the session's instructions. Wait for the "Test and deploy" checks on the PR and report them.
- Merge only when every PR check passed (none failing or pending), GitHub says MERGEABLE, both local tests passed and
  the step 8 spot check passed: `gh pr merge <n> -R znelson88/nursing-pathways --merge` (never `--admin`). Then watch
  the "Test and deploy" run on `main` (`gh run watch <id> --exit-status`) and confirm
  `https://nursingpaths.com/data/schools/<xx>.js` is live. If only the deploy job failed (tests passed; a GitHub Pages
  error such as "Deployment failed, try again later"), wait ~5 minutes and re-run it once with
  `gh run rerun <id>`; never retry a failed test job. If the retry fails too the live site is unchanged: report and
  stop (the next run checks main's last run and retries before starting). The summary calls out anything the owner should look at, since he reviews after it's live.

## 12. Tuition catch-up (when no new state can start)
- For any merged state marked `tuition pending`: branch `tuition/<xx>` from `main`, run step 7, run the tests, open
  a PR `Add tuition: <Name>`, and merge it under the same rules as step 11. Set the queue note in the next PR.

## If something goes wrong
- Can't finish in this run (agents failed, roster unreadable): commit what's done to the branch, push it, set the
  queue row to `in progress (branch state/xx)` with what's left, and stop. The next run continues that branch
  instead of starting a new state.
- Never lower a rule to make a test pass. Never invent a value to fill a gap.
