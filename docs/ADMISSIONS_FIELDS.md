# Admissions fields

Status: owner approved the field list 2026-11-24; **Colorado is the pilot.** The automatic "Add next state" task is
paused (owner: "pause until I say"). After the pilot is reviewed, tools/state-build/BRIEF.md absorbs these fields so
new states arrive with them, and the other built states are re-researched one at a time.

**Where it lives:** a separate block at the bottom of each state file, `XX.admissions = { "<program id>": {...} }`,
like the `XX.tuition` block, so the existing hand-checked records are untouched. Written by
`tools/state-build/apply_admissions.js` from research done with `tools/state-build/ADMISSIONS_BRIEF.md` (the exact
field rules), and validated by `tests/check_data.js`. Each record also stores the school's own short `wording` for
each topic, its `source_urls`, `last_verified` and `academic_year`. Extra values beyond the three below: `"none"` (the
school says there is no exam / no time limit / no local preference) and `"not_applicable"` (points, when selection
isn't by points). The site doesn't display any of this yet.

## Why

The future "where can I get in?" tool compares a student's courses and grades against each program's
requirements. Today those requirements are sentences only a person can read. These fields add a fill-in-the-blank
version **next to** each sentence. The sentence stays and stays the official version shown on the page.

## The three answers every field can have

| Answer | Meaning | What the tool does |
|---|---|---|
| a value (e.g. `2.75`) | The school publishes a clear rule | Compares the student against it |
| `"not_published"` | We looked on the school's own site and it isn't there | Says "not published — ask the school" |
| `"see_text"` | Published, but too conditional to fit one value ("2.75, or 2.75 in your last 60 units") | Says "check with the school"; never says "no" |

The tool may only say a student **doesn't meet** a rule when that rule is a plain value.

## Prerequisites: each course row gains

| Field | Example | Notes |
|---|---|---|
| `category` | `"ap1"` | One standard label (list below), so courses from different schools can be compared |
| `min_grade` | `"C"` | Already exists. `"not_published"` if no minimum is stated |
| `within_years` | `7` | How recent the course must be. `"not_published"` if no limit is stated |
| `by_when` | `"apply"` / `"start"` | Must it be finished to apply, or only before the program starts? |
| `one_of` | `"g1"` | Rows with the same label are alternatives: the student needs one of them |

**Categories:** `ap1` Anatomy & Physiology I · `ap2` A&P II · `ap` one-semester combined A&P · `anatomy` ·
`physiology` · `micro` Microbiology · `bio` General biology · `chem` General/intro chemistry · `chem_ob` Organic or
biochemistry · `math` College algebra or higher · `stats` Statistics · `eng1` English Composition I · `eng2` English
Composition II · `psych` Intro psychology · `lifespan` Human growth & development / lifespan psychology · `soc`
Sociology · `nutrition` · `patho` Pathophysiology · `pharm` Pharmacology · `speech` Communication / speech ·
`medterm` Medical terminology · `humanities` · `other` (anything else; the course name explains it).

## Admission: a new `rules` block (alongside the existing sentences)

| Field | Example | Notes |
|---|---|---|
| `gpa_overall_min` | `2.5` | Cumulative college GPA |
| `gpa_prereq_min` | `3.0` | GPA on the listed prerequisites |
| `gpa_science_min` | `3.0` | GPA on science prerequisites only |
| `exam` | see below | `"not_published"` if none is required |
| `selection` | `"points"` | One of: `points`, `competitive` (ranked/holistic, no published formula), `lottery`, `waitlist`, `first_come`, `all_qualified`, `see_text` |
| `points` | see below | Only when `selection` is `points` |
| `retakes` | see below | How repeated courses are counted |
| `local_priority` | `"In-district residents first"` | Priority for district/county/state residents, as written; `"not_published"` if none |
| `seats` | `{ "per_year": 48, "applicants": 210, "year": "2025-26", "source_url": "…" }` | Only if the school (or its board) publishes it; otherwise `"not_published"` |
| `source_urls` | `["https://…handbook.pdf"]` | Admissions details often live on a different page from the program page |

**`exam`:** `{ "name": "TEAS", "min_overall": 65, "min_sections": "Reading and Math 70%, Science 60%",
"max_attempts": 2, "valid_months": 24 }` — any part can be `"none"`, `"not_published"` or `"see_text"`.

**`points`:** `{ "max": 73, "sheet_url": "https://…", "earns_points": ["CNA certification", "Healthcare work",
"In-district residency", "Second language", "Prior degree", "Extra completed courses", "Exam score",
"Prerequisite grades"], "ties": "randomized" }`. `earns_points` uses plain phrases as the school writes them.

**`retakes`:** `{ "counts": "first" | "latest" | "highest" | "average" | "see_text" | "not_published",
"max_attempts": 2, "window_years": 5, "text": "the school's wording" }`.

## Example: Pikes Peak State College ADN (from today's co.js)

Today: *TEAS (Reading & Math at or above 70%, Science at or above 60% to earn points)* · *points (max 73; ties broken
by randomization)* · *Posted GPA must be 2.5 or higher* · *BIO prerequisites must be within 7 years.*

With the new fields: `exam.name "TEAS"`, `exam.min_sections "Reading and Math 70%, Science 60% (to earn points)"`,
`selection "points"`, `points.max 73`, `points.ties "randomized"`, `gpa_overall_min 2.5`, and each BIO row gets
`within_years 7`. Retake rule, points sheet link and local priority would be looked up during the re-research.

## Checker rules (tests/check_data.js) once approved

- Every prerequisite row has a `category` from the list.
- GPAs are between 0 and 4.0; exam percentages between 0 and 100; years are whole numbers.
- A number in `rules` must also appear in that program's sentences (catches typos and invented figures).
- No field is left blank: each is a value, `"not_published"` or `"see_text"`.
