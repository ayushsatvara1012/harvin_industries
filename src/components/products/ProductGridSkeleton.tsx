import { Skeleton } from "@/components/ui";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div aria-hidden="true">
      <Skeleton className="mb-6 h-4 w-32 rounded" />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
