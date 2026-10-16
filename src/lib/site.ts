export const SITE_NAME = "Harvin Industries";

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
