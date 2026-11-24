# Admissions research brief for nursing programs in {STATE_NAME} (shared by all research agents)

You are adding structured admissions details for **nursingpaths.com**, a site that shows students realistic routes
through REAL nursing programs. These details will power a tool where a student enters their courses and grades and
sees which programs they may qualify for. A wrong value could tell a student they qualify when they don't, or the
reverse. Accuracy matters more than completeness. (The orchestrator replaces {STATE_NAME} and {TODAY}.)

You get a list of existing program records (from the site's data) with their current `source_url`, `prerequisites`
and `admission` sentences. Use them as a starting point only: **re-check everything on the school's own site.**

## Hard rules
1. **Only the institution's OWN website** (program pages, admissions/selection pages, catalogs, nursing student
   handbooks, application packets, points/rubric PDFs). Never aggregators or rankings, except to find the school's page.
2. **Never guess.** Every field is one of: a value you read on the school's site, `"not_published"` (you looked and
   the school doesn't say), or `"see_text"` (the school says it, but it's conditional or has several ways to qualify,
   e.g. "2.75, or 2.75 in the last 60 credits", "minimum GPA or GRE scores"). When in doubt, `"see_text"` and quote it.
3. Don't infer from a different program at the same school (an ABSN's GPA is not the BSN's GPA).
4. Don't use a browser and don't get around bot protection (403, captcha, "verify you are human"). WebFetch/WebSearch
   only. If a page is blocked, try another page on the same site (catalog, PDF packet) or record `"not_published"` and
   say so in `notes`.
5. Record every page you used in `source_urls` (https only, most specific page first).
6. `wording`: for each topic, copy the school's own words briefly (at most ~40 words per topic; trim, don't
   paraphrase numbers). Every number you put in `rules` or `prerequisites` must appear in the matching `wording`
   text. Use `null` for a topic only when its value is `"not_published"`.
7. **Use the newest admission cycle.** Schools often post criteria for more than one start term (e.g. "Spring 2027"
   and "Summer/Fall 2027" PDFs). Use the one for the next term students can still apply to, put its term in
   `academic_year` (e.g. "Summer/Fall 2027 admission"), and note in `wording` any older figure that differs.
8. If what you find **differs from the existing record** (a prerequisite added/dropped, a GPA changed, a program
   closed or paused), report it in `changes` — the orchestrator decides what to update.

## Output
Write ONE file at the path you were given, **valid JSON** (no comments, no trailing commas):
```json
{ "admissions": { "<program id>": { ... }, ... }, "report": "plain-text summary" }
```
Include **every** program id you were given.

### One program
```json
{
  "prerequisites": [
    { "course": "Human Anatomy & Physiology I", "code": "BIO 2101", "category": "ap1",
      "min_grade": "C", "within_years": 7, "by_when": "apply", "one_of": null }
  ],
  "rules": {
    "gpa_overall_min": 2.5,
    "gpa_prereq_min": "not_published",
    "gpa_science_min": "not_published",
    "exam": { "name": "TEAS", "min_overall": "not_published", "min_sections": "Reading and Math 70%, Science 60% (to earn points)",
              "max_attempts": "not_published", "valid_months": "not_published" },
    "selection": "points",
    "points": { "max": 73, "sheet_url": "https://...", "earns_points": ["Prerequisite grades", "TEAS score", "CNA certification"], "ties": "randomized" },
    "retakes": { "counts": "first", "max_attempts": 2, "window_years": "not_published" },
    "local_priority": "not_published",
    "seats": "not_published"
  },
  "wording": { "prerequisites": "...", "gpa": "...", "exam": "...", "selection": "...", "points": "...",
               "retakes": "...", "local_priority": null, "seats": null },
  "source_urls": ["https://..."],
  "last_verified": "{TODAY}",
  "academic_year": "2026-27",
  "deadline": "Fall 2027: apply Feb 22 - Mar 1, 2027",
  "changes": "differences from the existing record, or null",
  "notes": "anything a student should know that doesn't fit, or null"
}
```

