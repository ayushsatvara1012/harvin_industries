import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="bg-brand-charcoal">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Ready to scale your production?
        </h2>
        <p className="max-w-xl text-white/70">
          Talk to our team about which machine fits your output requirements and
          budget — installation and after-sales support included across India.
        </p>
        <Link
          href="/contact"
          className="rounded-md bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-charcoal transition-colors hover:bg-brand-yellow-hover"
        >
          Request a Quote
        </Link>
      </div>
    </section>
  );
}
