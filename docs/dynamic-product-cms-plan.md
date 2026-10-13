# Dynamic Product CMS — Plan

Turning the hardcoded catalog into an owner-editable one, without losing the
static-rendering properties the current site gets for free.

Companion to `docs/harvin-industries-plan.md` (sitemap, brand, brochure facts).
Where the two disagree on stack, this document wins — it supersedes the Vercel
and Neon-only assumptions in section 2 of that plan.

## 1. Starting State (historical, before Phase 1)

All public content is compiled into the bundle:

- `src/data/products.ts` — the catalog, 409 lines, `Product[]`.
- `src/data/company.ts`, `src/data/contact.ts` — company facts, contact details.
- No Prisma, no `schema.prisma`, no `DATABASE_URL`, no auth, no `/admin`.
- `src/app/contact/actions.ts:69` validates a quote request then `console.info`s
  it. Leads are not stored anywhere.

The `Product` type already mirrors the Prisma model in section 3 of the main
plan, so the data shape does not change. Three things do block the swap:

1. **Client components import the catalog directly.** `Navbar.tsx:8`,
   `ContactForm.tsx:6` and `ProductFilters.tsx:6` are all `"use client"` and
   `import { PRODUCTS }`. A client component cannot query a database, and Navbar
   renders on every page — so the entire catalog is in the client bundle today.
   These have to take data as props from a server parent before anything else
   moves.
2. **No `loading.tsx` on any route.** There is exactly one skeleton, for the
   filter sidebar (`src/app/products/page.tsx:34`). Navigation feels instant
   only because every page is static. Once reads hit a database, a route with no
   Suspense boundary stalls on a blank screen.
3. **56 MB of images committed to `public/`.** Against the project rule that
   media lives on a CDN, and the owner cannot add a photo for a new machine
   without a developer.

## 2. Stack

| Layer | Choice | Cost | Why |
|---|---|---|---|
| Host | Cloudflare Workers via `@opennextjs/cloudflare` | $0 | No commercial-use bar, unlike Vercel Hobby. Workers Free covers 100k req/day. |
| Database | Neon Postgres + Prisma (`@prisma/adapter-neon`) | $0 | HTTP driver is fetch-based, so it runs inside a Worker with no TCP pool. |
| ISR cache | Workers KV (incremental cache) + D1 (tag cache) | $0, no card | Backs `revalidateTag`, which is the mechanism the whole design rests on. R2 was the first choice but Cloudflare requires a payment method to enable it; KV and D1 do not. |
| Media | Cloudinary | $0 | Free tier explicitly permits commercial production use. Also serves as the image optimizer, which Workers does not provide free. |
| Auth | Auth.js v5, credentials, single owner, JWT session | $0 | Edge-compatible, no session table needed. |
| Leads | Postgres row + admin inbox, WhatsApp click-to-chat on the public site | $0 | No email provider. See §6. |

Total recurring: **$0**, plus the domain. No payment method is on any account,
so nothing can bill: if a free limit is hit the service stops rather than charges.
This is a hard requirement from the client's budget, not a preference.

### Cost ceiling, honestly

Free tiers hold for a catalog of this size and a B2B traffic profile. The first
thing to exceed a limit would be Cloudinary's 25 monthly credits, and only if
the owner uploads video or the site takes serious traffic. Neon's free branch
sleeps after inactivity — irrelevant here, because visitors read cached pages
and never touch the database (§3).

### Risks of the Cloudflare choice

These are real and worth naming before we start, not after:

- Next 16 on Workers runs through OpenNext, not natively. ISR and
  `revalidateTag` need the KV + D1 cache bindings wired explicitly; on Vercel
  they are automatic.
- **`next` is pinned to exactly `16.3.8`.** The adapter (1.20.10) supports
  `>=16.3.8`, but 16.4.0 returned 500 on every route (unexpected
  `preview-props.json` manifest load). Do not upgrade `next` until the adapter
  is confirmed to support the newer version; test under `wrangler dev` first.
