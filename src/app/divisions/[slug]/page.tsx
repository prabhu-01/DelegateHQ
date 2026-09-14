import { DIVISIONS, getDivisionBySlug } from "@/lib/divisions";
import DivisionPage from "@/components/DivisionPage";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return DIVISIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const division = getDivisionBySlug(params.slug);
  if (!division) return {};
  const title = `${division.name} Division. DelegateHQ`;
  const keywords = [
    `${division.name} AI operations`,
    `${division.name} ops automation`,
    `AI agents for ${division.name.toLowerCase()}`,
    division.tagline,
    "DelegateHQ",
    "AI operations agency",
  ];
  return {
    title,
    description: division.hero.description,
    keywords,
    alternates: { canonical: `/divisions/${params.slug}` },
    openGraph: {
      title,
      description: division.hero.description,
      type: "website",
      url: `/divisions/${params.slug}`,
      siteName: SITE_NAME,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: division.hero.description,
    },
  };
}

// Service + breadcrumb structured data so search and AI answer engines can
// resolve exactly what this division offers, who provides it, and where it
// sits in the site — without having to infer it from prose.
function DivisionJsonLd({ division, slug }: { division: ReturnType<typeof getDivisionBySlug>; slug: string }) {
  if (!division) return null;
  const url = `${SITE_URL}/divisions/${slug}`;
  const prices = division.pricing.tiers.map((t) => t.price.monthly);
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}/#service`,
      name: `${division.name} Operations`,
      serviceType: `${division.name} AI operations`,
      description: division.hero.description,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "IN",
      url,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: Math.min(...prices),
        highPrice: Math.max(...prices),
        offerCount: division.pricing.tiers.length,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "DelegateHQ", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: `${division.name} Division`, item: url },
      ],
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

export default function Page({ params }: { params: { slug: string } }) {
  const division = getDivisionBySlug(params.slug);
  if (!division) notFound();
  return (
    <>
      <DivisionJsonLd division={division} slug={params.slug} />
      <DivisionPage division={division} />
    </>
  );
}
