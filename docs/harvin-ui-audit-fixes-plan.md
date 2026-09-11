# Harvin UI Audit — Fix Plan

Source: `docs/harvin-ui-audit-report.md` (audit dated 2026-09-11, branch `feature/pixel-perfect-homepage` @ `be91661`).
25-section audit, 54/100 overall. 2 CRITICAL, 9 HIGH, 12 MEDIUM, 12 LOW, 4 ENHANCEMENT findings.

The audit proposes a 5-phase roadmap (Critical -> High Impact -> Design System -> Performance -> Polish).

## Decisions made

- Work happens on **`bugfix/critical-ui-audit-fixes`**, branched off `feature/pixel-perfect-homepage`
  (not off `main` — `feature/pixel-perfect-homepage` was the active branch when this work started).
- Scope agreed with the user: **do Phase 1 (Critical) first, then stop and check in** before Phase 2+.
  Do not assume the rest of the roadmap is approved.
- Video re-encoding: ffmpeg is available locally (confirmed `/usr/local/bin/ffmpeg`, v8.1) — re-encode
  directly rather than flagging it as a manual follow-up.
- Don't merge to `main` or `feature/pixel-perfect-homepage` without being asked. Don't commit without
  being asked (nothing has been committed yet as of this writing — working tree has the Phase 1 changes
  uncommitted on the new branch).

## Status: Phase 1 (Critical) — DONE, verified, uncommitted

All six Phase 1 items implemented and verified (tsc clean, lint zero warnings, `npm run build` passes,
manually verified in a live Chrome DevTools session against `next start`):

- **C-1** (24MB autoplaying video blocks hero render) — built `src/components/ui/LazyVideo.tsx`:
  IntersectionObserver-gated mount, `preload="none"`, poster routed through `next/image`, never mounts
  under `prefers-reduced-motion`. Wired into `AboutSnippet.tsx` and `ManufacturingSection.tsx`.
  Re-encoded both videos with ffmpeg: `harvin_animation.mp4` 11.9MB->2.4MB, `Harvin_animation_timeline.mp4`
  12.0MB->2.5MB (`-an -c:v libx264 -b:v 2M -maxrate 2.2M -bufsize 4M -movflags +faststart`, audio stripped).
- **H-1** (duplicate 12MB video download — `FacilityVisual` rendered twice, desktop+mobile) — fixed as a
  side effect of C-1: a `display:none` copy never intersects, so its `LazyVideo` never mounts. Verified via
  network panel: exactly 1 request per video src, not 2.
