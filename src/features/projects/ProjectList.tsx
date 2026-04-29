"use client";

import { FadeIn } from "@/components/animation/FadeIn";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
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
  const [hoveredProject, setHoveredProject] = useState<ProjectT | null>(null);
  const [tl] = useState(gsap.timeline({ paused: true }));
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const initialHeight = ref.current?.clientHeight || 0;
      if (!isAnimationConfigured) {
        gsap.set(ref.current, { height: initialHeight });
        gsap.set(".hidden-projects", { display: "block" });
        const finalHeight = ref.current?.scrollHeight || 0;
        if (ref && typeof ref !== "function" && ref.current) {
          tl.to(ref.current, { height: finalHeight, ease: "power2.inOut" });
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

  const featured = projects.filter((p) => productsFilter?.includes(p.id));
  const rest = projects.filter((p) => !productsFilter?.includes(p.id));

  const handleProjectClick = (project: ProjectT) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Floating image preview — desktop only */}
      <div
        className={`pointer-events-none fixed right-[4vw] top-1/2 z-20 hidden -translate-y-1/2 transition-all duration-300 xl:block ${
          hoveredProject ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {hoveredProject && (
          <div className="h-64 w-96 overflow-hidden">
            <Image
              src={hoveredProject.image}
              alt={hoveredProject.title}
              sizes="384px"
              className="h-full w-full object-cover grayscale"
            />
          </div>
        )}
      </div>

      <div ref={ref} className="overflow-hidden">
        {featured.map((project, i) => (
          <FadeIn key={project.id} scrollTrigger from="left">
            <ProjectRow
              project={project}
              index={i}
              onHover={setHoveredProject}
              onClick={() => handleProjectClick(project)}
            />
          </FadeIn>
        ))}

        {rest.map((project, i) => (
          <div key={project.id} className="hidden-projects hidden">
            <ProjectRow
              project={project}
              index={featured.length + i}
              onHover={setHoveredProject}
              onClick={() => handleProjectClick(project)}
            />
          </div>
        ))}

        <div className="border-b border-black" />
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

interface ProjectRowProps {
  project: ProjectT;
  index: number;
  onHover: (project: ProjectT | null) => void;
  onClick: () => void;
}

const ProjectRow = ({ project, index, onHover, onClick }: ProjectRowProps) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      className="group flex cursor-pointer items-center gap-4 border-t border-black px-2 py-5 transition-colors duration-200 hover:bg-black hover:text-white md:px-4 md:py-6 lg:py-8"
    >
      <span className="font-archivo w-8 shrink-0 text-xs font-extrabold text-[#aaa] transition-colors group-hover:text-[#666] md:w-12 md:text-sm">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="font-archivo flex-1 text-2xl font-extrabold -tracking-wide uppercase md:text-3xl lg:text-4xl xl:text-5xl">
        {project.title}
      </h3>
      <div className="hidden items-center gap-2 md:flex">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="border border-current px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>
      <BsArrowUpRight className="shrink-0 text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:text-xl" strokeWidth={0.5} />
    </div>
  );
};
