"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function NavLink({
  href,
  label,
  active = false,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={cn(
        "relative py-1 text-sm font-semibold tracking-tight transition-all duration-300 block",
        "hover:text-primary text-foreground/60",
        active ? "text-primary" : "text-foreground/60",
      )}
    >
      {label}
      {active && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary shadow-[0_0_12px_var(--primary)] rounded-full" />
      )}
    </Link>
  );
}
