// Single source of truth for the site's canonical URL and brand identity, so
// metadata, the sitemap, robots.txt, JSON-LD, and OG images all stay in sync.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://delegatehq.co").replace(/\/$/, "");

export const SITE_NAME = "DelegateHQ";
