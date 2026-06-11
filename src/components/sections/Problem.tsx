"use client";

import { motion } from "framer-motion";

const PAIN_CARDS = [
  {
    number: "12 hrs",
    unit: "/week",
    color: "#f59e0b",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke="#f59e0b" strokeWidth="1.2"/>
        <path d="M9 5v4l2.5 2.5" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Lost to operations every week",
    body: "The average bootstrapped SaaS founder spends 12 hours every week on tasks that have nothing to do with the product — answering support tickets, chasing onboarding drop-offs, writing documentation. That's 624 hours per year not spent building.",
  },
  {
    number: "₹40k+",
    unit: "/month",
    color: "#ef4444",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 5.5h12M3 9h8" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="13.5" cy="12.5" r="3.5" stroke="#ef4444" strokeWidth="1.2"/>
        <path d="M12.5 12.5h2M13.5 11.5v2" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: "To hire one ops person",
    body: "A single operations hire in India costs ₹40k–₹80k per month in CTC before recruiting time, onboarding overhead, and management bandwidth. Most early-stage companies need at least two. The math doesn't work pre-Series A.",
  },
  {
    number: "23%",
    unit: "churn",
    color: "#6366f1",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 14l3.5-4.5 3.5 2.5 2.5-5 3 4" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 5h2.5v2.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.5 5L12 8.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Average early SaaS churn",
    body: "Twenty-three percent of new SaaS users churn within 30 days — not because the product is bad, but because onboarding is broken, support is slow, and no one follows up. These are operations failures, not product failures. And they are entirely preventable.",
  },
];

export default function Problem() {
  return (
    <section className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />

      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-5"
        >
          <span className="section-label">The Problem</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          Ops are killing your momentum.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 max-w-lg mx-auto mb-16 text-base"
          style={{ lineHeight: "1.7" }}
        >
          Three numbers that explain why 80% of bootstrapped SaaS founders stall before finding product-market fit.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PAIN_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="card card-lift p-7 flex flex-col gap-5"
            >
              {/* Top accent bar */}
              <div className="w-full h-px rounded-full" style={{ background: `linear-gradient(90deg, ${card.color} 0%, transparent 60%)` }} />

              {/* Icon + number */}
              <div className="flex items-start justify-between">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${card.color}14`, border: `1px solid ${card.color}28` }}
                >
                  {card.icon}
                </div>
                <div className="text-right">
                  <div
                    className="font-bold leading-none"
                    style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.03em", color: card.color }}
                  >
                    {card.number}
                  </div>
                  <div className="font-mono text-xs mt-0.5" style={{ color: `${card.color}80` }}>{card.unit}</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-2.5">{card.title}</h3>
                <p className="text-sm text-slate-500" style={{ lineHeight: "1.78" }}>{card.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bridge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex flex-col items-center gap-2 text-center"
        >
          <div className="w-px h-12 mx-auto" style={{ background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.4))" }} />
          <p className="text-xl md:text-2xl font-semibold text-white mt-2" style={{ letterSpacing: "-0.02em" }}>
            There is a third option.
          </p>
          <p className="text-base text-slate-500">And it does not require hiring.</p>
        </motion.div>
      </div>
    </section>
  );
}
