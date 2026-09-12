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

## Status: Phase 3 (selected items) — DONE, verified, uncommitted

User explicitly scoped Phase 3 to: the Low findings (L-1–L-12), the mechanical parts of M-3/M-4, and
M-5 (visual parity on `/products`). Explicitly declined for now: M-12 token normalization + `CLAUDE.md`
brand-section rewrite, and H-9 asset purge / Cloudinary migration ("static changes only" for this pass).

- **L-1/L-2** — deleted the four dead components (`TrustStrip`, `KeyFactors`, `HowItWorks`,
  `BrickWallPattern`, the last of which had the `Math.random()`-during-render hydration hazard) and their
  barrel exports.
- **L-3** — already clean (zero lint warnings confirmed; the two cited warnings no longer exist in the
  current code).
- **L-4** — removed the sole `quality={85}` override (`ProductCard.tsx`) so all images use the same
  default quality; pruned the unused `qualities: [75, 85, 90]` down to nothing in `next.config.ts` (Next's
  default of `[75]` covers it).
- **L-5** — left alone. Latent-only (exactly one nav item has `hasDropdown` today); fixing it means
  extracting per-item dropdown state into a child component, which is speculative work for a second
  dropdown that doesn't exist yet.
- **L-6** — footer links (`Footer.tsx`) gained `inline-block py-1.5` for a real ≥24px tap target.
- **L-7** — search placeholder shortened to "Search machines…" so it stops clipping in the 260px sidebar.
- **L-8** — `ProductFiltersSkeleton` replaces the `fallback={null}` on the filters' `Suspense` boundary.
- **L-9** — already fixed in Phase 1.
- **L-10** — `ProductCard`'s image `alt` set to `""` (decorative; the heading already names the link).
- **L-11** — `aria-label="Breadcrumb"` on the detail page's breadcrumb nav, `aria-label="Main"` on the
  desktop nav in `Navbar.tsx`.
- **L-12** — all quote CTAs (`Navbar.tsx`, `Footer.tsx`, `CtaBanner.tsx`) now point at `/contact`, matching
  `Hero.tsx`'s existing convention, instead of the dead `/#quote` anchor.
- **M-3** — narrowed the global scrollbar-hiding rule in `globals.css` from `*` to `html, body` so the spec
  table's horizontal scroller (and any other inner scroller) shows its native scrollbar as an affordance.
  Added a scoped `.no-scrollbar` utility for `ClientLogosSection`'s carousel, which already has its own
  prev/next arrows and would look worse with a redundant native scrollbar.
- **M-4** — new `src/components/products/ProductGallery.tsx` (client component): clicking a thumbnail
  swaps the main image, active thumbnail gets a `ring-2 ring-brand-accent`, thumbnails are real `<button>`s
  (keyboard-operable for free) sized to content instead of sitting in a 3-column grid mostly empty.
- **M-5** — extracted the homepage's eyebrow pattern (yellow tick + tracked-caps label) into
  `src/components/ui/Eyebrow.tsx` (light/dark/accent tone variants) and applied it everywhere on the
  homepage that had it duplicated inline, plus to every section heading on `/products` and
  `/products/[slug]` that didn't have one. Added the split dark/accent heading treatment to "Machine
  Specification", "Output Products" and "Features" on the detail page. Alternated the listing page's
  filter+grid section and the detail page's "You may also need" section to `#f4f4f2`, matching the
  homepage's alternating white/grey band rhythm — did **not** force alternation onto the conditionally-
  rendered spec/production/features sections themselves, since only 2-3 of 7 products have each of those
  fields and a fixed alternation would look inconsistent product to product.

New file: `src/components/ui/Eyebrow.tsx`, `src/components/products/ProductGallery.tsx`.

## Status: M-12 (design-token normalization + `CLAUDE.md` brand-section correction) — DONE, verified, uncommitted

