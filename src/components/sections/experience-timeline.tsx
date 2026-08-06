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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { experience, type Project } from "@/data/profile";

interface ProjectMeta {
  label: string;
  icon: LucideIcon;
}

const projectMeta: Array<{ match: RegExp; value: ProjectMeta }> = [
  { match: /aml|money|bank/i, value: { label: "Banking and risk", icon: ShieldCheck } },
  { match: /hrm/i, value: { label: "Enterprise operations", icon: UsersRound } },
  { match: /taxi|ride|booking/i, value: { label: "Mobility platform", icon: Car } },
  { match: /sano|health|garmin/i, value: { label: "Healthcare analytics", icon: Activity } },
  { match: /metame|wallet|waas|web3/i, value: { label: "Digital assets", icon: Blocks } },
  { match: /audio|commerce|ec platform/i, value: { label: "Digital commerce", icon: Headphones } },
  { match: /mariner|maritime|vessel/i, value: { label: "Maritime intelligence", icon: Ship } },
  { match: /avt|map|gis|military/i, value: { label: "Geospatial operations", icon: Map } },
  { match: /component library|dxui/i, value: { label: "Design system", icon: Blocks } },
];

const defaultMeta: ProjectMeta = { label: "Enterprise product", icon: LayoutDashboard };

function getProjectMeta(name: string) {
  return projectMeta.find((item) => item.match.test(name))?.value ?? defaultMeta;
}

function ProjectCase({ project }: { project: Project }) {
  const meta = getProjectMeta(project.name);
  const Icon = meta.icon;

  return (
    <article className="grid gap-5 border-t border-border/60 py-7 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8">
      <div>
        <div className="flex size-11 items-center justify-center rounded-xl border border-border/70 bg-card/60 text-accent">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {meta.label}
        </p>
      </div>

      <div className="min-w-0">
        <h4 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
          {project.name}
        </h4>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          {project.description}
        </p>

        {project.highlights.length > 0 ? (
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {project.highlights.slice(0, 4).map((highlight) => (
              <div key={highlight} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs font-semibold text-foreground/75">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section-shell scroll-mt-20">
      <RevealOnScroll>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="section-kicker">Delivery experience</p>
            <h2 className="section-title mt-4">
              Product work across <span className="text-gradient">complex operating environments.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:justify-self-end">
            The work below is organized by role and product context. Each case highlights the system
            being delivered, the frontend responsibility, and the technologies used to support it.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.08} className="mt-12">
        <Accordion type="multiple" defaultValue={[experience[0]?.id ?? ""]} className="border-t border-border/70">
          {experience.map((entry, entryIndex) => (
            <AccordionItem key={entry.id} value={entry.id} className="border-b border-border/70">
              <AccordionTrigger className="py-7 hover:no-underline sm:py-9">
                <span className="grid min-w-0 flex-1 gap-3 pr-5 text-left sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-6">
                  <span className="font-mono text-xs text-accent">
                    {String(entryIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-semibold tracking-tight text-foreground">
                      {entry.role}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{entry.company}</span>
                  </span>
                  <span className="text-xs font-normal text-muted-foreground sm:text-right">
                    {entry.period}
                    {entry.location ? <span className="mt-1 block">{entry.location}</span> : null}
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent className="pb-3 sm:pl-[5.5rem]">
                <div className="border-t border-border/50">
                  {entry.projects.map((project) => (
                    <ProjectCase key={project.name} project={project} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </RevealOnScroll>
    </section>
  );
}
