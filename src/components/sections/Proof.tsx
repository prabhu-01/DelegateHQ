"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["Support Tickets", "Onboarding Emails", "Documentation"] as const;
type Tab = (typeof TABS)[number];

const DOC_SECTIONS = [
  "1.   Overview",
  "  1.1  What is an outbound sequence?",
  "  1.2  When to use sequences vs. one-off emails",
  "2.   Prerequisites",
  "  2.1  Verify your sender domain (SPF/DKIM)",
  "  2.2  Import or sync your prospect list",
  "  2.3  Set your sending limits",
  "3.   Creating your first sequence",
  "  3.1  Navigate to Sequences → New",
  "  3.2  Choose a template or start blank",
  "  3.3  Add Step 1: Initial email",
  "  3.4  Configure wait intervals",
  "  3.5  Add follow-up steps (Steps 2–5)",
  "4.   Writing effective sequence emails",
  "  4.1  Subject line best practices",
  "  4.2  Body copy guidelines (< 100 words per step)",
  "  4.3  Personalization variables {{first_name}}, {{company}}",
  "5.   Activating and monitoring",
  "  5.1  Run a test send before activating",
  "  5.2  Activate the sequence",
  "  5.3  Reading the analytics dashboard",
  "6.   Common issues and fixes",
  "  6.1  Emails landing in spam",
  "  6.2  Sequence paused unexpectedly",
  "  6.3  Prospect replied but sequence continued",
];

