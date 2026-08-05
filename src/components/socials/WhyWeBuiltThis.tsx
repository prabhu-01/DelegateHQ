"use client";

import Reveal from "./anim/Reveal";

// Small, honest founder note. Two sentences, our own voice, no third-party
// validation implied — see the "Do not add" list in the brief this came from
// (no fake testimonials, counts, pricing tiers, or launch badges).
export default function WhyWeBuiltThis() {
  return (
    <section className="relative py-16 px-6">
      <div className="w-full max-w-2xl mx-auto text-center">
        <Reveal className="flex justify-center mb-4">
          <span className="section-label">Why we built this</span>
        </Reveal>
        <Reveal delay={0.06}>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--ink-secondary)" }}>
            Built by two creators who got tired of staring at a blank content calendar,
            one technical, one home &amp; travel. We&apos;re using it on our own content
            before opening it up.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
