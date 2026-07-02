export interface BlogPost {
  id: string;
  slug: string;
  authorName: string;
  content: string;
  publishedAt: string;
  createdAt: string;
}

const BASE_URL = "https://socials.delegatehq.co/api/public/blogs";

export async function getBlogPosts(page = 1): Promise<{ posts: BlogPost[]; page: number; limit: number }> {
  const res = await fetch(`${BASE_URL}${page > 1 ? `?page=${page}` : ""}`, {
    headers: { "x-api-key": process.env.BLOG_API_KEY! },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch blog posts: ${res.status}`);
  return res.json();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${BASE_URL}/${slug}`, {
    headers: { "x-api-key": process.env.BLOG_API_KEY! },
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch blog post: ${res.status}`);
  const { post } = await res.json();
  return post;
}

export function excerptFromMarkdown(markdown: string, length = 160): string {
  const plain = markdown
    .replace(/^#+\s+/gm, "")
    .replace(/[*_`>~]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
  return plain.length > length ? `${plain.slice(0, length).trim()}…` : plain;
}

export function stripLeadingHeading(markdown: string): string {
  return markdown.replace(/^\s*#\s+.+\n+/, "");
}

export function titleFromMarkdown(markdown: string, slug: string): string {
  const heading = markdown.match(/^#\s+(.+)$/m);
  if (heading) return heading[1].trim();
  return slug
    .split("-")
    .filter((part) => !/^[a-f0-9]{4,}$/i.test(part))
    .join(" ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
