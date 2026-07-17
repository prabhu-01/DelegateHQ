import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { DIVISIONS } from "@/lib/divisions";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/agency`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.7 },
  ];

  const divisionRoutes: MetadataRoute.Sitemap = DIVISIONS.map((d) => ({
    url: `${SITE_URL}/divisions/${d.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // The blog API can be unreachable in some environments; a sitemap missing the
  // blog posts is far better than a sitemap that fails to generate at all.
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { posts } = await getBlogPosts(1);
    blogRoutes = posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : undefined,
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch {
    // skip blog posts, keep the rest of the sitemap intact
  }

  return [...staticRoutes, ...divisionRoutes, ...blogRoutes];
}
