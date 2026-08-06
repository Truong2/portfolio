import {
  Boxes,
  Braces,
  Database,
  FileCheck2,
  GitBranch,
  Map,
  Radio,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SkillBadge } from "@/components/ui/skill-badge";
import { skillCategories } from "@/data/profile";

interface CategoryMeta {
  icon: LucideIcon;
  code: string;
  description: string;
  accent: string;
}

const defaultCategoryMeta: CategoryMeta = {
  icon: Braces,
  code: "CORE",
  description: "Production-ready frontend engineering tools and patterns.",
  accent: "from-primary/20 via-primary/5 to-transparent",
};

const categoryMeta: Record<string, CategoryMeta> = {
  languages: {
    icon: Braces,
    code: "01",
    description: "Typed foundations for maintainable product development.",
    accent: "from-violet-500/20 via-violet-500/5 to-transparent",
  },
  frontend: {
    icon: Boxes,
    code: "02",
    description: "Modern frameworks, design systems, and responsive interfaces.",
    accent: "from-cyan-500/20 via-cyan-500/5 to-transparent",
  },
  "state-data": {
    icon: Database,
    code: "03",
    description: "Predictable server state, caching, and client data flows.",
    accent: "from-blue-500/20 via-blue-500/5 to-transparent",
  },
  forms: {
    icon: FileCheck2,
    code: "04",
    description: "Reliable business forms with schema-driven validation.",
    accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
  },
  "api-realtime": {
    icon: Radio,
    code: "05",
    description: "REST integrations and responsive real-time experiences.",
    accent: "from-amber-500/20 via-amber-500/5 to-transparent",
  },
  visualization: {
    icon: Map,
    code: "06",
    description: "High-density charts, maps, and spatial data interfaces.",
    accent: "from-teal-500/20 via-teal-500/5 to-transparent",
  },
  web3: {
    icon: GitBranch,
    code: "07",
    description: "Wallet, asset, and blockchain product integrations.",
    accent: "from-fuchsia-500/20 via-fuchsia-500/5 to-transparent",
  },
  tools: {
    icon: Wrench,
    code: "08",
    description: "Team workflows, documentation, and reusable UI delivery.",
    accent: "from-orange-500/20 via-orange-500/5 to-transparent",
  },
  "backend-basics": {
    icon: Server,
    code: "09",
    description: "Backend fundamentals for stronger end-to-end collaboration.",
    accent: "from-slate-500/20 via-slate-500/5 to-transparent",
  },
};

const capabilityNodes = [
  {
    label: "React",
    className: "left-[7%] top-[16%]",
    tone: "border-primary/35 bg-primary/10 text-primary",
  },
  {
    label: "Next.js",
    className: "right-[6%] top-[18%]",
    tone: "border-accent/35 bg-accent/10 text-accent",
  },
  {
    label: "TypeScript",
    className: "left-[3%] top-[55%]",
    tone: "border-blue-400/35 bg-blue-400/10 text-blue-500 dark:text-blue-300",
  },
  {
    label: "Vue / Nuxt",
    className: "right-[3%] top-[58%]",
    tone: "border-emerald-400/35 bg-emerald-400/10 text-emerald-600 dark:text-emerald-300",
  },
  {
    label: "Realtime",
    className: "bottom-[8%] left-[17%]",
    tone: "border-amber-400/35 bg-amber-400/10 text-amber-600 dark:text-amber-300",
  },
  {
    label: "GIS / Web3",
    className: "bottom-[7%] right-[14%]",
    tone: "border-fuchsia-400/35 bg-fuchsia-400/10 text-fuchsia-600 dark:text-fuchsia-300",
  },
] as const;

const totalSkills = new Set(skillCategories.flatMap((category) => category.skills)).size;

function CapabilityMap() {
  return (
    <div className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="ambient-glow absolute inset-0 m-auto size-72 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative min-h-[390px]" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[68%] w-[82%] -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-primary/30 shadow-[inset_0_0_28px_rgba(124,92,255,0.06)] [animation-duration:26s]" />
        <div className="absolute left-1/2 top-1/2 h-[48%] w-[60%] -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-dashed border-accent/30 [animation-direction:reverse] [animation-duration:34s]" />

        <div className="absolute left-1/2 top-1/2 flex size-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary/30 bg-background/85 text-center shadow-[0_0_70px_rgba(124,92,255,0.24)] backdrop-blur-xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Core system
          </span>
          <strong className="mt-2 text-xl tracking-tight text-foreground">Frontend</strong>
          <span className="mt-1 text-xs text-muted-foreground">Architecture + UI</span>
        </div>

        {capabilityNodes.map((node, index) => (
          <span
            key={node.label}
            className={`absolute inline-flex animate-pulse items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-semibold shadow-lg backdrop-blur-md ${node.className} ${node.tone}`}
            style={{ animationDelay: `${index * 0.35}s` }}
          >
            <span className="size-1.5 rounded-full bg-current" />
            {node.label}
          </span>
        ))}
      </div>

      <div className="relative grid grid-cols-3 divide-x divide-border/70 border-t border-border/70 pt-5 text-center">
        <div>
          <strong className="block text-xl text-foreground">{skillCategories.length}</strong>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Capability groups
          </span>
        </div>
        <div>
          <strong className="block text-xl text-foreground">{totalSkills}+</strong>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Tools and patterns
          </span>
        </div>
        <div>
          <strong className="block text-xl text-foreground">6</strong>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Product domains
          </span>
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <RevealOnScroll>
          <div className="max-w-xl">
            <p className="section-kicker">Capability map</p>
            <h2 className="section-title mt-4">
              A flexible stack for <span className="text-gradient">complex product systems.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">
              My strongest work sits at the intersection of frontend architecture, dense business
              workflows, data visualization, and polished interaction design.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              {["Enterprise UI", "Realtime data", "Spatial systems", "Web3 flows", "Design systems", "Performance"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-border/70 bg-card/45 px-3 py-3 text-center font-medium text-foreground backdrop-blur-sm"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <CapabilityMap />
        </RevealOnScroll>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category, index) => {
          const meta = categoryMeta[category.id] ?? defaultCategoryMeta;
          const Icon = meta.icon;

          return (
            <RevealOnScroll key={category.id} delay={Math.min(index * 0.04, 0.28)}>
              <article className="glass-panel group relative h-full overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-11 items-center justify-center rounded-xl border border-border/70 bg-background/65 text-accent shadow-sm">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground">
                      {meta.code}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                    {category.label}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                    {meta.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <SkillBadge
                        key={skill}
                        label={skill}
                        className="border-foreground/10 bg-background/55"
                      />
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
