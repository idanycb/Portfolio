# Quality checks and releases

This file explains how code gets from your machine to production, and what has
to pass along the way. Read it before your first push.

**In short:** you can't `git push` directly. Run `pnpm release:push` instead. It
runs every check locally, pushes only if they all pass, and can optionally cut a
release.

## Setup

You need **Node 24** and **pnpm 11** (the same versions CI uses).

```sh
pnpm install
pnpm exec playwright install chromium
```

On Linux, add `--with-deps` to the Playwright command if Chromium complains
about missing system libraries. `pnpm install` also sets up the Husky git hooks.

To publish a tagged release you also need the GitHub CLI (`gh`), signed in with
access to this repository. Plain branch pushes don't need it.

## Everyday commands

| Command             | What it does                                               |
| ------------------- | ---------------------------------------------------------- |
| `pnpm check:local`  | Runs all the required checks. Never changes your files.    |
| `pnpm release:push` | Runs the checks, then pushes the branch (and maybe a tag). |
| `pnpm lighthouse`   | Runs the Lighthouse performance audits.                    |
| `pnpm audit`        | Checks dependencies for known vulnerabilities.             |

If `pnpm check:local` fails, look in:

- `.check-reports/` for the failure logs
- `playwright-report/` and `test-results/` for browser test results

## Pushing code

Run:

```sh
pnpm release:push
```

It shows the latest release tag and asks for a new one.

- **Leave it blank** to just push your branch. The checks still run, but no tag
  is created and nothing is released. GitHub CLI isn't needed.
- **Type a tag** such as `v1.2.3` to push the branch and start a release.

You can skip the prompt by passing the tag directly:

```sh
pnpm release:push v1.2.3
```

### What has to be true before a push

The push is refused unless:

