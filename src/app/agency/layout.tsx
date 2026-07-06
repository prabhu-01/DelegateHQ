import type { Metadata } from "next";

// SOCIALS-LAUNCH: preserves the original DelegateHQ agency SEO metadata now that the
// agency landing lives at /agency. Delete this file when reverting the Socials launch.
export const metadata: Metadata = {
  title: "DelegateHQ — Everything, handled.",
  description:
    "AI operations agency deploying vertically specialized agent teams that run the full operations of bootstrapped SaaS businesses. Support, onboarding, documentation, content, and customer success across 11 industry divisions.",
  keywords: "AI operations, SaaS operations, AI agents, customer support automation, onboarding automation, India SaaS",
  openGraph: {
    title: "DelegateHQ — Everything, handled.",
    description: "AI agent teams that run your entire ops stack so you can focus on building.",
    type: "website",
  },
};

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
