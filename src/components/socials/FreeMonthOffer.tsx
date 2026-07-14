"use client";

import { motion } from "framer-motion";

// Socials launch offer: the centerpiece. The free month is granted on FIT — based on the
// idea or product the creator brings — so the copy never promises it to everyone. Terms
// carry the "#" marker, defined in the footer disclaimer.
const INCLUDED = [
  "Idea Bucket with scored, ranked ideas",
  "One-click script generation",
  "Aria, the refinement chat",
  "Reel Audit on what you film",
  "Blog Writer and publishing",
  "Posts Analysis on your Reels",
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function FreeMonthOffer({ onBookCall }: { onBookCall: () => void }) {
  return (
    <section className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-24" />
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          {...inView()}
          className="relative overflow-hidden"
          style={{
            borderRadius: "22px",
            border: "1px solid rgba(99,102,241,0.35)",
            background: "linear-gradient(150deg, rgba(99,102,241,0.16) 0%, rgba(99,102,241,0.04) 45%, rgba(13,13,20,0.9) 100%)",
            boxShadow: "0 40px 100px rgba(79,70,229,0.16), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{ inset: 0, background: "radial-gradient(ellipse 60% 70% at 85% 15%, rgba(99,102,241,0.28) 0%, transparent 60%)" }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-0">
            {/* Left: the offer */}
            <div style={{ padding: "40px 40px 38px" }}>
              <span
                className="inline-flex items-center gap-2 mb-6"
                style={{
                  padding: "5px 12px",
                  borderRadius: "999px",
                  background: "rgba(99,102,241,0.18)",
                  border: "1px solid rgba(99,102,241,0.4)",
                  fontSize: "11px",
                  fontFamily: "var(--font-mono), monospace",
                  color: "#c7d2fe",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70" style={{ background: "#a5b4fc" }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#a5b4fc" }} />
                </span>
                Launch offer · Limited intake
              </span>

              <h2
                className="text-white mb-4"
                style={{ fontSize: "clamp(32px, 4.4vw, 50px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05 }}
              >
                Your first month
                <br />
                is on us.
              </h2>

              <p className="text-slate-300" style={{ fontSize: "16px", lineHeight: 1.7, maxWidth: "440px" }}>
                Book a call and tell us about your idea or the product you are building. If it is a
                fit, you get the full studio free for your first month.
                <sup style={{ fontSize: "0.65em", color: "#818cf8", fontWeight: 600, marginLeft: "1px" }}>#</sup>
              </p>

              {/* Trust chips */}
              <div className="flex flex-wrap items-center gap-2.5 mt-7">
                {["No credit card", "Full access, no limits", "Cancel anytime"].map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ fontSize: "12px", color: "#cbd5e1", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l2.5 2.5L10 3" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {chip}
                  </span>
                ))}
              </div>

              <button
                onClick={onBookCall}
                className="btn-primary mt-8"
                style={{ padding: "13px 28px", fontSize: "15px" }}
              >
                Book a call
                <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
                  <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Right: what's unlocked */}
            <div
              className="flex flex-col justify-center"
              style={{ padding: "40px 40px 38px", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p
                className="font-mono mb-5"
                style={{ fontSize: "10.5px", color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.12em" }}
              >
                Everything unlocked
              </p>
              <ul className="flex flex-col gap-3.5">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="shrink-0 flex items-center justify-center mt-0.5"
                      style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.4)" }}
                    >
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l2.5 2.5L10 3" stroke="#c7d2fe" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ fontSize: "13.5px", color: "#cbd5e1", lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>

              <p
                style={{ fontSize: "10.5px", color: "#64748b", lineHeight: 1.6, marginTop: "22px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                Limited intake. Access is granted at our discretion based on fit, and booking a call
                does not guarantee selection. Standard pricing applies after the free month.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
