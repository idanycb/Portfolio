"use client";

import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
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
        className="font-archivo mt-8 inline-flex h-fit w-fit items-center gap-3 self-center rounded-none border border-black px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors select-none hover:bg-black hover:text-white"
      >
        {showAll ? "SHOW LESS" : "VIEW ALL"}
        <BsArrowUpRight
          className={`text-sm transition-transform ${showAll ? "rotate-90" : ""}`}
          strokeWidth={0.5}
        />
      </button>
    </>
  );
}
