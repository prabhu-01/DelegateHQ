"use client";

import { motion } from "framer-motion";
import { SOCIALS_VIDEOS, SOCIALS_HERO_VIDEO } from "./videos";

const headlineAnim = (delay: number) => ({
  initial: { opacity: 0, y: 40, filter: "blur(12px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { delay, duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
});

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
});

export default function SocialsHero({ onBookCall }: { onBookCall: () => void }) {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(99,102,241,0.1) 0%, transparent 65%)" }}
      />

      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-8">
        {/* Left: copy */}
        <div className="flex flex-col items-start text-left">
          {/* Launch-offer pill — the headline promo. Clickable: opens the book-a-call modal. */}
          <motion.button {...fadeUp(0.05)} onClick={onBookCall} className="socials-offer-pill" aria-label="First month free — book a call">
            <span className="socials-offer-shine" aria-hidden="true" />
            <span className="socials-offer-inner">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="socials-offer-spark" aria-hidden="true">
                <path d="M8 1l1.6 4.4L14 7l-4.4 1.6L8 13l-1.6-4.4L2 7l4.4-1.6L8 1z" fill="#fff" />
              </svg>
              <strong className="socials-offer-lead">First month free</strong>
              <span className="socials-offer-sep" aria-hidden="true" />
              <span className="socials-offer-sub">Limited intake</span>
              <svg width="12" height="12" viewBox="0 0 11 11" fill="none" className="socials-offer-arrow" aria-hidden="true">
                <path d="M2 5.5h7M6 2.5L9 5.5 6 8.5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.button>

          <div className="flex flex-col" style={{ gap: 0 }}>
            <motion.h1
              {...headlineAnim(0.12)}
              className="text-white"
              style={{ fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em" }}
            >
              Curated ideas in.
            </motion.h1>
            <motion.h1
              {...headlineAnim(0.24)}
              className="hero-headline-gradient"
              style={{ fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", paddingBottom: "0.06em" }}
            >
              Reels worth filming out.
            </motion.h1>
          </div>

          <motion.p
            {...fadeUp(0.5)}
            className="text-slate-400"
            style={{ fontSize: "18px", lineHeight: 1.7, maxWidth: "440px", marginTop: "22px" }}
          >
            A private studio that scores every curated Reel idea, scripts the winners, and refines them until they are ready to shoot.
          </motion.p>

          <motion.div {...fadeUp(0.62)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3" style={{ marginTop: "30px" }}>
            <button onClick={onBookCall} className="btn-primary">
              Book a call
            </button>
            <button onClick={() => scrollTo("#demo")} className="btn-secondary">
              Watch the demo
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M4 3v7l6-3.5L4 3z" fill="currentColor" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Right: scored idea card cluster (product-native hero visual) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto lg:ml-auto lg:mr-0"
          style={{ width: "min(260px, 72vw)" }}
        >
          {/* Glow behind the phone */}
          <div
            className="absolute pointer-events-none"
            style={{ inset: "-14%", borderRadius: "40px", background: "radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.28) 0%, transparent 70%)", filter: "blur(24px)" }}
          />
          {/* Depth card peeking behind, for a "stack of ideas" read */}
          <div
            className="absolute overflow-hidden hidden sm:block"
            style={{
              width: "64%",
              aspectRatio: "9 / 16",
              top: "9%",
              left: "-9%",
              borderRadius: "22px",
              border: "1px solid rgba(255,255,255,0.08)",
              transform: "rotate(-8deg)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
              opacity: 0.9,
            }}
          >
            <video src={SOCIALS_VIDEOS[3]} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" style={{ borderRadius: "inherit" }} />
            <div className="absolute inset-0" style={{ borderRadius: "inherit", background: "linear-gradient(180deg, rgba(8,8,16,0.5) 0%, rgba(8,8,16,0.5) 50%, rgba(8,8,16,0.82) 100%)" }} />
            <div className="absolute inset-0" style={{ borderRadius: "inherit", background: "radial-gradient(120% 90% at 30% 20%, rgba(99,102,241,0.35) 0%, transparent 55%)", mixBlendMode: "screen" }} />
          </div>

          {/* Front: the scored idea card */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "9 / 16",
              borderRadius: "26px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "#0d0d14",
              boxShadow: "0 40px 90px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
              transform: "rotate(3deg)",
            }}
          >
            <video
              src={SOCIALS_HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ borderRadius: "inherit" }}
            />
            {/* Indigo unify + darken so it reads as a product card, not a portrait */}
            <div className="absolute inset-0" style={{ borderRadius: "inherit", background: "linear-gradient(180deg, rgba(6,6,12,0.32) 0%, rgba(6,6,12,0.04) 34%, rgba(6,6,12,0.9) 100%)" }} />
            <div className="absolute inset-0" style={{ borderRadius: "inherit", background: "radial-gradient(120% 80% at 24% 14%, rgba(99,102,241,0.42) 0%, transparent 55%)", mixBlendMode: "screen" }} />

            {/* Top status pill */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute flex items-center gap-2"
              style={{ top: "14px", left: "14px", padding: "5px 10px", borderRadius: "999px", background: "rgba(6,6,12,0.7)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#818cf8" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#818cf8" }} />
              </span>
              <span className="font-mono" style={{ fontSize: "10px", color: "#cbd5e1", letterSpacing: "0.04em" }}>Fresh idea</span>
            </motion.div>

            {/* Bottom score panel */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.55 }}
              className="absolute"
              style={{ left: "14px", right: "14px", bottom: "14px", padding: "13px 14px", borderRadius: "14px", background: "rgba(6,6,12,0.78)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(14px)" }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono" style={{ fontSize: "9.5px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Hook score</span>
                <span className="text-white" style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
                  92<sup style={{ fontSize: "0.5em", color: "#818cf8", fontWeight: 600, marginLeft: "1px", top: "-0.7em" }}>#</sup>
                </span>
              </div>
              <div style={{ height: "4px", borderRadius: "999px", background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ delay: 1.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #6366f1, #a5b4fc)" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Launch-offer pill styling: animated gradient, shine sweep, breathing glow. */}
      <style jsx global>{`
        .socials-offer-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          margin-bottom: 24px;
          padding: 9px 8px 9px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: linear-gradient(100deg, #4338ca, #6366f1, #a78bfa, #6366f1, #4338ca);
          background-size: 220% 100%;
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          animation: socials-offer-gradient 6s linear infinite,
            socials-offer-breathe 3.4s ease-in-out infinite;
          transition: transform 0.2s ease;
        }
        .socials-offer-pill:hover {
          transform: translateY(-1px) scale(1.025);
        }
        .socials-offer-pill:active {
          transform: translateY(0) scale(0.99);
        }

        .socials-offer-inner {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 9px;
        }
        .socials-offer-lead {
          font-size: 13.5px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.005em;
          white-space: nowrap;
        }
        .socials-offer-sep {
          width: 1px;
          height: 12px;
          background: rgba(255, 255, 255, 0.35);
        }
        .socials-offer-sub {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.06em;
          white-space: nowrap;
        }
        .socials-offer-spark {
          animation: socials-offer-twinkle 2.2s ease-in-out infinite;
        }
        .socials-offer-arrow {
          margin-left: 2px;
          margin-right: 6px;
          transition: transform 0.2s ease;
        }
        .socials-offer-pill:hover .socials-offer-arrow {
          transform: translateX(3px);
        }

        /* Light sweeping across the pill */
        .socials-offer-shine {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(
            100deg,
            transparent 20%,
            rgba(255, 255, 255, 0.42) 50%,
            transparent 80%
          );
          transform: translateX(-120%);
          animation: socials-offer-shine 3.4s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes socials-offer-gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 220% 50%; }
        }
        @keyframes socials-offer-breathe {
          0%, 100% { box-shadow: 0 6px 24px rgba(99, 102, 241, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.28); }
          50% { box-shadow: 0 10px 38px rgba(129, 140, 248, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.35); }
        }
        @keyframes socials-offer-shine {
          0% { transform: translateX(-120%); }
          55%, 100% { transform: translateX(120%); }
        }
        @keyframes socials-offer-twinkle {
          0%, 100% { opacity: 0.75; transform: scale(0.9) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.15) rotate(15deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .socials-offer-pill,
          .socials-offer-shine,
          .socials-offer-spark {
            animation: none;
          }
          .socials-offer-pill {
            box-shadow: 0 6px 24px rgba(99, 102, 241, 0.45);
          }
        }
      `}</style>
    </section>
  );
}
