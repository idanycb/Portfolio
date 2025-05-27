"use client";

import { TextFadeIn } from "@/components/animation";
import { FadeIn } from "@/components/animation/FadeIn";
import { Container } from "@/components/ui";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { ProjectList } from "./ProjectList";

const featuredProjectsID = [1, 2, 3, 4];

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };
  return (
    <section id="projects">
      <Container className="flex flex-col gap-10 py-8 lg:gap-16 lg:py-16">
        <div className="flex justify-between">
          <FadeIn
            scrollTrigger
            from="left"
            className="text-4xl font-medium md:self-center md:text-5xl lg:text-6xl"
          >
            <h1>Projects</h1>
          </FadeIn>
          <TextFadeIn
            as="span"
            scrollTrigger
            className="font-body hidden w-48 text-[10px] font-light uppercase md:inline lg:w-68 lg:text-sm"
          >
            Here&apos;s a selection of projects that showcase my passion for design and development,
            reflecting creativity and innovation.
          </TextFadeIn>
        </div>
        <ProjectList showAll={showAll} productsFilter={featuredProjectsID} />
        <button
          onClick={toggleShowAll}
          className="font-heading flex w-fit items-center gap-2 self-center rounded-full border border-gray-300 px-6 py-2 text-xs select-none lg:text-sm"
        >
          Show {showAll ? "Less" : "All"}
          {showAll ? (
            <MdOutlineKeyboardArrowUp className="h-4 w-4" />
          ) : (
            <MdOutlineKeyboardArrowDown className="h-4 w-4" />
          )}
        </button>
      </Container>
    </section>
  );
}
