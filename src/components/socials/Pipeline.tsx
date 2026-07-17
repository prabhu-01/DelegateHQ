"use client";

import { useLayoutEffect, useRef } from "react";
import Reveal from "./anim/Reveal";
import { ensureGsap, MQ } from "./anim/gsapSetup";

// "How an idea becomes a Reel" — the 5-step pipeline from the product spec.
const STEPS = [
  { k: "01", title: "Curated", body: "Your curation feed drops fresh, pre-scored ideas into your bucket." },
  { k: "02", title: "Judged", body: "Keep the strong ones, delete the weak ones on sight. Nothing is erased." },
  { k: "03", title: "Scripted", body: "One click drafts a full script, then Aria refines the hook and beats." },
  { k: "04", title: "Filmed", body: "You shoot it. Reel Audit scores your take back against the script." },
  { k: "05", title: "Extended", body: "Turn the winner into a long-form blog post and publish it." },
];

export default function Pipeline() {
  const gridRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  // Connector line + badge highlight play once when the row enters view, rather than
  // continuously tracking scroll position: a fixed one-shot tween is far cheaper than a
  // scrub that recalculates on every scroll tick, with no visible difference here since
  // the whole row is on screen together anyway.
  useLayoutEffect(() => {
    const gsap = ensureGsap();
    const grid = gridRef.current;
    const fill = fillRef.current;
    if (!grid || !fill) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MQ.reduced, (context) => {
        const badges = gsap.utils.toArray<HTMLElement>(".pipeline-badge", grid);
        const lit = { borderColor: "rgba(99,102,241,0.75)", backgroundColor: "rgba(99,102,241,0.14)" };

        if (context.matches) {
          gsap.set(fill, { scaleX: 1 });
          badges.forEach((b) => gsap.set(b, lit));
          return;
        }

        gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
        badges.forEach((b) => gsap.set(b, { borderColor: "rgba(99,102,241,0.18)", backgroundColor: "rgba(99,102,241,0.03)" }));

        const tl = gsap.timeline({
          scrollTrigger: { trigger: grid, start: "top 75%", once: true },
        });
        tl.to(fill, { scaleX: 1, duration: 1, ease: "power2.out" }, 0);
        badges.forEach((b, i) => {
          tl.to(b, { ...lit, duration: 0.3 }, i * 0.12);
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-24" />
      <div className="w-full max-w-6xl mx-auto">
        <Reveal as="h2" className="text-center text-white mb-16" direction="up">
          <span style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, display: "block" }}>
            Five steps. One finished Reel.
          </span>
        </Reveal>

        <div ref={gridRef} className="relative grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-4">
          {/* Connecting line on desktop: track + scrubbed fill */}
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{ top: "22px", left: "10%", right: "10%", height: "1px", background: "rgba(255,255,255,0.08)" }}
          />
          <div
            ref={fillRef}
            className="hidden md:block absolute pointer-events-none"
            style={{ top: "22px", left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, #6366f1, #a5b4fc)" }}
          />

          {STEPS.map((s, i) => (
            <Reveal key={s.k} as="div" index={i} className="relative flex flex-col items-start md:items-center md:text-center">
              <div
                className="pipeline-badge relative z-10 flex items-center justify-center shrink-0 mb-5"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "13px",
                  background: "rgba(99,102,241,0.06)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  transition: "border-color 0.3s ease, background-color 0.3s ease",
                }}
              >
                <span className="font-mono font-bold" style={{ fontSize: "14px", color: "#818cf8" }}>{s.k}</span>
              </div>
              <h3 className="text-white mb-2" style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.01em" }}>
                {s.title}
              </h3>
              <p className="text-slate-500" style={{ fontSize: "13.5px", lineHeight: 1.65, maxWidth: "220px" }}>
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
