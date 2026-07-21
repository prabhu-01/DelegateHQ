import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/JsonLd";
import ThemeProvider from "@/components/ThemeProvider";
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

// The Socials surface's typeface (design-system §3). Variable weight; agency keeps Inter.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9F7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#16130E" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable} ${bricolage.variable}`}
    >
      <body className="bg-bg text-slate-100 antialiased font-sans">
        <ThemeProvider>
          {children}
          <Analytics />
          <JsonLd />
        </ThemeProvider>
      </body>
    </html>
  );
}
