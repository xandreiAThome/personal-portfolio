import { cn } from "@/lib/utils";
import { H3 } from "@/components/atoms/heading";
import { Paragraph } from "@/components/atoms/text";
import { Badge } from "@/components/atoms/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  isPrivate?: boolean;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  link,
  isPrivate,
  className,
}: ProjectCardProps) {
  const cardContent = (
    <div
      className={cn(
        "group rounded-lg overflow-hidden bg-card border border-border/60",
        "hover:border-primary/80 hover:shadow-lg transition-all duration-300",
        "hover:shadow-primary/20",
        link ? "cursor-pointer" : "cursor-default",
        className
      )}
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <H3 className="text-foreground">{title}</H3>
          {isPrivate && (
            <Badge
              label="Private"
              variant="secondary"
              className="text-xs whitespace-nowrap"
            />
          )}
        </div>
        <Paragraph className="text-foreground/70 mb-4 text-sm">
          {description}
        </Paragraph>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              label={tag}
              variant="secondary"
              className="text-xs"
            />
          ))}
        </div>
      </div>
    </div>
  );

  // If link is empty or not provided, render as div
  if (!link) {
    return cardContent;
  }

  // Otherwise render as anchor tag
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {cardContent}
    </a>
  );
}
