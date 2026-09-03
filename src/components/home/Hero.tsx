import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-brand-ink">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-plant.jpg"
          alt="Harvin Industries Automated Brick and Block Manufacturing Plant"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-[65%_center] lg:object-center"
        />
        {/* Directional Readability Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/75 to-brand-ink/40 md:bg-gradient-to-r md:from-brand-ink/95 md:via-brand-ink/80 md:via-45% md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-ink via-brand-ink/60 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-ink/60 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-brick/40 bg-brand-ink/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-clay backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-brick animate-pulse" />
            Heavy-Duty Industrial Engineering
          </div>

          <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-brand-cream sm:text-5xl md:text-6xl lg:text-7xl">
            Built for <span className="text-brand-brick">Performance</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-clay/90 sm:text-lg md:text-xl">
            Harvin Industries manufactures Fly Ash Brick, Concrete Brick, and Paver
            Block making machines — precision-engineered for durability and
            consistent, high-volume output.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:mt-10 sm:flex-row sm:items-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-brand-brick px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-brand-cream shadow-lg shadow-brand-brick/30 transition-all duration-200 hover:bg-brand-brick-hover hover:shadow-brand-brick/50"
            >
              View Machines
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-brand-clay/40 bg-brand-ink/40 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-brand-cream backdrop-blur-md transition-all duration-200 hover:border-brand-clay hover:bg-brand-clay/10"
            >
              Request a Quote
            </Link>
          </div>

          {/* Quick Metrics / Highlights */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-brand-clay/20 pt-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <p className="font-display text-2xl font-bold text-brand-cream sm:text-3xl">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-brand-clay/70">Hydraulic Automation</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-brand-cream sm:text-3xl">High-Volume</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-brand-clay/70">Brick & Paver Output</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-display text-2xl font-bold text-brand-cream sm:text-3xl">ISO 9001</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-brand-clay/70">Certified Quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
