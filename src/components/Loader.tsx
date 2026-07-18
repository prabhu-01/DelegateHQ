"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_MESSAGES = [
  "Initializing agents...",
  "Loading divisions...",
  "Preparing interface...",
  "Almost ready...",
];

// Stable default so the preload effect's dependency identity does not change per render.
const NO_ASSETS: string[] = [];

interface LoaderProps {
  onComplete: () => void;
  // Media URLs to warm before the page reveals (e.g. the Socials hero + carousel clips).
  // Preloaded here so nothing pops in when the loader lifts.
  preloadAssets?: string[];
}

export default function Loader({ onComplete, preloadAssets = NO_ASSETS }: LoaderProps) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // The page content underneath is now always mounted (so crawlers see real HTML on
  // first paint), which means it's also scrollable/interactive underneath this
  // full-screen overlay unless explicitly locked while the loader is showing.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  useEffect(() => {
    const startTime = Date.now();
    const MIN_DURATION = 1800;
    const MAX_DURATION = 7000; // hard cap so a slow/broken asset never hangs the loader

    const interval = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < STATUS_MESSAGES.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 550);

    // ── Preload media in the background and track real progress ──
    const total = preloadAssets.length;
    let loadedCount = 0;
    const videoEls: HTMLVideoElement[] = [];
    let resolveAssets: () => void = () => {};
    const assetsReady =
      total === 0
        ? Promise.resolve()
        : new Promise<void>((res) => {
            resolveAssets = res;
          });

    const bump = () => {
      loadedCount += 1;
      setProgress((prev) => Math.max(prev, Math.min(92, Math.round((loadedCount / total) * 92))));
      if (loadedCount >= total) resolveAssets();
    };

    preloadAssets.forEach((src) => {
      const v = document.createElement("video");
      v.muted = true;
      v.preload = "auto";
      // First decoded frame (or an error) is enough to consider the clip warm.
      v.addEventListener("loadeddata", bump, { once: true });
      v.addEventListener("error", bump, { once: true });
      v.src = src;
      v.load();
      videoEls.push(v);
    });

    // Gentle trickle so the bar still moves while we wait on fonts / assets.
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 92 ? prev : prev + Math.random() * 4 + 1));
    }, 160);

    const finish = async () => {
      await Promise.race([
        Promise.all([document.fonts.ready, assetsReady]),
        new Promise((r) => setTimeout(r, MAX_DURATION)),
      ]);
      const elapsed = Date.now() - startTime;
      await new Promise((r) => setTimeout(r, Math.max(0, MIN_DURATION - elapsed)));
      setProgress(100);
      await new Promise((r) => setTimeout(r, 200));
      setVisible(false);
      setTimeout(onComplete, 700);
    };
    finish();

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      // Detach preloaders so they don't keep buffering after unmount.
      videoEls.forEach((v) => {
        v.removeAttribute("src");
        v.load();
      });
    };
  }, [onComplete, preloadAssets]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#050508" }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center gap-8 w-full max-w-xs px-6">
            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-2xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.02em" }}>
                DelegateHQ
              </span>
              <span className="font-mono text-xs text-slate-500 tracking-widest uppercase">
                Everything, handled.
              </span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full"
            >
              <div className="w-full h-px bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "#6366f1" }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* Status text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="h-4 flex items-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={statusIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-xs text-slate-500"
                >
                  {STATUS_MESSAGES[statusIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
