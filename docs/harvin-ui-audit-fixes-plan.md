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

## Not done yet — Phase 2 (High Impact)

Not started. From the audit roadmap:
- H-3 — accessible text-yellow token (`~#9a5b06`) for yellow-on-light headings (currently 2.15:1/1.95:1)
- H-4 — mobile drawer doesn't render `item.children`; 5 product categories unreachable on mobile
- H-5 — `router.push` -> `router.replace` in `ProductFilters.tsx` debounced search (history-entry-per-keystroke)
- H-7 — 10 raw `material-symbols-outlined` spans bypass the `Icon` wrapper, announced as text by screen readers
- M-1, M-2, M-6, M-10, M-11 — products grid 80px misalignment, badge divider survives wrap, `ProductCard`
  has no hover/focus states, mobile toggle `aria-expanded` missing, no skip link
- M-9 — OG/Twitter/canonical/sitemap.ts/robots.ts/JSON-LD (all currently absent)

## Not done — Phases 3-5

Design-system token normalization (M-12), `Button`/`SectionHeader`/`Card` extraction, bringing the
homepage visual language to `/products` (M-5), real image gallery (M-4), spec table mobile card layout
(M-3), asset purge (H-9, 40MB unreferenced in `public/`), Cloudinary migration, all L-1 through L-12.
See `docs/harvin-ui-audit-report.md` sections 24-25 for the full itemized list.

## For a new session picking this up

1. Confirm current branch is `bugfix/critical-ui-audit-fixes` (`git branch --show-current`).
2. Confirm Phase 1 changes are still there and uncommitted (`git status --short` should show the same
   ~12 modified files + `src/components/ui/LazyVideo.tsx` untracked, unless the user has since committed).
3. Ask the user whether to commit Phase 1 now, and whether to proceed into Phase 2 — don't assume either.
4. If proceeding to Phase 2, re-read `docs/harvin-ui-audit-report.md` sections 5-6 (H-3 through M-12) for
   full finding detail — this plan doc only summarizes.
