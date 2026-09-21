import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar, Footer } from "@/components/layout";
import { Card, Eyebrow, IsometricLines } from "@/components/ui";
import { ProductCard, ProductFilters, ModelComparison } from "@/components/products";
import { PRODUCTS, type Category } from "@/data/products";
import { SITE_NAME } from "@/lib/site";

const title = "Products — Harvin Industries";
const description =
  "Browse Harvin Industries' full range of brick, block, and paver making machines — press machines, batching plants, and mixers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title,
    description,
    url: "/products",
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

function ProductFiltersSkeleton() {
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
      <Navbar products={PRODUCTS} />
      <main id="main" className="bg-white">
        <section className="relative overflow-hidden border-b border-white/10 bg-brand-ink">
          <IsometricLines className="absolute inset-0 h-full w-full opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/75 via-45% to-brand-ink/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-brand-ink/30 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <Eyebrow tone="accent">Product Portfolio</Eyebrow>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
              Brick & Block Making <span className="text-brand-yellow">Machines</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed">
              Industrial press machines, automated batching plants, and heavy-duty mixers engineered for maximum throughput and structural consistency.
            </p>
          </div>
        </section>

        <ModelComparison />

        <section className="bg-brand-surface-alt">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Suspense fallback={<ProductFiltersSkeleton />}>
                <ProductFilters products={PRODUCTS} />
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
                <Card variant="dashed" className="px-6 py-16 text-center">
                  <p className="font-display text-xl text-brand-ink">No machines found</p>
                  <p className="mt-2 text-sm text-brand-text-secondary">
                    Try a different search term or clear your filters.
                  </p>
                </Card>
              )}
            </div>
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
