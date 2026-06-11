"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_MESSAGES = [
  "Initializing agents...",
  "Loading divisions...",
  "Preparing interface...",
  "Almost ready...",
];

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const MIN_DURATION = 2400;

    const interval = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < STATUS_MESSAGES.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 550);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 8 + 2;
      });
    }, 120);

    const finish = async () => {
      await document.fonts.ready;
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      await new Promise((r) => setTimeout(r, remaining));
      setProgress(100);
      await new Promise((r) => setTimeout(r, 200));
      setVisible(false);
      setTimeout(onComplete, 700);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

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
