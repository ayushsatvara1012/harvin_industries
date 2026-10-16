import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, IsometricLines } from "@/components/ui";
import { getAllProducts } from "@/lib/products";
import { CATEGORY_LABELS, type Product } from "@/lib/product-types";
import { OG_IMAGE, OG_IMAGES, SITE_NAME } from "@/lib/site";

const title = "Sitemap — Harvin Industries";
const description = "Every page on the Harvin Industries website: company, brick and block making machines, contact and legal.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sitemap" },
  openGraph: { title, description, url: "/sitemap", siteName: SITE_NAME, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
};

const COMPANY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#manufacturing", label: "Manufacturing", nested: true },
  { href: "/#advantage", label: "Technology", nested: true },
  { href: "/#industries", label: "Industries", nested: true },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact & Quotations" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/sitemap", label: "Sitemap" },
];

const linkClass = "text-brand-text transition-colors hover:text-brand-accent-text hover:underline underline-offset-2";

function LinkGroup({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`${heading.replace(/\s+/g, "-").toLowerCase()}-heading`}>
      <h2
        id={`${heading.replace(/\s+/g, "-").toLowerCase()}-heading`}
        className="border-b border-brand-border pb-3 font-display text-2xl tracking-tight text-brand-ink"
      >
        {heading}
      </h2>
      <ul className="mt-4 space-y-2.5 text-base">{children}</ul>
    </section>
  );
}

export default async function SitemapPage() {
  // The page must still render if the catalog cannot load, so it falls back to
  // the Products link instead of failing the whole sitemap.
  const products: Product[] | null = await getAllProducts().catch(() => null);

  return (
    <main id="main" className="min-h-screen bg-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-brand-ink">
        <IsometricLines className="absolute inset-0 h-full w-full opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <Eyebrow tone="accent">Site Map</Eyebrow>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">Sitemap</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Every page on this website, in one place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <LinkGroup heading="Company">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href} className={link.nested ? "pl-4" : undefined}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </LinkGroup>

          <LinkGroup heading="Machines">
            <li>
              <Link href="/products" className={`${linkClass} font-semibold`}>
                All machines
              </Link>
            </li>
            {products?.map((product) => (
              <li key={product.slug} className="pl-4">
                <Link href={`/products/${product.slug}`} className={linkClass}>
                  {product.name}
                </Link>
                {CATEGORY_LABELS[product.category] !== product.name && (
                  <span className="ml-2 text-sm text-brand-text-secondary">{CATEGORY_LABELS[product.category]}</span>
                )}
              </li>
            ))}
            {products === null && (
              <li className="pl-4 text-sm text-brand-text-secondary">
                The machine list could not be loaded just now. Please use the All machines page.
              </li>
            )}
          </LinkGroup>

          <LinkGroup heading="Legal">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </LinkGroup>
        </div>

        <p className="mt-14 border-t border-brand-border pt-6 text-sm text-brand-text-secondary">
          Looking for the file search engines read? It is at{" "}
          <a href="/sitemap.xml" className="font-semibold text-brand-accent-text underline underline-offset-2">
            /sitemap.xml
          </a>
          .
        </p>
      </div>
    </main>
  );
}
