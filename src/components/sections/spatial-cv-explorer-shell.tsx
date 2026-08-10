"use client";

import type { ComponentType } from "react";
import {
  Activity,
  Blocks,
  Braces,
  GraduationCap,
  Mail,
  MousePointer2,
  UsersRound,
} from "lucide-react";

import { type CvView, useSpatialCv } from "@/components/spatial-cv-context";
import { Hero3DCanvasLoader } from "@/components/three/hero-3d-canvas-loader";

import { SpatialCvFocusPanel } from "./spatial-cv-focus-panel";

const items: Array<{
  view: Exclude<CvView, "overview">;
  index: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  side: "left" | "right";
}> = [
  { view: "profile", index: "01", title: "Profile", description: "Background, product mindset and frontend focus.", icon: UsersRound, side: "left" },
  { view: "experience", index: "02", title: "Experience", description: "Career timeline, responsibilities and delivery domains.", icon: Activity, side: "left" },
  { view: "projects", index: "03", title: "Projects", description: "Selected enterprise, realtime, GIS and Web3 work.", icon: Braces, side: "left" },
  { view: "skills", index: "04", title: "Skills", description: "Frontend architecture, data, realtime and tooling.", icon: Blocks, side: "right" },
  { view: "education", index: "05", title: "Education", description: "Engineering background and academic foundation.", icon: GraduationCap, side: "right" },
  { view: "contact", index: "06", title: "Contact", description: "Email, LinkedIn, location and downloadable CV.", icon: Mail, side: "right" },
];

function SectionCard({ item }: { item: (typeof items)[number] }) {
  const { activeView, focusView } = useSpatialCv();
  const Icon = item.icon;
  const active = activeView === item.view;

  return (
    <button
      type="button"
      onClick={() => focusView(item.view)}
      className={`group relative flex min-h-24 w-full items-center gap-4 rounded-2xl border bg-[#06101f]/72 p-4 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-[#08172a]/88 ${active ? "border-cyan-300/40 shadow-[0_0_32px_rgba(34,211,238,.12)]" : "border-white/10"}`}
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/6 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,.08)]">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.14em] text-cyan-300/85">
          {item.index} <strong className="text-xs font-semibold tracking-normal text-white">{item.title}</strong>
        </span>
        <span className="mt-1.5 block text-[11px] leading-5 text-slate-400">{item.description}</span>
      </span>
      <span className="text-lg text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-300">›</span>
      <span className={`pointer-events-none absolute top-1/2 hidden size-2.5 -translate-y-1/2 rounded-full border border-cyan-100/60 bg-cyan-300 shadow-[0_0_16px_#22d3ee] lg:block ${item.side === "left" ? "-right-[5px]" : "-left-[5px]"}`} />
    </button>
  );
}

function ConnectorColumn({ side }: { side: "left" | "right" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute top-0 hidden h-full w-16 lg:block ${side === "left" ? "-right-16" : "-left-16"}`}>
      {[17, 50, 83].map((top) => (
        <div key={top} className="absolute h-px w-full bg-gradient-to-r from-cyan-300/50 via-cyan-300/25 to-transparent" style={{ top: `${top}%`, transform: side === "right" ? "scaleX(-1)" : undefined }} />
      ))}
    </div>
  );
}

export function SpatialCvExplorerShell() {
  const { activeView } = useSpatialCv();
  const overview = activeView === "overview";

  return (
    <div className="relative mx-auto w-full max-w-[100rem] px-4 pb-6 pt-6 sm:px-6 lg:px-8 lg:pb-8">
      <div className="mb-5 flex flex-col gap-2 lg:mb-3 lg:max-w-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">3D CV Explorer</p>
        <h1 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">Explore the CV as one interactive 3D object.</h1>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">Select a section to zoom into the CV and reveal its full content.</p>
      </div>

      <div className="relative grid min-h-[720px] items-center gap-4 lg:grid-cols-[0.72fr_1.56fr_0.72fr] lg:gap-8">
        <div className={`relative z-10 order-2 grid gap-3 sm:grid-cols-3 lg:order-1 lg:grid-cols-1 ${overview ? "opacity-100" : "pointer-events-none opacity-20"}`}>
          <ConnectorColumn side="left" />
          {items.filter((item) => item.side === "left").map((item) => <SectionCard key={item.view} item={item} />)}
        </div>

        <div className="relative order-1 min-w-0 lg:order-2">
          <div className="absolute inset-x-10 bottom-4 h-32 rounded-full bg-cyan-400/8 blur-3xl" />
          <Hero3DCanvasLoader />
          <SpatialCvFocusPanel />
        </div>

        <div className={`relative z-10 order-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 ${overview ? "opacity-100" : "pointer-events-none opacity-20"}`}>
          <ConnectorColumn side="right" />
          {items.filter((item) => item.side === "right").map((item) => <SectionCard key={item.view} item={item} />)}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/55 px-4 py-2"><MousePointer2 className="size-3.5 text-cyan-400" /> Drag to rotate</span>
        <span className="rounded-full border border-border/60 bg-card/55 px-4 py-2">Scroll / pinch to zoom</span>
        <span className="rounded-full border border-border/60 bg-card/55 px-4 py-2">{overview ? "Overview" : `Focused: ${activeView}`}</span>
      </div>
    </div>
  );
}
