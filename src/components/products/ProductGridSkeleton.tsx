function ProductCardSkeleton() {
  return (
    <div
      className="animate-pulse rounded-xl border border-brand-border bg-brand-surface p-6"
      aria-hidden="true"
    >
      <div className="mb-6 aspect-[4/3] rounded-lg bg-brand-border/60" />
      <div className="h-3 w-20 rounded bg-brand-border/60" />
      <div className="mt-3 h-6 w-3/4 rounded bg-brand-border/60" />
      <div className="mt-2 h-4 w-full rounded bg-brand-border/60" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div aria-hidden="true">
      <div className="mb-6 h-4 w-32 animate-pulse rounded bg-brand-border/60" />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
