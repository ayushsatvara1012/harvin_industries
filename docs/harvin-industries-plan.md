# Harvin Industries — Site Plan

Status: **Phase 1 (Homepage) built, awaiting design review.** Building page-by-page,
not all at once — each phase gets built, reviewed against the live dev server, and
confirmed before moving to the next page. Content sourced from
`Harvin_brochures/HARVIN BROUCHER.pdf` and https://harvin-industries.grexa.site/.

## 0. Company facts (from brochure)

- **Legal/brand name:** Harvin Industries, Ahmedabad — ISO 9001:2015 certified.
- **Business:** manufactures Fly Ash Brick, Concrete Brick, Paver Block, Batching
  Plant, and Mixture machines.
- **Address:** Shed No 28, NK Industrial Park, Gatrad Bakrol Bujrang Kuha Road,
  Bakrol Bujrang, Ahmedabad, Gujarat 382430.
- **Phone:** +91 98985 75358
- **GSTIN:** 24FNRPS3414P1Z7
- **Contact person:** Mr. Dhaval Sathwara
- **Reference site hours:** Mon, Wed–Sun 9:30am–6pm (closed Tuesday)
- **No prices published anywhere** — brochure and reference site are both quote-based
  (standard for industrial capital equipment). Site should drive "Request a Quote",
  not display prices. `price` field stays optional/admin-only, hidden from public UI
  unless the owner explicitly wants a specific machine's price shown.
- **Brand marks:** hexagon "HI" logo (black stripes, one yellow accent stripe),
  wordmark "HARVIN" (bold) / "INDUSTRIES" (letter-spaced), tagline "Built for
  Performance".
- **Brand colors (decided — "Brochure Match" palette):**
  | Token | Hex | Use |
  |---|---|---|
  | `primary` (yellow) | `#F5D613` | CTAs, accents, highlights |
  | `primary-hover` | `#D4B910` | Hover/active state on yellow elements |
  | `charcoal` | `#2B2B2A` | Dark panels, header/footer, headings |
  | `background` (off-white) | `#F7F5F0` | Page background |
  | `surface` (white) | `#FFFFFF` | Cards |
  | `text-secondary` | `#5A5A58` | Body copy on light background |
  | `border` | `#E5E2DA` | Dividers, card borders |

  Wired into Tailwind as `theme.colors.brand.*` in `tailwind.config.ts` once scaffolded.
  TODO: confirm exact hex against a real brand file if the owner has one — these are
  sampled from the brochure.
- **Typography feel:** bold condensed sans headings (heavy weight), clean sans body —
  matches Tailwind default `font-sans` (Inter) with a heavier display weight for H1/H2.

## 1. Sitemap (approved)

**Public**

- `/` — Home: hero (brochure cover render), company intro (About Our Company copy),
  "latest products" (auto from DB, most recent N), Key Factors / Why Harvin section,
  CTA to catalog/contact.
- `/products` — **Unified catalog** (machines + brick/block output items):
  searchbar, left sidebar with advanced filters (Type, Category, Material, Price
  range, Output capacity), grid of results. Filter state lives in URL query params.
- `/products/[slug]` — Product detail: images, full specs table (production spec
  table for press models, brick-per-stroke/cycle time/dimensions/power etc.),
  brochure PDF download, "Request a Quote" CTA → `/contact?product=slug`. No price
  shown unless owner opts in (`priceVisible`). FAQ block marked up with `FAQPage`
  schema for AEO.
- `/about` — About Our Company, Vision, Mission (4 pillars), Key Factors, ISO
  9001:2015 badge.
- `/contact` — Contact + quote form combined (auto-fills product name when arrived
  via `?product=slug`), company info (address, phone, GSTIN, map).
- `/sitemap.xml` — auto-generated (Next.js `sitemap.ts`).
- `/robots.txt` — crawl rules, references `/sitemap.xml` and `/llms.txt`.
- `/llms.txt` — plain-text company/product summary for LLM crawlers (GEO/AEO).

