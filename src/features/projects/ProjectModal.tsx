"use client";

import { ProjectT } from "@/features/projects/data/projects";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface ProjectModalProps {
  project: ProjectT | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close modal with escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div
        ref={modalRef}
        className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-gray-200"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="mb-6">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={project.image}
            alt={project.title}
            className="mb-4 h-64 w-full rounded-lg object-cover"
          />
          <p className="mb-4 text-gray-700">{project.description}</p>

          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Technologies:</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span key={index} className="rounded-full bg-gray-200 px-3 py-1 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <a
              href={project.repoURL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
            >
              View Repository
            </a>
            {project.demoURL && (
              <a
                href={project.demoURL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-500"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
