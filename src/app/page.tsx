import { AboutMe, GetInTouch, Header } from "@/components/common";
import { HeroPage } from "@/components/common/HeroPage";
import { Projects } from "@/features/projects";
import { SkillsGallery } from "@/features/skills";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroPage />
      <AboutMe />
      <Projects />
      <SkillsGallery />
      <GetInTouch />
      {/* <Footer /> */}
    </main>
  );
}
