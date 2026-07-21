"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// Socials launch: dedicated modal for the Socials product with two views —
//  • "Book a call": the scheduler (Cal.com / Calendly) embedded inline via iframe.
//  • "Request access": a form that POSTs to /api/socials/request-access (emails via Resend).
// Set NEXT_PUBLIC_BOOKING_URL to a real scheduling page for the embed to load.
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com";
const REQUEST_EMAIL = process.env.NEXT_PUBLIC_REQUEST_EMAIL || "hello@delegatehq.co";

// Build a theme-matched embed URL for the two common schedulers, following whichever
// theme (light/dark) the Socials surface is currently showing.
function buildEmbedUrl(url: string, theme: "light" | "dark"): string {
  try {
    const u = new URL(url);
    if (/(^|\.)cal\.com$/.test(u.hostname)) {
      u.searchParams.set("embed", "true");
      u.searchParams.set("theme", theme);
      return u.toString();
    }
    if (/(^|\.)calendly\.com$/.test(u.hostname)) {
      u.searchParams.set("hide_gdpr_banner", "1");
      if (theme === "dark") {
        u.searchParams.set("background_color", "211d16");
        u.searchParams.set("text_color", "f4f1e8");
      } else {
        u.searchParams.set("background_color", "ffffff");
        u.searchParams.set("text_color", "1a1a18");
      }
      u.searchParams.set("primary_color", "d85a30");
      return u.toString();
    }
    return url;
  } catch {
    return url;
  }
}

type View = "schedule" | "request";

