import PageLayout from "@/components/layouts/PageLayout";
import { SkillsGallery } from "@/features/skills";

export default function Skills() {
  return (
    <PageLayout
      heroContent={
        <h1 className="font-body relative top-[30%] px-8 text-center text-4xl sm:text-5xl md:top-[27%] md:text-6xl lg:top-[25%] lg:text-7xl">
          Skills that fuel my <br /> passion
        </h1>
      }
    >
      <SkillsGallery />
    </PageLayout>
  );
}
