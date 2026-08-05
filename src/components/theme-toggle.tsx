"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, MonitorSmartphone } from "lucide-react";

import { Button } from "@/components/ui/button";

const THEMES = ["light", "dark", "system"] as const;
type ThemeName = (typeof THEMES)[number];

const ICONS: Record<ThemeName, React.ReactNode> = {
  light: <Sun className="size-4" />,
  dark: <Moon className="size-4" />,
  system: <MonitorSmartphone className="size-4" />,
};

const LABELS: Record<ThemeName, string> = {
  light: "Light theme",
  dark: "Dark theme",
  system: "System theme",
};

// Avoid rendering theme-dependent icon before mount to prevent hydration
// mismatch. Uses the useSyncExternalStore "has mounted" trick instead of
// useState+useEffect, since setState-in-effect triggers a cascading-render
// lint error and useSyncExternalStore is the correct primitive here: the
// server snapshot (false) and client snapshot (true) intentionally differ.
function subscribeNoop() {
  return () => {};
}
function getClientSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}
function useHasMounted() {
  return React.useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useHasMounted();

  const current = (mounted ? (theme as ThemeName) : "system") ?? "system";

  function cycleTheme() {
    const currentIndex = THEMES.indexOf(current);
    const next = THEMES[(currentIndex + 1) % THEMES.length];
    setTheme(next);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      aria-label={`Switch theme, currently ${LABELS[current]}`}
      title={LABELS[current]}
    >
      {mounted ? ICONS[current] : <MonitorSmartphone className="size-4" />}
    </Button>
  );
}
