import { ImageResponse } from "next/og";
import { getDivisionBySlug } from "@/lib/divisions";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const division = getDivisionBySlug(params.slug);
  const name = division?.name ?? "DelegateHQ";
  const tagline = division?.tagline ?? "Everything, handled.";

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
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
              <path
                d="M9 10.5C9 9.11929 10.1193 8 11.5 8H15C21.0751 8 26 11.5817 26 16C26 20.4183 21.0751 24 15 24H11.5C10.1193 24 9 22.8807 9 21.5V10.5Z"
                fill="white"
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
            fontSize: 58,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.03em",
            textAlign: "center",
            maxWidth: 920,
          }}
        >
          {name} operations, handled.
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
          {tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
