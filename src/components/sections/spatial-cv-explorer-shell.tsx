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
    <div aria-hidden="true" className={`pointer-events-none absolute top-0 hidden h-full w-12 xl:block ${side === "left" ? "-right-12" : "-left-12"}`}>
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
    <div className={`relative mx-auto w-full px-3 pb-4 pt-4 transition-[max-width,padding] duration-500 sm:px-4 lg:px-5 ${overview ? "max-w-[112rem]" : "max-w-none xl:px-6"}`}>
      <div className={`flex flex-col gap-2 transition-all duration-300 ${overview ? "mb-4 lg:max-w-sm" : "mb-2 max-w-none opacity-70"}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">3D CV Explorer</p>
        {overview && (
          <>
            <h1 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">Explore the CV as one interactive 3D object.</h1>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">Select a section to zoom into the CV and reveal its full content.</p>
          </>
        )}
      </div>

      <div className={`relative grid items-center transition-all duration-500 ${overview ? "min-h-[720px] gap-3 xl:grid-cols-[0.58fr_1.84fr_0.58fr] xl:gap-5" : "min-h-[calc(100vh-7.5rem)] grid-cols-1"}`}>
        {overview && (
          <div className="relative z-10 order-2 grid gap-3 sm:grid-cols-3 xl:order-1 xl:grid-cols-1">
            <ConnectorColumn side="left" />
            {items.filter((item) => item.side === "left").map((item) => <SectionCard key={item.view} item={item} />)}
          </div>
        )}

        <div className={`relative min-w-0 ${overview ? "order-1 xl:order-2" : "col-span-full w-full"}`}>
          <div className="absolute inset-x-10 bottom-4 h-32 rounded-full bg-cyan-400/8 blur-3xl" />
          <Hero3DCanvasLoader />
          <SpatialCvFocusPanel />
        </div>

        {overview && (
          <div className="relative z-10 order-3 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <ConnectorColumn side="right" />
            {items.filter((item) => item.side === "right").map((item) => <SectionCard key={item.view} item={item} />)}
          </div>
        )}
      </div>

      {overview && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/55 px-4 py-2"><MousePointer2 className="size-3.5 text-cyan-400" /> Drag to rotate</span>
          <span className="rounded-full border border-border/60 bg-card/55 px-4 py-2">Scroll / pinch to zoom</span>
          <span className="rounded-full border border-border/60 bg-card/55 px-4 py-2">Overview</span>
        </div>
      )}
    </div>
  );
}
