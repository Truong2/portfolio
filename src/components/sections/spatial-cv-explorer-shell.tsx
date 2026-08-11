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
  { view: "profile", index: "01", title: "Profile", description: "About me and personal info", icon: UsersRound },
  { view: "experience", index: "02", title: "Experience", description: "My work history and professional journey", icon: Activity },
  { view: "projects", index: "03", title: "Projects", description: "Featured projects and case studies", icon: Braces },
  { view: "skills", index: "04", title: "Skills", description: "Technologies and core competencies", icon: Blocks },
  { view: "education", index: "05", title: "Education", description: "Academic background and qualifications", icon: GraduationCap },
  { view: "contact", index: "06", title: "Contact", description: "Get in touch and connect", icon: Mail },
];

function SectionCard({ item, compact = false }: { item: (typeof items)[number]; compact?: boolean }) {
  const { activeView, focusView } = useSpatialCv();
  const Icon = item.icon;
  const active = activeView === item.view;

  return (
    <button
      type="button"
      onClick={() => focusView(item.view)}
      className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-[18px] border text-left backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 ${compact ? "min-h-[66px] px-3 py-2.5" : "min-h-[92px] px-4 py-3.5"} ${active ? "border-violet-400/60 bg-gradient-to-r from-violet-500/[0.12] to-cyan-400/[0.05] shadow-[0_0_32px_rgba(124,58,237,.18),inset_0_1px_0_rgba(255,255,255,.05)]" : "border-cyan-300/[0.18] bg-[#06101e]/76 shadow-[inset_0_1px_0_rgba(255,255,255,.035)] hover:border-cyan-300/40"}`}
    >
      <span className={`pointer-events-none absolute inset-y-0 left-0 w-px ${active ? "bg-violet-400 shadow-[0_0_18px_#8b5cf6]" : "bg-cyan-300/60 shadow-[0_0_14px_#22d3ee]"}`} />
      <span className={`${compact ? "size-9" : "size-11"} flex shrink-0 items-center justify-center rounded-[14px] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/[0.09] to-blue-500/[0.04] text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,.05)]`}><Icon className={compact ? "size-4" : "size-[18px]"} /></span>
      <span className="min-w-0 flex-1">
        <strong className={`${compact ? "text-[11px]" : "text-[13px]"} block font-semibold tracking-[-0.01em] text-slate-100`}>{item.title}</strong>
        {!compact && <span className="mt-1 block max-w-[11rem] text-[10px] leading-[1.35rem] text-slate-500">{item.description}</span>}
      </span>
      <span className={`${compact ? "text-sm" : "text-lg"} absolute right-4 top-3 font-mono font-medium text-slate-600`}>{item.index}</span>
      <span className="absolute bottom-3 right-3 flex size-6 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.025] text-slate-500 transition group-hover:border-cyan-300/20 group-hover:text-cyan-300"><ChevronRight className="size-3.5" /></span>
    </button>
  );
}

function BookControls() {
  const { currentSpread, focusView, nextSpread, previousSpread } = useSpatialCv();
  const closed = currentSpread === 0;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 z-20 flex justify-center">
      <div className="pointer-events-auto flex items-center gap-1 rounded-xl border border-white/[0.07] bg-[#030916]/82 px-1 py-1 text-slate-200 shadow-[0_14px_42px_rgba(0,0,0,.28)] backdrop-blur-xl">
        <button type="button" disabled={closed} onClick={previousSpread} className="flex size-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-cyan-300 disabled:opacity-30" aria-label="Previous spread"><ChevronLeft className="size-3.5" /></button>
        <button type="button" onClick={closed ? nextSpread : () => focusView("overview")} className="flex h-8 items-center gap-2 rounded-lg px-3 text-[9px] font-medium uppercase tracking-[0.14em] text-slate-300 transition hover:bg-white/5"><BookOpen className="size-3.5 text-cyan-300" />{closed ? "Open book" : `${String(currentSpread * 2).padStart(2, "0")}–${String(currentSpread * 2 + 1).padStart(2, "0")} / ${BOOK_SPREADS.length * 2 - 1}`}</button>
        <button type="button" disabled={currentSpread === BOOK_SPREADS.length - 1} onClick={nextSpread} className="flex size-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-cyan-300 disabled:opacity-30" aria-label="Next spread"><ChevronRight className="size-3.5" /></button>
      </div>
    </div>
  );
}

function JumpToPage() {
  const { currentSpread, goToSpread } = useSpatialCv();
  const visibleSpreads = BOOK_SPREADS.slice(1);

  return (
    <aside className="hidden self-center xl:block" aria-label="Jump to CV page">
      <div className="rounded-[18px] border border-white/[0.07] bg-[#06101e]/72 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.035)] backdrop-blur-2xl">
        <p className="text-[8px] font-mono uppercase tracking-[0.17em] text-slate-400">Jump to page</p>
        <div className="relative mt-3 space-y-0.5 before:absolute before:bottom-3 before:left-[5px] before:top-3 before:w-px before:bg-white/[0.08]">
          {visibleSpreads.map((spread, index) => {
            const spreadIndex = index + 1;
            const active = spreadIndex === currentSpread;
            return (
              <button key={spread.id} type="button" onClick={() => goToSpread(spreadIndex)} className={`relative flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left transition ${active ? "text-slate-100" : "text-slate-500 hover:text-slate-300"}`}>
                <span className={`relative z-10 size-2.5 shrink-0 rounded-full border ${active ? "border-cyan-200 bg-cyan-300 shadow-[0_0_12px_#22d3ee]" : "border-slate-600 bg-[#06101e]"}`} />
                <span className="min-w-0"><span className="block truncate text-[9px] font-medium">{spread.label}</span><span className="mt-0.5 block text-[8px] text-slate-600">Page {String(spreadIndex * 2).padStart(2, "0")}</span></span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-3 rounded-[16px] border border-cyan-300/[0.08] bg-cyan-300/[0.025] p-3 text-[9px] leading-4 text-slate-500">Use the page edge or chapter navigation to move through the CV.</div>
    </aside>
  );
}

export function SpatialCvExplorerShell() {
  const { currentSpread, activeView } = useSpatialCv();
  const closed = currentSpread === 0;
  const current = BOOK_SPREADS[currentSpread];

  return (
    <div className="relative mx-auto w-full max-w-[118rem] px-4 pb-4 pt-1 sm:px-5 lg:px-6">
      {closed ? (
        <div className="grid min-h-[calc(100vh-4.3rem)] items-center gap-5 xl:grid-cols-[0.64fr_1.72fr_0.64fr] xl:gap-7">
          <aside className="order-2 grid gap-3 sm:grid-cols-3 xl:order-1 xl:grid-cols-1 xl:self-center" aria-label="CV sections">
            {items.slice(0, 3).map((item) => <SectionCard key={item.view} item={item} />)}
          </aside>
          <div className="relative order-1 min-w-0 xl:order-2">
            <Hero3DCanvasLoader />
            <BookControls />
          </div>
          <aside className="order-3 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 xl:self-center" aria-label="More CV sections">
            {items.slice(3).map((item) => <SectionCard key={item.view} item={item} />)}
          </aside>
        </div>
      ) : (
        <div className="grid min-h-[calc(100vh-4.2rem)] items-center gap-4 xl:grid-cols-[0.42fr_2.08fr_0.54fr] xl:gap-5">
          <aside className="order-2 grid gap-2 sm:grid-cols-3 xl:order-1 xl:grid-cols-1 xl:self-center" aria-label="CV chapters">
            {items.map((item) => <SectionCard key={item.view} item={item} compact />)}
          </aside>
          <div className="relative order-1 min-w-0 xl:order-2">
            <Hero3DCanvasLoader />
            <BookControls />
          </div>
          <div className="order-3"><JumpToPage /></div>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-2 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 text-[8px] uppercase tracking-[0.15em] text-slate-600 2xl:flex">
        <span className="inline-flex items-center gap-1.5"><MousePointer2 className="size-3 text-cyan-400/70" />{closed ? "Drag to rotate" : "Turn page"}</span>
        <span>•</span>
        <span>Scroll / pinch</span>
        <span>•</span>
        <span>{activeView === "overview" ? "Cover" : current?.label}</span>
      </div>
    </div>
  );
}
