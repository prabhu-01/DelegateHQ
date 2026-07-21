"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

// Follow-system by default with a persistent manual override. `attribute="class"`
// puts `.light` / `.dark` on <html>; the Socials surface reads that via
// `html.dark .socials { ... }` in globals.css. The agency pages are hardcoded dark
// and ignore the class entirely, so toggling never affects them.
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
}
