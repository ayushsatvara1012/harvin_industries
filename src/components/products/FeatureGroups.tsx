import { Icon } from "@/components/ui/Icon";
import type { FeatureGroup } from "@/data/products";

export function FeatureGroups({ groups }: { groups: FeatureGroup[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.title}
          className="rounded-xl border border-brand-border bg-brand-surface p-6"
        >
          <h3 className="font-display text-lg text-brand-ink">{group.title}</h3>
          <ul className="mt-3 space-y-2">
            {group.items.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-brand-text-secondary">
                <Icon name="check_circle" className="mt-0.5 shrink-0 text-base text-brand-brick" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
