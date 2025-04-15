import PageLayout from "@/components/layouts/PageLayout";
import { Container } from "@/components/shared";
import { AllProjects } from "@/features/projects";

export default function Projects() {
  return (
    <PageLayout
      heroContent={
        <Container>
          <h1 className="relative top-[23vh] max-w-xs text-2xl font-medium md:max-w-[30rem] md:text-4xl lg:max-w-[40rem] lg:text-5xl lg:leading-15">
            welcome to my realm of wild projects and awesome creations
          </h1>
        </Container>
      }
    >
      <AllProjects />
    </PageLayout>
  );
}
