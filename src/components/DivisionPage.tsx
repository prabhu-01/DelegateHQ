"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import dynamic from "next/dynamic";
import type { DivisionData, ProofSection, ProofFlag } from "@/lib/divisions";
import LenisWrapper from "@/components/LenisWrapper";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), { ssr: false });

// ── Animation helpers ─────────────────────────────────────────────────────────
const headlineAnim = (delay: number) => ({
  initial: { opacity: 0, y: 56, filter: "blur(14px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { delay, duration: 0.88, ease: [0.16, 1, 0.3, 1] as const },
});

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
});

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

// ── Root component ────────────────────────────────────────────────────────────
export default function DivisionPage({ division }: { division: DivisionData }) {
  return (
    <>
      <ThreeBackground />
      <LenisWrapper>
        <Navigation />
        <main>
          <HeroSection division={division} />
          <ProblemSection division={division} />
          <ServicesSection division={division} />
          <ProcessSection />
          <ProofSection division={division} />
          {/* SOCIALS-LAUNCH: DelegateHQ pricing hidden — restore <PricingSection division={division} /> to revert */}
          <FAQSection division={division} />
          <CTASection division={division} />
        </main>
        <Footer />
      </LenisWrapper>
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection({ division }: { division: DivisionData }) {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-6 overflow-hidden"
    >
      {/* Ambient radial glow — uses division color */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 38%, ${division.color}14 0%, transparent 65%)`,
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.025) 1px, transparent 1px)",
        backgroundSize: "100% 80px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 80%)",
      }} />

      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-7">

        {/* Back link + eyebrow */}
        <motion.div {...fadeUp(0.05)} className="flex flex-col items-center gap-3">
          <Link
            href="/agency"
            className="flex items-center gap-1.5 font-mono text-xs transition-colors duration-150"
            style={{ color: "#475569" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 2L3.5 6l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            DelegateHQ
          </Link>
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm"
            style={{
              background: `${division.color}12`,
              border: `1px solid ${division.color}30`,
              color: "#94a3b8",
            }}
          >
            <span
              className="relative flex h-2 w-2 shrink-0"
            >
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: division.color }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: division.color }}
              />
            </span>
            <span style={{ color: division.color }}>{division.hero.eyebrow}</span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="flex flex-col items-center" style={{ gap: 0 }}>
          <motion.h1 {...headlineAnim(0.1)} className="hero-headline text-white">
            {division.hero.line1}
          </motion.h1>
          <motion.h1 {...headlineAnim(0.22)} className="hero-headline text-white">
            {division.hero.line2}
          </motion.h1>
          <motion.h1
            {...headlineAnim(0.34)}
            className="hero-headline hero-headline-gradient"
            style={{ marginTop: "4px" }}
          >
            {division.hero.gradientLine}
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          {...fadeUp(0.55)}
          className="text-lg text-slate-400 max-w-xl"
          style={{ lineHeight: "1.75" }}
        >
          {division.hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.65)} className="flex flex-col sm:flex-row items-center gap-3">
          {/* SOCIALS-LAUNCH: "Start free trial" → "Book a call"; "See pricing" (→ #pricing) → "View sample output" (→ #proof). Restore to revert */}
          <button onClick={() => scrollTo("#cta")} className="btn-primary">
            Book a call
          </button>
          <button onClick={() => scrollTo("#proof")} className="btn-secondary">
            View sample output
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>

        {/* Metrics */}
        <motion.div
          {...fadeUp(0.75)}
          className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 pt-6"
        >
          {division.hero.metrics.map((m, i) => (
            <div key={m.label} className="flex items-center gap-4">
              {i > 0 && (
                <div className="hidden sm:block w-px h-8" style={{ background: "rgba(255,255,255,0.08)" }} />
              )}
              <div className="flex flex-col items-center gap-1">
                <span className="text-3xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                  {m.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "#475569", fontSize: "10px" }}>
                  {m.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="flex flex-col gap-1 items-center"
          >
            <div className="w-[1px] h-8 rounded-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.5))" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#6366f1" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Problem ───────────────────────────────────────────────────────────────────
function ProblemSection({ division }: { division: DivisionData }) {
  return (
    <section id="problem" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />
      <div className="w-full max-w-5xl mx-auto">
        <motion.div {...inView()} className="flex justify-center mb-5">
          <span className="section-label">The Problem</span>
        </motion.div>
        <motion.h2
          {...inView(0.06)}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          {division.problem.heading}
        </motion.h2>
        <motion.p
          {...inView(0.1)}
          className="text-center text-slate-500 max-w-lg mx-auto mb-16 text-base"
          style={{ lineHeight: "1.7" }}
        >
          {division.problem.subheading}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {division.problem.points.map((point, i) => (
            <motion.div
              key={point.title}
              {...inView(i * 0.1)}
              className="card card-lift p-7 flex flex-col gap-5"
            >
              <div className="w-full h-px rounded-full" style={{ background: `linear-gradient(90deg, ${point.color} 0%, transparent 60%)` }} />
              <div className="text-right">
                <div className="font-bold leading-none" style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.03em", color: point.color }}>
                  {point.stat}
                </div>
                <div className="font-mono text-xs mt-0.5" style={{ color: `${point.color}80` }}>{point.unit}</div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-2.5">{point.title}</h3>
                <p className="text-sm text-slate-500" style={{ lineHeight: "1.78" }}>{point.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...inView(0.3)}
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

// ── Services ──────────────────────────────────────────────────────────────────
function ServicesSection({ division }: { division: DivisionData }) {
  const items = division.services.items;
  return (
    <section id="services" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />
      <div className="w-full max-w-5xl mx-auto">
        <motion.div {...inView()} className="flex justify-center mb-5">
          <span className="section-label">What We Handle</span>
        </motion.div>
        <motion.h2
          {...inView(0.06)}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          {division.services.heading}
        </motion.h2>
        <motion.p
          {...inView(0.1)}
          className="text-center text-slate-500 max-w-xl mx-auto mb-16 text-base"
          style={{ lineHeight: "1.7" }}
        >
          {division.services.subheading}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {items.slice(0, 3).map((item, i) => (
            <ServiceCard key={item.title} item={item} delay={i * 0.09} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:max-w-[66.7%] md:mx-auto">
          {items.slice(3).map((item, i) => (
            <ServiceCard key={item.title} item={item} delay={(i + 3) * 0.09} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ item, delay }: { item: DivisionData["services"]["items"][0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4 }}
      className="card card-lift p-6 flex flex-col gap-4 cursor-default"
    >
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h12M8 2v12" stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded-md"
          style={{ background: `${item.tagColor}14`, border: `1px solid ${item.tagColor}28`, color: item.tagColor }}
        >
          {item.tag}
        </span>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white mb-2" style={{ letterSpacing: "-0.01em" }}>
          {item.title}
        </h3>
        <p className="text-sm text-slate-500" style={{ lineHeight: "1.78" }}>{item.body}</p>
      </div>
      <div className="mt-auto pt-4 font-mono text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "#334155" }}>
        {item.detail}
      </div>
    </motion.div>
  );
}

// ── Process ───────────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01", title: "Onboarding Call", duration: "Day 1 · 45 min",
    body: "A focused 45-minute call where we map your current ops stack, identify the three highest-leverage operations to automate first, and collect the tool access and brand guidelines we need to configure your agent team.",
    deliverable: "ops_map.pdf + agent_config_brief.md",
  },
  {
    number: "02", title: "System Configuration", duration: "Days 2–4",
    body: "We configure your AI agents: connecting your tools, training agents on your product and brand voice, calibrating escalation thresholds, and writing your sequences. You only need to grant tool access — we handle everything else.",
    deliverable: "agent_credentials.env + test_suite_results.md",
  },
  {
    number: "03", title: "First Outputs", duration: "Days 5–7",
    body: "Your agent team goes live in monitored mode. Real operations are handled, sequences are triggered, and the first outputs are produced. You receive a daily summary and can request adjustments via Slack during this period.",
    deliverable: "daily_ops_summary.md + first_week_review_call",
  },
  {
    number: "04", title: "Ongoing Operations", duration: "Week 2+",
    body: "Your agent team runs autonomously on a weekly ops cycle. Every Monday you receive a weekly operations report covering all tracked metrics, output volumes, and any flags raised during the week.",
    deliverable: "weekly_ops_report.md + monthly_review_call",
  },
];

function ProcessSection() {
  return (
    <section id="process" className="relative py-32 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />
      <div className="w-full max-w-5xl mx-auto">
        <motion.div {...inView()} className="flex justify-center mb-5">
          <span className="section-label">Process</span>
        </motion.div>
        <motion.h2
          {...inView(0.06)}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          Running in one week.
        </motion.h2>
        <motion.p
          {...inView(0.1)}
          className="text-center text-slate-400 max-w-lg mx-auto mb-20 text-base"
          style={{ lineHeight: "1.7" }}
        >
          From first call to live operations in seven days. No lengthy implementation projects.
        </motion.p>

        <div className="relative">
          <div className="absolute left-[31px] top-5 bottom-5 w-px hidden md:block" style={{ background: "linear-gradient(to bottom, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0.08) 100%)" }} />
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
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.06) 100%)", border: "1px solid rgba(99,102,241,0.35)" }}>
                    <span className="font-mono font-bold text-indigo-400" style={{ fontSize: "15px", letterSpacing: "0.04em" }}>{step.number}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className="w-px flex-1 mt-0 hidden md:block min-h-[40px]" style={{ background: "rgba(99,102,241,0.12)" }} />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-3 mb-3 mt-3">
                    <h3 className="text-lg font-semibold text-white" style={{ letterSpacing: "-0.01em" }}>{step.title}</h3>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.22)", color: "#818cf8" }}>{step.duration}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4" style={{ lineHeight: "1.8", maxWidth: "560px" }}>{step.body}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
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
      </div>
    </section>
  );
}

// ── Proof / Sample Ops Report ─────────────────────────────────────────────────
function ProofSection({ division }: { division: DivisionData }) {
  const { proof } = division;
  return (
    <section id="proof" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />
      <div className="w-full max-w-5xl mx-auto">
        <motion.div {...inView()} className="flex justify-center mb-5">
          <span className="section-label">Sample Output</span>
        </motion.div>
        <motion.h2
          {...inView(0.06)}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          What your Monday looks like.
        </motion.h2>
        <motion.p
          {...inView(0.1)}
          className="text-center text-slate-500 max-w-lg mx-auto mb-16 text-base"
          style={{ lineHeight: "1.7" }}
        >
          A real weekly ops report from a {division.name} client. Every metric your agent team tracked, surfaced, and acted on — delivered before 9am.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="terminal-box max-w-3xl mx-auto"
        >
          <div className="terminal-header">
            <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
            <span className="ml-3 font-mono text-xs text-slate-600">weekly_ops_report.md</span>
            <span className="ml-auto font-mono text-xs" style={{ color: "rgba(99,102,241,0.5)" }}>● live</span>
          </div>
          <pre className="p-7 font-mono text-xs overflow-x-auto" style={{ color: "#64748b", lineHeight: "1.9" }}>
            <span style={{ color: "#6366f1" }}>{`// weekly_ops_report.md — Week ${proof.weekNumber} | ${proof.clientName}\n\n`}</span>
            {proof.sections.map((section: ProofSection) => (
              <span key={section.title}>
                <span style={{ color: "#94a3b8", fontWeight: 600 }}>{section.title + "\n"}</span>
                {section.metrics.map((m) => {
                  const label = m.label.padEnd(30, " ");
                  return (
                    <span key={m.label}>
                      {"  "}{label}
                      {m.good ? (
                        <span style={{ color: "#34d399" }}>{m.value + "\n"}</span>
                      ) : m.warn ? (
                        <span style={{ color: "#fbbf24" }}>{m.value + "\n"}</span>
                      ) : (
                        m.value + "\n"
                      )}
                    </span>
                  );
                })}
                {"\n"}
              </span>
            ))}
            <span style={{ color: "#94a3b8", fontWeight: 600 }}>{"FLAGS\n"}</span>
            {proof.flags.map((flag: ProofFlag) => (
              <span key={flag.text}>
                {"  "}
                {flag.level === "P1" && <span style={{ color: "#f87171" }}>[P1] </span>}
                {flag.level === "P2" && <span style={{ color: "#f87171" }}>[P2] </span>}
                {flag.level === "WARN" && <span style={{ color: "#fbbf24" }}>[WARN] </span>}
                {flag.level === "INFO" && <span style={{ color: "#818cf8" }}>[INFO] </span>}
                {flag.text + "\n"}
              </span>
            ))}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
// SOCIALS-LAUNCH: PricingSection kept but not rendered (see <main> above). eslint-disable
// keeps the unused declarations from failing the build; remove disables when restoring.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const priceVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? 18 : -18, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({ y: dir > 0 ? -18 : 18, opacity: 0 }),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PricingSection({ division }: { division: DivisionData }) {
  const [annual, setAnnual] = useState(false);
  const direction = useRef(1);

  const toggle = () => {
    direction.current = annual ? -1 : 1;
    setAnnual((v) => !v);
  };

  return (
    <section id="pricing" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />
      <div className="w-full max-w-5xl mx-auto">
        <motion.div {...inView()} className="flex justify-center mb-5">
          <span className="section-label">Pricing</span>
        </motion.div>
        <motion.h2
          {...inView(0.06)}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          Simple pricing. No surprises.
        </motion.h2>
        <motion.p
          {...inView(0.1)}
          className="text-center text-slate-500 max-w-md mx-auto mb-10 text-base"
          style={{ lineHeight: "1.7" }}
        >
          All plans include a two-week free trial. No credit card required to start.
        </motion.p>

        {/* Toggle */}
        <motion.div {...inView(0.14)} className="flex flex-col items-center mb-14" style={{ gap: "10px" }}>
          <div className="flex items-center gap-3">
            <span className="text-sm cursor-pointer select-none transition-colors duration-150" style={{ color: !annual ? "#e2e8f0" : "#475569" }} onClick={toggle}>Monthly</span>
            <button
              onClick={toggle}
              className="relative flex items-center rounded-full transition-all duration-200 cursor-pointer shrink-0"
              style={{ width: "44px", height: "24px", background: annual ? "linear-gradient(135deg, #6366f1 0%, #5558e8 100%)" : "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)" }}
              aria-label="Toggle annual billing"
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute rounded-full bg-white"
                style={{ width: "18px", height: "18px", left: annual ? "22px" : "2px", boxShadow: "0 1px 4px rgba(0,0,0,0.35)" }}
              />
            </button>
            <span className="text-sm cursor-pointer select-none transition-colors duration-150" style={{ color: annual ? "#e2e8f0" : "#475569" }} onClick={toggle}>Annual</span>
          </div>
          <div style={{ height: "26px", display: "flex", alignItems: "center" }}>
            <AnimatePresence>
              {annual && (
                <motion.span
                  key="badge"
                  initial={{ opacity: 0, y: 6, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.88 }}
                  transition={{ duration: 0.22 }}
                  className="font-mono text-xs px-2.5 py-1 rounded-md"
                  style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.22)", color: "#34d399" }}
                >
                  Save 20% annually
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {division.pricing.tiers.map((tier, i) => {
            const saving = tier.price.monthly - tier.price.annual;
            const savingPct = Math.round((saving / tier.price.monthly) * 100);
            const currentPrice = annual ? tier.price.annual : tier.price.monthly;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative flex flex-col gap-6 p-7 rounded-2xl"
                style={tier.popular
                  ? { background: "#0d0d14", boxShadow: "0 0 0 1px rgba(99,102,241,0.5), 0 20px 60px rgba(99,102,241,0.12), 0 4px 16px rgba(0,0,0,0.4)" }
                  : { background: "#0d0d14", border: "1px solid rgba(255,255,255,0.07)" }
                }
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-mono text-xs px-3 py-1 rounded-full text-white whitespace-nowrap" style={{ background: "linear-gradient(135deg, #6366f1 0%, #5558e8 100%)" }}>
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-base font-semibold text-white mb-1.5" style={{ letterSpacing: "-0.01em" }}>{tier.name}</h3>
                  <p className="text-sm text-slate-500" style={{ lineHeight: "1.65" }}>{tier.description}</p>
                </div>

                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "20px" }}>
                  <div style={{ overflow: "hidden" }}>
                    <AnimatePresence mode="wait" custom={direction.current}>
                      <motion.div
                        key={annual ? "annual" : "monthly"}
                        custom={direction.current}
                        variants={priceVariants}
                        initial="enter" animate="center" exit="exit"
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="flex items-end gap-1.5"
                      >
                        <span className="text-4xl font-bold text-white" style={{ letterSpacing: "-0.03em", lineHeight: 1 }}>
                          ₹{currentPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-sm text-slate-600 mb-1">/mo</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div style={{ minHeight: "22px", overflow: "hidden" }}>
                    <AnimatePresence mode="wait">
                      {annual ? (
                        <motion.div key="saving" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }} className="flex items-center gap-2 mt-2">
                          <span className="font-mono text-xs line-through" style={{ color: "#334155" }}>₹{tier.price.monthly.toLocaleString("en-IN")}</span>
                          <span className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.18)", color: "#34d399" }}>Save {savingPct}% · ₹{(saving * 12).toLocaleString("en-IN")}/yr</span>
                        </motion.div>
                      ) : (
                        <motion.div key="empty" style={{ height: "22px" }} />
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <ul className="flex flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-2.5">
                      {f.included ? (
                        <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.12)" }}>
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      ) : (
                        <span className="shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center">
                          <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><path d="M1 1h8" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        </span>
                      )}
                      <span className="text-sm" style={{ color: f.included ? "#94a3b8" : "#334155", lineHeight: "1.5" }}>{f.label}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" })}
                  className={`mt-auto ${tier.popular ? "btn-primary" : "btn-secondary"} justify-center`}
                  style={{ width: "100%" }}
                >
                  {tier.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          {...inView(0.3)}
          className="mt-8 rounded-xl px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-6"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {["Two-week free trial on all plans", "No long-term contract required", "Cancel with 14 days notice"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "#475569" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7l3 3 6-6" stroke="#6366f1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQSection({ division }: { division: DivisionData }) {
  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />
      <div className="w-full max-w-2xl mx-auto">
        <motion.div {...inView()} className="flex justify-center mb-5">
          <span className="section-label">FAQ</span>
        </motion.div>
        <motion.h2
          {...inView(0.06)}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-14"
          style={{ letterSpacing: "-0.03em" }}
        >
          Common questions.
        </motion.h2>
        <motion.div {...inView(0.1)}>
          <Accordion.Root type="single" collapsible>
            {division.faq.map((item, i) => (
              <Accordion.Item key={i} value={`item-${i}`} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <Accordion.Header>
                  <Accordion.Trigger
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    <span className="text-sm font-medium text-slate-300 transition-colors duration-150 group-hover:text-slate-100" style={{ lineHeight: "1.6" }}>
                      {item.q}
                    </span>
                    <span className="shrink-0 flex items-center justify-center rounded-lg transition-all duration-200" style={{ width: "28px", height: "28px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M6 2v8M2 6h8" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"
                          className="transition-all duration-200 group-data-[state=open]:[transform:rotate(45deg)] group-data-[state=open]:[transform-origin:center]"
                        />
                      </svg>
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_0.22s_ease] data-[state=closed]:animate-[accordion-up_0.22s_ease]">
                  <p className="pb-6 text-sm" style={{ color: "#64748b", lineHeight: "1.85" }}>{item.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTASection({ division }: { division: DivisionData }) {
  return (
    <section id="cta" className="relative py-32 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />
        <div className="relative flex flex-col items-center text-center gap-6">
          <motion.div {...inView()}>
            <span className="section-label">Get Started</span>
          </motion.div>
          <motion.h2
            {...inView(0.06)}
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.1" }}
          >
            Your {division.name.toLowerCase()} ops<br />are waiting.
          </motion.h2>
          {/* SOCIALS-LAUNCH: trial copy softened — restore "Two-week free trial. Agent team live in one week. No credit card required." to revert */}
          <motion.p
            {...inView(0.1)}
            className="text-base text-slate-500 max-w-md"
            style={{ lineHeight: "1.75" }}
          >
            Agent team live in one week. Book a call to get started.
          </motion.p>
          <motion.div {...inView(0.16)} className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a free call
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            {/* SOCIALS-LAUNCH: pricing hidden — restore "See pricing" button to revert
            <button
              onClick={() => document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-secondary"
            >
              See pricing
            </button>
            */}
          </motion.div>
          <motion.div
            {...inView(0.22)}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            {/* SOCIALS-LAUNCH: "14-day free trial" chip removed — restore to revert */}
            {["Vertical-specialized", "Live in 7 days", "Cancel anytime"].map((chip) => (
              <div key={chip} className="flex items-center gap-2 font-mono text-xs" style={{ color: "#334155" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l2.5 3L10 3" stroke="#6366f1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {chip}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
