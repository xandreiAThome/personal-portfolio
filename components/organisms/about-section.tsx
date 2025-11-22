import { H2 } from "@/components/atoms/heading";
import { Paragraph } from "@/components/atoms/text";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 px-6 bg-background/30 min-h-screen flex items-center"
    >
      <div className="max-w-4xl mx-auto">
        <H2 className="mb-8">About Me</H2>

        <Paragraph className="mb-6 text-foreground/80">
          I&apos;m the Frontend Domain Lead at La Salle Computer Society (LSCS)
          and a 3rd-year Computer Science student at De La Salle University
          (DLSU). I blend product-minded frontend engineering with systems
          thinking. I&apos;m obsessed with homelabbing, self hosting various
          technologies, and building reliable developer environments that speed
          up iteration.
        </Paragraph>

        <Paragraph className="mb-10 text-foreground/80">
          I&apos;ve worked on projects in natural language processing and
          computer vision, including handwriting recognition and object
          classification. I enjoy turning ML research into usable interfaces,
          prioritizing accessibility, performance, and clean UX. I love
          collaborating with fellow developers to implement modern and
          performant web applications.
        </Paragraph>

        <div>
          <h3 className="text-lg font-semibold mb-6 tracking-tight">
            Skills & Technologies
          </h3>
          <div className="flex flex-wrap gap-3 items-center">
            <img
              src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"
              alt="React"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white"
              alt="React Query"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"
              alt="Node.js"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue"
              alt="Python"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"
              alt="Next.js"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"
              alt="Docker"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"
              alt="Express.js"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"
              alt="Flask"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"
              alt="Firebase"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"
              alt="shadcn/ui"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E"
              alt="Vite"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white"
              alt="C"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"
              alt="TypeScript"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"
              alt="React Native"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/Proxmox-E57000?style=for-the-badge&logo=proxmox&logoColor=white"
              alt="Proxmox"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white"
              alt="Java"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white"
              alt="PyTorch"
              className="h-5 sm:h-8"
            />
            <img
              src="https://img.shields.io/badge/jupyter-%23FA0F00.svg?style=for-the-badge&logo=jupyter&logoColor=white"
              alt="Jupyter"
              className="h-5 sm:h-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
