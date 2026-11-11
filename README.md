# Nursing Pathways

Every route in nursing, from a first job as a CNA to a doctorate, with take-home pay, school cost and
time for the western US. A second page shows real schools, prerequisites and transfer routes in Colorado,
Arizona, California and Missouri.

**Live at https://nursingpaths.com** (GitHub Pages from the `main` branch of `znelson88/nursing-pathways`;
every push to `main` is checked first, then goes live in a few minutes if the checks pass).

## Automatic checks

- **Before publishing:** GitHub runs the data-rules check and the smoke test on every push. If either fails, the
  live site keeps the last good version and GitHub emails you. See the repository's **Actions** tab.
- **Every month:** GitHub checks every source link and lists records last verified more than 9 months ago. If
  anything needs attention it opens an issue in the repository (you'll get an email).
- **Readers' error reports** go to your Google Form once its address is set in `REPORT_FORM` (js/data.js).

## Look at it on your computer

Double-click `index.html`. That's it.

## Put it online (free)

Already done (see above). For reference, it's a plain static site, so any static host works:

**GitHub Pages** (best if you'll keep editing it with Claude Code)
1. Create a free GitHub account and a new repository, e.g. `nursing-pathways`.
2. Upload everything in this folder (or let Claude Code push it for you).
3. In the repository: Settings → Pages → "Deploy from a branch" → `main` / root → Save.
4. The site appears at `https://<your-username>.github.io/nursing-pathways/` within a minute or two.

**Netlify Drop** (fastest one-off)
1. Go to app.netlify.com/drop.
2. Drag this whole folder onto the page. You get a live link right away.

The custom domain is set by the `CNAME` file.

## Working on it with Claude Code

Open this folder in Claude Code and paste the message from `docs/START_PROMPT.md`. Claude Code reads
`CLAUDE.md` automatically for the project's rules and decisions.
