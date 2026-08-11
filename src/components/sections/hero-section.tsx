import { SpatialCvExplorerShell } from "@/components/sections/spatial-cv-explorer-shell";

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate min-h-[calc(100vh-60px)] overflow-hidden border-b border-white/[0.04] bg-[#020711]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(38,91,180,.12),transparent_26rem),radial-gradient(circle_at_18%_55%,rgba(34,211,238,.06),transparent_24rem),radial-gradient(circle_at_82%_48%,rgba(139,92,246,.08),transparent_28rem)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:84px_84px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#020711] via-[#020711]/70 to-transparent" />
      <div className="relative">
        <SpatialCvExplorerShell />
      </div>
    </section>
  );
}
