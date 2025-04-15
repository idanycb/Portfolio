import { Container, HeroWithNav } from "@/components/shared";
import { Footer, GetInTouch } from "@/components/ui";

interface PageLayoutProps {
  heroContent: React.ReactNode;
  children: React.ReactNode;
}

export default function PageLayout({ heroContent, children }: PageLayoutProps) {
  return (
    <>
      <HeroWithNav>{heroContent}</HeroWithNav>
      <Container>
        {children}
        <GetInTouch />
      </Container>
      <Footer />
    </>
  );
}
