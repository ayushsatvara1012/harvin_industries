import { Icon } from "@/components/ui/Icon";

const CREDENTIALS = [
  { icon: "verified", label: "ISO 9001:2015", detail: "Certified Manufacturer" },
  { icon: "factory", label: "Ahmedabad, India", detail: "Manufacturing Base" },
  { icon: "groups", label: "Pan-India", detail: "Support Network" },
  { icon: "precision_manufacturing", label: "Precision Engineered", detail: "Built for Performance" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-brand-border bg-brand-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {CREDENTIALS.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 text-center lg:flex-row lg:items-start lg:text-left"
          >
            <Icon name={item.icon} className="text-2xl text-brand-brick" />
            <div>
              <p className="font-display text-lg text-brand-ink">{item.label}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
