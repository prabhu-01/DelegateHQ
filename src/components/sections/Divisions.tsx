"use client";

import { motion } from "framer-motion";

const DIVISIONS = [
  {
    status: "active",
    name: "SaaS & Tech",
    tagline: "For bootstrapped and early-stage SaaS companies",
    capabilities: ["Support triage and resolution", "User activation sequences", "API docs, content & health scoring"],
  },
  {
    status: "Q3 2026",
    name: "Ecommerce",
    tagline: "For D2C brands and marketplace sellers",
    capabilities: ["Order and returns automation", "Post-purchase sequences", "Product catalogue content"],
  },
  {
    status: "Q4 2026",
    name: "Real Estate",
    tagline: "For agencies, brokers, and proptech platforms",
    capabilities: ["Lead qualification flows", "Property listing content", "Tenant onboarding"],
  },
  {
    status: "Q4 2026",
    name: "Legal",
    tagline: "For law firms and legaltech platforms",
    capabilities: ["Client intake workflows", "Matter update communications", "Document drafting"],
  },
  {
    status: "Q1 2027",
    name: "Healthcare",
    tagline: "For healthtech platforms and clinics",
    capabilities: ["Patient onboarding", "Non-clinical query triage", "Health platform documentation"],
  },
  {
    status: "Q1 2027",
    name: "Finance",
    tagline: "For fintech platforms and advisors",
    capabilities: ["KYC onboarding", "Transaction query resolution", "Compliance documentation"],
  },
  {
    status: "Q2 2027",
    name: "HR & Recruiting",
    tagline: "For HR platforms and talent agencies",
    capabilities: ["Candidate outreach sequences", "Offer and onboarding flows", "Job description content"],
  },
  {
    status: "Q2 2027",
    name: "Education",
    tagline: "For edtech platforms and institutions",
    capabilities: ["Student onboarding", "Learning progress monitoring", "Curriculum documentation"],
  },
  {
    status: "Q3 2027",
    name: "Logistics",
    tagline: "For logistics platforms and fleet operators",
    capabilities: ["Shipment query automation", "Driver onboarding", "Delay communication flows"],
  },
  {
    status: "Q3 2027",
    name: "Hospitality",
    tagline: "For hotels, restaurants, and travel platforms",
    capabilities: ["Guest pre-arrival sequences", "Booking support", "Review response management"],
  },
  {
    status: "Q4 2027",
    name: "Insurance",
    tagline: "For insurtech platforms and brokers",
    capabilities: ["Policy onboarding", "Claims query triage", "Renewal sequences"],
  },
];

export default function Divisions() {
  return (
    <section id="divisions" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />

      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-5"
        >
          <span className="section-label">Divisions</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          11 industries. Deeply specialized.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 max-w-xl mx-auto mb-16 text-base"
          style={{ lineHeight: "1.7" }}
        >
          Each division is a vertical-specific agent stack trained on the language, workflows, and expectations of that industry. Generic ops AI doesn't understand your domain. Ours does.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {DIVISIONS.map((div, i) => (
            <motion.div
              key={div.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
              className={`card p-5 flex flex-col gap-3.5 cursor-default ${
                div.status === "active" ? "card-active" : ""
              }`}
              style={
                div.status === "active"
                  ? {
                      borderColor: "rgba(16,185,129,0.2)",
                      background: "linear-gradient(135deg, #0d141a 0%, #0d0d14 100%)",
                    }
                  : {}
              }
            >
              {/* Status */}
              {div.status === "active" ? (
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="font-mono text-xs" style={{ color: "#34d399" }}>Active · SaaS & Tech</span>
                </div>
              ) : (
                <span
                  className="font-mono text-xs w-fit px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#475569",
                  }}
                >
                  {div.status}
                </span>
              )}

              {/* Name & tagline */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-1" style={{ letterSpacing: "-0.01em" }}>
                  {div.name}
                </h3>
                <p className="text-xs text-slate-600" style={{ lineHeight: "1.6" }}>{div.tagline}</p>
              </div>

              {/* Capabilities */}
              <ul className="flex flex-col gap-2 mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {div.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="mt-0.5 shrink-0">
                      <path d="M1.5 5.5l2.5 2.5 5.5-5" stroke={div.status === "active" ? "#34d399" : "#6366f1"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs" style={{ color: "#475569", lineHeight: "1.5" }}>{cap}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Phase 1 callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.03) 100%)",
            border: "1px solid rgba(99,102,241,0.22)",
          }}
        >
          <div className="flex items-start gap-3.5">
            <div className="mt-1 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">
                SaaS & Tech Division is now accepting clients.
              </p>
              <p className="text-sm text-slate-500">Two-week free trial. No credit card required to start.</p>
            </div>
          </div>
          <button
            onClick={() => document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary btn-sm shrink-0"
          >
            See plans
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
