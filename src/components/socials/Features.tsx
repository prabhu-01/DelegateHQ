"use client";

import Reveal from "./anim/Reveal";
import { SOCIALS_VIDEOS } from "./videos";

// Minimal inline glyphs, matching the existing site's inline-SVG convention.
const icons: Record<string, React.ReactNode> = {
  script: (
    <path d="M4 3h8v10H4V3zM6 6h4M6 8.5h4M6 11h2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  ),
  chat: (
    <path d="M3 4.5h10v6H8l-3 2.5V10.5H3v-6z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  ),
  audit: (
    <path d="M3 8l2.5 2.5L13 4M2.5 12.5h11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  ),
  blog: (
    <path d="M3.5 3.5h9v9h-9v-9zM6 6.5h4M6 9h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  ),
  history: (
    <path d="M8 4v4l2.5 1.5M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  ),
  analysis: (
    <path d="M3 13V7M6.5 13V4M10 13V9M13.5 13V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  ),
  onboarding: (
    <path d="M8 8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3.5 13c0-2.2 2-3.5 4.5-3.5S12.5 10.8 12.5 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  ),
  token: (
    <path d="M8 2.5l5 2.75v5.5L8 13.5 3 10.75v-5.5L8 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

const FEATURES = [
  { key: "script", title: "Script generation", body: "One click drafts a full script from the idea and your creator profile: hook, beats, caption, hashtags, and a ManyChat flow." },
  { key: "chat", title: "Aria refinement chat", body: "A script-only assistant that rewrites hooks and tightens captions, turn by turn, without drifting off topic." },
  { key: "audit", title: "Reel Audit", body: "Upload the video you filmed. It is scored beat-by-beat against the script, with a next-take suggestion." },
  { key: "blog", title: "Blog Writer", body: "Expand a finished script into a long-form article, refine it in chat, then publish to a public feed." },
  { key: "history", title: "Scripts History", body: "Every idea that graduated past the bucket, with its script attached and kept separate from undecided ideas." },
  { key: "analysis", title: "Posts Analysis", body: "A read-only look at your published Reels: per-post hook and archetype breakdowns, plus a top-3 to improve." },
  { key: "onboarding", title: "Onboarding interview", body: "A five-step conversation that builds your creator profile once, so every future draft sounds like you." },
  { key: "token", title: "Token budget", body: "Your role, status, and a running meter of tokens used against the budget an admin has set for you." },
];

// Trust points folded in from the former standalone section, condensed into a strip.
const TRUST = [
  { title: "Owner-scoped, always", body: "Filtered by your creator profile on the server, never by anything a request could spoof." },
  { title: "Nothing is erased", body: "Delete hides an idea from every screen. The row stays in the database, reversible always." },
  { title: "Gated by default", body: "New sign-ups sit pending until an admin approves them. No self-service into the bucket." },
  { title: "Every action logged", body: "Approvals, blocks, and edits write an audit entry in the same transaction as the change." },
];

export default function Features({ onBookCall }: { onBookCall: () => void }) {
  return (
    <section id="features" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-24" />
      <div className="w-full max-w-6xl mx-auto">
        <Reveal className="flex justify-center mb-5">
          <span className="section-label">Inside the studio</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            className="text-center mb-4"
            style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--ink-primary)" }}
          >
            One place to kill the weak ideas
            <br className="hidden sm:block" /> and script the strong ones.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-center max-w-lg mx-auto mb-14" style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)" }}>
            Every tool a creator-operator needs between a curated idea and a published post.
          </p>
        </Reveal>

        {/* Featured card: Idea Bucket + scoring, with a live clip */}
        <Reveal
          delay={0.12}
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-0 overflow-hidden mb-4"
          style={{ borderRadius: "var(--radius-card)", border: "1px solid var(--edge)", background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex flex-col justify-center" style={{ padding: "38px 36px" }}>
            <span style={{ fontSize: "11px", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "14px" }}>
              Idea Bucket
            </span>
            <h3 className="mb-3" style={{ fontSize: "26px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--ink-primary)" }}>
              A wall of scored ideas, ranked before you look.
            </h3>
            <p style={{ fontSize: "15px", lineHeight: 1.7, maxWidth: "420px", color: "var(--ink-secondary)" }}>
              Every fresh idea lands pre-scored with a signal meter and the reasoning behind it. Open a card for the full breakdown, then delete it or generate a script.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7">
              {[
                { v: "Pre-scored", l: "on arrival" },
                { v: "Soft-delete", l: "never erased" },
                { v: "Owner-scoped", l: "on the server" },
              ].map((m, i) => (
                <div key={m.v} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-8" style={{ background: "var(--edge)" }} />}
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink-primary)" }}>{m.v}</div>
                    <div style={{ fontSize: "10px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "3px" }}>{m.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clip peeking from the featured card */}
          <div className="relative min-h-[220px] overflow-hidden" style={{ borderLeft: "1px solid var(--edge)" }}>
            <video
              src={SOCIALS_VIDEOS[3]}
              autoPlay muted loop playsInline preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.15) 40%, transparent 100%)" }} />
          </div>
        </Reveal>

        {/* Supporting feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.key} index={i % 4} staggerStep={0.06} className="card p-6 flex flex-col gap-3.5">
              <div
                className="flex items-center justify-center"
                style={{ width: "36px", height: "36px", borderRadius: "10px", background: "var(--canvas)", border: "1px solid var(--edge)", color: "var(--ink-secondary)" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{icons[f.key]}</svg>
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink-primary)" }}>{f.title}</h3>
              <p style={{ fontSize: "13px", lineHeight: 1.65, color: "var(--ink-muted)" }}>{f.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Trust strip, folded in from the former standalone section */}
        <Reveal delay={0.1} className="mt-16 pt-12" style={{ borderTop: "1px solid var(--edge)" }}>
          <p className="text-center mb-8" style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--ink-muted)" }}>
            Built so one creator can move fast without ever stepping on another.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST.map((t) => (
              <div key={t.title} className="flex items-start gap-3">
                <div
                  className="shrink-0 flex items-center justify-center mt-0.5"
                  style={{ width: "22px", height: "22px", borderRadius: "7px", background: "var(--ok-tint)", border: "1px solid var(--ok-tint)" }}
                >
                  <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                    <path d="M2.5 6.5l2.5 2.5 5.5-5.5" stroke="var(--ok-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1" style={{ fontSize: "13.5px", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink-primary)" }}>{t.title}</h4>
                  <p style={{ fontSize: "12.5px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center mt-12">
          <button onClick={onBookCall} className="btn-primary">
            Book a call
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
