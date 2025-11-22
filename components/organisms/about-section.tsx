import { H2 } from "@/components/atoms/heading";
import { Paragraph } from "@/components/atoms/text";
import aboutData from "@/data/about.json";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 px-6 bg-background/30 min-h-screen flex items-center"
    >
      <div className="max-w-4xl mx-auto">
        <H2 className="mb-8">About Me</H2>

        <Paragraph className="mb-6 text-foreground/80">
          {aboutData.about.intro}
        </Paragraph>

        <Paragraph className="mb-10 text-foreground/80">
          {aboutData.about.description}
        </Paragraph>

        <div>
          <h3 className="text-lg font-semibold mb-6 tracking-tight">
            Skills & Technologies
          </h3>
          <div className="flex flex-wrap gap-3 items-center">
            {aboutData.skills.map((skill) => (
              <img
                key={skill.name}
                src={skill.badge}
                alt={skill.name}
                className="h-5 sm:h-8"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
