"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DIVISIONS } from "@/lib/divisions";

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55;
}

export default function Divisions() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section id="divisions" className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-28" />

      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-5"
        >
          <span className="section-label">Divisions</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          11 industries. Deeply specialized.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 max-w-xl mx-auto mb-16 text-base"
          style={{ lineHeight: "1.7" }}
        >
          Each division is a vertical-specific agent stack trained on the language, workflows, and expectations of that industry. Generic ops AI doesn't understand your domain. Ours does.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {DIVISIONS.map((div, i) => {
            const isHovered = hoveredSlug === div.slug;
            const light = isLightColor(div.color);
            const fg = isHovered ? (light ? "#0f172a" : "#ffffff") : "#ffffff";
            const fgMuted = isHovered
              ? light ? "rgba(15,23,42,0.68)" : "rgba(255,255,255,0.78)"
              : "#475569";
            const fgDim = isHovered
              ? light ? "rgba(15,23,42,0.5)" : "rgba(255,255,255,0.55)"
              : "#334155";
            const dividerColor = isHovered
              ? light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.18)"
              : "rgba(255,255,255,0.06)";
            const checkColor = isHovered
              ? light ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.65)"
              : div.color;

            return (
              <motion.div
                key={div.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
              >
                <Link
                  href={`/divisions/${div.slug}`}
                  className="p-5 flex flex-col gap-3 h-full cursor-pointer"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    borderRadius: "12px",
                    border: isHovered
                      ? `1px solid ${div.color}`
                      : "1px solid rgba(255,255,255,0.07)",
                    background: isHovered ? div.color : "#0d0d14",
                    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                    boxShadow: isHovered
                      ? `0 24px 60px ${div.color}55, 0 8px 24px ${div.color}30`
                      : "none",
                    transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={() => setHoveredSlug(div.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                >
                  {/* Header row: dot + name + arrow */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="relative flex h-1.5 w-1.5 shrink-0"
                        style={{ transition: "all 0.28s ease" }}
                      >
                        {!isHovered && (
                          <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40"
                            style={{ background: div.color }}
                          />
                        )}
                        <span
                          className="relative inline-flex rounded-full h-1.5 w-1.5"
                          style={{
                            background: isHovered ? (light ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.6)") : div.color,
                            transition: "background 0.28s ease",
                          }}
                        />
                      </span>
                      <span
                        className="font-mono text-xs font-medium"
                        style={{
                          color: isHovered ? fg : div.color,
                          transition: "color 0.28s ease",
                        }}
                      >
                        {div.name}
                      </span>
                    </div>

                    {/* Arrow — animated on hover */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: isHovered
                          ? light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.2)"
                          : "transparent",
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateX(0) scale(1)" : "translateX(-8px) scale(0.7)",
                        transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path
                          d="M2 5.5h7M6 2.5L9 5.5 6 8.5"
                          stroke={isHovered ? (light ? "#0f172a" : "white") : div.color}
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p
                    className="text-xs"
                    style={{
                      color: fgMuted,
                      lineHeight: "1.6",
                      transition: "color 0.28s ease",
                    }}
                  >
                    {div.tagline}
                  </p>

                  {/* Capabilities */}
                  <ul
                    className="flex flex-col gap-2 mt-auto pt-3"
                    style={{
                      borderTop: `1px solid ${dividerColor}`,
                      transition: "border-color 0.28s ease",
                    }}
                  >
                    {div.services.items.slice(0, 3).map((svc) => (
                      <li key={svc.title} className="flex items-start gap-2">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="mt-0.5 shrink-0">
                          <path
                            d="M1.5 5.5l2.5 2.5 5.5-5"
                            stroke={checkColor}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ transition: "stroke 0.28s ease" }}
                          />
                        </svg>
                        <span
                          className="text-xs"
                          style={{
                            color: fgDim,
                            lineHeight: "1.5",
                            transition: "color 0.28s ease",
                          }}
                        >
                          {svc.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.03) 100%)",
            border: "1px solid rgba(99,102,241,0.22)",
          }}
        >
          <div className="flex items-start gap-3.5">
            <div className="mt-1 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">
                All 11 divisions are now accepting clients.
              </p>
              <p className="text-sm text-slate-500">Two-week free trial. No credit card required to start.</p>
            </div>
          </div>
          <button
            onClick={() => document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary btn-sm shrink-0"
          >
            See plans
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
