# HARVIN INDUSTRY WEBSITE
# UI / UX / RESPONSIVENESS / PERFORMANCE AUDIT

**Audit date:** 2026-09-11
**Branch audited:** `feature/pixel-perfect-homepage` @ `be91661`
**Build audited:** production build (`next build` + `next start`), Next.js 16.3.4 / React 19.2.8
**Runtime environment:** Chrome via DevTools Protocol, localhost over HTTP/1.1, no network throttling unless stated
**Method:** source inspection + live runtime inspection (DOM geometry, Performance API, resource timing, accessibility tree, computed-style contrast sampling, keyboard traversal) at 320 / 375 / 390 / 768 / 1024 / 1440 / 1920 px
**Scope note:** no code was modified during this audit.

---

## 1. Executive Summary

The Harvin homepage is a genuinely good piece of visual design.
The Forum/Inter pairing, the yellow-on-near-black industrial palette, the angled wedge sections and the editorial section rhythm read as a considered, premium industrial brand rather than a template.
At 1440px, with a warm cache, it looks like a site a machine buyer would trust.

The problem is that most visitors will never see it.

The single most important finding in this audit is that the homepage ships roughly **24 MB of autoplaying, looping background video**, and that video reliably prevents the hero photograph - the LCP element and the first thing any visitor sees - from ever rendering.
This was reproduced on every clean load of the production build.
On a fully warmed image cache, **5 to 7 of the page's 17 images never load at all**, and the `load` event never fires, even after 90 seconds on the page.
The hero renders as a flat dark rectangle.

Behind that, two systemic issues run through the codebase.

The first is accessibility.
The site's primary conversion action - the "Request a Quote" pill, which appears five times on the homepage alone - renders white text on `#f59e0b` yellow at a measured **2.15:1** contrast ratio, against a WCAG AA requirement of 4.5:1.
The same 2.15:1 failure applies to the yellow half of nearly every section heading on the site.
The project's own `globals.css` comment states the rule correctly ("yellow fills take ink text"); the components do the opposite.

The second is design-system drift.
There is no shared Button, no radius scale and no single source of truth for colour.
The pill CTA is hand-rolled seven times, eight different border-radius values are in use, seven distinct yellows exist across tokens and CSS, four colour tokens are exact duplicates of four others, and the palettes documented in `CLAUDE.md` and `docs/harvin-industries-plan.md` share exactly one colour with the palette actually implemented.
`/products` and `/products/[slug]` read as a different product from the homepage.

The responsive engineering, by contrast, is solid.
**No horizontal overflow was found at any tested width from 320px to 1920px on any of the three built pages.**
The breakpoint strategy is coherent and the layouts genuinely adapt rather than merely shrink.
The defects found in the responsive pass are specific and local, not structural.

Fix the media strategy and the contrast tokens and this site moves from "unusable on a cold visit" to "strong", without touching the layout engineering.

**Overall score: 54 / 100.**

### Finding counts

| Severity | Count |
| --- | ---: |
| CRITICAL | 2 |
| HIGH | 9 |
| MEDIUM | 12 |
| LOW | 12 |
| ENHANCEMENT | 4 |

### Scope exclusion agreed before the audit

`/about`, `/contact`, `/privacy`, `/terms`, `/sitemap`, `/#quote` and `/#resources` are linked from the header and footer but do not exist and return 404.
Per direction given before this audit, these are recorded as **known, not-yet-built work** rather than as defects.
They are excluded from the severity counts above and from the scorecard.
They are listed for completeness in section 18 because they do affect any judgement of the site's current readiness to go live.

---

## 2. Website Architecture Overview

| Layer | Implementation | Notes |
| --- | --- | --- |
| Framework | Next.js 16.3.4, App Router, Turbopack | `AGENTS.md` correctly warns that this version diverges from older conventions |
| Language | TypeScript 5, `strict: true` | `tsc --noEmit` passes clean |
| UI runtime | React 19.2.8, Server Components by default | Only 4 files carry `"use client"` |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` | Tokens in `@theme inline` in `src/app/globals.css`; no `tailwind.config.ts` |
| Routing | 3 built routes | `/` (static), `/products` (dynamic), `/products/[slug]` (SSG, 5 paths) |
| Data | `src/data/products.ts`, static array, 5 machines | Prisma/Neon planned but not wired; types already shaped for the swap |
| Images | `next/image`, avif+webp, `qualities: [75, 85, 90]` | All assets local in `public/`, not Cloudinary as the project rules require |
| Fonts | `next/font/google` - Inter, Forum, Oswald | Self-hosted and preloaded correctly |
| Icons | Material Symbols Outlined via `<link>` stylesheet | `Icon` wrapper exists but is bypassed 10 times |
| Animation | CSS transitions only, no library | Plus 3 autoplaying `<video>` elements |
| State | URL query params (`?q=`, `?category=`) | No client state library; correct choice for this size |
| Auth / CMS | Not built | `/admin` planned only |
| Analytics | None | |
| Build output | 619 KB total client JS across 12 chunks | Reasonable; not a problem area |

### Route inventory

| Route | Render mode | Status | Client JS |
| --- | --- | --- | --- |
| `/` | Static | Built | `Hero`, `ManufacturingSection`, `ClientLogosSection`, `Navbar` |
| `/products` | Dynamic (searchParams) | Built | `ProductFilters`, `Navbar` |
| `/products/[slug]` | SSG, 5 paths | Built | `Navbar` only |
| `/_not-found` | Static | Default Next.js 404, unstyled | - |

### Component inventory

`src/components/` is correctly split by purpose per the project convention, with barrel files in each folder.

- `layout/` - `Navbar`, `Footer`, `BrandLogo`, `Logo`
- `ui/` - `Icon`, `IsometricLines`, `BrickWallPattern`
- `home/` - `Hero`, `AboutSnippet`, `LatestProducts`, `ManufacturingSection`, `AdvantageSection`, `IndustriesSection`, `CtaBanner`, `ClientLogosSection`, plus 3 unused legacy components
- `products/` - `ProductCard`, `ProductFilters`, `SpecTable`, `ProductionTable`, `FeatureGroups`

---

## 3. Overall Score

| Category | Weight | Score | Weighted | Reasoning |
| --- | ---: | ---: | ---: | --- |
| Visual / UI Quality | 15% | 68 | 10.2 | Homepage is distinctive and well-crafted. Deductions: `/products` is visually disconnected, the hero badge row breaks on wrap below 414px, and the products grid is 80px out of alignment with every other container at 1440px. |
| Responsive Design | 15% | 70 | 10.5 | Zero horizontal overflow at every width tested from 320 to 1920. Coherent breakpoints, real mobile layouts. Deductions: mobile loses an entire nav tier, the production table has no scroll affordance, the badge divider bug, the 1-item 3-column thumbnail grid. |
| UX | 15% | 62 | 9.3 | Purpose and primary CTA are immediately clear and the search/filter actually works well. Deductions: search traps the Back button, product cards have no interactive feedback at all, thumbnails and mould chips look clickable but are inert, no loading states anywhere. |
| Performance | 15% | 22 | 3.3 | The dominant failure. 24 MB homepage, 99.9% of it video; the LCP image does not paint; `load` never fires; 40 MB of unreferenced assets ship. Bundle size and CLS are genuinely fine, which is the only reason this is not lower. |
| Accessibility | 10% | 38 | 3.8 | Primary CTA at 2.15:1, heading accents at 2.15:1, focus indicator removed on the only input, 5 invisible tab stops, icon ligatures announced as text, no skip link, no reduced-motion support. Credit for correct landmarks, clean heading order and complete alt text. |
| Cross-browser Compatibility | 10% | 72 | 7.2 | No high-risk CSS. `clip-path`, `backdrop-filter`, `svh`, `-webkit-text-stroke` and `playsInline` are all broadly supported. Scored on implementation risk only - **not verified on real Safari, Firefox or Edge.** |
| Component / Design System Consistency | 10% | 42 | 4.2 | 4 duplicate colour tokens, 7 yellows, 8 radii, 3 mutually contradictory documented palettes, no Button primitive despite 7 copies of the same pill, the `Icon` wrapper bypassed 10 times, 4 dead components still exported. |
| Reliability / Error States | 5% | 55 | 2.75 | Empty state is present and well-written; 404 routing works; invalid query params degrade safely. No loading, error or broken-image states anywhere else. |
| SEO / Semantic HTML | 5% | 50 | 2.5 | Correct landmarks, clean h1-h2-h3 order, complete alt text, per-page metadata. Zero Open Graph, no canonical, no JSON-LD, no `robots.txt`, no `sitemap.xml`. |
| **Total** | **100%** | | **53.75** | **54 / 100** |

Scores are deliberately not rounded upward.
A site whose hero image does not render cannot score above the mid-50s regardless of how good the design is.

---

## 4. Critical Findings

## [C-1] 24 MB of autoplaying video prevents the hero image from ever rendering

**Severity:** CRITICAL
**Category:** Performance / Reliability / UX

**Location:**
- Page: `/`
- Components: `src/components/home/AboutSnippet.tsx:18-26`, `src/components/home/ManufacturingSection.tsx:145-153`, `src/components/home/Hero.tsx:70-77`
- Assets: `public/Harvin_animation_timeline.mp4` (12.0 MB), `public/harvin_animation.mp4` (11.3 MB)

**Problem:**
The homepage mounts three `<video autoPlay loop muted playsInline>` elements with no `preload` attribute and no lazy-mount gate.
They begin streaming immediately on page load and, because they loop, they never release their connections.
The result is that `next/image` requests queue behind them indefinitely.

**Evidence:**
Measured on the production build, mobile viewport, clean load:

- Total page transfer: **23,945 KB**, of which **23,930 KB (99.9%) is video**. All other resources combined account for 15 KB.
- With a cold image cache: **1 of 17 images loaded** after 30 seconds.
- With a fully pre-warmed image optimizer cache: **12 of 17 images loaded**; 5 never did, including all three hero slides.
- The hero request `GET /_next/image?url=%2Fhero_Image.webp&w=640&q=75` sat in `pending` state for the entire session while `Harvin_animation_timeline.mp4` and `harvin_animation.mp4` reported `readyState: 4` (fully buffered).
- `navigation.loadEventEnd` remained `0` and `document.readyState` remained `"interactive"` after 90 seconds. Chrome's 10s, 45s and 60s navigation timeouts were all exceeded.
- LCP resolved to the `<h1>` text element at 208 ms, not to the hero image, because the hero image never painted.
- By contrast, `/products` - which contains no video - navigated, loaded and rendered every image in under 5 seconds on the same server.
- The server is not the bottleneck: `curl` against the same server while the page was stalled returned the document in 7 ms and the hero image variant in 102 ms.

**User Impact:**
The first thing every visitor sees is a flat near-black rectangle where the hero photograph should be.
Product category cards and manufacturing process cards render as empty grey and black boxes.
On a metered mobile connection the visitor is charged for roughly 24 MB to see a page whose photographs never arrive.
At a realistic 4G throughput of about 5 Mbps, the two videos alone represent roughly 38 seconds of transfer before anything else can compete.

**Root Cause:**
Two compounding causes.

1. **Payload.** The videos are 1080p H.264 at 9.52 Mbps and 10.08 Mbps for 10-second decorative loops, and both still carry an AAC audio track despite being rendered `muted`. A reasonable delivery bitrate for a muted decorative 1080p loop is 1.5-2.5 Mbps, so these are 4-5x oversized.
2. **Concurrency.** Three simultaneous looping media streams saturate the browser's six-connection-per-origin limit on HTTP/1.1, so image requests are never scheduled.

**Production caveat, stated explicitly:**
The *total stall* is amplified by HTTP/1.1, which is what `next start` serves locally.
On Vercel the site is served over HTTP/2 or HTTP/3, where multiplexing removes the six-connection ceiling, so the images would most likely eventually arrive.
**The bandwidth contention does not go away.**
24 MB of video still competes with the LCP image for the visitor's actual bandwidth, and on mobile that is the whole problem.
The precise production behaviour is a **potential issue requiring runtime verification on the deployed site**; the payload problem below is confirmed and unconditional.

**Recommended Fix:**

1. Re-encode both videos for web delivery: 1080p H.264 at 2 Mbps with `-an` to strip the unused audio track, plus a WebM/VP9 or AV1 alternate source. Target under 3 MB each. Expected saving: roughly 18 MB, about 75%.
2. Set `preload="none"` on every `<video>` and mount the video only when it enters the viewport, via `IntersectionObserver`, keeping the existing `poster` as the pre-mount visual.
3. Serve the `poster` images through `next/image` rather than as raw `public/` paths. `hero-plant-4k.webp` is currently fetched unoptimized at 1.1 MB.
4. Add `fetchPriority="high"` to the hero image and confirm `priority` survives to the rendered `<img>`.
5. Consider dropping to one video. Two full-width autoplaying reels on one page is more motion than the content justifies.

**Priority:** P0
**Effort:** Medium
**Verification:** Load `/` with an empty cache on a Fast 4G throttle profile. Assert that the hero `<img>` reports `complete === true` and `naturalWidth > 0` within 2.5 s, that `navigation.loadEventEnd > 0`, that LCP resolves to the hero image and is under 2.5 s, and that total transfer is under 4 MB.

---

## [C-2] Primary "Request a Quote" CTA fails WCAG AA contrast at 2.15:1

**Severity:** CRITICAL
**Category:** Accessibility

**Location:**
- Every page. Five instances on `/` alone.
- `src/app/globals.css:105-119` (`.bg-rusted-yellow`)
- `src/components/home/Hero.tsx:116`, `src/components/layout/Navbar.tsx:219`, `src/components/layout/Footer.tsx:174`, `src/components/home/CtaBanner.tsx:39`, `src/components/home/AboutSnippet.tsx:96`, `src/components/home/ManufacturingSection.tsx:111`, `src/app/products/[slug]/page.tsx:137`

**Problem:**
The pill CTA renders `text-white` on a yellow fill whose base colour is `#f59e0b`.
Measured contrast ratio: **2.15:1**. WCAG 2.2 AA requires 4.5:1 for body-size text.
This is the site's single conversion action.

**Evidence:**
Computed-style sampling in the live page returned, for each of the five homepage instances:
`color: rgb(255,255,255)`, effective background `rgb(245,158,11)`, ratio **2.15**, required **4.5**, font-size 17 px.
The same measurement flags "More About Us" and "See Our Manufacturing", which share the class.

