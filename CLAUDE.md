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

- Palette (decided, "Brochure Match" — see plan doc for full table): primary yellow
  `#F5D613` / hover `#D4B910`, charcoal `#2B2B2A`, off-white bg `#F7F5F0`, white
  surface `#FFFFFF`, text-secondary `#5A5A58`, border `#E5E2DA`. Use Tailwind
  `brand.*` tokens, never hardcode these hex values inline.
- Logo: hexagon "HI" mark. No standalone vector file yet — see plan doc open items.
- No prices are ever rendered publicly unless a machine explicitly opts in
  (`priceVisible`) — default flow is "Request a Quote".

## Production

- Production branch: `main`. Never commit to it directly — work on a feature branch,
  merge only when explicitly asked.
- Deploys run from `main` via Vercel git integration once connected.

## Conventions

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