Phase 3 was found already committed (`e357c07`) at the start of this session. User picked M-12 over H-9
(H-9 still needs Cloudinary credentials).

- Removed four duplicate/dead tokens from `globals.css`: `--color-brand-brick` (`#f59e0b`, exact dup of
  `--color-brand-yellow`), `--color-brand-brick-hover` (`#d97706`, exact dup of `--color-brand-accent`,
  and unreferenced anywhere), `--color-brand-dark` (`#121417`, exact dup of `--color-brand-ink`, only ever
  used for the `body{background}` rule which now reads `var(--color-brand-ink)` directly), and
  `--color-brand-cream` (`#ffffff`, exact dup of `--color-brand-surface`) plus the fully-unused
  `--color-brand-umber`. Migrated their few call sites (`ProductFilters.tsx`, `Logo.tsx`,
  `ProductGallery.tsx`, `ProductCard.tsx`, `ProductionTable.tsx`, `IsometricLines.tsx`) onto the surviving
  token — no visual change, since every merge was between tokens already carrying the same hex value.
- Added `--color-brand-surface-alt: #f4f4f2` and replaced the three hardcoded `bg-[#f4f4f2]` call sites
  (`app/products/page.tsx`, `app/products/[slug]/page.tsx`, `IndustriesSection.tsx`) with `bg-brand-surface-alt`.
- Replaced the hardcoded `#1c1f24` gradient stop in `AdvantageSection.tsx` with the existing
  `brand-dark-surface` token (`#1e2229` — close enough that the decorative gradient is visually identical).
- **Left alone, flagged rather than guessed:** `#FFEE00` in `BrandLogo.tsx:34` (the yellow accent triangle
  in the full text-lockup logo). It's a real visible brand-identity color, not a UI accent — collapsing it
  into `brand-yellow` (`#f59e0b`, a much darker amber) would visibly change the logo. Needs a human call,
  not a silent fix.
- Radius scale (8 values, no formal scale per the audit) was left as-is — normalizing it site-wide is a
  larger refactor than "token normalization" implied here, and the 8 buckets already map sensibly to
  distinct component shapes (pills vs cards vs tags vs panels).
- Rewrote the `## Brand` palette section in `CLAUDE.md`: it still documented the abandoned "Fired Clay"
  terracotta palette (`#2F1B27` ink, `#B4442A` brick, etc.) from the original plan doc, while the shipped
  homepage redesign (`be91661`) replaced it with "Machine Yellow" months ago. New section lists the actual
  current token values from `globals.css` verbatim.
- Verified: `tsc --noEmit` clean, `npm run lint` zero warnings, `npm run build` passes, and manually
  checked `/`, `/products`, `/products/hi-1500` against `next start` in Chrome — no visual regression from
  the token merges.
