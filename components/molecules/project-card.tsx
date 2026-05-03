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
        "group relative rounded-3xl overflow-hidden bg-card/40 backdrop-blur-xl border border-white/10 flex flex-col h-full",
        "hover:border-primary/50 hover:shadow-[0_0_50px_-12px_rgba(255,0,255,0.2)] transition-all duration-700",
        "hover:-translate-y-3",
        link ? "cursor-pointer" : "cursor-default",
        className,
      )}
    >
      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-primary/20 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Project Image */}
      <div className="relative h-60 overflow-hidden bg-muted shrink-0">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/10 to-transparent" />

        {isPrivate && (
          <div className="absolute top-5 right-5">
            <Badge
              label="Private"
              variant="secondary"
              className="text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/10 text-primary font-bold"
            />
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-8 relative z-10 flex flex-col grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--primary)]" />
          <H3 className="text-lg font-bold group-hover:text-primary transition-colors tracking-tight leading-none">
            {title}
          </H3>
        </div>
        <Paragraph className="text-foreground/70 mb-8 text-sm leading-relaxed line-clamp-3">
          {description}
        </Paragraph>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase tracking-[0.2em] bg-primary/5 border border-primary/10 text-violet-600/90 group-hover:text-primary transition-colors"
            >
              {tag}
            </span>
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
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      {cardContent}
    </a>
  );
}
