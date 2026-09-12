import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

const TITLE = "DelegateHQ. Everything, handled.";
const DESCRIPTION =
  "AI operations agency deploying vertically specialized agent teams that run the full operations of bootstrapped SaaS businesses. Support, onboarding, documentation, content, and customer success across 11 industry divisions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI operations",
    "SaaS operations",
    "AI agents",
    "customer support automation",
    "onboarding automation",
    "India SaaS",
    "DelegateHQ",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: "AI agent teams that run your entire ops stack so you can focus on building.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "AI agent teams that run your entire ops stack so you can focus on building.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
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
      className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}
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
