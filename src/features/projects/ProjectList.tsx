import { BsArrowRightCircle } from "react-icons/bs";
import { projects } from "./data/projects";

type ProjectListProps = {
  showAll: boolean;
  productsFilter?: number[]; // Optional, only used when showAll is false
};

export function ProjectList({ showAll, productsFilter }: ProjectListProps) {
  const filteredProjects = showAll
    ? projects
    : projects.filter((project) => productsFilter?.includes(project.id));

  console.log("TODO: Replace with actual image");

  return (
    <div className="grid grid-cols-1 gap-6">
      {filteredProjects.map((project) => (
        <div key={project.id}>
          <div className="h-[200px] w-full rounded-2xl bg-gray-500"></div>
          <div className="mt-3 flex items-center gap-3 pl-3">
            <BsArrowRightCircle />
            <h3>{project.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
