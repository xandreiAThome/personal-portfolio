import { ProjectCard } from "@/components/molecules/project-card"
import { H2 } from "@/components/atoms/heading"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "Stellar Dashboard",
    description: "An interactive analytics dashboard with real-time data visualization and cosmic UI elements.",
    image: "/purple-dashboard-interface.jpg",
    tags: ["React", "TypeScript", "D3.js"],
    link: "#",
  },
  {
    id: "2",
    title: "Orbit E-Commerce",
    description: "Full-stack e-commerce platform with smooth animations and celestial design language.",
    image: "/space-themed-ecommerce-store.jpg",
    tags: ["Next.js", "Stripe", "Tailwind"],
    link: "#",
  },
  {
    id: "3",
    title: "Galaxy AI Assistant",
    description: "AI-powered chatbot with natural language processing and conversational interface.",
    image: "/ai-chat-bot-cosmic-interface.jpg",
    tags: ["AI/ML", "Python", "React"],
    link: "#",
  },
  {
    id: "4",
    title: "Cosmic Design System",
    description: "Comprehensive component library built with accessibility and space theme in mind.",
    image: "/design-system-components.png",
    tags: ["Storybook", "React", "CSS"],
    link: "#",
  },
  {
    id: "5",
    title: "Nebula Portfolio Generator",
    description: "Tool to generate stunning portfolios with AI-generated content and space visuals.",
    image: "/portfolio-generator-app.png",
    tags: ["Next.js", "AI", "Tailwind"],
    link: "#",
  },
  {
    id: "6",
    title: "Celestial Music Player",
    description: "Immersive music player with visualizer and ambient space-themed interface.",
    image: "/music-player-visualizer.jpg",
    tags: ["Web Audio", "Canvas", "React"],
    link: "#",
  },
]

export function ProjectsGrid() {
  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-b from-background via-background/50 to-background/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <H2 className="mb-4">Featured Projects</H2>
          <p className="text-foreground/70 text-lg tracking-tight">
            A curated selection of work spanning design, development, and innovation
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
            />
          ))}
        </div>
      </div>
    </section>
  )
}
