import type { Metadata, Viewport } from "next";
import { Architects_Daughter, Archivo, IBM_Plex_Mono } from "next/font/google";

import { homeContent } from "@/content/home";

import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// The exports use Courier Prime, a typewriter face: light-stroked, wide, and
// slab-serifed. Against Archivo Black it read thin and dated, and at the
// 9.5-12px label sizes it washed out in the muted greys. IBM Plex Mono keeps
// the technical-document character but on a grotesque skeleton that matches
// Archivo's construction, with sturdier strokes at small sizes.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const architectsDaughter = Architects_Daughter({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
});

const siteTitle = "Daniel Thomas Jesudoss | Backend & AI Software Engineer";
const siteDescription =
  "Daniel Thomas Jesudoss (Dany), a new-grad backend and AI software engineer in Dallas–Fort Worth. Spring Boot, RAG over SEC filings, and a self-run K3s cluster.";

export const metadata: Metadata = {
  metadataBase: new URL(homeContent.profile.website),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Daniel Thomas Jesudoss",
    "Dany",
    "Backend Engineer",
    "AI Software Engineer",
    "Java",
    "Spring Boot",
    "RAG",
    "pgvector",
    "Kubernetes",
    "Dallas–Fort Worth",
  ],
  authors: [{ name: homeContent.profile.name, url: homeContent.profile.website }],
  creator: homeContent.profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: homeContent.profile.name,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${archivo.variable} ${plexMono.variable} ${architectsDaughter.variable} overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
