"use client";

import { motion } from "framer-motion";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function SocialsCTA({ onBookCall }: { onBookCall: () => void }) {
  return (
    <section className="relative py-36 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 65%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(99,102,241,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, black 0%, transparent 75%)",
        }}
      />

      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-7">
        <motion.h2
          {...inView()}
          className="text-white"
          style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.06 }}
        >
          Turn your bucket into
          <br />
          a filming schedule.
        </motion.h2>
        <motion.p {...inView(0.08)} className="text-slate-400 max-w-md" style={{ fontSize: "17px", lineHeight: 1.7 }}>
          Access is invite-gated. Book a call and we will walk you through the studio and approve your workspace.
        </motion.p>
        <motion.div {...inView(0.14)}>
          <button onClick={onBookCall} className="btn-primary" style={{ padding: "13px 28px", fontSize: "15px" }}>
            Book a call
          </button>
        </motion.div>
      </div>
    </section>
  );
}
