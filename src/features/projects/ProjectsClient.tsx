"use client";

import { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { ProjectList } from "./ProjectList";

type ProjectsClientProps = {
  productsFilter: number[];
};

export function ProjectsClient({ productsFilter }: ProjectsClientProps) {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <ProjectList showAll={showAll} productsFilter={productsFilter} />
      <button
        onClick={() => setShowAll((prev) => !prev)}
        className="font-heading flex w-fit items-center gap-2 self-center rounded-full border border-gray-300 px-6 py-2 text-xs select-none lg:text-sm"
      >
        Show {showAll ? "Less" : "All"}
        {showAll ? (
          <MdOutlineKeyboardArrowUp className="h-4 w-4" />
        ) : (
          <MdOutlineKeyboardArrowDown className="h-4 w-4" />
        )}
      </button>
    </>
  );
}
