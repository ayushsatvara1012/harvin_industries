# Harvin Industries

Website and owner CMS for Harvin Industries, a brick-making machine manufacturer in Ahmedabad.
Public product catalog, contact and quote enquiries, and an owner-only admin under `/admin`.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS v4
- Neon Postgres with Prisma (`@prisma/adapter-neon`)
- Cloudinary for product images
- Auth.js v5 credentials login for a single owner account
- Cloudflare Workers through `@opennextjs/cloudflare`

## Setup

```bash
npm ci                      # also generates both Prisma clients
cp .env.example .env.local  # fill in the values
npx next typegen            # route types, needed before `tsc`
npm run dev
```

`npm run build` reads the catalog, so it needs `DATABASE_URL` set.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build, must pass before merging to `main` |
| `npm run lint` | Lint, zero warnings before merging |
| `npm run db:deploy` | Apply pending Prisma migrations |
| `npm run db:seed` | Seed the catalog |
| `npm run auth:hash` | Hash the owner password for `OWNER_PASSWORD_HASH` |
| `npm run preview` | Build and run the Worker locally |
| `npm run deploy` | Build and deploy to Cloudflare |

## Docs

- `CLAUDE.md` and `AGENTS.md`: project rules
- `docs/harvin-industries-plan.md`: sitemap, brand and company facts
- `docs/dynamic-product-cms-plan.md`: CMS phases, deploy notes and what is left
