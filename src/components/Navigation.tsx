"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Solutions", href: "#what-we-do" },
  { label: "Divisions", href: "#divisions" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Wordmark */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #5558e8 100%)" }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 6.5L6.5 1.5L11.5 6.5M1.5 6.5L6.5 11.5L11.5 6.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-white text-sm tracking-tight" style={{ letterSpacing: "-0.01em" }}>
              DelegateHQ
            </span>
          </a>

          {/* Center links */}
          <nav className="hidden md:flex items-center">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="px-3.5 py-1.5 text-sm rounded-md transition-colors duration-150 cursor-pointer"
                style={{ color: "#64748b" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo("#pricing")}
              className="btn-primary btn-sm"
            >
              Book a call
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-px w-5 transition-all duration-300 origin-center"
              style={{
                background: "rgba(255,255,255,0.7)",
                transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px w-5 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.7)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-5 transition-all duration-300 origin-center"
              style={{
                background: "rgba(255,255,255,0.7)",
                transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: "rgba(5,5,8,0.97)", backdropFilter: "blur(12px)" }}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)"
            }} />
            <nav className="relative flex flex-col items-center gap-2 w-full max-w-xs px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  onClick={() => scrollTo(link.href)}
                  className="w-full py-3.5 text-center text-lg font-medium rounded-xl cursor-pointer transition-colors duration-150"
                  style={{ color: "#94a3b8", background: "transparent" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#f1f5f9";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#94a3b8";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                className="w-full mt-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
              >
                <button
                  onClick={() => scrollTo("#pricing")}
                  className="btn-primary w-full justify-center"
                  style={{ width: "100%" }}
                >
                  Book a call
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
