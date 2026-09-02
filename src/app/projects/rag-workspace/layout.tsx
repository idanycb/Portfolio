import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinDoc - Case Study",
  description: "Making amended SEC filings answerable, with each claim traceable to its source.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
