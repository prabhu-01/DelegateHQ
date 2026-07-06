"use client";

import { motion } from "framer-motion";

const POINTS = [
  {
    title: "Owner-scoped, always",
    body: "Every idea, script, and learning is filtered by your own creator profile on the server, never by anything a request could spoof.",
  },
  {
    title: "Nothing is erased",
    body: "Delete hides an idea from every screen; the row stays in the database. Reversible, always.",
  },
  {
    title: "Gated by default",
    body: "New sign-ups sit in a pending state until an admin approves them. No self-service into the bucket.",
  },
  {
    title: "Every action logged",
    body: "Approvals, blocks, role changes, and token edits all write an audit entry in the same transaction as the change.",
  },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function Trust() {
  return (
    <section className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-24" />
      <div className="w-full max-w-4xl mx-auto">
        <motion.h2
          {...inView()}
          className="text-center text-white mb-4"
          style={{ fontSize: "clamp(28px, 3.6vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12 }}
        >
          Safe to hand a creator their own bucket.
        </motion.h2>
        <motion.p {...inView(0.08)} className="text-center text-slate-500 max-w-md mx-auto mb-14" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          Built so one creator can move fast without ever stepping on another.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-0">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              {...inView((i % 2) * 0.06)}
              className="flex items-start gap-4 py-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="shrink-0 flex items-center justify-center mt-0.5"
                style={{ width: "26px", height: "26px", borderRadius: "8px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.22)" }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2.5 6.5l2.5 2.5 5.5-5.5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-white mb-1.5" style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em" }}>{p.title}</h3>
                <p className="text-slate-500" style={{ fontSize: "13.5px", lineHeight: 1.7 }}>{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
