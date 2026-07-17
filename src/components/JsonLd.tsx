import { SITE_URL } from "@/lib/site";

// Structured data tying the "Socials" and "DelegateHQ" brand names to the same
// entity, so search engines associate both terms with this site regardless of
// which one someone actually searches for.
export default function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "DelegateHQ",
      alternateName: ["Socials", "Socials by DelegateHQ", "DelegateHQ Socials"],
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Socials by DelegateHQ",
      alternateName: "Socials",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Socials",
      alternateName: "Socials by DelegateHQ",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description:
        "A research-backed studio that scores Instagram Reel ideas and turns the strongest into scripts worth filming.",
      provider: { "@id": `${SITE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/LimitedAvailability",
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Structured data only, no user input involved: safe to serialize directly.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