- Did **not** touch `docs/harvin-industries-plan.md`'s stale "Brochure Match" palette table — it's the
  original historical plan doc (not itemized in M-12's scope), and per the global CLAUDE.md rule "where a
  plan and the code disagree, the code is correct."

## Status: Roadmap leftovers (Button/Card/SectionHeader, spec table mobile layout, polish items) — DONE, verified, uncommitted

User explicitly deferred the `BrandLogo.tsx` `#FFEE00` color call and H-9/Cloudinary again this session
("keep the images static for now as we will do it together when the database is configured") and asked to
start on the "smaller leftovers" bucket instead.

- **`Button` primitive** (`src/components/ui/Button.tsx`, new) — the `rounded-full ... bg-rusted-yellow
  ... text-brand-ink ...` pill CTA was duplicated at 8 call sites (`Hero.tsx` x2, `CtaBanner.tsx`,
  `AboutSnippet.tsx`, `ManufacturingSection.tsx`, `Navbar.tsx` mobile drawer, `Footer.tsx`,
  `app/products/[slug]/page.tsx`), each with slightly different padding and a hand-copied arrow SVG.
  Extracted into `variant` (`primary` / `outline-dark` / `outline-light`) x `size` (`sm` / `md` / `lg`),
  renders a `Link` when `href` is passed or a plain `<button>` otherwise (used by `error.tsx`'s retry
  action). Trailing arrow now goes through the existing `Icon` component instead of a repeated inline SVG.
  All 8 sites migrated; one minor intentional visual normalization: Hero's "Explore Our Machines" button
  was `text-base`, every other CTA was `text-[17px]` — unified to `text-[17px]`.
- **`Card` primitive** (`src/components/ui/Card.tsx`, new) — the `rounded-xl border border-brand-border
  bg-brand-surface` shell repeated in `FeatureGroups.tsx`, `SpecTable.tsx`, and the `/products` empty-state
  box. Takes `as` (defaults to `div`, `SpecTable` uses `dl`) and `variant` (`solid` / `dashed`). Left
  `ProductCard.tsx` and `ProductionTable.tsx`'s outer wrapper alone — the former is a whole-card `<Link>`
  with its own hover/translate treatment, the latter doesn't carry `bg-brand-surface` at the outer level
  (its table cells do) - forcing either through `Card` would either fight existing behavior or add
  ceremony without removing real duplication.
- **`SectionHeader` primitive** (`src/components/ui/SectionHeader.tsx`, new) — the `Eyebrow` + `<h2
  className="mt-3/mt-4 font-display text-4xl sm:text-5xl ...">` pair repeated across all 6 homepage
  sections and, at a smaller scale, the 4 sub-sections of `/products/[slug]`. Takes `tone` (`light` /
  `dark` / `accent`, controls both the eyebrow default and the heading color), `size` (`md` text-3xl for
  the detail page / `lg` text-4xl sm:text-5xl for homepage, default), `spacing` (`sm` mt-3 default / `lg`
  mt-4) and `tight` (adds `leading-[1.05]`) to reproduce each section's existing spacing exactly - no
  visual change, just eliminated the copy-pasted eyebrow+h2 markup at 10 call sites.
- **Spec/production table mobile card layout** (M-3's real fix, not just the scrollbar-affordance patch
  from Phase 3) — `ProductionTable.tsx` now renders a stacked `<ul>` of cards below `sm` (Product name as
  heading, Size/Pcs-per-Mould/Pcs-per-Hour as a 3-column mini-grid) instead of relying on horizontal scroll
  of the `min-w-[520px]` table; the table itself is now `hidden sm:block`. Fixes the audit's actual
  complaint - "179px of the table is off-screen ... the hidden portion contains Pcs/Hour, the number a
  buyer is on the page to find" - by never letting it go off-screen instead of just making the scroll
  affordance visible. Also added `scope="col"` to the table's `<th>`s while in the file (A11y item from
  section 24, one attribute).
- **Radius scale** — audited all 8 `rounded-*` values in use. Only one real outlier: `rounded-md` on
  ManufacturingSection's "100% In-House Built" badge, the only badge/tag element in the codebase not using
  `rounded-full` like every other chip/tag — normalized to `rounded-full`. Left the other 7 values alone
  (`rounded-full`/`xl`/`lg`/`sm`/`3xl`/`2xl` map to genuinely different component families - pills, cards,
  thumbnails, tags, panels - and `rounded-[2px]` on `ClientLogosSection`'s Shree Cement logo replica is
  deliberate pixel-fidelity to a real logo mark, not a design-system value to conform).
- **Styled `not-found.tsx` / `error.tsx`** (`src/app/`, both new) — previously the Next.js default
  unstyled fallbacks (section 16 finding). Both use `Navbar`/`Footer` + the new `SectionHeader`/`Button`
  primitives; `error.tsx` is a client component with a `reset()` retry button (`Button` with no `href`).
