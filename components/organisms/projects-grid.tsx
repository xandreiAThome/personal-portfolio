"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { ProjectCard } from "@/components/molecules/project-card";
import { H2 } from "@/components/atoms/heading";
import projects from "@/data/projects.json";

export function ProjectsGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  } satisfies Variants;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  } satisfies Variants;

  return (
    <section id="projects" className="py-40 px-6 nebula-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-secondary tracking-widest text-xs uppercase font-mono font-bold">
                Showcase
              </span>
              <div className="w-12 h-px bg-primary/30" />
            </div>
            <H2 className="text-5xl md:text-8xl tracking-tighter font-black">
              Featured Projects
            </H2>
          </div>
          <p className="text-foreground/70 text-xl md:text-2xl tracking-tight max-w-3xl mx-auto font-medium leading-relaxed">
            A curated selection of work spanning{" "}
            <span className="text-violet-600">design</span>,{" "}
            <span className="text-secondary">development</span>, and innovation
            in the digital cosmos.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                link={project.link}
                isPrivate={project.isPrivate}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
