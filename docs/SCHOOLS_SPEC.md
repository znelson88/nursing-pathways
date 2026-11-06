# Schools and programs page — spec

## Goal

Someone has picked a goal job on the career map (say, Family NP). This page answers:
**"Starting from *this* school, what's a realistic route through real programs to that job?"**

Example: a student starts at Trinidad State College in Colorado. The page shows the prerequisite
courses they'd take there, the nursing program they'd enter, the agreement that carries their credits
forward, and the university program(s) that come next, step by step, until the goal job.

It's a separate page because mixing real schools into the career map confused testers. The map stays
about jobs; this page is about institutions and how they connect.

## Scope

- **States:** Colorado first (build and verify end to end), then Arizona, then California.
- **Programs:** CNA, LPN/LVN, ADN, BSN (traditional and accelerated), RN-to-BSN, MSN, and the graduate
  programs behind the advanced roles (NP specialties, CRNA, CNM, DNP). Only board-approved or accredited
  programs.
- **Not in scope yet:** out-of-state online programs, private for-profit schools without board approval.

## Data model (suggested; refine before filling)

One JSON (or `.js`) file per state under `data/schools/`, for example `data/schools/co.js`.

```jsonc
{
  "state": "CO",
  "updated": "2026-11-05",
  "institutions": [{
    "id": "trinidad-state",
    "name": "Trinidad State College",
    "type": "community_college",      // community_college | public_university | private_nonprofit | ...
    "city": "Trinidad", "campuses": ["Trinidad", "Alamosa"],
    "url": "https://...",
    "source_url": "https://...", "last_verified": "YYYY-MM-DD"
  }],
  "programs": [{
    "id": "trinidad-state-adn",
    "institution": "trinidad-state",
    "credential": "adn",               // matches a role id on the career map (cna, lpn, adn, bsn, absn, rnbsn, msn, fnp, crna, ...)
    "name": "Associate Degree in Nursing",
    "length_terms": 4, "format": "in_person",
    "prerequisites": [{"course": "Anatomy & Physiology I", "code": "BIO 201", "min_grade": "C"}],
    "admission": {"entrance_exam": "...", "selection": "points | lottery | first-come", "notes": "..."},
    "cost": {"amount": 0, "basis": "in-state tuition and fees, full program", "year": "2026-27"},
    "nclex_pass_rate": {"rate": 0.0, "year": 2025, "source_url": "https://..."},
    "accreditation": "ACEN | CCNE | CNEA | board approval only",
    "source_url": "https://...", "last_verified": "YYYY-MM-DD", "academic_year": "2026-27",
    "notes": ""
  }],
  "agreements": [{
    "id": "co-statewide-adn-bsn",
    "name": "…",                        // exact name from the agreement document
    "from_programs": ["trinidad-state-adn"],  // or a rule like {"credential":"adn","state":"CO","public":true}
    "to_programs": ["…-rnbsn"],
    "what_transfers": "…", "conditions": "…",
    "source_url": "https://...", "last_verified": "YYYY-MM-DD"
  }]
}
```

Rules:
- `credential` values reuse the career map's role ids so the map and this page share one vocabulary.
- Every record has `source_url` and `last_verified`. No source → the record doesn't go in.
- Unknown values are `null`, never a guess. The page shows "Not published" or "Check with the school".

## How a route is built

1. Start: a chosen institution (or "I haven't picked a school").
2. Goal: a role id from the map. Use the map's existing route logic (`computeRoute` in `app.js`) to get
   the sequence of credentials, for example `adn → rn → msn → fnp`.
3. For each credential step, find programs at the current institution; if there are none, follow
   `agreements` from the current program to the next institution; otherwise list nearby options.
4. Show the result as numbered steps, each with prerequisites, length, cost, pass rate, the agreement
   that links it to the next step, and its source and "last checked" date.
5. Where several next schools are possible, show the 2 or 3 strongest options, not every school in the state.

## Page layout (keep it like the map page)

- Top: goal job, state, starting school (filled from the map link `?job=&state=&start=`).
- Main: the step-by-step route, with each step as a card. A small map of institutions connected by
  agreements can come later if it helps; it shouldn't be the first thing people see.
- Every card: what it is, prerequisites, time, cost, outcomes, how it connects to the next step,
  source and date.
- Same fonts, colors, dark mode, phone behavior and 12px minimum text as the map page.

## Where to research (starting points — verify each)

- **Colorado:** Colorado State Board of Nursing list of approved programs; Colorado Community College
  System nursing programs (shared curriculum across colleges); the statewide nursing articulation
  agreement for moving from ADN to BSN; Colorado Department of Higher Education transfer rules.
- **Arizona:** Arizona State Board of Nursing approved programs and NCLEX pass rates; AZTransfer;
  community college and university partnership programs such as Maricopa's concurrent enrollment
  with Arizona universities.
- **California:** Board of Registered Nursing (BRN) approved schools and NCLEX pass rates; ASSIST.org for
  community college → CSU/UC course transfer; ADN-to-BSN collaborative or concurrent programs.
- **All states:** each school's current catalog and nursing program page; IPEDS / College Navigator for
  tuition; accreditor directories (ACEN, CCNE).

## Order of work

1. Confirm the data model with the owner, using Trinidad State as the worked example.
2. Build the route view against a tiny verified Colorado dataset (Trinidad State and 2–3 next schools).
3. Owner reviews for accuracy and usefulness.
4. Fill the rest of Colorado, then Arizona, then California.
5. Run a simulated user study, as done for the map (see QA_HISTORY.md).
