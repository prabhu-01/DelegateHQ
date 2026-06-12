"use client";

import { motion } from "framer-motion";

const TIERS = [
  {
    name: "Starter",
    from: "₹15k",
    description: "Support and onboarding automation. The fastest path to AI-handled ops for your industry.",
    bullets: [
      "Customer / patient / guest support",
      "Onboarding sequences",
      "Weekly ops report",
      "Volume limit per division",
    ],
    cta: "Start free trial",
    popular: false,
  },
  {
    name: "Growth",
    from: "₹28k",
    description: "Full ops stack — support, onboarding, documentation, and content. Most teams start here.",
    bullets: [
      "Everything in Starter",
      "Documentation writing",
      "Content & marketing output",
      "Monthly strategy review call",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Complete",
    from: "₹45k",
    description: "End-to-end ops with proactive retention and compliance included. No gaps.",
    bullets: [
      "Everything in Growth",
      "Customer success & health scoring",
      "Compliance / regulatory docs",
      "Unlimited volume",
    ],
    cta: "Start free trial",
    popular: false,
  },
];

export default function Pricing() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="pricing" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />

      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-5"
        >
          <span className="section-label">Pricing</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          Simple tiers. Industry pricing.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 max-w-lg mx-auto mb-4 text-base"
          style={{ lineHeight: "1.7" }}
        >
          Every division has three tiers. Exact pricing is calibrated to your industry's scale and complexity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="flex justify-center mb-12"
        >
          <button
            onClick={() => scrollTo("#divisions")}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150"
            style={{ color: "#818cf8" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#818cf8")}
          >
            Pick your division to see exact pricing
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative flex flex-col gap-6 p-7 rounded-2xl"
              style={
                tier.popular
                  ? {
                      background: "#0d0d14",
                      boxShadow: "0 0 0 1px rgba(99,102,241,0.5), 0 20px 60px rgba(99,102,241,0.12), 0 4px 16px rgba(0,0,0,0.4)",
                    }
                  : {
                      background: "#0d0d14",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }
              }
            >
              {tier.popular && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-mono text-xs px-3 py-1 rounded-full text-white whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #6366f1 0%, #5558e8 100%)" }}
                >
                  Most Popular
                </div>
              )}

              {/* Name & desc */}
              <div>
                <h3 className="text-base font-semibold text-white mb-1.5" style={{ letterSpacing: "-0.01em" }}>
                  {tier.name}
                </h3>
                <p className="text-sm text-slate-500" style={{ lineHeight: "1.65" }}>
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "20px" }}>
                <div className="flex items-end gap-1.5">
                  <span className="font-mono text-xs text-slate-600 mb-1.5">from</span>
                  <span
                    className="text-4xl font-bold text-white"
                    style={{ letterSpacing: "-0.03em", lineHeight: 1 }}
                  >
                    {tier.from}
                  </span>
                  <span className="text-sm text-slate-600 mb-1">/mo</span>
                </div>
                <p className="text-xs text-slate-600 mt-2" style={{ lineHeight: "1.5" }}>
                  Exact price varies by division. Annual billing saves 20%.
                </p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3">
                {tier.bullets.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span
                      className="shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(16,185,129,0.12)" }}
                    >
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path d="M1.5 4.5l2 2 4-4" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm text-slate-400" style={{ lineHeight: "1.5" }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => scrollTo("#cta")}
                className={`mt-auto ${tier.popular ? "btn-primary" : "btn-secondary"} justify-center`}
                style={{ width: "100%" }}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Guarantee bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-xl px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-6"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {[
            "Two-week free trial on all plans",
            "No long-term contract required",
            "Cancel with 14 days notice",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "#475569" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7l3 3 6-6" stroke="#6366f1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
