"use client";

import { SOCIALS_VIDEOS } from "./videos";

// Socials launch: one horizontal auto-sliding band of vertical (9:16) clips — ambient
// "creators in motion" texture. Muted, looping, decorative. Pauses on hover; collapses
// to a static row under prefers-reduced-motion (see globals via the media query below).
export default function VideoCarousel() {
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...SOCIALS_VIDEOS, ...SOCIALS_VIDEOS];

  return (
    <section aria-hidden="true" className="relative py-4 overflow-hidden">
      {/* Edge fades so cards slide in/out of a soft boundary instead of a hard cut */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10"
        style={{ width: "12%", background: "linear-gradient(90deg, #050508 0%, transparent 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10"
        style={{ width: "12%", background: "linear-gradient(270deg, #050508 0%, transparent 100%)" }}
      />

      <div className="socials-marquee flex gap-4 w-max">
        {loop.map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 overflow-hidden"
            style={{
              width: "150px",
              aspectRatio: "9 / 16",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "#0d0d14",
              boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
            }}
          >
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ borderRadius: "inherit" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)", borderRadius: "16px" }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .socials-marquee {
          animation: socials-marquee-slide 32s linear infinite;
        }
        .socials-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes socials-marquee-slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .socials-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
