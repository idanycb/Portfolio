import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { ProjectList } from "./ProjectList";

const featuredProjectsID = [1, 2, 3, 4];

export function FeaturedProjects() {
  return (
    <div className="flex flex-col gap-10 py-8">
      <h1 className="text-4xl font-medium">Impressive Works</h1>
      <ProjectList showAll={false} productsFilter={featuredProjectsID} />
      <Link
        href="/projects"
        className="font-heading flex w-fit items-center gap-2 self-center rounded-full border border-gray-300 px-6 py-2 text-xs select-none"
      >
        <GoDotFill />
        Explore more
      </Link>
    </div>
  );
}
