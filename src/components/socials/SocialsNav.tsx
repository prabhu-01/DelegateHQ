"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ensureGsap, ScrollTrigger } from "./anim/gsapSetup";

// Product-focused floating nav for the "/" landing page.
export default function SocialsNav({ onBookCall }: { onBookCall: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Scroll-position sensor: toggles a class, not React state, and reads GSAP's
  // ScrollTrigger scroll position instead of a raw scroll listener.
  useLayoutEffect(() => {
    ensureGsap();
    const st = ScrollTrigger.create({
      start: 0,
      onUpdate: (self) => {
        const scrolled = self.scroll() > 24;
        pillRef.current?.classList.toggle("socials-nav-scrolled", scrolled);
        headerRef.current?.classList.toggle("socials-nav-scrolled", scrolled);
      },
    });
    return () => st.kill();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    // On sub-pages (e.g. /blog) the section anchors don't exist, go home then scroll.
    if (isHome) {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${id}`;
    }
  };

  const links = [
    { label: "Features", id: "#features" },
    { label: "How it works", id: "#how-it-works" },
  ];

  const navLinkStyle = {
    padding: "6px 12px",
    fontSize: "13.5px",
    fontWeight: 500 as const,
    color: "var(--ink-muted)",
    background: "transparent",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "color 0.15s ease, background 0.15s ease",
    whiteSpace: "nowrap" as const,
    textDecoration: "none",
  };

  return (
    <motion.div
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 left-0 right-0 z-50 flex flex-col items-center gap-2 px-4"
      style={{ pointerEvents: "none" }}
    >
      {/* Nav pill */}
      <div
        ref={pillRef}
        className="socials-nav-pill"
        style={{
          maxWidth: "820px",
          width: "100%",
          borderRadius: "14px",
          pointerEvents: "auto",
        }}
      >
        <header
          ref={headerRef}
          className="socials-nav-header"
          style={{
            borderRadius: "13px",
            height: "52px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "18px",
            paddingRight: "10px",
            gap: "4px",
          }}
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" style={{ textDecoration: "none" }}>
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "8px",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2 10.5V3.5l5 3 5-3v7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-sm" style={{ letterSpacing: "-0.02em", color: "var(--ink-primary)" }}>
              Socials
            </span>
            <span
              className="hidden sm:inline"
              style={{ fontSize: "9.5px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginLeft: "-2px" }}
            >
              by DelegateHQ
            </span>
          </Link>

          <div style={{ width: "1px", height: "16px", background: "var(--edge)", margin: "0 12px" }} />

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.id)}
                style={navLinkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink-primary)"; e.currentTarget.style.background = "var(--canvas)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink-muted)"; e.currentTarget.style.background = "transparent"; }}
              >
                {l.label}
              </button>
            ))}
            <Link
              href="/blog"
              style={{ ...navLinkStyle, display: "inline-flex", alignItems: "center" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink-primary)"; e.currentTarget.style.background = "var(--canvas)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink-muted)"; e.currentTarget.style.background = "transparent"; }}
            >
              Blog
            </Link>
          </nav>

          <div className="flex-1 md:hidden" />

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="hidden md:flex shrink-0 items-center justify-center"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              border: "1px solid var(--edge)",
              background: "transparent",
              color: "var(--ink-muted)",
              marginRight: "8px",
              cursor: "pointer",
            }}
          >
            {mounted && resolvedTheme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* CTA */}
          <div className="hidden md:block shrink-0">
            <button onClick={onBookCall} className="btn-primary btn-sm">
              Book a call
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block h-px w-5 transition-all duration-300 origin-center" style={{ background: "var(--ink-muted)", transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }} />
            <span className="block h-px w-5 transition-all duration-300" style={{ background: "var(--ink-muted)", opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-px w-5 transition-all duration-300 origin-center" style={{ background: "var(--ink-muted)", transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none" }} />
          </button>
        </header>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden w-full"
          style={{
            maxWidth: "820px",
            pointerEvents: "auto",
            borderRadius: "14px",
            background: "var(--surface)",
            border: "1px solid var(--edge)",
            boxShadow: "var(--shadow-lift)",
            padding: "10px",
          }}
        >
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.id)}
              className="w-full text-left px-4 py-3 rounded-xl text-base font-medium"
              style={{ color: "var(--ink-secondary)", background: "transparent", border: "none" }}
            >
              {l.label}
            </button>
          ))}
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium" style={{ color: "var(--ink-secondary)", textDecoration: "none" }}>
            Blog
          </Link>
          <Link href="/agency" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
            Explore the agency
          </Link>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="w-full text-left px-4 py-3 rounded-xl text-base font-medium"
            style={{ color: "var(--ink-secondary)", background: "transparent", border: "none" }}
          >
            {mounted && resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          </button>
          <button onClick={() => { setMenuOpen(false); onBookCall(); }} className="btn-primary w-full justify-center" style={{ marginTop: "6px" }}>
            Book a call
          </button>
        </motion.div>
      )}

      <style jsx>{`
        .socials-nav-pill {
          transition: box-shadow 0.3s ease;
        }
        .socials-nav-pill.socials-nav-scrolled {
          box-shadow: var(--shadow-lift);
        }
        .socials-nav-header {
          background: var(--surface);
          border: 1px solid var(--edge);
          transition: border-color 0.3s ease;
        }
        .socials-nav-header.socials-nav-scrolled {
          border-color: var(--edge-strong);
        }
      `}</style>
    </motion.div>
  );
}
