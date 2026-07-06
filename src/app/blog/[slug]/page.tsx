import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPostBySlug, excerptFromMarkdown, titleFromMarkdown, stripLeadingHeading } from "@/lib/blog";
import SocialsShell from "@/components/socials/SocialsShell";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug).catch(() => null);
  if (!post) return {};
  const title = titleFromMarkdown(post.content, post.slug);
  const description = excerptFromMarkdown(post.content);
  return {
    title: `${title} — Socials by DelegateHQ`,
    description,
    openGraph: { title, description, type: "article" },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await getBlogPostBySlug(params.slug);
  } catch {
    return (
      <SocialsShell>
        <main>
          <section className="relative pt-40 pb-28 px-6 text-center">
            <p className="text-slate-500">The blog is temporarily unavailable — check back soon.</p>
          </section>
        </main>
      </SocialsShell>
    );
  }
  if (!post) notFound();

  return (
    <SocialsShell>
      <main>
          <article className="relative pt-40 pb-28 px-6">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 65%)" }}
            />
            <div className="relative w-full max-w-3xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 font-mono text-xs mb-10 transition-colors duration-150"
                style={{ color: "#475569" }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M7.5 2L3.5 6l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to blog
              </Link>

              <div className="flex items-center gap-3 font-mono text-xs mb-6" style={{ color: "#475569" }}>
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.authorName}</span>
              </div>

              <h1
                className="text-3xl md:text-4xl font-bold text-white mb-12"
                style={{ letterSpacing: "-0.03em", lineHeight: 1.2 }}
              >
                {titleFromMarkdown(post.content, post.slug)}
              </h1>

              <div className="prose prose-invert prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{stripLeadingHeading(post.content)}</ReactMarkdown>
              </div>
            </div>
          </article>
      </main>
    </SocialsShell>
  );
}
