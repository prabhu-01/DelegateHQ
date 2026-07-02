"use client";

import { motion } from "framer-motion";

// Premium blur-slide-up for headline lines
const headlineAnim = (delay: number) => ({
  initial: { opacity: 0, y: 64, filter: "blur(16px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
});

// Clean fade-up for supporting elements
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
});

export default function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-6 overflow-hidden">
      {/* Radial ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 75% 55% at 50% 38%, rgba(99,102,241,0.09) 0%, transparent 68%)",
      }} />

      {/* Subtle horizontal grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px)",
        backgroundSize: "100% 80px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 80%)",
      }} />

      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-7">

        {/* Headline */}
        <div className="flex flex-col items-center" style={{ gap: 0 }}>
          <motion.h1 {...headlineAnim(0.1)} className="hero-headline text-white">
            Everything,
          </motion.h1>
          <motion.h1 {...headlineAnim(0.22)} className="hero-headline text-white">
            handled.
          </motion.h1>
          <motion.h1
            {...headlineAnim(0.34)}
            className="hero-headline hero-headline-gradient"
            style={{ marginTop: "4px" }}
          >
            for your industry.
          </motion.h1>
        </div>

        {/* Subhead */}
        <motion.p
          {...fadeUp(0.55)}
          className="text-lg text-slate-400 max-w-xl"
          style={{ lineHeight: "1.75" }}
        >
          We deploy vertically specialized AI agent teams that run the full operations
          of your SaaS — support, onboarding, docs, content, and customer success —
          so you can focus entirely on building.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.65)} className="flex flex-col sm:flex-row items-center gap-3">
          <button onClick={() => scrollTo("#how-it-works")} className="btn-primary">
            See how it works
          </button>
          <button
            onClick={() => scrollTo("#proof")}
            className="btn-secondary"
          >
            View demo outputs
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.75)}
          className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 pt-6"
        >
          {[
            { value: "11", label: "Industry Divisions" },
            { value: "5", label: "Ops per Division" },
            { value: "₹20k", label: "Starting Monthly" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4">
              {i > 0 && (
                <div className="hidden sm:block w-px h-8" style={{ background: "rgba(255,255,255,0.08)" }} />
              )}
              <div className="flex flex-col items-center gap-1">
                <span
                  className="text-3xl font-bold text-white"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "#475569", fontSize: "10px" }}>
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="flex flex-col gap-1 items-center"
          >
            <div className="w-[1px] h-8 rounded-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.5))" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#6366f1" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
