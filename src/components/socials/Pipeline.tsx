"use client";

import { motion } from "framer-motion";

// Socials launch: "How an idea becomes a Reel" — the 5-step pipeline from the product spec.
const STEPS = [
  { k: "01", title: "Scraped", body: "Your scraper profile drops fresh, pre-scored ideas into your bucket." },
  { k: "02", title: "Judged", body: "Keep the strong ones, delete the weak ones on sight. Nothing is erased." },
  { k: "03", title: "Scripted", body: "One click drafts a full script, then Aria refines the hook and beats." },
  { k: "04", title: "Filmed", body: "You shoot it. Reel Audit scores your take back against the script." },
  { k: "05", title: "Extended", body: "Turn the winner into a long-form blog post and publish it." },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function Pipeline() {
  return (
    <section id="how-it-works" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-24" />
      <div className="w-full max-w-6xl mx-auto">
        <motion.div {...inView()} className="flex justify-center mb-5">
          <span className="section-label">The pipeline</span>
        </motion.div>
        <motion.h2
          {...inView(0.06)}
          className="text-center text-white mb-16"
          style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          How an idea becomes a Reel.
        </motion.h2>

        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-4">
          {/* Connecting line on desktop */}
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{ top: "22px", left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), rgba(99,102,241,0.12))" }}
          />
          {STEPS.map((s, i) => (
            <motion.div key={s.k} {...inView(i * 0.08)} className="relative flex flex-col items-start md:items-center md:text-center">
              <div
                className="relative z-10 flex items-center justify-center shrink-0 mb-5"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "13px",
                  background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.06) 100%)",
                  border: "1px solid rgba(99,102,241,0.35)",
                }}
              >
                <span className="font-mono font-bold" style={{ fontSize: "14px", color: "#818cf8" }}>{s.k}</span>
              </div>
              <h3 className="text-white mb-2" style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.01em" }}>
                {s.title}
              </h3>
              <p className="text-slate-500" style={{ fontSize: "13.5px", lineHeight: 1.65, maxWidth: "220px" }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
