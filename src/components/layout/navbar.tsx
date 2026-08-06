"use client";

import * as React from "react";
import { ExternalLink, Mail, Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/profile";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Work" },
  { id: "about", label: "About" },
  { id: "standards", label: "Engineering" },
  { id: "skills", label: "Stack" },
] as const;

function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = React.useState<string>(sectionIds[0] ?? "hero");

  React.useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

function Brand() {
  return (
    <a href="#hero" className="group flex items-center gap-3" aria-label="Back to top">
      <span className="relative flex size-9 items-center justify-center rounded-lg border border-primary/35 bg-primary/10 font-mono text-[10px] font-bold tracking-[0.14em] text-primary neon-border">
        NVT
      </span>
      <span className="hidden sm:block">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
          {personalInfo.name}
        </span>
        <span className="mt-0.5 block text-[9px] text-muted-foreground">Frontend Developer</span>
      </span>
    </a>
  );
}

function DesktopLink({ id, label, active }: { id: string; label: string; active: boolean }) {
  return (
    <a
      href={`#${id}`}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative py-5 text-xs font-medium transition-colors after:absolute after:bottom-2.5 after:left-1/2 after:h-px after:w-5 after:-translate-x-1/2 after:bg-primary after:opacity-0 after:shadow-[0_0_10px_currentColor] after:transition-opacity",
        active ? "text-foreground after:opacity-100" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </a>
  );
}

function MobileDrawer({ open, activeId, onClose }: { open: boolean; activeId: string; onClose: () => void }) {
  const firstLinkRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Mobile navigation" className="fixed inset-0 z-50 bg-background/98 p-5 backdrop-blur-2xl md:hidden">
      <div className="flex items-center justify-between">
        <Brand />
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu"><X className="size-5" /></Button>
      </div>
      <nav className="mt-14 flex flex-col" aria-label="Mobile">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.id}
            ref={index === 0 ? firstLinkRef : undefined}
            href={`#${item.id}`}
            onClick={onClose}
            className={cn("border-b border-border/60 py-5 text-3xl font-semibold tracking-[-0.04em]", activeId === item.id ? "text-gradient" : "text-foreground")}
          >
            {item.label}
          </a>
        ))}
        <a href="#contact" onClick={onClose} className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 px-6 text-sm font-semibold text-white">
          Let&apos;s Connect
        </a>
      </nav>
    </div>
  );
}

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id));

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/82 backdrop-blur-2xl">
      <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-[96rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Brand />

        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {NAV_ITEMS.map((item) => <DesktopLink key={item.id} {...item} active={activeId === item.id} />)}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="icon-tile size-9 text-muted-foreground transition hover:text-accent">
            <ExternalLink className="size-4" />
          </a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Send email" className="icon-tile size-9 text-muted-foreground transition hover:text-accent">
            <Mail className="size-4" />
          </a>
          <ThemeToggle />
          <a href="#contact" className="ml-2 inline-flex h-9 items-center rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 px-4 text-xs font-semibold text-white shadow-lg shadow-primary/20">
            Let&apos;s Connect
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-lg border border-border/70 bg-card/60" onClick={() => setDrawerOpen(true)} aria-label="Open menu" aria-expanded={drawerOpen}>
            <Menu className="size-5" />
          </Button>
        </div>
      </nav>
      <MobileDrawer open={drawerOpen} activeId={activeId} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
