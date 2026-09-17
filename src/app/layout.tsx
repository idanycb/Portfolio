import type { Viewport } from "next";
import { Architects_Daughter, Archivo, Courier_Prime } from "next/font/google";

import { InkFilterDefinition } from "@/shared/illustrations";

import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
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
        className={`${archivo.variable} ${courierPrime.variable} ${architectsDaughter.variable} overflow-x-hidden antialiased`}
      >
        <InkFilterDefinition />
        {children}
      </body>
    </html>
  );
}
