"use client";

import { useLayoutEffect, useRef } from "react";
import { SOCIALS_VIDEOS } from "./videos";

// A single continuous, GPU-compositable CSS marquee (transform: translateX only),
// never tied to page scroll. This is the page's one auto-sliding band of clips, always
// moving at a steady pace, never pausing (including on hover). Deliberately not GSAP or
// scroll-linked: a plain CSS animation is close to the cheapest possible way to move
// content, which keeps this section light regardless of what else is happening on the
// page. Uniform behavior across every device, no per-breakpoint branching needed.
const LOOP = [...SOCIALS_VIDEOS, ...SOCIALS_VIDEOS];

export default function VideoCarousel() {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Many simultaneously decoding/looping videos is real, continuous CPU/GPU cost. Only
  // play the clips actually near the viewport; pause the rest as they slide out of range.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { root: null, rootMargin: "80px", threshold: 0.01 }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={wrapRef} className="relative overflow-hidden py-16 lg:py-28" style={{ background: "#050508" }}>
      {/* Edge fades so cards emerge from a soft boundary instead of a hard cut */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden lg:block"
        style={{ width: "8%", background: "linear-gradient(90deg, #050508 0%, transparent 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden lg:block"
        style={{ width: "8%", background: "linear-gradient(270deg, #050508 0%, transparent 100%)" }}
      />

      <div className="socials-wall-track flex gap-5 lg:gap-6 px-6" style={{ width: "max-content" }}>
        {LOOP.map((src, i) => (
          <div
            key={src + i}
            className="relative shrink-0 overflow-hidden socials-wall-card"
            style={{
              width: "150px",
              aspectRatio: "9 / 16",
              borderRadius: "18px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "#0d0d14",
              boxShadow: "0 16px 36px rgba(0,0,0,0.45)",
            }}
          >
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              src={src}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ borderRadius: "inherit" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)", borderRadius: "18px" }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .socials-wall-card {
          width: 150px;
        }
        @media (min-width: 1024px) {
          .socials-wall-card {
            width: 240px;
          }
        }
        .socials-wall-track {
          animation: socials-wall-slide 40s linear infinite;
          will-change: transform;
        }
        @keyframes socials-wall-slide {
          from {
            transform: translateX(0);
          }
          to {
            /* The list is duplicated once, so -50% is exactly one full loop, seamless. */
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .socials-wall-track {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