export default function Proof() {
  const [activeTab, setActiveTab] = useState<Tab>("Support Tickets");

  return (
    <section id="proof" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />

      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-5"
        >
          <span className="section-label">Real Outputs</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          This is what we produce.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 max-w-lg mx-auto mb-12 text-base"
          style={{ lineHeight: "1.7" }}
        >
          Real outputs from our SaaS & Tech Division pilot with Funnl.io — an outbound sales automation platform.
        </motion.p>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div
            className="flex p-1 rounded-xl gap-1"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer"
                style={
                  activeTab === tab
                    ? {
                        background: "rgba(255,255,255,0.08)",
                        color: "#f1f5f9",
                        fontWeight: 500,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }
                    : { color: "#475569" }
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "Support Tickets" && <SupportTab />}
            {activeTab === "Onboarding Emails" && <OnboardingTab />}
            {activeTab === "Documentation" && <DocTab sections={DOC_SECTIONS} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function TerminalWindow({ title, meta, children }: { title: string; meta?: string; children: React.ReactNode }) {
  return (
    <div className="terminal-box h-full flex flex-col">
      <div className="terminal-header">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-3 font-mono text-xs" style={{ color: "#6366f1" }}>{title}</span>
        {meta && <span className="ml-auto font-mono text-xs" style={{ color: "#334155" }}>{meta}</span>}
      </div>
      <div className="p-5 flex-1">{children}</div>
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  const palette: Record<string, { bg: string; border: string; text: string }> = {
    indigo: { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)", text: "#818cf8" },
    red:    { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.3)",  text: "#f87171" },
    green:  { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", text: "#34d399" },
    amber:  { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", text: "#fbbf24" },
  };
  const s = palette[color] ?? palette.indigo;
  return (
    <span
      className="font-mono text-xs px-2 py-0.5 rounded"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
    >
      {label}
    </span>
  );
}

function MetaRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-xs" style={{ color: "#334155" }}>{label}</span>
      <span className="font-mono text-xs" style={{ color: valueColor ?? "#94a3b8" }}>{value}</span>
    </div>
  );
}

function SupportTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <TerminalWindow title="ticket_002.md" meta="Solo Plan">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs" style={{ color: "#475569" }}>#002</span>
              <Badge label="CONFIG" color="indigo" />
            </div>
            <Badge label="Resolved" color="green" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetaRow label="FROM" value="Karan Mehta" />
            <MetaRow label="RESPONSE" value="1m 54s" valueColor="#34d399" />
          </div>

          <div>
            <span className="font-mono text-xs block mb-1.5" style={{ color: "#334155" }}>SUBJECT</span>
            <p className="font-mono text-xs" style={{ color: "#94a3b8", lineHeight: "1.6" }}>
              Gmail not connecting after OAuth — sequences not sending
            </p>
          </div>

          <div>
            <span className="font-mono text-xs block mb-2" style={{ color: "#334155" }}>RESPONSE</span>
            <div
              className="rounded-lg p-4 flex flex-col gap-2.5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="font-mono text-xs" style={{ color: "#64748b", lineHeight: "1.75" }}>
                Hi Karan, the Gmail OAuth disconnect is caused by a Google policy change requiring re-authorization for apps inactive for 30+ days. Fix in 60 seconds:
              </p>
              <ol className="font-mono text-xs flex flex-col gap-1.5" style={{ color: "#64748b", lineHeight: "1.7", listStyleType: "decimal", paddingLeft: "16px" }}>
                <li>Settings → Email Accounts → Gmail → Disconnect</li>
                <li>Click "Connect Gmail" and complete OAuth</li>
                <li>Return to your sequence and click Resume</li>
              </ol>
              <p className="font-mono text-xs" style={{ color: "#475569" }}>
                Your 3 queued emails will send within 5 minutes. Let me know if this doesn't resolve it. — DelegateHQ Support
              </p>
            </div>
          </div>
        </div>
      </TerminalWindow>

      <TerminalWindow title="ticket_005.md" meta="Scale Plan">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs" style={{ color: "#475569" }}>#005</span>
              <Badge label="BUG P0" color="red" />
            </div>
            <Badge label="Escalated" color="amber" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetaRow label="FROM" value="Deepika Rao" />
            <MetaRow label="RESPONSE" value="3m 12s" valueColor="#34d399" />
          </div>

          <div>
            <span className="font-mono text-xs block mb-1.5" style={{ color: "#334155" }}>SUBJECT</span>
            <p className="font-mono text-xs" style={{ color: "#94a3b8", lineHeight: "1.6" }}>
              ALL 34 prospects disappeared from my pipeline — urgent
            </p>
          </div>

          <div>
            <span className="font-mono text-xs block mb-2" style={{ color: "#334155" }}>RESPONSE</span>
            <div
              className="rounded-lg p-4 flex flex-col gap-2.5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="font-mono text-xs" style={{ color: "#64748b", lineHeight: "1.75" }}>
                Deepika — treating this as P0. Your 34 prospects are not deleted — this is a display bug from a filter state conflict.
              </p>
              <p className="font-mono text-xs" style={{ color: "#64748b", lineHeight: "1.75" }}>
                Immediate fix: Pipeline → "Clear all filters" (top-right) → prospects reappear. No data was lost.
              </p>
              <p className="font-mono text-xs" style={{ color: "#475569", lineHeight: "1.75" }}>
                Escalating to engineering now as a confirmed bug. Follow-up within 2 hours. — DelegateHQ Support [ESCALATED → Engineering]
              </p>
            </div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}

function OnboardingTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <TerminalWindow title="day_01_activation.md" meta="Funnl.io">
        <div className="flex flex-col gap-4">
          <div>
            <span className="font-mono text-xs block mb-1.5" style={{ color: "#334155" }}>SUBJECT</span>
            <p className="font-mono text-xs" style={{ color: "#818cf8", lineHeight: "1.6" }}>
              {"{{first_name}}, add your first 3 prospects now"}
            </p>
          </div>
          <div>
            <span className="font-mono text-xs block mb-2" style={{ color: "#334155" }}>BODY (preview)</span>
            <div
              className="rounded-lg p-4 flex flex-col gap-2.5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[
                "You signed up 23 minutes ago. That means your outbound engine is ready — it's just waiting for prospects.",
                "The fastest way to see Funnl work: add 3 prospects to your first sequence. It takes under 2 minutes.",
                "Here's exactly how to do it →",
                "Once you add them, your first outbound email goes out automatically within the hour. Most users who do this in the first 24 hours see a reply within 3 days.",
              ].map((line, i) => (
                <p key={i} className="font-mono text-xs" style={{ color: "#64748b", lineHeight: "1.75" }}>{line}</p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-1">
            <MetaRow label="WORDS" value="94" />
            <MetaRow label="CTAs" value="1 primary" />
            <MetaRow label="OPEN RATE" value="61.4%" valueColor="#34d399" />
          </div>
        </div>
      </TerminalWindow>

      <TerminalWindow title="day_03_activated.md" meta="Funnl.io">
        <div className="flex flex-col gap-4">
          <div>
            <span className="font-mono text-xs block mb-1.5" style={{ color: "#334155" }}>SUBJECT</span>
            <p className="font-mono text-xs" style={{ color: "#818cf8", lineHeight: "1.6" }}>
              You're running sequences — here's what catches what slips
            </p>
          </div>
          <div>
            <span className="font-mono text-xs block mb-2" style={{ color: "#334155" }}>BODY (preview)</span>
            <div
              className="rounded-lg p-4 flex flex-col gap-2.5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[
                "Good. You've got sequences running. Now let's make sure nothing falls through.",
                "Three things that trip up most new Funnl users at this stage — and how to avoid them before they cost you replies:",
                "1. Your wait intervals are set to the default (3 days). Most users see better results with 5–7 days. Here's how to adjust →",
                "2. Your sequence isn't set to pause on reply. If someone responds, steps 3–5 still go out. Turn this on now →",
              ].map((line, i) => (
                <p key={i} className="font-mono text-xs" style={{ color: "#64748b", lineHeight: "1.75" }}>{line}</p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-1">
            <MetaRow label="WORDS" value="187" />
            <MetaRow label="CTAs" value="3 contextual" />
            <MetaRow label="OPEN RATE" value="54.7%" valueColor="#34d399" />
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}

function DocTab({ sections }: { sections: string[] }) {
  return (
    <div className="max-w-2xl mx-auto">
      <TerminalWindow
        title="how-to-set-up-outbound-sequence.md"
        meta="2,340 words · Notion"
      >
        <div
          className="rounded-lg p-5 overflow-x-auto"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <pre className="font-mono text-xs" style={{ color: "#475569", lineHeight: "1.9" }}>
            {sections.map((s, i) => (
              <span key={i} style={{ color: s.startsWith(" ") ? "#334155" : "#6366f1" }}>
                {s + "\n"}
              </span>
            ))}
          </pre>
        </div>
        <div className="flex items-center gap-5 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <MetaRow label="TOP-LEVEL SECTIONS" value={`${sections.filter(s => !s.startsWith(" ")).length}`} />
          <MetaRow label="SUBSECTIONS" value={`${sections.filter(s => s.startsWith(" ")).length}`} />
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs" style={{ color: "#34d399" }}>Auto-synced to Notion</span>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
