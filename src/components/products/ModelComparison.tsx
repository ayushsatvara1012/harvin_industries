import Link from "next/link";
import { Icon, SectionHeader } from "@/components/ui";
import { getPressModels, type Product } from "@/data/products";

function specValue(product: Product, label: string) {
  return product.specs?.find((spec) => spec.label === label)?.value ?? "—";
}

const ROWS: { label: string; value: (product: Product) => string }[] = [
  { label: "Bricks per stroke", value: (p) => specValue(p, "Brick Per Stroke") },
  { label: "Output per 8-hour shift", value: (p) => p.dailyOutput ?? "—" },
  { label: "Electrical load", value: (p) => specValue(p, "Electrical Load") },
  { label: "Space required", value: (p) => specValue(p, "Required Area") },
  { label: "Machine footprint", value: (p) => specValue(p, "Machine Dimension") },
  { label: "Pallet size", value: (p) => specValue(p, "Pallet Size") },
  { label: "Best suited to", value: (p) => p.bestFor ?? "—" },
];

/* The first question a new visitor has is "which model do I need?". Answering
   it above the catalog grid saves them opening three detail pages to compare. */
export function ModelComparison() {
  const models = getPressModels();
  if (models.length === 0) return null;

  return (
    <section id="choose" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <SectionHeader eyebrow="Which Model Do You Need?">
            Choose by Your <span className="text-brand-accent-text">Daily Target</span>
          </SectionHeader>
          <p className="mt-4 text-base lg:text-[17px] leading-relaxed text-brand-text-secondary">
            All three presses run the same 50–60 MT hydraulic force, the same 60 KN
            vibration and the same 15–20 second cycle. Only the bricks per stroke change —
            so pick the model that matches the volume you need, not the quality you want.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-xl border border-brand-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Harvin press machine models compared by output, power and footprint
            </caption>
            <thead>
              <tr className="bg-brand-ink text-white">
                <th scope="col" className="px-5 py-4 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  Specification
                </th>
                {models.map((model) => (
                  <th key={model.slug} scope="col" className="px-5 py-4 align-bottom">
                    <span className="block font-display text-2xl tracking-tight text-brand-yellow">
                      {model.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {ROWS.map((row, idx) => (
                <tr key={row.label} className={idx % 2 === 1 ? "bg-brand-surface-alt" : "bg-white"}>
                  <th
                    scope="row"
                    className="px-5 py-3.5 font-medium text-brand-text-secondary whitespace-nowrap"
                  >
                    {row.label}
                  </th>
                  {models.map((model) => (
                    <td key={model.slug} className="px-5 py-3.5 font-semibold text-brand-ink">
                      {row.value(model)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-white">
                <td className="px-5 py-4" />
                {models.map((model) => (
                  <td key={model.slug} className="px-5 py-4">
                    <Link
                      href={`/products/${model.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-accent-text hover:underline"
                    >
                      View {model.name}
                      <Icon name="arrow_forward" className="text-sm" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
