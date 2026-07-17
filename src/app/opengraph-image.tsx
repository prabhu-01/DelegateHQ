import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Socials by DelegateHQ. A research studio for Reels.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated on request via Satori (JSX -> image), matching the site's own dark/indigo
// brand look. No external asset or design tool needed.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050508",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 70% 60% at 30% 30%, rgba(99,102,241,0.28) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(99,102,241,0.16) 0%, transparent 60%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 44 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #6366f1 0%, #5558e8 100%)",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 10.5V3.5l5 3 5-3v7"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
              Socials
            </span>
            <span
              style={{
                fontSize: 18,
                color: "#818cf8",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                fontWeight: 600,
              }}
            >
              by DelegateHQ
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.03em",
            textAlign: "center",
            maxWidth: 920,
            lineHeight: 1.15,
          }}
        >
          A research studio for Reels.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 26,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 780,
          }}
        >
          Score ideas, script the strongest, refine, and film.
        </div>
      </div>
    ),
    { ...size }
  );
}
