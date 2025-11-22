import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface TextProps {
  children: ReactNode
  className?: string
}

export function Paragraph({ children, className }: TextProps) {
  return <p className={cn("text-base leading-7 text-foreground/90 tracking-tight", className)}>{children}</p>
}

export function Subtitle({ children, className }: TextProps) {
  return (
    <p className={cn("text-lg leading-relaxed text-foreground/70 font-light tracking-wide", className)}>{children}</p>
  )
}
