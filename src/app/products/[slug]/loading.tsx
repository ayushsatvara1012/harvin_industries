export default function ProductDetailLoading() {
  return (
    <main id="main" className="min-h-screen bg-white" aria-hidden="true">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="h-3 w-40 animate-pulse rounded bg-brand-border/60" />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="aspect-[4/3] animate-pulse rounded-lg bg-brand-border/60" />

            <div>
              <div className="h-3 w-24 animate-pulse rounded bg-brand-border/60" />
              <div className="mt-3 h-10 w-3/4 animate-pulse rounded bg-brand-border/60" />
              <div className="mt-4 h-5 w-full animate-pulse rounded bg-brand-border/60" />
              <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-brand-border/60" />
              <div className="mt-8 h-12 w-44 animate-pulse rounded-full bg-brand-border/60" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
