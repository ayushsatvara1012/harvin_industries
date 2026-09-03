import type { ProductionRow, SpecRow } from "@/data/products";

export function ProductionTable({
  summary,
  rows,
}: {
  summary?: SpecRow[];
  rows: ProductionRow[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-border">
      {summary && (
        <div className="flex flex-wrap gap-x-8 gap-y-2 bg-brand-ink px-5 py-4">
          {summary.map((row) => (
            <p key={row.label} className="text-xs text-brand-clay/70">
              {row.label}:{" "}
              <span className="font-semibold text-brand-cream">{row.value}</span>
            </p>
          ))}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="bg-brand-clay/30 text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Size (mm)</th>
              <th className="px-5 py-3">Pcs / Mould</th>
              <th className="px-5 py-3">Pcs / Hour</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border bg-brand-surface">
            {rows.map((row, i) => (
              <tr key={`${row.product}-${row.sizeMm}-${i}`}>
                <td className="px-5 py-3 font-medium text-brand-ink">{row.product}</td>
                <td className="px-5 py-3 text-brand-text-secondary">{row.sizeMm}</td>
                <td className="px-5 py-3 text-brand-text-secondary">{row.pcsPerMould}</td>
                <td className="px-5 py-3 font-semibold text-brand-brick">
                  {row.pcsPerHour.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
