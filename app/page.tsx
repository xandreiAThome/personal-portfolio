import { Navigation } from "@/components/organisms/navigation"
import { HeroSection } from "@/components/organisms/hero-section"
import { AboutSection } from "@/components/organisms/about-section"
import { ProjectsGrid } from "@/components/organisms/projects-grid"
import { ContactSection } from "@/components/organisms/contact-section"
import { Footer } from "@/components/organisms/footer"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsGrid />
      <ContactSection />
      <Footer />
    </main>
  )
}
