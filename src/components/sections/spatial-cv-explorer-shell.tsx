"use client";

import type { ComponentType } from "react";
import {
  Activity,
  Blocks,
  BookOpen,
  Braces,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Mail,
  MousePointer2,
  UsersRound,
} from "lucide-react";

import { BOOK_SPREADS, type CvView, useSpatialCv } from "@/components/spatial-cv-context";
import { Hero3DCanvasLoader } from "@/components/three/hero-3d-canvas-loader";

const items: Array<{
  view: Exclude<CvView, "overview">;
  index: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { view: "profile", index: "01", title: "Profile", description: "About me and frontend focus.", icon: UsersRound },
  { view: "experience", index: "02", title: "Experience", description: "Roles, products and delivery ownership.", icon: Activity },
  { view: "projects", index: "03", title: "Projects", description: "Enterprise, GIS and Web3 work.", icon: Braces },
  { view: "skills", index: "04", title: "Skills", description: "Technologies and engineering toolkit.", icon: Blocks },
  { view: "education", index: "05", title: "Education", description: "Engineering background.", icon: GraduationCap },
  { view: "contact", index: "06", title: "Contact", description: "Email, LinkedIn and CV.", icon: Mail },
];

function SectionCard({ item }: { item: (typeof items)[number] }) {
  const { activeView, focusView } = useSpatialCv();
  const Icon = item.icon;
  const active = activeView === item.view;
  return (
    <button type="button" onClick={() => focusView(item.view)} className={`group flex min-h-20 w-full items-center gap-3 rounded-2xl border p-3.5 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/35 ${active ? "border-violet-300/45 bg-violet-300/[0.08] shadow-[0_0_28px_rgba(139,92,246,.14)]" : "border-white/10 bg-[#06101f]/72"}`}>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/6 text-cyan-300"><Icon className="size-4" /></span>
      <span className="min-w-0 flex-1"><span className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.14em] text-cyan-300/80">{item.index}<strong className="text-xs font-semibold tracking-normal text-white">{item.title}</strong></span><span className="mt-1 block text-[10px] leading-4 text-slate-400">{item.description}</span></span>
      <ChevronRight className="size-4 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-cyan-300" />
    </button>
  );
}

export function SpatialCvExplorerShell() {
  const { currentSpread, activeView, focusView, nextSpread, previousSpread } = useSpatialCv();
  const closed = currentSpread === 0;
  const current = BOOK_SPREADS[currentSpread];

  return (
    <div className="relative mx-auto w-full max-w-[118rem] px-3 py-3 sm:px-4 lg:px-5">
      <div className={`grid min-h-[calc(100vh-5.25rem)] items-center gap-3 ${closed ? "xl:grid-cols-[0.48fr_2.04fr_0.48fr]" : "xl:grid-cols-[0.42fr_2.16fr_0.42fr]"}`}>
        <aside className="order-2 grid gap-2 sm:grid-cols-3 xl:order-1 xl:grid-cols-1 xl:self-center" aria-label="CV sections">
          {items.slice(0, 3).map((item) => <SectionCard key={item.view} item={item} />)}
        </aside>

        <div className="relative order-1 min-w-0 xl:order-2">
          <div className="absolute inset-x-10 bottom-4 h-32 rounded-full bg-cyan-400/8 blur-3xl" />
          <Hero3DCanvasLoader />

          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex justify-center sm:bottom-4">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#050b18]/86 p-1.5 text-white shadow-2xl backdrop-blur-xl">
              <button type="button" disabled={currentSpread === 0} onClick={previousSpread} className="flex size-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/8 disabled:opacity-30" aria-label="Previous spread"><ChevronLeft className="size-4" /></button>
              <button type="button" onClick={closed ? nextSpread : () => focusView("overview")} className="flex h-9 items-center gap-2 rounded-lg px-3 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-300 transition hover:bg-white/8"><BookOpen className="size-3.5 text-cyan-300" />{closed ? "Open book" : `${String(currentSpread * 2).padStart(2, "0")}–${String(currentSpread * 2 + 1).padStart(2, "0")} / ${BOOK_SPREADS.length * 2 - 1}`}</button>
              <button type="button" disabled={currentSpread === BOOK_SPREADS.length - 1} onClick={nextSpread} className="flex size-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/8 disabled:opacity-30" aria-label="Next spread"><ChevronRight className="size-4" /></button>
            </div>
          </div>
        </div>

        <aside className="order-3 grid gap-2 sm:grid-cols-3 xl:grid-cols-1 xl:self-center" aria-label="More CV sections">
          {items.slice(3).map((item) => <SectionCard key={item.view} item={item} />)}
          {!closed && <div className="hidden rounded-2xl border border-cyan-300/10 bg-[#06101f]/60 p-4 text-xs leading-5 text-slate-400 xl:block"><p className="font-mono text-[9px] uppercase tracking-[0.14em] text-cyan-300">Jump to page</p><p className="mt-2 text-white">{current?.label}</p><p className="mt-2">Click a section card to flip directly to that chapter. Click the left/right page edge or use the controls below the book.</p></div>}
        </aside>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/55 px-3 py-1.5"><MousePointer2 className="size-3 text-cyan-400" /> {closed ? "Drag to rotate" : "Click page edge to turn"}</span>
        <span className="rounded-full border border-border/60 bg-card/55 px-3 py-1.5">Scroll / pinch to zoom</span>
        <span className="rounded-full border border-border/60 bg-card/55 px-3 py-1.5">{activeView === "overview" ? "Cover" : current?.label}</span>
      </div>
    </div>
  );
}
