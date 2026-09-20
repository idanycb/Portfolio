import type { Viewport } from "next";
import { Architects_Daughter, Archivo, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";

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

// The exports set the case-study prose in Georgia, which is not installed on
// Linux or Android — there it silently fell back to the browser's default
// Times, far lighter than the surrounding Archivo. Source Serif 4 is
// self-hosted so every visitor sees the same face, and its weight and
// x-height sit much closer to Archivo's.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const architectsDaughter = Architects_Daughter({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Daniel Thomas - Backend & AI Software Engineer",
  description: "Backend and AI software engineer building reliable Java, retrieval, and cloud-native systems.",
  keywords: [
    "Daniel Thomas",
    "Full Stack Developer",
    "Portfolio",
    "Web Development",
    "Software Engineering",
    "Projects",
    "Skills",
    "Design Work",
  ],
  author: "Daniel Thomas Jesudoss",
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
    <html lang="en">
      <body
        className={`${archivo.variable} ${plexMono.variable} ${architectsDaughter.variable} ${sourceSerif.variable} overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
