"use client";

import { useRef, useState } from "react";
import Reveal from "./anim/Reveal";
import { SOCIALS_PROMO } from "./videos";

// The product demo. A single landscape player with full native controls (play/seek/
// volume/fullscreen). Click-to-play, does not autoplay. Falls back gracefully while the
// real promo file is not yet in /public/videos.
export default function PromoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [missing, setMissing] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => setMissing(true));
  };

  return (
    <section id="demo" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-24" />
      <div className="w-full max-w-4xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--ink-primary)" }}>
            Watch the whole flow, start to finish.
          </h2>
          <p className="mx-auto" style={{ fontSize: "16px", lineHeight: 1.7, maxWidth: "520px", marginTop: "14px", color: "var(--ink-muted)" }}>
            One idea, scored, scripted, and refined, in a single walkthrough.
          </p>
        </Reveal>

        <Reveal
          direction="up"
          delay={0.1}
          className="relative overflow-hidden"
          style={{
            aspectRatio: "16 / 9",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--edge)",
            background: "var(--surface)",
            boxShadow: "var(--shadow-lift)",
          }}
        >
          <video
            ref={videoRef}
            src={SOCIALS_PROMO}
            controls={started && !missing}
            playsInline
            preload="none"
            onError={() => setMissing(true)}
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: "contain", background: "var(--surface)", opacity: started && !missing ? 1 : 0 }}
          />

          {/* Poster / play overlay (hidden once playing) */}
          {(!started || missing) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              {!missing ? (
                <button
                  onClick={play}
                  aria-label="Play demo video"
                  className="relative flex items-center justify-center group"
                  style={{
                    width: "76px",
                    height: "76px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" style={{ marginLeft: "4px" }}>
                    <path d="M7 4.5v17L21 13 7 4.5z" fill="white" />
                  </svg>
                </button>
              ) : (
                <div className="relative flex flex-col items-center gap-2 text-center px-6">
                  <span style={{ fontSize: "11px", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                    Coming soon
                  </span>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--ink-secondary)" }}>
                    The full walkthrough is being finalized.
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--ink-muted)" }}>
                    Book a call and we will screen-share it live.
                  </p>
                </div>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
