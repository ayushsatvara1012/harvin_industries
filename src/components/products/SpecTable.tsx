import type { SpecRow } from "@/data/products";

export function SpecTable({ specs }: { specs: SpecRow[] }) {
  return (
    <dl className="divide-y divide-brand-border overflow-hidden rounded-xl border border-brand-border bg-brand-surface">
      {specs.map((spec) => (
        <div key={spec.label} className="flex justify-between gap-4 px-5 py-3.5 text-sm">
          <dt className="text-brand-text-secondary">{spec.label}</dt>
          <dd className="text-right font-semibold text-brand-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
