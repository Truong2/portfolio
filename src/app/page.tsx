import { AboutSection } from "@/components/sections/about-section";
import { EducationContactSection } from "@/components/sections/education-contact-section";
import { EngineeringStandardsSection } from "@/components/sections/engineering-standards-section";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceTimeline />
      <EngineeringStandardsSection />
      <EducationContactSection />
    </main>
  );
}
