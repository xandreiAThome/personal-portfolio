import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface HeadingProps {
  children: ReactNode
  className?: string
}

export function H1({ children, className }: HeadingProps) {
  return (
    <h1 className={cn("text-5xl md:text-6xl font-bold text-balance leading-tight tracking-tight", className)}>
      {children}
    </h1>
  )
}

export function H2({ children, className }: HeadingProps) {
  return <h2 className={cn("text-3xl md:text-4xl font-bold text-balance tracking-tight", className)}>{children}</h2>
}

export function H3({ children, className }: HeadingProps) {
  return <h3 className={cn("text-xl md:text-2xl font-semibold tracking-wide", className)}>{children}</h3>
}
