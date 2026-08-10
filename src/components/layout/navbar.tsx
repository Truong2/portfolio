"use client";

import * as React from "react";
import { Download, ExternalLink, Mail, Menu, X } from "lucide-react";

import { type CvView, useSpatialCv } from "@/components/spatial-cv-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/profile";
import { cn } from "@/lib/utils";

const NAV_ITEMS: ReadonlyArray<{ view: CvView; label: string }> = [
  { view: "overview", label: "Home" },
  { view: "experience", label: "Experience" },
  { view: "projects", label: "Projects" },
  { view: "skills", label: "Skills" },
  { view: "education", label: "Education" },
  { view: "contact", label: "Contact" },
] as const;

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
      className="group flex items-center gap-3"
      aria-label="Open CV overview"
    >
      <span className="relative flex size-9 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/7 font-mono text-[10px] font-bold tracking-[0.12em] text-cyan-300 neon-border">NVT</span>
      <span className="hidden sm:block">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">{personalInfo.name}</span>
        <span className="mt-0.5 block text-[9px] text-muted-foreground">Frontend Developer</span>
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
        "relative py-5 text-[11px] font-medium transition-colors after:absolute after:bottom-2.5 after:left-1/2 after:h-px after:w-6 after:-translate-x-1/2 after:bg-cyan-300 after:opacity-0 after:shadow-[0_0_10px_currentColor] after:transition-opacity",
        active ? "text-foreground after:opacity-100" : "text-muted-foreground hover:text-foreground",
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
    <div role="dialog" aria-modal="true" aria-label="CV navigation" className="fixed inset-0 z-50 bg-background/98 p-5 backdrop-blur-2xl md:hidden">
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
            className={cn("border-b border-border/60 py-5 text-3xl font-semibold tracking-[-0.04em]", activeView === item.view ? "text-gradient" : "text-foreground")}
          >
            {item.label}
          </a>
        ))}
        <a href={personalInfo.resumeUrl} download className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 px-6 text-sm font-semibold text-white">
          <Download className="size-4" /> Download CV
        </a>
      </nav>
    </div>
  );
}

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { activeView } = useSpatialCv();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/82 backdrop-blur-2xl">
      <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-[100rem] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Brand />
        <div className="hidden items-center gap-5 md:flex lg:gap-7">
          {NAV_ITEMS.map((item) => <DesktopLink key={item.view} {...item} active={activeView === item.view} />)}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="icon-tile size-9 text-muted-foreground transition hover:text-accent"><ExternalLink className="size-4" /></a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Send email" className="icon-tile size-9 text-muted-foreground transition hover:text-accent"><Mail className="size-4" /></a>
          <ThemeToggle />
          <a href={personalInfo.resumeUrl} download className="ml-2 inline-flex h-9 items-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-300/7 px-4 text-xs font-semibold text-foreground transition hover:bg-cyan-300/12">
            <Download className="size-3.5" /> Download CV
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-lg border border-border/70 bg-card/60" onClick={() => setDrawerOpen(true)} aria-label="Open menu" aria-expanded={drawerOpen}><Menu className="size-5" /></Button>
        </div>
      </nav>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
