"use client";

import Reveal from "./anim/Reveal";

export default function SocialsCTA({ onBookCall }: { onBookCall: () => void }) {
  return (
    <section className="relative py-36 px-6 overflow-hidden">
      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-7">
        <Reveal as="h2" style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.06, color: "var(--ink-primary)" }}>
          Turn your bucket into
          <br />
          a filming schedule.
        </Reveal>
        <Reveal as="p" delay={0.08} className="max-w-md" style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--ink-muted)" }}>
          Access is invite-gated. Book a call, and if your idea is a fit, your first month is free.
          <sup style={{ fontSize: "0.6em", color: "var(--ink-muted)", fontWeight: 600, marginLeft: "1px" }}>#</sup>
        </Reveal>
        <Reveal delay={0.14}>
          <button onClick={onBookCall} className="btn-primary" style={{ padding: "13px 28px", fontSize: "15px" }}>
            Book a call
          </button>
        </Reveal>
      </div>
    </section>
  );
}
