"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Socials launch: illustrative earnings estimator. ALL figures are illustrative examples
// drawn from public creator-economy benchmarks — never a projection or guarantee. Every
// number carries a "#" marker defined in the footer disclaimer, and an inline disclaimer
// sits directly under the result. No "you will earn" language anywhere.

type Path = "brand" | "ugc" | "offer";

// Illustrative USD benchmarks — edit these constants to adjust the ranges.
const TIERS = [
  { key: "u10k", label: "Under 10k", brand: [50, 150] as [number, number] },
  { key: "mid", label: "10-50k", brand: [150, 500] as [number, number] },
  { key: "big", label: "50-250k", brand: [500, 2000] as [number, number] },
  { key: "mega", label: "250k+", brand: [2000, 10000] as [number, number] },
];
const UGC_PER_VIDEO: [number, number] = [100, 500];
const OFFER_PRICE = 99;

const PATHS: { key: Path; label: string }[] = [
  { key: "brand", label: "Brand deals" },
  { key: "ugc", label: "UGC" },
  { key: "offer", label: "Your own offer" },
];

const VOLUME = {
  brand: { min: 1, max: 8, def: 2, label: "Sponsored Reels / month" },
  ugc: { min: 1, max: 12, def: 4, label: "Brand videos / month" },
  offer: { min: 1, max: 50, def: 10, label: "Sales / month" },
};

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function EarningsEstimator({ onBookCall }: { onBookCall: () => void }) {
  const reduce = useReducedMotion();
  const [path, setPath] = useState<Path>("brand");
  const [tierIdx, setTierIdx] = useState(1);
  const [volume, setVolume] = useState(VOLUME.brand.def);

  const changePath = (p: Path) => {
    setPath(p);
    setVolume(VOLUME[p].def);
  };

  // Compute the illustrative monthly figure(s).
  let low = 0;
  let high = 0;
  let single = false;
  let basis = "";
  if (path === "brand") {
    const [lo, hi] = TIERS[tierIdx].brand;
    low = lo * volume;
    high = hi * volume;
    basis = `Typical sponsored-Reel rates for the ${TIERS[tierIdx].label} tier, at ${volume}/month.`;
  } else if (path === "ugc") {
    low = UGC_PER_VIDEO[0] * volume;
    high = UGC_PER_VIDEO[1] * volume;
    basis = `Typical UGC rates of ${usd(UGC_PER_VIDEO[0])}-${usd(UGC_PER_VIDEO[1])} per brand video, at ${volume}/month.`;
  } else {
    single = true;
    low = OFFER_PRICE * volume;
    high = low;
    basis = `Worked example: ${volume} sales of a ${usd(OFFER_PRICE)} offer. Your offer and price are your own.`;
  }

  const figure = single ? `~${usd(low)}` : `${usd(low)} - ${usd(high)}`;

  const seg = (active: boolean) => ({
    padding: "8px 12px",
    borderRadius: "9px",
    fontSize: "13px",
    fontWeight: 600 as const,
    cursor: "pointer",
    border: "1px solid " + (active ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"),
    background: active ? "rgba(99,102,241,0.14)" : "rgba(255,255,255,0.02)",
    color: active ? "#f1f5f9" : "#94a3b8",
    transition: "all 0.15s ease",
    whiteSpace: "nowrap" as const,
  });

  return (
    <section className="relative py-28 px-6">
      <div className="w-full max-w-6xl mx-auto accent-divider mb-24" />
      <div className="w-full max-w-6xl mx-auto">
        {/* Lead-in: the lifestyle shift */}
        <motion.div {...inView()} className="flex justify-center mb-5">
          <span className="section-label">The upside</span>
        </motion.div>
        <motion.h2
          {...inView(0.06)}
          className="text-center text-white mb-4"
          style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          Turn consistency into income.
        </motion.h2>
        <motion.p {...inView(0.1)} className="text-center text-slate-500 max-w-lg mx-auto mb-9" style={{ fontSize: "16px", lineHeight: 1.7 }}>
          Scored ideas and ready-to-film scripts make it realistic to post like a pro, every week. Here is the kind of upside that consistency can open up.
        </motion.p>

        {/* What changes */}
        <motion.div {...inView(0.14)} className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {[
            "Post consistently, not in bursts",
            "Save ~8 hrs a week#",
            "Compound your growth",
          ].map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
              style={{ fontSize: "12.5px", color: "#94a3b8", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#6366f1" }} />
              {chip}
            </span>
          ))}
        </motion.div>

        {/* Estimator */}
        <motion.div
          {...inView(0.16)}
          className="card-featured overflow-hidden"
          style={{ borderRadius: "18px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.82fr]">
            {/* Controls */}
            <div style={{ padding: "30px 30px 32px" }}>
              <p className="font-mono mb-6" style={{ fontSize: "10.5px", color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Estimate your potential
              </p>

              {/* Income path */}
              <label className="block mb-2.5" style={{ fontSize: "12.5px", color: "#cbd5e1", fontWeight: 500 }}>How you earn</label>
              <div className="flex flex-wrap gap-2 mb-7">
                {PATHS.map((p) => (
                  <button key={p.key} style={seg(path === p.key)} onClick={() => changePath(p.key)}>
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Follower tier (brand only) */}
              <div style={{ minHeight: "72px", marginBottom: "10px" }}>
                {path === "brand" ? (
                  <>
                    <label className="block mb-2.5" style={{ fontSize: "12.5px", color: "#cbd5e1", fontWeight: 500 }}>Your follower tier</label>
                    <div className="flex flex-wrap gap-2">
                      {TIERS.map((t, i) => (
                        <button key={t.key} style={seg(tierIdx === i)} onClick={() => setTierIdx(i)}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <p style={{ fontSize: "12.5px", color: "#64748b", lineHeight: 1.6, paddingTop: "4px" }}>
                    {path === "ugc"
                      ? "UGC rates are set per video and are not tied to your follower count."
                      : "Income here depends entirely on your own offer, price, and audience."}
                  </p>
                )}
              </div>

              {/* Volume */}
              <label className="block mb-3" style={{ fontSize: "12.5px", color: "#cbd5e1", fontWeight: 500 }}>
                {VOLUME[path].label}: <span className="text-white font-semibold">{volume}</span>
              </label>
              <input
                type="range"
                min={VOLUME[path].min}
                max={VOLUME[path].max}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "#6366f1", cursor: "pointer" }}
                aria-label={VOLUME[path].label}
              />
            </div>

            {/* Result */}
            <div
              className="flex flex-col justify-center"
              style={{
                padding: "30px",
                background: "linear-gradient(160deg, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.03) 100%)",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="font-mono mb-2" style={{ fontSize: "10.5px", color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Illustrative monthly potential
              </p>
              <div style={{ minHeight: "52px" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={figure}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="text-white"
                    style={{ fontSize: "clamp(30px, 4.5vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}
                  >
                    {figure}
                    <sup style={{ fontSize: "0.32em", color: "#818cf8", fontWeight: 600, marginLeft: "3px", top: "-1.4em" }}>#</sup>
                  </motion.div>
                </AnimatePresence>
              </div>

              <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.6, marginTop: "10px" }}>
                {basis}
              </p>

              {/* Inline disclaimer — always visible */}
              <p style={{ fontSize: "10.5px", color: "#475569", lineHeight: 1.6, marginTop: "16px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                Illustrative estimate based on public creator-economy benchmarks. Not a prediction or
                guarantee. Socials does not pay creators, and most results vary widely, with many creators
                earning little or nothing.
              </p>

              <button onClick={onBookCall} className="btn-primary justify-center" style={{ width: "100%", marginTop: "18px" }}>
                Book a call
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
