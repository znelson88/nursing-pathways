# Research brief for one group of schools in {STATE_NAME} (shared by all research agents)

You are filling verified data for **nursingpaths.com**, a site showing students a realistic route through REAL
nursing programs toward a nursing job. Accuracy is the whole point: a wrong fact misleads a student.
(The orchestrator replaces {STATE_NAME}, {TODAY} and the output path before handing this brief out.)

## Hard rules
1. **Every fact must come from the institution's OWN website** (program pages, catalog, admissions pages, tuition
   pages, nursing handbook PDFs). Do NOT use aggregators/rankings (nursingexplorer, registerednursing.org,
   nurse.org, niche, usnews, etc.) except to *find* the school's own page.
2. **Never guess.** If you can't confirm a value on the school's own site, use `null` and say why in `notes`.
   "Not published" is a perfectly good answer. Don't infer a GPA, deadline or cost from a different program.
3. Record the URL you got each program's facts from in `source_url` (the most specific page; **https only**). Use
   `last_verified: "{TODAY}"`. Use `academic_year` for the year the page states (else the current one).
4. If sources on the school's site disagree, record both in `notes` and add "check with the school".
5. Don't use a browser and don't try to get around a site that blocks automated reading (403/captcha/"verify you
   are human"). Use WebFetch/WebSearch only. If a page is blocked, try another page on the same site (catalog PDF,
   admissions page) or record nulls with a note.
6. Do NOT fill `nclex_pass_rate` for pre-licensure programs (ADN/BSN/ABSN/diploma/direct-entry) — set it to
   `null`; the state board's own figures are added afterwards. **Exception:** if your instructions say the board
   publishes no per-program figures, record the school's own published first-time NCLEX-RN rate instead:
   `{ "basis": "First-time NCLEX-RN pass rate as published by the school", "by_campus": { "<campus>": [ {"year": 2025, "rate": 0.93} ] }, "source_url": "https://..." }`.
   For RN-to-BSN and graduate programs use: `{ "basis": "Not applicable — ...", "by_campus": null, "source_url": null }`.
7. Scope per institution: every **pre-licensure RN** program (ADN/AAS, LPN-to-RN bridge, BSN, accelerated/second-
   degree BSN, direct-entry/entry-level MSN, RN diploma), the **RN-to-BSN**, and **graduate advanced-practice
   programs that admit nurses** (NP specialties, CRNA/nurse anesthesia, nurse-midwifery, clinical nurse specialist).
   Skip LPN/PN-only programs, CNA courses, post-graduate certificates that require an existing APRN, MSN
   education/leadership/informatics tracks, and PhD programs.
8. **Ownership:** if an institution turns out to be **private for-profit** (check the school's own disclosures,
   catalog, or its College Navigator/IPEDS listing), stop researching it and report it with the source.
   Also report schools/programs that are **closing, not admitting, or paused** — don't add records for those.
9. **Bridges:** if a program admits ONLY people who already hold a license (LPN, paramedic, Army 68C…), add
   `"bridge_from": "lpn"`, `"lpn_or_paramedic"` or `"paramedic"`. A program that admits brand-new students has no
   `bridge_from`.

## Output
Write ONE file at the path you were given, containing **valid JSON** (no comments, no trailing commas):
```json
{ "institutions": [ ... ], "programs": [ ... ], "agreements": [ ... ], "report": "plain-text summary" }
```

### Institution record
```json
{ "id": "<the id assigned to you>", "name": "Official name", "type": "community_college | public_university | private_nonprofit",
  "city": "Main city", "campuses": ["Campus or site names where the nursing programs run"],
  "url": "https://nursing home page", "source_url": "https://page that confirms the above", "last_verified": "{TODAY}" }
```

### Program record (credential = one of these exact ids)
`adn` (associate degree / AAS / LPN-to-RN bridge ending in RN eligibility), `diploma` (RN diploma), `bsn`
(traditional pre-licensure BSN), `absn` (accelerated / second-degree BSN), `demsn` (direct-entry/entry-level master's
for non-nurses), `rnbsn` (RN-to-BSN completion), `fnp`, `agpcnp` (adult-gero primary care NP), `agacnp` (adult-gero
acute care NP), `pnp` (pediatric NP, primary or acute), `pmhnp`, `whnp`, `nnp` (neonatal NP), `enp` (emergency NP),
`cns` (clinical nurse specialist), `cnm` (nurse-midwifery), `crna` (nurse anesthesia).
```json
{
  "id": "<institution id>-<credential>"  (add -2, -lpn-bridge, -dnp etc. only if one school has two of the same credential),
  "institution": "<institution id>",
  "credential": "adn",
  "bridge_from": "lpn"   (ONLY for license-required bridges; omit otherwise),
  "name": "Program name as the school writes it",
  "length": "e.g. '4 semesters after prerequisites' (null if not published)",
  "format": "in person / hybrid / online + where (null if unknown)",
  "prerequisites": [ { "course": "Anatomy & Physiology I", "code": "BIO 205", "min_grade": "C" } ],   (empty list if none / not published)
  "admission": { "entrance_exam": "TEAS / HESI A2 / ... or null", "selection": "points / competitive ranked / first-come / lottery or null",
                 "gpa": "as stated or null", "deadline": "as stated or null", "notes": "other requirements (licenses, experience, residency...)" },
  "cost": { "amount": 12345 or null, "basis": "exactly what the number is (per credit? per year? whole program? resident?) with year", "year": "2026-27" or null },
  "nclex_pass_rate": null   (pre-licensure)  |  { "basis": "Not applicable — ...", "by_campus": null, "source_url": null },
  "accreditation": "ACEN / CCNE / CNEA (+ conditions/candidacy) as the school states it; COA for CRNA; ACME for midwifery; null if not stated",
  "source_url": "https://...", "last_verified": "{TODAY}", "academic_year": "2026-27",
  "notes": "anything important: residency limits, new/initial-approval status, campus differences, conflicts"
}
```
`cost.amount`: a plain number. If only a per-credit rate is published, put that rate and say "per credit" in basis.
Never add up figures yourself unless the page gives the total.

### Agreement record (only with a source on a school's site)
- `"type": "internal"` — same school continues (e.g., its ADN graduates into its own RN-to-BSN; dual enrollment).
- `"type": "articulation"` — a documented partnership between two named schools in {STATE_NAME} (e.g., a community
  college ADN → university RN-to-BSN 2+2/concurrent/"pathway"). If the partner isn't one of yours, set
  `to_program` to your best guess `<partner id>-rnbsn` using the id list you were given — it will be checked.
  Skip partners in other states.
```json
{ "id": "<from>-to-<to>", "name": "Short human name", "type": "internal", "from_program": "<program id>", "to_program": "<program id>",
  "basis": "What the school says, in plain language", "conditions": "GPA/license/timing conditions or null",
  "source_url": "https://...", "last_verified": "{TODAY}" }
```

### report
A short plain-text summary: what you included, what you excluded and why (for-profit, closing, paused, out of
state), anything you couldn't confirm, and anything surprising (renamed, new, accreditation warnings).
