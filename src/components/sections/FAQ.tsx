"use client";

import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";

const FAQ_ITEMS = [
  {
    q: "How is this different from just using ChatGPT?",
    a: "ChatGPT is a general-purpose AI that responds to prompts. DelegateHQ is a configured operations system. We connect to your actual tools — your support inbox, your CRM, your product analytics — and deploy agents trained on your specific product, brand voice, and workflows. The difference is the same as comparing a calculator to a CFO. ChatGPT gives you a response; we run a function. Our agents don't just generate text; they classify tickets, trigger emails based on behavior, update records, escalate with context, and produce structured reports. None of that happens without setup, integration, and domain-specific training.",
  },
  {
    q: "Do you need access to our internal systems?",
    a: "Yes — and we take this seriously. We need OAuth connections to your support email or helpdesk, your CRM, and your product analytics. We use read/write access only for the specific functions we operate — nothing broader. All credentials are stored encrypted and access is scoped per function. We provide a full credential audit document showing exactly what each agent has access to and why. You can revoke access at any time, and offboarding includes a complete access removal checklist. For clients with strict security requirements, we offer IP allowlisting and SSO-compatible setups.",
  },
  {
    q: "How do you ensure quality and prevent AI errors?",
    a: "We use a layered quality framework. Every agent output above a defined confidence threshold fires automatically; outputs below that threshold are flagged for human review before delivery. All agents are calibrated against your actual data during the setup week — we tune thresholds based on the error rate we observe. In the first two weeks, we review every single output manually. After that, we run weekly audits on random samples plus any agent that receives a negative signal (low CSAT, escalation, or user complaint). You also receive a weekly report that shows resolution rates, escalation rates, and any flags the quality layer surfaced.",
  },
  {
    q: "How long does it take to get set up?",
    a: "Seven days from onboarding call to live operations. Day 1 is a 45-minute call. Days 2–4 are system configuration — we do this on our end, you just need to grant tool access. Days 5–7, your agents go live in monitored mode with daily summaries. By day 8, you're in the weekly ops rhythm. We've run this process enough times that we have templates for every common SaaS tool stack. If you use Intercom, HubSpot, Notion, and Linear (the most common combination), we can configure in 36 hours.",
  },
  {
    q: "What's in the weekly operations report?",
    a: "The weekly report covers five sections: Support (ticket volume, auto-resolution rate, avg response time, CSAT scores, escalation log), Onboarding (new signups, activation rate by cohort, stall interventions, conversion to paid), Documentation (pages updated, new pages added, any gaps flagged), Content (pieces published, scheduled queue, performance metrics if available), and Flags (anything the agents encountered that requires your attention or a configuration decision). Reports are delivered every Monday morning as a Markdown document in your shared Notion or as a PDF — your choice. It's the ops meeting you never have to attend.",
  },
  {
    q: "Can we cancel at any time?",
    a: "Yes. All plans are month-to-month with a 14-day cancellation notice period. There are no lock-in contracts and no cancellation penalties. When you cancel, we provide a full offboarding document that includes: all agent configurations in a readable format, a complete access revocation checklist, an export of all reports and outputs generated during your subscription, and a 30-minute offboarding call. We'd rather you cancel cleanly and come back when the timing is right than feel trapped.",
  },
  {
    q: "Do you work with companies outside India?",
    // SOCIALS-LAUNCH: pricing language removed from this answer — original:
    // "Our pricing is denominated in INR because our primary audience is bootstrapped Indian SaaS founders, but we work with any SaaS company that operates in English. We currently have pilot clients in India, Singapore, and UAE. If you're based outside India, the onboarding process is identical — we operate asynchronously and all calls are via Google Meet or Zoom. Pricing for international clients is converted at the prevailing rate with no markup. If you're on a USD-denominated bank account, we can invoice in USD at an equivalent price."
    a: "Our primary audience is bootstrapped Indian SaaS founders, but we work with any SaaS company that operates in English. We currently have pilot clients in India, Singapore, and UAE. If you're based outside India, the onboarding process is identical — we operate asynchronously and all calls are via Google Meet or Zoom.",
  },
];

export default function FAQ() {
  return (
    <section className="relative py-32 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />

      <div className="w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-5"
        >
          <span className="section-label">FAQ</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-14"
          style={{ letterSpacing: "-0.03em" }}
        >
          Common questions.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion.Root type="single" collapsible>
            {FAQ_ITEMS.map((item, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    <span
                      className="text-sm font-medium transition-colors duration-150"
                      style={{ color: "#cbd5e1", lineHeight: "1.6" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                    >
                      {item.q}
                    </span>

                    {/* +/- icon */}
                    <span
                      className="shrink-0 flex items-center justify-center rounded-lg transition-all duration-200"
                      style={{
                        width: "28px",
                        height: "28px",
                        background: "rgba(99,102,241,0.08)",
                        border: "1px solid rgba(99,102,241,0.18)",
                      }}
                    >
                      {/* Plus shown when closed, minus when open — handled via CSS sibling trick via data attribute */}
                      <PlusMinusIcon />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content
                  className="overflow-hidden data-[state=open]:animate-[accordion-down_0.22s_ease] data-[state=closed]:animate-[accordion-up_0.22s_ease]"
                >
                  <p
                    className="pb-6 text-sm"
                    style={{ color: "#64748b", lineHeight: "1.85" }}
                  >
                    {item.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}

function PlusMinusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 2v8M2 6h8"
        stroke="#6366f1"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="transition-all duration-200 group-data-[state=open]:[transform:rotate(45deg)] group-data-[state=open]:[transform-origin:center]"
      />
    </svg>
  );
}
