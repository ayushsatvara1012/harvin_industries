import type { Metadata } from "next";
import { Suspense } from "react";
import { Header, Footer } from "@/components/layout";
import { IsometricLines } from "@/components/ui";
import { ProductCard, ProductFilters } from "@/components/products";
import { PRODUCTS, type Category } from "@/data/products";

export const metadata: Metadata = {
  title: "Products — Harvin Industries",
  description:
    "Browse Harvin Industries' full range of brick, block, and paver making machines — press machines, batching plants, and mixers.",
};

function filterProducts(searchParams: { q?: string; category?: string }) {
  const q = searchParams.q?.trim().toLowerCase();
  const category = searchParams.category as Category | undefined;

  return PRODUCTS.filter((product) => {
    if (category && product.category !== category) return false;
    if (q) {
      // Output names come from the production table so a search for "paver"
      // still finds the machines that make them.
      const outputs = [
        ...(product.productionTable?.map((row) => `${row.product} ${row.sizeMm}`) ?? []),
        ...(product.additionalOutputs ?? []),
      ].join(" ");
      const haystack =
        `${product.name} ${product.tagline} ${product.description} ${outputs}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export default async function ProductsPage(props: PageProps<"/products">) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined;

  const results = filterProducts({ q, category });

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-brand-border bg-brand-umber">
          <IsometricLines className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-umber from-35% via-brand-umber/55 via-60% to-transparent" />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-brick">
              Product Portfolio
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-brand-cream sm:text-5xl">
              Brick Making Machines
            </h1>
            <p className="mt-4 max-w-2xl text-brand-clay/70">
              Press machines, batching plants, and mixers. Each machine lists the
              bricks, pavers, and blocks it produces in its production table.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Suspense fallback={null}>
                <ProductFilters />
              </Suspense>
            </aside>

            <div>
              <p className="mb-6 text-sm text-brand-text-secondary">
                {results.length} {results.length === 1 ? "machine" : "machines"} found
              </p>

              {results.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-brand-border bg-brand-surface px-6 py-16 text-center">
                  <p className="font-display text-xl text-brand-ink">No machines found</p>
                  <p className="mt-2 text-sm text-brand-text-secondary">
                    Try a different search term or clear your filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