**Admin** (owner-only, behind auth)

- `/admin/login` — Owner login.
- `/admin` — Dashboard: product count, recent leads.
- `/admin/products` — List all products (machines + output items), edit/delete.
- `/admin/products/new`, `/admin/products/[id]/edit` — Create/edit product.
- `/admin/leads` — View contact/quote form submissions.
- `/admin/settings` — Owner account settings.

Dropped from earlier draft: a standalone `/quote` page (folded into `/contact`) and
a separate output-forms page (folded into the unified `/products` catalog via the
Type filter).

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | SSR/SEO for product pages, one deploy target |
| Styling | Tailwind CSS | Fast, consistent, matches stated preference |
| Database | Neon (serverless Postgres) + Prisma (`@prisma/adapter-neon`) | Relational core (products/leads) with JSONB columns for flexible spec/FAQ fields; Neon's HTTP driver is Vercel-serverless-friendly, avoids connection-pool exhaustion |
| Media | Cloudinary | Image/PDF hosting + on-the-fly resizing, keeps repo clean |
| Auth | NextAuth, credentials provider | Single owner login, no need for social auth |
| Forms | Server Action → Mongo, optional email via Resend | Quote/contact leads stored + owner notified |
| Hosting | Vercel | Native Next.js support, git-based deploys |
| SEO/GEO/AEO | Next.js `generateMetadata` + `sitemap.ts`/`robots.ts`, JSON-LD (`Organization`, `Product`, `FAQPage`, `BreadcrumbList`), static `llms.txt` | Standard technical SEO plus LLM-crawler-readable summary |
| Search/filter | Client-side query-param-driven filtering over a server-fetched product list (no separate search service) | Catalog is small (~10-20 items) — a search index (Algolia/etc.) is overkill |

## 3. Data Model (Postgres / Prisma)

One `Product` table so `/products` can filter/search across both machines and
output items with one query. `type` discriminates which fields apply. Variable-shape
fields (specs, production table, FAQ, image list) live in `JSONB` columns — keeps
Mongo-style flexibility while the scalar fields stay properly typed/indexed columns.

**Product**
```prisma
model Product {
  id                  String   @id @default(cuid())
  slug                String   @unique
  name                String            // e.g. "HI-2000" or "Zig Zag Paver Block"
  type                ProductType       // machine | output_item
  category            String            // machine: press|batching_plant|mixture
                                          // output_item: brick|paver|block|curb|drain
  material            String?           // output_item only: fly_ash | concrete
  images              String[]          // Cloudinary URLs
  brochurePdf         String?           // Cloudinary URL, machine only
  price               Decimal?
  priceVisible         Boolean  @default(false)
  outputCapacity        Int?             // pcs/hour, machine only — filter range field
  specs                 Json?            // [{ label, value }] ordered list
  productionSpecTable    Json?           // press models only: [{ product, sizeMm, pcsPerMould, pcsPerHour }]
  description             String?         // markdown
  faq                      Json?           // [{ question, answer }] -- drives FAQPage JSON-LD
  featured                  Boolean @default(false)
  createdAt                  DateTime @default(now())
  updatedAt                   DateTime @updatedAt
  leads                        Lead[]

  @@index([type, category])
}

enum ProductType {
  machine
  output_item
}
```

Full-text search on `name`/`description` via Postgres `tsvector` (generated column
+ GIN index) once catalog content is seeded — simple `ILIKE` is enough at launch scale.

**Lead** (contact/quote submissions)
```prisma
model Lead {
  id         String    @id @default(cuid())
  name       String
  email      String
  phone      String?
  message    String
  product    Product?  @relation(fields: [productId], references: [id])
  productId  String?
  status     LeadStatus @default(new)
  createdAt  DateTime  @default(now())
}

enum LeadStatus {
  new
  contacted
  closed
}
```

