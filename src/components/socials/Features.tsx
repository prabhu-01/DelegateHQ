"use client";

import { motion } from "framer-motion";
import { SOCIALS_VIDEOS } from "./videos";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

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

export default function Features({ onBookCall }: { onBookCall: () => void }) {
  return (
    <section id="features" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-24" />
      <div className="w-full max-w-6xl mx-auto">
        <motion.div {...inView()} className="flex justify-center mb-5">
          <span className="section-label">Inside the studio</span>
        </motion.div>
        <motion.h2
          {...inView(0.06)}
          className="text-center text-white mb-4"
          style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          One place to kill the weak ideas
          <br className="hidden sm:block" /> and script the strong ones.
        </motion.h2>
        <motion.p {...inView(0.1)} className="text-center text-slate-500 max-w-lg mx-auto mb-14" style={{ fontSize: "16px", lineHeight: 1.7 }}>
          Every tool a creator-operator needs between a scraped idea and a published post.
        </motion.p>

        {/* Featured card: Idea Bucket + scoring, with a live clip */}
        <motion.div
          {...inView(0.12)}
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-0 overflow-hidden mb-4"
          style={{ borderRadius: "16px", border: "1px solid rgba(99,102,241,0.22)", background: "linear-gradient(135deg, rgba(99,102,241,0.09) 0%, rgba(99,102,241,0.02) 100%)" }}
        >
          <div className="flex flex-col justify-center" style={{ padding: "38px 36px" }}>
            <span className="font-mono" style={{ fontSize: "11px", color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "14px" }}>
              Idea Bucket
            </span>
            <h3 className="text-white mb-3" style={{ fontSize: "26px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              A wall of scored ideas, ranked before you look.
            </h3>
            <p className="text-slate-400" style={{ fontSize: "15px", lineHeight: 1.7, maxWidth: "420px" }}>
              Every fresh idea lands pre-scored with a signal meter and the reasoning behind it. Open a card for the full breakdown, then delete it or generate a script.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7">
              {[
                { v: "Pre-scored", l: "on arrival" },
                { v: "Soft-delete", l: "never erased" },
                { v: "Owner-scoped", l: "on the server" },
              ].map((m, i) => (
                <div key={m.v} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.08)" }} />}
                  <div>
                    <div className="text-white" style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em" }}>{m.v}</div>
                    <div className="font-mono" style={{ fontSize: "10px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "3px" }}>{m.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clip peeking from the featured card */}
          <div className="relative min-h-[220px] overflow-hidden" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
            <video
              src={SOCIALS_VIDEOS[3]}
              autoPlay muted loop playsInline preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(13,13,20,0.9) 0%, rgba(13,13,20,0.35) 40%, transparent 100%)" }} />
          </div>
        </motion.div>

        {/* Supporting feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.key}
              {...inView((i % 4) * 0.06)}
              className="card p-6 flex flex-col gap-3.5"
            >
              <div
                className="flex items-center justify-center"
                style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#818cf8" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{icons[f.key]}</svg>
              </div>
              <h3 className="text-white" style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em" }}>{f.title}</h3>
              <p className="text-slate-500" style={{ fontSize: "13px", lineHeight: 1.65 }}>{f.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...inView(0.15)} className="flex justify-center mt-12">
          <button onClick={onBookCall} className="btn-primary">
            Book a call
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
