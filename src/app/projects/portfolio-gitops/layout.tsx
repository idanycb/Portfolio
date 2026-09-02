import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio GitOps - Case Study",
  description: "A declarative, self-healing K3s portfolio cluster operated with FluxCD.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
