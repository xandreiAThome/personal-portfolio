"use client";

import { NavLink } from "@/components/molecules/nav-link";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("#home");

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-semithin text-primary">
          xandreiat.homes ✦
        </div>

        {/* Nav Links */}
        <div className="sm:flex items-center gap-6 hidden">
          {navItems.map((item) => (
            <NavLink
              onClick={() => setActiveSection(item.href)}
              key={item.href}
              href={item.href}
              label={item.label}
              active={activeSection === item.href}
            />
          ))}
        </div>
        <div className="sm:hidden block">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoIosMenu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {navItems.map((item) => (
                <DropdownMenuItem className="w-full">
                  <NavLink
                    onClick={() => setActiveSection(item.href)}
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={activeSection === item.href}
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
