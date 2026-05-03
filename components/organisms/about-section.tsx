import { H2 } from "@/components/atoms/heading";
import { Paragraph } from "@/components/atoms/text";
import aboutData from "@/data/about.json";
import { IoDownload } from "react-icons/io5";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-32 px-6 bg-background/50 min-h-screen flex items-center nebula-bg"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <span className="text-secondary tracking-widest text-xs uppercase font-mono font-bold">
              Biography
            </span>
            <div className="w-12 h-px bg-secondary/40" />
          </div>
          <H2 className="text-5xl md:text-7xl tracking-tighter font-black">
            About Me
          </H2>
        </div>

        <div className="space-y-10 max-w-3xl">
          <Paragraph className="text-lg md:text-2xl text-foreground/90 leading-relaxed font-sans font-medium">
            {aboutData.about.intro}
          </Paragraph>

          <Paragraph className="text-lg text-foreground/60 leading-relaxed">
            {aboutData.about.description}
          </Paragraph>

          <div className="flex flex-col items-center pt-10">
            <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-secondary font-bold mb-10">
              Technical Stack
            </h3>
            <div className="flex flex-wrap justify-center gap-6 items-center opacity-80 hover:opacity-100 transition-opacity duration-500">
              {aboutData.skills.map((skill) => (
                <div key={skill.name} className="relative group">
                  <img
                    src={skill.badge}
                    alt={skill.name}
                    className="h-8 md:h-10 transition-all duration-500 hover:scale-125 hover:-translate-y-2"
                  />
                  <div className="absolute -inset-2 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {aboutData.about.resumeUrl && (
            <div className="pt-12">
              <a
                href={aboutData.about.resumeUrl}
                download
                className="inline-flex items-center gap-4 px-10 py-4 bg-secondary text-white rounded-full hover:bg-secondary/80 transition-all hover:scale-105 font-bold text-sm tracking-widest uppercase shadow-lg shadow-secondary/20"
              >
                <IoDownload size={20} />
                Download Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
