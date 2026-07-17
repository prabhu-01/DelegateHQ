"use client";

import { useLayoutEffect, useRef } from "react";
import { SOCIALS_VIDEOS } from "./videos";
import { ensureGsap, MQ } from "./anim/gsapSetup";

// The page's one horizontal pan/marquee: on desktop the wall pins and the real clip
// track slides horizontally as the user scrolls vertically (canonical GSAP horizontal-pan
// pattern). On mobile and under reduced motion it becomes an ordinary swipeable,
// scroll-snapped strip, never a scroll-hijack, so touch scrolling always stays predictable.
export default function VideoCarousel() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Nine simultaneously decoding/looping videos is real, continuous CPU/GPU cost that
  // makes scroll feel laggy regardless of the pan animation itself. Only play the clips
  // actually near the viewport; pause the rest.
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
      { root: null, rootMargin: "300px", threshold: 0.01 }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const gsap = ensureGsap();
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({ desktop: MQ.desktop, reduced: MQ.reduced }, (context) => {
        const { desktop, reduced } = context.conditions as { desktop: boolean; reduced: boolean };
        if (!desktop || reduced) return;

        const distance = () => Math.max(0, track.scrollWidth - wrap.clientWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative overflow-hidden" style={{ background: "#050508" }}>
      {/* Edge fades so cards emerge from a soft boundary instead of a hard cut */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden lg:block"
        style={{ width: "8%", background: "linear-gradient(90deg, #050508 0%, transparent 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden lg:block"
        style={{ width: "8%", background: "linear-gradient(270deg, #050508 0%, transparent 100%)" }}
      />

      <div
        ref={trackRef}
        className="socials-wall-track flex gap-5 lg:gap-6 py-16 lg:py-28 px-6"
        style={{ width: "max-content" }}
      >
        {SOCIALS_VIDEOS.map((src, i) => (
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
        /* Mobile / reduced-motion fallback: an ordinary swipeable, snap-scrolled strip. */
        @media (max-width: 1023px) {
          .socials-wall-track {
            overflow-x: auto;
            scroll-snap-type: x proximity;
            -webkit-overflow-scrolling: touch;
            width: 100%;
          }
          .socials-wall-card {
            scroll-snap-align: start;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .socials-wall-track {
            overflow-x: auto;
            scroll-snap-type: x proximity;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
