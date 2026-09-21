import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { AboutHero, VisionMission, KeyFactors, FounderMessage } from "@/components/about";
import { COMPANY_INTRO } from "@/data/company";
import { PRODUCTS } from "@/data/products";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site";

const title = "About Us — Harvin Industries";
const description =
  "Harvin Industries is an ISO 9001:2015 certified, Ahmedabad-based manufacturer of fly ash brick, concrete brick, and paver block making machines. Our vision, mission, and the people behind the machines.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title,
    description,
    url: "/about",
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function AboutPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${OG_IMAGE}`,
    description: COMPANY_INTRO,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shed No 28, NK Industrial Park, Gatrad Bakrol Bujrang Kuha Road",
      addressLocality: "Bakrol Bujrang, Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "382430",
      addressCountry: "IN",
    },
    telephone: "+91-98985-75358",
    areaServed: "IN",
    hasCredential: "ISO 9001:2015",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Navbar products={PRODUCTS} />
      <main id="main" className="min-h-screen bg-white">
        {/* Who we are, and the certification — the two things a first-time
            visitor checks before anything else. */}
        <AboutHero />

        {/* Where we're going, and what we commit to. */}
        <VisionMission />

        {/* Why choose us — the differentiators. */}
        <KeyFactors />

        {/* The founder's letter sits last: it is read once trust is established,
            not before. */}
        <FounderMessage />
      </main>
      <Footer />
    </>
  );
}
