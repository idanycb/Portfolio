import { TextFadeIn } from "../animation";
import { Container } from "../ui";

export function AboutMe() {
  return (
    <section id="about" className="bg-black">
      <Container className="flex flex-col gap-8 py-8 text-white md:flex-row lg:py-16">
        <TextFadeIn scrollTrigger className="font-medium md:w-xl md:text-lg lg:text-2xl">
          Driven by curiosity and a love for design, I create simple, functional, and visually
          striking digital experiences. As a student, I&apos;m always learning and exploring new
          ideas.
        </TextFadeIn>
        <aside className="ml-auto flex w-64 flex-col gap-3 text-right text-xs md:w-66 md:gap-2 md:self-center md:text-[10px] lg:w-74 lg:text-sm">
          <TextFadeIn scrollTrigger className="font-light">
            The fusion of my passion for design, development, and seamless user experiences places
            me at the intersection of creativity and technology in the digital world.
          </TextFadeIn>
          {/* <div className="flex items-center justify-end gap-2 text-sm font-medium md:gap-3 md:text-[15px] lg:text-lg">
            <span>More about me</span>
            <BsArrowUpRightCircle
              strokeWidth={0.1}
              className="h-4 w-4 md:h-5 md:w-5"
              overflow="visible"
            />
          </div> */}
        </aside>
      </Container>
    </section>
  );
}
