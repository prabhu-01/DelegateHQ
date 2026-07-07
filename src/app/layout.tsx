import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
export const metadata: Metadata = {
  title: "Socials by DelegateHQ — Scripts worth filming.",
  description:
    "A private studio that turns AI-curated Instagram Reel ideas into filmable scripts. Score ideas, generate and refine scripts with Aria, audit your takes, and publish. Invite-gated.",
  keywords: "Instagram Reels, AI script generation, content studio, reel ideas, creator tools, short-form video",
  openGraph: {
    title: "Socials by DelegateHQ — Scripts worth filming.",
    description: "Turn curated Reel ideas into scripts worth filming. Score, script, refine, publish.",
    type: "website",
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
      </body>
    </html>
  );
}
