import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ember & Roast Coffee — Artisan Coffee Roastery & Café",
  description:
    "Where every cup tells a story. Artisan coffee roasted with passion, brewed with precision. Premium single-origin beans from Ethiopia, Colombia, and Guatemala.",
  keywords: [
    "artisan coffee",
    "coffee roastery",
    "specialty coffee",
    "café",
    "single-origin",
    "Ember & Roast",
  ],
  authors: [{ name: "Ember & Roast Coffee" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Ember & Roast Coffee — Artisan Coffee Roastery & Café",
    description:
      "Where every cup tells a story. Artisan coffee roasted with passion, brewed with precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
