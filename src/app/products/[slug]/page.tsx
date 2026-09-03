import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Icon } from "@/components/ui/Icon";
import {
  ProductCard,
  ProductionTable,
  FeatureGroups,
  SpecTable,
  VariantsTable,
} from "@/components/products";
import {
  CATEGORY_LABELS,
  MATERIAL_LABELS,
  PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Harvin Industries`,
    description: product.tagline,
  };
}

export default async function ProductDetailPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const quoteHref = `/contact?product=${product.slug}`;

  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-brand-text-secondary">
            <Link href="/products" className="hover:text-brand-ink">Products</Link>
            <Icon name="chevron_right" className="text-sm" />
            <span className="text-brand-ink">{product.name}</span>
          </nav>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="grid gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-cream">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon name="deployed_code" className="text-6xl text-brand-clay" />
                  </div>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.images.slice(1).map((image) => (
                    <div
                      key={image}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brand-cream"
                    >
                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        sizes="20vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-brick">
                {CATEGORY_LABELS[product.category]}
                {product.material ? ` · ${MATERIAL_LABELS[product.material]}` : ""}
              </p>
              <h1 className="mt-3 font-display text-4xl tracking-tight text-brand-ink sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-lg text-brand-text-secondary">{product.tagline}</p>
              <p className="mt-4 leading-relaxed text-brand-text-secondary">
                {product.description}
              </p>

              {product.type === "machine" && (
                <div className="mt-6 flex flex-wrap gap-6">
                  {product.outputCapacity && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-brand-text-secondary">
                        Output
                      </p>
                      <p className="mt-1 font-display text-2xl text-brand-ink">
                        {product.outputCapacity.toLocaleString()} pcs/hr
                      </p>
                    </div>
                  )}
                  {product.power && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-brand-text-secondary">
                        Power
                      </p>
                      <p className="mt-1 font-display text-2xl text-brand-ink">
                        {product.power}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <Link
                href={quoteHref}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-brick px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-brand-cream transition-colors hover:bg-brand-brick-hover"
              >
                Request a Quote
                <Icon name="arrow_forward" className="text-base" />
              </Link>
            </div>
          </div>
        </section>

        {product.specs && (
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl tracking-tight text-brand-ink">
              Machine Specification
            </h2>
            <div className="mt-6">
              <SpecTable specs={product.specs} />
            </div>
          </section>
        )}

        {product.productionTable && (
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl tracking-tight text-brand-ink">
              Production Specification
            </h2>
            <p className="mt-2 text-sm text-brand-text-secondary">
              Output per hour by product and mould size on the {product.name}.
            </p>
            <div className="mt-6">
              <ProductionTable summary={product.productionSummary} rows={product.productionTable} />
            </div>
          </section>
        )}

        {product.featureGroups && (
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl tracking-tight text-brand-ink">
              Features
            </h2>
            <div className="mt-6">
              <FeatureGroups groups={product.featureGroups} />
            </div>
          </section>
        )}

        {product.variants && (
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl tracking-tight text-brand-ink">
              Available Sizes &amp; Output
            </h2>
            <p className="mt-2 text-sm text-brand-text-secondary">
              Mould sizes and hourly output by Harvin machine.
            </p>
            <div className="mt-6">
              <VariantsTable variants={product.variants} />
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl tracking-tight text-brand-ink">
              You may also need
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
