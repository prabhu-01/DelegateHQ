"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DIVISIONS } from "@/lib/divisions";

export default function Footer() {
  const pathname = usePathname();
  // SOCIALS-LAUNCH: agency home moved to /agency (was "/")
  const isHome = pathname === "/agency";

  const scrollTo = (href: string) => {
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <footer className="relative px-6 pt-16 pb-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand */}
          <div className="md:col-span-4 flex flex-col gap-5">
            {/* SOCIALS-LAUNCH: logo points to /agency (was "/") */}
            <Link href="/agency" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1 0%, #5558e8 100%)" }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1.5 6.5L6.5 1.5L11.5 6.5M1.5 6.5L6.5 11.5L11.5 6.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-white text-sm" style={{ letterSpacing: "-0.01em" }}>DelegateHQ</span>
            </Link>
            <p className="text-sm text-slate-600 max-w-xs" style={{ lineHeight: "1.75" }}>
              AI operations agency deploying vertically specialized agent teams across 11 industries. Everything, handled.
            </p>
            <p className="font-mono text-xs" style={{ color: "#1e293b" }}>
              © 2025 DelegateHQ. All rights reserved.
            </p>
          </div>

          {/* Divisions */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <h4 className="font-mono text-xs uppercase tracking-widest" style={{ color: "#334155" }}>Divisions</h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {DIVISIONS.map((div) => (
                <Link
                  key={div.slug}
                  href={`/divisions/${div.slug}`}
                  className="flex items-center gap-2 text-sm transition-colors duration-150"
                  style={{ color: "#475569" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: div.color }} />
                  {div.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h4 className="font-mono text-xs uppercase tracking-widest" style={{ color: "#334155" }}>Company</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "How It Works", href: "#how-it-works" },
                // SOCIALS-LAUNCH: pricing hidden — restore { label: "Pricing", href: "#pricing" } to revert
                { label: "Proof of Work", href: "#proof" },
                { label: "Book a Call", href: "#cta" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-colors duration-150 cursor-pointer"
                    style={{ color: "#475569", background: "transparent", border: "none", padding: 0 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="text-sm transition-colors duration-150"
                  style={{ color: "#475569" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="font-mono text-xs" style={{ color: "#1e293b" }}>Everything, handled.</p>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs" style={{ color: "#1e293b" }}>11 Industry Divisions — Open</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
