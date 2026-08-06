import { Boxes, Database, Map, type LucideIcon } from "lucide-react";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { skillCategories } from "@/data/profile";

interface CapabilityPillar {
  title: string;
  description: string;
  icon: LucideIcon;
  categoryIds: string[];
}

const pillars: CapabilityPillar[] = [
  {
    title: "Product Interface Systems",
    description:
      "Scalable frontend architecture, reusable components, design-system implementation, complex forms, validation, and maintainable product foundations.",
    icon: Boxes,
    categoryIds: ["languages", "frontend", "forms", "tools"],
  },
  {
    title: "Data & Realtime Applications",
    description:
      "Server-state management, REST integration, live updates, dashboards, operational workflows, and performance-conscious data interfaces.",
    icon: Database,
    categoryIds: ["state-data", "api-realtime", "backend-basics"],
  },
  {
    title: "Spatial & Emerging Platforms",
    description:
      "GIS and map-based systems, high-density visualization, WebGL interaction, wallet integrations, NFT flows, and Web3 product experiences.",
    icon: Map,
    categoryIds: ["visualization", "web3"],
  },
];

function getSkills(categoryIds: string[]) {
  return Array.from(
    new Set(
      categoryIds.flatMap(
        (id) => skillCategories.find((category) => category.id === id)?.skills ?? [],
      ),
    ),
  );
}

function CapabilityVisual({ icon: Icon, index }: { icon: LucideIcon; index: number }) {
  return (
    <div className="surface-grid relative flex h-52 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-background/65">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_56%)]" />
      <div className="absolute size-32 rotate-45 rounded-3xl border border-primary/25 bg-primary/5 shadow-[0_0_50px_rgba(124,92,255,0.16)]" />
      <div className="absolute size-24 -rotate-12 rounded-2xl border border-accent/30 bg-accent/8 shadow-[0_0_45px_rgba(34,211,238,0.14)]" />
      <div className="relative flex size-16 items-center justify-center rounded-2xl border border-foreground/10 bg-card/85 text-accent shadow-xl backdrop-blur-xl">
        <Icon className="size-8" aria-hidden="true" />
      </div>
      <span className="absolute left-4 top-4 number-label">0{index + 1}</span>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell scroll-mt-20">
      <RevealOnScroll>
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-kicker">What I Do Best</p>
            <h2 className="section-title mt-6">
              Capability <span className="text-gradient">Pillars</span>
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:justify-self-end">
            Three core capability groups describe how I approach enterprise frontend delivery:
            product foundations, reliable data workflows, and complex spatial or emerging platforms.
          </p>
        </div>
      </RevealOnScroll>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          const skills = getSkills(pillar.categoryIds).slice(0, 8);

          return (
            <RevealOnScroll key={pillar.title} delay={index * 0.07}>
              <article className="enterprise-panel card-hover h-full rounded-3xl p-4 sm:p-5">
                <CapabilityVisual icon={Icon} index={index} />
                <div className="px-1 pb-2 pt-7 sm:px-2">
                  <h3 className="text-2xl font-semibold tracking-[-0.035em] text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {pillar.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="tech-chip">
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
