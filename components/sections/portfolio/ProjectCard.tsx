"use client";

import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.href}
      className={cn(
        "group block bg-[var(--ace-white)] rounded-2xl overflow-hidden shadow-lg",
        "transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      )}
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-[var(--ace-off-white)] relative overflow-hidden">
        {/* Placeholder for image */}
        <div className="absolute inset-0 flex items-center justify-center text-[var(--ace-gray)] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110">
          <svg
            className="w-16 h-16 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-[var(--ace-black)]/80 opacity-0",
            "group-hover:opacity-100 transition-all duration-300 delay-100",
            "flex items-center justify-center"
          )}
        >
          <span className="text-[var(--ace-white)] font-medium flex items-center gap-2">
            Voir le projet
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-[var(--ace-black)] font-[var(--font-playfair)]">
          {project.title}
        </h3>
        <p className="text-[var(--ace-gray)] text-sm">
          {project.category} &bull; {project.year}
        </p>
      </div>
    </a>
  );
}