- Your working tree is clean: tracked files match the latest commit, and there
  are no untracked files. To keep a file local, list it in `.git/info/exclude`
  (see [CONTRIBUTING.md](CONTRIBUTING.md#keeping-files-local)).
- You're pushing the commit you have checked out, to its branch. To push
  something else, check it out first.

The hook also rejects tag pushes, branch deletions, and any push that didn't
come through `pnpm release:push`. Creating and fetching tags locally still works.

These hooks are a convenience, not a security measure. `--no-verify` or
`HUSKY=0` skips them. That's fine because CI runs the full set of checks again
anyway.

### How it works behind the scenes

When the local checks pass, `release:push` writes a temporary "receipt" tied to
the current commit, branch, and remote URL. The pre-push hook looks for that
receipt and lets the push through. This is why the checks don't run twice.

## How releases work

When you give `release:push` a tag, it:

1. Records the current commit.
2. Confirms GitHub CLI is signed in and the release workflow exists on the
   default branch.
3. Runs the local checks.
4. Pushes the branch.
5. Asks GitHub Actions to release that exact commit.

CI then:

1. Confirms the commit really is on the branch.
2. Runs every required check again.
3. Builds the ARM Docker image without publishing it.
4. Creates the tag.
5. Publishes the image, labelled with the commit it was built from.

Some rules worth knowing:

- **Tags never move.** Once a tag points at a commit, it stays there.
- **Pushing a tag yourself does nothing.** Only the workflow publishes.
- **The release workflow must already be on the default branch** before it can
  be triggered.
- **Pushing again mid-release is safe.** The release still uses the commit
  recorded at the start.
- **Two requests for the same tag run one at a time.** A newer request may
  replace one that's still waiting, but never cancels one that's running.

### When something goes wrong

- **Branch pushed, but no release started:** run the same `release:push`
  command again. Tags are always read fresh from GitHub, so a failed attempt
  isn't mistaken for a finished one.
- **Tag created, but publishing failed:** retry with the same tag. An existing
  tag is accepted as long as it points at the same commit.

## What the checks cover

`pnpm check:local` runs these, in the same way CI does:

- **Formatting** (Prettier). Generated files, lockfiles, reports, `.env`
  files, and anything in `.git/info/exclude` are skipped. The check never fixes anything; run
  `pnpm format` yourself.
- **Lint** (ESLint), with zero warnings allowed. This also enforces the import
  rules in `ARCHITECTURE.md`.
- **Types** (both TypeScript configs).
- **Unused code** (Knip). There are no exceptions for unused files,
  dependencies, or exports. Knip never deletes anything on its own.
- **Production build.**
- **Browser tests** (Playwright), described below.
- **Basic SEO.** Each content page must respond successfully and have a title, a
  description, and exactly one `h1`.

### Browser tests

The tests find every case study from the content files, so new ones are covered
automatically. They test:

- all eight layout widths (320, 390, 640, 768, 959, 960, 1024, 1440px)
- menus and the table of contents
- focus after pressing Escape
- skip links using the keyboard
- reduced motion
- redirects and 404 pages
- contact form validation, in both the browser and the server
- accessibility, with **zero** axe violations allowed

The contact form tests only ever submit invalid data, and Turnstile is blocked.
The local test server clears the real email and Turnstile credentials, so tests
can't send real messages.

### Image optimization

Next.js quietly serves the original, unoptimized image if its image optimizer
breaks. A plain "200 OK" won't catch that. So the browser tests request the hero
portrait at 384, 640, and 750px wide and check:

- the returned image really is that width
- PNG and WebP are served correctly
- repeat requests are cached

The Docker image also checks this when it's built.
`scripts/check-image-runtime.mjs` fails the build if image resizing or WebP
encoding doesn't work.

The image runs on Debian, not Alpine. CI builds the app on Ubuntu, and the
image library it installs (Sharp) doesn't work on Alpine.

## Lighthouse

Lighthouse is a required check in CI, but it isn't part of `pnpm check:local`.
Run it yourself after a build:

```sh
pnpm build
pnpm lighthouse
```

Don't run other builds or browser tests at the same time, or the scores will be
off.

It audits three pages (home, FinDoc, and GitOps), on both mobile and desktop,
three times each. That's 18 audits in total, run one after another.

### Minimum scores

Each page must hit these scores on both mobile and desktop. The score is the
median of its three runs.

| Category       | Minimum |
| -------------- | ------- |
| Performance    | 90      |
| Accessibility  | 100     |
| Best Practices | 95      |
| SEO            | 95      |

Each page and device is checked on its own, with no rounding and no averaging
across pages. Other numbers in the report, such as individual timing metrics,
are for information only. If any score falls short, all 18 audits still finish
before the command fails.

### Reading the results

Start with `.lighthouseci/summary.json`:

- `status: "complete"` means all audits ran. Don't trust the results otherwise.
- `checksPassed: true` means every minimum score was met.
- `checks` and `scoreMinimums` show the details for each page.

The summary also lists the median, lowest, highest, and individual scores.

The full reports are saved in `.lighthouseci/runs/<timestamp>/`. Files like
`home-mobile.report.html` are the run with the median Performance score. The
individual metric medians in the summary may come from different runs.

If a run fails, reports from an earlier run may still be there. Check the
summary's status and the timestamp folder before trusting them.

CI uploads the `.lighthouseci/` folder even when the check fails.

### Auditing the live site

```sh
pnpm lighthouse https://www.danycb.com
pnpm lighthouse https://www.danycb.com --home-only
```

This runs the same audits against the deployed site, without a local server.
`--home-only` audits just the home page (6 audits). Results go to
`.lighthouseci/production/`.

Remember that this measures what's deployed, not your local changes. If the
site returns an HTTP error, the command fails.

The audits never submit the contact form. Local runs use Cloudflare's test
Turnstile key and no email credentials. Live runs load the real Turnstile
widget, but don't send any email.

## Dependency security

`pnpm audit` checks every dependency for known vulnerabilities.

Only **high or critical vulnerabilities in production dependencies** block
anything. That applies to CI, to the weekly scheduled audit, and to the
dependency review on pull requests. Problems in dev-only dependencies are
reported but don't block builds or releases.

Dependabot opens update PRs every week, for both npm packages and GitHub
Actions.