Homepage "latest products" = query sorted by `createdAt desc`, limit N (no separate
"featured" curation needed unless the owner wants manual pinning — `featured` flag
included for that case).

## 4. Architecture

- App Router route groups: `(public)` for marketing/catalog pages, `(admin)` for
  CMS, separated so admin layout/auth doesn't leak into public bundle.
- `middleware.ts` guards `/admin/*` except `/admin/login`, checks NextAuth session.
- API surface: prefer Server Actions for form submits + CMS mutations over separate
  REST routes, keeps it in one Next.js app with no extra API layer.
- Image upload flow: admin form uploads directly to Cloudinary (signed upload) from
  the client, only the returned URL is stored in Mongo — avoids proxying binary
  through the Next.js server.
- Single Prisma client instance cached across hot reloads/serverless invocations
  (standard Next.js + Prisma pattern) in `lib/db.ts`, using `@prisma/adapter-neon`
  over Neon's HTTP driver so it works in Vercel's serverless/edge functions without
  exhausting Postgres connections.
- Migrations via `prisma migrate` — schema changes are always a committed migration
  file, never a manual DB edit.
- `/products` catalog: server component fetches the full filtered/searched list
  based on parsed URL search params (`?type=&category=&material=&priceMin=&priceMax=&q=`)
  so results are server-rendered and crawlable; sidebar filter controls are a client
  component that pushes new search params via `useRouter`.
- SEO: `app/products/[slug]/page.tsx` and `app/products/page.tsx` export
  `generateMetadata`; JSON-LD injected via a small `<script type="application/ld+json">`
  server component. `app/sitemap.ts` queries all product slugs. `app/robots.ts`
  points to `/sitemap.xml` and `/llms.txt`. `public/llms.txt` is a static file
  regenerated whenever product/company copy changes materially.

## 5. Open items (need from owner)

- [x] Brochure specs/copy — sourced from `HARVIN BROUCHER.pdf`.
- [x] Company info (address, phone, GSTIN) — sourced from brochure + reference site.
- [x] Machine categories — press / batching-plant / mixture, confirmed from brochure.
- [ ] Standalone logo file (vector/high-res) and exact brand hex codes — brochure has
      the logo embedded in page images only; need a clean asset for favicon/header.
- [ ] High-res individual product photos (brochure images are laid out in a PDF
      collage, not resolution-independent) — 10 gallery images exist on the reference
      site (Google-hosted) that we can pull if the owner doesn't have originals.
- [ ] Batching Plant / Mixture Machine model-specific images if more than one shown.
- [ ] Email address (only phone + address found so far).
- [ ] Confirm whether quote-form leads need email notification (Resend) or
      dashboard-only is enough for now.
- [ ] Confirm whether any machine's price should actually be shown publicly, or if
      it's request-quote-only across the board (brochure/reference site show no
      prices at all — assuming quote-only unless told otherwise).

## 6. Build order

1. Scaffold Next.js + TS + Tailwind, repo conventions, env setup.
2. Neon Postgres + Prisma schema (`Product`/`Lead`), migration, seed script with brochure data.
3. `/products` catalog (search + filters, URL-param driven) and `/products/[slug]`.
4. Homepage with latest-products section.
5. `/contact` with combined contact/quote form → `Lead` storage.
6. NextAuth owner login + `/admin` dashboard + CRUD for products (Cloudinary upload).
7. SEO/GEO/AEO pass: metadata, JSON-LD, `sitemap.ts`, `robots.ts`, `llms.txt`.
8. Apply final brand assets (logo file, exact hex) once supplied.
9. Vercel deploy, connect domain.

## 7. Session status (last updated: this session)

