"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLANS = [
  {
    name: "Starter",
    price: { monthly: 20000, annual: 16000 },
    description: "Support and onboarding automation for early-stage SaaS.",
    features: [
      { label: "Customer Support (email + chat)", included: true },
      { label: "User Onboarding sequences (7-touch)", included: true },
      { label: "Weekly ops report", included: true },
      { label: "Slack access to ops team", included: true },
      { label: "Up to 500 tickets/month", included: true },
      { label: "Documentation writing", included: false },
      { label: "Content & Marketing output", included: false },
      { label: "Customer Success & health scoring", included: false },
      { label: "Monthly strategy review call", included: false },
    ],
    cta: "Start free trial",
    popular: false,
  },
  {
    name: "Growth",
    price: { monthly: 40000, annual: 32000 },
    description: "Full ops stack for growing SaaS companies with an active user base.",
    features: [
      { label: "Customer Support (email + chat)", included: true },
      { label: "User Onboarding sequences (7-touch)", included: true },
      { label: "Weekly ops report", included: true },
      { label: "Slack access to ops team", included: true },
      { label: "Up to 2,000 tickets/month", included: true },
      { label: "Documentation (up to 20 pages/mo)", included: true },
      { label: "Content & Marketing (12 pieces/mo)", included: true },
      { label: "Customer Success & health scoring", included: false },
      { label: "Monthly strategy review call", included: true },
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Complete",
    price: { monthly: 60000, annual: 48000 },
    description: "End-to-end ops with proactive customer success included.",
    features: [
      { label: "Customer Support (email + chat)", included: true },
      { label: "User Onboarding sequences (7-touch)", included: true },
      { label: "Weekly ops report", included: true },
      { label: "Slack access to ops team", included: true },
      { label: "Unlimited tickets", included: true },
      { label: "Documentation (unlimited)", included: true },
      { label: "Content & Marketing (20 pieces/mo)", included: true },
      { label: "Customer Success + QBR prep", included: true },
      { label: "Monthly strategy review call", included: true },
    ],
    cta: "Start free trial",
    popular: false,
  },
];

// direction: +1 = going annual (price drops → scrolls down-out, new scrolls up-in)
//            -1 = going monthly (price rises → scrolls up-out, new scrolls down-in)
const priceVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? 18 : -18, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit:  (dir: number) => ({ y: dir > 0 ? -18 : 18, opacity: 0 }),
};

const savingVariants = {
  enter: { y: 10, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
};

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  // direction: +1 when switching to annual (cheaper), -1 when switching to monthly (pricier)
  const direction = useRef(1);

  const toggle = () => {
    direction.current = annual ? -1 : 1;
    setAnnual((v) => !v);
  };

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
          Simple pricing. No surprises.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 max-w-md mx-auto mb-10 text-base"
          style={{ lineHeight: "1.7" }}
        >
          All plans include a two-week free trial. No credit card required to start.
        </motion.p>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="flex items-center justify-center gap-3 mb-14"
        >
          <span
            className="text-sm cursor-pointer select-none transition-colors duration-150"
            style={{ color: !annual ? "#e2e8f0" : "#475569" }}
            onClick={toggle}
          >
            Monthly
          </span>

          <button
            onClick={toggle}
            className="relative flex items-center rounded-full transition-all duration-200 cursor-pointer shrink-0"
            style={{
              width: "44px",
              height: "24px",
              background: annual
                ? "linear-gradient(135deg, #6366f1 0%, #5558e8 100%)"
                : "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            aria-label="Toggle annual billing"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute rounded-full bg-white"
              style={{
                width: "18px",
                height: "18px",
                left: annual ? "22px" : "2px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.35)",
              }}
            />
          </button>

          <span
            className="text-sm cursor-pointer select-none transition-colors duration-150"
            style={{ color: annual ? "#e2e8f0" : "#475569" }}
            onClick={toggle}
          >
            Annual
          </span>

          {/* Savings badge — fades in when annual is selected */}
          <AnimatePresence>
            {annual && (
              <motion.span
                key="badge"
                initial={{ opacity: 0, scale: 0.85, x: -6 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: -6 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-xs px-2.5 py-1 rounded-md"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.22)",
                  color: "#34d399",
                }}
              >
                20% off
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {PLANS.map((plan, i) => {
            const saving = plan.price.monthly - plan.price.annual;
            const savingPct = Math.round((saving / plan.price.monthly) * 100);
            const currentPrice = annual ? plan.price.annual : plan.price.monthly;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className={`relative flex flex-col gap-6 p-7 rounded-2xl ${plan.popular ? "md:-mt-5" : ""}`}
                style={
                  plan.popular
                    ? {
                        background: "#0d0d14",
                        boxShadow:
                          "0 0 0 1px rgba(99,102,241,0.5), 0 20px 60px rgba(99,102,241,0.12), 0 4px 16px rgba(0,0,0,0.4)",
                      }
                    : {
                        background: "#0d0d14",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }
                }
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-mono text-xs px-3 py-1 rounded-full text-white whitespace-nowrap"
                    style={{ background: "linear-gradient(135deg, #6366f1 0%, #5558e8 100%)" }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Plan name & desc */}
                <div>
                  <h3 className="text-base font-semibold text-white mb-1.5" style={{ letterSpacing: "-0.01em" }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-500" style={{ lineHeight: "1.65" }}>
                    {plan.description}
                  </p>
                </div>

                {/* Animated price block */}
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "20px" }}>
                  {/* Overflow clip so scrolling digits don't bleed */}
                  <div style={{ overflow: "hidden" }}>
                    <AnimatePresence mode="wait" custom={direction.current}>
                      <motion.div
                        key={annual ? "annual" : "monthly"}
                        custom={direction.current}
                        variants={priceVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="flex items-end gap-1.5"
                      >
                        <span
                          className="text-4xl font-bold text-white"
                          style={{ letterSpacing: "-0.03em", lineHeight: 1 }}
                        >
                          ₹{currentPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-sm text-slate-600 mb-1">/mo</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Savings line — animates in when annual */}
                  <div style={{ minHeight: "22px", overflow: "hidden" }}>
                    <AnimatePresence mode="wait">
                      {annual ? (
                        <motion.div
                          key="saving"
                          variants={savingVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.2, delay: 0.05 }}
                          className="flex items-center gap-2 mt-2"
                        >
                          <span
                            className="font-mono text-xs line-through"
                            style={{ color: "#334155" }}
                          >
                            ₹{plan.price.monthly.toLocaleString("en-IN")}
                          </span>
                          <span
                            className="font-mono text-xs px-1.5 py-0.5 rounded"
                            style={{
                              background: "rgba(16,185,129,0.1)",
                              border: "1px solid rgba(16,185,129,0.18)",
                              color: "#34d399",
                            }}
                          >
                            Save {savingPct}% · ₹{(saving * 12).toLocaleString("en-IN")}/yr
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div key="empty" style={{ height: "22px" }} />
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-2.5">
                      {f.included ? (
                        <span
                          className="shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(16,185,129,0.12)" }}
                        >
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M1.5 4.5l2 2 4-4" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      ) : (
                        <span className="shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center">
                          <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                            <path d="M1 1h8" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        </span>
                      )}
                      <span
                        className="text-sm"
                        style={{ color: f.included ? "#94a3b8" : "#334155", lineHeight: "1.5" }}
                      >
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => scrollTo("#cta")}
                  className={`mt-auto ${plan.popular ? "btn-primary" : "btn-secondary"} justify-center`}
                  style={{ width: "100%" }}
                >
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
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
