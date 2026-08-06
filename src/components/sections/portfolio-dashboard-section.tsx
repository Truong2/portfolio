import {
  Accessibility,
  Activity,
  Blocks,
  Braces,
  Car,
  ExternalLink,
  Mail,
  ShieldCheck,
  Ship,
  type LucideIcon,
} from "lucide-react";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { TrackedAnchor } from "@/components/tracked-anchor";
import { experience, personalInfo, skillCategories, type Project } from "@/data/profile";

interface FeaturedCase {
  title: string;
  label: string;
  match: RegExp;
  icon: LucideIcon;
  accent: string;
}

interface BrandItem {
  name: string;
  iconUrl: string;
  color: string;
}

const SIMPLE_ICONS_BASE = "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons";

function simpleIcon(slug: string) {
  return `${SIMPLE_ICONS_BASE}/${slug}.svg`;
}

const featuredCases: FeaturedCase[] = [
  { title: "AML BackOffice", label: "Banking operations", match: /AML/i, icon: ShieldCheck, accent: "from-violet-500/28 to-cyan-400/8" },
  { title: "Taxi Admin Platform", label: "Realtime mobility", match: /Taxi Admin/i, icon: Car, accent: "from-cyan-400/24 to-blue-500/8" },
  { title: "MARINER25", label: "Maritime GIS", match: /MARINER25/i, icon: Ship, accent: "from-blue-500/24 to-violet-500/10" },
];

const standards = [
  { title: "Component Architecture", description: "Reusable modules and scalable product foundations.", icon: Blocks },
  { title: "Performance", description: "Efficient rendering for data-heavy and map-based UI.", icon: Activity },
  { title: "Type-safe Workflows", description: "TypeScript, forms, validation, and predictable state.", icon: Braces },
  { title: "Accessibility", description: "Clear states, semantic interaction, and keyboard support.", icon: Accessibility },
  { title: "Collaboration", description: "Backend alignment, code review, QA support, and mentoring.", icon: ShieldCheck },
] as const;

const stack: BrandItem[] = [
  { name: "React", iconUrl: simpleIcon("react"), color: "#61DAFB" },
  { name: "Next.js", iconUrl: simpleIcon("nextdotjs"), color: "var(--foreground)" },
  { name: "Vue 3", iconUrl: simpleIcon("vuedotjs"), color: "#4FC08D" },
  { name: "Nuxt 3", iconUrl: simpleIcon("nuxt"), color: "#00DC82" },
  { name: "TypeScript", iconUrl: simpleIcon("typescript"), color: "#3178C6" },
  { name: "Tailwind CSS", iconUrl: simpleIcon("tailwindcss"), color: "#06B6D4" },
  { name: "OpenLayers", iconUrl: simpleIcon("openlayers"), color: "#1F6B75" },
  { name: "Node.js", iconUrl: simpleIcon("nodedotjs"), color: "#5FA04E" },
];

const tooling: BrandItem[] = [
  { name: "Git", iconUrl: simpleIcon("git"), color: "#F05032" },
  { name: "Jira", iconUrl: simpleIcon("jira"), color: "#0052CC" },
  { name: "Storybook", iconUrl: simpleIcon("storybook"), color: "#FF4785" },
  { name: "React Query", iconUrl: simpleIcon("reactquery"), color: "#FF4154" },
  { name: "Zustand", iconUrl: "https://api.iconify.design/logos:zustand.svg", color: "#C5A46D" },
  { name: "React Hook Form", iconUrl: simpleIcon("reacthookform"), color: "#EC5990" },
  { name: "Zod", iconUrl: simpleIcon("zod"), color: "#3E67B1" },
  { name: "i18next", iconUrl: simpleIcon("i18next"), color: "#26A69A" },
];

function findProject(match: RegExp): Project | undefined {
  return experience.flatMap((entry) => entry.projects).find((project) => match.test(project.name));
}

