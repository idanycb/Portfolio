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
    <div id="top" className="relative overflow-hidden bg-paper">
      <a href="#main-content" className="sr-only z-50 bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4">Skip to main content</a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <SelectedWorkSection />
        <ExperienceSection />
        <StackSection />
        <ArchiveSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
