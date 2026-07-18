import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Named entries for the major AI crawlers, in addition to the wildcard rule below.
// The wildcard already covers them, but naming them explicitly is a clearer, more
// future-proof signal, and some crawler implementations are stricter about honoring
// wildcard-only rules.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
