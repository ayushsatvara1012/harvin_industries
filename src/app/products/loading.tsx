import { ProductFiltersSkeleton, ProductGridSkeleton } from "@/components/products";

export default function ProductsLoading() {
  return (
    <main id="main" className="bg-white" aria-hidden="true">
      <section className="border-b border-white/10 bg-brand-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="h-3 w-32 animate-pulse rounded bg-white/20" />
          <div className="mt-4 h-10 w-2/3 animate-pulse rounded bg-white/20 sm:h-12" />
          <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded bg-white/10" />
        </div>
      </section>

      <section className="bg-brand-surface-alt">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <ProductFiltersSkeleton />
            </aside>
            <ProductGridSkeleton />
          </div>
        </div>
      </section>
    </main>
  );
}