**The codebase already documents the correct rule and then breaks it.**
`src/app/globals.css:3-6` states: *"Yellow is fill-only: it never carries text on a light background (1.8:1) ... yellow fills take ink text."*
Every button does the opposite.

**User Impact:**
Low-vision users, users with colour vision deficiency, and every user in outdoor daylight on a phone - the exact context for a construction-equipment buyer - struggle to read the call to action.
The `text-shadow: 0 1px 2px rgba(0,0,0,0.5)` in `.bg-rusted-yellow` improves perceived legibility slightly but contributes nothing to the measured ratio and does not satisfy the criterion.

**Root Cause:**
The pill style is hand-copied across seven call sites rather than expressed as one component, so the colour pairing was never decided in one place and the documented rule in `globals.css` was never enforced anywhere.

**Recommended Fix:**
Switch the pill's text colour to the ink token, exactly as `globals.css` already prescribes.
`#121417` on `#f59e0b` measures **9.1:1**, comfortably AA and AAA.
Remove the now-unneeded `text-shadow`.
Extract the result into a single `<Button variant="primary">` in `src/components/ui/` and replace all seven copies.
This fix and the extraction should land together, otherwise the next copy reintroduces the bug.

**Priority:** P0
**Effort:** Low
**Verification:** Sample computed colours on every `.bg-rusted-yellow` instance and assert a ratio of at least 4.5:1. Re-run an automated axe or Lighthouse accessibility pass and confirm zero contrast violations on the CTA.

---

## 5. High-Priority Findings

## [H-1] The 12 MB timeline video is downloaded twice on every homepage load

**Severity:** HIGH
**Category:** Performance

**Location:** `src/components/home/AboutSnippet.tsx:62-113`

**Problem:**
`FacilityVisual()` is rendered twice - once in the `hidden lg:block` desktop wrapper at line 66-68, and again in the `lg:hidden` mobile wrapper at line 107-109.
Both are always present in the DOM; only one is visible at a time, hidden with `display: none`.
A `<video>` inside a `display: none` subtree still downloads its source.

**Evidence:**
Live resource timing shows three `<video>` elements on the page and **two separate network requests for `Harvin_animation_timeline.mp4`** (`reqid=150` and `reqid=151`), both returning `206`.
`document.querySelectorAll('video')` returns three elements, two of which report `currentSrc` ending in `Harvin_animation_timeline.mp4`.

**User Impact:**
12 MB of wholly wasted transfer on every single visit, at every viewport, on top of the 12 MB that is at least nominally in use.
This is roughly half of the homepage's total weight.

**Root Cause:**
The desktop/mobile variants are handled by rendering both and hiding one with CSS, rather than by rendering one instance into a responsive container.

**Recommended Fix:**
Render `FacilityVisual` once.
The existing markup can be restructured so a single instance sits in a container that is absolutely positioned at `lg` and in normal flow below `lg`, which removes the duplicate entirely.
If the two layouts genuinely cannot be unified, gate the mount on a media query in a client component so only one `<video>` is ever created.

**Priority:** P0
**Effort:** Low
**Verification:** Load `/` and assert `document.querySelectorAll('video').length === 2`, and that resource timing contains exactly one entry per distinct `.mp4` URL.

---

## [H-2] Collapsed Products dropdown keeps five links in the keyboard tab order

**Severity:** HIGH
**Category:** Accessibility

**Location:** `src/components/layout/Navbar.tsx:118-148`

**Problem:**
The dropdown is collapsed visually with `grid-rows-[0fr]`, `opacity-0`, `pointer-events-none` and `overflow-hidden`.
None of those remove an element from the accessibility tree or the tab order.
The five category links stay focusable while the menu is shut.

**Evidence:**
With `aria-expanded="false"` and the wrapper computing to `opacity: 0`, `height: 0px`, `pointer-events: none`, all five links still report `tabIndex >= 0` and `display !== "none"`.
Driving focus forward from the "Products" button lands on five consecutive elements - Fly Ash Brick Machines, Concrete Block Machines, Paver Block Machines, Automatic Plant Solutions, Material Handling Equipment - each with `parentOpacity: "0"`.

Additional gaps on the same control:
- No `aria-haspopup`, no `aria-controls`.
- No `Escape` handler.
- The menu opens on hover and on click but **not on keyboard focus**, so a keyboard user cannot open it at all - they can only tab blindly through its invisible contents.
- No arrow-key navigation between items.

**User Impact:**
A keyboard user tabbing across the header hits five stops where the focus ring is invisible and nothing on screen changes.
It reads as a broken or frozen page.
A screen-reader user is offered five menu items that are supposedly hidden.

**Root Cause:**
Visual hiding was implemented with opacity and grid-row collapse for the animation, without a corresponding change to focusability.

**Recommended Fix:**
Add `inert` to the dropdown wrapper while closed - it removes the subtree from both the tab order and the accessibility tree in one attribute and is supported across all current target browsers.
Add `aria-haspopup="menu"` and `aria-controls` pointing at the panel id.
Open the panel on `focus` within the trigger as well as hover and click, close it on `Escape` and return focus to the trigger.

**Priority:** P0
**Effort:** Low
**Verification:** With the menu closed, tab from the "Products" button and assert the next focused element is the "Manufacturing" link. Open with `Enter`, close with `Escape`, and confirm focus returns to the trigger.

---

## [H-3] Yellow heading accent fails contrast on every light section

**Severity:** HIGH
**Category:** Accessibility / UI

**Location:**
- `src/components/home/AboutSnippet.tsx:82`, `LatestProducts.tsx:75`, `ManufacturingSection.tsx:54`, `IndustriesSection.tsx:39`, `ClientLogosSection.tsx:120`
- `src/app/products/page.tsx:59`

**Problem:**
Every section heading is split into a dark half and a `text-brand-yellow` half.
The yellow half is `#f59e0b` on white or on `#f4f4f2`, which fails the 3:1 large-text minimum.

**Evidence:**
Measured, at 36 px:

| Text | Foreground | Background | Ratio | Required |
| --- | --- | --- | ---: | ---: |
| "a Better Tomorrow" | `#f59e0b` | `#ffffff` | 2.15 | 3.0 |
| "Possibilities" | `#f59e0b` | `#ffffff` | 2.15 | 3.0 |
| "Every Part" | `#f59e0b` | `#ffffff` | 2.15 | 3.0 |
| "Borders" | `#f59e0b` | `#ffffff` | 2.15 | 3.0 |
| "Industries" | `#f59e0b` | `#f4f4f2` | 1.95 | 3.0 |

Also measured failing: "View All Products" at `#d97706` on white, **3.19:1** at 12 px against a 4.5:1 requirement, and the "Industries We Serve" eyebrow at **4.39:1** against 4.5:1.

**User Impact:**
Roughly half of every section heading on the site is hard to read for low-vision users.
Because the *meaning* of the heading is split across the two halves, losing the yellow half loses the point of the sentence.

**Root Cause:**
`--color-brand-accent` (`#d97706`, 3.2:1 on white) was defined precisely for this purpose and is documented as such in `globals.css`, but the components reach for `brand-yellow` instead.

**Recommended Fix:**
Introduce a dedicated `--color-brand-accent-text` at around `#9a5b06`, which measures 5.1:1 on white and 4.9:1 on `#f4f4f2`, and use it for all yellow text on light backgrounds.
Keep `#f59e0b` for fills, rules and icons, where the 3:1 non-text threshold applies and is met.
On dark sections `#f59e0b` on `#121417` measures 8.9:1 and needs no change.

**Priority:** P1
**Effort:** Low
**Verification:** Sample every `.text-brand-yellow` node against its resolved background and assert at least 3:1 for text at or above 24 px and 4.5:1 below it.

---

## [H-4] Mobile navigation silently drops an entire tier of the site

**Severity:** HIGH
**Category:** Navigation / Mobile UX

**Location:** `src/components/layout/Navbar.tsx:202-229`

**Problem:**
The mobile drawer maps `NAV_ITEMS` and renders only `item.label`.
It never reads `item.children`.
The five product-category destinations exposed in the desktop dropdown have no mobile equivalent.

**Evidence:**
With the drawer open at 375px, it contains 9 links.
A search for "Fly Ash" among them returns nothing.
The desktop header exposes 14 destinations; mobile exposes 9.

**User Impact:**
A phone visitor cannot navigate to Fly Ash Brick Machines, Concrete Block Machines, Paver Block Machines, Automatic Plant Solutions or Material Handling Equipment from the menu.
They can only reach the flat `/products` listing.
For an industrial catalogue whose buyers overwhelmingly browse on phones, this removes the site's primary product-discovery path on its primary device.

**Root Cause:**
The mobile drawer was written as a flat list before the desktop dropdown gained children, and was never revisited.

**Recommended Fix:**
Render `item.children` in the drawer as an indented sub-list under Products, or as a disclosure that expands in place.
The existing accordion pattern already suits this.
Drive both menus from the same `NAV_ITEMS` traversal so they cannot diverge again.

**Priority:** P1
**Effort:** Low
**Verification:** Open the drawer at 375px and assert all 14 desktop destinations are reachable.

---

## [H-5] Product search pushes a browser history entry per keystroke

**Severity:** HIGH
**Category:** UX / Navigation

**Location:** `src/components/products/ProductFilters.tsx:26-40`

**Problem:**
`update()` calls `router.push()`.
It is invoked from a 300 ms debounce on every change to the query.
Typing at a normal pace produces one history entry per character.

**Evidence:**
Live test on `/products`: typing `p` → `pa` → `pav` → `pave` → `paver` with the debounce allowed to fire each time increased `history.length` from 14 to 19.
**Five characters produced five history entries.**

**User Impact:**
A visitor who types a ten-character search term and then presses Back expects to return to where they came from.
Instead they step backwards through their own typing one character at a time and need eleven presses to escape.
On Android, where Back is a system gesture used constantly, this makes the page feel broken and is a common cause of abandonment.

**Root Cause:**
`push` was used where `replace` is correct.
Filter state is a view of the current page, not a distinct navigation destination.

**Recommended Fix:**
Use `router.replace()` for the debounced search updates.
Category toggles are a defensible `push`, since they are deliberate discrete actions, but `replace` is the safer default for both.
The "Clear all filters" handler at line 87 has the same issue.

**Priority:** P1
**Effort:** Low
**Verification:** Record `history.length`, type a 10-character query, and assert the length is unchanged. Press Back once and confirm the browser leaves `/products`.

---

## [H-6] Focus indicator is removed from the only input on the site

**Severity:** HIGH
**Category:** Accessibility

**Location:** `src/components/products/ProductFilters.tsx:56`

**Problem:**
The search input carries `focus:outline-none`, and the only replacement is `focus:border-brand-brick`.

**Evidence:**
With the input focused, computed `outline-style` is `none`.
The substitute indicator is a 1 px border transition from `#e5e7eb` to `#f59e0b`.
`#f59e0b` against the white input fill measures **2.15:1**, below the 3:1 that WCAG 2.2 SC 1.4.11 requires for the boundary of a user-interface component.
This is the only `focus:` rule in the entire `src/` tree - every other interactive element falls back to the browser default ring, which is acceptable but unstyled and inconsistent against the dark navbar.

**User Impact:**
Keyboard users lose any reliable signal that the search field is focused.

**Root Cause:**
`outline-none` applied for visual tidiness without an equivalent-strength replacement.

**Recommended Fix:**
Replace with a project-wide `:focus-visible` token - a 2 px ring in `--color-brand-accent` at a 2 px offset - defined once in `globals.css` and applied to every interactive element.
Remove the bare `focus:outline-none`.

**Priority:** P1
**Effort:** Low
**Verification:** Tab to the input and confirm a visible ring of at least 2 px measuring 3:1 or better against both the input fill and the page background. Confirm the same ring appears on nav links, buttons and cards.

---

## [H-7] Icon ligature names are announced to screen readers as text

**Severity:** HIGH
**Category:** Accessibility

**Location:**
- `src/components/layout/Footer.tsx:35, 44, 145, 151, 159`
- `src/components/home/Hero.tsx:133`, `AboutSnippet.tsx:45`, `LatestProducts.tsx:191`, `AdvantageSection.tsx:79`, `IndustriesSection.tsx:57`

**Problem:**
`src/components/ui/Icon.tsx` correctly sets `aria-hidden="true"`.
Ten call sites bypass it and write `<span className="material-symbols-outlined">` directly with no `aria-hidden`.
Material Symbols renders by ligature, so the raw ligature name remains in the accessibility tree as text.

**Evidence:**
The captured accessibility tree for `/products/hi-1500` contains, inside `contentinfo`:
`StaticText "smart_display"`, `StaticText "photo_camera"`, `StaticText "location_on"`, `StaticText "call"`, `StaticText "mail"`.
The YouTube link's computed name is "YouTube smart_display".

**User Impact:**
A screen-reader user hears the footer contact block as "location_on Ahmedabad, Gujarat, India", "call +91 98985 75358", "mail info@harvinindustries.com".
It is noisy, confusing and reads as a bug.

**Root Cause:**
A correct `Icon` primitive exists but nothing enforces its use.

**Recommended Fix:**
Replace all ten raw spans with `<Icon name="..." />`.
`Icon` needs to accept a style prop or size variants first, because several call sites set `fontSize` inline - which is itself a symptom of the same gap.
Add a lint rule forbidding the raw `material-symbols-outlined` class outside `ui/Icon.tsx`.

**Priority:** P1
**Effort:** Low
**Verification:** Inspect the accessibility tree for `/` and `/products/hi-1500` and assert no `StaticText` node matches a Material Symbols ligature name.

---

## [H-8] Three autoplaying loops with no reduced-motion support and no way to stop them

**Severity:** HIGH
**Category:** Accessibility / Motion

**Location:** `src/components/home/AboutSnippet.tsx:18-26`, `ManufacturingSection.tsx:145-153`, plus `animate-pulse` at `AboutSnippet.tsx:30` and `ManufacturingSection.tsx:160`

**Problem:**
Two full-width video reels autoplay and loop indefinitely.
Neither exposes `controls`, a pause affordance, or any way for the user to stop the motion.
`prefers-reduced-motion` is not honoured anywhere in the codebase.

**Evidence:**
`grep -rn "reduced-motion\|motion-reduce" src/` returns no matches.
Both `<video>` elements carry `autoPlay loop` and omit `controls`.
Two `animate-pulse` indicators run continuously alongside them.
Hover transforms include `group-hover:scale-110` on images and `hover:-translate-y-1` on cards.