**Repo state:** git initialized, on branch `chore/project-setup`, root commit
`6d99725` ("Scaffold Next.js project and build homepage (Phase 1)") — working tree
clean as of that commit. Next.js scaffolded via `create-next-app` directly into repo
root (had to scaffold into a temp dir first and move up, since the folder name
`Harvin_Industries` has capitals npm rejects — this is done, no action needed).
Note: `Harvin_brochures/` also has 3 WhatsApp images + 1 WhatsApp video committed
that hadn't been reviewed yet as of this note — check them for additional product
photos/content before the image-sourcing phase.

**Approach:** building **page by page**, not the whole site at once — each page gets
built, reviewed live at `localhost:3000`, and confirmed (palette/type/spacing) before
moving to the next. Do not jump ahead to other pages without that checkpoint.

**Decided this session (beyond what's in sections 0-6 above):**
- Sitemap finalized (section 1) — unified `/products` catalog replaces the earlier
  split `/machines` + `/products`(output-forms) idea; `/quote` folded into `/contact`.
- Database switched from MongoDB to **Neon Postgres + Prisma** (`@prisma/adapter-neon`)
  — `Product`/`Lead` Prisma models are in section 3. Not yet wired to actual code —
  homepage currently uses static/hardcoded data, no Prisma client exists yet.
- Color palette locked: "Brochure Match" (table in section 0) — wired into
  `src/app/globals.css` as Tailwind v4 `@theme` tokens (`brand-yellow`,
  `brand-charcoal`, `brand-bg`, `brand-surface`, `brand-text`, `brand-text-secondary`,
  `brand-border`). Note: Tailwind v4 uses CSS-based `@theme`, not `tailwind.config.ts`
  — there is no config file to edit for tokens, only `globals.css`.
- Fonts chosen: **Archivo** (weights 600/700/800) for headings/display, **Inter** for
  body — loaded via `next/font/google` in `src/app/layout.tsx`.
- Stack is Next.js 16 (Turbopack), React 19, Tailwind v4, ESLint 9 — versions matter
  for anything version-specific (App Router conventions, Tailwind syntax).

**Built so far:**
- `src/app/layout.tsx`, `src/app/globals.css` — fonts + brand tokens + metadata.
- `src/components/`: `Logo.tsx`, `Header.tsx` (client, mobile menu), `Hero.tsx`,
  `AboutSnippet.tsx`, `KeyFactors.tsx`, `LatestProducts.tsx` (static HI-1500/2000/3000
  data), `CtaBanner.tsx`, `Footer.tsx`.
- `src/app/page.tsx` — composes all of the above into the homepage.
- `npm run lint` and `npm run build` both pass clean.
- Dev server was running in background (task id `bcr5rk6zx`) at `localhost:3000` —
  may need restarting in a new session (`npm run dev`).
- Homepage images are all placeholders (labeled "pending") — hero graphic and the 3
  product cards — waiting on Higgsfield.

**Blocked / needs the user:**
- **Higgsfield MCP auth incomplete.** I cannot complete this OAuth flow myself — the
  user must run `/mcp` in their client and select "claude.ai Higgsfield" to
  authorize it. Once authorized, its image-generation tools become available and
  should be used to generate the 4K hero + product images (user's explicit ask:
  regenerate brochure-equivalent images at ultra-high-res for a modern look, not
  paste the low-res brochure images directly).
- Still open from section 5: logo vector file, high-res product photos, email
  address, domain, analytics choice, Resend email-on-lead decision, rich-text editor
  choice for CMS.

**Not started yet:** Prisma/Neon setup (no `schema.prisma`, no DB connection, no
`DATABASE_URL`), NextAuth, Cloudinary, `/products`, `/about`, `/contact`, admin
routes, SEO/GEO/AEO files (`llms.txt`, `sitemap.ts`, `robots.ts`, JSON-LD).

**Next step:** get the user's design feedback on the homepage (palette/fonts/type
sizes/spacing/section order), iterate on that until confirmed, then either connect
Higgsfield for real images or move to Phase 2 (`/products` catalog) per user
direction.

