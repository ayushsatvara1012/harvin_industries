import { Card, Icon } from "@/components/ui";
import type { SpecRow } from "@/data/products";

/* Rows carrying a `note` expand to a plain-language explanation of what the
   number means for a buyer. Uses native <details> so the table stays dense and
   scannable, and the page stays a Server Component. */
export function SpecTable({ specs }: { specs: SpecRow[] }) {
  return (
    <Card className="divide-y divide-brand-border overflow-hidden">
      {specs.map((spec) =>
        spec.note ? (
          <details key={spec.label} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 text-sm transition-colors hover:bg-brand-surface-alt [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2 text-brand-text-secondary">
                <Icon
                  name="expand_more"
                  className="text-base text-brand-accent-text transition-transform duration-200 group-open:rotate-180"
                />
                {spec.label}
              </span>
              <span className="text-right font-semibold text-brand-ink">{spec.value}</span>
            </summary>
            <p className="border-t border-dashed border-brand-border bg-brand-surface-alt px-5 py-4 pl-[2.65rem] text-sm leading-relaxed text-brand-text-secondary">
              {spec.note}
            </p>
          </details>
        ) : (
          <div
            key={spec.label}
            className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm"
          >
            <span className="pl-6 text-brand-text-secondary">{spec.label}</span>
            <span className="text-right font-semibold text-brand-ink">{spec.value}</span>
          </div>
        ),
      )}
    </Card>
  );
}
