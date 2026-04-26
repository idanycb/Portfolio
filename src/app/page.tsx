import { AboutMe, GetInTouch, Header } from "@/components/common";
import { HeroPage } from "@/features/hero/HeroPage";
import { Projects } from "@/features/projects";
import { SkillsGallery } from "@/features/skills";

export default function Home() {
  return (
    <div className="relative grid">
      <Header />
      <main className="contents" role="main">
        <div className="col-start-1 row-start-1">
          <HeroPage />
        </div>
        <div className="col-start-1">
          <AboutMe />
          <Projects />
          <SkillsGallery />
          <GetInTouch />
          {/* <Footer /> */}
        </div>
      </main>
    </div>
  );
}
