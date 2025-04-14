import PageLayout from "@/components/layouts/PageLayout";
import { SkillsGallery } from "@/features/skills";

export default function Skills() {
  return (
    <PageLayout
      heroContent={
        <h1 className="font-body relative top-[30%] container px-8 text-center text-4xl">
          Skills that fuel my passion
        </h1>
      }
    >
      <SkillsGallery />
    </PageLayout>
  );
}
