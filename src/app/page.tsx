import { AboutMe } from "@/components/common";
import PageLayout from "@/components/layouts/PageLayout";
import { FeaturedProjects } from "@/features/projects";

export default function Home() {
  return (
    <PageLayout
      heroContent={
        <div className="relative w-full flex-1">
          {/* <Image
            src="/images/portrait-grayscale.png"
            alt="Portrait"
            fill
            className="object-contain object-bottom drop-shadow-[0_25px_30px_rgba(255,255,255,0.08)]"
          /> */}
        </div>
      }
    >
      <AboutMe />
      <FeaturedProjects />
    </PageLayout>
  );
}
