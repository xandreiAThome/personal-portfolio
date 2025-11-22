import { cn } from "@/lib/utils"

interface BadgeProps {
  label: string
  variant?: "primary" | "secondary" | "accent"
  className?: string
}

export function Badge({ label, variant = "secondary", className }: BadgeProps) {
  const baseStyles = "px-3 py-1.5 rounded-md text-xs font-medium tracking-tight transition-colors"
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  }

  return <span className={cn(baseStyles, variants[variant], className)}>{label}</span>
}
