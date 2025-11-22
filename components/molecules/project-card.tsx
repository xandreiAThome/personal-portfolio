import { cn } from "@/lib/utils"
import { H3 } from "@/components/atoms/heading"
import { Paragraph } from "@/components/atoms/text"
import { Badge } from "@/components/atoms/badge"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
  className?: string
}

export function ProjectCard({ title, description, image, tags, link, className }: ProjectCardProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div
        className={cn(
          "group rounded-lg overflow-hidden bg-card border border-border/60",
          "hover:border-primary/80 hover:shadow-lg transition-all duration-300",
          "hover:shadow-primary/20 cursor-pointer",
          className,
        )}
      >
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden bg-muted">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Project Info */}
        <div className="p-6">
          <H3 className="mb-2 text-foreground">{title}</H3>
          <Paragraph className="text-foreground/70 mb-4 text-sm">{description}</Paragraph>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} label={tag} variant="secondary" className="text-xs" />
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}
