export function AboutSnippet() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-yellow-hover">
            About Our Company
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl">
            A Story About The Company
          </h2>
        </div>
        <div className="lg:col-span-2">
          <p className="text-lg leading-relaxed text-brand-text-secondary">
            <strong className="text-brand-charcoal">Harvin Industries</strong> is a
            trusted Ahmedabad-based manufacturer of Fly Ash Brick, Concrete Brick, and
            Paver Block Making Machines. ISO 9001:2015 certified, we combine precision
            engineering with robust design to deliver machines built for performance,
            durability, and consistent output. From small enterprises to large-scale
            production units, our solutions empower businesses across India to meet
            growing construction demands — backed by dedicated technical support every
            step of the way.
          </p>
        </div>
      </div>
    </section>
  );
}
