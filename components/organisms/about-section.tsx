"use client";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { H2 } from "@/components/atoms/heading";
import { Paragraph } from "@/components/atoms/text";
import aboutData from "@/data/about.json";
import { IoDownload } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
                  <Image
                    src={skill.badge}
                    alt={skill.name}
                    width={60}
                    height={40}
                    unoptimized={true}
                    className="h-8 md:h-10 w-auto transition-all duration-500 hover:scale-125 hover:-translate-y-2"
                  />
                  <div className="absolute -inset-2 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {aboutData.about.resumeUrl && (
            <div className="pt-12 flex flex-col items-center gap-4">
              <Dialog open={isResumeOpen} onOpenChange={setIsResumeOpen}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="inline-flex items-center gap-4 px-10 py-4 bg-primary text-white rounded-full hover:bg-primary/80 transition-all hover:scale-105 font-bold text-sm tracking-widest uppercase shadow-lg shadow-primary/20"
                  >
                    View Resume
                  </button>
                </motion.div>

                <DialogContent className="min-w-full h-full bg-background/40 backdrop-blur-lg border-white/10 p-0 overflow-hidden flex flex-col shadow-[0_0_100px_-20px_rgba(139,92,246,0.3)]">
                  <DialogHeader className="p-4 md:p-6 border-b border-white/5 flex flex-row items-center justify-between sm:text-left pr-16">
                    <div className="flex flex-col gap-1">
                      <DialogTitle className="text-lg md:text-xl font-bold tracking-tight text-foreground text-left">
                        Curriculum Vitae
                      </DialogTitle>
                      <DialogDescription className="sr-only">
                        Embedded PDF viewer for Ellexandrei Esponilla&apos;s
                        resume.
                      </DialogDescription>
                      <span className="text-[10px] text-foreground/40 font-mono uppercase tracking-widest text-left">
                        Ellexandrei Esponilla
                      </span>
                    </div>
                    <a
                      href={aboutData.about.resumeUrl}
                      download
                      className="inline-flex mr-10 items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full hover:bg-primary/80 transition-all hover:scale-105 font-bold text-[10px] md:text-xs tracking-widest uppercase shadow-lg shadow-primary/30"
                    >
                      <IoDownload size={14} />
                      <span>Download PDF</span>
                    </a>
                  </DialogHeader>
                  <div className="flex-1 w-full bg-[#0a0a0a]">
                    <iframe
                      src={`${aboutData.about.resumeUrl}#toolbar=0`}
                      className="w-full h-full border-none"
                      title="Resume PDF Viewer"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
