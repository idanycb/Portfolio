import { Container, Footer, GetInTouch, HeroWithNav } from "@/components/ui";

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
