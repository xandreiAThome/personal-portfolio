"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Starfield } from "@/components/atoms/starfield";
import { H1 } from "@/components/atoms/heading";
import { Subtitle } from "@/components/atoms/text";
import { SiReact, SiNodedotjs, SiDocker, SiPytorch } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";

const PythonIcon = () => {
  return (
    <Image
      src={"/Python-logo.png"}
      alt={"python logo"}
      width={32}
      height={32}
      loading="eager"
    />
  );
};

const PLANETS = [
  {
    icon: SiReact,
    color: "#61DAFB",
    radius: "var(--orbit-1)",
    duration: 20,
    delay: 0,
  },
  {
    icon: SiNodedotjs,
    color: "#339933",
    radius: "var(--orbit-2)",
    duration: 30,
    delay: -5,
  },
  {
    icon: BiLogoPostgresql,
    color: "#3178C6",
    radius: "var(--orbit-3)",
    duration: 40,
    delay: -10,
  },
  {
    icon: SiPytorch,
    color: "#EE4C2C",
    radius: "var(--orbit-4)",
    duration: 50,
    delay: -15,
  },
  {
    icon: PythonIcon,
    color: "#FFFF00",
    radius: "var(--orbit-5)",
    duration: 60,
    delay: -20,
  },
  {
    icon: SiDocker,
    color: "#2496ED",
    radius: "var(--orbit-6)",
    duration: 70,
    delay: -25,
  },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden nebula-bg"
    >
      <Starfield className="absolute inset-0" />

      {/* Solar System Visuals */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        {/* Container for orbits: w-0 h-0 prevents it from pushing layout, scale handles responsiveness */}
        <div className="relative w-0 h-0 flex items-center justify-center scale-[0.5] sm:scale-75 md:scale-70 translate-y-[-8%] sm:translate-y-0">
          {PLANETS.map((planet, i) => (
            <div
              key={i}
              className="absolute border border-white/10 rounded-full"
              style={{
                width: `calc(${planet.radius} * 2)`,
                height: `calc(${planet.radius} * 2)`,
              }}
            >
              <div
                className="absolute inset-0 orbit-container"
                style={{
                  animationDuration: `${planet.duration}s`,
                  animationDelay: `${planet.delay}s`,
                }}
              >
                <div
                  className="absolute orbit-item flex items-center justify-center bg-card/60 backdrop-blur-xl border border-white/20 rounded-full w-16 h-16 aspect-square shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                  style={{
                    left: "50%",
                    top: 0,
                    transform: "translate(-50%, -50%)",
                    animationDuration: `${planet.duration}s`,
                    animationDelay: `${planet.delay}s`,
                  }}
                >
                  <planet.icon style={{ color: planet.color }} size={32} />
                </div>
              </div>
            </div>
          ))}

          {/* Sun (Profile) - Perfectly circular and centered */}
          <div
            className="absolute z-20 w-48 h-48 md:w-56 md:h-56 aspect-square rounded-full overflow-hidden sun-element 
          bg-background flex items-center justify-center pointer-events-auto cursor-pointer 
          hover:scale-110 transition-transform duration-700 shrink-0"
          >
            <Image
              src="/taguro.jpg"
              alt="Profile"
              width={224}
              height={224}
              className="w-full h-full object-cover rounded-full"
              priority
            />
            {/* Supernova Overlay */}

            <div className="absolute inset-0 bg-linear-to-tr from-yellow-400/30 via-orange-500/20 to-red-500/30 mix-blend-overlay rounded-full" />
          </div>
        </div>
      </motion.div>

      <div className="relative z-30 min-h-screen text-center px-6 max-w-5xl mx-auto w-full">
        <div className="top-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="mb-3 inline-block"
          >
            <div className="text-5xl text-primary animate-pulse rounded-full">
              ✦
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl text-white/90 font-bold mb-6 tracking-wider hero-name"
          >
            Ellexandrei Esponilla
          </motion.div>
          <H1 className="mb-12 font-medium text-white/80 w-full text-3xl md:text-4xl tracking-tighter">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="inline-block mr-3"
            >
              Welcome to my
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="word-animate inline-block font-bold text-4xl md:text-5xl bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mr-4 hero-gradient filter drop-shadow-[0_0_10px_rgba(255,0,255,0.3)]"
            >
              Digital
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="word-animate inline-block font-bold text-4xl md:text-5xl bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent hero-gradient filter drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]"
            >
              Cosmos
            </motion.span>
          </H1>
        </div>
        <div className="bottom-10 absolute left-0 right-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Subtitle className="text-base text-foreground/70 mb-12 max-w-xl mx-auto hero-subtitle font-medium leading-relaxed">
              Crafting high-performance digital experiences at the intersection
              of
              <span className="text-violet-600 mx-1">Creativity</span> and{" "}
              <span className="text-secondary mx-1">Engineering</span>.
            </Subtitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center hero-buttons px-8"
          >
            <a
              href="#projects"
              className="px-10 py-4 bg-primary text-white rounded-full hover:bg-primary/80 transition-all hover:scale-105 font-bold text-sm tracking-widest uppercase shadow-xl shadow-primary/30"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="px-10 py-4 border-2 border-white/10 text-white rounded-full hover:bg-white/5 transition-all hover:scale-105 font-bold text-sm tracking-widest uppercase"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
