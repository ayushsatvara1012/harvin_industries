import { Skeleton } from "@/components/ui";

export function ProductsSectionSkeleton() {
  return (
    <section className="bg-white pt-16 lg:pt-24" aria-hidden="true">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-3 w-28 rounded" />
        <Skeleton className="mt-4 h-10 w-full max-w-md rounded sm:h-12" />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-sm border border-brand-border bg-white">
              <Skeleton className="aspect-[4/3] w-full" />
              <div className="space-y-2 p-4">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-5 w-3/4 rounded" />
                <Skeleton className="h-3 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
