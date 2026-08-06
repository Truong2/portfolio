import { Boxes, Database, Map, type LucideIcon } from "lucide-react";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { skillCategories } from "@/data/profile";

interface CapabilityPillar {
  title: string;
  description: string;
  icon: LucideIcon;
  categoryIds: string[];
  outcome: string;
}

const pillars: CapabilityPillar[] = [
  {
    title: "Product interface systems",
    description:
      "Architecture and reusable UI foundations for large workflows, design systems, forms, and multi-team products.",
    icon: Boxes,
    categoryIds: ["languages", "frontend", "forms", "tools"],
    outcome: "Maintainable product delivery",
  },
  {
    title: "Data and realtime applications",
    description:
      "Predictable client state, API integration, caching, live updates, and high-density operational interfaces.",
    icon: Database,
    categoryIds: ["state-data", "api-realtime", "backend-basics"],
    outcome: "Reliable data workflows",
  },
  {
    title: "Spatial and emerging platforms",
    description:
      "Interactive maps, visualization, WebGL experiences, and Web3 product flows where clarity and performance matter.",
    icon: Map,
    categoryIds: ["visualization", "web3"],
    outcome: "Complex systems made usable",
  },
];

function getSkills(categoryIds: string[]) {
  return categoryIds.flatMap(
    (id) => skillCategories.find((category) => category.id === id)?.skills ?? [],
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell scroll-mt-20">
      <RevealOnScroll>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="section-kicker">Core capabilities</p>
            <h2 className="section-title mt-4">
              A focused stack for <span className="text-gradient">enterprise product delivery.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:justify-self-end">
            Technologies are selected around product constraints rather than trends: maintainability,
            data complexity, team scale, performance, and the quality of the end-user workflow.
          </p>
        </div>
      </RevealOnScroll>

      <div className="mt-12 divide-y divide-border/70 border-y border-border/70">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          const skills = getSkills(pillar.categoryIds);

          return (
            <RevealOnScroll key={pillar.title} delay={Math.min(index * 0.06, 0.18)}>
              <article className="grid gap-7 py-9 md:grid-cols-[64px_0.75fr_1.25fr] md:items-start md:gap-8 lg:py-12">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-border/70 bg-card/60 text-accent shadow-sm">
                  <Icon className="size-6" aria-hidden="true" />
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Capability 0{index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-accent">{pillar.outcome}</p>
                </div>

                <div>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    {pillar.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {skills.map((skill) => (
                      <span key={skill} className="text-sm font-medium text-foreground/80">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
