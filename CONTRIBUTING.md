# Contributing

This file covers how to make a change, the rules the code follows, and how to
write commit messages. Read the other docs first:

- [README.md](README.md) — running the site, editing copy, and deployment
- [ARCHITECTURE.md](ARCHITECTURE.md) — folders and import rules
- [QUALITY.md](QUALITY.md) — checks, pushing, and releases

## Making a change

1. Branch from `main`.
2. Make the change.
3. After a layout change, check it in a real browser at 320, 390, 640, 768, 959,
   960, 1024, and 1440px. Don't trust the diff alone.
4. Run `pnpm check:local`. If formatting fails, run `pnpm format`.
5. Commit, following the [commit message rules](#commit-messages).
6. Push with `pnpm release:push`. A plain `git push` is blocked. See
   [QUALITY.md](QUALITY.md) for why.

### Keeping files local

The push check refuses to push while any untracked file exists. To keep a file
out of the repo, such as personal notes or your own editor and tool settings,
list it in `.git/info/exclude`.

That file works like `.gitignore`, but it stays on your machine and is never
committed. Git, the push check, and `pnpm format` all respect it.

## Code rules

Copy rules live in the README under
[Editing copy](README.md#editing-copy). Import rules live in
[ARCHITECTURE.md](ARCHITECTURE.md#import-rules). The rules below cover
everything else.

### Styling

- **No hex colors in components.** The only hex values are the design tokens
  in `:root` of `src/app/globals.css`. Use those tokens.
- **Ink rules use `border-signature` / `border-*-signature`.** Never set a rule
  width by hand, like `border-b-[1.6px]`. Plain 1px hairlines (`border`,
  `border-t`) are a separate, lighter rule and are fine.
- **Only two breakpoints: `tablet` and `layout`.** Never use `sm:`, `md:`, or
  `lg:`. Prefer fluid `clamp()` sizes over adding a breakpoint.
- **A new fluid type utility needs a `tablet` step** that meets its neighbours
  at 640px and 960px, so nothing jumps.
- **Each SVG variant pair switches at exactly one breakpoint.**

### The drawn layer

The hand-drawn ink look comes from `src/shared/drawn-layer/`.

- **Set stroke widths with `inkStroke()` in `style`**, like
  `style={{ strokeWidth: inkStroke(1.6) }}`. Don't use a `strokeWidth=`
  attribute, because it can't read `--ink-stroke`. In a class, use
  `[stroke-width:calc(1.6px*var(--ink-stroke,1))]`.
- **If you change `--ink-wobble`**, also update `INK_WOBBLE_FALLBACK` in
  `src/shared/drawn-layer/InkFilter.tsx`. The server-rendered value must match.
- **`PageDrawnLayer` renders once per page, from the page itself.** Never
  render it from `src/app/layout.tsx`.
- **Never fake a drawn mark** with divs, borders, CSS shapes, or an icon
  library. Path geometry (`d`, `points`, `cx`/`cy`/`r`, dash arrays) and
  relative stroke weights are part of the design. You can move, scale, and
  recolor a mark freely, but only change its geometry when you mean to redesign
  it.
- **Decorative SVGs keep `aria-hidden="true"`.** Meaningful diagrams keep
  `role="img"` and their `<title>`.

### Layout and accessibility

- **The site works down to 320px wide**, with no sideways scrolling.
- **No visible text smaller than 9px.** This includes SVG text, which shrinks
  with its `viewBox` scale.
- **Each page has one `h1`** and headings in a logical order.
- **Keep the skip link**, an `aria-label` on each nav, and `scroll-margin-top`
  on anchor targets so they clear the sticky headers.
- **Numbered section labels only appear in the mobile nav.** The `#archive`
  section keeps its `id` at every width.
- **Reduced motion must leave drawn strokes visible** (`stroke-dashoffset: 0`),
  never stuck invisible.
- **The hero portrait is the LCP image.** It keeps its 4:5 ratio so the layout
  doesn't shift. Its `rise` entrance animation stays transform-only. Never add
  an opacity fade, because that delays the paint LCP measures.

### Links

- **In-page anchor links** (`#id`, `/#id`) use `HashLink` from
  `src/shared/hash-link.tsx`, never a plain `<a>` or `next/link`. It keeps
  section jumps out of the browser history and scrolls again on a repeat click.
- **External links that open in a new tab** carry `rel="noopener noreferrer"`.
  `ActionLink` adds it for you. `download` links render a plain `<a>`.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short imperative subject>

- <major change, one short line>
- <major change, one short line>
```

- **Subject:** `type(scope): subject`, lowercase, imperative, no trailing
  period, 72 characters max. Types: `feat`, `fix`, `refactor`, `style`,
  `perf`, `docs`, `test`, `build`, `ci`, `chore`, `revert`.
- **Body:** required. A bullet list, one short line per major change in the
  commit. Say what changed and, where not obvious, why. Skip trivial edits.
- **Breaking changes:** add `!` after the type/scope and a
  `BREAKING CHANGE:` line in the body.
- **No attribution trailers.** Don't add `Co-Authored-By`, "Generated with",
  session links, or any other tool attribution.
