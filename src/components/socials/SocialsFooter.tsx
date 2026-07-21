"use client";

import Link from "next/link";
import Reveal from "./anim/Reveal";

// Product-specific footer for the "/" landing. Links back to the agency.
export default function SocialsFooter({ onBookCall }: { onBookCall: () => void }) {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative px-6 pt-16 pb-10" style={{ borderTop: "1px solid var(--edge)" }}>
      <div className="w-full max-w-6xl mx-auto">
        <Reveal as="div" className="grid grid-cols-1 md:grid-cols-12 gap-12" amount={0.05}>
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: "none" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--accent)" }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 10.5V3.5l5 3 5-3v7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-bold text-sm" style={{ letterSpacing: "-0.01em", color: "var(--ink-primary)" }}>Socials</span>
              <span style={{ fontSize: "9.5px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>by DelegateHQ</span>
            </Link>
            <p className="text-sm max-w-xs" style={{ lineHeight: 1.75, color: "var(--ink-muted)" }}>
              A research-backed studio for scoring and scripting Reel ideas. Live on Instagram today, with more platforms on the way.
            </p>
            <p className="text-xs" style={{ color: "var(--ink-muted)" }}>© 2026 DelegateHQ. All rights reserved.</p>
          </div>

          {/* Product */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <h4 className="text-xs uppercase tracking-widest" style={{ color: "var(--ink-muted)" }}>Product</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Features", id: "#features" },
                { label: "How it works", id: "#how-it-works" },
                { label: "Watch the demo", id: "#demo" },
              ].map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-sm transition-colors duration-150"
                    style={{ color: "var(--ink-muted)", background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <Link href="/blog" className="text-sm transition-colors duration-150" style={{ color: "var(--ink-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h4 className="text-xs uppercase tracking-widest" style={{ color: "var(--ink-muted)" }}>More</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <button
                  onClick={onBookCall}
                  className="text-sm transition-colors duration-150"
                  style={{ color: "var(--ink-muted)", background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
                >
                  Book a call
                </button>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Legal disclaimer — defines the * and # markers used across the page */}
        <div className="mt-12 pt-6" style={{ borderTop: "1px solid var(--edge)" }}>
          <p style={{ fontSize: "11px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "760px" }}>
            <span style={{ color: "var(--ink-secondary)", fontWeight: 600 }}>Disclaimer.</span>{" "}
            Socials is a creative tool that helps you generate, score, and refine content. It does not
            guarantee reach, follower growth, engagement, views, or revenue.
            {" "}
            <span style={{ color: "var(--ink-secondary)" }}>*</span> Testimonials reflect the individual experiences of
            specific creators and are not a promise that you will achieve similar results.
            {" "}
            <span style={{ color: "var(--ink-secondary)" }}>#</span> Scores, figures, earnings estimates, and any results
            shown on this page are illustrative examples based on public benchmarks, not predictions,
            projections, or guarantees of income. Any earnings estimator is for illustration only: Socials
            does not pay creators, no level of income is promised, and most creators&apos; results vary widely,
            with many earning little or nothing. Your outcomes depend entirely on your niche, offer, effort,
            audience, consistency, and market conditions.
            {" "}
            <span style={{ color: "var(--ink-secondary)", fontWeight: 600 }}>Launch offer.</span> The free first month is a
            limited-intake promotion granted at our sole discretion based on fit, including the idea or
            product you bring. Booking a call or requesting access does not guarantee selection or access.
            Where granted, it covers one month of full platform access from workspace approval, with no
            credit card required; standard pricing applies afterwards. We may modify or end this offer at
            any time. Instagram and Reels are trademarks of their respective owners and are not affiliated
            with or endorsing Socials or DelegateHQ.
          </p>
        </div>

        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--edge)" }}>
          <p className="text-xs" style={{ color: "var(--ink-muted)" }}>Scripts worth filming.</p>

          {/* Moved here from the top nav: cross-link to the DelegateHQ agency */}
          <Link
            href="/agency"
            className="inline-flex items-center gap-2 group"
            style={{
              fontSize: "12px",
              color: "var(--ink-muted)",
              textDecoration: "none",
              textAlign: "center",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
          >
            DelegateHQ also runs done-for-you AI ops across 11 industries
            <span style={{ color: "var(--accent)", whiteSpace: "nowrap" }}>Explore the agency</span>
            <svg width="10" height="10" viewBox="0 0 11 11" fill="none" className="shrink-0">
              <path d="M2 5.5h7M6 2.5L9 5.5 6 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
