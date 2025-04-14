import { AboutMe } from "@/components/AboutMe";
import PageLayout from "@/components/layouts/PageLayout";
import { FeaturedProjects } from "@/features/projects";

export default function Home() {
  return (
    <PageLayout heroContent={"Profile Pic Here"}>
      <AboutMe />
      <FeaturedProjects />
    </PageLayout>
  );
}