### Field rules
- **prerequisites**: the college courses that must be done (or in progress) to apply or start. Not program courses
  taken after admission. Each row:
  - `category` (required), one of: `ap1` A&P I · `ap2` A&P II · `ap` one-semester combined A&P · `anatomy` ·
    `physiology` · `micro` · `bio` general biology · `chem` general/intro chemistry · `chem_ob` organic or biochemistry ·
    `math` college algebra or higher (not statistics) · `stats` · `eng1` English Composition I · `eng2` English
    Composition II · `psych` intro psychology · `lifespan` human growth & development / lifespan / developmental
    psychology · `soc` sociology · `nutrition` · `patho` · `pharm` · `speech` communication/public speaking ·
    `medterm` · `humanities` · `other`.
  - `min_grade`: letter grade (e.g. "C", "B-") | `"not_published"` | `"see_text"`.
  - `within_years`: whole number | `"none"` (school says there's no time limit) | `"not_published"` | `"see_text"`.
  - `by_when`: `"apply"` (must be finished to apply) | `"start"` (may be in progress; finished before the program starts)
    | `"not_published"` | `"see_text"`.
  - `one_of`: `null`, or a short shared label like `"g1"` when the student needs only one of several rows.
  - Graduate and RN-to-BSN programs: list course prerequisites if any (often statistics); a held degree or license is
    not a course — leave it to `notes`. An empty list `[]` means the school lists none.
- **GPA fields**: a number on a 4.0 scale | `"not_published"` | `"see_text"`. `gpa_prereq_min` = GPA on the listed
  prerequisites; `gpa_science_min` = GPA on science courses only. A *recommended* or *competitive* GPA is not a
  minimum: put it in `notes`/wording and keep the field `"not_published"` unless a minimum is also stated.
- **exam**: `{ name, min_overall, min_sections, max_attempts, valid_months }` (each part a value | `"none"` (e.g. "no
  minimum score") | `"not_published"` | `"see_text"`; numbers are plain numbers, e.g. 68 for "68%"; `min_sections` is
  text; `valid_months` = how long a score counts, in months; put "twice in 12 months" as `max_attempts: 2` and the full
  rule in wording) | `"none"` (the school says no exam, or its full requirements list has none) |
  `"not_published"` | `"see_text"`. Names: `TEAS`, `HESI A2`, `Kaplan`, `NLN PAX`, `ACT`, `GRE`, or as written.
- **selection**: `points` (published scoring formula) | `competitive` (ranked/holistic, no published formula) |
  `lottery` | `waitlist` | `first_come` | `all_qualified` (everyone who meets requirements is admitted) |
  `see_text` | `not_published`.
- **points**: only when selection is `points`: `{ max, sheet_url, earns_points, ties }` (`max` number or
  `"not_published"`; `sheet_url` the rubric page/PDF or `"not_published"`; `earns_points` = short phrases for what earns
  points, as the school words them; `ties` text or `"not_published"`). Otherwise `"not_applicable"`.
- **retakes**: how repeated prerequisite courses are counted: `{ counts, max_attempts, window_years }` with `counts` =
  `first` | `latest` | `highest` | `average` | `see_text`; numbers or `"not_published"` | `"not_published"` |
  `"see_text"`. Also note exam-retake limits under `exam.max_attempts`, not here.
- **local_priority**: short text as written (e.g. "Service-area residents receive 5 points") | `"none"` (school says
  no preference) | `"not_published"`.
- **seats**: `{ per_year, applicants, year, source_url }` only if the school publishes them | `"not_published"`.
- **deadline**: when to apply for the next start term(s) students can still apply to, in plain words with real dates
  as the school states them (e.g. "Spring 2027: apply Oct 15-31, 2026; Fall 2027: apply May 15-31, 2027"). Include
  "admissions paused" or "applications every other year; next deadline Jan 15, 2028" when the school says so. If the
  only dates shown have already passed, say that ("The page still lists a Jan 29, 2026 deadline; confirm the next
  one with the school"). `"not_published"` if the school gives no dates.
- Programs for licensed nurses (RN-to-BSN, graduate NP/CRNA/CNM/CNS): many fields will be `"not_published"` or
  `"none"`; still fill GPA, exam (GRE?), selection, prerequisites (statistics, etc.) and any experience rule in notes.

### report
A short plain-text summary: what you found, pages that were blocked, programs where the existing record looks wrong
or outdated, anything surprising (closures, new rules).
