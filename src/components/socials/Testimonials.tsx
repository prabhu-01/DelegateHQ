"use client";

import { motion } from "framer-motion";

// Socials launch: creator testimonials. Quotes reflect individual experiences; result
// claims carry a "#" marker and the whole section carries "*", both defined in the
// disclaimer in the footer. Keep copy realistic and moderate.
const TESTIMONIALS = [
  {
    quote: "The scoring alone saved me hours. I stopped filming ideas that were never going to land and put that time into the ones that scored high.#",
    name: "Aditi Rao",
    role: "Food creator",
    handle: "@aditi.cooks",
    initials: "AR",
  },
  {
    quote: "Aria is like having a scriptwriter on call. I paste a rough idea and get back a hook and beats I would actually say out loud.",
    name: "Rohan Mehta",
    role: "Fitness coach",
    handle: "@rohan.trains",
    initials: "RM",
  },
  {
    quote: "I used to sit on forty tabs of inspo every week. Now the bucket scores everything and I just script the top few. My posting finally got consistent.#",
    name: "Sara Lin",
    role: "Skincare creator",
    handle: "@saras.journal",
    initials: "SL",
  },
  {
    quote: "The Reel Audit caught pacing problems I could not see myself. Fixing the middle third is what changed things for me.#",
    name: "Karan Shah",
    role: "Finance explainer",
    handle: "@paise.with.karan",
    initials: "KS",
  },
  {
    quote: "Turning a finished script into a blog post in one click means the same idea works twice. Same effort, two formats.",
    name: "Meera Nair",
    role: "Travel creator",
    handle: "@meera.wanders",
    initials: "MN",
  },
  {
    quote: "Having scored ideas waiting for me every morning removed the what-do-I-post paralysis. That alone was worth it.",
    name: "Devon Brooks",
    role: "Small-business creator",
    handle: "@dev.builds",
    initials: "DB",
  },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function Testimonials() {
  return (
    <section className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-24" />
      <div className="w-full max-w-6xl mx-auto">
        <motion.div {...inView()} className="flex justify-center mb-5">
          <span className="section-label">What creators say</span>
        </motion.div>
        <motion.h2
          {...inView(0.06)}
          className="text-center text-white mb-4"
          style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          Built with creators who ship weekly.
        </motion.h2>
        <motion.p {...inView(0.1)} className="text-center text-slate-500 max-w-lg mx-auto mb-14" style={{ fontSize: "16px", lineHeight: 1.7 }}>
          A few notes from the creators who have been running their ideas through Socials.
        </motion.p>

        {/* Masonry-style wall so cards vary, not a rigid 3-up grid */}
        <div style={{ columnGap: "16px" }} className="columns-1 md:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.handle}
              {...inView((i % 3) * 0.06)}
              className="card card-lift"
              style={{ padding: "22px 22px 20px", marginBottom: "16px", breakInside: "avoid" }}
            >
              {/* Quote mark */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ marginBottom: "10px" }}>
                <path d="M8.5 5C5.5 6 4 8.3 4 11.6V16h4.6v-4.6H6.7c0-2 .9-3.2 2.8-3.7L8.5 5zm8.3 0c-3 1-4.5 3.3-4.5 6.6V16h4.6v-4.6h-1.9c0-2 .9-3.2 2.8-3.7L16.8 5z" fill="#6366f1" fillOpacity="0.6" />
              </svg>

              <p className="text-slate-300" style={{ fontSize: "14.5px", lineHeight: 1.7, marginBottom: "18px" }}>
                {t.quote.includes("#") ? (
                  <>
                    {t.quote.replace("#", "")}
                    <sup style={{ fontSize: "0.7em", color: "#64748b", fontWeight: 600, marginLeft: "1px" }}>#</sup>
                  </>
                ) : (
                  t.quote
                )}
              </p>

              <div className="flex items-center gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px" }}>
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0.12) 100%)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    color: "#c7d2fe",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-white" style={{ fontSize: "13.5px", fontWeight: 600, letterSpacing: "-0.01em" }}>{t.name}</div>
                  <div className="font-mono" style={{ fontSize: "11px", color: "#64748b", marginTop: "1px" }}>
                    {t.role} · {t.handle}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...inView(0.1)}
          className="text-center font-mono mx-auto"
          style={{ fontSize: "11px", lineHeight: 1.7, color: "#475569", marginTop: "26px", maxWidth: "560px" }}
        >
          <span style={{ color: "#64748b" }}>*</span> Individual experiences.{" "}
          <span style={{ color: "#64748b" }}>#</span> Illustrative results, not guaranteed. Full disclaimer below.
        </motion.p>
      </div>
    </section>
  );
}
