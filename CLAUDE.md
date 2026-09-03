@AGENTS.md

# Harvin Industries — Project Rules

Brick-making machine manufacturer site. Product catalog (machines + specs + price),
owner-only CMS to manage products, contact/quote forms, homepage "latest product" feed.

## Tech Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Neon (serverless Postgres) + Prisma (`@prisma/adapter-neon`) for data
- Cloudinary for product images / brochure PDFs
- NextAuth (credentials provider, single owner account) for CMS auth
- Deploy target: Vercel

See `docs/harvin-industries-plan.md` for sitemap, schema, architecture, and full
brand/company facts pulled from the brochure.

## Brand

- Palette (decided, "Fired Clay" — sampled from brick/terracotta tones): ink
  `#2F1B27`, umber `#513533`, brick `#B4442A` / hover `#98371F`, clay `#DCC4A2`,
  cream (page bg) `#F7F1E6`, surface `#FFFFFF`, text-secondary `#6B5A52`, border
  `#E5D9C6`. Tokens live in `src/app/globals.css` as `--color-brand-*` (Tailwind v4
  `@theme`, not `tailwind.config.ts`) — use `brand-*` Tailwind classes, never
  hardcode these hex values inline.
- Fonts: **Forum** (serif display, weight 400) for headings via `font-display`,
  **Inter** for body via `font-sans` — loaded in `src/app/layout.tsx`.
- Icons: Google Material Symbols Outlined, loaded via stylesheet link in
  `src/app/layout.tsx`, used through the `<Icon name="..." />` wrapper in
  `src/components/ui/Icon.tsx` — never a different icon set.
- Logo: hexagon "HI" mark (`src/components/layout/Logo.tsx`). No standalone vector
  file yet — see plan doc open items.
- No prices are ever rendered publicly unless a machine explicitly opts in
  (`priceVisible`) — default flow is "Request a Quote".

## Production

- Production branch: `main`. Never commit to it directly — work on a feature branch,
  merge only when explicitly asked.
- Deploys run from `main` via Vercel git integration once connected.

## Conventions

- File structure: `src/components/` is split by purpose, not left flat —
  `layout/` (Header, Footer, Logo — used on every page), `ui/` (generic
  presentational primitives with no page knowledge — Icon, BrickWallPattern),
  and one folder per page/feature (`home/` for the homepage sections; a future
  page gets its own folder the same way, e.g. `products/`, `about/`). Each
  folder has an `index.ts` barrel — import from the folder
  (`@/components/home`), not the individual file, except within the folder
  itself. Always use the `@/components/...` absolute path, never a relative
  `./` import across folders.
- Server Components by default; `"use client"` only where interactivity is needed.
- All CMS/admin routes live under `/admin` and are protected by middleware — never
  render admin data on a page that skips the auth check.
- Product images/brochures are never committed to the repo — Cloudinary only.
- Env vars (`DATABASE_URL`, `CLOUDINARY_*`, `NEXTAUTH_SECRET`, etc.) live in `.env.local`,
  never committed. `.env.example` documents required keys with no real values.
- The Prisma schema is the single source of truth for a product's shape — don't
  duplicate spec-field lists elsewhere; use generated Prisma types. Schema changes
  always go through `prisma migrate`, never a manual DB edit.
- No placeholder/lorem content in committed pages once real brochure content is
  provided — use real copy or leave a tracked TODO in the plan doc, not fake text.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build, must pass before any merge to main
- `npm run lint` — lint, must be zero warnings before merge

## Out of scope for now

- Customer accounts / e-commerce checkout — not requested.
- Multi-admin roles — single owner login only.
