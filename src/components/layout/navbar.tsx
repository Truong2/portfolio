"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/data/profile";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = React.useState<string>(sectionIds[0]);

  React.useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that's
        // currently intersecting, to avoid flicker between adjacent
        // sections while scrolling.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

function NavLink({
  id,
  label,
  active,
  onNavigate,
}: {
  id: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={`#${id}`}
      onClick={onNavigate}
      aria-current={active ? "true" : undefined}
      className={cn(
        "text-sm font-medium transition-colors hover:text-foreground",
        active ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {label}
    </a>
  );
}

function MobileDrawer({
  open,
  onClose,
  activeId,
}: {
  open: boolean;
  onClose: () => void;
  activeId: string;
}) {
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const firstLinkRef = React.useRef<HTMLAnchorElement>(null);

  // Basic focus trap + Escape-to-close + focus first link on open.
  React.useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-0 z-50 flex flex-col bg-background p-6 md:hidden"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Menu</span>
        <Button variant="ghost" size="icon" aria-label="Close menu" onClick={onClose}>
          <X className="size-5" />
        </Button>
      </div>
      <nav aria-label="Mobile" className="mt-10 flex flex-col gap-6">
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.id}
            ref={i === 0 ? firstLinkRef : undefined}
            href={`#${item.id}`}
            onClick={onClose}
            aria-current={activeId === item.id ? "true" : undefined}
            className={cn(
              "text-2xl font-semibold",
              activeId === item.id ? "text-primary" : "text-foreground",
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
  const [scrolled, setScrolled] = React.useState(false);
  const activeId = useActiveSection(NAV_ITEMS.map((n) => n.id));

  React.useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-sm"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6"
      >
        <a href="#hero" className="text-sm font-semibold">
          {personalInfo.name}
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.id} {...item} active={activeId === item.id} />
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </nav>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} activeId={activeId} />
    </header>
  );
}