- KV is eventually consistent, so an owner edit can take up to about a minute
  to appear publicly (R2 would be about a second). Accepted trade-off for
  needing no card.
- Anything in `public/` is published. Keep source documents elsewhere
  (`docs/source/`).
- Prisma needs `driverAdapters` and a no-engine build to fit the Worker bundle.
  If it fights us, Drizzle is the fallback — it is lighter and Workers-native.
  Decide only if we hit the wall; do not pre-emptively switch.
- `next/image` needs a Cloudinary loader configured, or every image ships
  unoptimized.

If any of these cost more than a day, Vercel Pro at $20/mo is the escape hatch.

## 3. Rendering Strategy
**This is the core decision. Everything else follows from it.**

Public pages stay statically prerendered and served from Cloudflare's edge. They
are not server-rendered per request. When the owner saves a product, the write
handler calls `revalidateTag('products')`, and the affected pages regenerate
within about a minute (KV is eventually consistent) — no rebuild, no redeploy,
no downtime.

Consequences, each of which is one of the stated requirements:

- **Zero downtime.** A visitor reads cache, never Postgres. If Neon is asleep,
  paused, or down, the public site is unaffected. An owner edit that fails
  leaves the last good page in place.
- **SEO.** Crawlers get fully rendered HTML at edge latency, exactly as today.
  Nothing regresses.
- **Cost.** Reads are cache hits. Database queries happen on revalidation and in
  `/admin`, not on visitor traffic.

Per-route caching:

| Route | Strategy |
|---|---|
| `/` | Static, tag `products` (latest-products feed), 1h safety revalidate |
| `/products` | Dynamic (reads `searchParams`), data from the tagged `products` cache. Making it static with client-side filtering is possible later |
| `/products/[slug]` | Static via `generateStaticParams`; unknown or new slugs render on first visit and are cached. Tags `products` + `product:<slug>` |
| `/sitemap.xml` | `force-dynamic`, data from the tagged `products` cache |
| `/about` | Static (nav and footer come from the root layout) |
| `/contact` | Dynamic (reads `?product=`), machine list from the tagged cache |
| `/admin/*` | `force-dynamic`, never cached, `noindex` |

## 4. Skeleton Loading, No Full Page Load

Requirement: users browsing products never see a full page load, only skeletons.

- `loading.tsx` at `app/products/` and `app/products/[slug]/` so route
  transitions stream a skeleton instead of stalling.
- The Next client router keeps the layout — Navbar, Footer, hero — mounted
  across navigations. Only the content region swaps. No white flash, no reload.
- `<Suspense>` around the product grid specifically, so the page shell and
  filters paint immediately while results stream in.
- `<Link prefetch>` on product cards: by the time a visitor clicks, the detail
  page is usually already in the router cache and appears with no skeleton at
  all.
- Skeletons mirror the real card geometry so there is no layout shift when
  content lands. Reuse the existing pattern at `products/page.tsx:34`.
- Filtering stays URL-driven (`?q=`, `?category=`) with `router.replace` and
  `scroll: false`, as it works today — shareable, indexable, no reload.

## 5. Schema

Extends section 3 of the main plan. Notes on fields that the CMS makes tricky:

- `slug` is **immutable in the UI by default.** If the owner renames a machine,
  the slug does not follow unless they explicitly opt in, and opting in writes a
  `Redirect` row so the indexed URL 301s instead of 404ing. Without this, one
  rename silently drops a ranked page.
- `status` — `draft` | `published`. Drafts are invisible publicly and excluded
  from `generateStaticParams` and the sitemap, so the owner can prepare a
  listing before launch.
- `sortOrder` — integer, so the owner controls catalog order without renaming.
- Flexible fields (`specs`, `productionTable`, `featureGroups`) are JSONB,
  matching the current TypeScript shapes exactly. Zod schemas validate on write
  and the inferred types replace the hand-written ones in `data/products.ts`.
