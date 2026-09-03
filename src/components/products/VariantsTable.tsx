import Link from "next/link";
import type { MachineVariant } from "@/data/products";

export function VariantsTable({ variants }: { variants: MachineVariant[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="bg-brand-clay/30 text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">
              <th className="px-5 py-3">Machine</th>
              <th className="px-5 py-3">Size (mm)</th>
              <th className="px-5 py-3">Pcs / Mould</th>
              <th className="px-5 py-3">Pcs / Hour</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border bg-brand-surface">
            {variants.map((row, i) => (
              <tr key={`${row.machineSlug}-${row.sizeMm}-${i}`}>
                <td className="px-5 py-3 font-medium text-brand-ink">
                  <Link
                    href={`/products/${row.machineSlug}`}
                    className="underline decoration-brand-brick decoration-2 underline-offset-2 hover:text-brand-brick"
                  >
                    {row.machineName}
                  </Link>
                </td>
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
