import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DelegateHQ. Everything, handled.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
            <svg width="34" height="34" viewBox="0 0 13 13" fill="none">
              <path
                d="M1.5 6.5L6.5 1.5L11.5 6.5M1.5 6.5L6.5 11.5L11.5 6.5"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span style={{ fontSize: 40, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
            DelegateHQ
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.03em",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Everything, handled.
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
          Vertically specialized AI agent teams across 11 industries.
        </div>
      </div>
    ),
    { ...size }
  );
}