- `Lead` — the contact form's existing validated fields, plus `handled` boolean.

## 6. Leads

Stored in Postgres, read in the admin inbox. No email provider.

Flagged as a real risk, then built as asked: without a notification, a quote
request sits unseen until the owner happens to log in. B2B machine enquiries go
cold in hours. Mitigations inside the chosen approach:

- Unhandled-lead count badge in the admin nav.
- Prominent click-to-WhatsApp on the public site so buyers who prefer it reach
  the owner directly and instantly, bypassing the form entirely.

Resend's free tier (3k/mo) remains a half-day add-on whenever the owner wants
it. Not in scope now.

## 7. SEO

- `generateStaticParams` reads published products from the database.
- `generateMetadata` keeps its current shape, fed live fields. Canonicals, OG
  and Twitter cards unchanged.
- `sitemap.ts` becomes dynamic and revalidates on the `products` tag, so a new
  machine is in the sitemap within about a minute of publishing.
- Existing `Product` and `BreadcrumbList` JSON-LD stay, fed live data. Add
  `Organization` on the homepage.
- `/admin/*` gets `robots: { index: false }` and is disallowed in `robots.ts`.
- Slug redirects per §5.
- Every image carries real alt text, required in the CMS form, not optional.

## 8. Phases

Each phase leaves `main` deployable. The site stays live throughout — the public
pages do not change behaviour until phase 4 flips the data source.

1. **Decouple client components.** `Navbar`, `ContactForm`, `ProductFilters`
   take products as props instead of importing `PRODUCTS`. Pure refactor, still
   static data, no behaviour change. Shrinks the client bundle immediately.
   *This is the prerequisite for everything else.*
2. **Skeletons.** Add `loading.tsx` and Suspense boundaries while data is still
   static, so the loading states are verifiable in isolation.
3. **Database (done).** Prisma schema, migration, seed script that imports the
   current `products.ts` verbatim. Repository layer in `src/lib/products.ts`
   (plain functions at the time; `unstable_cache` was added in Phase 4).
4. **Flip the data source (done, not yet deployed).** Pages read from the
   repository through `unstable_cache`. `data/products.ts` is gone; its rows live
   in `prisma/seed-data.ts` (seed only). Verified the rendered output matches.
5. **Media to Cloudinary.** Migration script, Cloudinary `next/image` loader,
   image URLs move to the database. `public/images` leaves the repo.
6. **Auth + admin.** Auth.js owner login, middleware guard, product CRUD,
   Cloudinary signed upload for images and brochure PDFs, revalidation on write.
7. **Leads.** Persist submissions, admin inbox, WhatsApp CTA.
8. **Cloudflare deploy.** Split in two because it was the riskiest step:
   - **8a, deploy spike (done early, see Progress).** OpenNext adapter, KV and D1
     cache bindings, static site live on `workers.dev`.
   - **8b, production (last).** Neon `DATABASE_URL` and auth env vars as Worker
     secrets, custom domain, Cloudinary image loader, and verify ISR and
     `revalidateTag` actually work in production. Needs Phases 3 to 7 first.

## Resume Here (read this first in a new session)

**State:** Phases 1, 2, 3, 4 and 8a are done and committed on
`feature/dynamic-product-cms` (not pushed, not merged to `main`). Phase 4 is
verified locally but **not deployed**: the live `workers.dev` site still runs the
old static-data build and is not broken.

**Before the next deploy:**
1. Set the Worker secret from `.env.local` without printing it:
   `grep '^DATABASE_URL=' .env.local | cut -d= -f2- | tr -d '"' | npx wrangler secret put DATABASE_URL`
2. The user runs `! npm run deploy` (the assistant's own deploys are blocked by
   the permission classifier).
3. Re-check the live routes, and that unknown slugs and `/contact?product=` work.

