const STEPS = [
  {
    number: "01",
    title: "Enquiry",
    description:
      "Share your production requirements and output targets — our team recommends the machine model that fits your scale and budget.",
  },
  {
    number: "02",
    title: "Manufacturing",
    description:
      "Each machine is built to order under our ISO 9001:2015 quality system, engineered for durability and consistent output.",
  },
  {
    number: "03",
    title: "Installation & Support",
    description:
      "We handle installation and commissioning, then stand by with after-sales support and service across India.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="w-full">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-brick">
          Process
        </p>
        <h2 className="mt-3 font-display text-4xl tracking-tight text-brand-ink sm:text-5xl">
          How It Works
        </h2>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step) => (
            <div key={step.number}>
              <span className="font-display text-5xl text-brand-brick/40">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-2xl text-brand-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-text-secondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
