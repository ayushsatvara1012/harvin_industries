import { Skeleton } from "@/components/ui";

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-surface p-6" aria-hidden="true">
      <Skeleton className="mb-6 aspect-[4/3] rounded-lg" />
      <Skeleton className="h-3 w-20 rounded" />
      <Skeleton className="mt-3 h-6 w-3/4 rounded" />
      <Skeleton className="mt-2 h-4 w-full rounded" />
    </div>
  );
}