**Next phase: 5, media to Cloudinary.** Blocked on a Cloudinary account created
with the company email, no card. Then: migration script, `next/image` loader,
image URLs into the database, `public/images` leaves the repo.

**Working rules that bit us (see Progress for detail):**
- No payment method on any account. Free limits stop service, they never bill.
- `next` is pinned to `16.3.8` and Prisma to `7.10.0`. Do not bump either without
  testing under `npx opennextjs-cloudflare preview`.
- Anything in `public/` is published. Keep source documents in `docs/source/`.
- Before every preview, kill stale processes:
  `pkill -9 -f opennextjs-cloudflare; pkill -9 -f wrangler; pkill -9 -f workerd`.
  A stale one keeps answering on the port with the old build.
- Preview logs are not in the terminal. Read them from
  `http://localhost:8787/cdn-cgi/local/explorer/api/local/observability/query`
  (POST `{"sql":"SELECT level, message FROM logs ..."}`).
- Keep secrets out of chat and the repo. `.env.local` and `.dev.vars` are
  git-ignored and mode 600. The Neon CLI is signed in on the dev machine.

**Open decisions for the user:** soft 404 on unknown product slugs (drop
`products/[slug]/loading.tsx`, or accept `noindex`); commit or ignore
`.claude/skills/` and `skills-lock.json` (left untracked); account handover terms;
`unstable_cache` is marked replaced by `use cache` in Next 16, revisit later.

## Progress

- **Phase 1 done** (on `feature/dynamic-product-cms`, direct commits — this
  branch is already the CMS work branch, no sub-branch needed). `Navbar`,
  `ContactForm`, `ProductFilters` no longer import `PRODUCTS` from
  `@/data/products` — they take `products: Product[]` as a prop. Every call
  site now passes `PRODUCTS` explicitly (`page.tsx`, `about/page.tsx`,
  `products/page.tsx`, `products/[slug]/page.tsx`, `contact/page.tsx` via
  `ContactHero`, `not-found.tsx`, `error.tsx`). `CATEGORY_LABELS` stayed a
  direct import in all three — it's a fixed 3-entry `Record<Category, string>`
  lookup, not catalog data, so it isn't part of what moves to the DB later.
  `npm run build` and `npm run lint` both clean; prerendered routes unchanged
  (same static/SSG/dynamic split as before).
- **Phase 2 done.** `src/app/products/layout.tsx` now hosts `Navbar`/`Footer`
  so they stay mounted across `/products` ⇄ `/products/[slug]` navigations
  instead of being duplicated per-page. Added `loading.tsx` at both routes.
  Extracted `ProductFiltersSkeleton` and `ProductGridSkeleton` into
  `src/components/products/` (barrel-exported) so `loading.tsx` and the
  in-page `<Suspense>` fallbacks share one skeleton, matching real card/filter
  geometry. `/products` results (count + grid/empty state) are now in their
  own `ProductResults` component wrapped in `<Suspense>`, ready for Phase 3/4
  to make that boundary meaningful. `ProductCard` already uses `next/link`,
  which prefetches static routes by default — no change needed there. Build
  showed `/products` is genuinely dynamic today (reads `searchParams`
  server-side), so this `loading.tsx` is not just future-proofing — it covers
  the real per-navigation server round trip now; `/products/[slug]` stays SSG,
  so its `loading.tsx` is inert until Phase 3/4. `npm run build` and
  `npm run lint` clean; route static/dynamic split unchanged.
