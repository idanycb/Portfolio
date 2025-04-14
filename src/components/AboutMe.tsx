import { BsArrowUpRightCircle } from "react-icons/bs";

export function AboutMe() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <p className="font-medium">
        Driven by curiosity and a love for design, I create simple, functional, and visually
        striking digital experiences. As a student, I'm always learning and exploring new ideas.
      </p>
      <aside className="ml-auto flex w-64 flex-col gap-3 text-right text-xs">
        <p className="font-light">
          The fusion of my passion for design, development, and seamless user experiences places me
          at the intersection of creativity and technology in the digital world.
        </p>
        <div className="flex items-center justify-end gap-2 font-medium">
          <span>More about me</span>
          <BsArrowUpRightCircle strokeWidth={0.5} overflow="visible" />
        </div>
      </aside>
    </div>
  );
}
