import Link from "next/link";

// Static for the homepage design pass — swaps to a DB query (`featured`/`createdAt`)
// once Neon + Prisma are wired up.
const MACHINES = [
  {
    slug: "hi-1500",
    name: "HI-1500",
    category: "Press Machine",
    highlight: "Up to 1,800 pcs/hour",
    power: "45 HP",
  },
  {
    slug: "hi-2000",
    name: "HI-2000",
    category: "Press Machine",
    highlight: "Up to 2,200 pcs/hour",
    power: "50 HP",
  },
  {
    slug: "hi-3000",
    name: "HI-3000",
    category: "Press Machine",
    highlight: "Up to 2,900 pcs/hour",
    power: "60 HP",
  },
];

export function LatestProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-yellow-hover">
            Product Portfolio
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl">
            Latest Machines
          </h2>
        </div>
        <Link
          href="/products"
          className="text-sm font-bold text-brand-charcoal underline decoration-brand-yellow decoration-2 underline-offset-4"
        >
          View all products
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MACHINES.map((machine) => (
          <Link
            key={machine.slug}
            href={`/products/${machine.slug}`}
            className="group rounded-xl border border-brand-border bg-brand-surface p-6 transition-shadow hover:shadow-lg"
          >
            <div className="mb-6 flex aspect-[4/3] items-center justify-center rounded-lg bg-brand-bg text-brand-text-secondary/40">
              <span className="text-xs font-medium uppercase tracking-wider">
                Image pending
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">
              {machine.category}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-brand-charcoal">
              {machine.name}
            </h3>
            <p className="mt-2 text-sm text-brand-text-secondary">
              {machine.highlight} · {machine.power}
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-bold text-brand-charcoal group-hover:text-brand-yellow-hover">
              View details →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
