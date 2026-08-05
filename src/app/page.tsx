import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { EducationContactSection } from "@/components/sections/education-contact-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceTimeline />
      <EducationContactSection />
    </main>
  );
}
