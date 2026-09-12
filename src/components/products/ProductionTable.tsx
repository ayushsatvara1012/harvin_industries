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
              <span className="font-semibold text-brand-surface">{row.value}</span>
            </p>
          ))}
        </div>
      )}
      {/* Below `sm`, a stacked card per row — the table's `min-w` would hide
          the Pcs/Hour column off-screen otherwise. */}
      <ul className="divide-y divide-brand-border bg-brand-surface sm:hidden">
        {rows.map((row, i) => (
          <li key={`${row.product}-${row.sizeMm}-${i}`} className="px-5 py-4">
            <p className="font-medium text-brand-ink">{row.product}</p>
            <dl className="mt-2 grid grid-cols-3 gap-2 text-sm">
              <div>
                <dt className="text-xs text-brand-text-secondary">Size (mm)</dt>
                <dd className="text-brand-text-secondary">{row.sizeMm}</dd>
              </div>
              <div>
                <dt className="text-xs text-brand-text-secondary">Pcs / Mould</dt>
                <dd className="text-brand-text-secondary">{row.pcsPerMould}</dd>
              </div>
              <div>
                <dt className="text-xs text-brand-text-secondary">Pcs / Hour</dt>
                <dd className="font-semibold text-brand-accent">{row.pcsPerHour.toLocaleString()}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="bg-brand-clay/30 text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">
              <th scope="col" className="px-5 py-3">Product</th>
              <th scope="col" className="px-5 py-3">Size (mm)</th>
              <th scope="col" className="px-5 py-3">Pcs / Mould</th>
              <th scope="col" className="px-5 py-3">Pcs / Hour</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border bg-brand-surface">
            {rows.map((row, i) => (
              <tr key={`${row.product}-${row.sizeMm}-${i}`}>
                <td className="px-5 py-3 font-medium text-brand-ink">{row.product}</td>
                <td className="px-5 py-3 text-brand-text-secondary">{row.sizeMm}</td>
                <td className="px-5 py-3 text-brand-text-secondary">{row.pcsPerMould}</td>
                <td className="px-5 py-3 font-semibold text-brand-accent">
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
