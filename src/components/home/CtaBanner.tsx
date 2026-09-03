import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { BrickWallPattern } from "@/components/ui/BrickWallPattern";

export function CtaBanner() {
  return (
    <section className="mx-auto flex max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative w-full overflow-hidden rounded-3xl bg-brand-ink px-6 py-20 text-center sm:px-12">
        <BrickWallPattern className="absolute inset-0 h-full w-full opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/85 via-brand-ink/90 to-brand-ink" />

        <div className="relative flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl tracking-tight text-brand-cream sm:text-4xl">
            Ready to scale your production?
          </h2>
          <p className="max-w-xl text-brand-clay/70">
            Talk to our team about which machine fits your output requirements and
            budget — installation and after-sales support included across India.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-brick px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-brand-cream transition-colors hover:bg-brand-brick-hover"
          >
            Request a Quote
            <Icon name="arrow_forward" className="text-base" />
          </Link>
        </div>
      </div>
    </section>
  );
}
