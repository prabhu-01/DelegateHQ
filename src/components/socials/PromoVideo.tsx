"use client";

import { useEffect, useState } from "react";
import Reveal from "./anim/Reveal";

// Screenshot slider standing in for the demo video. Real workspace screenshots,
// not mockups, at public/1.png .. 5.png.
// The video player below is disabled for now; see the commented block at the
// bottom of this file to bring it back once the real promo file exists.
const SCREENSHOTS = [
  { src: "/1.png", label: "Idea Bucket" },
  { src: "/2.png", label: "Scored idea" },
  { src: "/3.png", label: "Script generation" },
  { src: "/4.png", label: "Aria chat" },
  { src: "/5.png", label: "Reel Audit" },
];
const AUTOPLAY_MS = 3500;

export default function PromoVideo() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = () => setIndex((i) => (i === 0 ? SCREENSHOTS.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === SCREENSHOTS.length - 1 ? 0 : i + 1));

  // Advances on its own; pauses while the user is interacting (hover/focus) so it
  // doesn't fight manual navigation.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i === SCREENSHOTS.length - 1 ? 0 : i + 1));
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

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
          <div
            className="absolute inset-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SCREENSHOTS[index].src}
            alt={SCREENSHOTS[index].label}
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: "contain", background: "var(--surface)" }}
          />

          <span
            className="absolute"
            style={{
              left: "16px",
              top: "16px",
              padding: "5px 10px",
              borderRadius: "999px",
              background: "rgba(26,26,24,0.65)",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(10px)",
              fontSize: "11px",
              color: "#E8E5D8",
              letterSpacing: "0.02em",
            }}
          >
            {SCREENSHOTS[index].label}
          </span>

          <button
            onClick={prev}
            aria-label="Previous screenshot"
            className="absolute flex items-center justify-center"
            style={{
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--surface)",
              border: "1px solid var(--edge)",
              cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 3.5 5.5 9l5.5 5.5" stroke="var(--ink-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next screenshot"
            className="absolute flex items-center justify-center"
            style={{
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--surface)",
              border: "1px solid var(--edge)",
              cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 3.5 12.5 9 7 14.5" stroke="var(--ink-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="absolute flex items-center justify-center gap-2"
            style={{ left: "50%", bottom: "16px", transform: "translateX(-50%)" }}
          >
            {SCREENSHOTS.map((shot, i) => (
              <button
                key={shot.src}
                onClick={() => setIndex(i)}
                aria-label={`Go to ${shot.label}`}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  background: i === index ? "var(--accent)" : "var(--edge-strong)",
                }}
              />
            ))}
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// --- Disabled: original video player (re-enable once the real promo file lands) ---
//
// "use client";
//
// import { useRef, useState } from "react";
// import Reveal from "./anim/Reveal";
// import { SOCIALS_PROMO } from "./videos";
//
// // The product demo. A single landscape player with full native controls (play/seek/
// // volume/fullscreen). Click-to-play, does not autoplay. Falls back gracefully while the
// // real promo file is not yet in /public/videos.
// export default function PromoVideo() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [started, setStarted] = useState(false);
//   const [missing, setMissing] = useState(false);
//
//   const play = () => {
//     const v = videoRef.current;
//     if (!v) return;
//     setStarted(true);
//     v.play().catch(() => setMissing(true));
//   };
//
//   return (
//     <section id="demo" className="relative py-28 px-6">
//       <div className="w-full max-w-6xl mx-auto accent-divider mb-24" />
//       <div className="w-full max-w-4xl mx-auto">
//         <Reveal className="text-center mb-12">
//           <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--ink-primary)" }}>
//             Watch the whole flow, start to finish.
//           </h2>
//           <p className="mx-auto" style={{ fontSize: "16px", lineHeight: 1.7, maxWidth: "520px", marginTop: "14px", color: "var(--ink-muted)" }}>
//             One idea, scored, scripted, and refined, in a single walkthrough.
//           </p>
//         </Reveal>
//
//         <Reveal
//           direction="up"
//           delay={0.1}
//           className="relative overflow-hidden"
//           style={{
//             aspectRatio: "16 / 9",
//             borderRadius: "var(--radius-card)",
//             border: "1px solid var(--edge)",
//             background: "var(--surface)",
//             boxShadow: "var(--shadow-lift)",
//           }}
//         >
//           <video
//             ref={videoRef}
//             src={SOCIALS_PROMO}
//             controls={started && !missing}
//             playsInline
//             preload="none"
//             onError={() => setMissing(true)}
//             className="absolute inset-0 h-full w-full"
//             style={{ objectFit: "contain", background: "var(--surface)", opacity: started && !missing ? 1 : 0 }}
//           />
//
//           {/* Poster / play overlay (hidden once playing) */}
//           {(!started || missing) && (
//             <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
//               {!missing ? (
//                 <button
//                   onClick={play}
//                   aria-label="Play demo video"
//                   className="relative flex items-center justify-center group"
//                   style={{
//                     width: "76px",
//                     height: "76px",
//                     borderRadius: "50%",
//                     background: "var(--accent)",
//                     border: "none",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <svg width="26" height="26" viewBox="0 0 26 26" fill="none" style={{ marginLeft: "4px" }}>
//                     <path d="M7 4.5v17L21 13 7 4.5z" fill="white" />
//                   </svg>
//                 </button>
//               ) : (
//                 <div className="relative flex flex-col items-center gap-2 text-center px-6">
//                   <span style={{ fontSize: "11px", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
//                     Coming soon
//                   </span>
//                   <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--ink-secondary)" }}>
//                     The full walkthrough is being finalized.
//                   </p>
//                   <p style={{ fontSize: "13px", color: "var(--ink-muted)" }}>
//                     Book a call and we will screen-share it live.
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </Reveal>
//       </div>
//     </section>
//   );
// }
