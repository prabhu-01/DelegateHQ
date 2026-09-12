import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { DIVISIONS } from "@/lib/divisions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
  ];

  const divisionRoutes: MetadataRoute.Sitemap = DIVISIONS.map((d) => ({
    url: `${SITE_URL}/divisions/${d.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...divisionRoutes];
}
