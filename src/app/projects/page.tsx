import PageLayout from "@/components/layouts/PageLayout";
import { AllProjects } from "@/features/projects";

export default function Projects() {
  return (
    <PageLayout
      heroContent={
        <h1 className="relative top-1/3 -translate-y-1/2 px-8 text-2xl font-medium">
          welcome to my realm of wild projects and awesome creations
        </h1>
      }
    >
      <AllProjects />
    </PageLayout>
  );
}
