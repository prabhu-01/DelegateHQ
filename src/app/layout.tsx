import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "DelegateHQ — Everything, handled.",
  description:
    "AI operations agency deploying vertically specialized agent teams that run the full operations of bootstrapped SaaS businesses. Support, onboarding, documentation, content, and customer success across 11 industry divisions.",
  keywords: "AI operations, SaaS operations, AI agents, customer support automation, onboarding automation, India SaaS",
  openGraph: {
    title: "DelegateHQ — Everything, handled.",
    description: "AI agent teams that run your entire ops stack so you can focus on building.",
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
      </body>
    </html>
  );
}
