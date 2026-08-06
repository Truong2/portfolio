import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { personalInfo } from "@/data/profile";

const operatingPrinciples = [
  "Translate complex workflows into clear, maintainable interfaces.",
  "Build reusable foundations instead of one-off screens.",
  "Balance interaction quality, performance, and delivery constraints.",
] as const;

export function AboutSection() {
  return (
    <section id="about" className="section-shell scroll-mt-20">
      <div className="grid gap-10 border-y border-border/70 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:py-20">
        <RevealOnScroll>
          <div>
            <p className="section-kicker">Executive profile</p>
            <h2 className="section-title mt-4">
              Frontend engineering focused on <span className="text-gradient">business-critical products.</span>
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.08}>
          <div className="max-w-3xl">
            <p className="text-lg leading-8 text-foreground sm:text-xl sm:leading-9">
              I work across product design and frontend architecture to deliver reliable interfaces
              for banking, mobility, healthcare, geospatial, commerce, and real-time operations.
            </p>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              My role is not limited to implementing screens. I help clarify requirements, shape
              reusable UI foundations, integrate complex data flows, and keep product teams moving
              with code that remains understandable as the system grows.
            </p>

            <div className="mt-8 grid gap-4">
              {operatingPrinciples.map((principle) => (
                <div key={principle} className="flex items-start gap-3 border-t border-border/60 pt-4">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <p className="text-sm leading-6 text-muted-foreground">{principle}</p>
                </div>
              ))}
            </div>

            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Discuss a product challenge
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
