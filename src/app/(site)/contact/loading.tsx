import { Skeleton } from "@/components/ui";

export default function ContactLoading() {
  return (
    <main id="main" className="min-h-screen bg-brand-ink" aria-hidden="true">
      <section className="border-b border-white/10 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-10 lg:col-span-5">
              <div>
                <Skeleton dark className="h-12 w-3/4 rounded sm:h-14" />
                <Skeleton dark className="mt-4 h-4 w-full max-w-md rounded" />
                <Skeleton dark className="mt-2 h-4 w-2/3 rounded" />
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton dark className="h-10 w-10 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton dark className="h-3 w-24 rounded" />
                    <Skeleton dark className="h-5 w-3/4 rounded" />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-5 rounded-2xl border border-white/10 bg-brand-dark-card p-6 sm:p-8 lg:col-span-7">
              <Skeleton dark className="h-7 w-1/2 rounded" />
              <div className="grid gap-5 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} dark className="h-12 rounded-lg" />
                ))}
              </div>
              <Skeleton dark className="h-12 rounded-lg" />
              <Skeleton dark className="h-28 rounded-lg" />
              <Skeleton dark className="h-12 w-44 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
