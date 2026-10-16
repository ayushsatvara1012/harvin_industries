import { Skeleton } from "@/components/ui";

export function ProductFiltersSkeleton() {
  return (
    <div className="flex flex-col gap-8" aria-hidden="true">
      <Skeleton className="h-12 rounded-full" />
      <div>
        <Skeleton className="h-3 w-16 rounded" />
        <div className="mt-3 flex flex-wrap gap-2">
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-28 rounded-full" />
          <Skeleton className="h-9 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
