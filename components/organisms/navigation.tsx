"use client";

import { NavLink } from "@/components/molecules/nav-link";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { IoIosMenu } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

  useEffect(() => {
    // Create intersection observer to track which section is in view
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is in the middle of the viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // Observe all sections
    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [navItems]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="text-lg font-bold tracking-tighter text-foreground group cursor-pointer flex items-center gap-2">
          <span className="text-primary">✦</span>
          <span>xandreiat.homes</span>
        </div>

        {/* Nav Links */}
        <div className="sm:flex items-center gap-10 hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={activeSection === item.href}
            />
          ))}
        </div>

        <div className="sm:hidden block">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-lg bg-white/5 border border-white/10 text-foreground">
              <IoIosMenu size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background/95 backdrop-blur-xl border-white/10 min-w-[12rem]">
              {navItems.map((item) => (
                <DropdownMenuItem
                  className="w-full focus:bg-white/10"
                  key={item.href}
                >
                  <NavLink
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
    </motion.nav>
  );
}