## 8. Session status — brochure document integration (2026-09-13)

**Branch:** `feature/brochure-content-integration` off `main`. Not merged.
`npm run lint` and `npm run build` both pass clean.

**Source:** three owner-supplied `.docx` files in `public/`:
`harvin about us ,vision details.docx`, `harvin machine model (3 model).docx`,
`harvin mixture machine (2 pcs).docx`.

**Spec corrections applied (docx treated as authoritative over the brochure
values previously committed in `src/data/products.ts`):**

| Model | Field | Was | Now |
|---|---|---|---|
| HI-1500 | Pallet size | 590 × 560 × 18 mm | 565 × 560 × 18 mm |
| HI-1500 | Electrical load | 30 KW | 22.5 KW |
| HI-2000 | Machine dimension | 10 × 8 × 2.5 m | 8 × 8 × 2.5 m |
| HI-2000 | Pallet size | 690 × 560 × 18 mm | 665 × 560 × 18 mm |
| HI-2000 | Electrical load | 34 KW | 25 KW |
| HI-2000 | Hydraulic tank | 450 L | 400 L |
| HI-3000 | Electrical load / power | 40 KW (60 HP) | 55 KW (75 HP) |

**Content placement decided (no content appears in two places):**

- `/about` — **new route.** About Us, Vision, Mission (4 pillars), Key Factors (4),
  founder's message + closing, signed by Mr. Dhaval Sathwara. Copy lives in
  `src/data/company.ts`, rendered by `src/components/about/`. Founder's letter sits
  last on the page deliberately: a first-time visitor wants the company and the
  certification before the letter.
- Homepage `AboutSnippet` — leads with `COMPANY_INTRO_PREDICATE` (the same sentence
  as `/about`, from one constant). Its three pillars are icon labels only; the full
  Key Factor text is `/about`-only.
- Homepage stats strip — now `COMPANY_STATS`: ISO 9001:2015 / 3 press models /
  9 product forms / Pan-India reach.
- Homepage "Our Products" grid — now the five real machines, each linking to its
  own detail page, followed by a "Nine forms. One standard." strip built from
  `OUTPUT_FORMS`.
- `/products` — `ModelComparison` table above the catalog grid, answering "which
  model do I need?" by daily output target.
- `/products/[slug]` — spec rows that differ between models carry a plain-language
  `note`, rendered as expandable `<details>` rows in `SpecTable`. Figures identical
  across the range (50–60 MT, 60 KN, 15–20 s) are stated **once** in
  `PRESS_COMMON_STANDARDS` and rendered by `PressStandards`, so the three press
  detail pages do not read as copies of each other.
- Mixture machine doc — no new page. Its Turbo/Planetary content was already
  accurate in `src/data/products.ts`; only the "Nine forms" line and the closing
  message were new, and both are placed above.

**Removed, with reason:**

- `ClientLogosSection` (L&T, Adani, TATA, UltraTech, Shree, Dalmia, Ambuja under
  "Our Valued Customers") — **deleted.** The founder's own message describes Harvin
  as "a new player in the industry", so a customer wall of those names is not
  defensible. Restore only with real, permissioned customer names.
- Homepage stats "500+ Machines Designed", "100+ Happy Customers", "Global Market
  Reach" — same reason. Replaced with verifiable facts.
- Nav/footer links to `/products#fly-ash`, `#concrete-blocks`, `#paver-blocks`,
  `#automatic-plants`, `#material-handling` — all five anchors never existed, and
  "Material Handling Equipment" is not a machine Harvin makes per any source.
  Navbar now lists the five real machines (derived from `PRODUCTS`); footer lists
  the three real categories as `?category=` filters.
- Nav/footer "Resources" → `/#resources` — dead anchor, no such section.
- `ManufacturingSection`'s "See Our Manufacturing" → `/about#manufacturing` — the
  new `/about` deliberately does not duplicate the manufacturing section, so the
  button now reads "About Harvin Industries" and points at `/about`.

