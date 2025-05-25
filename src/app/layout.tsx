import { DM_Sans, IBM_Plex_Mono, Inter } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dMSans.variable} ${inter.variable} ${ibmPlexMono.variable} relative antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
