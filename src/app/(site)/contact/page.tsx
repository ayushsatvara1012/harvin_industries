import type { Metadata } from "next";
import { ContactHero, ContactMap } from "@/components/contact";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { ADDRESS_LINES, EMAIL, GSTIN, PHONE } from "@/data/contact";
import { toJsonLd } from "@/lib/json-ld";
import { OG_IMAGE, OG_IMAGES, ORGANIZATION_ID, SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Contact & Quotations — Harvin Industries";
const description =
  "Request a quotation for a Harvin fly ash brick, concrete block, or paver block making machine. Ahmedabad factory address, phone, working hours and enquiry form.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title,
    description,
    url: "/contact",
    siteName: SITE_NAME,
    type: "website",
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE],
  },
};

export default async function ContactPage(props: PageProps<"/contact">) {
  const searchParams = await props.searchParams;
  const slug = typeof searchParams.product === "string" ? searchParams.product : undefined;
  // Only prefill from a slug that actually resolves — a stale or hand-typed
  // `?product=` must not put an unknown value into the select.
  const [products, product] = await Promise.all([
    getAllProducts(),
    slug ? getProductBySlug(slug) : Promise.resolve(undefined),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/contact#localbusiness`,
    name: SITE_NAME,
    parentOrganization: { "@id": ORGANIZATION_ID },
    url: `${SITE_URL}/contact`,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_LINES.slice(0, 2).join(", "),
      addressLocality: "Bakrol Bujrang, Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "382430",
      addressCountry: "IN",
    },
    vatID: GSTIN,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:30",
        closes: "18:00",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }}
      />
      <main id="main" className="min-h-screen bg-brand-ink">
        <ContactHero products={products} productName={product?.name} productSlug={product?.slug} />

        <ContactMap />
      </main>
    </>
  );
}
