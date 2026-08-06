import { AboutSection } from "@/components/sections/about-section";
import { EducationContactSection } from "@/components/sections/education-contact-section";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioDashboardSection } from "@/components/sections/portfolio-dashboard-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <HeroSection />
      <PortfolioDashboardSection />
      <AboutSection />
      <ExperienceTimeline />
      <EducationContactSection />
    </main>
  );
}
