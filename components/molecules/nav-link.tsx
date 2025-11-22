"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
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
        "relative px-2 py-1 text-sm font-medium transition-all duration-200 w-full",
        "hover:text-primary text-foreground/80",
        active &&
          "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
      )}
    >
      {label}
    </Link>
  );
}
