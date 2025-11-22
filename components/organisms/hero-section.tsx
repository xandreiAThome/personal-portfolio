"use client";

import { useEffect, useRef } from "react";
import { H1 } from "@/components/atoms/heading";
import { Subtitle } from "@/components/atoms/text";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw starfield
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      vx: number;
      vy: number;
    }> = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5,
        opacity: Math.random() * 0.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(15, 20, 35, 1)";
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

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8 inline-block">
          <div className="text-6xl mb-4">✦</div>
        </div>

        <div className="text-lg text-white font-semibold font-sans mb-6 tracking- hero-name">
          Hi! I&apos;m Ellexandrei Esponilla
        </div>

        <H1 className="mb-8 text-white">
          {["Welcome", "to", "My"].map((word, i) => (
            <span key={i} className="word-animate mr-2">
              {word}
            </span>
          ))}
          <span className="word-animate bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mr-2 hero-gradient">
            Digital
          </span>
          <span className="word-animate bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent hero-gradient">
            Cosmos
          </span>
        </H1>

        <Subtitle className="text-lg text-foreground/75 mb-12 max-w-2xl mx-auto hero-subtitle">
          Exploring the intersection of design and development through
          innovation and problem solving
        </Subtitle>

        <div className="flex gap-4 justify-center hero-buttons">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm tracking-tight"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium text-sm tracking-tight"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
