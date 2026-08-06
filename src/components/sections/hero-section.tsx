import { ArrowDownRight, Download, Sparkles } from "lucide-react";

import { Hero3DCanvasLoader } from "@/components/three/hero-3d-canvas-loader";
import { TrackedAnchor } from "@/components/tracked-anchor";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/profile";

const focusAreas = [
  "Frontend Architecture",
  "Realtime Systems",
  "Data-Heavy UI",
] as const;

export function HeroSection() {
  return (
    <section
      id="hero"
      className="surface-grid relative isolate overflow-hidden border-b border-border/50"
    >
      <div className="ambient-glow absolute -left-48 top-8 size-[34rem] rounded-full bg-cyan-400/15 blur-[130px]" />
      <div className="ambient-glow absolute -right-44 top-20 size-[38rem] rounded-full bg-violet-500/18 blur-[150px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-74px)] w-full max-w-[96rem] items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-12 lg:py-20">
        <div className="order-2 flex max-w-3xl flex-col items-start lg:order-1">
          <div className="section-kicker">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Enterprise Frontend Engineer
          </div>

          <h1 className="mt-7 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-[5.25rem]">
            <span className="block text-foreground">Building enterprise</span>
            <span className="block text-foreground">frontends for</span>
            <span className="text-gradient block">complex products.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Frontend developer with 3+ years of experience across banking, mobility, healthcare,
            GIS, e-commerce, and Web3. Strong in React, Next.js, Vue, Nuxt, TypeScript, realtime
            workflows, and reusable UI systems.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {focusAreas.map((item) => (
              <span key={item} className="tech-chip">
                <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_currentColor]" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-xl px-6 shadow-lg shadow-primary/20">
              <TrackedAnchor event="hero_cta_click_view_work" href="#experience">
                View Case Studies
                <ArrowDownRight className="size-4" />
              </TrackedAnchor>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl bg-card/55 px-6 backdrop-blur-xl">
              <TrackedAnchor event="hero_cta_click_contact" href="#contact">
                Contact Me
              </TrackedAnchor>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-xl px-5">
              <TrackedAnchor event="cv_download_click" href={personalInfo.resumeUrl} download>
                <Download className="size-4" />
                Resume
              </TrackedAnchor>
            </Button>
          </div>

          <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Based in Hanoi, Vietnam · Available for frontend product roles
          </p>
        </div>

        <div className="order-1 relative mx-auto w-full max-w-3xl lg:order-2">
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-cyan-400/12 via-transparent to-violet-500/18 blur-3xl" />
          <div className="relative">
            <Hero3DCanvasLoader />
          </div>
        </div>
      </div>
    </section>
  );
}
