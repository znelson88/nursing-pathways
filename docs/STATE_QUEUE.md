# State queue for the schools page

Work order: **west to east**. The scheduled "Add next state" task (8am and 4pm) takes the first state marked
`todo`, follows docs/ADD_A_STATE.md, and opens a pull request. The owner reviews and merges; the task never
merges or pushes to `main`. Only one state pull request is open at a time.

Status values: `done` · `todo` · `in progress (branch state/xx)` · `PR open (#n)` · `blocked: reason` ·
`wave 1 merged` (big states split into waves) · add `tuition pending` when Scorecard was rate-limited.

| # | State | Code | Status | Notes |
|---|---|---|---|---|
| — | Colorado | CO | done | 28 schools / 53 programs |
| — | Arizona | AZ | done | 15 / 42 |
| — | California | CA | done | 24 / 61 (partial: CSU/UC/major privates + 8 CC ADNs; more CCs possible later) |
| — | Missouri | MO | done | 47 / 168 |
| — | Washington | WA | done | 44 / 91 (17 agreements); NLC member |
| 2 | Oregon | OR | PR open | 27 / 50 (17 agreements); not NLC (checked nursecompact.com) |
| 3 | Nevada | NV | todo | not NLC |
| 4 | Idaho | ID | todo | NLC member |
| 5 | Utah | UT | todo | NLC member |
| 6 | Montana | MT | todo | NLC member |
| 7 | Wyoming | WY | todo | NLC member |
| 8 | New Mexico | NM | todo | NLC member |
| 9 | Alaska | AK | todo | not NLC |
| 10 | Hawaii | HI | todo | not NLC |
| 11 | North Dakota | ND | todo | |
| 12 | South Dakota | SD | todo | |
| 13 | Nebraska | NE | todo | |
| 14 | Kansas | KS | todo | |
| 15 | Oklahoma | OK | todo | |
| 16 | Texas | TX | todo | very large: plan waves |
| 17 | Minnesota | MN | todo | |
| 18 | Iowa | IA | todo | |
| 19 | Arkansas | AR | todo | |
| 20 | Louisiana | LA | todo | |
| 21 | Wisconsin | WI | todo | |
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