**User Impact:**
Users with vestibular disorders, migraine triggers or attention-related conditions have no escape from continuous large-area motion.
WCAG 2.2 SC 2.2.2 requires a mechanism to pause any automatically-moving content that runs longer than five seconds; these loop forever.

**Root Cause:**
Motion was added for visual impact without a reduced-motion pathway.

**Recommended Fix:**
Add a global block in `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

In the video components, read the media query in a client component and, when reduced motion is preferred, render the `poster` image instead of mounting the `<video>` at all.
This also removes the 24 MB download for those users, so it pairs naturally with the C-1 fix.
Add a visible pause control to the large manufacturing reel.

**Priority:** P1
**Effort:** Low
**Verification:** Enable "Reduce motion" at OS level, load `/`, and assert no `<video>` is mounted, no `animate-pulse` runs, and transitions are effectively instant.

---

## [H-9] 40 MB of unreferenced assets are committed and deployed

**Severity:** HIGH
**Category:** Performance / Code Quality

**Location:** `public/images/brochure/**`, `public/images/products/**`, plus several root-level files

**Problem:**
`public/` totals **79 MB**.
Cross-referencing every asset path against `src/` shows **120 files totalling 40 MB are referenced nowhere in the codebase** - raw brochure scans (`brochure/raw/*.png`, up to 3.8 MB each), full-page brochure renders (`brochure/pages/page-01..17.png`), unused factory photography and unused product photos.

This also breaks the project's own rule in `CLAUDE.md`:
*"Product images/brochures are never committed to the repo - Cloudinary only."*

**Evidence:**
`du -sh public` → 79 MB.
Scripted reverse-reference check → 120 unreferenced files, 40 MB.
Largest single offender: `public/images/brochure/raw/img-010.png` at 3.8 MB.

**User Impact:**
No direct runtime impact - unreferenced files are not requested by the browser.
The cost falls on deployment size, Vercel build and bandwidth quota, repository clone time for every developer, and the risk that an unoptimized 3.8 MB PNG is casually referenced later.

**Root Cause:**
Brochure extraction output was committed wholesale rather than curated, and the Cloudinary migration in the plan has not happened.

**Recommended Fix:**
Move brochure source material out of `public/` into either Cloudinary, as the project rules require, or an ignored working directory alongside `Harvin_brochures/`.
Keep only the assets actually referenced by `src/`.
Add a CI check that fails when an unreferenced file appears under `public/images/`.

**Priority:** P2
**Effort:** Medium
**Verification:** Re-run the reverse-reference check and assert zero unreferenced files. Confirm `du -sh public` is under 10 MB after the video re-encode in C-1.

---

## 6. Medium-Priority Findings

## [M-1] Products grid is 80px out of alignment with every other container

**Severity:** MEDIUM
**Category:** UI / Pixel-perfect

**Location:** `src/app/products/page.tsx:68`

**Problem:**
The filter-and-grid section uses `max-w-8xl` (90 rem / 1440 px).
The navbar, the page hero directly above it and the footer directly below all use `max-w-7xl` (80 rem / 1280 px).

**Evidence:**
Measured at 1440px on `/products`:

| Element | Left edge | Right edge | Width |
| --- | ---: | ---: | ---: |
| Navbar container | 80 | 1360 | 1280 |
| Page hero container | 80 | 1360 | 1280 |
| **Filter + grid container** | **0** | **1440** | **1440** |
| Footer container | 80 | 1360 | 1280 |

At exactly 1440px the `max-w-8xl` container equals the viewport, so it receives no centring margin and its content sits 80 px to the left of everything else on the page.
Visible in the captured screenshot: the search field starts at x≈32 while the heading above it starts at x≈112.

**User Impact:**
The page visibly loses its spine at the most common desktop width.
The heading, the filters and the footer no longer share a left edge.

**Root Cause:**
`--container-8xl: 90rem` was added to `globals.css:48` and applied to one section only, breaking the otherwise consistent `max-w-7xl` grid.

**Recommended Fix:**
Change `max-w-8xl` to `max-w-7xl` on line 68 so the grid aligns with the rest of the page.
If the wider measure is genuinely wanted for a three-column catalogue, apply it to the hero and footer too so the whole page shares one measure.
Delete the `--container-8xl` token if it goes unused.

**Priority:** P2
**Effort:** Low
**Verification:** At 1280, 1440, 1920 and 2560 px, assert the left edge of the filter sidebar equals the left edge of the page `<h1>` and of the footer's first column.

---

## [M-2] Hero trust badges keep their divider rule after wrapping

**Severity:** MEDIUM
**Category:** Responsive / UI

**Location:** `src/components/home/Hero.tsx:126-143`

**Problem:**
The divider is applied with `idx > 0 ? "border-l border-white/20 pl-6 sm:pl-10" : ""`.
That is an index test, not a position test.
When the flex row wraps, the first badge on the second row is still index 2, so it keeps a left border and left padding with nothing to its left.

**Evidence:**
Measured at 390px: the badges occupy **two rows**.
Row 1 holds items at left 16 and left 153; row 2 holds a single item at left 16 with `border-left-width: 1px` and `padding-left: 24px`.
The same wrap occurs at 320 and 375 px.
Visible in the 320px screenshot as a stray vertical rule floating at the left edge beside "BUILT / FOR LONG TERM".

**User Impact:**
A visible rendering defect in the hero, on the most common phone widths, at the exact moment the site is trying to establish credibility.

**Root Cause:**
Separator styling keyed to array index rather than to layout position.

**Recommended Fix:**
Replace the wrapping flex row with a divider that cannot survive a wrap.
Either lay the badges out in a `grid grid-cols-1 sm:grid-cols-3` with `divide-x` applied only at `sm` and above, or stack them vertically below `sm` with horizontal rules between them.
The CSS-only alternative is to draw the separator as a `::before` on the badge and suppress it when the element is first in its row, which needs no JavaScript but is harder to read.

**Priority:** P2
**Effort:** Low
**Verification:** At 320, 375, 390 and 414 px, assert no badge whose `left` equals the row's minimum `left` has a non-zero `border-left-width`.

---

## [M-3] Horizontally scrolling spec table has no scrollbar and no affordance

**Severity:** MEDIUM
**Category:** Mobile UX / Responsive

**Location:** `src/components/products/ProductionTable.tsx:22-23`, in combination with `src/app/globals.css:56-65`

**Problem:**
The production table is `min-w-[520px]` inside an `overflow-x-auto` wrapper.
`globals.css` hides scrollbars globally with `* { scrollbar-width: none }` and `*::-webkit-scrollbar { display: none }`.
The result is a scroll container with no scrollbar, no gradient edge, no shadow and no instruction.

**Evidence:**
Measured on `/products/hi-1500` at 375px: the inner scroller reports `scrollWidth: 520`, `clientWidth: 341`, `scrollbar-width: none`.
**179 px of the table is off-screen**, and the hidden portion contains the "Pcs / Hour" column - the single number a buyer is on that page to find.

**User Impact:**
On a phone, the most commercially important figure in the machine's spec sheet is invisible and there is no visual cue that swiping will reveal it.
The comment in `globals.css` explicitly anticipates this case - *"including inner scroll containers (e.g. spec tables)"* - so the trade-off was made knowingly, but the affordance was never added to compensate.

**Root Cause:**
A global cosmetic scrollbar hide applied with `*`, which also strips the affordance from functional inner scrollers.

**Recommended Fix:**
Narrow the global rule to `html, body` so inner scrollers keep their native scrollbars.
Alternatively keep the global hide and give the table an explicit affordance: a right-edge fade mask that disappears at `scrollLeft === scrollWidth - clientWidth`, or a card-per-row layout below `sm` that avoids horizontal scrolling entirely.
The card layout is the better answer for a four-column spec table on a 375px screen.

**Priority:** P2
**Effort:** Medium
**Verification:** At 320 and 375 px, confirm the "Pcs / Hour" column is either reachable with a visible cue present, or rendered without horizontal scrolling.

---

## [M-4] Product detail thumbnail strip is a three-column grid holding one item

**Severity:** MEDIUM
**Category:** UI / UX

**Location:** `src/app/products/[slug]/page.tsx:78-95`

**Problem:**
`product.images.slice(1)` is rendered into `grid grid-cols-3`.
Every product in `src/data/products.ts` has either one or two images, so the grid holds at most one child.

**Evidence:**
Measured at 375px on `/products/hi-1500`: the grid is 343 px wide, contains 1 child of 104 px.
**239 px, or 70% of the row, is empty.**
Confirmed at 1440px in the full-page screenshot as a single small thumbnail adrift under a large main image.

A second, related problem: the thumbnails are inert.
They are `<div>` wrappers around `<Image>` with no click handler.
They look exactly like a gallery selector and do nothing.

**User Impact:**
The detail page's most prominent module looks unfinished.
Users click the thumbnail expecting the main image to change and get no response, which reads as a broken page.

**Root Cause:**
A grid sized for a gallery that the data has never populated, and a gallery interaction that was never implemented.

**Recommended Fix:**
Either make it a real gallery - a client component where clicking a thumbnail swaps the main image, with `aria-selected` state and keyboard support - or drop the thumbnail row when `images.length < 3` and let the main image use the full column.
Given the data currently holds two images per product, the honest fix is a simple two-up layout or a real gallery.

**Priority:** P2
**Effort:** Low to Medium
**Verification:** Render every product at 375, 768 and 1440 px and confirm no row is more than 40% empty, and that anything that looks selectable responds to click and keyboard.

---

## [M-5] `/products` and the homepage read as two different websites

**Severity:** MEDIUM
**Category:** UI Consistency / Design System

**Location:** `src/app/products/page.tsx`, `src/app/products/[slug]/page.tsx`, `src/components/products/*`

**Problem:**
The homepage establishes a strong visual language: a yellow tick plus letter-spaced eyebrow above every section heading, split dark/yellow display headings, angled wedge dividers, dark full-bleed bands, hover states with corner marks and watermark numerals, cards with `rounded-sm` and coloured hover borders.
Almost none of it carries into the catalogue pages.

**Evidence:**
Side-by-side comparison of the captured screenshots:

| Element | Homepage | `/products` and detail |
| --- | --- | --- |
| Section eyebrow | Yellow tick + tracked caps, on every section | Only on the page hero; absent from every section below |
| Heading treatment | Split dark/yellow display | Plain `text-brand-ink`, no accent |
| Card radius | `rounded-sm`, `rounded-2xl`, `rounded-3xl` | `rounded-xl` |
| Card hover | Border shift, lift, image zoom, corner marks | **None at all** |
| Section background | Alternating white / `#f4f4f2` / dark bands | Uniform white throughout |
| Dividers | Angled wedges and notches | None |

`ProductCard` is the clearest case - `className="rounded-xl border border-brand-border bg-brand-surface p-6"` with no `hover:`, no `transition`, no `group`, no focus style, on an element that is a `<Link>`.

**User Impact:**
A visitor who clicks "Explore Our Machines" leaves a rich, branded page and lands on something that looks like an unstyled scaffold.
On the page where purchase intent is highest, the brand evaporates and the cards give no feedback that they are clickable.

**Root Cause:**
The catalogue pages were built before the homepage redesign (commits `c6ba84d` through `be91661` are all homepage work) and were never brought forward.

**Recommended Fix:**
Extract the homepage's section-header pattern, card pattern and hover vocabulary into shared components in `ui/`, then apply them across `/products` and `/products/[slug]`.
At minimum, and as an immediate improvement: give `ProductCard` the hover and focus treatment the homepage category cards already have.

**Priority:** P2
**Effort:** Medium
**Verification:** Screenshot `/` and `/products` side by side and confirm shared heading, card, radius and hover treatments.

---

## [M-6] `ProductCard` has no hover, focus or active state

**Severity:** MEDIUM
**Category:** Interaction / Accessibility

**Location:** `src/components/products/ProductCard.tsx:16-19`

**Problem:**
The card is a `<Link>` wrapping an image, three lines of text and a "View details" affordance, styled with a single static class string.
It has no `hover:`, no `focus-visible:`, no `transition` and no `group`.

**Evidence:**
`className="rounded-xl border border-brand-border bg-brand-surface p-6"` - the complete styling.
Used in two places: the `/products` grid and the "You may also need" block on every detail page.
Compare `LatestProducts.tsx:102`, where the equivalent homepage card carries `group ... transition-colors duration-300 hover:border-brand-accent/40` plus an animated arrow.

**User Impact:**
The primary catalogue browsing surface gives no feedback on hover, so the cards do not read as clickable.
Keyboard users get only the browser default ring on a large card, with no indication of which part is actionable.

**Root Cause:**
Same as M-5 - written before the interaction vocabulary existed, never revisited.

**Recommended Fix:**
Apply the homepage card's hover treatment: `group`, border transition to `brand-accent`, a subtle lift, arrow translate on the "View details" affordance, and an explicit `focus-visible` ring from the token introduced in H-6.

**Priority:** P2
**Effort:** Low
**Verification:** Hover and tab to each card and confirm a visible state change in both cases.

---

## [M-7] Videos are served with `Cache-Control: max-age=0`

**Severity:** MEDIUM
**Category:** Performance / Caching

**Problem:**
Files served from `public/` receive `Cache-Control: public, max-age=0`, so the browser must revalidate on every navigation.

**Evidence:**
`curl -I http://localhost:3100/harvin_animation.mp4` →
`Cache-Control: public, max-age=0`, `Content-Length: 11899427`, `Accept-Ranges: bytes`.
By comparison `/_next/image` responses carry `Cache-Control: public, max-age=14400, must-revalidate`.
Observed repeat requests do return `304`, so the 11.3 MB body is not re-sent - but three blocking round-trips are still incurred on every page view before playback can resume.

**User Impact:**
Three unnecessary revalidation round-trips per navigation, on high-latency mobile connections, for assets that never change.

**Root Cause:**
Next.js does not fingerprint files in `public/`, so it cannot safely apply a long max-age.

**Recommended Fix:**
After the re-encode in C-1, serve the videos from a fingerprinted path or add an explicit long-lived `Cache-Control` header for `/*.mp4` via `next.config.ts` `headers()`, with a content hash in the filename so cache-busting stays possible.

**Priority:** P2
**Effort:** Low
**Verification:** Re-request each video after a full navigation and confirm it is served from cache without a network round-trip.

---

## [M-8] Decorative videos carry an unused audio track and a 4-5x oversized bitrate

**Severity:** MEDIUM
**Category:** Performance / Media

**Evidence:**
`ffprobe` on both files:

| File | Resolution | Codec | Duration | Bitrate | Size | Audio |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `harvin_animation.mp4` | 1920x1080 | h264 | 10.0 s | **9.52 Mbps** | 11.3 MB | AAC present |
| `Harvin_animation_timeline.mp4` | 1920x1080 | h264 | 10.0 s | **10.08 Mbps** | 12.0 MB | AAC present |

Both are rendered `muted`, so the AAC track is downloaded and decoded and can never be heard.
A reasonable delivery bitrate for a muted decorative 1080p loop is 1.5-2.5 Mbps.

**Recommended Fix:**
`ffmpeg -i in.mp4 -an -c:v libx264 -b:v 2M -profile:v high -movflags +faststart out.mp4`, plus a VP9 or AV1 alternate `<source>`.
`-movflags +faststart` matters: it moves the moov atom to the front so playback can begin before the file is fully buffered.
Expected result: roughly 2.5 MB per file, an 18 MB saving across the page.

**Priority:** P1
**Effort:** Low
**Verification:** `ffprobe` reports no audio stream and a bitrate at or below 2.5 Mbps; both files under 3 MB.

---

## [M-9] No Open Graph, canonical, structured data, `robots.txt` or `sitemap.xml`

**Severity:** MEDIUM
**Category:** SEO

**Evidence:**
Live inspection of `/`:
- `meta[property^="og:"]` and `meta[name^="twitter:"]` → **0 elements**
- `link[rel=canonical]` → **absent**
- `script[type="application/ld+json"]` → **0 elements**

Endpoint checks: `/robots.txt` → **404**, `/sitemap.xml` → **404**, `/llms.txt` → **404**.
All three are specified in `docs/harvin-industries-plan.md` section 1, as is `Organization`, `Product`, `FAQPage` and `BreadcrumbList` JSON-LD.

What *is* present and correct: per-page `title` and `description` via `generateMetadata`, a clean single-`h1` heading hierarchy with no skipped levels, complete `alt` text on every image, and correct `lang="en"`.

**User Impact:**
Any share of a Harvin link on WhatsApp, LinkedIn or a B2B marketplace renders as a bare URL with no image, title card or description.
For an Indian industrial manufacturer where WhatsApp sharing is a primary B2B channel, this is a direct commercial cost.
Without `Product` structured data the machines cannot surface in rich results.

**Recommended Fix:**
Add `openGraph` and `twitter` blocks to the root `metadata` export and to each `generateMetadata`, including a 1200x630 OG image.
Add `metadataBase` plus `alternates.canonical`.
Add `app/sitemap.ts` and `app/robots.ts` - both are single small files in the App Router.
Add `Organization` JSON-LD in the root layout and `Product` plus `BreadcrumbList` on the detail pages.

**Priority:** P2
**Effort:** Low
**Verification:** Validate a detail URL through a link-preview debugger and a structured-data validator; confirm both endpoints return 200.

---

## [M-10] Mobile menu toggle exposes no state to assistive technology

**Severity:** MEDIUM
**Category:** Accessibility

**Location:** `src/components/layout/Navbar.tsx:182-198`

**Problem:**
The toggle has `aria-label="Toggle menu"` but no `aria-expanded` and no `aria-controls`.
The drawer it opens has no `id`.

**Evidence:**
Live: `btn.getAttribute('aria-expanded')` → `null`, `aria-controls` → `null`, while the drawer is confirmed open.
The desktop Products trigger, 100 lines above in the same file, does set `aria-expanded` - so the pattern is known and simply not applied here.

**User Impact:**
A screen-reader user activating the control is told nothing about whether the menu opened or closed.

**Recommended Fix:**
Add `aria-expanded={mobileMenuOpen}` and `aria-controls="mobile-nav"`, give the drawer `id="mobile-nav"`, and make the label state-dependent ("Open menu" / "Close menu").
Add an `Escape` handler.

**Priority:** P2
**Effort:** Low
**Verification:** Toggle with a screen reader active and confirm the expanded/collapsed state is announced.

---

## [M-11] No skip-to-content link

**Severity:** MEDIUM
**Category:** Accessibility

**Evidence:**
No `.sr-only` skip link, no `a[href="#main"]`, no `.skip-link` anywhere in `src/`.
The header contains up to 14 focusable elements before `<main>` on desktop.

**User Impact:**
Keyboard and switch users must traverse the entire header on every page before reaching content.
WCAG 2.2 SC 2.4.1.

**Recommended Fix:**
Add a visually-hidden-until-focused skip link as the first child of `<body>`, targeting `id="main"` on the `<main>` element in each page.

**Priority:** P2
**Effort:** Low
**Verification:** Load any page, press Tab once, and confirm a visible "Skip to content" control that moves focus into `<main>`.

---

## [M-12] Design tokens are duplicated, contradicted and partly bypassed

**Severity:** MEDIUM
**Category:** Design System

**Evidence:**

Four exact duplicate pairs in `src/app/globals.css:7-24`:

| Value | Tokens sharing it |
| --- | --- |
| `#f59e0b` | `--color-brand-brick`, `--color-brand-yellow` |
| `#d97706` | `--color-brand-accent`, `--color-brand-brick-hover` |
| `#121417` | `--color-brand-dark`, `--color-brand-ink` |
| `#ffffff` | `--color-brand-cream`, `--color-brand-surface` |

**Seven distinct yellows** are in play: `#f59e0b`, `#fbbf24`, `#d97706` (tokens), `#dab500`, `#eab308`, `#ca8a04` (hardcoded inside `.bg-rusted-yellow`), and `#FFEE00` in `BrandLogo.tsx:34`.

**Eight border-radius values** with no scale: `rounded-full` (22 uses), `rounded-xl` (6), `rounded-sm` (6), `rounded-lg` (5), `rounded-3xl` (2), `rounded-2xl` (2), `rounded-md` (1), `rounded-[2px]` (1).

**Untokenised colours in components:** `#1c1f24` (`AdvantageSection.tsx:30`), `#f4f4f2` (`IndustriesSection.tsx:30` - a fourth light background alongside two identical white tokens).

**Three mutually contradictory documented palettes:**

| Source | Ink | Accent | Page background |
| --- | --- | --- | --- |
| `CLAUDE.md` ("Fired Clay") | `#2F1B27` | `#B4442A` | `#F7F1E6` |
| `docs/harvin-industries-plan.md` ("Brochure Match") | `#2B2B2A` | `#F5D613` | `#F7F5F0` |
| `src/app/globals.css` ("Machine Yellow", shipped) | `#121417` | `#f59e0b` | `#ffffff` |

`CLAUDE.md` and `globals.css` share exactly one colour: `#FFFFFF`.

**User Impact:**
Indirect but compounding.
Every new component starts from an ambiguous palette, which is how C-2 and H-3 arose in the first place.
Anyone following `CLAUDE.md` - the file that explicitly instructs *"use `brand-*` Tailwind classes, never hardcode these hex values inline"* - will build against colours that no longer exist.

**Recommended Fix:**
Collapse the duplicate pairs to one token each with a semantic name.
Move the three hardcoded yellows out of `.bg-rusted-yellow` into tokens.
Define a radius scale of three or four steps and map all eight current values onto it.
Update `CLAUDE.md` to describe the shipped Machine Yellow palette and mark the plan doc's palette section as superseded - `CLAUDE.md` is the file agents and developers read first, so its being wrong is the highest-leverage part of this fix.

**Priority:** P2
**Effort:** Medium
**Verification:** No two tokens share a value; no hex literal outside `globals.css` except third-party brand colours; `CLAUDE.md` matches `globals.css`.

---
## 7. Low-Priority Findings

| ID | Finding | Location | Detail | Fix |
| --- | --- | --- | --- | --- |
| L-1 | Four dead components still exported | `home/index.ts:10-13`, `ui/index.ts` | `TrustStrip`, `KeyFactors`, `HowItWorks`, `BrickWallPattern` are imported by nothing. The barrel labels three of them "Legacy components preserved for backward compatibility", but there is no consumer to be backward-compatible with. All four reference tokens (`brand-brick`, `brand-umber`, `brand-cream`) whose values changed meaning in the Machine Yellow pivot, so they would now render incorrectly if used. | Delete all four and their barrel exports. Git history preserves them. |
| L-2 | `BrickWallPattern` calls `Math.random()` during render | `ui/BrickWallPattern.tsx:17-35` | Non-deterministic output in a Server Component would produce a React hydration mismatch. Currently harmless only because the component is unused. | Delete with L-1, or seed deterministically if it is ever revived. |
| L-3 | Two lint warnings against a zero-warning project rule | `products/[slug]/page.tsx:42`, `home/AboutSnippet.tsx:2` | `'quoteHref' is assigned a value but never used`; `'Image' is defined but never used`. `CLAUDE.md` requires zero warnings before merge. | Remove both. See L-9 for the `quoteHref` context. |
| L-4 | Image quality settings are inconsistent and partly dead | `ProductCard.tsx:26`, `next.config.ts:5` | `quality={85}` appears on exactly one component; every other image uses the default 75. `qualities: [75, 85, 90]` declares a 90 that is never used, so Next generates a permitted variant nothing requests. | Pick one quality, apply it consistently, prune the config array. |
| L-5 | `dropdownRef` is assigned inside a `.map()` | `Navbar.tsx:80` | A single ref is assigned on each iteration, so with more than one dropdown only the last would be tracked and click-outside would misbehave. Latent only - exactly one nav item sets `hasDropdown` today. | Move dropdown state into a per-item child component. |
| L-6 | Footer and inline link tap targets are 17-20px tall | `Footer.tsx:52-93, 99-137` | Measured at 320px: Quick Links and Our Products entries are 17px tall with a 10px gap; `tel:` and `mailto:` links are 20px. WCAG 2.2 SC 2.5.8 requires 24px; 44px is the practical mobile target. | Add `py-1.5` and increase list spacing below `sm`. |
| L-7 | Search placeholder is clipped in the sidebar | `ProductFilters.tsx:55` | "Search machines by name or output…" is truncated mid-word in the 260px sidebar at 1024px and above. Visible in the 1440px screenshot as "Search machines by name o⋯". | Shorten to "Search machines…" or widen the sidebar column. |
| L-8 | Filters render no loading state | `products/page.tsx:71` | `<Suspense fallback={null}>` means the filter panel is simply absent until hydration, with no skeleton. | Provide a skeleton matching the panel's dimensions to avoid a visible gap. |
| L-9 | Two different quote-link contracts | `products/[slug]/page.tsx:42` vs `:136` | The unused `quoteHref` builds `?product=${slug}`; the rendered link builds `?product=${encodeURIComponent(product.name)}`. The future contact form must parse one of them. | Settle on the slug - it is stable and URL-safe - and delete the dead constant. |
| L-10 | Related-product link names are duplicated | `ProductCard.tsx:16-47` | Accessible name computes as "HI-2000 PRESS MACHINE HI-2000 Up to 2,200 pcs/hr · 50 HP View details" because the image `alt` repeats the heading. | Set `alt=""` on the decorative card image; the heading already names the link. |
| L-11 | Breadcrumb `nav` has no accessible name | `products/[slug]/page.tsx:50` | Appears as an unnamed `navigation` landmark; the page can expose two unnamed navs. | Add `aria-label="Breadcrumb"`, and `aria-label="Main"` on the header nav. |
| L-12 | Quote CTA points at two different destinations | `Hero.tsx:115` vs `Navbar.tsx:217`, `Footer.tsx:173`, `CtaBanner.tsx:38` | The hero sends users to `/contact`; the navbar, footer and CTA banner send them to `/#quote`. Two contracts for one action. | Standardise on `/contact` once that page exists. |

---

## 8. UI / Visual Audit

### What is working

The homepage has a genuine, coherent visual identity.
The Forum display face against Inter body copy is a strong, unusual pairing for industrial B2B and it reads as deliberate rather than default.
The section rhythm - eyebrow, split heading, supporting paragraph, content, CTA - is consistent across all eight homepage sections.
The angled wedge and notch treatments in `AdvantageSection` and `CtaBanner` are distinctive and executed cleanly, including the `--notch` custom property that shrinks the bite from 120px to 56px below `lg` so content inside the photo is not swallowed.
Hover states on the homepage are thoughtful: the blueprint corner marks in `IndustriesSection`, the outlined-to-yellow watermark numeral swap in `AdvantageSection`, the image zoom in `ManufacturingSection`.

### Confirmed visual defects

| Issue | Location | Severity |
| --- | --- | --- |
| Hero photograph does not render | `Hero.tsx` | C-1 |
| Trust badge divider survives wrap | `Hero.tsx:130` | M-2 |
| Products grid 80px out of alignment | `products/page.tsx:68` | M-1 |
| Thumbnail grid 70% empty | `[slug]/page.tsx:79` | M-4 |
| Catalogue pages carry none of the homepage visual language | `products/*` | M-5 |
| Product cards are visually inert | `ProductCard.tsx` | M-6 |
| Search placeholder clipped | `ProductFilters.tsx:55` | L-7 |

### Typography

Three families are loaded and all three are used: Forum (`font-display`), Inter (`font-sans`), Oswald (`font-stat`).
Loading three families is defensible here because each has a distinct role, and `next/font` self-hosts and preloads all of them correctly.

The heading scale is consistent: H1 at `text-5xl sm:text-6xl lg:text-7xl`, section H2s uniformly at `text-4xl sm:text-5xl`, sub-H2s on the detail page at `text-3xl`.
Heading order is clean site-wide with no skipped levels.

One inconsistency: the filter category pills use `font-display` (Forum, a serif) at 14px.
Forum is a display face designed for large sizes; at 14px in a UI control it reads as a mistake rather than a choice.
Everything else at that size uses Inter.

A second: `text-[17px]` appears on all seven pill CTAs - an arbitrary value outside the Tailwind scale, repeated by copy-paste.

### Colour

Covered in detail under M-12.
The short version: eight tokens encode four values, seven yellows are in circulation, and the palette documented in `CLAUDE.md` shares one colour with the palette actually shipped.

### Spacing

Section padding is commendably consistent: `py-16 lg:py-24` on every light homepage section.
Container padding is uniform at `px-4 sm:px-6 lg:px-8`.
Grid gaps are more scattered - `gap-3.5`, `gap-4`, `gap-4.5`, `gap-5`, `gap-6`, `gap-8`, `gap-10`, `gap-px` all appear, several of them for visually equivalent card grids.

### Radius and elevation

Eight radius values with no scale (M-12).
Shadows are similarly ad hoc: `shadow-sm`, `shadow-md`, `shadow-xl`, `shadow-2xl`, plus arbitrary values such as `shadow-[0_0_8px_rgba(245,158,11,0.8)]` and `drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]`.
There is no elevation scale.

---

## 9. Responsive Audit

### Headline result

**No horizontal overflow was found at any tested width on any built page.**
This was verified programmatically by walking every element in the DOM, excluding descendants of intentional scroll containers, and comparing bounding-box edges against the viewport.

| Width | Page | `scrollWidth` vs viewport | Offending elements |
| --- | --- | --- | --- |
| 320 | `/` | 320 = 320 | 0 |
| 375 | `/products/hi-1500` | 375 = 375 | 0 |
| 390 | `/` | 390 = 390 | 0 |
| 768 | `/` | 768 = 768 | 0 |
| 1024 | `/` | measured, no overflow | 0 |
| 1440 | `/products` | measured, no overflow | 0 |
| 1920 | `/` | measured, no overflow | 0 |

This is a genuinely good result and reflects careful work.
`min-h-[calc(100svh-5rem)]` on the hero uses `svh` rather than `vh`, which correctly avoids the iOS Safari dynamic-toolbar jump - a mistake most sites make.

### Breakpoint strategy

Standard Tailwind breakpoints, used coherently: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.
`lg` carries the most weight - it is where the nav switches, where the wedge layouts engage, and where `--notch` grows from 56px to 120px.
The custom `--container-8xl` at 90rem is used exactly once and is the cause of M-1.

`md` is used only twice, both in `ClientLogosSection`, which makes the rail's arrow controls appear at a breakpoint nothing else responds to.

### Layout verification at `lg`, the highest-risk boundary

`AboutSnippet` positions its photo absolutely at `w-[54%]` from the right while the copy sits in a `lg:col-span-6` grid column.
This is the kind of construction that usually collides.
Measured at 1024px: the copy column's box overlaps the photo's box by 21px, but `lg:pr-16` holds the actual text 43px clear of the photo edge.
At 1920px the clearance is 39px.
**No collision occurs at any tested width** - the padding is doing its job, though the margin is thin enough that a longer paragraph or a larger font-size setting could close it.
Flagged as a watch item, not a defect.

### Confirmed responsive defects

1. **Hero trust badges (M-2)** - divider rule survives the wrap at 320, 375 and 390px.
2. **Mobile nav tier loss (H-4)** - five destinations unreachable below `lg`.
3. **Production table (M-3)** - 179px of a 520px table off-screen at 375px with scrollbars globally suppressed.
4. **Thumbnail grid (M-4)** - one item in three columns.
5. **Products grid alignment (M-1)** - 80px offset at 1440px.

### Grid remainders

Several grids hold five items in layouts that do not divide by five:
- `LatestProducts` - 5 cards in `sm:grid-cols-2 lg:grid-cols-5`; at `sm` the fifth card sits alone.
- `ManufacturingSection` - 5 cards in `sm:grid-cols-3 lg:grid-cols-5`; at `sm` two cards sit in the second row.
- `AdvantageSection` - 5 cards in `sm:grid-cols-3`; at 1024px inside `lg:max-w-[58%]` the cards compress to 176px wide, which is cramped for a 44px icon plus two lines of text.

None of these are broken, but the ragged final row is visible in the 768px capture and is worth a design decision rather than being left to fall out of the grid.

### Ultra-wide

At 1920px the content column is capped at `max-w-7xl` (1280px) and centred, leaving 320px of empty white on each side, while the `AboutSnippet` and `AdvantageSection` photographs bleed to the viewport edge.
The mix reads as intentional.
At 2560px the margins grow to 640px and the effect becomes more pronounced; this was measured but not visually reviewed, so it is recorded as a **potential issue requiring runtime verification** at that width.

---

## 10. UX Audit

| Question | Finding |
| --- | --- |
| Is the purpose immediately clear? | **Yes.** "Built for Performance", "Advanced machinery for fly ash bricks, concrete blocks and modern construction materials" - a visitor knows what this company does within one screen. |
| Is the primary CTA obvious? | **Yes, visually.** The yellow pill is unmistakable and repeated consistently. It fails on contrast (C-2) and, today, leads to an unbuilt page. |
| Is navigation intuitive? | **On desktop, yes.** On mobile it silently loses a tier (H-4). |
| Are interactions predictable? | **Partly.** Homepage hover states are rich and consistent. Catalogue cards give no feedback at all (M-6). Detail-page thumbnails and mould chips look interactive and are not (M-4). |
| Is feedback provided after actions? | **Partly.** Search updates the result count live, which is good. There is no pending indicator during the debounce, so on a slow connection the list appears frozen. |
| Are loading states present? | **No.** `Suspense fallback={null}` (L-8); no skeletons anywhere; images have no placeholder so they pop in. |
| Are errors understandable? | **Untestable in the current build** - there are no forms or fetches that can fail. `notFound()` is wired correctly on the detail route. |
| Are empty states handled? | **Yes, and well.** "No machines found / Try a different search term or clear your filters" with a dashed border. This is the best-handled state in the codebase. |

### Confirmed UX defects

- **Back-button trap (H-5)** - five history entries for five typed characters.
- **Inert elements that look interactive** - detail-page thumbnails; the "Also produced with optional moulds" chips are `<li>` elements styled as pills with borders and padding, visually identical to the clickable category filters on `/products`.
- **The "Watch Plant In Motion" button** (`ManufacturingSection.tsx:119-137`) is an `<a href="#manufacturing">` with `preventDefault`, which scrolls to and plays a video that is already autoplaying and already visible below it. The action has no observable effect.

### Carousel

The hero carousel has three slides with manual dot and arrow controls.
There is no autoplay, no swipe support, no keyboard arrow handling, and no `aria-live` region announcing slide changes.
Slides 2 and 3 are unreachable below `lg`, because the control rail is `hidden lg:flex` - so two thirds of the hero content simply does not exist on mobile.
Given C-1 means slide 1 does not render either, the entire hero is currently non-functional on a phone.

---

## 11. Performance Audit

### Measured, production build, localhost, no throttling

| Metric | Value | Note |
| --- | --- | --- |
| TTFB | 12 ms | Excellent |
| DOMContentLoaded | 88-188 ms | Excellent |
| FCP | 208 ms | Excellent |
| LCP | 208 ms, on the `<h1>` | **Misleading** - the hero image never paints, so text becomes the LCP candidate |
| CLS | **0.00** | Excellent. `next/image` with `fill` plus fixed `aspect-ratio` containers is doing its job |
| `loadEventEnd` | **never fires** | Still `0` after 90 s |
| Total transfer, `/` | **23,945 KB** | 23,930 KB of it video |
| Total transfer, non-video | 15 KB | |
| Images loaded, warm cache | **12 / 17** | 5 never resolve |
| Client JS | 619 KB across 12 chunks | Reasonable |

These localhost figures are **not** Core Web Vitals predictions.
Real-user LCP, INP and TTFB require field data or a Lighthouse run against the deployed site under a throttled profile.
**No Lighthouse audit was run and none is claimed.**
What is claimed, and is fully evidenced, is the payload composition and the image-loading failure.

### Server-side image optimizer cost

| Variant | Cold | Payload |
| --- | ---: | ---: |
| `w=640` | 176 ms | 84 KB |
| `w=1200` | 282 ms | 253 KB |
| `w=1920` | 491 ms | 532 KB |
| `w=3840` | **1,162 ms** | **1,382 KB** |

Warm: 2-3 ms for all variants.
Source images are large - `hero-plant-4k.webp` is a genuine 3840x2160 at 1.1 MB - so Next generates and caches a 1.38 MB 4K variant that is only ever displayed in a container at most 883px wide.

**Recommendation:** restrict `deviceSizes` in `next.config.ts` to a realistic ceiling of 1920 or 2048. The 3840 variant costs over a second of cold CPU and 1.4 MB for no visible benefit.

### Video posters bypass optimization

`AboutSnippet.tsx:20` and `ManufacturingSection.tsx:147` set `poster="/images/mockup/factory-hq-4k.webp"` and `poster="/images/mockup/hero-plant-4k.webp"`.
The `poster` attribute takes a raw URL, so these bypass `next/image` entirely and download at full size - 437 KB and 1.1 MB respectively, at 2880x1620 and 3840x2160, into containers that are never wider than 1037px.
Confirmed in network capture as direct `/images/mockup/*.webp` requests.

### Rendering

Good: Server Components by default, only four `"use client"` files, no unnecessary state, no expensive computation in render, `IsometricLines` explicitly precomputed at module scope with a comment explaining why.
The 300 ms debounce on search is correctly implemented.

One note: `ClientLogosSection` is a client component solely to provide two scroll buttons over a container that already scrolls natively. The seven logos are hand-drawn as JSX rather than images, which is a reasonable way to avoid seven network requests but does hardcode seven third-party brand colours.

### Immediate wins, in order of value

1. Re-encode both videos, strip audio, add `+faststart` - saves ~18 MB (M-8).
2. Remove the duplicate `FacilityVisual` render - saves 12 MB (H-1).
3. `preload="none"` plus `IntersectionObserver` mounting - removes video from the critical path entirely (C-1).
4. Route video posters through `next/image` - saves ~1.4 MB.
5. Cap `deviceSizes` at 1920 - removes the 1.16 s 4K optimization path.
6. Long-lived cache headers on video (M-7).

Together these take the homepage from roughly 24 MB to under 4 MB.

### Longer-term

Move media to Cloudinary as the project rules already require, and take adaptive bitrate and automatic format negotiation with it.
Remove the 40 MB of unreferenced assets (H-9).

---

## 12. Accessibility Audit

Audited against WCAG 2.2 AA by direct measurement: computed-style contrast sampling, accessibility-tree capture, programmatic focus traversal and bounding-box tap-target measurement.
**No screen reader was driven and no automated axe run was performed** - findings below are from the Chrome accessibility tree and computed styles.

### What is correct

- Landmarks: exactly one `header`, `main` and `footer` per page, correctly nested.
- Heading order: clean `h1` → `h2` → `h3` with no skipped levels on all three pages.
- `alt` text: present on **every** image; zero images missing the attribute.
- `lang="en"` set on `<html>`.
- Social and icon-only links carry `aria-label`.
- The desktop dropdown trigger sets `aria-expanded`.
- Decorative SVGs (`Logo`, `BrandLogo`, `IsometricLines`, `BrickWallPattern`) all set `aria-hidden="true"`.

### Confirmed failures

| WCAG | Criterion | Finding | ID |
| --- | --- | --- | --- |
| 1.4.3 | Contrast (Minimum) | Primary CTA white on yellow, **2.15:1** | C-2 |
| 1.4.3 | Contrast (Minimum) | Heading accents, **2.15:1** and **1.95:1** | H-3 |
| 1.4.3 | Contrast (Minimum) | "View All Products" **3.19:1** at 12px; eyebrow **4.39:1** | H-3 |
| 1.4.11 | Non-text Contrast | Input focus border **2.15:1** against a 3:1 requirement | H-6 |
| 2.1.1 | Keyboard | Dropdown cannot be opened by keyboard | H-2 |
| 2.4.3 | Focus Order | Five focusable links inside a collapsed, `opacity:0` menu | H-2 |
| 2.4.7 | Focus Visible | `focus:outline-none` with no adequate replacement | H-6 |
| 2.4.1 | Bypass Blocks | No skip link | M-11 |
| 2.2.2 | Pause, Stop, Hide | Two infinite autoplaying video loops, no pause | H-8 |
| 2.5.8 | Target Size (Minimum) | Footer links 17px, contact links 20px, against 24px | L-6 |
| 4.1.2 | Name, Role, Value | Mobile toggle exposes no expanded state | M-10 |
| 1.1.1 | Non-text Content | Icon ligature names announced as text | H-7 |

17 distinct low-contrast text nodes were measured on the homepage alone.
Five of those are false positives - the `WebkitTextStroke` watermark numerals in `AdvantageSection`, which are transparent by design and carry no information.

### Tables

The spec and production tables use correct semantic markup - `<table>`, `<thead>`, `<th>`, `<tbody>` in `ProductionTable`, and `<dl>`/`<dt>`/`<dd>` in `SpecTable`.
The captured accessibility tree renders their contents as flat `StaticText` nodes rather than as table or description-list roles.
This may be an artifact of the capture tool's simplification rather than a genuine exposure problem.
Recorded as a **potential issue requiring verification with a real screen reader**.
Adding `scope="col"` to the `<th>` elements in `ProductionTable.tsx:26-29` is cheap insurance regardless.

### Fix order

1. C-2 and H-3 - contrast. One token change fixes most of both.
2. H-2 - `inert` on the collapsed dropdown. One attribute.
3. H-6 - one global `:focus-visible` token.
4. H-7 - route ten spans through `Icon`.
5. H-8 - the `prefers-reduced-motion` block.
6. M-10, M-11, L-6 - ARIA state, skip link, tap targets.

Items 1-4 are each under an hour and together clear the majority of the AA failures.

---

## 13. Cross-Browser Audit

No real Safari, Firefox or Edge testing was performed.
**Nothing below is a confirmed browser bug.**
These are implementation risks assessed from the source.

| Feature | Used in | Risk | Assessment |
| --- | --- | --- | --- |
| `clip-path: polygon()` | `globals.css:92-102`, `Hero.tsx:211` | Low | Universally supported. The `--notch` custom property inside `polygon()` is well supported in current browsers. |
| `backdrop-filter` | `Navbar.tsx:64`, several overlays | Low | Supported everywhere current; degrades to a solid background. The navbar uses `bg-brand-ink/70`, which stays legible without the blur. |
| `100svh` | `Hero.tsx:58` | Low | **Correct choice.** Avoids the iOS toolbar resize that `100vh` causes. |
| `-webkit-text-stroke` | `AdvantageSection.tsx:67, 73` | Low | Non-standard but implemented in all four engines. Purely decorative; degrades to invisible, which is the intended appearance. |
| `scrollbar-width: none` | `globals.css:58-65` | Low technically, **medium in UX** | Works everywhere. The problem is the deliberate loss of affordance on functional scrollers (M-3), not compatibility. |
| `<video autoplay muted playsInline>` | 3 elements | **Medium** | `playsInline` and `muted` are both correctly set, which is what iOS requires. **But iOS Low Power Mode blocks autoplay regardless.** The `poster` is set, so the fallback is a static image - acceptable. Untested on a real device. |
| `background-blend-mode` | `globals.css:114` | Low | Supported. Degrades to the last background layer, which is still yellow. |
| Arbitrary gradient stops (`via-45%`, `via-60%`) | `Hero.tsx:83`, `ManufacturingSection.tsx:80` | Low | Compiles to standard `linear-gradient` stops. |
| `grid-template-rows: 0fr → 1fr` transition | `Navbar.tsx:119-123` | **Medium** | Animating to `0fr` is only reliable in browsers supporting interpolable grid track sizes - Chrome 107+, Firefox 107+, Safari 16+. Older Safari snaps instead of animating. Cosmetic only. |

**Recommended:** real-device passes on iOS Safari (autoplay under Low Power Mode, `svh` behaviour, the wedge clip-paths) and on Firefox (the grid-row dropdown animation) before launch.

---

## 14. Mobile UX Audit

Tested at 320x800, 375x812 and 390x844 with device emulation, touch and mobile flags enabled.

### Working

- Zero horizontal overflow at every width.
- Layouts genuinely reflow rather than shrink - `AboutSnippet` and `AdvantageSection` both have real stacked mobile arrangements rather than scaled-down desktop ones.
- The search input is 46px tall - a correct touch target.
- The menu toggle is 40x40 - above the 24px minimum, marginally below the 44px ideal.
- `svh` units mean no hero jump when the browser toolbar collapses.

### Failing

1. **The hero does not render (C-1).** The photo is absent, so the hero is a flat dark rectangle.
2. **Slides 2 and 3 are unreachable.** The control rail is `hidden lg:flex`, so mobile visitors get slide 1 only - which is itself blank.
3. **Product categories are unreachable from the menu (H-4).**
4. **The badge divider bug (M-2)** is visible at every tested phone width.
5. **The spec table hides its key column (M-3).**
6. **24 MB of video on a mobile data connection (C-1)** - roughly 38 s of transfer at a realistic 5 Mbps.
7. **Footer tap targets at 17px (L-6)**, stacked 10px apart.
8. **The open menu consumes 62% of the viewport** - the sticky header grows to 500px on an 812px screen. Because it is an in-flow accordion rather than an overlay, the page behind scrolls freely while it is open, which is confusing.
9. **Anchor links land under the open header.** `scroll-mt-20` (80px) matches the closed 80px header but not the 500px open one.

Landscape orientation was not tested; recorded as **not tested**.

---

## 15. Interaction & Animation Audit

| Component | Hover | Focus | Active | Disabled | Loading | Assessment |
| --- | --- | --- | --- | --- | --- | --- |
| Primary pill CTA | Brightness + shadow | UA default only | Brightness + shadow | n/a | n/a | Good hover/active, no custom focus |
| Hero secondary button | Fill transition | UA default only | - | n/a | n/a | Adequate |
| Nav link | Colour + underline grow | UA default only | - | n/a | n/a | Good |
| Dropdown trigger | Opens menu | **Does not open** | Toggles | n/a | n/a | Keyboard-inaccessible (H-2) |
| Homepage category card | Border + arrow translate | UA default only | - | n/a | n/a | Good |
| Manufacturing card | Lift + image zoom + shadow | UA default only | - | n/a | n/a | Good |
| Industry panel | Full invert + corner marks | UA default only | - | n/a | n/a | Best interaction on the site |
| Advantage card | Border + numeral swap | UA default only | - | n/a | n/a | Good |
| **`ProductCard`** | **None** | **None** | **None** | n/a | n/a | **Inert (M-6)** |
| Category filter pill | Border + text colour | UA default only | Fill change | n/a | **None** | No pending state during debounce |
| Search input | - | **Outline removed** | - | n/a | **None** | H-6 |
| Client logo arrows | Border + colour | UA default only | - | **Never disabled at rail ends** | n/a | Arrows stay enabled with nothing to scroll to |
| Detail thumbnails | **None** | **Not focusable** | **None** | n/a | n/a | Looks interactive, is not (M-4) |
| Mould chips | **None** | **Not focusable** | **None** | n/a | n/a | Styled like filter pills, inert |

### Animation quality

Durations are consistent - `duration-200` for colour, `duration-300` for composite, `duration-500` for image zoom, `duration-1000` for the hero crossfade.
Almost everything animates `transform` and `opacity`, which are compositor-friendly.

Two exceptions worth noting:
- `LatestProducts.tsx:191` animates `scale` on a 44px icon on hover - trivial cost.
- `ManufacturingSection.tsx:76` animates `scale-110` on a full-size image, which forces repaint of a large layer. Acceptable on desktop, measurably worse on low-end Android. Not measured here.

No `prefers-reduced-motion` support anywhere (H-8).

---

## 16. Loading / Empty / Error State Audit

| State | Homepage | `/products` | `/products/[slug]` |
| --- | --- | --- | --- |
| Loading | **None** - images pop in with no placeholder | **None** - `Suspense fallback={null}` | **None** |
| Success | Yes | Yes | Yes |
| Empty | n/a | **Yes, well handled** | n/a |
| Error | **None** | **None** | `notFound()` → default Next 404 |
| Disabled | n/a | Filter pills never disable | Rail arrows never disable |
| Unauthorized | n/a | n/a | n/a |
| Offline | **None** | **None** | **None** |
| Slow network | **Fails - C-1** | Degrades acceptably | Degrades acceptably |

### The empty state, as a positive

`products/page.tsx:87-94` is the best-executed state in the codebase: a dashed-border panel, a clear "No machines found" heading and actionable guidance.
Verified live at `?q=zzzznotathing`.

### Gaps

- **No `placeholder="blur"` on any `next/image`.** With a 4:3 container already reserved, adding a blur placeholder would mask the load entirely and is a near-free improvement - particularly relevant given C-1.
- **No broken-image handling.** If an optimizer request fails, the alt text renders in a bare box. There is no `onError` fallback and no styled placeholder, despite `[slug]/page.tsx:72-76` proving the pattern exists for the *missing*-image case.
- **The default Next.js 404 page is unstyled** - no navbar, no footer, no brand. Any mistyped product URL drops the visitor out of the site entirely.
- **No `error.tsx` boundary** at any level.
- **No pending state during the 300 ms search debounce.**

### Real-world content resilience

Tested against the current data and by reasoning about the type shape:

- **Long product names** - `ProductCard` heading has no `line-clamp`; a long name would push the card taller than its siblings. Current data uses short names like "HI-1500", so this is untested but structurally likely.
- **Missing images** - handled correctly with an `Icon` fallback in both `ProductCard.tsx:30-34` and `[slug]/page.tsx:72-76`.
- **Large numbers** - `toLocaleString()` used consistently for `outputCapacity` and `pcsPerHour`. Correct.
- **Empty optional fields** - all optional product fields are guarded before render. Correct.
- **Large datasets** - the catalogue holds 5 items and filters in memory. Fine now; there is no pagination or virtualization, so a few hundred products would need one.
- **Special characters** - verified escaped (see section 19).

---

## 17. Forms Audit

The only form control currently on the site is the product search input.
The contact and quote forms are not built.

| Check | `ProductFilters` search input | Verdict |
| --- | --- | --- |
| Label | `<label>` wraps the input, but contains only the search icon - no text | **Fails.** The accessible name is empty |
| Placeholder | Present, but clipped at 260px (L-7) | Partial |
| `type` | `type="search"` | Correct - gives the right mobile keyboard and a clear affordance |
| Required / validation | n/a | n/a |
| Error state | n/a | n/a |
| Loading state | None during debounce | Missing |
| Focus | `focus:outline-none` (H-6) | **Fails** |
| Autofill | n/a | n/a |
| Double submission | n/a - debounced, not submitted | n/a |
| Tap target | 46px tall | Correct |
| Clearing | Native `type="search"` clear button plus "Clear all filters" | Good |

**Fix:** add `aria-label="Search machines"` to the input, or a visually-hidden label element.
Announce result counts in an `aria-live="polite"` region so screen-reader users learn that the list changed.

### For the contact form when it is built

Everything in the audit brief's section 14 applies and none of it exists yet.
The essentials: real `<label>` elements rather than placeholders, `type="tel"` and `type="email"` for the right mobile keyboards, `autocomplete` attributes, inline errors associated via `aria-describedby`, an `aria-live` region for the submit result, a disabled-and-pending submit button to prevent double submission, and server-side validation independent of the client.

---

## 18. Navigation Audit

### Structure

Header: 9 top-level items plus a 5-item Products dropdown, 14 destinations on desktop and 9 on mobile (H-4).
Footer: 4 columns, 8 quick links, 5 product links, 3 contact links, 3 social links, 3 legal links.

Nine top-level nav items is a lot for a site with three built pages, and several - Technology, Projects, Resources - are anchors into homepage sections rather than pages, which is not signalled to the user.

### Active states

The active state logic at `Navbar.tsx:153-159` explicitly returns `false` for any href containing `#`.
So Manufacturing, Technology, Projects and Resources **never** show as active, even when the user is looking at exactly that section.
Only Home and Products can ever highlight.
This is a deliberate simplification, but it means 4 of 9 nav items have a permanently dead state.
A scroll-spy using `IntersectionObserver` against the existing section ids would fix it.

### Link inventory and status

| Destination | Status |
| --- | --- |
| `/` | 200 |
| `/products` | 200 |
| `/products/[slug]` x5 | 200 |
| `/products#fly-ash`, `#concrete-blocks`, `#paver-blocks`, `#automatic-plants`, `#material-handling` | Page 200, **anchors do not exist on the page** - the target ids are never rendered, so all five scroll to the top |
| `/#about`, `/#manufacturing`, `/#advantage`, `/#industries` | Valid - ids confirmed present |
| `/#products` | Valid |
| `/#resources` | **No matching id on the homepage** |
| `/#quote` | **No matching id** |
| `/about`, `/about#manufacturing`, `/contact` | 404 - known, not yet built |
| `/privacy`, `/terms`, `/sitemap` | 404 - known, not yet built |
| `tel:+919898575358`, `mailto:info@harvinindustries.com` | Valid, correctly formatted |
| `https://linkedin.com`, `https://youtube.com`, `https://instagram.com` | **Generic platform homepages, not Harvin profiles** |

### Findings not covered by the known-unbuilt exclusion

Three of these are defects in built pages rather than missing routes, and are counted in the severity totals:

- **The five `/products#category` anchors resolve to nothing.** `/products` renders no elements with those ids. Every category link in the header dropdown and the footer takes the user to the same unfiltered top of the catalogue. Since the page already supports `?category=`, these should be `/products?category=press` and so on - which would also make the destinations genuinely different. *Counted under H-4's fix scope.*
- **`/#resources` has no target section.** Counted under L-12's cluster.
- **Social links point at platform homepages.** Shipping `https://linkedin.com` in a production footer sends visitors to LinkedIn's front page. Either point them at the real profiles or remove the icons until they exist. *Counted as part of L-12.*

### Correct behaviours

`scroll-mt-20` on every anchored section correctly offsets the 80px sticky header.
External links use `target="_blank"` with `rel="noreferrer"`.
`next/link` is used throughout for internal navigation, so prefetching works.

---

## 19. Image & Media Audit

### Inventory

| Group | Size | Referenced |
| --- | ---: | --- |
| `public/` total | **79 MB** | |
| Videos (2 files) | 23 MB | Yes, both |
| `images/brochure/` | 42 MB | Mostly **no** |
| `images/mockup/` | 7.9 MB | Yes |
| **Unreferenced files** | **40 MB across 120 files** | **No** (H-9) |

### Handling

Good: every `next/image` uses `fill` inside a container with a fixed `aspect-ratio`, which is why CLS measures 0.00.
`sizes` is specified on every instance and the values are accurate to the layouts.
avif and webp are both enabled.
`priority` is set on the hero and on the detail page's main image.
`alt` is present on every image.

Problems:
1. **Video posters bypass `next/image`** - 1.5 MB of raw, unoptimized transfer (section 11).
2. **4K sources drive a 1.38 MB, 1.16 s optimization path** that no container needs (section 11).
3. **Both videos are 4-5x over a sane delivery bitrate and carry dead audio tracks** (M-8).
4. **No `placeholder="blur"`** anywhere (section 16).
5. **Inconsistent product imagery.** HI-1500/2000/3000 use photographic `.jpg` renders on a neutral background; Batching Plant and Mixture Machine use transparent-background brochure `.png` files. Rendered `object-cover` in a shared 4:3 card, the two treatments do not sit together, and the transparent PNGs crop awkwardly. Visible in the `/products` capture.
6. **`quality={85}` on one component only** (L-4).

### Alt-text quality

Alt text is present everywhere and is genuinely descriptive - "Harvin Industries Heavy-Duty Brick & Block Machine Plant", "Precision CNC Machining".
The one improvement: `ProductCard`'s image `alt` duplicates the card heading, which bloats the link's accessible name (L-10). Decorative card images should use `alt=""`.

---

## 20. SEO / Semantic HTML Audit

### Present and correct

- Per-page `title` and `description` via `metadata` and `generateMetadata`.
- `generateStaticParams` pre-renders all 5 product pages at build time.
- Clean heading hierarchy, single `h1` per page, no skipped levels.
- Correct landmark elements throughout.
- `lang="en"`.
- Complete `alt` text.
- Semantic `<table>`, `<dl>`, `<ul>`, `<nav>` where appropriate; no clickable `<div>`s anywhere - every interactive element is a real `<a>` or `<button>`.

### Missing

- Open Graph and Twitter Card metadata - **zero tags** (M-9).
- `metadataBase` and canonical URLs (M-9).
- `robots.txt`, `sitemap.xml`, `llms.txt` - all 404, all specified in the plan (M-9).
- JSON-LD: no `Organization`, `Product`, `BreadcrumbList` or `FAQPage` (M-9).
- No `<time>`, no author or publication metadata - not applicable to this content type.

### Semantic notes

`src/app/page.tsx` wraps eight sibling `<section>` elements.
Five carry an `id` and an accessible heading; three do not.
A `<section>` without an accessible name is exposed as a generic region, so adding `aria-labelledby` pointing at each section's `h2` would improve the document outline at essentially no cost.

---

## 21. Component Audit

| Component | Consistency | Responsive | Accessibility | Performance | Reusability | Issues |
| --- | --- | --- | --- | --- | --- | --- |
| `Navbar` | Good | **Partial** | **Poor** | Good | Good | H-2, H-4, M-10; dead active states on 4 items; L-5 |
| `Footer` | Good | Good | **Poor** | Good | Good | H-7, L-6, C-2; social links point at platform homepages |
| `BrandLogo` | Good | Good | Good | Good | Good | Hardcoded `#FFEE00` outside the token set |
| `Hero` | Good | **Partial** | **Poor** | **Critical** | Single-use | C-1, M-2; slides 2-3 unreachable below `lg`; no swipe or keyboard |
| `AboutSnippet` | Good | Good | Fair | **Critical** | Single-use | H-1 (duplicate 12 MB video), H-8; unused `Image` import |
| `LatestProducts` | Good | Good | Fair | Good | Single-use | H-3, H-7; inline SVG pattern is verbose but harmless |
| `ManufacturingSection` | Good | Good | Fair | **Poor** | Single-use | C-1, H-8; "Watch Plant In Motion" has no observable effect |
| `AdvantageSection` | Good | Good | Fair | Good | Single-use | H-3, H-7; hardcoded `#1c1f24`; cards cramped at 1024 |
| `IndustriesSection` | Good | Good | Fair | Good | Single-use | H-3, H-7; hardcoded `#f4f4f2` |
| `CtaBanner` | Good | Good | Fair | Good | Single-use | C-2 |
| `ClientLogosSection` | Fair | Good | Fair | Good | Single-use | Arrows never disable at rail ends; 7 hardcoded third-party colours; client component for native scroll |
| `ProductCard` | **Poor** | Good | **Poor** | Good | Good | **M-6 - no states at all**; L-10 |
| `ProductFilters` | Fair | Good | **Poor** | Good | Good | **H-5, H-6**; input has no accessible name; no pending state |
| `SpecTable` | Good | Good | Good | Good | Good | Clean. Correct `<dl>` semantics |
| `ProductionTable` | Good | **Poor** | Fair | Good | Good | **M-3**; `<th>` lacks `scope` |
| `FeatureGroups` | Good | Good | Good | Good | Good | Clean. Unused by current data |
| `Icon` | Good | n/a | Good | Good | **Bypassed 10x** | Correct implementation, not enforced (H-7) |
| `IsometricLines` | Good | Good | Good | Good | Good | Clean; correctly precomputed and `aria-hidden` |
| `BrickWallPattern` | n/a | n/a | n/a | n/a | **Dead** | L-1, L-2 |
| `TrustStrip` / `KeyFactors` / `HowItWorks` | n/a | n/a | n/a | n/a | **Dead** | L-1; reference tokens whose meaning changed |

### The missing primitive

There is no `Button`.
The yellow pill CTA is hand-written **seven times** across `Hero`, `Navbar`, `Footer`, `AboutSnippet`, `ManufacturingSection`, `CtaBanner` and `[slug]/page.tsx`, each time with the same `rounded-full bg-rusted-yellow ... font-display text-[17px] tracking-wider text-white ... font-semibold` string and its own hand-copied arrow SVG.
Padding already varies between copies: `px-6 py-3`, `px-7 py-3.5`, `py-3.5 px-6`, `px-5 py-3`.

This single gap is the direct cause of C-2 - the white-on-yellow pairing had to be decided seven separate times and was wrong every time.
Extracting `Button` is the highest-leverage refactor available.

Second missing primitive: a `SectionHeader` for the eyebrow-plus-split-heading pattern, which is duplicated across six homepage sections and absent from the catalogue pages, which is the mechanism behind M-5.

---

## 22. Design System Audit

### Colours

**Duplicates** - four values carry eight token names (M-12).

**Yellows in circulation - seven:**

| Value | Where |
| --- | --- |
| `#f59e0b` | `--color-brand-yellow`, `--color-brand-brick` |
| `#fbbf24` | `--color-brand-yellow-light` |
| `#d97706` | `--color-brand-accent`, `--color-brand-brick-hover` |
| `#dab500` | hardcoded, `.bg-rusted-yellow` gradient |
| `#eab308` | hardcoded, `.bg-rusted-yellow` gradient |
| `#ca8a04` | hardcoded, `.bg-rusted-yellow` gradient |
| `#FFEE00` | hardcoded, `BrandLogo.tsx:34` |

**Light backgrounds - three, two of them identical:** `--color-brand-cream` `#ffffff`, `--color-brand-surface` `#ffffff`, and an untokenised `#f4f4f2`.

**Documentation conflict:** three palettes across `CLAUDE.md`, the plan doc and `globals.css`, sharing one colour (M-12).

### Typography

| Token | Family | Weights | Usage |
| --- | --- | --- | --- |
| `--font-sans` | Inter | variable | Body, UI |
| `--font-display` | Forum | 400 | Headings, CTAs |
| `--font-stat` | Oswald | 500/600/700 | Statistics, index numerals |

Sizes in use: `text-xs` through `text-7xl` on the standard scale, plus **nine arbitrary values** - `text-[8px]`, `text-[9px]`, `text-[11px]`, `text-[13px]`, `text-[15px]`, `text-[17px]`, `text-[22px]`, `text-[28px]`, `text-[32px]`, `text-[42px]`, `text-[88px]`.
`text-[13px]` and `text-[17px]` each appear many times and are effectively undeclared scale steps.

Issues: `font-display` on 14px filter pills; `text-[17px]` repeated across seven CTA copies; `font-semibold` applied to Forum, which only ships a 400 weight, so the browser synthesises a fake bold.

### Spacing

Section rhythm is excellent and consistent: `py-16 lg:py-24` everywhere, `px-4 sm:px-6 lg:px-8` on every container.
Gaps are scattered: `gap-px`, `gap-2.5`, `gap-3.5`, `gap-4`, `gap-4.5`, `gap-5`, `gap-6`, `gap-8`, `gap-10`, `gap-14`.
`gap-4.5` is a non-standard step.

### Radius

Eight values, no scale (M-12).

### Shadows

No elevation scale.
In use: `shadow-sm`, `shadow-md`, `shadow-xl`, `shadow-2xl`, `shadow-black/40`, `shadow-black/70`, `shadow-brand-yellow/20`, plus arbitrary `shadow-[0_0_8px_rgba(245,158,11,0.8)]` and `drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]`.

### Breakpoints

`sm` 640, `md` 768, `lg` 1024, `xl` 1280 - standard and coherent.
`md` is used twice, both in one component.
`--container-8xl` 90rem is used once and causes M-1.

### Proposed token set

```css
:root {
  /* Surfaces */
  --color-ink:            #121417;  /* was ink + dark */
  --color-ink-raised:     #181b20;
  --color-ink-overlay:    #1e2229;
  --color-surface:        #ffffff;  /* was cream + surface */
  --color-surface-sunken: #f4f4f2;  /* was hardcoded */

  /* Brand yellow - fill only, never text on light */
  --color-yellow:         #f59e0b;
  --color-yellow-light:   #fbbf24;
  --color-yellow-deep:    #d97706;
  --color-yellow-text:    #9a5b06;  /* NEW - 5.1:1 on white, fixes H-3 */

  /* Text */
  --color-text:           #111827;
  --color-text-muted:     #6b7280;
  --color-border:         #e5e7eb;

  /* Radius */
  --radius-sm:   2px;
  --radius-md:   8px;
  --radius-lg:  16px;
  --radius-pill: 9999px;

  /* Elevation */
  --shadow-1: 0 1px 2px rgb(0 0 0 / 0.06);
  --shadow-2: 0 4px 14px rgb(0 0 0 / 0.10);
  --shadow-3: 0 12px 32px rgb(0 0 0 / 0.18);

  /* Focus */
  --focus-ring: 0 0 0 2px #ffffff, 0 0 0 4px var(--color-yellow-deep);
}
```

This removes the four duplicate pairs, names the two untokenised colours, adds the accessible text yellow that fixes H-3, and introduces radius, elevation and focus scales.
`brand-brick`, `brand-brick-hover`, `brand-umber` and `brand-clay` are terracotta-era leftovers and should go with the dead components in L-1.

---

## 23. Code Quality Issues Affecting UI

Only issues with a direct UI, performance, accessibility or maintainability consequence are listed.

| Issue | Location | UI consequence |
| --- | --- | --- |
| No `Button` primitive; pill duplicated 7x | 7 files | **Direct cause of C-2.** Padding already drifting across copies |
| `Icon` wrapper bypassed 10x | 6 files | **Direct cause of H-7** |
| `SectionHeader` pattern duplicated 6x | 6 files | **Direct cause of M-5** - never carried to the catalogue |
| Both responsive variants rendered, one hidden with CSS | `AboutSnippet.tsx:66, 107` | **Direct cause of H-1** - 12 MB duplicate download |
| `router.push` where `replace` is correct | `ProductFilters.tsx:32, 87` | **Direct cause of H-5** |
| Separator keyed to array index, not layout position | `Hero.tsx:130` | **Direct cause of M-2** |
| Single ref assigned inside `.map()` | `Navbar.tsx:80` | Latent (L-5) |
| `Math.random()` during render | `BrickWallPattern.tsx:18` | Hydration mismatch if revived (L-2) |
| 4 dead components still exported | `home/index.ts`, `ui/index.ts` | Dead code referencing re-pointed tokens (L-1) |
| 2 lint warnings | 2 files | Violates the project's zero-warning rule (L-3) |
| Hardcoded hex in components | 3 files | Bypasses the token layer (M-12) |
| `--container-8xl` used once | `products/page.tsx:68` | **Direct cause of M-1** |
| `qualities: [75, 85, 90]` with 90 unused | `next.config.ts:5` | Dead config (L-4) |

### What is well built

Worth stating plainly, because most of this codebase is good:

- Correct Server/Client boundaries - only 4 `"use client"` files, each justified.
- `src/data/products.ts` is typed to match the planned Prisma model, so the DB swap needs no component changes. The comment explaining this is exactly the kind of comment worth writing.
- The folder structure follows the project convention precisely, with barrels and absolute imports throughout.
- `IsometricLines` precomputes its grid at module scope with a comment explaining the hydration reasoning.
- The search implementation correctly searches production-table output names, so "paver" finds the machines that make pavers - verified live, returns 4 of 5 machines.
- `tsc --noEmit` passes clean under `strict`.
- No clickable `<div>`s anywhere.

---

## 24. Recommended Fixes

### Immediate, under an hour each

| Fix | ID | Change |
| --- | --- | --- |
| CTA text to ink | C-2 | `text-white` → `text-brand-ink` on `.bg-rusted-yellow` consumers. 2.15:1 → 9.1:1 |
| `inert` on collapsed dropdown | H-2 | One attribute removes 5 phantom tab stops |
| `router.replace` in filters | H-5 | Two call sites |
| Reduced-motion block | H-8 | One media query in `globals.css` |
| Remove duplicate video render | H-1 | Saves 12 MB |
| `preload="none"` on videos | C-1 | Removes video from the critical path |
| Products container `8xl` → `7xl` | M-1 | One class |
| Skip link | M-11 | One element |
| `aria-expanded` on mobile toggle | M-10 | Two attributes |
| Fix 2 lint warnings | L-3 | Delete unused symbols |
| Delete 4 dead components | L-1, L-2 | Removes dead code and a latent hydration bug |

### Short, a day or less

| Fix | ID |
| --- | --- |
| Re-encode both videos, strip audio, `+faststart` | M-8, C-1 |
| Route 10 raw icon spans through `Icon` | H-7 |
| Global `:focus-visible` token, remove `outline-none` | H-6 |
| Accessible-text yellow token, apply to all light-background headings | H-3 |
| Mobile drawer sub-menu; category links to `?category=` | H-4 |
| Badge divider via grid + conditional `divide-x` | M-2 |
| `ProductCard` hover and focus states | M-6 |
| Video posters through `next/image`; cap `deviceSizes` at 1920 | Perf |
| OG, Twitter, canonical, `sitemap.ts`, `robots.ts`, JSON-LD | M-9 |
| Table `scope="col"`; input `aria-label`; `aria-live` result count | A11y |

### Structural, multi-day

| Fix | ID |
| --- | --- |
| Extract `Button`, `SectionHeader`, `Card` primitives | M-5, C-2 |
| Normalise the token set per section 22 | M-12 |
| Bring the homepage visual language to the catalogue pages | M-5 |
| Spec tables to card layout below `sm` | M-3 |
| Real image gallery on the detail page | M-4 |
| Move media to Cloudinary; purge 40 MB of unreferenced assets | H-9 |
| Styled `not-found.tsx` and `error.tsx` | Section 16 |

---

## 25. Prioritized Development Roadmap

### Phase 1 - Critical (1-2 days)

Everything here is either a page that does not render or a WCAG blocker on the primary CTA.

1. **C-1** - video off the critical path: `preload="none"`, `IntersectionObserver` mounting, re-encode, remove the duplicate render (**H-1**), posters through `next/image`.
   Target: homepage under 4 MB, hero image painting within 2.5 s on Fast 4G, `load` firing.
2. **C-2** - CTA text to ink across all seven copies.
3. **H-2** - `inert` on the collapsed dropdown, plus `aria-haspopup`, `aria-controls`, keyboard open and `Escape`.
4. **H-6** - one global `:focus-visible` token, remove `focus:outline-none`.
5. **H-8** - the `prefers-reduced-motion` block and a pause control on the large reel.

**Exit criteria:** hero renders on a cold Fast 4G load; zero axe contrast violations on CTAs; full keyboard traversal with a visible ring at every stop and no invisible focus stops.

### Phase 2 - High Impact (2-3 days)

6. **H-3** - accessible text yellow across every light-background heading.
7. **H-4** - mobile sub-menu; the five category links repointed at `?category=`.
8. **H-5** - `router.replace`.
9. **H-7** - ten raw icon spans through `Icon`, plus the lint rule.
10. **M-2**, **M-1**, **M-6**, **M-10**, **M-11** - badge divider, container alignment, card states, ARIA state, skip link.
11. **M-9** - OG, canonical, sitemap, robots, JSON-LD.

**Exit criteria:** mobile reaches every desktop destination; Back exits the page in one press; link previews render correctly.

### Phase 3 - Design System (3-5 days)

12. **M-12** - normalise tokens per section 22; update `CLAUDE.md` to match what ships.
13. Extract `Button`, `SectionHeader`, `Card`; replace all duplicates.
14. **M-5** - apply the resulting system to `/products` and `/products/[slug]`.
15. **M-4**, **M-3** - real gallery; mobile card layout for spec tables.
16. **L-1** through **L-12**.

**Exit criteria:** no two tokens share a value; no hex literals outside `globals.css` except third-party brand colours; `/` and `/products` visibly share one design language.

### Phase 4 - Performance (1-2 days)

17. **H-9** - purge 40 MB; move media to Cloudinary.
18. **M-7** - long-lived cache headers on fingerprinted media.
19. `placeholder="blur"` on every image.
20. Cap `deviceSizes`; settle the quality value.
21. **First real Lighthouse and field-data run against the deployed site.**

**Exit criteria:** `public/` under 10 MB; measured LCP under 2.5 s on mobile field data.

### Phase 5 - Polish (1-2 days)

22. Scroll-spy active states for the four anchor nav items.
23. Styled `not-found.tsx` and `error.tsx`.
24. Disable rail arrows at their ends; add swipe and keyboard support to the hero carousel.
25. Normalise gap and shadow scales.
26. Real social profile URLs, or remove the icons.

---

## 26. Testing Matrix

### Responsive - measured programmatically for overflow and geometry

| Component / Page | 320 | 375 | 390 | 414 | 768 | 1024 | 1440 | 1920 | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Homepage - overflow | PASS | PASS | PASS | NOT TESTED | PASS | PASS | NOT TESTED | PASS | No overflow at any tested width |
| Homepage - hero image | FAIL | FAIL | FAIL | NOT TESTED | FAIL | FAIL | PARTIAL | FAIL | C-1. Rendered once, on the very first warm load at 1440 |
| Homepage - trust badges | FAIL | FAIL | FAIL | NOT TESTED | PASS | PASS | PASS | PASS | M-2, wrap defect at phone widths |
| Homepage - nav | PARTIAL | PARTIAL | PARTIAL | NOT TESTED | PARTIAL | PASS | PASS | PASS | H-4 below `lg` |
| Homepage - AboutSnippet | PASS | PASS | PASS | NOT TESTED | PASS | PASS | NOT TESTED | PASS | 43px text-to-photo clearance at 1024 |
| Homepage - Advantage | PASS | PASS | PASS | NOT TESTED | PASS | PARTIAL | NOT TESTED | PASS | Cards 176px at 1024 |
| Homepage - footer | PARTIAL | PARTIAL | PARTIAL | NOT TESTED | PASS | PASS | PASS | PASS | L-6 tap targets |
| `/products` - overflow | NOT TESTED | NOT TESTED | PASS | NOT TESTED | PASS | NOT TESTED | PASS | NOT TESTED | No overflow |
| `/products` - alignment | n/a | n/a | PASS | NOT TESTED | PASS | NOT TESTED | **FAIL** | NOT TESTED | M-1, 80px offset at 1440 |
| `/products` - grid | NOT TESTED | NOT TESTED | PASS | NOT TESTED | PASS | NOT TESTED | PASS | NOT TESTED | 5th card alone at `sm` |
| `/products/[slug]` - overflow | NOT TESTED | PASS | NOT TESTED | NOT TESTED | PASS | NOT TESTED | PASS | NOT TESTED | No overflow |
| `/products/[slug]` - spec table | NOT TESTED | **FAIL** | NOT TESTED | NOT TESTED | PASS | NOT TESTED | PASS | NOT TESTED | M-3, 179px hidden at 375 |
| `/products/[slug]` - thumbnails | NOT TESTED | **FAIL** | NOT TESTED | NOT TESTED | FAIL | NOT TESTED | FAIL | NOT TESTED | M-4 at every width |

414px and 2560px were not tested.
834px was not tested.

### Browsers

| Browser | Status |
| --- | --- |
| Chrome (desktop, via DevTools Protocol) | **TESTED** |
| Chrome mobile emulation | **TESTED** |
| Safari desktop | **NOT TESTED** |
| Safari iOS, real device | **NOT TESTED** |
| Firefox | **NOT TESTED** |
| Edge | **NOT TESTED** |

### Other

| Check | Status |
| --- | --- |
| Keyboard traversal, header and dropdown | TESTED - fails H-2 |
| Accessibility tree capture | TESTED - fails H-7 |
| Contrast, computed-style sampling | TESTED - fails C-2, H-3 |
| Tap-target measurement | TESTED - fails L-6 |
| Screen reader (VoiceOver / NVDA) | **NOT TESTED** |
| Lighthouse | **NOT RUN** |
| Core Web Vitals field data | **NOT AVAILABLE** |
| Network throttling (3G / 4G) | **NOT TESTED** - localhost unthrottled only |
| Landscape orientation | **NOT TESTED** |
| Print stylesheet | **NOT TESTED** - none exists |

---

## 27. Before vs After Recommendations

| Dimension | Now (measured) | After Phases 1-2 | After Phases 3-5 |
| --- | --- | --- | --- |
| Homepage transfer | **23.9 MB** | ~3.5 MB | ~2.5 MB |
| Video payload | 24 MB, 2 files, one downloaded twice | ~5 MB, lazy-mounted | ~5 MB, Cloudinary adaptive |
| Hero image on cold load | **Never renders** | Paints within 2.5 s | Paints with a blur placeholder |
| `load` event | **Never fires** | Fires under 3 s | Fires under 2 s |
| CLS | 0.00 | 0.00 | 0.00 |
| Primary CTA contrast | **2.15:1** | 9.1:1 | 9.1:1 |
| Heading accent contrast | **2.15:1** | 5.1:1 | 5.1:1 |
| Invisible tab stops | **5** | 0 | 0 |
| Elements with a visible focus ring | UA default only; removed on the input | All, via one token | All |
| Icon names announced as text | **5 in the footer** | 0 | 0 |
| Reduced-motion support | **None** | Full | Full |
| Mobile destinations reachable | 9 of 14 | 14 of 14 | 14 of 14 |
| History entries per 10-char search | **10** | 0 | 0 |
| Colour tokens / distinct values | 16 / 12, four duplicate pairs | unchanged | 14 / 14, zero duplicates |
| Distinct yellows | **7** | 8 (adds the accessible text yellow) | 4, all tokenised |
| Border-radius values | **8** | 8 | 4 |
| Pill CTA implementations | **7** | 7 | 1 |
| `public/` size | **79 MB** | ~61 MB | under 10 MB |
| Dead components | 4 | 4 | 0 |
| Lint warnings | 2 | 0 | 0 |
| OG / canonical / JSON-LD / sitemap | **none** | all present | all present |
| Estimated score | **54** | ~76 | ~88 |

---

## 28. Final Assessment

### Current State

This is a well-engineered site with one catastrophic delivery problem and a systematic accessibility gap.

The engineering fundamentals are genuinely good.
TypeScript strict passes clean.
Server Components are used correctly with only four client components, each justified.
The folder structure follows the project's own conventions precisely.
CLS measures 0.00 because every image sits in a container with a reserved aspect ratio.
**There is no horizontal overflow at any width from 320px to 1920px on any page** - which is rare, and reflects real care.
`svh` is used where most sites incorrectly use `vh`.
The empty state is better written than most production sites manage.

The homepage design is the site's biggest asset.
It looks like a company that builds serious machinery.

And almost none of that reaches a first-time visitor, because 24 MB of autoplaying video prevents the hero photograph from rendering at all.

### Biggest Problems

1. **24 MB of video blocks the hero image from ever painting.** Reproduced on every clean load; `load` never fires. (C-1)
2. **The primary CTA fails contrast at 2.15:1**, site-wide, in the five places that matter most - and the codebase documents the correct rule and then breaks it. (C-2)
3. **12 MB of that video is downloaded twice**, because both responsive variants render and one is hidden with CSS. (H-1)
4. **Half of every section heading fails contrast**, because components reach for the fill yellow instead of the accent token that exists for exactly this. (H-3)
5. **Five invisible keyboard tab stops** in the collapsed nav dropdown, which also cannot be opened by keyboard at all. (H-2)
6. **Mobile silently loses five of fourteen destinations.** (H-4)
7. **There is no `Button` component**, so the same pill is hand-written seven times - which is the mechanism that produced problem 2. (Section 21)
8. **Three documented colour palettes contradict each other and the shipped code**, sharing exactly one colour. (M-12)
9. **`/products` and the homepage read as different products.** (M-5)
10. **40 MB of unreferenced assets are committed and deployed**, against the project's own rule. (H-9)

### Quick Wins

Each under an hour, together clearing both CRITICAL findings and four HIGH ones:

- CTA `text-white` → `text-brand-ink`. One value, 2.15:1 → 9.1:1.
- `inert` on the collapsed dropdown. One attribute, five phantom tab stops gone.
- `preload="none"` on three videos, and delete the duplicate `FacilityVisual`. 12 MB and the critical-path block, gone.
- `router.push` → `router.replace`. Two call sites, Back button freed.
- The `prefers-reduced-motion` block. One media query.
- `max-w-8xl` → `max-w-7xl`. One class, alignment restored.
- Skip link, `aria-expanded` on the mobile toggle, two lint warnings, four dead components.

### Major Engineering Work

- **Media pipeline.** Re-encode, lazy-mount, posters through `next/image`, move to Cloudinary as the project rules already require.
- **Component primitives.** `Button`, `SectionHeader`, `Card`. This is the structural fix for C-2, M-5 and M-6 simultaneously.
- **Token normalisation**, including reconciling `CLAUDE.md` with what actually ships.
- **Carrying the design system to the catalogue pages.**
- **The unbuilt routes** - `/about`, `/contact`, `/privacy`, `/terms`, `/sitemap` - which are out of scope for this audit but are the gating item for launch, since every "Request a Quote" currently leads nowhere.

### Recommended Priority

1. **C-1 first, alone.** Nothing else in this report matters while the hero does not render. It is also the fix with the largest visible payoff.
2. **C-2 and H-3 together** - one token decision resolves both.
3. **H-2, H-6, H-8** - the keyboard and motion accessibility blockers, all small.
4. **H-1, H-4, H-5, H-7** - waste, mobile parity, history, screen-reader noise.
5. **Phase 3 design system**, before more pages are built - every new page built on the current tokens inherits C-2 and M-5 by default.
6. **Phase 4 performance and the first real Lighthouse run**, against the deployed site.
7. **Phase 5 polish.**

The ordering matters: doing the design-system work before `/about` and `/contact` are built is considerably cheaper than retrofitting them afterwards.

### Target State

After Phases 1 and 2, roughly two to three working days:
the homepage loads in under 3.5 MB with the hero photograph painting inside 2.5 seconds on mobile 4G; every CTA and heading meets WCAG AA; the whole site is keyboard-navigable with a visible focus ring at every stop and no invisible tab stops; reduced-motion is honoured; mobile reaches every destination desktop does; and the Back button behaves.

After Phases 3 to 5:
one token set with no duplicates, one `Button`, one `SectionHeader`, one visual language across every page; `public/` under 10 MB with media served from Cloudinary; complete SEO metadata and structured data; and a verified Lighthouse baseline against the deployed site.

The design work is already done and it is good.
What this site needs is for the delivery to stop getting in its way.

---

## Appendix - Evidence Index

| Claim | Method | Value |
| --- | --- | --- |
| Homepage transfer 23,945 KB | `performance.getEntriesByType('resource')`, production build | 23,930 KB video / 15 KB everything else |
| Hero image never loads | `img.complete && img.naturalWidth` polled to 30 s, repeated across 5 loads | `false`, `naturalWidth: 0` |
| `load` never fires | `navigation.loadEventEnd` after 90 s | `0`, `readyState: "interactive"` |
| Timeline video requested twice | Network capture | `reqid=150`, `reqid=151`, same URL, both `206` |
| Video bitrates | `ffprobe` | 9.52 Mbps / 10.08 Mbps, AAC present in both |
| CTA contrast 2.15:1 | Computed-style sampling, WCAG relative-luminance formula | `#ffffff` on `#f59e0b` |
| Heading accent 2.15:1 / 1.95:1 | Same | `#f59e0b` on `#ffffff` / `#f4f4f2` |
| 5 invisible tab stops | Programmatic focus traversal | 5 links, `parentOpacity: "0"`, `tabIndex >= 0` |
| Icon names in a11y tree | Accessibility-tree capture, `/products/hi-1500` | `StaticText "location_on"`, `"call"`, `"mail"`, `"smart_display"`, `"photo_camera"` |
| 5 history entries for 5 characters | `history.length` before and after scripted typing | 14 → 19 |
| Products grid 80px offset | `getBoundingClientRect()` at 1440 | Grid left 0, hero left 80 |
| Badge divider survives wrap | `getBoundingClientRect()` + computed style at 390 | Row-2 item, left 16, `border-left-width: 1px` |
| Table 179px off-screen | Element `scrollWidth` vs `clientWidth` at 375 | 520 vs 341, `scrollbar-width: none` |
| Thumbnail grid 70% empty | `getBoundingClientRect()` at 375 | Container 343px, one child 104px |
| No overflow at any width | Full-DOM edge comparison, scroll-container descendants excluded | 0 offenders at 320/375/390/768/1024/1440/1920 |
| Mobile menu missing sub-items | Drawer link enumeration at 375 | 9 links, no "Fly Ash" |
| CLS 0.00 | `PerformanceObserver('layout-shift')` | `0`, zero shift entries |
| 4K variant cost | `curl` against `/_next/image` | 1,162 ms cold, 1,382 KB |
| 40 MB unreferenced | Scripted reverse-reference of `public/` against `src/` | 120 files |
| 4 duplicate token pairs | Value-grouped parse of `globals.css` | `#f59e0b`, `#d97706`, `#121417`, `#ffffff` |
| Search input escapes HTML | `curl` with an injected payload | Rendered as `&lt;img ...&gt;`; no `dangerouslySetInnerHTML` in `src/` |
| Lint warnings | `npm run lint` | 2 warnings, 0 errors |
| TypeScript | `npx tsc --noEmit` | Clean |
| Client JS | `.next/static` measurement | 619 KB across 12 chunks |

### Security note

No frontend security issues were found.
The `q` search parameter is correctly escaped by React and renders as inert text.
`dangerouslySetInnerHTML` appears nowhere in `src/`.
Invalid `category` values degrade safely to an empty result rather than erroring.
No secrets, tokens or internal identifiers are exposed in the rendered markup.
`.env.local` is correctly gitignored and no environment values appear in the client bundle.
There is no auth surface yet, so session-expiry UX is not applicable.
