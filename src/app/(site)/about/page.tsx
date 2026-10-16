import type { Metadata } from "next";
import { AboutHero, VisionMission, KeyFactors, FounderMessage } from "@/components/about";
import { COMPANY_INTRO } from "@/data/company";
import { toJsonLd } from "@/lib/json-ld";
import { OG_IMAGE, OG_IMAGES, ORGANIZATION_ID, SITE_NAME, SITE_URL } from "@/lib/site";

const title = "About Us — Harvin Industries";
const description =
  "ISO 9001:2015 certified Ahmedabad manufacturer of fly ash brick, concrete block and paver block making machines. Our vision, mission and the people behind them.";

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
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE],
  },
};

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}/about`,
    name: `About ${SITE_NAME}`,
    description: COMPANY_INTRO,
    inLanguage: "en-IN",
    about: { "@id": ORGANIZATION_ID },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(aboutJsonLd) }}
      />
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
    </>
  );
}
