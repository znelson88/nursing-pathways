# State queue for the schools page

Work order: **west to east**. The scheduled "Add next state" task (every 6 hours: 2am, 8am, 2pm, 8pm) takes the first state marked
`todo`, follows docs/ADD_A_STATE.md, opens a pull request, and merges it once every check
passes (owner's decision, 2026-11-16; he reviews after it's live). It never pushes directly to `main`. Only one
state pull request is open at a time.

Status values: `done` · `todo` · `in progress (branch state/xx)` · `PR open (#n)` · `blocked: reason` ·
`wave 1 merged` (big states split into waves) · add `tuition pending` when Scorecard was rate-limited.

| # | State | Code | Status | Notes |
|---|---|---|---|---|
| — | Colorado | CO | done | 28 schools / 53 programs |
| — | Arizona | AZ | done | 15 / 42 |
| — | California | CA | done | 128 / 278 (94 agreements); every public/non-profit school on the BRN roster (wave 3, 2026-11-16) |
| — | Missouri | MO | done | 47 / 168 |
| — | Washington | WA | done | 44 / 91 (17 agreements); NLC member |
| — | Oregon | OR | done | 27 / 50 (17 agreements); not NLC (checked nursecompact.com) |
| — | Nevada | NV | done | 9 / 31 (6 agreements); not NLC (no compact law; 2025 bills died) |
| — | Idaho | ID | done | 9 / 25 (10 agreements); NLC member (DOPL issues multistate licenses) |
| — | Utah | UT | done | 12 / 43 (8 agreements); NLC member since 2018 (nursecompact.com); roster = DOPL NCLEX table (Utah approves by accreditation) |
| — | Montana | MT | done | 14 / 26 (2 agreements); NLC member since 2015; University of Providence excluded (closing 2027); no for-profit RN programs |
| — | Wyoming | WY | done | 8 / 16 (7 agreements); NLC member since 2018 (nursecompact.com map); no for-profit RN programs |
| — | New Mexico | NM | done | 22 / 40 (14 agreements); NLC member since 2018 (nursecompact.com map); NMNEC dual degree with UNM |
| — | Alaska | AK | done | 2 / 8 (1 agreement); not NLC (2026 compact bill didn't pass); roster/NCLEX from board meeting PDFs (web pages bot-protected); Charter College excluded (for-profit) |
| — | Hawaii | HI | done | 8 / 33 (8 agreements); not NLC (2026 compact bills stalled in committee); NCLEX = board's 2025 report only; no for-profit RN programs on the roster |
| — | North Dakota | ND | done | 11 / 30 (25 agreements); NLC member since 2004 (ndbon.org); NCLEX by fiscal year from the board's annual education reports; Rasmussen excluded (for-profit) |
| — | South Dakota | SD | done | 12 / 32 (9 agreements); NLC member (sdbon.org); NCLEX = board's 2025 annual education report only; no for-profit RN programs on the roster; tech-college RN programs are LPN bridges |
| — | Nebraska | NE | done | 18 / 68 (17 agreements); NLC member since 2018 (dhhs.ne.gov); ADN NCLEX = board table posted by Mid-Plains (BSN rows not published; school-published rates shown); no for-profit RN programs on the roster |
| — | Kansas | KS | done | 37 / 81 (80 agreements); NLC member since 2019 (ksbn.kansas.gov); NCLEX = KSBN Multi-Year Pass Rates RN (rates only); Chamberlain, Galen, Rasmussen excluded (for-profit); Donnelly excluded (no new admits) |
| — | Oklahoma | OK | done | 32 / 88 (17 agreements); NLC member since 2018 (oklahoma.gov/nursing); NCLEX = board ten-year table (2025 counts); ATA College and Central Oklahoma College excluded (for-profit); OU CRNA excluded (COA pending) |
| — | Texas | TX | done | 112 / 325 (98 agreements); wave 1 (2026-11-21) = every public/nonprofit pre-licensure program + RN-to-BSN; wave 2 (2026-11-22) = 94 graduate APRN programs + 3 RN-to-BSN-only universities; NLC member (bon.texas.gov); NCLEX = board five-year table; 15 for-profit schools excluded |
| — | Minnesota | MN | done | 46 / 104 (60 agreements); not NLC (HF 1925 never passed); NCLEX = board 2022-2025 table; Rasmussen, Chamberlain, Capella, Walden excluded (for-profit); Minneapolis School of Anesthesia excluded (new DNAP not enrolling yet) |
| — | Iowa | IA | done | 37 / 86 (44 agreements); NLC member (Iowa Code ch. 152E); roster = board data report program sites + RN Program Data 2025 (roster sheet link dead); no for-profit RN programs on the roster; Iowa Wesleyan closed, Upper Iowa RN-BSN closed |
| — | Arkansas | AR | done | 36 / 94 (33 agreements); NLC member since 2018 (board Compact page); NCLEX = board 5-year tables (fiscal years); no for-profit RN programs on the roster; Southeast Arkansas College and UAPB BSN closed to new admissions |
| — | Louisiana | LA | done | 31 / 111 (19 agreements); NLC member since 2019 (board Compact page); NCLEX = board annual reports (calendar 2023-2025, rows match totals); Chamberlain excluded (for-profit); Dillard on board probation; merged as PR #28 but its deploy hit a GitHub Pages error, so it is published by the next merge (Wisconsin, PR after #28) |
| 21 | Wisconsin | WI | PR open | 39 / 132 (140 agreements); NLC member (implemented Jan 19, 2018); roster = board Approved In-State Schools (rev Aug 26, 2026); NCLEX = board yearly tables 2023-2025 (2023-2024 via archived board PDFs; counts are exams delivered, not stated as first-time); Arizona College of Nursing, Bryant & Stratton, Rasmussen excluded (for-profit) |
| 22 | Illinois | IL | todo | large: plan waves |
| 23 | Mississippi | MS | todo | |
| 24 | Michigan | MI | todo | large |
| 25 | Indiana | IN | todo | |
| 26 | Kentucky | KY | todo | |
| 27 | Tennessee | TN | todo | |
| 28 | Alabama | AL | todo | |
| 29 | Ohio | OH | todo | large |
| 30 | Georgia | GA | todo | |
| 31 | Florida | FL | todo | very large: plan waves |
| 32 | West Virginia | WV | todo | |
| 33 | South Carolina | SC | todo | |
| 34 | North Carolina | NC | todo | large |
| 35 | Virginia | VA | todo | |
| 36 | Pennsylvania | PA | todo | very large: plan waves |
| 37 | Maryland | MD | todo | |
| 38 | District of Columbia | DC | todo | |
| 39 | Delaware | DE | todo | |
| 40 | New Jersey | NJ | todo | |
| 41 | New York | NY | todo | very large: plan waves |
| 42 | Connecticut | CT | todo | |
| 43 | Rhode Island | RI | todo | |
| 44 | Massachusetts | MA | todo | |
| 45 | Vermont | VT | todo | |
| 46 | New Hampshire | NH | todo | |
| 47 | Maine | ME | todo | |

NLC notes are from the site's `NLC` list in js/data.js for western states; confirm every state's current compact
status on ncsbn.org when adding it (membership changes through state legislation).
