"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Drives Lenis off gsap.ticker and feeds every scroll tick into ScrollTrigger, so
// GSAP-scrubbed animations (pinning, horizontal pans, counters) stay in perfect
// lockstep with the smooth-scroll instead of drifting a frame behind.
export default function LenisWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: reduceMotion ? 0.1 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduceMotion,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Named reference so cleanup removes the exact same callback it added.
    // gsap.ticker.remove() no-ops on a different (even identical-looking) function.
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return <>{children}</>;
}
