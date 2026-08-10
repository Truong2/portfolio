import { SpatialCvExplorerShell } from "@/components/sections/spatial-cv-explorer-shell";

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate min-h-[calc(100vh-64px)] overflow-hidden border-b border-border/50">
      <div className="pointer-events-none absolute inset-0 surface-grid opacity-60" />
      <div className="pointer-events-none absolute -left-48 top-0 size-[36rem] rounded-full bg-cyan-400/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-48 top-16 size-[42rem] rounded-full bg-violet-500/14 blur-[170px]" />
      <div className="relative">
        <SpatialCvExplorerShell />
      </div>
    </section>
  );
}
