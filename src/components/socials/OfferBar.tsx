"use client";

import Link from "next/link";

// Socials launch offer: full-width announcement strip pinned above the nav.
// The offer is granted on FIT — based on the idea or product a creator brings — so the
// copy never implies everyone qualifies. Absorbs the "Explore the agency" link on its
// right so we don't stack two separate top bars. Dismissible (remembered in localStorage).
export default function OfferBar({
  onBookCall,
  onDismiss,
}: {
  onBookCall: () => void;
  onDismiss: () => void;
}) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60]"
      style={{
        height: "44px",
        background: "linear-gradient(90deg, rgba(79,70,229,0.96) 0%, rgba(99,102,241,0.96) 50%, rgba(79,70,229,0.96) 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="relative h-full w-full max-w-6xl mx-auto flex items-center gap-3 px-4">
        {/* Offer */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
          </span>
          <p className="truncate" style={{ fontSize: "13px", color: "#fff", fontWeight: 500 }}>
            <span className="font-semibold">Launch offer</span>
            <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.85)" }}>
              {" "}· Bring us your idea and your first month is free
            </span>
            <span className="sm:hidden" style={{ color: "rgba(255,255,255,0.85)" }}>
              {" "}· First month free
            </span>
          </p>
          <button
            onClick={onBookCall}
            className="shrink-0"
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#4338ca",
              background: "#fff",
              border: "none",
              borderRadius: "7px",
              padding: "5px 12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "opacity 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Apply
          </button>
        </div>

        {/* Right: agency link (absorbed from the old top pill) + dismiss */}
        <div className="ml-auto flex items-center gap-3 shrink-0">
          <Link
            href="/agency"
            className="hidden md:inline-flex items-center gap-1.5"
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.8)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
          >
            Explore the agency
            <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
              <path d="M2 5.5h7M6 2.5L9 5.5 6 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <button
            onClick={onDismiss}
            aria-label="Dismiss offer"
            className="flex items-center justify-center"
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.14)",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2l-8 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
