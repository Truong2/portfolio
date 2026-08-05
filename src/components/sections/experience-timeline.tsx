import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SkillBadge } from "@/components/ui/skill-badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { experience, type Project } from "@/data/profile";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-border bg-card p-4">
      <h4 className="text-sm font-semibold text-card-foreground">{project.name}</h4>
      <p className="mt-1.5 text-sm text-muted-foreground">{project.description}</p>
      {project.highlights.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <SkillBadge key={tech} label={tech} />
        ))}
      </div>
    </article>
  );
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="mx-auto w-full max-w-3xl px-6 py-24">
      <RevealOnScroll>
        <h2 className="text-sm font-medium uppercase tracking-widest text-accent">Experience</h2>
        <p className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
          3+ years across banking, e-commerce, GIS, and Web3.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className="mt-10">
        {/* defaultValue = most recent role, so the newest work is visible on load */}
        <Accordion type="multiple" defaultValue={[experience[0]?.id ?? ""]}>
          {experience.map((entry) => (
            <AccordionItem key={entry.id} value={entry.id}>
              <AccordionTrigger>
                <span className="flex flex-col text-left">
                  <span className="font-semibold text-foreground">
                    {entry.role} &middot; {entry.company}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {entry.period}
                    {entry.location ? ` · ${entry.location}` : ""}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  {entry.projects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
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
