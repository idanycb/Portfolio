import { homeContent } from "@/content/home";
import { ArchiveSection } from "@/features/home/archive/ArchiveSection";
import { ContactSection } from "@/features/home/contact/ContactSection";
import { ExperienceSection } from "@/features/home/experience/ExperienceSection";
import { HeroSection } from "@/features/home/hero/HeroSection";
import { SelectedWorkSection } from "@/features/home/selected-work/SelectedWorkSection";
import { StackSection } from "@/features/home/stack/StackSection";
import { SiteFooter } from "@/shared/site-footer";
import { SiteHeader } from "@/shared/site-header";

export default function Home() {
  return (
    <div id="top" className="bg-paper relative overflow-hidden">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <HeroSection content={homeContent.hero} />
        <SelectedWorkSection content={homeContent.work} />
        <ExperienceSection content={homeContent.experience} />
        <StackSection content={homeContent.stack} />
        <ArchiveSection content={homeContent.archive} />
        <ContactSection
          content={homeContent.contact}
          email={homeContent.profile.email}
          phone={homeContent.profile.phone}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
