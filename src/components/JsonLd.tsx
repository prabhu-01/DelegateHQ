import { SITE_URL } from "@/lib/site";

export default function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "DelegateHQ",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "DelegateHQ",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
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
