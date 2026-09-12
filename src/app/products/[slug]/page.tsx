import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import { Button, Icon, SectionHeader } from "@/components/ui";
import {
  ProductCard,
  ProductGallery,
  ProductionTable,
  FeatureGroups,
  SpecTable,
} from "@/components/products";
import {
  CATEGORY_LABELS,
  PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const title = `${product.name} — Harvin Industries`;
  const url = `/products/${product.slug}`;
  return {
    title,
    description: product.tagline,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: product.tagline,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.tagline,
      images: product.images[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductDetailPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const quoteHref = `/contact?product=${product.slug}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    image: product.images.map((image) => `${SITE_URL}${image}`),
    category: CATEGORY_LABELS[product.category],
    brand: { "@type": "Brand", name: SITE_NAME },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 2, name: product.name, item: `${SITE_URL}/products/${product.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main id="main" className="min-h-screen bg-white">
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-text-secondary">
              <Link href="/products" className="hover:text-brand-ink">Products</Link>
              <Icon name="chevron_right" className="text-sm" />
              <span className="text-brand-ink">{product.name}</span>
            </nav>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <ProductGallery images={product.images} alt={product.name} />

              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
                  {CATEGORY_LABELS[product.category]}
                </p>
                <h1 className="mt-3 font-display text-4xl tracking-tight text-brand-ink sm:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-4 text-lg text-brand-text-secondary">{product.tagline}</p>
                <p className="mt-4 leading-relaxed text-brand-text-secondary">
                  {product.description}
                </p>

                {(product.outputCapacity || product.power) && (
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

                <Button href={quoteHref} size="lg" className="mt-8">
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </section>

        {product.specs && (
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <SectionHeader eyebrow="Specifications" size="md">
                Machine <span className="text-brand-accent-text">Specification</span>
              </SectionHeader>
              <div className="mt-6">
                <SpecTable specs={product.specs} />
              </div>
            </div>
          </section>
        )}

        {product.productionTable && (
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <SectionHeader eyebrow="Production Capacity" size="md">
                Output <span className="text-brand-accent-text">Products</span>
              </SectionHeader>
              <p className="mt-2 text-sm text-brand-text-secondary">
                Products the {product.name} makes, with mould size and output per hour.
              </p>
              <div className="mt-6">
                <ProductionTable summary={product.productionSummary} rows={product.productionTable} />
              </div>
              {product.additionalOutputs && (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">
                    Also produced with optional moulds
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {product.additionalOutputs.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-xs font-semibold text-brand-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {product.featureGroups && (
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <SectionHeader eyebrow="Capabilities" tone="accent" size="md">
                Features
              </SectionHeader>
              <div className="mt-6">
                <FeatureGroups groups={product.featureGroups} />
              </div>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="bg-brand-surface-alt">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
              <SectionHeader eyebrow="Related Machines" size="md">
                You may also need
              </SectionHeader>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <ProductCard key={item.slug} product={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
