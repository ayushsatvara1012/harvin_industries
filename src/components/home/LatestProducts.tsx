import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

// Static for the homepage design pass — swaps to a DB query (`featured`/`createdAt`)
// once Neon + Prisma are wired up.
const MACHINES = [
  {
    slug: "hi-1500",
    name: "HI-1500",
    category: "Press Machine",
    highlight: "Up to 1,800 pcs/hour",
    power: "45 HP",
    image: "/images/machines/hi-1500.jpg",
  },
  {
    slug: "hi-2000",
    name: "HI-2000",
    category: "Press Machine",
    highlight: "Up to 2,200 pcs/hour",
    power: "50 HP",
    image: "/images/machines/hi-2000.jpg",
  },
  {
    slug: "hi-3000",
    name: "HI-3000",
    category: "Press Machine",
    highlight: "Up to 2,900 pcs/hour",
    power: "60 HP",
    image: "/images/machines/hi-3000.jpg",
  },
];

export function LatestProducts() {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-brick">
            Product Portfolio
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-brand-ink sm:text-5xl">
            Latest Machines
          </h2>
        </div>
        <Link
          href="/products"
          className="text-sm font-semibold text-brand-ink underline decoration-brand-brick decoration-2 underline-offset-4"
        >
          View all products
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MACHINES.map((machine) => (
          <Link
            key={machine.slug}
            href={`/products/${machine.slug}`}
            className="rounded-xl border border-brand-border bg-brand-surface p-6"
          >
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg bg-brand-cream">
              <Image
                src={machine.image}
                alt={`${machine.name} Automated Brick and Block Making Machine`}
                fill
                quality={85}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">
              {machine.category}
            </p>
            <h3 className="mt-1 font-display text-2xl text-brand-ink">
              {machine.name}
            </h3>
            <p className="mt-2 text-sm text-brand-text-secondary">
              {machine.highlight} · {machine.power}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-ink">
              View details
              <Icon name="arrow_forward" className="text-base" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
