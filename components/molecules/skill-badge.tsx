import { Badge } from "@/components/atoms/badge"

interface SkillBadgeProps {
  skill: string
  level?: "expert" | "intermediate" | "learning"
}

export function SkillBadge({ skill, level = "expert" }: SkillBadgeProps) {
  const variant = level === "expert" ? "primary" : level === "intermediate" ? "secondary" : "accent"

  return <Badge label={skill} variant={variant} />
}
