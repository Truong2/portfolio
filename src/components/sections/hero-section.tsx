import { ArrowDownRight, Download, Sparkles } from "lucide-react";

import { Hero3DCanvasLoader } from "@/components/three/hero-3d-canvas-loader";
import { TrackedAnchor } from "@/components/tracked-anchor";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/profile";

const focusAreas = ["Frontend architecture", "Realtime systems", "Data-heavy UI"] as const;

export function HeroSection() {
  return (
    <section
      id="hero"
      className="surface-grid relative isolate overflow-hidden px-5 pb-20 pt-10 sm:px-6 sm:pt-16 lg:px-10 lg:pb-28 lg:pt-20"
    >
      <div className="ambient-glow absolute -left-40 top-12 size-[30rem] rounded-full bg-violet-500/18 blur-[120px]" />
      <div className="ambient-glow absolute -right-48 top-1/3 size-[34rem] rounded-full bg-cyan-400/14 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
        <div className="order-2 flex max-w-2xl flex-col items-start lg:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-xl">
            <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
            Enterprise frontend engineering
          </div>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {personalInfo.title} · Hanoi, Vietnam
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            <span className="block text-foreground">Building reliable digital products</span>
            <span className="text-gradient block">for complex operations.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            I design and build maintainable frontend systems for banking, mobility, healthcare,
            geospatial platforms, and real-time enterprise products.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {focusAreas.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border/70 bg-card/55 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <TrackedAnchor event="hero_cta_click_view_work" href="#experience">
                View case studies
                <ArrowDownRight className="size-4" />
              </TrackedAnchor>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <TrackedAnchor event="hero_cta_click_contact" href="#contact">
                Contact me
              </TrackedAnchor>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full px-5">
              <TrackedAnchor event="cv_download_click" href={personalInfo.resumeUrl} download>
                <Download className="size-4" />
                Resume
              </TrackedAnchor>
            </Button>
          </div>
        </div>

        <div className="order-1 relative mx-auto w-full max-w-2xl lg:order-2">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-violet-500/18 via-transparent to-cyan-400/18 blur-2xl" />
          <div className="relative">
            <Hero3DCanvasLoader />
          </div>
          <div className="glass-panel absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 sm:left-5 sm:right-auto">
            <div className="flex items-center justify-between gap-5 sm:block">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Interactive systems map
                </p>
                <p className="mt-1 text-xs text-foreground sm:text-sm">
                  React · Next.js · TypeScript · WebGL
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_currentColor]" />
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
