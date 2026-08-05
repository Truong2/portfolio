import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SkillBadge } from "@/components/ui/skill-badge";
import { skillCategories } from "@/data/profile";

export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto w-full max-w-4xl px-6 py-24">
      <RevealOnScroll>
        <h2 className="text-sm font-medium uppercase tracking-widest text-accent">
          Technical Skills
        </h2>
        <p className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
          A toolkit shaped by banking, e-commerce, GIS, and Web3 projects.
        </p>
      </RevealOnScroll>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {skillCategories.map((category, i) => (
          <RevealOnScroll key={category.id} delay={Math.min(i * 0.05, 0.3)}>
            <h3 className="text-sm font-semibold text-foreground">{category.label}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <SkillBadge key={skill} label={skill} />
              ))}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
