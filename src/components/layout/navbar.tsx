"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/profile";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Capabilities" },
  { id: "experience", label: "Case Studies" },
  { id: "standards", label: "Standards" },
  { id: "contact", label: "Contact" },
] as const;

function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = React.useState<string>(sectionIds[0] ?? "about");

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
      { rootMargin: "-38% 0px -52% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

function Brand() {
  return (
    <a href="#hero" className="group flex items-center gap-3" aria-label="Back to top">
      <span className="relative flex size-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 font-mono text-xs font-bold tracking-[0.16em] text-accent shadow-[0_0_28px_rgba(34,211,238,0.12)] transition group-hover:border-accent/55">
        NVT
      </span>
      <span className="hidden sm:block">
        <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-foreground">
          {personalInfo.name}
        </span>
        <span className="mt-1 block text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          Frontend systems
        </span>
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
        "relative py-6 text-sm font-medium transition-colors after:absolute after:bottom-3 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-accent after:opacity-0 after:shadow-[0_0_12px_currentColor] after:transition-opacity",
        active
          ? "text-foreground after:opacity-100"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </a>
  );
}

function MobileDrawer({
  open,
  activeId,
  onClose,
}: {
  open: boolean;
  activeId: string;
  onClose: () => void;
}) {
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
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-0 z-50 bg-background/98 p-5 backdrop-blur-2xl md:hidden"
    >
      <div className="flex items-center justify-between">
        <Brand />
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
          <X className="size-5" />
        </Button>
      </div>
      <nav className="mt-16 flex flex-col" aria-label="Mobile">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.id}
            ref={index === 0 ? firstLinkRef : undefined}
            href={`#${item.id}`}
            onClick={onClose}
            className={cn(
              "border-b border-border/60 py-5 text-3xl font-semibold tracking-[-0.04em]",
              activeId === item.id ? "text-gradient" : "text-foreground",
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id));

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-2xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[74px] max-w-[96rem] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <Brand />

        <div className="hidden items-center gap-7 md:flex lg:gap-10">
          {NAV_ITEMS.map((item) => (
            <DesktopLink key={item.id} {...item} active={activeId === item.id} />
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl border border-border/70 bg-card/60"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </nav>
      <MobileDrawer open={drawerOpen} activeId={activeId} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
