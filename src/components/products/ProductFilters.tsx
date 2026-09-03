"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import {
  CATEGORY_LABELS,
  MATERIAL_LABELS,
  PRODUCTS,
  type Category,
  type Material,
  type ProductType,
} from "@/data/products";

const TYPE_OPTIONS: { value: ProductType | "all"; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "machine", label: "Machines" },
  { value: "output_item", label: "Output Items" },
];

function categoriesFor(type: ProductType | "all"): Category[] {
  const scoped = type === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.type === type);
  const seen = new Set<Category>();
  for (const product of scoped) seen.add(product.category);
  return Array.from(seen);
}

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = (searchParams.get("type") as ProductType | null) ?? "all";
  const category = searchParams.get("category");
  const material = searchParams.get("material") as Material | null;
  const urlQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(urlQuery);
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);
  if (urlQuery !== syncedQuery) {
    // URL changed externally (nav, clear-filters) — adjust local state during render.
    setSyncedQuery(urlQuery);
    setQuery(urlQuery);
  }

  function update(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    if (query === urlQuery) return;
    const timeout = setTimeout(() => update({ q: query || null }), 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run on query changes; `update` closes over fresh searchParams
  }, [query]);

  const showMaterial = type === "all" || type === "output_item";
  const categories = categoriesFor(type);
  const hasActiveFilters = Boolean(type !== "all" || category || material || query);

  return (
    <div className="flex flex-col gap-8">
      <label className="relative block">
        <Icon
          name="search"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-secondary"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search machines, bricks, blocks…"
          className="w-full rounded-full border border-brand-border bg-brand-surface py-3 pl-12 pr-4 text-sm text-brand-text placeholder:text-brand-text-secondary focus:border-brand-brick focus:outline-none"
        />
      </label>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-text-secondary">
          Type
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                update({ type: option.value === "all" ? null : option.value, category: null })
              }
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                type === option.value
                  ? "bg-brand-brick text-brand-cream"
                  : "border border-brand-border bg-brand-surface text-brand-text-secondary hover:border-brand-brick hover:text-brand-ink"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-text-secondary">
          Category
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => update({ category: category === value ? null : value })}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                category === value
                  ? "bg-brand-brick text-brand-cream"
                  : "border border-brand-border bg-brand-surface text-brand-text-secondary hover:border-brand-brick hover:text-brand-ink"
              }`}
            >
              {CATEGORY_LABELS[value]}
            </button>
          ))}
        </div>
      </div>

      {showMaterial && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-text-secondary">
            Material
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(MATERIAL_LABELS) as Material[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => update({ material: material === value ? null : value })}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  material === value
                    ? "bg-brand-brick text-brand-cream"
                    : "border border-brand-border bg-brand-surface text-brand-text-secondary hover:border-brand-brick hover:text-brand-ink"
                }`}
              >
                {MATERIAL_LABELS[value]}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            router.push(pathname, { scroll: false });
          }}
          className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-brand-text-secondary hover:text-brand-brick"
        >
          <Icon name="close" className="text-sm" />
          Clear all filters
        </button>
      )}
    </div>
  );
}
