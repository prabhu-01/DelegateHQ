import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

// SOCIALS-LAUNCH: preserves the original DelegateHQ agency SEO metadata now that the
// agency landing lives at /agency. Delete this file when reverting the Socials launch.
const TITLE = "DelegateHQ. Everything, handled.";
const DESCRIPTION =
  "AI operations agency deploying vertically specialized agent teams that run the full operations of bootstrapped SaaS businesses. Support, onboarding, documentation, content, and customer success across 11 industry divisions.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI operations",
    "SaaS operations",
    "AI agents",
    "customer support automation",
    "onboarding automation",
    "India SaaS",
    "DelegateHQ",
  ],
  alternates: { canonical: "/agency" },
  openGraph: {
    title: TITLE,
    description: "AI agent teams that run your entire ops stack so you can focus on building.",
    type: "website",
    url: "/agency",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "AI agent teams that run your entire ops stack so you can focus on building.",
  },
};

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
