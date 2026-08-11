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
import { personalInfo } from "@/data/profile";

const items: Array<{
  view: Exclude<CvView, "overview">;
  index: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  accent: "cyan" | "violet";
}> = [
  { view: "profile", index: "01", title: "Profile", description: "About me and personal info", icon: UsersRound, accent: "cyan" },
  { view: "experience", index: "02", title: "Experience", description: "My work history and professional journey", icon: Activity, accent: "violet" },
  { view: "projects", index: "03", title: "Projects", description: "Featured projects and case studies", icon: Braces, accent: "cyan" },
  { view: "skills", index: "04", title: "Skills", description: "Technologies and core competencies", icon: Blocks, accent: "cyan" },
  { view: "education", index: "05", title: "Education", description: "Academic background and qualifications", icon: GraduationCap, accent: "violet" },
  { view: "contact", index: "06", title: "Contact", description: "Get in touch and connect", icon: Mail, accent: "cyan" },
];

function SectionCard({ item, compact = false }: { item: (typeof items)[number]; compact?: boolean }) {
  const { activeView, focusView } = useSpatialCv();
  const Icon = item.icon;
  const active = activeView === item.view;
  const violet = item.accent === "violet";

  return (
    <button
      type="button"
      onClick={() => focusView(item.view)}
      className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-[16px] border text-left backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 ${compact ? "min-h-[78px] px-3.5 py-3" : "min-h-[92px] px-4 py-4"} ${active ? "border-violet-400/65 bg-gradient-to-r from-violet-500/[0.13] to-cyan-400/[0.04] shadow-[0_0_34px_rgba(124,58,237,.22),inset_0_1px_0_rgba(255,255,255,.05)]" : "border-white/[0.08] bg-[#06101e]/76 shadow-[inset_0_1px_0_rgba(255,255,255,.035)] hover:border-cyan-300/34"}`}
    >
      <span className={`pointer-events-none absolute inset-y-0 left-0 w-px ${active || violet ? "bg-violet-400 shadow-[0_0_18px_#8b5cf6]" : "bg-cyan-300/70 shadow-[0_0_15px_#22d3ee]"}`} />
      <span className={`${compact ? "size-10" : "size-11"} flex shrink-0 items-center justify-center rounded-[13px] border ${violet ? "border-violet-300/20 bg-violet-400/[0.07] text-violet-300" : "border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300"} shadow-[inset_0_1px_0_rgba(255,255,255,.05)]`}><Icon className={compact ? "size-[17px]" : "size-[18px]"} /></span>
      <span className="min-w-0 flex-1 pr-7">
        <strong className={`${compact ? "text-[12px]" : "text-[13px]"} block font-semibold tracking-[-0.01em] text-slate-100`}>{item.title}</strong>
        <span className={`${compact ? "mt-1 text-[8px] leading-[1.05rem]" : "mt-1 text-[10px] leading-[1.28rem]"} block max-w-[11rem] text-slate-500`}>{item.description}</span>
      </span>
      <span className={`${compact ? "text-[15px]" : "text-lg"} absolute right-4 top-3 font-mono font-medium ${active ? "text-violet-400" : "text-slate-600"}`}>{item.index}</span>
      <span className={`absolute ${compact ? "bottom-2.5 right-2.5 size-6" : "bottom-3 right-3 size-6"} flex items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.025] text-slate-500 transition group-hover:border-cyan-300/20 group-hover:text-cyan-300`}><ChevronRight className="size-3.5" /></span>
    </button>
  );
}

function BookControls() {
  const { currentSpread, focusView, nextSpread, previousSpread } = useSpatialCv();
  const closed = currentSpread === 0;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 z-20 flex justify-center">
      <div className="pointer-events-auto flex items-center gap-1 rounded-xl border border-white/[0.07] bg-[#030916]/86 px-1.5 py-1.5 text-slate-200 shadow-[0_14px_42px_rgba(0,0,0,.32)] backdrop-blur-xl">
        <button type="button" disabled={closed} onClick={previousSpread} className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-cyan-300 disabled:opacity-30" aria-label="Previous spread"><ChevronLeft className="size-4" /></button>
        <button type="button" onClick={closed ? nextSpread : () => focusView("overview")} className="flex h-9 items-center gap-2.5 rounded-lg px-4 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-300 transition hover:bg-white/5"><BookOpen className="size-4 text-cyan-300" />{closed ? "Open book" : `${String(currentSpread * 2 + 4).padStart(2, "0")}–${String(currentSpread * 2 + 5).padStart(2, "0")} / 12`}</button>
        <button type="button" disabled={currentSpread === BOOK_SPREADS.length - 1} onClick={nextSpread} className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-cyan-300 disabled:opacity-30" aria-label="Next spread"><ChevronRight className="size-4" /></button>
      </div>
    </div>
  );
}

function JumpToPage() {
  const { currentSpread, activeView, goToSpread } = useSpatialCv();
  const relevant = BOOK_SPREADS
    .map((spread, index) => ({ spread, index }))
    .filter(({ spread, index }) => index > 0 && spread.view === activeView);

  const chapterEntries = relevant.length > 0 ? relevant : [{ spread: BOOK_SPREADS[currentSpread]!, index: currentSpread }];
  const experienceLabels = ["Professional Summary", "Experience Timeline", "Key Highlights", "Featured Roles", "Tech Stack"];

  return (
    <aside className="hidden xl:block" aria-label="Jump to CV page">
      <div className="rounded-[17px] border border-white/[0.07] bg-[#06101e]/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.035)] backdrop-blur-2xl">
        <p className="text-[9px] font-mono uppercase tracking-[0.17em] text-slate-400">Jump to page</p>
        <div className="relative mt-4 space-y-1.5 before:absolute before:bottom-3 before:left-[6px] before:top-3 before:w-px before:bg-white/[0.08]">
          {(activeView === "experience" ? experienceLabels : chapterEntries.map(({ spread }) => spread.label)).map((label, index) => {
            const target = activeView === "experience" ? chapterEntries[Math.min(index >= 3 ? 1 : 0, chapterEntries.length - 1)] : chapterEntries[Math.min(index, chapterEntries.length - 1)];
            const active = target?.index === currentSpread;
            return (
              <button key={`${label}-${index}`} type="button" onClick={() => target && goToSpread(target.index)} className={`relative flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left transition ${active ? "text-slate-100" : "text-slate-500 hover:text-slate-300"}`}>
                <span className={`relative z-10 size-2.5 shrink-0 rounded-full border ${active ? "border-cyan-200 bg-cyan-300 shadow-[0_0_12px_#22d3ee]" : "border-slate-600 bg-[#06101e]"}`} />
                <span className="min-w-0"><span className="block truncate text-[9px] font-medium">{label}</span><span className="mt-0.5 block text-[8px] text-slate-600">Page {String(8 + index).padStart(2, "0")}</span></span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex gap-2.5 rounded-[15px] border border-cyan-300/[0.08] bg-cyan-300/[0.025] p-3.5 text-[9px] leading-4 text-slate-500">
        <MousePointer2 className="mt-0.5 size-4 shrink-0 text-cyan-300" />
        <span>Click section chips or use navigation to jump to any page.</span>
      </div>
    </aside>
  );
}

function SocialDock() {
  return (
    <div className="absolute bottom-3 left-4 z-30 hidden items-center gap-4 rounded-xl border border-white/[0.06] bg-[#050b17]/72 px-4 py-2.5 text-[9px] text-slate-600 backdrop-blur-xl xl:flex">
      <span>Find me on</span>
      <a href="https://github.com/Truong2" target="_blank" rel="noreferrer" aria-label="GitHub" className="flex size-6 items-center justify-center rounded border border-white/[0.06] text-[9px] font-semibold text-slate-500 transition hover:text-cyan-300">GH</a>
      <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex size-6 items-center justify-center rounded border border-white/[0.06] text-[9px] font-semibold text-slate-500 transition hover:text-cyan-300">in</a>
    </div>
  );
}

function CopyrightDock() {
  return <div className="absolute bottom-3 right-4 z-30 hidden rounded-xl border border-white/[0.06] bg-[#050b17]/72 px-4 py-2.5 text-[9px] text-slate-600 backdrop-blur-xl xl:block">© Nguyen Van Truong. All rights reserved.</div>;
}

function CoverInstruction() {
  return (
    <div className="absolute bottom-24 right-1 z-30 hidden w-48 items-center gap-3 rounded-xl border border-white/[0.07] bg-[#07101f]/82 p-3.5 text-[9px] leading-4 text-slate-400 backdrop-blur-xl 2xl:flex">
      <div className="relative flex size-11 shrink-0 items-center justify-center rounded-lg border border-cyan-300/10 bg-cyan-300/[0.025]">
        <BookOpen className="size-5 text-slate-500" />
        <MousePointer2 className="absolute -bottom-1 -right-1 size-4 text-cyan-300" />
      </div>
      <span>Drag or click the edge of the book to turn <strong className="font-medium text-cyan-300">the page</strong></span>
    </div>
  );
}

export function SpatialCvExplorerShell() {
  const { currentSpread } = useSpatialCv();
  const closed = currentSpread === 0;

  return (
    <div className="relative mx-auto w-full max-w-[118rem] px-4 pb-3 pt-1 sm:px-5 lg:px-6">
      {closed ? (
        <div className="grid min-h-[calc(100vh-5.4rem)] items-start gap-5 pt-5 xl:grid-cols-[0.58fr_1.84fr_0.58fr] xl:gap-6">
          <aside className="order-2 grid gap-3.5 pt-10 sm:grid-cols-3 xl:order-1 xl:grid-cols-1 xl:pt-20" aria-label="CV sections">
            {items.slice(0, 3).map((item) => <SectionCard key={item.view} item={item} />)}
          </aside>
          <div className="relative order-1 min-w-0 xl:order-2">
            <Hero3DCanvasLoader />
            <BookControls />
          </div>
          <aside className="order-3 grid gap-3.5 pt-10 sm:grid-cols-3 xl:grid-cols-1 xl:pt-20" aria-label="More CV sections">
            {items.slice(3).map((item) => <SectionCard key={item.view} item={item} />)}
            <CoverInstruction />
          </aside>
        </div>
      ) : (
        <div className="grid min-h-[calc(100vh-5.25rem)] items-start gap-4 pt-3 xl:grid-cols-[0.56fr_2.18fr_0.58fr] xl:gap-5">
          <aside className="order-2 grid gap-2.5 pt-7 sm:grid-cols-3 xl:order-1 xl:grid-cols-1 xl:pt-10" aria-label="CV chapters">
            {items.map((item) => <SectionCard key={item.view} item={item} compact />)}
          </aside>
          <div className="relative order-1 min-w-0 xl:order-2">
            <Hero3DCanvasLoader />
            <BookControls />
          </div>
          <div className="order-3 pt-8 xl:pt-14"><JumpToPage /></div>
        </div>
      )}
      <SocialDock />
      <CopyrightDock />
    </div>
  );
}