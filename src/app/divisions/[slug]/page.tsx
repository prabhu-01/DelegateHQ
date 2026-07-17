import { DIVISIONS, getDivisionBySlug } from "@/lib/divisions";
import DivisionPage from "@/components/DivisionPage";
import { notFound } from "next/navigation";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return DIVISIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const division = getDivisionBySlug(params.slug);
  if (!division) return {};
  const title = `${division.name} Division. DelegateHQ`;
  return {
    title,
    description: division.hero.description,
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

export default function Page({ params }: { params: { slug: string } }) {
  const division = getDivisionBySlug(params.slug);
  if (!division) notFound();
  return <DivisionPage division={division} />;
}
