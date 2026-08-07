import { ArrowDownRight, Download, MapPin, Sparkles } from "lucide-react";

import { Hero3DCanvasLoader } from "@/components/three/hero-3d-canvas-loader";
import { TrackedAnchor } from "@/components/tracked-anchor";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/profile";

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate overflow-hidden border-b border-border/50">
      <div className="pointer-events-none absolute inset-0 surface-grid opacity-70" />
      <div className="absolute -left-48 top-8 size-[34rem] rounded-full bg-cyan-400/12 blur-[140px]" />
      <div className="absolute -right-44 top-20 size-[40rem] rounded-full bg-violet-500/16 blur-[160px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-[100rem] items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.68fr_1.32fr] lg:px-10 lg:py-12">
        <div className="order-2 max-w-2xl lg:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
            <Sparkles className="size-3" />
            Interactive spatial CV
          </div>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-[4.35rem]">
            <span className="block">Explore my CV</span>
            <span className="block">as an interactive</span>
            <span className="text-gradient block">3D system.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
            Rotate the dossier, zoom through the scene, select a panel, or use the navigation menu to fly the camera directly to experience, projects, skills, education, and contact.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 px-6 text-white shadow-lg shadow-primary/20">
              <TrackedAnchor event="hero_cta_click_view_work" href="#experience">
                Read Full Experience <ArrowDownRight className="size-4" />
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
            <div><span className="block text-[9px] uppercase tracking-[0.18em]">Navigation</span><strong className="mt-1 block text-foreground">Camera-driven CV</strong></div>
          </div>

          <div className="mt-6 rounded-xl border border-border/60 bg-card/45 p-4 text-xs leading-5 text-muted-foreground backdrop-blur-xl">
            <span className="font-semibold text-foreground">How to explore:</span> drag to orbit · scroll/pinch to zoom · select a CV panel to focus · use the top menu to fly between sections.
          </div>
        </div>

        <div className="order-1 relative mx-auto w-full max-w-5xl lg:order-2">
          <div className="absolute inset-8 rounded-full bg-violet-500/12 blur-3xl" />
          <Hero3DCanvasLoader />
        </div>
      </div>
    </section>
  );
}
