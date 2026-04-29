import { CaseStudyLayout } from "@/components/mdx/CaseStudyLayout";

export const metadata = {
  title: "Portfolio GitOps - Case Study",
  description:
    "Provisioning and operating a self-healing K3s portfolio cluster with FluxCD, Infisical, and OCI",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CaseStudyLayout
      title="Portfolio GitOps"
      metadata={[
        { label: "Role", value: "Platform Engineer" },
        { label: "Timeline", value: "Feb 2026" },
        { label: "Stack", value: "K3s, FluxCD, OCI" },
        { label: "Domain", value: "DevOps / GitOps" },
      ]}
    >
      {children}
    </CaseStudyLayout>
  );
}
