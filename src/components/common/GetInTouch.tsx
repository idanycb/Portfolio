import { Container } from "../ui";

export function GetInTouch() {
  return (
    <section id="contact" className="py-24">
      <Container>
        <span className="font-mono text-[10px] md:text-sm">That&apos;s all for now.</span>
        <h2 className="text-2xl lg:text-5xl lg:leading-[3.5rem]">
          Got a project in mind?
          <br />
          Let&apos;s talk
        </h2>

        <div className="relative">
          <a
            href="mailto:idanycb@gmail.com"
            className="font-heading strikethrough mr-6 ml-auto flex h-28 w-28 items-center justify-center rounded-full bg-indigo-500 text-xs text-white transition-colors duration-200 ease-in-out hover:bg-indigo-600 md:mr-16 md:h-38 md:w-38 md:text-base lg:mr-28 lg:h-48 lg:w-48"
          >
            Get in touch
          </a>
        </div>
      </Container>
    </section>
  );
}
