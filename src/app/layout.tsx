import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "mindmapcn";
const creator = "https://github.com/ssshooter";
const siteDescription =
  "A collection of beautifully designed, accessible, and customizable mind map components. Built on mind-elixir. Styled with Tailwind CSS. Works with shadcn/ui.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "mindmapcn - Beautiful mind maps made simple",
    template: "%s - mindmapcn",
  },
  description: siteDescription,
  keywords: [
    "react mind map",
    "next.js mind map",
    "mind-elixir",
    "mind map components",
    "shadcn mind map",
    "tailwind mind map",
    "react mind map library",
    "typescript mind map",
    "interactive mind maps",
    "knowledge graph",
    "思维导图",
  ],
  authors: [
    { name: "SSShooter", url: "https://github.com/ssshooter" },
  ],
  creator: "SSShooter",
  publisher: "mindmapcn",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: "mindmapcn - Beautiful mind maps made simple",
    description: siteDescription,
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "mindmapcn - Beautiful mind maps, made simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mindmapcn - Beautiful mind maps made simple",
    description: siteDescription,
    creator: creator,
    images: ["/banner.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