export default function SocialsBookCallModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const [view, setView] = useState<View>("schedule");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const embedUrl = buildEmbedUrl(BOOKING_URL, theme);

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Reset state shortly after the modal closes
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setView("schedule");
      setSent(false);
      setHandle("");
      setEmail("");
      setError(null);
      setSubmitting(false);
    }, 300);
    return () => clearTimeout(t);
  }, [open]);

  const mailtoFallback = () => {
    const subject = encodeURIComponent("Socials access request");
    const body = encodeURIComponent(
      `Instagram: ${handle || "(not provided)"}\nEmail: ${email}\n\nI'd like access to Socials.`
    );
    window.location.href = `mailto:${REQUEST_EMAIL}?subject=${subject}&body=${body}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/socials/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, instagram: handle }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        // Delivery not set up yet, or the provider failed — fall back to the mail client.
        if (data?.error === "not_configured" || data?.error === "send_failed") {
          mailtoFallback();
          setSent(true);
        } else {
          setError(data?.error || "Something went wrong. Please try again.");
        }
      }
    } catch {
      mailtoFallback();
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  const labelStyle = {
    fontSize: "12px",
    fontWeight: 500 as const,
    color: "var(--ink-secondary)",
    marginBottom: "6px",
    display: "block",
  };
  const inputStyle = {
    width: "100%",
    padding: "11px 13px",
    borderRadius: "var(--radius-control)",
    background: "var(--canvas)",
    border: "1px solid var(--edge-strong)",
    color: "var(--ink-primary)",
    fontSize: "14px",
    outline: "none",
  };

  const tabStyle = (active: boolean) => ({
    flex: 1,
    padding: "8px 12px",
    borderRadius: "9px",
    fontSize: "13px",
    fontWeight: 600 as const,
    cursor: "pointer",
    border: "1px solid " + (active ? "var(--accent)" : "transparent"),
    background: active ? "var(--accent-tint)" : "transparent",
    color: active ? "var(--accent-text-on-tint)" : "var(--ink-muted)",
    transition: "all 0.15s ease",
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8"
          style={{ background: "rgba(26,26,24,0.5)", backdropFilter: "blur(6px)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Book a call with Socials"
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="card-featured w-full flex flex-col"
            style={{
              maxWidth: view === "schedule" ? "720px" : "440px",
              maxHeight: "90vh",
              borderRadius: "16px",
              transition: "max-width 0.3s ease",
            }}
          >
            <div className="flex flex-col" style={{ padding: "22px 24px 24px", position: "relative", minHeight: 0 }}>
              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute flex items-center justify-center z-10"
                style={{
                  top: "16px",
                  right: "16px",
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "var(--canvas)",
                  border: "1px solid var(--edge)",
                  cursor: "pointer",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2l-8 8" stroke="var(--ink-muted)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Launch-offer banner — reinforces the offer at the point of conversion */}
              {!sent && (
                <div
                  className="flex items-center gap-2.5 mb-4"
                  style={{
                    padding: "9px 12px",
                    borderRadius: "10px",
                    background: "var(--accent-tint)",
                    border: "1px solid var(--edge)",
                    marginRight: "40px",
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70" style={{ background: "var(--accent)" }} />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "var(--accent)" }} />
                  </span>
                  <p style={{ fontSize: "12.5px", color: "var(--accent-text-on-tint)", lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 600 }}>Launch offer.</span> Tell us about your idea. If it is a
                    fit, your first month is free.
                  </p>
                </div>
              )}

              {/* Tabs (hidden on the success screen) */}
              {!sent && (
                <div
                  className="flex gap-1 mb-5"
                  style={{ padding: "4px", borderRadius: "12px", background: "var(--canvas)", border: "1px solid var(--edge)", marginRight: "40px" }}
                >
                  <button style={tabStyle(view === "schedule")} onClick={() => setView("schedule")}>
                    Book a call
                  </button>
                  <button style={tabStyle(view === "request")} onClick={() => setView("request")}>
                    Request access
                  </button>
                </div>
              )}

              {/* ── Schedule view ── */}
              {!sent && view === "schedule" && (
                <div className="flex flex-col" style={{ minHeight: 0 }}>
                  <p style={{ color: "var(--ink-secondary)", fontSize: "13.5px", lineHeight: 1.6, marginBottom: "16px" }}>
                    Pick a time and we will walk you through the studio and approve your workspace.
                  </p>
                  <div
                    className="relative overflow-hidden"
                    style={{
                      borderRadius: "12px",
                      border: "1px solid var(--edge)",
                      background: "var(--surface)",
                      height: "min(560px, 60vh)",
                    }}
                  >
                    <iframe
                      src={embedUrl}
                      title="Schedule a call"
                      className="absolute inset-0 h-full w-full"
                      style={{ border: "none", colorScheme: theme }}
                      loading="lazy"
                    />
                  </div>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "12px", textDecoration: "none", alignSelf: "center" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
                  >
                    Not loading? Open the scheduler in a new tab →
                  </a>
                </div>
              )}

              {/* ── Request-access view ── */}
              {!sent && view === "request" && (
                <div>
                  <p style={{ color: "var(--ink-secondary)", fontSize: "13.5px", lineHeight: 1.65, marginBottom: "20px" }}>
                    Tell us where you post and we will set up a call to walk you through the studio and get your workspace approved.
                  </p>

                  <form onSubmit={submit} className="socials-modal-form flex flex-col gap-4">
                    <div>
                      <label htmlFor="ig" style={labelStyle}>Instagram handle</label>
                      <input
                        id="ig"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder="@yourhandle"
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--edge-strong)")}
                      />
                    </div>
                    <div>
                      <label htmlFor="em" style={labelStyle}>Email</label>
                      <input
                        id="em"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        style={{ ...inputStyle, borderColor: error ? "var(--err)" : "var(--edge-strong)" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = error ? "var(--err)" : "var(--edge-strong)")}
                      />
                    </div>

                    {error && (
                      <p role="alert" style={{ color: "var(--err)", background: "var(--err-tint)", borderRadius: "8px", padding: "8px 10px", fontSize: "12.5px", lineHeight: 1.5, marginTop: "-4px" }}>
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary justify-center"
                      style={{ width: "100%", marginTop: "4px", opacity: submitting ? 0.7 : 1, cursor: submitting ? "wait" : "pointer" }}
                    >
                      {submitting ? "Sending..." : "Request access"}
                    </button>
                  </form>
                </div>
              )}

              {/* ── Success (after request) ── */}
              {sent && (
                <div className="flex flex-col items-center text-center" style={{ padding: "10px 0 4px" }}>
                  <div
                    className="flex items-center justify-center"
                    style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--ok-tint)", marginBottom: "18px" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M5 11.5l4 4 8-9" stroke="var(--ok-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "8px", color: "var(--ink-primary)" }}>
                    Request on its way
                  </h3>
                  <p style={{ color: "var(--ink-secondary)", fontSize: "13.5px", lineHeight: 1.65, marginBottom: "22px", maxWidth: "300px" }}>
                    We will reach out to schedule your onboarding call and get your workspace approved.
                  </p>
                  <button onClick={onClose} className="btn-secondary justify-center" style={{ width: "100%" }}>
                    Done
                  </button>
                </div>
              )}

              <style jsx>{`
                .socials-modal-form :global(input::placeholder) {
                  color: var(--ink-muted);
                  opacity: 1;
                }
              `}</style>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
