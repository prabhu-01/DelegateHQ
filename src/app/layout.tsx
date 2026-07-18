import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// SOCIALS-LAUNCH: root metadata now describes Socials (the "/" landing). The original
// DelegateHQ agency metadata moved to src/app/agency/layout.tsx. Restore this block
// (and delete agency/layout.tsx) to revert.
const TITLE = "Socials by DelegateHQ. A research studio for Reels.";
const DESCRIPTION =
  "A research-backed studio that scores Reel ideas for viral potential and scripts the strongest ones. Live on Instagram today, with more platforms on the way.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "reel ideas",
    "viral reel ideas",
    "viral content ideas",
    "trending reel ideas",
    "instagram reel idea generator",
    "Instagram Reels",
    "content research",
    "reel idea research",
    "AI script generation",
    "content research studio",
    "creator research tool",
    "short-form video research",
    "DelegateHQ",
    "Socials by DelegateHQ",
    "TikTok",
    "YouTube Shorts",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg text-slate-100 antialiased font-sans">
        {children}
        <Analytics />
        <JsonLd />
      </body>
    </html>
  );
}