- **Footer social icons removed** — LinkedIn/YouTube/Instagram all pointed at bare platform homepages
  (`https://linkedin.com`, etc.), not real profiles (flagged under L-12's cluster in the audit, never
  actually fixed). No real profile URLs on hand and CLAUDE.md forbids placeholder content, so removed the
  icons entirely per the audit's own suggested alternative ("point them at the real profiles or remove the
  icons until they exist"). Add them back with real URLs once the business has profiles to link.
- **Nav scroll-spy** (`Navbar.tsx`) — the 4 homepage anchor nav items (About Us, Manufacturing, Technology,
  Projects) never showed an active state while scrolling, only `pathname`-based routes did (audit: "dead
  active states on 4 items"). Added an `IntersectionObserver` over `#about`/`#manufacturing`/`#advantage`/
  `#industries`, tracked in `activeSection` state, only wired up when `pathname === "/"`.
- **Hero carousel keyboard + swipe support** (`Hero.tsx`) — added `ArrowLeft`/`ArrowRight` navigation
  (scoped to while the Hero section is in view, via `IntersectionObserver`, so it doesn't hijack arrow keys
  once the user scrolls past it) and touch-swipe on the slide media (50px threshold). The visual rail
  itself (numbered dots + single "next" arrow) was left untouched — a prev arrow already exists
  functionally via keyboard/swipe/clicking a dot directly, and redesigning that tightly-styled semicircle
  rail to add a visual prev arrow was out of scope for a functional-support pass.
- **`ClientLogosSection` rail arrows disabled at ends** — tracked `atStart`/`atEnd` off the track's
  `scrollLeft`/`scrollWidth`, arrows get `disabled` + `opacity-40 pointer-events-none` at each end (matches
  roadmap item 24, "disable rail arrows at their ends").
- Verified: `tsc --noEmit` clean, `npm run lint` zero warnings, `npm run build` passes. Manually checked in
  Chrome against `next start`: homepage (full page + scroll-spy while scrolled to Manufacturing), product
  detail page (desktop + 390px mobile card layout for the production table), `/products`, the 404 page,
  and the client-logos rail's disabled-at-start arrow.

**Found but explicitly left alone, needs your call:**
- **`/#resources` is a dead link.** The "Resources" nav item (`Navbar.tsx`) and a footer quick link both
  point at `/#resources`, but no `id="resources"` section exists anywhere - there's no Resources page or
  section built yet. This was flagged in the original audit (L-12's cluster) and never fixed. Fixing it
  either means building a real Resources section/page (a content/scope decision, not a UI cleanup) or
  removing the nav item - didn't want to unilaterally delete a nav item that might be an intentional
  placeholder for planned content. Surface this to the user before touching it.

## Not done — remaining

- **`#FFEE00` in `BrandLogo.tsx`** — deferred again this session. Ask the user whether the full-lockup
  logo's yellow should match `brand-yellow` or stay its own brand-identity color, then fix in whichever
  direction they pick.
- **`/#resources` dead link** — see above, needs a scope decision (build a Resources destination, or
  remove the nav item) before it can be fixed.
- **H-9** (asset purge / Cloudinary migration) — deferred again this session; images stay static/local
  until the database is configured, per the user. Do this one together once that's ready.
- All remaining L-findings not previously listed (none currently known - all 12 L-findings were closed in
  Phase 3), and anything in `docs/harvin-ui-audit-report.md` sections 24-25 not itemized across this doc.

## For a new session picking this up

1. Confirm current branch is `bugfix/critical-ui-audit-fixes` (`git branch --show-current`).
2. Confirm the changes above are still there (`git status --short`) unless the user has since committed -
   Phase 1 (`855a560`), Phase 2 (`337a45b`) and Phase 3 (`e357c07`) are already committed; M-12 and this
   session's roadmap-leftovers pass are not.
3. Ask the user whether to commit now.
4. Ask the user about the `BrandLogo.tsx` `#FFEE00` call and the `/#resources` dead link before touching
   either.
5. H-9 (asset purge + Cloudinary migration) - explicitly "do it together when the database is configured."
   Don't start without the user.
