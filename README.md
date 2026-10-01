# Portfolio

The personal portfolio of Daniel Thomas Jesudoss, live at
[danycb.com](https://www.danycb.com).

It has a homepage, two case studies (FinDoc and Portfolio GitOps), and a custom
404 page. It's built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Other docs

- [ARCHITECTURE.md](ARCHITECTURE.md) — how the code is organized
- [QUALITY.md](QUALITY.md) — checks, pushing, and releases
- [CONTRIBUTING.md](CONTRIBUTING.md) — how to make a change, code rules, and
  commit messages

## Running it locally

You need **Node 24** and **pnpm 11** (the same versions CI uses).

```sh
pnpm install
pnpm dev
```

Then open [localhost:3000](http://localhost:3000).

Where to find things:

- `src/app/` — routes
- `src/content/` — page copy
- `src/features/` — page UI

## Editing copy

All page text lives in `src/content/`, in `home.ts`, `case-studies.ts`, and
`not-found.ts`. Components never contain copy, except short structural labels
like `FIG. 1`.

**To add a case study**, add an entry to `caseStudies`. Its page, metadata, and
sitemap entry are created from that entry automatically.

### Voice

The copy is written in Dany's own voice: first person, plain verbs, and honest
about scale. These are personal projects and one internship, and the copy says
so.

### Rules for editing

- **Short and long versions must match.** Pairs like `label` / `labelShort` and
  `body` / `bodyShort` say the same thing. The short one just uses fewer words.
- **Keep text about the same length.** The layout is tuned to the current copy.
- **Handwritten notes stay short and lowercase.** These are the fields `note`,
  `notes`, `railNote`, and `marginNote`.
- **Only use numbers you can back up.** The FinDoc results table comes from the
  test harness in the FinDoc repo. The GitOps timings come from the Flux
  settings in `portfolio-gitops`.

## SEO

The site answers on both `danycb.com` and `www.danycb.com`. Every page names the
`www` address as its canonical URL. That address is set in `profile.website` in
`src/content/home.ts`.

| File                           | What it sets                                     |
| ------------------------------ | ------------------------------------------------ |
| `src/app/layout.tsx`           | Homepage title, description, and social preview  |
| `src/app/work/[slug]/page.tsx` | Each case study's metadata, from its `seo` entry |
| `src/app/sitemap.ts`           | `/sitemap.xml`                                   |
| `src/app/robots.ts`            | `/robots.txt`                                    |

One gotcha: a case study's Open Graph settings fully replace the homepage's
rather than adding to them. That's why the case study page repeats `url`,
`siteName`, and `locale`.

There's no share image yet, so link previews show text only.

## How it runs in production

Pages are rendered to HTML at build time. A standalone Next.js Node server
(`output: "standalone"` in `next.config.ts`) serves them. The server also
resizes images and handles contact form submissions on each request.

Cloudflare sits in front of the site. Requests still reach the Node server
behind it.

Files in `public/` are served exactly as they are. The hero portrait is the
exception: it goes through `next/image`, so the server sends a resized version.

### Docker

Build the app first, then the image:

```sh
pnpm build
docker build -t portfolio .
```

The image runs on Node 24 (Debian slim). It starts `node server.js` on port 3000
as a non-root user.

The image uses Debian rather than Alpine on purpose. CI builds the app on
Ubuntu, and Sharp, the image library, needs a matching system to work. A check
during the image build makes sure image resizing and WebP encoding work.

### Contact form settings

The contact form needs these environment variables at runtime:

- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Pass them to the running container. Never commit them.

## Deployment

The site runs on a single-node K3s cluster on Oracle Cloud. The cluster is
managed from the
[portfolio-gitops](https://github.com/idanycb/portfolio-gitops) repo.

Deploys happen on their own:

1. A release publishes an ARM image to GitHub's container registry, tagged with
   its version (for example `v1.2.3`).
2. Flux, which runs in the cluster, picks up any version from `1.0.0` upward.
3. Flux rolls it out. There's no manual deploy step.

Flux checks for new images every 5 hours and commits updates every 30 minutes.
So a new release can take up to about 5½ hours to go live.

## Pushing and releasing

You can't `git push` directly. A Husky hook blocks it. Use this instead:

```sh
pnpm release:push
```

It runs all the checks, then shows the latest release tag and asks for a new
one.

- **Leave it blank** to just push your branch. Nothing is released, and you
  don't need the GitHub CLI.
- **Type a tag** such as `v1.2.3` to push and start a release.

You can also pass the tag directly: `pnpm release:push v1.2.3`.

There's no version file to update. Git tags are the release history.

Releases only work once the release workflow is on the default branch. See
[QUALITY.md](QUALITY.md) for the full details.

## Browser tests

```sh
pnpm build
pnpm test:browser
```

This checks the homepage and both case studies at 320, 390, 640, 768, 959, 960,
1024, and 1440px wide. It looks for sideways scrolling, accessibility problems,
more than one `h1`, and missing metadata. [QUALITY.md](QUALITY.md) lists
everything else it covers.

The tests serve the build on port 3100, so stop anything else using that port
first.
