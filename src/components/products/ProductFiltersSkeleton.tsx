export function ProductFiltersSkeleton() {
  return (
    <div className="flex flex-col gap-8 animate-pulse" aria-hidden="true">
      <div className="h-12 rounded-full bg-brand-border/60" />
      <div>
        <div className="h-3 w-16 rounded bg-brand-border/60" />
        <div className="mt-3 flex flex-wrap gap-2">
          <div className="h-9 w-24 rounded-full bg-brand-border/60" />
          <div className="h-9 w-28 rounded-full bg-brand-border/60" />
          <div className="h-9 w-20 rounded-full bg-brand-border/60" />
        </div>
      </div>
    </div>
  );
}
