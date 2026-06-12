import { DIVISIONS, getDivisionBySlug } from "@/lib/divisions";
import DivisionPage from "@/components/DivisionPage";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return DIVISIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const division = getDivisionBySlug(params.slug);
  if (!division) return {};
  return {
    title: `${division.name} Division — DelegateHQ`,
    description: division.hero.description,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const division = getDivisionBySlug(params.slug);
  if (!division) notFound();
  return <DivisionPage division={division} />;
}
