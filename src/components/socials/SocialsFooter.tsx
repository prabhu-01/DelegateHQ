"use client";

import Link from "next/link";

// Socials launch: product-specific footer for the "/" landing. Links back to the agency.
export default function SocialsFooter({ onBookCall }: { onBookCall: () => void }) {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative px-6 pt-16 pb-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: "none" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1 0%, #5558e8 100%)" }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 10.5V3.5l5 3 5-3v7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-bold text-white text-sm" style={{ letterSpacing: "-0.01em" }}>Socials</span>
              <span className="font-mono" style={{ fontSize: "9.5px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em" }}>by DelegateHQ</span>
            </Link>
            <p className="text-sm text-slate-600 max-w-xs" style={{ lineHeight: 1.75 }}>
              A private studio that turns AI-curated Instagram Reel ideas into scripts worth filming.
            </p>
            <p className="font-mono text-xs" style={{ color: "#1e293b" }}>© 2026 DelegateHQ. All rights reserved.</p>
          </div>

          {/* Product */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <h4 className="font-mono text-xs uppercase tracking-widest" style={{ color: "#334155" }}>Product</h4>
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
                    style={{ color: "#475569", background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <Link href="/blog" className="text-sm transition-colors duration-150" style={{ color: "#475569" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h4 className="font-mono text-xs uppercase tracking-widest" style={{ color: "#334155" }}>More</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <button
                  onClick={onBookCall}
                  className="text-sm transition-colors duration-150"
                  style={{ color: "#475569", background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  Book a call
                </button>
              </li>
              <li>
                <Link href="/agency" className="text-sm transition-colors duration-150" style={{ color: "#475569" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  DelegateHQ agency
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal disclaimer — defines the * and # markers used across the page */}
        <div className="mt-12 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontSize: "11px", lineHeight: 1.7, color: "#334155", maxWidth: "760px" }}>
            <span style={{ color: "#475569", fontWeight: 600 }}>Disclaimer.</span>{" "}
            Socials is a creative tool that helps you generate, score, and refine content. It does not
            guarantee reach, follower growth, engagement, views, or revenue.
            {" "}
            <span style={{ color: "#475569" }}>*</span> Testimonials reflect the individual experiences of
            specific creators and are not a promise that you will achieve similar results.
            {" "}
            <span style={{ color: "#475569" }}>#</span> Scores, figures, earnings estimates, and any results
            shown on this page are illustrative examples based on public benchmarks, not predictions,
            projections, or guarantees of income. Any earnings estimator is for illustration only: Socials
            does not pay creators, no level of income is promised, and most creators&apos; results vary widely,
            with many earning little or nothing. Your outcomes depend entirely on your niche, offer, effort,
            audience, consistency, and market conditions.
            {" "}
            <span style={{ color: "#475569", fontWeight: 600 }}>Launch offer.</span> The free first month is a
            limited-intake promotion granted at our sole discretion based on fit, including the idea or
            product you bring. Booking a call or requesting access does not guarantee selection or access.
            Where granted, it covers one month of full platform access from workspace approval, with no
            credit card required; standard pricing applies afterwards. We may modify or end this offer at
            any time. Instagram and Reels are trademarks of their respective owners and are not affiliated
            with or endorsing Socials or DelegateHQ.
          </p>
        </div>

        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="font-mono text-xs" style={{ color: "#1e293b" }}>Scripts worth filming.</p>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs" style={{ color: "#1e293b" }}>Invite-gated access</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
