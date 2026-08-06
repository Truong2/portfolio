import {
  Activity,
  Blocks,
  Car,
  Map,
  ShieldCheck,
  Ship,
  type LucideIcon,
} from "lucide-react";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { experience, type Project } from "@/data/profile";

interface FeaturedCase {
  title: string;
  match: RegExp;
  icon: LucideIcon;
  label: string;
}

const featuredCases: FeaturedCase[] = [
  { title: "Banking & AML Monitoring", match: /AML/i, icon: ShieldCheck, label: "Financial operations" },
  { title: "Mobility & Realtime Dispatch", match: /Taxi Admin/i, icon: Car, label: "Realtime platform" },
  { title: "Maritime & GIS Platform", match: /MARINER25/i, icon: Ship, label: "Spatial intelligence" },
  { title: "Healthcare & Web3 Products", match: /SANO|METAME/i, icon: Activity, label: "Digital products" },
];

function allProjects() {
  return experience.flatMap((entry) => entry.projects);
}

function findProject(match: RegExp) {
  return allProjects().find((project) => match.test(project.name));
}

function FeaturedProjectCard({ item, index }: { item: FeaturedCase; index: number }) {
  const project = findProject(item.match);
  const Icon = item.icon;
  if (!project) return null;

  return (
    <article className="enterprise-panel card-hover flex h-full flex-col rounded-3xl p-4 sm:p-5">
      <div className="surface-grid relative flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-background/65">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_45%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_55%)]" />
        <div className="absolute size-28 rotate-12 rounded-[2rem] border border-accent/25 bg-accent/8 shadow-[0_0_50px_rgba(34,211,238,0.12)]" />
        <span className="relative flex size-16 items-center justify-center rounded-2xl border border-foreground/10 bg-card/85 text-accent shadow-xl backdrop-blur-xl">
          <Icon className="size-8" aria-hidden="true" />
        </span>
        <span className="absolute left-4 top-4 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-xl">
          {item.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1 pb-2 pt-6 sm:px-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
            {item.title}
          </h3>
          <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="tech-chip">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="grid gap-5 border-t border-border/60 py-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
      <div>
        <h4 className="text-lg font-semibold tracking-tight text-foreground">{project.name}</h4>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-chip">{tech}</span>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {project.highlights.map((highlight) => (
          <div key={highlight} className="flex gap-3 text-sm leading-7 text-muted-foreground">
            <span className="mt-3 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_currentColor]" />
            <span>{highlight}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section-shell scroll-mt-20">
      <RevealOnScroll>
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="section-kicker">Selected Work</p>
            <h2 className="section-title mt-6">
              Delivery experience across complex <span className="text-gradient">product domains.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:justify-self-end">
            Enterprise frontend work spanning financial operations, realtime mobility, healthcare,
            digital commerce, GIS intelligence, internal platforms, and Web3 integrations.
          </p>
        </div>
      </RevealOnScroll>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {featuredCases.map((item, index) => (
          <RevealOnScroll key={item.title} delay={index * 0.05}>
            <FeaturedProjectCard item={item} index={index} />
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={0.08} className="mt-16">
        <div className="mb-6 flex items-center gap-3">
          <Blocks className="size-5 text-accent" aria-hidden="true" />
          <h3 className="text-xl font-semibold tracking-tight text-foreground">Complete Experience</h3>
        </div>
        <Accordion type="multiple" defaultValue={[experience[0]?.id ?? ""]} className="border-t border-border/70">
          {experience.map((entry, index) => (
            <AccordionItem key={entry.id} value={entry.id} className="border-b border-border/70">
              <AccordionTrigger className="py-7 hover:no-underline sm:py-8">
                <span className="grid min-w-0 flex-1 gap-3 pr-5 text-left sm:grid-cols-[52px_1fr_auto] sm:items-center sm:gap-6">
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  <span>
                    <span className="block text-lg font-semibold text-foreground">{entry.role}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{entry.company}</span>
                  </span>
                  <span className="text-xs font-normal text-muted-foreground sm:text-right">
                    {entry.period}
                    {entry.location ? <span className="mt-1 block">{entry.location}</span> : null}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-2 sm:pl-[4.75rem]">
                {entry.projects.map((project) => (
                  <ProjectDetail key={project.name} project={project} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </RevealOnScroll>
    </section>
  );
}
