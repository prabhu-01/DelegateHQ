"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DIVISIONS, DivisionData } from "@/lib/divisions";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeDivision, setActiveDivision] = useState<DivisionData>(DIVISIONS[0]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Reset active division to first item after the menu finishes closing
  useEffect(() => {
    if (!megaOpen) {
      const t = setTimeout(() => setActiveDivision(DIVISIONS[0]), 250);
      return () => clearTimeout(t);
    }
  }, [megaOpen]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const scheduleMegaClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const cancelMegaClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scrollTo = (id: string) => {
    setMegaOpen(false);
    setMenuOpen(false);
    if (isHome) {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${id}`;
    }
  };

  const borderGradient = megaOpen
    ? `linear-gradient(135deg, ${activeDivision.color}45 0%, rgba(255,255,255,0.04) 50%, ${activeDivision.color}18 100%)`
    : scrolled
    ? "linear-gradient(135deg, rgba(99,102,241,0.28) 0%, rgba(255,255,255,0.04) 50%, rgba(99,102,241,0.1) 100%)"
    : "rgba(255,255,255,0.07)";

  const navGlow = megaOpen
    ? `0 8px 48px rgba(0,0,0,0.55), 0 0 28px ${activeDivision.color}14`
    : scrolled
    ? "0 8px 40px rgba(0,0,0,0.5)"
    : "0 2px 16px rgba(0,0,0,0.3)";

  const navLinkStyle = {
    padding: "6px 12px",
    fontSize: "13.5px",
    fontWeight: 500 as const,
    color: "#64748b",
    background: "transparent",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "color 0.15s ease, background 0.15s ease",
    whiteSpace: "nowrap" as const,
  };

  return (
    <>
      {/* ── Floating container ── */}
      <motion.div
        ref={containerRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center gap-1.5 px-4"
        style={{ pointerEvents: "none" }}
      >
        {/* ── Gradient-border pill ── */}
        <div
          style={{
            maxWidth: "860px",
            width: "100%",
            padding: "1px",
            borderRadius: "14px",
            background: borderGradient,
            boxShadow: navGlow,
            transition: "background 0.45s ease, box-shadow 0.45s ease",
            pointerEvents: "auto",
          }}
        >
          <header
            style={{
              borderRadius: "13px",
              background: scrolled || megaOpen ? "rgba(6,6,12,0.96)" : "rgba(6,6,12,0.62)",
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              height: "52px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "20px",
              paddingRight: "12px",
              gap: "4px",
              transition: "background 0.3s ease",
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #6366f1 0%, #5558e8 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                  <path d="M1.5 6.5L6.5 1.5L11.5 6.5M1.5 6.5L6.5 11.5L11.5 6.5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-white text-sm hidden sm:block" style={{ letterSpacing: "-0.02em" }}>
                DelegateHQ
              </span>
            </Link>

            {/* Separator */}
            <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.08)", margin: "0 12px", flexShrink: 0 }} />

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-0.5 flex-1">

              {/* Industries — hover trigger */}
              <button
                onMouseEnter={openMega}
                onMouseLeave={scheduleMegaClose}
                style={{
                  ...navLinkStyle,
                  color: megaOpen ? "#f1f5f9" : "#64748b",
                  background: megaOpen ? "rgba(255,255,255,0.05)" : "transparent",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Industries
                <motion.svg
                  width="9" height="9" viewBox="0 0 10 10" fill="none"
                  animate={{ rotate: megaOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ flexShrink: 0 }}
                >
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </button>

              {/* How it works */}
              <button
                onClick={() => scrollTo("#how-it-works")}
                style={navLinkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#f1f5f9"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}
              >
                How it works
              </button>

              {/* Pricing */}
              <button
                onClick={() => scrollTo("#pricing")}
                style={navLinkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#f1f5f9"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}
              >
                Pricing
              </button>
            </nav>

            {/* Spacer on mobile */}
            <div className="flex-1 md:hidden" />

            {/* CTA */}
            <div className="hidden md:block ml-auto shrink-0">
              <button onClick={() => scrollTo("#cta")} className="btn-primary btn-sm">
                Book a call
              </button>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] p-2 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="block h-px w-5 transition-all duration-300 origin-center" style={{ background: "rgba(255,255,255,0.7)", transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }} />
              <span className="block h-px w-5 transition-all duration-300" style={{ background: "rgba(255,255,255,0.7)", opacity: menuOpen ? 0 : 1 }} />
              <span className="block h-px w-5 transition-all duration-300 origin-center" style={{ background: "rgba(255,255,255,0.7)", transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none" }} />
            </button>
          </header>
        </div>

        {/* ── Mega menu ── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.985 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex"
              onMouseEnter={cancelMegaClose}
              onMouseLeave={scheduleMegaClose}
              style={{
                maxWidth: "860px",
                width: "100%",
                borderRadius: "14px",
                overflow: "hidden",
                background: "rgba(7,7,13,0.98)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(28px)",
                boxShadow: `0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px ${activeDivision.color}12`,
                transition: "box-shadow 0.4s ease",
                pointerEvents: "auto",
              }}
            >
              {/* LEFT: division list — no dots, left accent only */}
              <div
                style={{
                  width: "200px",
                  flexShrink: 0,
                  borderRight: "1px solid rgba(255,255,255,0.05)",
                  padding: "16px 10px",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontFamily: "monospace",
                    color: "#334155",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginBottom: "10px",
                    paddingLeft: "10px",
                  }}
                >
                  Industries
                </p>
                {DIVISIONS.map((div) => {
                  const active = activeDivision.slug === div.slug;
                  return (
                    <Link
                      key={div.slug}
                      href={`/divisions/${div.slug}`}
                      onClick={() => setMegaOpen(false)}
                      onMouseEnter={() => setActiveDivision(div)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "6px 10px",
                        borderRadius: "7px",
                        borderLeft: `2px solid ${active ? div.color : "transparent"}`,
                        background: active ? `${div.color}0e` : "transparent",
                        color: active ? "#e2e8f0" : "#64748b",
                        textDecoration: "none",
                        fontSize: "13px",
                        fontWeight: active ? 600 : 400,
                        letterSpacing: "-0.01em",
                        transition: "all 0.12s ease",
                        marginBottom: "1px",
                      }}
                    >
                      {div.name}
                    </Link>
                  );
                })}
              </div>

              {/* RIGHT: live preview */}
              <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                {/* Per-division ambient tint */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse 80% 80% at 100% 0%, ${activeDivision.color}12 0%, transparent 65%)`,
                    transition: "background 0.4s ease",
                    pointerEvents: "none",
                  }}
                />

                {/* Animated preview content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDivision.slug}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    style={{ position: "relative", padding: "28px 32px", height: "100%", display: "flex", flexDirection: "column" }}
                  >
                    {/* Eyebrow */}
                    <p
                      style={{
                        fontSize: "11px",
                        fontFamily: "monospace",
                        color: activeDivision.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        fontWeight: 600,
                        marginBottom: "10px",
                      }}
                    >
                      {activeDivision.name} Division
                    </p>

                    {/* Headline */}
                    <h3
                      style={{
                        fontSize: "23px",
                        fontWeight: 800,
                        color: "white",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.15,
                        marginBottom: "10px",
                      }}
                    >
                      {activeDivision.hero.line1}
                      <br />
                      <span style={{ color: activeDivision.color }}>{activeDivision.hero.line2}</span>
                    </h3>

                    {/* Tagline */}
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#64748b",
                        lineHeight: 1.65,
                        maxWidth: "320px",
                        marginBottom: "22px",
                      }}
                    >
                      {activeDivision.tagline}
                    </p>

                    {/* Metrics */}
                    <div
                      style={{
                        display: "flex",
                        gap: "0",
                        paddingTop: "18px",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        marginBottom: "22px",
                      }}
                    >
                      {activeDivision.hero.metrics.map((m, i) => (
                        <div
                          key={m.label}
                          style={{
                            flex: 1,
                            paddingRight: "20px",
                            borderRight: i < activeDivision.hero.metrics.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                            marginRight: i < activeDivision.hero.metrics.length - 1 ? "20px" : "0",
                          }}
                        >
                          <div style={{ fontSize: "20px", fontWeight: 700, color: "white", letterSpacing: "-0.03em", lineHeight: 1 }}>
                            {m.value}
                          </div>
                          <div style={{ fontSize: "9.5px", color: "#475569", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "5px" }}>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer CTA */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "auto" }}>
                      <Link
                        href={`/divisions/${activeDivision.slug}`}
                        onClick={() => setMegaOpen(false)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "7px",
                          padding: "8px 18px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "white",
                          background: activeDivision.color,
                          textDecoration: "none",
                          flexShrink: 0,
                          transition: "opacity 0.15s",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                      >
                        Explore division
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M2 5.5h7M6 2.5l3 3-3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>

                      <span style={{ fontSize: "12px", color: "#475569" }}>
                        from{" "}
                        <span style={{ color: "#64748b", fontWeight: 600, fontFamily: "monospace" }}>
                          ₹{activeDivision.pricing.tiers[0].price.monthly / 1000}k/mo
                        </span>
                      </span>

                      <div
                        style={{
                          marginLeft: "auto",
                          fontFamily: "monospace",
                          fontSize: "10px",
                          color: "#34d399",
                          background: "rgba(16,185,129,0.08)",
                          border: "1px solid rgba(16,185,129,0.16)",
                          padding: "4px 8px",
                          borderRadius: "5px",
                        }}
                      >
                        2-wk free trial
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 overflow-y-auto"
            style={{ background: "rgba(5,5,9,0.98)", backdropFilter: "blur(20px)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)" }}
            />

            <div className="relative flex flex-col max-w-sm mx-auto px-6 pt-24 pb-16 gap-8">
              {/* Scroll links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="flex flex-col gap-0.5"
              >
                {[
                  { label: "How it works", id: "#how-it-works" },
                  { label: "Pricing", id: "#pricing" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollTo(item.id)}
                    className="w-full text-left px-4 py-3 rounded-xl text-base font-medium cursor-pointer transition-all duration-150"
                    style={{ color: "#64748b", background: "transparent", border: "none" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#f1f5f9"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

              {/* Division list */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="font-mono text-xs uppercase tracking-widest mb-3 px-1" style={{ color: "#334155" }}>
                  Industries
                </p>
                <div className="flex flex-col gap-0.5">
                  {DIVISIONS.map((div, i) => (
                    <motion.div
                      key={div.slug}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.025 }}
                    >
                      <Link
                        href={`/divisions/${div.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 py-2.5 rounded-xl transition-all duration-150"
                        style={{
                          textDecoration: "none",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                          borderLeft: "2px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${div.color}0e`;
                          (e.currentTarget as HTMLElement).style.borderLeftColor = div.color;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                        }}
                      >
                        <div>
                          <p className="text-sm font-medium" style={{ color: "#94a3b8", letterSpacing: "-0.01em" }}>
                            {div.name}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "#334155" }}>
                            {div.tagline.replace(/^For /, "")}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
              >
                <button onClick={() => scrollTo("#cta")} className="btn-primary w-full justify-center">
                  Book a call
                </button>
                <p className="text-center text-xs mt-3" style={{ color: "#334155" }}>
                  2-week free trial · No credit card required
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
