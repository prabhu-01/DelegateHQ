import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Socials by DelegateHQ. A research studio for Reels.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated on request via Satori (JSX -> image), matching the warm editorial brand
// (system.md). Social previews can't follow the viewer's OS theme, so this uses the
// light palette, the canonical/default look.
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
          background: "#F9F7F2",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 44 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#D85A30",
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
            <span style={{ fontSize: 40, fontWeight: 800, color: "#1A1A18", letterSpacing: "-0.02em" }}>
              Socials
            </span>
            <span
              style={{
                fontSize: 18,
                color: "#8A8778",
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
            color: "#1A1A18",
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
            color: "#8A8778",
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
