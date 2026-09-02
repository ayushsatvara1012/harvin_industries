const FACTORS = [
  {
    title: "Advanced Technology & Robust Design",
    description:
      "Our machines are engineered with high-grade materials and modern manufacturing techniques, delivering maximum output with minimal maintenance.",
  },
  {
    title: "Quality Manufacturing",
    description:
      "Every machine is built under a strict quality management system, ensuring consistent performance, precision engineering, and long-lasting reliability.",
  },
  {
    title: "Customised Solutions for Every Scale",
    description:
      "Whether you're a startup unit or a large-scale producer, we offer flexible machine models tailored to match your production capacity and budget.",
  },
  {
    title: "Strong Support Network",
    description:
      "Pan-India reach and strong support network. From installation to after-sales service, we stand by our customers across India — ensuring minimal downtime and maximum productivity.",
  },
];

export function KeyFactors() {
  return (
    <section className="bg-brand-yellow">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl">
          Key Factors
        </h2>
        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {FACTORS.map((factor) => (
            <div key={factor.title} className="border-t border-brand-charcoal/20 pt-5">
              <h3 className="font-display text-lg font-bold text-brand-charcoal">
                {factor.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/70">
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