**Open items from this pass (need the owner):**

- [ ] **Confirm HI-2000 machine dimension.** The docx says 8 × 8 × 2.5 m, which
      makes the mid-range model physically *smaller* than the entry-level HI-1500
      (10 × 8 × 2.5 m). Applied as written, but it reads as a possible typo.
- [ ] Confirm the "nine forms" list. The mixture docx names seven (Solid Brick,
      Fly Ash Brick, Hollow Block, Paver, Retention Block, Curb Stone, Drain Block)
      but says "nine". `OUTPUT_FORMS` resolves it to nine by splitting Paver into
      I-Shape and Zig Zag and keeping Curb Block and Curb Stone separate, matching
      the production tables.
- [x] `/contact` — **built** (see section 9 below).
- [ ] `/privacy`, `/terms`, `/sitemap` links in the footer are still 404.
- [ ] `OUTPUT_FORMS` uses Material Symbols icons as stand-ins; real product photos
      would be stronger (four exist in `public/images/products/`).

## 9. Session status — /contact (2026-09-13)

Same branch, `feature/brochure-content-integration`. Lint and build pass clean.

**Route:** `/contact` (dynamic — it reads `?product=<slug>`). Added to `sitemap.ts`.
`LocalBusiness` JSON-LD carries the address, phone, GSTIN and opening hours.

**Structure:** `ContactHero` (dark, `IsometricLines`, matches the `/products` and
`/about` heroes) → form + details two-column band on `brand-surface-alt` → full-width
`ContactMap`. Form is first in source order so it is the first thing reached on
mobile.

- `src/data/contact.ts` — all contact facts, hours, map embed URL, output bands.
- `src/components/contact/` — `ContactHero`, `ContactForm`, `ContactDetails`,
  `ContactMap`, with the usual barrel.
- `src/app/contact/actions.ts` — `submitQuoteRequest` server action.
- `src/lib/quote-form.ts` — `QuoteFormState` + `EMPTY_FORM_STATE`. These live
  **outside** `actions.ts` on purpose: a `"use server"` module may only export async
  functions, and a plain object exported from one is stripped at runtime and arrives
  as `undefined` (this crashed the page once already).

**Form:** name*, company, phone*, email, city/state, machine of interest (prefilled
from `?product=`, validated against real slugs), target daily output, message.
Progressive enhancement via `useActionState` + `useFormStatus`; per-field errors with
`aria-describedby`/`aria-invalid`; a hidden honeypot (`company_website`) that returns
a fake success so bots learn nothing. Phone validation is deliberately permissive —
Indian numbers get written with +91, leading zeros, spaces and hyphens.

**Mock data to replace** — everything flagged `mock: true` in `src/data/contact.ts`
renders a small "To confirm" chip on the page so a placeholder cannot ship unnoticed:

- [ ] Second phone number (currently `+91 00000 00000`).
- [ ] Email address — `info@harvinindustries.com` is assumed, never verified.
- [ ] Google Maps embed — currently a keyless address-query embed, so the pin lands
      on the industrial-park centroid rather than Shed No 28. Replace `MAP_EMBED_SRC`
      with the "Embed a map" URL from the Google Business listing once it exists, and
      set `MAP_IS_MOCK = false` to drop the "pin approximate" notice.

**Blocking before this form goes live:** `submitQuoteRequest` validates and accepts a
submission but **does not store it** — there is no Prisma/Neon yet. The `TODO` in
`actions.ts` marks where the `Lead` write and the owner notification go. Do not point
a production deploy at this form until that lands, or enquiries are silently lost.

**Also fixed this session:** `PressStandards.tsx` used `bg-brand-surface-dark/70`,
which is not a token — the palette defines `brand-dark-card` and `brand-dark-surface`,
so the class resolved to nothing and the cards had no background. Now
`bg-brand-dark-card/70`.
