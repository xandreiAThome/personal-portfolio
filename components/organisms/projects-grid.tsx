import { ProjectCard } from "@/components/molecules/project-card";
import { H2 } from "@/components/atoms/heading";
import projects from "@/data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  isPrivate?: boolean;
}

export function ProjectsGrid() {
  return (
    <section
      id="projects"
      className="py-20 px-6 bg-linear-to-b from-background via-background/50 to-background/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <H2 className="mb-4">Featured Projects</H2>
          <p className="text-foreground/70 text-lg tracking-tight">
            A curated selection of work spanning design, development, and
            innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              link={project.link}
              isPrivate={project.isPrivate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
