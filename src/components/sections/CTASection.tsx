"use client";

import { motion } from "framer-motion";

// SOCIALS-LAUNCH: "No credit card required" chip removed — restore to revert
const CHIPS = [
  "Vertically specialized",
  "Running in one week",
  "Cancel anytime",
];

export default function CTASection() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="cta" className="relative py-40 px-6 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 65%)",
      }} />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(99,102,241,0.12) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 70% 55% at 50% 50%, black 0%, transparent 75%)",
      }} />

      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2
            className="text-5xl md:text-6xl font-bold text-white"
            style={{ letterSpacing: "-0.035em", lineHeight: 1.08 }}
          >
            Your ops are waiting.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-slate-400 max-w-md"
          style={{ lineHeight: "1.7" }}
        >
          {/* SOCIALS-LAUNCH: trial copy softened — restore "Start your two-week free trial. Your agent team goes live in one week. If it doesn't work, you owe nothing." to revert */}
          Book a call and your agent team goes live in one week.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.17, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          {/* SOCIALS-LAUNCH: "Start free trial" (→ #pricing, now removed) → "Book a call". Restore to revert */}
          <a
            href={process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: "13px 28px", fontSize: "15px" }}
          >
            Book a call
          </a>
          <button
            onClick={() => scrollTo("#how-it-works")}
            className="btn-secondary"
            style={{ padding: "13px 28px", fontSize: "15px" }}
          >
            See how it works
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>

        {/* Guarantee chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.26 }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          {CHIPS.map((chip) => (
            <div
              key={chip}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                color: "#64748b",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {chip}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
