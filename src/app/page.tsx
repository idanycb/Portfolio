import { AboutMe, Footer, Header } from "@components/common";
import { HeroPage } from "@features/hero/HeroPage";
import { LetsConnect } from "@features/lets-connect/LetsConnect";
import { Projects } from "@features/projects/Projects";
import { SkillsGallery } from "@features/skills/SkillsGallery";

export default function Home() {
  return (
    <div className="relative grid">
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-full bg-black px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to Main Content
      </a>
      <Header />
      <main id="main-content" className="contents">
        <div className="col-start-1 row-start-1">
          <HeroPage />
        </div>
        <div className="col-start-1">
          <AboutMe />
          <Projects />
          <SkillsGallery />
          <LetsConnect />
        </div>
      </main>
      <Footer />
    </div>
  );
}
