import { CaseStudyLayout } from "@/components/mdx/CaseStudyLayout";

export const metadata = {
  title: "RAG Workspace - Case Study",
  description: "Architecting a High-Precision Multi-Tenant Document Intelligence Platform",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CaseStudyLayout
      title="RAG Workspace"
      metadata={[
        { label: "Role", value: "Full Stack Engineer" },
        { label: "Timeline", value: "Apr 2026" },
        { label: "Stack", value: "Spring Boot, Next.js" },
        { label: "Domain", value: "AI / ML" },
      ]}
    >
      {children}
    </CaseStudyLayout>
  );
}
