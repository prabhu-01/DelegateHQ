"use client";

import { useLayoutEffect, useRef, ReactNode } from "react";
import { ensureGsap, MQ } from "./gsapSetup";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  /** Index-based stagger convenience: adds index * staggerStep to delay. */
  index?: number;
  staggerStep?: number;
  blur?: boolean;
  /** Fraction of the element that must be visible before it fires (0-1). */
  amount?: number;
}

const OFFSETS: Record<Direction, [number, number]> = {
  up: [0, 28],
  down: [0, -28],
  left: [28, 0],
  right: [-28, 0],
  none: [0, 0],
};

// Standard staggered scroll-reveal used by every Socials section: opacity + translate
// (+ optional blur) driven by a single ScrollTrigger per element, once. Honors
// prefers-reduced-motion by skipping straight to the visible end state.
export default function Reveal({
  children,
  className,
  style,
  as = "div",
  direction = "up",
  distance,
  duration = 0.8,
  delay = 0,
  index = 0,
  staggerStep = 0.08,
  blur = true,
  amount = 0.2,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as React.ElementType;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();

    const [ox, oy] = OFFSETS[direction];
    const dist = distance ?? 1;
    const totalDelay = delay + index * staggerStep;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MQ.reduced, () => {
        gsap.set(el, { opacity: 1, x: 0, y: 0, filter: "blur(0px)" });
      });

      mm.add(`not ${MQ.reduced}`, () => {
        gsap.set(el, {
          opacity: 0,
          x: ox * dist,
          y: oy * dist,
          filter: blur ? "blur(10px)" : "blur(0px)",
        });

        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          duration,
          delay: totalDelay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: `top ${100 - amount * 100}%`,
            toggleActions: "play none none none",
            once: true,
          },
        });
      });

      return () => mm.revert();
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={className} style={{ ...style, willChange: "transform, opacity" }}>
      {children}
    </Tag>
  );
}
