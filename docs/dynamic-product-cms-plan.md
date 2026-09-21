# Dynamic Product CMS — Plan

Turning the hardcoded catalog into an owner-editable one, without losing the
static-rendering properties the current site gets for free.

Companion to `docs/harvin-industries-plan.md` (sitemap, brand, brochure facts).
Where the two disagree on stack, this document wins — it supersedes the Vercel
and Neon-only assumptions in section 2 of that plan.

## 1. Current State

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
| ISR cache | R2 (incremental cache) + D1 (tag cache) | $0 | Backs `revalidateTag`, which is the mechanism the whole design rests on. |
| Media | Cloudinary | $0 | Free tier explicitly permits commercial production use. Also serves as the image optimizer, which Workers does not provide free. |
| Auth | Auth.js v5, credentials, single owner, JWT session | $0 | Edge-compatible, no session table needed. |
| Leads | Postgres row + admin inbox, WhatsApp click-to-chat on the public site | $0 | No email provider. See §6. |

Total recurring: **$0**, plus the domain.

### Cost ceiling, honestly

Free tiers hold for a catalog of this size and a B2B traffic profile. The first
thing to exceed a limit would be Cloudinary's 25 monthly credits, and only if
the owner uploads video or the site takes serious traffic. Neon's free branch
sleeps after inactivity — irrelevant here, because visitors read cached pages
and never touch the database (§3).

### Risks of the Cloudflare choice

These are real and worth naming before we start, not after:

- Next 16 on Workers runs through OpenNext, not natively. ISR and
  `revalidateTag` need the R2 + D1 cache bindings wired explicitly; on Vercel
  they are automatic.
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
within about a second — no rebuild, no redeploy, no downtime.

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
| `/` | Static, tag `products` (latest-products feed) |
| `/products` | Static shell; filtering is client-side over a prefetched list, tag `products` |
| `/products/[slug]` | Static via `generateStaticParams`, tag `products` + `product:<slug>` |
| `/sitemap.xml` | Dynamic, tag `products` |
| `/about`, `/contact` | Static |
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
  machine is in the sitemap within seconds of publishing.
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
3. **Database.** Prisma schema, migration, seed script that imports the current
   `products.ts` verbatim. Repository layer in `src/lib/products.ts` with
   `cacheTag`. Not yet wired to pages.
4. **Flip the data source.** Pages read from the repository. `data/products.ts`
   is deleted. Verify prerendered output is byte-identical to today's.
5. **Media to Cloudinary.** Migration script, Cloudinary `next/image` loader,
   image URLs move to the database. `public/images` leaves the repo.
6. **Auth + admin.** Auth.js owner login, middleware guard, product CRUD,
   Cloudinary signed upload for images and brochure PDFs, revalidation on write.
7. **Leads.** Persist submissions, admin inbox, WhatsApp CTA.
8. **Cloudflare deploy.** OpenNext adapter, R2 and D1 cache bindings, env vars,
   custom domain. Verify ISR and `revalidateTag` actually work in production —
   this is the step most likely to surprise us.

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
- **Next**: Phase 2 (skeletons / `loading.tsx` + Suspense boundaries), still
  against static data.

## 9. Open Questions

- Domain for the live site — registered yet?
- Owner's WhatsApp number for the public CTA.
- Does the owner need multiple images per machine reorderable in the CMS, or is
  one primary image plus a gallery enough?
