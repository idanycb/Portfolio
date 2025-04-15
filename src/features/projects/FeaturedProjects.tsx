import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { ProjectList } from "./ProjectList";

const featuredProjectsID = [1, 2, 3, 4];

export function FeaturedProjects() {
  return (
    <div className="flex flex-col gap-10 py-8 lg:gap-16 lg:py-16">
      <div className="flex justify-between">
        <h1 className="text-4xl font-medium md:self-center md:text-5xl lg:text-6xl">
          Impressive Works
        </h1>
        <span className="font-body hidden w-48 text-[10px] font-light uppercase md:inline lg:w-68 lg:text-sm">
          Here's a selection of projects that showcase my passion for design and development,
          reflecting creativity and innovation.
        </span>
      </div>
      <ProjectList showAll={false} productsFilter={featuredProjectsID} />
      <Link
        href="/projects"
        className="font-heading flex w-fit items-center gap-2 self-center rounded-full border border-gray-300 px-6 py-2 text-xs select-none lg:text-sm"
      >
        <GoDotFill />
        Explore more
      </Link>
    </div>
  );
}
