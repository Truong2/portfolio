import {
  Activity,
  Blocks,
  Car,
  Headphones,
  LayoutDashboard,
  Map,
  ShieldCheck,
  Ship,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SkillBadge } from "@/components/ui/skill-badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { experience, type Project } from "@/data/profile";
import { cn } from "@/lib/utils";

interface ProjectTheme {
  label: string;
  metric: string;
  icon: LucideIcon;
  shell: string;
  iconTone: string;
}

const projectThemes: Array<{ match: RegExp; theme: ProjectTheme }> = [
  {
    match: /aml|money|bank/i,
    theme: {
      label: "Fintech risk system",
      metric: "AML",
      icon: ShieldCheck,
      shell: "from-rose-500/18 via-violet-500/8 to-transparent",
      iconTone: "text-rose-300",
    },
  },
  {
    match: /hrm/i,
    theme: {
      label: "Enterprise migration",
      metric: "NUXT 3",
      icon: UsersRound,
      shell: "from-sky-500/18 via-cyan-500/8 to-transparent",
      iconTone: "text-sky-300",
    },
  },
  {
    match: /taxi|ride|booking/i,
    theme: {
      label: "Mobility operations",
      metric: "REALTIME",
      icon: Car,
      shell: "from-amber-500/18 via-orange-500/8 to-transparent",
      iconTone: "text-amber-300",
    },
  },
  {
    match: /sano|health|garmin/i,
    theme: {
      label: "Health analytics",
      metric: "DATA",
      icon: Activity,
      shell: "from-emerald-500/18 via-teal-500/8 to-transparent",
      iconTone: "text-emerald-300",
    },
  },
  {
    match: /metame|wallet|waas|web3/i,
    theme: {
      label: "Digital assets",
      metric: "WEB3",
      icon: Blocks,
      shell: "from-fuchsia-500/18 via-violet-500/8 to-transparent",
      iconTone: "text-fuchsia-300",
    },
  },
  {
    match: /audio|commerce|ec platform/i,
    theme: {
      label: "Digital commerce",
      metric: "AUDIO",
      icon: Headphones,
      shell: "from-purple-500/18 via-pink-500/8 to-transparent",
      iconTone: "text-purple-300",
    },
  },
  {
    match: /mariner|maritime|vessel/i,
    theme: {
      label: "Maritime intelligence",
      metric: "1M+",
      icon: Ship,
      shell: "from-cyan-500/18 via-blue-500/8 to-transparent",
      iconTone: "text-cyan-300",
    },
  },
  {
    match: /avt|map|gis|military/i,
    theme: {
      label: "Geospatial operations",
      metric: "GIS",
      icon: Map,
      shell: "from-lime-500/18 via-emerald-500/8 to-transparent",
      iconTone: "text-lime-300",
    },
  },
  {
    match: /component library|dxui/i,
    theme: {
      label: "Design system",
      metric: "UI KIT",
      icon: Blocks,
      shell: "from-indigo-500/18 via-violet-500/8 to-transparent",
      iconTone: "text-indigo-300",
    },
  },
];

const defaultProjectTheme: ProjectTheme = {
  label: "Enterprise platform",
  metric: "PRODUCT",
  icon: LayoutDashboard,
  shell: "from-primary/18 via-accent/8 to-transparent",
  iconTone: "text-accent",
};

function getProjectTheme(name: string) {
  return projectThemes.find((item) => item.match.test(name))?.theme ?? defaultProjectTheme;
}