- **C-2** (CTA pill 2.15:1 contrast, white-on-yellow) — fixed at all 9 call sites (not 7 as the audit's
  static grep found — Hero.tsx has 2, one needed a `hover:` variant since it's `text-white` on a
  transparent/bordered button that only goes yellow on hover). Changed `text-white` -> `text-brand-ink`
  (or added `hover:text-brand-ink` for Hero's secondary button). Removed the now-unneeded `text-shadow`
  from `.bg-rusted-yellow` in `globals.css`.
- **H-2** (Products dropdown keyboard-inaccessible, 5 phantom tab stops) — added `inert` on the closed
  menu, `aria-haspopup="menu"` + `aria-controls`, opens on trigger `focus` as well as hover/click, closes
  on `Escape` with focus returned to the trigger. **Caught a self-introduced bug during verification**:
  returning focus to the trigger re-fired its `onFocus` handler and immediately reopened the menu — fixed
  with a `suppressTriggerFocusOpenRef` one-shot flag. Verified live via Tab/Escape in Chrome DevTools MCP.
- **H-6** (focus ring removed on the only input, no adequate replacement) — added a project-wide
  `:focus-visible` token in `globals.css` (2px `--color-brand-accent` ring, 2px offset); removed
  `focus:outline-none` from the search input in `ProductFilters.tsx`.
- **H-8** (3 autoplaying loops, no reduced-motion support, no pause) — global
  `prefers-reduced-motion: reduce` block in `globals.css`; `LazyVideo` also never mounts video under
  reduced motion. Added a pause/play toggle button (`showControls` prop) to the manufacturing reel
  specifically (top-right, positioned to avoid the existing top-left/bottom-right overlay badges).

Also fixed in passing (pre-existing lint warning + related audit finding, both trivial):
- **L-9** — two conflicting quote-link contracts (`?product=<slug>` vs `?product=<url-encoded name>`).
  Settled on the slug-based `quoteHref` in `src/app/products/[slug]/page.tsx` (this also fixed the
  `'quoteHref' is assigned a value but never used` lint warning).

New file: `src/components/ui/LazyVideo.tsx`, exported from `src/components/ui/index.ts`.

## Status: Phase 2 (High Impact) — DONE, verified, uncommitted

All items implemented and verified (`tsc --noEmit` clean, `npm run lint` zero warnings, `npm run build`
passes, manually verified in a live Chrome DevTools session against `next dev`):

- **H-3** (yellow heading accent fails contrast on light sections) — added `--color-brand-accent-text:
  #9a5b06` token (5.1:1 on white, 4.9:1 on `#f4f4f2`) in `globals.css`, used for the yellow half of every
  heading that sits on a light background: `AboutSnippet.tsx`, `LatestProducts.tsx` (heading + "View All
  Products" link, which switched from a hover color change to `hover:underline` since no yellow hover
  state clears 4.5:1), `ManufacturingSection.tsx`, `IndustriesSection.tsx`, `ClientLogosSection.tsx`.
  Headings already on dark sections (`products/page.tsx`, `AdvantageSection.tsx`, `CtaBanner.tsx`, `Navbar`)
  were left on `text-brand-yellow` — they already clear 8.9:1 there, per the audit's own finding. Also
  darkened `--color-brand-text-secondary` from `#6b7280` to `#5b6470`, fixing the "Industries We Serve"
  eyebrow's separately-flagged 4.39:1 near-miss on `#f4f4f2` (now 5.45:1) without regressing any other use.
- **H-4** (mobile nav drops the 5 product categories) — `Navbar.tsx` mobile drawer now renders a disclosure
  for `item.hasDropdown` items: a toggle button (`aria-expanded`/`aria-controls`) revealing `item.children`
  as indented sub-links. Verified live: all 5 categories (Fly Ash, Concrete Block, Paver Block, Automatic
  Plant, Material Handling) reachable from the mobile drawer.
- **H-5** (search pushes a history entry per keystroke) — `ProductFilters.tsx`: both `update()` (debounced
  search + category toggle) and the "Clear all filters" handler switched from `router.push` to
  `router.replace`.
- **H-7** (icon ligature names leak to the a11y tree) — `Icon.tsx` gained a `style` prop (several call
  sites needed inline sizing). All 10 raw `material-symbols-outlined` spans replaced with `<Icon />` across
  `Hero.tsx`, `AboutSnippet.tsx`, `LatestProducts.tsx`, `IndustriesSection.tsx`, `AdvantageSection.tsx`,
  `Footer.tsx` (5 sites). Verified live: no ligature name (`location_on`, `call`, `smart_display`, etc.)
  appears as `StaticText` in the accessibility tree. Added an `eslint.config.mjs` `no-restricted-syntax`
  rule forbidding the raw class outside `Icon.tsx` (and the config file itself, to avoid the rule matching
  its own message string) so it can't regress.
- **M-1** (products grid 80px out of alignment) — `products/page.tsx` `max-w-8xl` -> `max-w-7xl`; deleted
  the now-unused `--container-8xl` token from `globals.css`. Verified live at 1440px: navbar, grid
  container and footer all left-align at 80px.
- **M-2** (hero trust badge divider survives wrap) — `Hero.tsx` badges switched from a wrapping flex row
  keyed on array index to `grid grid-cols-1 sm:grid-cols-3` (never wraps unpredictably at either
  breakpoint), with `border-t` dividers below `sm` and `border-l` at `sm`+. Verified live at 390px: all
  three badges stack in one column, dividers render as `border-top`, no stray left border.
- **M-6** (`ProductCard` has no hover/focus state) — added `group`, `hover:-translate-y-1`,
  `hover:border-brand-accent/40`, `hover:shadow-lg`, title color transition and arrow translate on hover,
  matching the homepage card treatment. The H-6 `:focus-visible` token already covers the focus ring.
- **M-9** (no OG/canonical/structured data/robots/sitemap) — new `src/lib/site.ts` (`SITE_URL`
  `https://harvinindustries.com`, inferred from the brochure's contact email domain — **not yet confirmed
  as the connected domain**, flagged for whoever connects Vercel to a real domain). Added `openGraph`/
  `twitter`/`alternates.canonical` metadata to the root layout, `/products`, and `/products/[slug]`;
  `Organization` JSON-LD in the root layout; `Product` + `BreadcrumbList` JSON-LD on product detail pages;
  `src/app/sitemap.ts` and `src/app/robots.ts` (only the 3 routes that actually exist: `/`, `/products`,
  the 5 `/products/[slug]`). OG image reuses the real `hero_Image.webp` (1600x900) — TODO in `site.ts` to
  swap for a proper 1200x630 crop once one exists.
- **M-10** (mobile toggle exposes no state to AT) — `Navbar.tsx` mobile toggle now has `aria-expanded`,
  `aria-controls="mobile-nav"`, a state-dependent label ("Open menu"/"Close menu"), drawer given
  `id="mobile-nav"`; `Escape` now also closes the mobile drawer (previously only closed the desktop
  dropdown).
- **M-11** (no skip-to-content link) — added a visually-hidden-until-focused skip link as the first child
  of `<body>` in the root layout, targeting `id="main"` added to every page's `<main>`.

New file: `src/lib/site.ts`. New routes: `src/app/sitemap.ts`, `src/app/robots.ts`.

## Not done — Phases 3-5

Design-system token normalization (M-12), `Button`/`SectionHeader`/`Card` extraction, bringing the
homepage visual language to `/products` (M-5), real image gallery (M-4), spec table mobile card layout
(M-3), asset purge (H-9, 40MB unreferenced in `public/`), Cloudinary migration, all L-1 through L-12.
See `docs/harvin-ui-audit-report.md` sections 24-25 for the full itemized list.

## For a new session picking this up

1. Confirm current branch is `bugfix/critical-ui-audit-fixes` (`git branch --show-current`).
2. Confirm Phase 2 changes are still there (`git status --short`) unless the user has since committed —
   Phase 1 was committed as `855a560` before Phase 2 started.
3. Ask the user whether to commit Phase 2 now, and whether to proceed into Phase 3 — don't assume either.
4. Before Phase 3, confirm the `SITE_URL` in `src/lib/site.ts` against whatever domain actually gets
   connected in Vercel — it's currently an inferred placeholder, not a confirmed production domain.
5. If proceeding to Phase 3, re-read `docs/harvin-ui-audit-report.md` sections 6-7 and 21-22 (M-3 through
   M-5, M-12, and the Low findings) for full finding detail — this plan doc only summarizes.
