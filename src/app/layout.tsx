import type { Viewport } from "next";
import { Archivo, DM_Sans, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const dMSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: "400",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata = {
  title: "Daniel Thomas — Full Stack Developer",
  description: "A portfolio site showcasing projects, skills, and design work.",
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
        className={`${dMSans.variable} ${inter.variable} ${ibmPlexMono.variable} ${archivo.variable} m-0 overflow-x-hidden leading-normal antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
