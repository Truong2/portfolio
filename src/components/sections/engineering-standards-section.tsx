import {
  Activity,
  Blocks,
  Braces,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { RevealOnScroll } from "@/components/reveal-on-scroll";

interface Standard {
  title: string;
  description: string;
  icon: LucideIcon;
}

const standards: Standard[] = [
  {
    title: "Accessible Interaction",
    description: "Semantic UI, clear states, keyboard-friendly controls, and understandable business workflows.",
    icon: ShieldCheck,
  },
  {
    title: "Performance",
    description: "Responsive rendering, efficient data flow, map optimization, and smooth realtime updates.",
    icon: Activity,
  },
  {
    title: "Maintainability",
    description: "Typed architecture, reusable modules, predictable state, and code that supports long-lived products.",
    icon: Braces,
  },
  {
    title: "Design System Thinking",
    description: "Consistent components, documented usage, shared patterns, and scalable UI foundations.",
    icon: Blocks,
  },
  {
    title: "Collaboration & Delivery",
    description: "Requirement clarification, backend alignment, code review, QA support, and team mentoring.",
    icon: UsersRound,
  },
];

function StandardsVisual() {
  return (
    <div className="enterprise-panel surface-grid relative min-h-[420px] overflow-hidden rounded-3xl p-6 sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_48%,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_50%)]" />
      <div className="relative flex min-h-[350px] items-center justify-center">
        <div className="absolute size-72 rounded-full border border-primary/20" />
        <div className="absolute size-56 rounded-full border border-dashed border-accent/25" />
        <div className="absolute bottom-8 left-1/2 h-12 w-52 -translate-x-1/2 rounded-[50%] bg-primary/15 blur-2xl" />

        <div className="relative w-full max-w-sm space-y-3">
          {standards.map((standard, index) => {
            const Icon = standard.icon;
            return (
              <div
                key={standard.title}
                className="flex items-center gap-4 rounded-2xl border border-foreground/10 bg-card/75 px-4 py-3 shadow-xl backdrop-blur-xl"
                style={{ transform: `translateX(${index % 2 === 0 ? -12 : 12}px)` }}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-foreground">{standard.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function EngineeringStandardsSection() {
  return (
    <section id="standards" className="section-shell scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <RevealOnScroll>
            <p className="section-kicker">Engineering Standards</p>
            <h2 className="section-title mt-6">
              How quality is built into every frontend <span className="text-gradient">delivery.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              The CV shows repeated ownership of architecture, reusable UI, integration quality,
              performance, code review, and team support. These standards summarize that delivery approach.
            </p>
          </RevealOnScroll>

          <div className="mt-10 divide-y divide-border/70 border-y border-border/70">
            {standards.map((standard, index) => {
              const Icon = standard.icon;
              return (
                <RevealOnScroll key={standard.title} delay={index * 0.04}>
                  <article className="grid gap-4 py-5 sm:grid-cols-[44px_48px_1fr] sm:items-center sm:gap-5">
                    <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                    <span className="flex size-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{standard.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{standard.description}</p>
                    </div>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

        <RevealOnScroll delay={0.08}>
          <StandardsVisual />
        </RevealOnScroll>
      </div>
    </section>
  );
}
