import { MEDIA } from "@/data/media";
import { cloudinaryCoverUrl } from "@/lib/cloudinary";

export const SITE_NAME = "Harvin Industries";

// Link-preview image. A page that sets its own openGraph replaces the layout's,
// so every page spreads these in rather than relying on inheritance.
export const OG_IMAGE = cloudinaryCoverUrl(MEDIA.heroBanner, 1200, 630);
export const OG_IMAGES = [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Harvin Industries brick and block making machines" }];

// Search snippets cut off near 160 characters; break on a word and add an ellipsis.
export function metaDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export const CANONICAL_URL = "https://harvinindustries.com";

// Every host except CANONICAL_URL is a staging host: it renders with its own origin
// but stays noindex until the real domain is live.
const ALLOWED_SITE_URLS = [
  CANONICAL_URL,
  "https://harvin-industries.vercel.app",
  "https://harvin-industries.harvin-industries.workers.dev",
];
const LOCALHOST = /^http:\/\/localhost:\d{2,5}$/;

function resolveSiteUrl() {
  const requested = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (requested && (ALLOWED_SITE_URLS.includes(requested) || LOCALHOST.test(requested))) {
    return requested;
  }
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:${process.env.PORT ?? 3000}`;
  }
  return CANONICAL_URL;
}

// Origin used for metadataBase, the sitemap and structured data. It is inlined at
// build time from NEXT_PUBLIC_SITE_URL, limited to the allowed hosts so a typo
// cannot publish a broken canonical; anything else falls back to the real domain.
export const SITE_URL = resolveSiteUrl();

// Only the real domain may be indexed. A staging host (vercel.app) or localhost
// serves the same pages, and indexing it would split rankings as duplicate content.
export const IS_INDEXABLE = SITE_URL === CANONICAL_URL;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