function MiniDashboard({ icon: Icon, accent }: { icon: LucideIcon; accent: string }) {
  return (
    <div className={`surface-grid relative h-36 overflow-hidden rounded-lg border border-border/70 bg-gradient-to-br ${accent}`}>
      <div className="absolute inset-0 bg-background/35" />
      <div className="absolute left-4 top-4 flex gap-1.5">
        <span className="size-1.5 rounded-full bg-rose-400/70" />
        <span className="size-1.5 rounded-full bg-amber-300/70" />
        <span className="size-1.5 rounded-full bg-emerald-400/70" />
      </div>
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-[0.7fr_1.3fr] gap-3">
        <div className="space-y-2 rounded-md border border-white/10 bg-black/15 p-3 backdrop-blur-md">
          <Icon className="size-5 text-accent" />
          <div className="h-1.5 w-10 rounded-full bg-white/20" />
          <div className="h-1.5 w-14 rounded-full bg-white/10" />
        </div>
        <div className="flex items-end gap-1 rounded-md border border-white/10 bg-black/15 p-3 backdrop-blur-md">
          {[34, 55, 42, 72, 61, 86, 68].map((height, index) => (
            <span key={index} className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-500/60 to-cyan-300/80" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ item }: { item: FeaturedCase }) {
  const project = findProject(item.match);
  if (!project) return null;
  return (
    <article className="dashboard-subpanel card-hover flex h-full flex-col rounded-xl p-3">
      <MiniDashboard icon={item.icon} accent={item.accent} />
      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <p className="dashboard-label">{item.label}</p>
        <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.techStack.slice(0, 3).map((tech) => <span key={tech} className="tech-chip">{tech}</span>)}
        </div>
      </div>
    </article>
  );
}

function BrandIcon({ item }: { item: BrandItem }) {
  const maskImage = `url("${item.iconUrl}")`;

  return (
    <span className="flex size-10 items-center justify-center rounded-lg border border-foreground/10 bg-background/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <span
        role="img"
        aria-label={`${item.name} logo`}
        className="block size-5"
        style={{
          backgroundColor: item.color,
          WebkitMaskImage: maskImage,
          maskImage,
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </span>
  );
}

function IconGrid({ items }: { items: BrandItem[] }) {
  return (
    <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8" role="list">
      {items.map((item) => (
        <div
          key={item.name}
          role="listitem"
          title={item.name}
          className="dashboard-subpanel group flex min-h-20 flex-col items-center justify-center rounded-lg p-2 text-center transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_0_24px_rgba(59,232,255,0.12)]"
        >
          <BrandIcon item={item} />
          <span className="mt-2 text-[9px] font-medium leading-4 text-muted-foreground transition-colors group-hover:text-foreground">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export function PortfolioDashboardSection() {
  const totalSkills = new Set(skillCategories.flatMap((category) => category.skills)).size;

  return (
    <section className="section-shell pt-8 sm:pt-10">
      <RevealOnScroll>
        <div className="dashboard-panel overflow-hidden rounded-2xl">
          <div className="grid xl:grid-cols-[1.85fr_0.85fr]">
            <div className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="section-kicker">Featured Projects</p>
                <a href="#experience" className="text-[10px] font-medium text-muted-foreground transition hover:text-accent">View all projects →</a>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {featuredCases.map((item) => <ProjectCard key={item.title} item={item} />)}
              </div>
            </div>

            <div className="border-t border-border/60 p-4 sm:p-5 lg:border-l lg:border-t-0 lg:p-6">
              <p className="section-kicker">Engineering Standards</p>
              <div className="mt-4 space-y-4">
                {standards.map((standard) => {
                  const Icon = standard.icon;
                  return (
                    <div key={standard.title} className="flex gap-3">
                      <span className="icon-tile size-8 shrink-0"><Icon className="size-4" /></span>
                      <div>
                        <h3 className="text-xs font-semibold text-foreground">{standard.title}</h3>
                        <p className="mt-1 text-[10px] leading-4 text-muted-foreground">{standard.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid border-t border-border/60 xl:grid-cols-[1fr_1fr_0.82fr]">
            <div id="skills" className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <p className="section-kicker">Tech Stack</p>
                <span className="font-mono text-[9px] text-muted-foreground">{totalSkills} CV skills</span>
              </div>
              <IconGrid items={stack} />
            </div>

            <div className="border-t border-border/60 p-4 sm:p-5 lg:p-6 xl:border-l xl:border-t-0">
              <p className="section-kicker">Tooling & Workflow</p>
              <IconGrid items={tooling} />
            </div>

            <div className="relative overflow-hidden border-t border-border/60 p-5 sm:p-6 xl:border-l xl:border-t-0">
              <div className="absolute -bottom-24 -right-20 size-64 rounded-full border border-violet-400/25 shadow-[0_0_70px_rgba(124,92,255,0.16)]" />
              <div className="absolute -bottom-10 right-8 size-28 rounded-full bg-[radial-gradient(circle_at_35%_30%,#3be8ff,#6f5cf5_45%,#111936_75%)] opacity-70 blur-[1px]" />
              <div className="relative">
                <p className="section-kicker">Let&apos;s Work Together</p>
                <h3 className="mt-4 max-w-xs text-xl font-semibold tracking-tight">Open to frontend product roles and complex enterprise projects.</h3>
                <p className="mt-3 max-w-sm text-xs leading-5 text-muted-foreground">Architecture, realtime workflows, GIS, platform modernization, and data-heavy product interfaces.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <TrackedAnchor event="social_link_click_email" href={`mailto:${personalInfo.email}`} className="inline-flex h-9 items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 px-4 text-xs font-semibold text-white">
                    <Mail className="size-4" /> Get in touch
                  </TrackedAnchor>
                  <TrackedAnchor event="social_link_click_linkedin" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="icon-tile size-9" aria-label="LinkedIn profile">
                    <ExternalLink className="size-4" />
                  </TrackedAnchor>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
