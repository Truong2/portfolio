import { ArrowDownRight, Download, Sparkles } from "lucide-react";

import { Hero3DCanvasLoader } from "@/components/three/hero-3d-canvas-loader";
import { TrackedAnchor } from "@/components/tracked-anchor";
import { Button } from "@/components/ui/button";
import { personalInfo, summary } from "@/data/profile";

const metrics = [
  { value: "3+", label: "Years building products" },
  { value: "1M+", label: "Records visualized" },
  { value: "9+", label: "Enterprise products" },
] as const;

export function HeroSection() {
  return (
    <section
      id="hero"
      className="surface-grid relative isolate overflow-hidden px-6 pb-20 pt-16 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-24"
    >
      <div className="ambient-glow absolute -left-40 top-12 size-[30rem] rounded-full bg-violet-500/20 blur-[120px]" />
      <div className="ambient-glow absolute -right-48 top-1/3 size-[34rem] rounded-full bg-cyan-400/15 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="flex max-w-2xl flex-col items-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-xl">
            <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
            Available for ambitious frontend products
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.24em] text-accent">
            {personalInfo.title} · Hanoi, Vietnam
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            <span className="block text-foreground">I build complex products</span>
            <span className="text-gradient block">that feel simple to use.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            {summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <TrackedAnchor event="hero_cta_click_view_work" href="#experience">
                Explore selected work
                <ArrowDownRight className="size-4" />
              </TrackedAnchor>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <TrackedAnchor event="hero_cta_click_contact" href="#contact">
                Start a conversation
              </TrackedAnchor>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full px-5">
              <TrackedAnchor event="cv_download_click" href={personalInfo.resumeUrl} download>
                <Download className="size-4" />
                CV
              </TrackedAnchor>
            </Button>
          </div>

          <dl className="mt-12 grid w-full max-w-xl grid-cols-3 gap-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="glass-panel rounded-2xl px-4 py-4 sm:px-5">
                <dt className="text-[11px] leading-4 text-muted-foreground">{metric.label}</dt>
                <dd className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-2xl">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-400/20 blur-2xl" />
          <div className="relative">
            <Hero3DCanvasLoader />
          </div>
          <div className="glass-panel absolute -bottom-5 left-5 hidden rounded-2xl px-4 py-3 sm:block">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
              Nguyen Van Truong
            </p>
            <p className="mt-1 text-sm text-foreground">Frontend architecture · UI systems · 3D web</p>
          </div>
        </div>
      </div>
    </section>
  );
}
