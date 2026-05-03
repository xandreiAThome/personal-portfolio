"use client";

import { useEffect, useRef } from "react";
import { H1 } from "@/components/atoms/heading";
import { Subtitle } from "@/components/atoms/text";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiDocker,
  SiPython,
} from "react-icons/si";

const PLANETS = [
  {
    icon: SiReact,
    color: "#61DAFB",
    radius: "var(--orbit-1)",
    duration: 20,
    delay: 0,
  },
  {
    icon: SiNextdotjs,
    color: "#ffffff",
    radius: "var(--orbit-2)",
    duration: 30,
    delay: -5,
  },
  {
    icon: SiTypescript,
    color: "#3178C6",
    radius: "var(--orbit-3)",
    duration: 40,
    delay: -10,
  },
  {
    icon: SiTailwindcss,
    color: "#06B6D4",
    radius: "var(--orbit-4)",
    duration: 50,
    delay: -15,
  },
  {
    icon: SiNodedotjs,
    color: "#339933",
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Draw starfield
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      vx: number;
      vy: number;
    }> = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8,
        opacity: Math.random() * 0.7 + 0.3,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(6, 6, 6, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", setCanvasSize);
    return () => window.removeEventListener("resize", setCanvasSize);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden nebula-bg"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Solar System Visuals */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
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
          border-2 border-white/40 bg-background flex items-center justify-center pointer-events-auto cursor-pointer 
          hover:scale-110 transition-transform duration-700 shadow-[0_0_100px_var(--primary)] shrink-0"
          >
            <img
              src="/temp.webp"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.currentTarget.src = "https://github.com/shadcn.png";
              }}
            />
            {/* Supernova Overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-primary/30 via-accent/10 to-secondary/30 mix-blend-overlay rounded-full" />
          </div>
        </div>
      </div>

      <div className="relative z-30 min-h-screen text-center px-6 max-w-5xl mx-auto w-full">
        <div className="top-20 relative">
          <div className="mb-3 inline-block">
            <div className="text-5xl text-primary animate-pulse rounded-full">
              ✦
            </div>
          </div>
          <div className="text-2xl text-white font-bold mb-6 tracking-tight hero-name">
            Ellexandrei Esponilla
          </div>
          <H1 className="mb-12 font-medium text-white/80 w-full text-3xl md:text-4xl tracking-tighter">
            Welcome to my{" "}
            <span className="word-animate font-bold text-4xl md:text-5xl bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mr-4 hero-gradient filter drop-shadow-[0_0_10px_rgba(255,0,255,0.3)]">
              Digital
            </span>
            <span className="word-animate font-bold text-4xl md:text-5xl bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent hero-gradient filter drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
              Cosmos
            </span>
          </H1>
        </div>
        <div className="bottom-10 absolute left-0 right-0">
          <Subtitle className="text-base text-foreground/70 mb-12 max-w-xl mx-auto hero-subtitle font-medium leading-relaxed">
            Crafting high-performance digital experiences at the intersection of
            <span className="text-violet-600 mx-1">Art</span> and{" "}
            <span className="text-secondary mx-1">Engineering</span>.
          </Subtitle>
          <div className="flex flex-col sm:flex-row gap-6 justify-center hero-buttons px-8">
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
          </div>
        </div>
      </div>
    </section>
  );
}
