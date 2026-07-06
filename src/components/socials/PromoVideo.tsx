"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SOCIALS_PROMO } from "./videos";

// Socials launch: the product demo. A single landscape player with full native controls
// (play/seek/volume/fullscreen). Click-to-play — does not autoplay. Falls back gracefully
// while the real promo file is not yet in /public/videos.
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-white" style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            See the whole studio in action.
          </h2>
          <p className="text-slate-500 mx-auto" style={{ fontSize: "16px", lineHeight: 1.7, maxWidth: "520px", marginTop: "14px" }}>
            One walkthrough, from a curated idea to a scripted, refined, ready-to-film Reel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden"
          style={{
            aspectRatio: "16 / 9",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0b0b12",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
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
            style={{ objectFit: "contain", background: "#0b0b12", opacity: started && !missing ? 1 : 0 }}
          />

          {/* Poster / play overlay (hidden once playing) */}
          {(!started || missing) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 70% 70% at 50% 45%, rgba(99,102,241,0.14) 0%, transparent 70%)" }}
              />
              {!missing ? (
                <button
                  onClick={play}
                  aria-label="Play demo video"
                  className="relative flex items-center justify-center group"
                  style={{
                    width: "76px",
                    height: "76px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366f1 0%, #5558e8 100%)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 12px 40px rgba(99,102,241,0.45)",
                    cursor: "pointer",
                  }}
                >
                  <span
                    className="absolute rounded-full animate-ping"
                    style={{ inset: 0, background: "rgba(99,102,241,0.35)", opacity: 0.5 }}
                  />
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" style={{ marginLeft: "4px" }}>
                    <path d="M7 4.5v17L21 13 7 4.5z" fill="white" />
                  </svg>
                </button>
              ) : (
                <div className="relative flex flex-col items-center gap-2 text-center px-6">
                  <span className="font-mono" style={{ fontSize: "11px", color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                    Coming soon
                  </span>
                  <p className="text-slate-300" style={{ fontSize: "15px", fontWeight: 600 }}>
                    The full walkthrough is being finalized.
                  </p>
                  <p className="text-slate-600" style={{ fontSize: "13px" }}>
                    Book a call and we will screen-share it live.
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
