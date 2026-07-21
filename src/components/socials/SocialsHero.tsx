"use client";

import { useLayoutEffect, useRef } from "react";
import { SOCIALS_VIDEOS, SOCIALS_HERO_VIDEO } from "./videos";
import { ensureGsap, MQ } from "./anim/gsapSetup";

const SCORE = 92;
const SEGMENTS = 5;
// Round-to-nearest so a 92/100 score reads as 5 lit segments (an "excellent" read),
// not a slightly-short bar that looks like a rendering bug.
const FILLED_SEGMENTS = Math.round((SCORE / 100) * SEGMENTS);

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
  const topPillRef = useRef<HTMLDivElement>(null);
  const scorePanelRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<Array<HTMLDivElement | null>>([]);

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
          gsap.set(segmentRefs.current, { scaleY: 1 });
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
          .from(segmentRefs.current, { scaleY: 0, transformOrigin: "bottom", stagger: 0.06, duration: 0.35 }, 1.15);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center pt-28 pb-16 px-6 overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-8">
        {/* Left: copy */}
        <div ref={textColRef} className="flex flex-col items-start text-left">
          {/* Launch-offer pill: the headline promo, clickable, opens the book-a-call modal */}
          <button
            ref={pillRef}
            onClick={onBookCall}
            aria-label="First month free, book a call"
            className="socials-offer-pill"
          >
            <strong className="socials-offer-lead">First month free</strong>
            <span className="socials-offer-sep" aria-hidden="true" />
            <span className="socials-offer-sub">Limited intake</span>
            <svg width="12" height="12" viewBox="0 0 11 11" fill="none" className="socials-offer-arrow" aria-hidden="true">
              <path d="M2 5.5h7M6 2.5L9 5.5 6 8.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Exactly one H1 on the page (SEO best practice): both visual lines live
              inside it as block-level spans so the two-tone styling is unchanged. */}
          <h1 className="flex flex-col" style={{ gap: 0, margin: 0, fontWeight: "inherit" }}>
            <span
              ref={line1Ref}
              style={{ display: "block", fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--ink-primary)" }}
            >
              Know what to film
            </span>
            <span
              ref={line2Ref}
              style={{ display: "block", fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", paddingBottom: "0.06em", color: "var(--ink-primary)" }}
            >
              before you shoot it.
            </span>
          </h1>

          <p ref={subRef} style={{ fontSize: "18px", lineHeight: 1.7, maxWidth: "440px", marginTop: "22px", color: "var(--ink-secondary)" }}>
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
          {/* Depth card peeking behind, for a "stack of ideas" read */}
          <div
            className="absolute overflow-hidden hidden sm:block"
            style={{
              width: "64%",
              aspectRatio: "9 / 16",
              top: "9%",
              left: "-9%",
              borderRadius: "22px",
              border: "1px solid var(--edge)",
              transform: "rotate(-8deg)",
              boxShadow: "var(--shadow-lift)",
              opacity: 0.9,
            }}
          >
            <video src={SOCIALS_VIDEOS[3]} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" style={{ borderRadius: "inherit" }} />
            <div className="absolute inset-0" style={{ borderRadius: "inherit", background: "linear-gradient(180deg, rgba(26,26,24,0.35) 0%, rgba(26,26,24,0.35) 50%, rgba(26,26,24,0.75) 100%)" }} />
          </div>

          {/* Front: the scored idea card */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "9 / 16",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--edge)",
              background: "var(--surface)",
              boxShadow: "var(--shadow-lift)",
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
            {/* Darken for legibility of the overlaid status pill + score panel */}
            <div className="absolute inset-0" style={{ borderRadius: "inherit", background: "linear-gradient(180deg, rgba(26,26,24,0.28) 0%, rgba(26,26,24,0.02) 34%, rgba(26,26,24,0.85) 100%)" }} />

            {/* Top status pill */}
            <div
              ref={topPillRef}
              className="absolute flex items-center gap-2"
              style={{ top: "14px", left: "14px", padding: "5px 10px", borderRadius: "999px", background: "rgba(26,26,24,0.65)", border: "1px solid rgba(255,255,255,0.14)", backdropFilter: "blur(10px)" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#A6CE79" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#A6CE79" }} />
              </span>
              <span style={{ fontSize: "10px", color: "#E8E5D8", letterSpacing: "0.04em" }}>Fresh idea</span>
            </div>

            {/* Bottom score panel: segmented bar (never a ring/smooth fill, per design system) */}
            <div
              ref={scorePanelRef}
              className="absolute"
              style={{ left: "14px", right: "14px", bottom: "14px", padding: "13px 14px", borderRadius: "14px", background: "rgba(26,26,24,0.72)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(14px)" }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span style={{ fontSize: "9.5px", color: "#C9C5B6", textTransform: "uppercase", letterSpacing: "0.1em" }}>Hook score</span>
                <span className="tnum" style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1, color: "#F4F1E8" }}>
                  {SCORE}
                </span>
              </div>
              <div className="flex items-end gap-1" style={{ height: "14px" }}>
                {Array.from({ length: SEGMENTS }).map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => { segmentRefs.current[i] = el; }}
                    style={{
                      flex: 1,
                      height: "100%",
                      borderRadius: "2px",
                      background: i < FILLED_SEGMENTS ? "var(--accent)" : "rgba(255,255,255,0.14)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .socials-offer-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 24px;
          padding: 8px 14px;
          border-radius: var(--radius-pill);
          background: var(--accent-tint);
          color: var(--accent-text-on-tint);
          border: none;
          cursor: pointer;
          transition: filter 0.15s ease, transform 0.15s ease;
        }
        .socials-offer-pill:hover {
          filter: brightness(0.97);
          transform: translateY(-1px);
        }
        .socials-offer-pill:active {
          transform: translateY(0);
        }
        .socials-offer-lead {
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: -0.005em;
          white-space: nowrap;
        }
        .socials-offer-sep {
          width: 1px;
          height: 12px;
          background: currentColor;
          opacity: 0.3;
        }
        .socials-offer-sub {
          font-size: 12px;
          opacity: 0.85;
          white-space: nowrap;
        }
        .socials-offer-arrow {
          transition: transform 0.2s ease;
        }
        .socials-offer-pill:hover .socials-offer-arrow {
          transform: translateX(3px);
        }
      `}</style>
    </section>
  );
}
