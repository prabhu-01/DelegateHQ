"use client";

import { motion } from "framer-motion";

const CAPABILITIES = [
  {
    tag: "Core Ops",
    tagColor: "#f59e0b",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2a5 5 0 100 10A5 5 0 009 2z" stroke="#6366f1" strokeWidth="1.2"/>
        <path d="M7 12.5l.5 3.5h3l.5-3.5" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 16h6" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Customer Support",
    body: "AI agents triage, classify, and resolve support tickets across email and chat. Complex cases escalate with full context. First-response time drops to under 3 minutes with 85%+ auto-resolution.",
    detail: "avg response: 2m 47s · resolution: 87%",
  },
  {
    tag: "Activation",
    tagColor: "#10b981",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="#6366f1" strokeWidth="1.2"/>
        <path d="M6.5 9l2 2 3-3" stroke="#6366f1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "User Onboarding",
    body: "Adaptive onboarding sequences based on user behavior. Day-1 activation emails, feature introduction triggers, and stall-detection flows that fire when a user misses a key action. Average activation lift: 34%.",
    detail: "sequence depth: 7 emails · avg activation lift: +34%",
  },
  {
    tag: "Knowledge",
    tagColor: "#6366f1",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2.5" stroke="#6366f1" strokeWidth="1.2"/>
        <path d="M5 6h8M5 9h6M5 12h4" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Documentation",
    body: "Product documentation written, structured, and maintained by AI agents trained on your product. Feature guides, API references, integration tutorials, and release notes — always current, auto-synced with every product change.",
    detail: "format: Notion / Mintlify / GitBook · auto-sync: yes",
  },
  {
    tag: "Growth",
    tagColor: "#f43f5e",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 14l3.5-4 3.5 2.5 2.5-4.5 3 3.5" stroke="#6366f1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.5 5H16v2.5" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Content & Marketing",
    body: "A steady stream of brand-aligned content across SEO articles, LinkedIn posts, product newsletters, and changelog copy. Agents maintain your voice across channels so your content engine runs without your attention.",
    detail: "output: 12–20 pieces/month · SEO-optimized: yes",
  },
  {
    tag: "Retention",
    tagColor: "#8b5cf6",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2C5.134 2 2 5.134 2 9s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z" stroke="#6366f1" strokeWidth="1.2"/>
        <path d="M6 9.5C6.5 11 7.5 12 9 12s2.5-1 3-2.5" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M6.5 7h.5M11 7h.5" stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: "Customer Success",
    body: "Proactive health scoring, renewal nudges, and QBR preparation handled end-to-end. Agents monitor usage signals, flag at-risk accounts, and send timely check-in communications — without a CS hire on payroll.",
    detail: "health score cadence: daily · churn flag lag: <24h",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />

      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-5"
        >
          <span className="section-label">Capabilities</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          Five disciplines. One team.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 max-w-xl mx-auto mb-16 text-base"
          style={{ lineHeight: "1.7" }}
        >
          Each capability is a fully staffed AI function, not a feature toggle. You get the output of a five-person ops team without the headcount.
        </motion.p>

        {/* 3 + 2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {CAPABILITIES.slice(0, 3).map((cap, i) => (
            <CapCard key={cap.title} cap={cap} delay={i * 0.09} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:max-w-[66.7%] md:mx-auto">
          {CAPABILITIES.slice(3).map((cap, i) => (
            <CapCard key={cap.title} cap={cap} delay={(i + 3) * 0.09} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapCard({ cap, delay }: { cap: (typeof CAPABILITIES)[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4 }}
      className="card card-lift p-6 flex flex-col gap-4 cursor-default"
    >
      {/* Icon + tag row */}
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          {cap.icon}
        </div>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded-md"
          style={{
            background: `${cap.tagColor}14`,
            border: `1px solid ${cap.tagColor}28`,
            color: cap.tagColor,
          }}
        >
          {cap.tag}
        </span>
      </div>

      {/* Text */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-2" style={{ letterSpacing: "-0.01em" }}>
          {cap.title}
        </h3>
        <p className="text-sm text-slate-500" style={{ lineHeight: "1.78" }}>{cap.body}</p>
      </div>

      {/* Detail footer */}
      <div
        className="mt-auto pt-4 font-mono text-xs"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          color: "#334155",
        }}
      >
        {cap.detail}
      </div>
    </motion.div>
  );
}
