import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getBlogPosts, excerptFromMarkdown, titleFromMarkdown } from "@/lib/blog";
import LenisWrapper from "@/components/LenisWrapper";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), { ssr: false });

export const metadata: Metadata = {
  title: "Blog — DelegateHQ",
  description: "Insights on AI operations, automation, and running lean teams — from the DelegateHQ team.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);

  let posts: Awaited<ReturnType<typeof getBlogPosts>>["posts"] = [];
  let limit = 20;
  let unavailable = false;
  try {
    ({ posts, limit } = await getBlogPosts(page));
  } catch {
    unavailable = true;
  }

  const hasNext = !unavailable && posts.length === limit;
  const hasPrev = !unavailable && page > 1;

  return (
    <>
      <ThreeBackground />
      <LenisWrapper>
        <Navigation />
        <main>
          <section className="relative pt-40 pb-28 px-6">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 65%)" }}
            />
            <div className="relative w-full max-w-5xl mx-auto">
              <div className="flex justify-center mb-5">
                <span className="section-label">Blog</span>
              </div>
              <h1
                className="text-center text-4xl md:text-5xl font-bold text-white mb-16"
                style={{ letterSpacing: "-0.03em" }}
              >
                Insights on AI operations.
              </h1>

              {unavailable ? (
                <p className="text-center text-slate-500">The blog is temporarily unavailable — check back soon.</p>
              ) : posts.length === 0 ? (
                <p className="text-center text-slate-500">No posts published yet — check back soon.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="card card-lift p-7 flex flex-col gap-4 no-underline"
                    >
                      <div className="flex items-center gap-3 font-mono text-xs" style={{ color: "#475569" }}>
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>·</span>
                        <span>{post.authorName}</span>
                      </div>
                      <h2
                        className="text-xl font-bold text-white"
                        style={{ letterSpacing: "-0.02em", lineHeight: 1.3 }}
                      >
                        {titleFromMarkdown(post.content, post.slug)}
                      </h2>
                      <p className="text-sm text-slate-500" style={{ lineHeight: 1.7 }}>
                        {excerptFromMarkdown(post.content)}
                      </p>
                      <span
                        className="inline-flex items-center gap-1.5 font-mono text-xs mt-auto pt-2"
                        style={{ color: "#6366f1" }}
                      >
                        Read more
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M2 5.5h7M6 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {(hasPrev || hasNext) && (
                <div className="flex items-center justify-center gap-3 mt-16">
                  {hasPrev && (
                    <Link href={`/blog?page=${page - 1}`} className="btn-secondary">
                      Previous
                    </Link>
                  )}
                  {hasNext && (
                    <Link href={`/blog?page=${page + 1}`} className="btn-secondary">
                      Next
                    </Link>
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </LenisWrapper>
    </>
  );
}