- **Phase 3 done (database, not yet wired to pages).** Schema in
  `prisma/schema.prisma`: `Product` mirrors the TS type field for field plus
  `status` (draft|published), `sortOrder`; `Redirect` (`fromSlug`→`toSlug`) for
  slug-rename 301s; `Lead` holds the contact form's eight fields plus `handled`.
  The main plan's `Product` model (machine|output_item, material, price) is
  stale and was not used. Prisma is pinned to exactly `7.10.0` (npm had pulled a
  v8 release candidate for the CLI); client generated to `src/generated/prisma`
  (git-ignored, ESLint-ignored). `prisma.config.ts` reads `.env.local` and uses
  `DIRECT_URL` for migrations; `db.ts` uses the pooled `DATABASE_URL` through
  `@prisma/adapter-neon`. `src/lib/products.ts` exports `getAllProducts`,
  `getPressModels`, `getProductBySlug`, `getRelatedProducts`,
  `getPublishedSlugs`, returning the existing `Product` shape, as plain async
  functions with no caching at that point (added in Phase 4). `prisma/seed.ts` upserts from
  `PRODUCTS`, idempotent. Migration `init` applied; `migrate status` is up to
  date. Verified by reading all 5 products back through the repository and
  deep-comparing against `data/products.ts` (all match, same order). Lint and
  build clean, route split unchanged. `.env.example` added and un-ignored
  (`.env*` was swallowing it). Not yet tested: `channel_binding=require` in the
  connection strings from inside a Cloudflare Worker (Phase 8b).
- **Phase 8a done (Cloudflare deploy spike, merged into this branch).**
  `@opennextjs/cloudflare` 1.20.10 + `wrangler` added; `open-next.config.ts`
  uses `kvIncrementalCache` + `d1NextTagCache`; `wrangler.jsonc` binds
  `NEXT_INC_CACHE_KV` and `NEXT_TAG_CACHE_D1`; scripts `preview`, `deploy`,
  `upload`, `cf-typegen`. Static site is live at
  `https://harvin-industries.harvin-industries.workers.dev` on the company
  Cloudflare account. All routes, `/_next/image` and the sitemap return
  correctly; worker is about 1.1 MB gzipped against the 3 MB free limit. Not
  yet tested: `revalidateTag` (needs the DB), custom domain, Cloudinary loader.
  Findings: `next` pinned to `16.3.8` (16.4.0 breaks the adapter, see §2);
  R2 needs a payment method so KV replaced it; the adapter only auto-creates
  R2, so the KV namespace and D1 database were created by hand with
  `wrangler kv namespace create` / `wrangler d1 create` and their IDs are in
  `wrangler.jsonc` (identifiers, not secrets). ESLint now ignores
  `.open-next/**` and `.wrangler/**`.
- **Accounts:** Cloudflare and Neon are created, owned by the developer under
  the company's main email (kept out of the repo), no card on either. Handover to
  the client, 2FA and recovery codes are still to be settled in writing. The
  Cloudinary account is not confirmed created yet (needed for Phase 5).
