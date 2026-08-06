import { Blocks } from "lucide-react";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { experience, type Project } from "@/data/profile";

function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="grid gap-5 border-t border-border/60 py-7 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
      <div>
        <h4 className="text-base font-semibold tracking-tight text-foreground">{project.name}</h4>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => <span key={tech} className="tech-chip">{tech}</span>)}
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
        <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="section-kicker">Complete Experience</p>
            <h2 className="section-title mt-5">Roles, products, and <span className="text-gradient">delivery ownership.</span></h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:justify-self-end">
            Detailed CV-backed experience across financial operations, mobility, healthcare, commerce,
            GIS intelligence, enterprise platforms, and Web3 integrations.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.08} className="mt-10">
        <div className="dashboard-panel overflow-hidden rounded-2xl">
          <div className="flex items-center gap-3 border-b border-border/60 px-5 py-4 sm:px-7">
            <Blocks className="size-4 text-accent" aria-hidden="true" />
            <span className="dashboard-label">Professional journey</span>
          </div>
          <Accordion type="multiple" defaultValue={[experience[0]?.id ?? ""]}>
            {experience.map((entry, index) => (
              <AccordionItem key={entry.id} value={entry.id} className="border-b border-border/60 last:border-b-0">
                <AccordionTrigger className="px-5 py-6 hover:no-underline sm:px-7 sm:py-7">
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
                <AccordionContent className="px-5 pb-2 sm:px-7 sm:pl-[6.75rem]">
                  {entry.projects.map((project) => <ProjectDetail key={project.name} project={project} />)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </RevealOnScroll>
    </section>
  );
}
