"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

// Registers GSAP plugins exactly once across the whole Socials landing.
export function ensureGsap() {
  if (registered || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
  return gsap;
}

// Breakpoints shared by every section's gsap.matchMedia() call, so desktop/mobile/
// reduced-motion behaviour is defined identically everywhere.
export const MQ = {
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export { gsap, ScrollTrigger };
