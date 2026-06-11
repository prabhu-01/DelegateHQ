"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Onboarding Call",
    duration: "Day 1 · 45 min",
    body: "A structured 45-minute call where we map your current ops stack, identify the three highest-leverage operations to automate first, and collect the tool access and brand guidelines we need to configure your agent team. No lengthy intake forms. Just a focused conversation.",
    deliverable: "ops_map.pdf + agent_config_brief.md",
  },
  {
    number: "02",
    title: "System Configuration",
    duration: "Days 2–4",
    body: "Our team configures your AI agents: connecting your support inbox, CRM, and product analytics, training the support agent on your product knowledge base, writing your onboarding sequences, and calibrating tone, escalation thresholds, and response templates to match your brand voice.",
    deliverable: "agent_credentials.env + test_suite_results.md",
  },
  {
    number: "03",
    title: "First Outputs",
    duration: "Days 5–7",
    body: "Your agent team goes live in monitored mode. Real tickets are handled, onboarding sequences are triggered, and the first documentation pages are drafted. You receive a daily summary of all agent actions during this period and can request adjustments via Slack.",
    deliverable: "daily_ops_summary.md + first_week_review_call",
  },
  {
    number: "04",
    title: "Ongoing Operations",
    duration: "Week 2+",
    body: "Your agent team runs autonomously on a weekly ops cycle. Every Monday you receive a weekly operations report covering ticket volume, resolution rates, onboarding conversion, content published, and any flags raised during the week. Monthly review calls are included in all plans.",
    deliverable: "weekly_ops_report.md + monthly_review_call",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OPS_REPORT = `// weekly_ops_report.md — Week 3 | Funnl.io

SUPPORT
  Tickets received:        47
  Auto-resolved:           41  (87.2%)
  Escalated to human:       6  (12.8%)
  Avg first response:    2m 47s
  CSAT (sampled):          4.6 / 5.0

ONBOARDING
  New signups:             23
  Day-1 email delivered:   23  (100%)
  Activated (≥1 sequence):  18  (78.3%)
  Stall interventions:       4
  Conversion to paid:        6  (26.1%)

CONTENT
  SEO articles published:   2
  LinkedIn posts:           5
  Changelog entry:          1
  Newsletter draft:         1

FLAGS
  [P1] Ticket #038: Potential billing edge case — routed to Rohan
  [INFO] Onboarding Day 3 CTR dropped 12% — A/B variant queued`;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />

      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-5"
        >
          <span className="section-label">Process</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          Running in one week.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-400 max-w-lg mx-auto mb-20 text-base"
          style={{ lineHeight: "1.7" }}
        >
          From first call to live operations in seven days. No lengthy implementation projects.
        </motion.p>

        {/* Steps — left-anchored vertical timeline */}
        <div className="relative">
          {/* Vertical spine line */}
          <div
            className="absolute left-[31px] top-5 bottom-5 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0.08) 100%)" }}
          />

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative flex gap-6 md:gap-10 pb-10 last:pb-0"
              >
                {/* Step number node */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.06) 100%)",
                      border: "1px solid rgba(99,102,241,0.35)",
                    }}
                  >
                    <span
                      className="font-mono font-bold text-indigo-400"
                      style={{ fontSize: "15px", letterSpacing: "0.04em" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  {/* Connector line segment below node (except last) */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="w-px flex-1 mt-0 hidden md:block min-h-[40px]"
                      style={{ background: "rgba(99,102,241,0.12)" }}
                    />
                  )}
                </div>

                {/* Content card */}
                <div className="flex-1 pb-2">
                  {/* Title row */}
                  <div className="flex flex-wrap items-center gap-3 mb-3 mt-3">
                    <h3
                      className="text-lg font-semibold text-white"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {step.title}
                    </h3>
                    <span
                      className="font-mono text-xs px-2.5 py-1 rounded-md"
                      style={{
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.22)",
                        color: "#818cf8",
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>

                  {/* Body */}
                  <p
                    className="text-sm text-slate-500 mb-4"
                    style={{ lineHeight: "1.8", maxWidth: "560px" }}
                  >
                    {step.body}
                  </p>

                  {/* Deliverable chip */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l2.5 3L10 3" stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-mono text-xs text-slate-500">{step.deliverable}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Terminal report */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="section-label">Sample output</span>
          </div>

          <div className="terminal-box max-w-3xl mx-auto">
            <div className="terminal-header">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <span className="ml-3 font-mono text-xs text-slate-600">weekly_ops_report.md</span>
              <span className="ml-auto font-mono text-xs" style={{ color: "rgba(99,102,241,0.5)" }}>● live</span>
            </div>
            <pre
              className="p-7 font-mono text-xs overflow-x-auto whitespace-pre"
              style={{ color: "#64748b", lineHeight: "1.8" }}
            >
              <span style={{ color: "#6366f1" }}>{"// weekly_ops_report.md — Week 3 | Funnl.io\n\n"}</span>
              <span style={{ color: "#94a3b8", fontWeight: 600 }}>{"SUPPORT\n"}</span>
              {"  Tickets received:        47\n"}
              {"  Auto-resolved:           "}<span style={{ color: "#34d399" }}>{"41  (87.2%)\n"}</span>
              {"  Escalated to human:       6  (12.8%)\n"}
              {"  Avg first response:    "}<span style={{ color: "#34d399" }}>{"2m 47s\n"}</span>
              {"  CSAT (sampled):          "}<span style={{ color: "#34d399" }}>{"4.6 / 5.0\n\n"}</span>
              <span style={{ color: "#94a3b8", fontWeight: 600 }}>{"ONBOARDING\n"}</span>
              {"  New signups:             23\n"}
              {"  Day-1 email delivered:   23  (100%)\n"}
              {"  Activated (≥1 sequence):  "}<span style={{ color: "#34d399" }}>{"18  (78.3%)\n"}</span>
              {"  Stall interventions:       4\n"}
              {"  Conversion to paid:        "}<span style={{ color: "#34d399" }}>{"6  (26.1%)\n\n"}</span>
              <span style={{ color: "#94a3b8", fontWeight: 600 }}>{"CONTENT\n"}</span>
              {"  SEO articles published:   2\n"}
              {"  LinkedIn posts:           5\n"}
              {"  Changelog entry:          1\n"}
              {"  Newsletter draft:         1\n\n"}
              <span style={{ color: "#94a3b8", fontWeight: 600 }}>{"FLAGS\n"}</span>
              {"  "}<span style={{ color: "#f87171" }}>{"[P1]"}</span>{" Ticket #038: Potential billing edge case — routed to Rohan\n"}
              {"  "}<span style={{ color: "#fbbf24" }}>{"[INFO]"}</span>{" Onboarding Day 3 CTR dropped 12% — A/B variant queued"}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
