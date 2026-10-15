import type { Metadata } from "next";
import { Inter, Forum, Oswald } from "next/font/google";
import { toJsonLd } from "@/lib/json-ld";
import { COMPANY_INTRO } from "@/data/company";
import { ADDRESS_LINES, EMAIL, PHONE } from "@/data/contact";
import { IS_INDEXABLE, OG_IMAGE, ORGANIZATION_ID, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const forum = Forum({
  variable: "--font-forum",
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const title = "Harvin Industries — Brick & Block Making Machines";
const description =
  "ISO 9001:2015 certified manufacturer of Fly Ash Brick, Concrete Brick, and Paver Block making machines in Ahmedabad. Built for performance.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: IS_INDEXABLE ? undefined : { index: false, follow: false },
  title,
  description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/harvin_logo.svg",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE],
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/harvin_logo.svg`,
      description: COMPANY_INTRO,
      email: EMAIL,
      telephone: PHONE,
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS_LINES.slice(0, 2).join(", "),
        addressLocality: "Bakrol Bujrang, Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "382430",
        addressCountry: "IN",
      },
      areaServed: "IN",
      hasCredential: "ISO 9001:2015",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-IN",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${forum.variable} ${oswald.variable} h-full antialiased`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- icon font, not a page font; root layout is the correct place for a site-wide stylesheet link */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..500,0..1,-25..0&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(siteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
