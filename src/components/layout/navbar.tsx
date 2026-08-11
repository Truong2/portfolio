"use client";

import * as React from "react";
import { Download, Menu, X } from "lucide-react";

import { type CvView, useSpatialCv } from "@/components/spatial-cv-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/profile";
import { cn } from "@/lib/utils";

const NAV_ITEMS: ReadonlyArray<{ view: CvView; label: string }> = [
  { view: "overview", label: "Overview" },
  { view: "profile", label: "About Me" },
  { view: "projects", label: "Highlights" },
  { view: "experience", label: "Achievements" },
] as const;

function BrandMark() {
  return (
    <span className="relative flex size-9 items-center justify-center">
      <span className="absolute left-[7px] top-[6px] h-6 w-[7px] -skew-y-[32deg] rounded-[2px] bg-gradient-to-b from-cyan-300 to-blue-500 shadow-[0_0_18px_rgba(34,211,238,.45)]" />
      <span className="absolute right-[7px] top-[6px] h-6 w-[7px] skew-y-[32deg] rounded-[2px] bg-gradient-to-b from-violet-400 to-blue-500 shadow-[0_0_18px_rgba(139,92,246,.4)]" />
      <span className="absolute left-[14px] top-[10px] h-[18px] w-[7px] rotate-[-43deg] rounded-[2px] bg-gradient-to-b from-cyan-200 to-violet-400" />
    </span>
  );
}

function Brand() {
  const { focusView } = useSpatialCv();
  return (
    <a
      href="#hero"
      onClick={(event) => {
        event.preventDefault();
        focusView("overview");
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="group flex items-center gap-2.5"
      aria-label="Open CV overview"
    >
      <BrandMark />
      <span className="hidden sm:block">
        <span className="block text-[10px] font-semibold tracking-[-0.01em] text-slate-100">{personalInfo.name}</span>
        <span className="mt-0.5 block text-[8px] text-slate-500">Portfolio</span>
      </span>
    </a>
  );
}

function DesktopLink({ view, label, active }: { view: CvView; label: string; active: boolean }) {
  const { focusView } = useSpatialCv();
  return (
    <a
      href="#hero"
      onClick={(event) => {
        event.preventDefault();
        focusView(view);
      }}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex h-12 items-center px-2 text-[10px] font-medium transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-11 after:-translate-x-1/2 after:bg-cyan-300 after:opacity-0 after:shadow-[0_0_13px_#22d3ee] after:transition-opacity",
        active ? "text-cyan-200 after:opacity-100" : "text-slate-400 hover:text-slate-100",
      )}
    >
      {label}
    </a>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const firstLinkRef = React.useRef<HTMLAnchorElement>(null);
  const { activeView, focusView } = useSpatialCv();

  React.useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    function handleEscape(event: KeyboardEvent) { if (event.key === "Escape") onClose(); }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="CV navigation" className="fixed inset-0 z-50 bg-[#020711]/98 p-5 backdrop-blur-2xl md:hidden">
      <div className="flex items-center justify-between">
        <Brand />
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu"><X className="size-5" /></Button>
      </div>
      <nav className="mt-14 flex flex-col" aria-label="Mobile CV navigation">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.view}
            ref={index === 0 ? firstLinkRef : undefined}
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              focusView(item.view);
              onClose();
            }}
            className={cn("border-b border-white/8 py-5 text-3xl font-semibold tracking-[-0.04em]", activeView === item.view ? "text-gradient" : "text-slate-100")}
          >
            {item.label}
          </a>
        ))}
        <a href={personalInfo.resumeUrl} download className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-300/8 px-6 text-sm font-semibold text-white">
          <Download className="size-4" /> Download CV
        </a>
      </nav>
    </div>
  );
}

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-transparent px-3 pt-3 sm:px-4">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-12 max-w-[120rem] items-center justify-between rounded-2xl border border-white/[0.07] bg-[#030916]/88 px-4 shadow-[0_16px_60px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.035)] backdrop-blur-2xl sm:px-5"
      >
        <Brand />
        <div className="hidden items-center gap-4 md:flex lg:gap-8">
          {NAV_ITEMS.map((item) => <DesktopLink key={item.view} {...item} active={item.view === "overview"} />)}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a href={personalInfo.resumeUrl} download className="ml-1 inline-flex h-8 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 text-[10px] font-medium text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/5">
            <Download className="size-3.5" /> Download CV
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-xl border border-white/10 bg-[#050c19]/80" onClick={() => setDrawerOpen(true)} aria-label="Open menu" aria-expanded={drawerOpen}><Menu className="size-5" /></Button>
        </div>
      </nav>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
