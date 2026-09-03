import { Icon } from "@/components/ui/Icon";

const FACTORS = [
  {
    icon: "bolt",
    title: "Advanced Technology & Robust Design",
    description:
      "Our machines are engineered with high-grade materials and modern manufacturing techniques, delivering maximum output with minimal maintenance.",
  },
  {
    icon: "workspace_premium",
    title: "Quality Manufacturing",
    description:
      "Every machine is built under a strict quality management system, ensuring consistent performance, precision engineering, and long-lasting reliability.",
  },
  {
    icon: "tune",
    title: "Customised Solutions for Every Scale",
    description:
      "Whether you're a startup unit or a large-scale producer, we offer flexible machine models tailored to match your production capacity and budget.",
  },
  {
    icon: "support_agent",
    title: "Strong Support Network",
    description:
      "Pan-India reach and strong support network. From installation to after-sales service, we stand by our customers across India — ensuring minimal downtime and maximum productivity.",
  },
];

export function KeyFactors() {
  return (
    <section className="flex min-h-[calc(100svh-4.5rem)] items-center bg-brand-umber">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-brick">
          Why Harvin
        </p>
        <h2 className="mt-3 font-display text-4xl tracking-tight text-brand-cream sm:text-5xl">
          Key Factors
        </h2>
        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {FACTORS.map((factor) => (
            <div key={factor.title} className="border-t border-brand-clay/20 pt-5">
              <Icon name={factor.icon} className="text-2xl text-brand-brick" />
              <h3 className="mt-3 font-display text-xl text-brand-cream">
                {factor.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-clay/70">
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
