import { Skeleton } from "@/components/ui";

export default function AdminLoading() {
  return (
    <div aria-hidden="true">
      <Skeleton className="h-10 w-56 rounded" />
      <Skeleton className="mt-3 h-4 w-72 max-w-full rounded" />
      <ul className="mt-6 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="rounded-xl border border-brand-border bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-5 w-1/3 rounded" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="mt-4 h-4 w-full rounded" />
            <Skeleton className="mt-2 h-4 w-2/3 rounded" />
          </li>
        ))}
      </ul>
    </div>
  );
}
