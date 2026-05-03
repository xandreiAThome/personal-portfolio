"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { H2 } from "@/components/atoms/heading";
import { Paragraph } from "@/components/atoms/text";
import aboutData from "@/data/about.json";
import { IoDownload } from "react-icons/io5";

export function AboutSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section
      id="about"
      className="py-32 px-6 bg-background/50 min-h-screen flex items-center nebula-bg"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2">
            <span className="text-secondary tracking-widest text-xs uppercase font-mono font-bold">
              Biography
            </span>
            <div className="w-12 h-px bg-secondary/40" />
          </div>
          <H2 className="text-5xl md:text-7xl tracking-tighter font-black">
            About Me
          </H2>
        </motion.div>

        <div className="space-y-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Paragraph className="text-lg md:text-2xl text-foreground/90 leading-relaxed font-sans font-medium">
              {aboutData.about.intro}
            </Paragraph>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Paragraph className="text-lg text-foreground/60 leading-relaxed">
              {aboutData.about.description}
            </Paragraph>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center pt-10"
          >
            <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-secondary font-bold mb-10">
              Technical Stack
            </h3>
            <div className="flex flex-wrap justify-center gap-6 items-center opacity-80 hover:opacity-100 transition-opacity duration-500">
              {aboutData.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + index * 0.05,
                    type: "spring",
                  }}
                  className="relative group"
                >
                  <img
                    src={skill.badge}
                    alt={skill.name}
                    className="h-8 md:h-10 transition-all duration-500 hover:scale-125 hover:-translate-y-2"
                  />
                  <div className="absolute -inset-2 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {aboutData.about.resumeUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-12 flex flex-col items-center gap-4"
            >
              <button
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-4 px-10 py-4 bg-primary text-white rounded-full hover:bg-primary/80 transition-all hover:scale-105 font-bold text-sm tracking-widest uppercase shadow-lg shadow-primary/20"
              >
                View Resume
              </button>
              <a
                href={aboutData.about.resumeUrl}
                download
                className="inline-flex items-center gap-4 px-10 py-4 bg-secondary text-white rounded-full hover:bg-secondary/80 transition-all hover:scale-105 font-bold text-sm tracking-widest uppercase shadow-lg shadow-secondary/20"
              >
                <IoDownload size={20} />
                Download Resume
              </a>
            </motion.div>
          )}

          <AnimatePresence>
            {isResumeOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                onClick={() => setIsResumeOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-5xl h-[90vh] bg-background rounded-lg overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="absolute top-4 right-4 z-10 p-2 bg-secondary/90 text-white rounded-full hover:bg-secondary transition-colors"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                  <iframe
                    src={aboutData.about.resumeUrl}
                    className="w-full h-full"
                    title="Resume PDF Viewer"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
