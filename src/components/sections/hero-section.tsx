import { ArrowDownRight, Download, MapPin, Sparkles } from "lucide-react";

import { Hero3DCanvasLoader } from "@/components/three/hero-3d-canvas-loader";
import { TrackedAnchor } from "@/components/tracked-anchor";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/profile";

const callouts = [
  { label: "Architecture", value: "React · Next.js · Nuxt", position: "left-2 top-16 sm:left-5" },
  { label: "Realtime", value: "Socket.IO · WebRTC", position: "right-2 top-20 sm:right-5" },
  { label: "Spatial", value: "GIS · OpenLayers", position: "left-3 bottom-24 sm:left-8" },
  { label: "Type-safe", value: "TypeScript · Zod", position: "right-3 bottom-24 sm:right-8" },
] as const;

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate overflow-hidden border-b border-border/50">
      <div className="pointer-events-none absolute inset-0 surface-grid opacity-70" />
      <div className="absolute -left-48 top-8 size-[34rem] rounded-full bg-cyan-400/12 blur-[140px]" />
      <div className="absolute -right-44 top-20 size-[40rem] rounded-full bg-violet-500/16 blur-[160px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-[96rem] items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-12 lg:py-14">
        <div className="order-2 max-w-2xl lg:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_currentColor]" />
            Available for frontend roles
          </div>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-[4.8rem]">
            <span className="block">I craft scalable,</span>
            <span className="block">enterprise web</span>
            <span className="text-gradient block">experiences.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
            Frontend developer building reliable product interfaces for banking, mobility, healthcare,
            GIS, e-commerce, and Web3 with React, Next.js, Vue, Nuxt, and TypeScript.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 px-6 text-white shadow-lg shadow-primary/20">
              <TrackedAnchor event="hero_cta_click_view_work" href="#experience">
                View My Work <ArrowDownRight className="size-4" />
              </TrackedAnchor>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-lg px-5">
              <TrackedAnchor event="cv_download_click" href={personalInfo.resumeUrl} download>
                Download Resume <Download className="size-4" />
              </TrackedAnchor>
            </Button>
          </div>

          <div className="mt-9 grid max-w-xl grid-cols-1 gap-4 border-t border-border/60 pt-5 text-xs text-muted-foreground sm:grid-cols-3">
            <div className="flex items-center gap-2"><MapPin className="size-4 text-primary" />Hanoi, Vietnam</div>
            <div><span className="block text-[9px] uppercase tracking-[0.18em]">Experience</span><strong className="mt-1 block text-foreground">3+ years</strong></div>
            <div><span className="block text-[9px] uppercase tracking-[0.18em]">Focus</span><strong className="mt-1 block text-foreground">Frontend architecture</strong></div>
          </div>
        </div>

        <div className="order-1 relative mx-auto w-full max-w-4xl lg:order-2">
          <div className="absolute inset-8 rounded-full bg-violet-500/12 blur-3xl" />
          <Hero3DCanvasLoader />
          {callouts.map((item) => (
            <div key={item.label} className={`dashboard-subpanel pointer-events-none absolute hidden w-40 rounded-xl p-3 shadow-xl backdrop-blur-xl sm:block ${item.position}`}>
              <p className="dashboard-label">{item.label}</p>
              <p className="mt-1 text-[11px] font-medium text-foreground">{item.value}</p>
            </div>
          ))}
          <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/60 sm:flex">
            <Sparkles className="size-3" /> Drag to rotate · Scroll to zoom
          </div>
        </div>
      </div>
    </section>
  );
}
