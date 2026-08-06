import { ArrowUpRight, Boxes, CheckCircle2, UsersRound } from "lucide-react";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { personalInfo } from "@/data/profile";

const principles = [
  {
    title: "Systems Thinking",
    description:
      "Set up maintainable frontend architecture, reusable UI foundations, predictable state, and clear integration boundaries.",
    icon: Boxes,
  },
  {
    title: "Product Collaboration",
    description:
      "Work closely with backend, QA, design, and client teams to clarify requirements and resolve integration issues.",
    icon: UsersRound,
  },
  {
    title: "Performance & Quality",
    description:
      "Deliver responsive interfaces, stable business workflows, accessible interactions, and code that remains understandable.",
    icon: CheckCircle2,
  },
] as const;

export function AboutSection() {
  return (
    <section id="about" className="section-shell scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <RevealOnScroll>
          <div>
            <p className="section-kicker">Executive Profile</p>
            <h2 className="section-title mt-6">
              Translating complexity into reliable product <span className="text-gradient">interfaces.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              I build maintainable frontend systems for banking, mobility, healthcare, GIS,
              e-commerce, and Web3 products — balancing architecture, interaction quality, and
              business workflow clarity.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              My work includes project setup, complex forms and permissions, realtime updates,
              REST integrations, design systems, legacy migrations, code review, and frontend team
              support.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Discuss a product challenge
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </RevealOnScroll>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <RevealOnScroll key={principle.title} delay={index * 0.07}>
                <article className="enterprise-panel card-hover relative h-full overflow-hidden rounded-2xl p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold tracking-tight text-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {principle.description}
                  </p>
                  <div className="mt-8 h-px bg-border/70">
                    <div className="h-px w-12 bg-gradient-to-r from-accent to-primary" />
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
