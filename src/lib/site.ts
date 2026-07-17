// Single source of truth for the site's canonical URL and brand identity, so
// metadata, the sitemap, robots.txt, JSON-LD, and OG images all stay in sync.
// Change NEXT_PUBLIC_SITE_URL in .env.local if this ends up deployed at a
// different domain (e.g. https://socials.delegatehq.co).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://delegatehq.co").replace(/\/$/, "");

export const SITE_NAME = "Socials by DelegateHQ";
export const PARENT_ORG_NAME = "DelegateHQ";

// Search engines and users type all of these when looking for this product or
// its parent company. Keeping them explicit here (and in JSON-LD alternateName)
// is what actually drives showing up for brand-name searches, not the domain.
export const BRAND_NAMES = ["DelegateHQ", "Socials", "Socials by DelegateHQ", "DelegateHQ Socials"];
