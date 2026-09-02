import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-charcoal">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <p className="mb-4 inline-block rounded-full border border-brand-yellow/40 px-3 py-1 text-xs font-semibold tracking-wide text-brand-yellow">
            ISO 9001:2015 Certified · Ahmedabad, India
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Built for <span className="text-brand-yellow">Performance</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            Harvin Industries manufactures Fly Ash Brick, Concrete Brick, and Paver
            Block making machines — precision-engineered for durability and
            consistent, high-volume output.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-md bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-charcoal transition-colors hover:bg-brand-yellow-hover"
            >
              View Machines
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        {/* Placeholder graphic — swap for a Higgsfield-generated 4K hero render once connected */}
        <div className="relative aspect-square w-full max-w-md justify-self-center rounded-2xl border border-white/10 bg-gradient-to-br from-brand-yellow/20 via-white/5 to-transparent lg:justify-self-end">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="h-2/3 w-2/3 text-brand-yellow/80" fill="none">
              <rect x="20" y="90" width="160" height="14" rx="2" fill="currentColor" />
              <rect x="30" y="60" width="60" height="30" rx="2" fill="currentColor" opacity="0.6" />
              <rect x="100" y="40" width="14" height="50" fill="currentColor" opacity="0.8" />
              <rect x="120" y="30" width="14" height="60" fill="currentColor" />
              <circle cx="150" cy="55" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>
          <span className="absolute bottom-3 right-4 text-[10px] font-medium uppercase tracking-wider text-white/30">
            Hero image pending — Higgsfield
          </span>
        </div>
      </div>
    </section>
  );
}
