import { NextRequest, NextResponse } from "next/server";

// Socials launch: receives "Request access" submissions and emails them via Resend.
// Configure RESEND_API_KEY + SOCIALS_REQUEST_TO in .env.local. Uses Resend's REST API
// directly (no SDK dependency).
export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  let body: { email?: string; instagram?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email || "").trim();
  const instagram = (body.instagram || "").trim();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SOCIALS_REQUEST_TO;
  const from = process.env.SOCIALS_REQUEST_FROM || "Socials <onboarding@resend.dev>";

  // Not configured yet — tell the client so it can show the "email us" fallback.
  if (!apiKey || !to) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Socials access request${instagram ? ` — ${instagram}` : ""}`,
        html: `
          <div style="font-family:system-ui,sans-serif;font-size:15px;color:#111">
            <h2 style="margin:0 0 12px">New Socials access request</h2>
            <p style="margin:4px 0"><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin:4px 0"><strong>Instagram:</strong> ${escapeHtml(instagram) || "(not provided)"}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend error", res.status, detail);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Request-access route error", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
