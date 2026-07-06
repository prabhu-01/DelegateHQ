"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

// Socials launch: product-focused floating nav for the "/" landing page.
// Slim top bar links across to the DelegateHQ agency (now at /agency).
export default function SocialsNav({ onBookCall }: { onBookCall: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    // On sub-pages (e.g. /blog) the section anchors don't exist — go home, then scroll.
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
    color: "#64748b",
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
      {/* Slim cross-link to the agency */}
      <Link
        href="/agency"
        className="hidden sm:flex items-center gap-2 group"
        style={{
          pointerEvents: "auto",
          fontSize: "11.5px",
          fontFamily: "var(--font-mono), monospace",
          color: "#64748b",
          background: "rgba(6,6,12,0.6)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "999px",
          padding: "5px 14px",
          backdropFilter: "blur(20px)",
          textDecoration: "none",
          transition: "color 0.15s ease, border-color 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#cbd5e1";
          e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#64748b";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        }}
      >
        DelegateHQ also runs done-for-you AI ops across 11 industries
        <span style={{ color: "#818cf8" }}>Explore the agency</span>
        <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
          <path d="M2 5.5h7M6 2.5L9 5.5 6 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* Nav pill */}
      <div
        style={{
          maxWidth: "820px",
          width: "100%",
          padding: "1px",
          borderRadius: "14px",
          background: scrolled
            ? "linear-gradient(135deg, rgba(99,102,241,0.28) 0%, rgba(255,255,255,0.04) 50%, rgba(99,102,241,0.1) 100%)"
            : "rgba(255,255,255,0.07)",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.5)" : "0 2px 16px rgba(0,0,0,0.3)",
          transition: "background 0.45s ease, box-shadow 0.45s ease",
          pointerEvents: "auto",
        }}
      >
        <header
          style={{
            borderRadius: "13px",
            background: scrolled ? "rgba(6,6,12,0.96)" : "rgba(6,6,12,0.62)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
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
                background: "linear-gradient(135deg, #6366f1 0%, #5558e8 100%)",
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
            <span className="font-bold text-white text-sm" style={{ letterSpacing: "-0.02em" }}>
              Socials
            </span>
            <span
              className="hidden sm:inline font-mono"
              style={{ fontSize: "9.5px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginLeft: "-2px" }}
            >
              by DelegateHQ
            </span>
          </Link>

          <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.08)", margin: "0 12px" }} />

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.id)}
                style={navLinkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#f1f5f9"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}
              >
                {l.label}
              </button>
            ))}
            <Link
              href="/blog"
              style={{ ...navLinkStyle, display: "inline-flex", alignItems: "center" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#f1f5f9"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}
            >
              Blog
            </Link>
          </nav>

          <div className="flex-1 md:hidden" />

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
            <span className="block h-px w-5 transition-all duration-300 origin-center" style={{ background: "rgba(255,255,255,0.7)", transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }} />
            <span className="block h-px w-5 transition-all duration-300" style={{ background: "rgba(255,255,255,0.7)", opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-px w-5 transition-all duration-300 origin-center" style={{ background: "rgba(255,255,255,0.7)", transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none" }} />
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
            background: "rgba(7,7,13,0.98)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(28px)",
            padding: "10px",
          }}
        >
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.id)}
              className="w-full text-left px-4 py-3 rounded-xl text-base font-medium"
              style={{ color: "#94a3b8", background: "transparent", border: "none" }}
            >
              {l.label}
            </button>
          ))}
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium" style={{ color: "#94a3b8", textDecoration: "none" }}>
            Blog
          </Link>
          <Link href="/agency" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-mono" style={{ color: "#64748b", textDecoration: "none" }}>
            Explore the agency
          </Link>
          <button onClick={() => { setMenuOpen(false); onBookCall(); }} className="btn-primary w-full justify-center" style={{ marginTop: "6px" }}>
            Book a call
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
