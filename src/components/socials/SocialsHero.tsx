"use client";

import { useLayoutEffect, useRef } from "react";
import { SOCIALS_VIDEOS, SOCIALS_HERO_VIDEO } from "./videos";
import { ensureGsap, MQ } from "./anim/gsapSetup";

// Hero plays a one-time entrance sequence on load. No scroll-linked pin/parallax:
// pinning is the heaviest class of scroll effect (forces a layout-reserving spacer and
// continuous recalculation on every scroll tick), and this page already asks a lot of
// the main thread elsewhere, so the hero stays a plain, cheap, GPU-friendly load-in.
export default function SocialsHero({ onBookCall }: { onBookCall: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const topPillRef = useRef<HTMLDivElement>(null);
  const scorePanelRef = useRef<HTMLDivElement>(null);
  const scoreBarRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  useLayoutEffect(() => {
    const gsap = ensureGsap();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MQ.reduced, (context) => {
        const { matches: reduced } = context;

        if (reduced) {
          gsap.set(
            [pillRef.current, line1Ref.current, line2Ref.current, subRef.current, ctaRef.current, clusterRef.current, topPillRef.current, scorePanelRef.current],
            { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
          );
          gsap.set(scoreBarRef.current, { width: "92%" });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(pillRef.current, { opacity: 0, y: 14, duration: 0.6 }, 0.1)
          .from(line1Ref.current, { opacity: 0, y: 36, filter: "blur(10px)", duration: 0.85 }, 0.2)
          .from(line2Ref.current, { opacity: 0, y: 36, filter: "blur(10px)", duration: 0.85 }, 0.32)
          .from(subRef.current, { opacity: 0, y: 18, duration: 0.6 }, 0.55)
          .from(ctaRef.current, { opacity: 0, y: 18, duration: 0.6 }, 0.64)
          .from(clusterRef.current, { opacity: 0, y: 24, scale: 0.94, duration: 0.9 }, 0.35)
          .from(topPillRef.current, { opacity: 0, y: -6, duration: 0.5 }, 0.95)
          .from(scorePanelRef.current, { opacity: 0, y: 10, duration: 0.55 }, 1.05)
          .fromTo(scoreBarRef.current, { width: "0%" }, { width: "92%", duration: 0.9, ease: "power2.out" }, 1.2);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(99,102,241,0.1) 0%, transparent 65%)" }}
      />

      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-8">
        {/* Left: copy */}
        <div ref={textColRef} className="flex flex-col items-start text-left">
          {/* Launch-offer pill: the headline promo, clickable, opens the book-a-call modal */}
          <button ref={pillRef} onClick={onBookCall} className="socials-offer-pill" aria-label="First month free, book a call">
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
          </button>

          {/* Exactly one H1 on the page (SEO best practice): both visual lines live
              inside it as block-level spans so the two-tone styling is unchanged. */}
          <h1 className="flex flex-col" style={{ gap: 0, margin: 0, fontWeight: "inherit" }}>
            <span
              ref={line1Ref}
              className="text-white"
              style={{ display: "block", fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em" }}
            >
              Know what to film
            </span>
            <span
              ref={line2Ref}
              className="hero-headline-gradient"
              style={{ display: "block", fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", paddingBottom: "0.06em" }}
            >
              before you shoot it.
            </span>
          </h1>

          <p ref={subRef} className="text-slate-400" style={{ fontSize: "18px", lineHeight: 1.7, maxWidth: "440px", marginTop: "22px" }}>
            Every Reel idea gets scored. The strong ones get scripted, refined, and ready to film.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3" style={{ marginTop: "30px" }}>
            <button onClick={onBookCall} className="btn-primary">
              Book a call
            </button>
            <button onClick={() => scrollTo("#demo")} className="btn-secondary">
              Watch the demo
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M4 3v7l6-3.5L4 3z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: scored idea card cluster (product-native hero visual) */}
        <div ref={clusterRef} className="relative mx-auto lg:ml-auto lg:mr-0" style={{ width: "min(260px, 72vw)" }}>
          {/* Glow behind the cluster */}
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
            <div
              ref={topPillRef}
              className="absolute flex items-center gap-2"
              style={{ top: "14px", left: "14px", padding: "5px 10px", borderRadius: "999px", background: "rgba(6,6,12,0.7)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#818cf8" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#818cf8" }} />
              </span>
              <span className="font-mono" style={{ fontSize: "10px", color: "#cbd5e1", letterSpacing: "0.04em" }}>Fresh idea</span>
            </div>

            {/* Bottom score panel */}
            <div
              ref={scorePanelRef}
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
                <div ref={scoreBarRef} style={{ height: "100%", width: "0%", borderRadius: "999px", background: "linear-gradient(90deg, #6366f1, #a5b4fc)" }} />
              </div>
            </div>
          </div>
        </div>
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
