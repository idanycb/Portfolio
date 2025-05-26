import { Footer, GetInTouch, Header } from "@/components/common";
import { Container, HeroWithNav } from "@/components/ui";

interface PageLayoutProps {
  heroContent: React.ReactNode;
  children: React.ReactNode;
}

export default function PageLayout({ heroContent, children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <HeroWithNav>{heroContent}</HeroWithNav>
      <Container>
        {children}
        <GetInTouch />
      </Container>
      <Footer />
    </>
  );
}
