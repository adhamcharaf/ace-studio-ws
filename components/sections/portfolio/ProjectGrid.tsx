"use client";

import { useStaggerAnimation } from "@/lib/hooks";
import ProjectCard from "./ProjectCard";
import { GlowCircle, DecorativeLine } from "@/components/decorative";
import type { Project } from "@/types";

// Placeholder projects
const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Projet Exemple 1",
    category: "Site Vitrine",
    year: "2024",
    imageSrc: "/images/portfolio/placeholder-1.png",
    href: "#",
    description: "Un site vitrine moderne et élégant.",
  },
  {
    id: "2",
    title: "Projet Exemple 2",
    category: "Identité Digitale",
    year: "2024",
    imageSrc: "/images/portfolio/placeholder-2.png",
    href: "#",
    description: "Identité complète pour une startup.",
  },
  {
    id: "3",
    title: "Projet Exemple 3",
    category: "Projet Ambitieux",
    year: "2024",
    imageSrc: "/images/portfolio/placeholder-3.png",
    href: "#",
    description: "Plateforme web complexe.",
  },
];

export default function ProjectGrid() {
  const containerRef = useStaggerAnimation<HTMLDivElement>(
    ".project-card",
    "slide-up",
    { stagger: 0.15 }
  );

  return (
    <section className="relative py-16 md:py-24 bg-[var(--theme-background-alt)] overflow-hidden">
      {/* Decorative elements */}
      <GlowCircle
        size="lg"
        position={{ top: "20%", left: "-12%" }}
        delay={-2}
      />
      <GlowCircle
        size="md"
        position={{ bottom: "10%", right: "-8%" }}
        delay={-5}
      />
      <DecorativeLine position="left" top="15%" width={80} opacity={0.2} />
      <DecorativeLine position="right" bottom="20%" width={100} opacity={0.25} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PLACEHOLDER_PROJECTS.map((project) => (
            <div key={project.id} className="project-card">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