- **Cleanup done:** three owner `.docx` source files were publicly downloadable
  from `public/`; moved to `docs/source/` and redeployed; all three now return 404 on the live
  site (verified 2026-10-13). Still in
  `public/` and to review: `images/brochure/raw/` and the unused template SVGs
  (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`). Phase 5
  removes `public/images` entirely.
- **Neon resolved.** Org `Harvin Industries` (Free plan, no card) on the company
  account holds project `Harvin_Industry_Project` in Singapore
  (`aws-ap-southeast-1`), chosen for latency to Indian visitors. Free tier
  scales to zero when idle (first query after idle is slower, handled by
  `withWakeRetry`; public pages are cached so visitors do not hit it). Plan to
  move to Neon Launch (billed to the client, needs a card) once live, for real
  backups. Neon CLI (`npx neon login`) is signed in on the dev machine; the
  connection strings were written to `.env.local` directly by the CLI.
- **Phase 4 done (data source flipped, verified locally, NOT deployed).**
  - *Caching:* `unstable_cache` (chosen over `use cache` to avoid the site-wide
    `cacheComponents` switch; Next 16 marks it replaced, so revisit later). All
    reads go through `src/lib/products.ts`: `getAllProducts` (tag `products`),
    `getProductBySlug` (tags `products` + `product:<slug>`), and the rest derive
    from `getAllProducts`. A 1-hour `revalidate` is the safety net if a
    `revalidateTag` call is ever missed. Missing products are cached as `null`
    (JSON has no `undefined`).
  - *Types and content:* `Product` and friends plus `CATEGORY_LABELS` moved to
    `src/lib/product-types.ts` (client-safe). `PRESS_COMMON_STANDARDS` and
    `OUTPUT_FORMS` moved to `src/data/catalog-content.ts`.
  - *Layout:* `Navbar` and `Footer` now live once in the root layout, fed by the
    cached catalog, with a `.catch(() => [])` so a database failure degrades the
    nav search instead of every page. Removed seven per-page copies and
    `src/app/products/layout.tsx`. `error.tsx` is a client component and could
    not call the database, so this also fixed it.
  - *Routes:* `/products`, `/contact` and `/sitemap.xml` stay dynamic (they read
    `searchParams` or must be fresh) but read the tagged cache, not Neon, except
    on a cache miss. The sitemap is `force-dynamic`. `generateStaticParams` reads
    published slugs, and `dynamicParams` stays on so a newly published machine
    renders on first visit without a rebuild.
  - *Server action:* the quote form validates the chosen machine against live
    published slugs.
  - *Verification:* lint and build clean. Rendered HTML of 11 routes compared
    against the live static-data site: no content differences, only Suspense
    comment markers, per-build form action keys, generated IDs and a meta tag
    order swap. Also exercised under `opennextjs-cloudflare preview` against
    Neon: every route 200, zero logged errors.
  - *Prisma on Workers (found and fixed):* Workers forbid compiling WASM at
    runtime, so the default client failed with `Wasm code generation disallowed
    by embedder` (hidden by the retry wrapper, which then made every DB route
    take about 6 seconds and fail). The schema now has `runtime = "workerd"` for
    the app client, plus a second `nodeClient` generator (output
    `src/generated/prisma-node`) because the seed runs in Node. `db.ts` now logs
    each failed attempt so a real error is no longer masked as a cold start.
    `next build` prints one non-fatal Turbopack file-pattern warning from its
    WASM loader. Neon over the Worker websocket works with the current
    connection strings, including `channel_binding=require`.
  - *Needed before deploying:* the production Worker has no `DATABASE_URL`. It is
    only needed on a cache miss, but without it a miss means an error. Set it
    with `wrangler secret put DATABASE_URL` (pooled string), then
    `npm run deploy`. `.dev.vars` holds it for local preview (git-ignored, mode
    600). The build also reads `.env.local`, so a CI build would need it too.
  - *Known, pre-existing:* an unknown product slug returns HTTP 200 with a "Page
    Not Found" body and `noindex`, a soft 404. The old live site did the same.
    Likely cause: `app/products/[slug]/loading.tsx` streams a skeleton before the
    page can 404. Options: drop that `loading.tsx` (pages are cached, so it is
    barely visible), or accept `noindex` as sufficient.
- **Next: Phase 5, media to Cloudinary.** Needs a Cloudinary account first, created
  with the company email, no card. Then: migration script, `next/image` loader,
  image URLs into the database, and `public/images` leaves the repo. Persisting
  leads (Phase 7) wires into `contact/actions.ts`, not here.

## 9. Open Questions

- Domain for the live site — registered yet?
- Owner's WhatsApp number for the public CTA.
- Does the owner need multiple images per machine reorderable in the CMS, or is
  one primary image plus a gallery enough?
- Account handover to the client: who owns them long term, when the developer
  steps back to collaborator, and who pays if Neon moves to the paid tier.
- Confirm the registered `workers.dev` subdomain in the Cloudflare dashboard,
  since it is part of the public URL until a custom domain exists.
- Remove or keep `public/images/brochure/raw/` and the template SVGs.
