"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { CATEGORY_LABELS, PRODUCTS, type Category } from "@/data/products";

const CATEGORIES: Category[] = Array.from(new Set(PRODUCTS.map((p) => p.category)));

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
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

  const hasActiveFilters = Boolean(category || query);

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
          placeholder="Search machines by name or output…"
          className="w-full rounded-full border border-brand-border bg-brand-surface py-3 pl-12 pr-4 text-sm text-brand-text placeholder:text-brand-text-secondary focus:border-brand-brick"
        />
      </label>

      <div>
        <h3 className="text-xs font-semibold tracking-widest text-brand-text-secondary">
          Category
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => update({ category: category === value ? null : value })}
              className={`rounded-full px-4 py-2 font-display text-sm tracking-wide transition-all ${
                category === value
                  ? "bg-rusted-yellow text-brand-ink"
                  : "border border-brand-border bg-brand-surface text-brand-text-secondary hover:border-brand-yellow-light hover:text-brand-ink"
              }`}
            >
              {CATEGORY_LABELS[value]}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            router.push(pathname, { scroll: false });
          }}
          className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-brand-text-secondary hover:text-brand-accent"
        >
          <Icon name="close" className="text-sm" />
          Clear all filters
        </button>
      )}
    </div>
  );
}
