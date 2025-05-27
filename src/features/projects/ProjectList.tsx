"use client";

import { FadeIn } from "@/components/animation/FadeIn";
import { useGSAP } from "@gsap/react";
import cx from "classix";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { ProjectT, projects } from "./data/projects";
import { ProjectModal } from "./ProjectModal";

type ProjectListProps = {
  showAll: boolean;
  productsFilter?: number[];
};

let isAnimationConfigured = false;
export function ProjectList({ showAll, productsFilter }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectT | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tl, setTl] = useState(gsap.timeline({ paused: true }));
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const initialHeight = ref.current?.clientHeight || 0;
      if (!isAnimationConfigured) {
        gsap.set(ref.current, { height: initialHeight });
        gsap.set(".hidden-projects", { display: "block" });
        const finalHeight = ref.current?.scrollHeight || 0;
        console.log("Final height:", finalHeight);
        if (ref && typeof ref !== "function" && ref.current) {
          tl.to(ref.current, {
            height: finalHeight,
            ease: "power2.inOut",
          });

          isAnimationConfigured = true;
        }
        return;
      }
      if (showAll) {
        tl.play();
      } else {
        window.scrollTo({
          top: ref.current!.offsetTop + innerHeight + 50,
          behavior: "smooth",
        });
        tl.reverse();
      }
    },
    { scope: ref, dependencies: [showAll] },
  );

  return (
    <>
      <div
        ref={ref}
        className="grid grid-cols-1 gap-6 overflow-hidden md:grid-cols-2 lg:gap-x-14 lg:gap-y-6"
      >
        {projects
          .filter((project) => productsFilter?.includes(project.id))
          .map((project) => (
            <Project
              key={project.id}
              project={project}
              setSelectedProject={setSelectedProject}
              setIsModalOpen={setIsModalOpen}
            />
          ))}
        {projects
          .filter((project) => !productsFilter?.includes(project.id))
          .map((project) => (
            <Project
              className="hidden-projects hidden"
              key={project.id}
              project={project}
              setSelectedProject={setSelectedProject}
              setIsModalOpen={setIsModalOpen}
            />
          ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

interface ProjectProps {
  project: ProjectT;
  setSelectedProject: (project: ProjectT) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  className?: string;
}

const Project = ({ project, setSelectedProject, setIsModalOpen, className }: ProjectProps) => {
  const handleProjectClick = (project: ProjectT) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  return (
    <div
      onClick={() => handleProjectClick(project)}
      className={cx("cursor-pointer transition-transform hover:scale-[1.02]", className)}
    >
      <FadeIn scrollTrigger from="left">
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
      </FadeIn>
    </div>
  );
};
