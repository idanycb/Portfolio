import { AboutMe, Footer, GetInTouch, Header } from "@/components/common";
import { Container } from "@/components/ui";
import { FeaturedProjects } from "@/features/projects";

export default function Home() {
  return (
    <main>
      <Header />
      <Container>
        <AboutMe />
        <FeaturedProjects />
        <GetInTouch />
      </Container>
      <Footer />
    </main>
  );
}
