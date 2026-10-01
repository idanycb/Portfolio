# Architecture

This file explains how the code is organized and which folders may import from
which. Read it before adding a file or moving code around.

## The stack

- **Next.js 16** (App Router) with **React 19**
- **TypeScript** in strict mode
- **Tailwind CSS v4**

Pages are rendered to HTML at build time. In production, a standalone Next.js
Node server serves them. The server also does two things on each request:
resizing images and handling contact form submissions.

## Folders

Everything lives in `src/`, except static files in `public/`.

### `src/app/` — routes

Routing, page metadata, and `globals.css`. Route files stay thin: they pick
the right content and pass it to a feature.

| File                      | What it is                                      |
| ------------------------- | ----------------------------------------------- |
| `page.tsx`                | The homepage                                    |
| `work/[slug]/page.tsx`    | One template for every case study               |
| `not-found.tsx`           | The custom 404 page                             |
| `projects/…`              | Redirects from old URLs to their `/work/` pages |
| `robots.ts`, `sitemap.ts` | Generated `robots.txt` and `sitemap.xml`        |

Case study pages are built ahead of time, one for each entry in
`caseStudies`. Any other slug shows the 404 page.

### `src/features/` — page sections

The UI for each page, with one folder per page:

- `home/` — one subfolder per homepage section (hero, selected work,
  experience, stack, archive, contact)
- `case-study/design/` — the case study layout
- `not-found/` — the 404 page

### `src/shared/` — site-wide pieces

Things used across pages: the header and footer, the container, links,
responsive copy, and the mobile nav.

`shared/drawn-layer/` is a special part of this folder. It holds the
hand-drawn ink effect: the ink filter, the scroll reveal, and the `inkStroke()`
helper.

### `src/components/svg/` — drawings

The hand-drawn SVG marks (`HomeDrawings`, `CaseStudyDrawings`). These are
drawings only, with no copy and no state.

### `src/content/` — copy

All page text, stored as typed data: `home.ts`, `case-studies.ts`, and
`not-found.ts`.

### `public/`

The portrait source image and the résumé PDF. Files here are served exactly as
they are. The hero portrait is the exception: it goes through `next/image`, so
the server sends a resized version.

## Import rules

Imports only flow one way:

```text
app/ → features/ → shared/ → components/svg/ → shared/drawn-layer/
                       ↘ content/
```

In plain terms:

| Folder                | May import from                          |
| --------------------- | ---------------------------------------- |
| `app/`                | anything                                 |
| `features/`           | `shared/`, `components/svg/`, `content/` |
| `shared/`             | `components/svg/`, `content/`            |
| `components/svg/`     | `shared/drawn-layer/` only               |
| `shared/drawn-layer/` | nothing else in `src/`                   |
| `content/`            | nothing else in `src/`                   |

Some extra rules:

- **Nothing imports from `app/`.**
- **Only `app/` imports a feature.** Features never import each other. If two
  features need the same thing, move it to `shared/`.
- **Use the `@/` alias across folders** (`@/shared/site-header`), and relative
  paths within one folder (`./WorkCard`).

`shared/` uses `components/svg/` for the nav mark in the header. It reads
`content/` for copy used on every page, such as the header and footer.

ESLint enforces these rules (see `scripts/import-boundaries.mjs`), so
`pnpm lint` fails if you break one.

## Conventions

### Server first

Components run on the server unless they need the browser. Only these run in
the browser:

- the mobile nav and the auto-hiding header
- the case study table of contents
- `HashLink`
- the contact form and its topic picker
- the drawn layer (`InkFilter`, `RevealOnScroll`)

### Copy is data

Components never contain page text. They receive it as props, typed from
`src/content/`.

To add a case study, add an entry to `caseStudies`. You don't need a new route.

### File names

- `features/` and `components/`: PascalCase (`WorkCard.tsx`)
- `shared/`: kebab-case (`site-header.tsx`)
- `app/`: the standard Next.js names (`page.tsx`, `layout.tsx`)

### Styling

Use Tailwind classes. Design tokens and the few custom utilities are defined in
`globals.css`. The styling and drawn-layer rules are in
[CONTRIBUTING.md](CONTRIBUTING.md#code-rules).

### State

There is no global store. Any client state stays inside the component that
uses it.

The contact form is the only thing that changes anything. `ContactForm`
handles the form in the browser, including Turnstile, the Cloudflare spam
check. Its Server Action then validates the submission on the server. It checks
the Turnstile token, checks the email domain with a DNS lookup, and sends the
message through Resend.

## Checks

Run these before calling a change done:

```sh
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm build` is the final check. The deploy workflow runs it too. See
`QUALITY.md` for the full set of checks.
