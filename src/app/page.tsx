import PageLayout from "@/components/layouts/PageLayout";
import { AboutMe } from "@/components/ui";
import { FeaturedProjects } from "@/features/projects";

export default function Home() {
  return (
    <PageLayout
      heroContent={<div className="absolute top-0 left-0 -z-10 h-svh w-full bg-zinc-400"></div>}
    >
      <AboutMe />
      <FeaturedProjects />
    </PageLayout>
  );
}
