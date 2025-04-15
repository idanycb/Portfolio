"use client";

import { ProjectModal } from "@/components/ui/ProjectModal";
import Image from "next/image";
import { useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Project, projects } from "./data/projects";

type ProjectListProps = {
  showAll: boolean;
  productsFilter?: number[]; // Optional, only used when showAll is false
};

export function ProjectList({ showAll, productsFilter }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = showAll
    ? projects
    : projects.filter((project) => productsFilter?.includes(project.id));

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-x-14 lg:gap-y-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project)}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <div className="h-[200px] w-full overflow-hidden rounded-2xl drop-shadow-lg lg:mb-4 lg:h-[300px]">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 flex items-center gap-3 pl-3 lg:text-xl">
              <BsArrowRightCircle className="lg:h-6 lg:w-6" />
              <h3>{project.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
