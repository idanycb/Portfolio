import { ProjectList } from "./ProjectList";

export function AllProjects() {
  return (
    <div className="py-4">
      <ProjectList showAll={true} />
    </div>
  );
}
