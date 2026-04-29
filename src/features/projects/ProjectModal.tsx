"use client";

import { ProjectT } from "@/features/projects/data/projects";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { BsArrowUpRight } from "react-icons/bs";

interface ProjectModalProps {
  project: ProjectT | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        ref={modalRef}
        className="font-archivo max-h-[90vh] w-full max-w-2xl overflow-auto bg-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black px-6 py-4">
          <h2 className="text-xl font-extrabold uppercase -tracking-wide">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-1 transition-colors hover:bg-black hover:text-white"
            aria-label="Close"
          >
            <IoClose size={20} />
          </button>
        </div>

        <div className="px-6 py-6">
          <Image
            src={project.image}
            alt={project.title}
            sizes="100vw"
            className="mb-6 h-64 w-full object-cover grayscale"
          />

          <p className="font-body mb-6 text-sm leading-relaxed text-gray-700">{project.description}</p>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 border-t border-black pt-6">
            <a
              href={project.repoURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-black bg-black px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
            >
              Repository <BsArrowUpRight strokeWidth={0.5} />
            </a>
            {project.demoURL && (
              <a
                href={project.demoURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-black px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
              >
                Live Demo <BsArrowUpRight strokeWidth={0.5} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