function ProjectVisual({ project }: { project: Project }) {
  const theme = getProjectTheme(project.name);
  const Icon = theme.icon;

  return (
    <div
      className={cn(
        "relative min-h-52 overflow-hidden rounded-2xl border border-white/10 bg-[#080b16] bg-gradient-to-br shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        theme.shell,
      )}
      aria-hidden="true"
    >
      <div className="surface-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-x-0 top-0 h-24 animate-pulse bg-gradient-to-b from-transparent via-cyan-300/10 to-transparent" />
      <div className="absolute -right-12 -top-12 size-40 rounded-full border border-white/10" />
      <div className="absolute -right-4 top-4 size-24 rounded-full border border-white/10" />

      <div className="relative flex h-full min-h-52 flex-col justify-between p-5">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-white/10 bg-black/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
            {theme.label}
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/55">
            {theme.metric}
          </span>
        </div>

        <div className="relative flex items-center justify-center py-5">
          <div className="absolute size-32 animate-spin rounded-full border border-white/15 [animation-duration:14s]" />
          <div className="absolute size-20 animate-spin rounded-full border border-dashed border-white/15 [animation-direction:reverse] [animation-duration:10s]" />
          <div className="flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-black/20 shadow-[0_0_45px_rgba(103,232,249,0.16)] backdrop-blur-md">
            <Icon className={cn("size-8", theme.iconTone)} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[72, 100, 54].map((width, index) => (
            <div key={width} className="rounded-lg border border-white/10 bg-black/15 p-2 backdrop-blur-sm">
              <div className="h-1 rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-300/70 to-cyan-300/70"
                  style={{ width: `${width}%` }}
                />
              </div>
              <div className="mt-2 h-1 rounded-full bg-white/10" style={{ width: `${46 + index * 18}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group grid gap-5 rounded-2xl border border-border/70 bg-background/45 p-4 transition-colors duration-300 hover:border-primary/30 sm:p-5 lg:grid-cols-[220px_minmax(0,1fr)]">
      <ProjectVisual project={project} />

      <div className="flex min-w-0 flex-col py-1 lg:py-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              Project {String(index + 1).padStart(2, "0")}
            </p>
            <h4 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-card-foreground">
              {project.name}
            </h4>
          </div>
          <span className="hidden rounded-full border border-border/70 bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:inline-flex">
            Case study
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>

        {project.highlights.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {project.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_rgba(59,232,255,0.6)]" />
                <span className="leading-6">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.techStack.map((tech) => (
            <SkillBadge
              key={tech}
              label={tech}
              className="border-foreground/10 bg-card/75"
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export function ExperienceTimeline() {
  const projectCount = experience.reduce((total, entry) => total + entry.projects.length, 0);

  return (
    <section id="experience" className="section-shell scroll-mt-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <RevealOnScroll>
          <div className="max-w-3xl">
            <p className="section-kicker">Selected work</p>
            <h2 className="section-title mt-4">
              Products built for <span className="text-gradient">real operational complexity.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              From banking workflows to million-record maritime maps, each role strengthened a
              different part of my product engineering toolkit.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.08}>
          <div className="glass-panel grid grid-cols-3 divide-x divide-border/70 rounded-2xl px-4 py-4 text-center sm:min-w-[360px]">
            <div className="px-3">
              <strong className="block text-2xl text-foreground">3+</strong>
              <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Years</span>
            </div>
            <div className="px-3">
              <strong className="block text-2xl text-foreground">{projectCount}</strong>
              <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Projects</span>
            </div>
            <div className="px-3">
              <strong className="block text-2xl text-foreground">1M+</strong>
              <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Records</span>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.1} className="mt-14">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-5 top-8 w-px bg-gradient-to-b from-primary/0 via-primary/45 to-accent/0 sm:left-6"
          />

          <Accordion type="multiple" defaultValue={[experience[0]?.id ?? ""]} className="space-y-5">
            {experience.map((entry, entryIndex) => (
              <AccordionItem
                key={entry.id}
                value={entry.id}
                className="glass-panel relative overflow-hidden rounded-[1.75rem] border border-border/70 px-5 sm:px-7"
              >
                <AccordionTrigger className="py-6 hover:no-underline">
                  <span className="flex min-w-0 items-start gap-4 sm:gap-5">
                    <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-background font-mono text-[10px] tracking-[0.14em] text-primary shadow-[0_0_26px_rgba(124,92,255,0.16)] sm:size-12">
                      {String(entryIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="flex min-w-0 flex-col text-left">
                      <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                        {entry.role}
                      </span>
                      <span className="mt-1 text-sm font-medium text-accent">{entry.company}</span>
                      <span className="mt-2 text-xs font-normal leading-5 text-muted-foreground">
                        {entry.period}
                        {entry.location ? ` / ${entry.location}` : ""}
                      </span>
                    </span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="pb-6 pl-14 sm:pl-[4.25rem]">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {entry.projects.length} product {entry.projects.length === 1 ? "case" : "cases"}
                    </p>
                    <span className="rounded-full border border-border/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      {entryIndex === 0 ? "Latest role" : "Career archive"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {entry.projects.map((project, projectIndex) => (
                      <ProjectCard key={project.name} project={project} index={projectIndex} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </RevealOnScroll>
    </section>
  );
}
