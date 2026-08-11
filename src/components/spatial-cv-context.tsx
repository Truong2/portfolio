"use client";

import * as React from "react";

export type CvView =
  | "overview"
  | "profile"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "contact";

export const BOOK_SPREADS: ReadonlyArray<{ id: string; view: CvView; label: string }> = [
  { id: "cover", view: "overview", label: "Cover" },
  { id: "profile", view: "profile", label: "Profile" },
  { id: "experience-roles", view: "experience", label: "Experience · Roles" },
  { id: "experience-delivery", view: "experience", label: "Experience · Delivery" },
  { id: "projects-enterprise", view: "projects", label: "Projects · Enterprise" },
  { id: "projects-spatial", view: "projects", label: "Projects · Spatial & Web3" },
  { id: "skills", view: "skills", label: "Skills" },
  { id: "education", view: "education", label: "Education" },
  { id: "contact", view: "contact", label: "Contact" },
] as const;

const VIEW_TO_SPREAD: Record<CvView, number> = {
  overview: 0,
  profile: 1,
  experience: 2,
  projects: 4,
  skills: 6,
  education: 7,
  contact: 8,
};

const PAGE_FLIP_STEP_MS = 680;

interface SpatialCvContextValue {
  activeView: CvView;
  currentSpread: number;
  targetSpread: number;
  direction: -1 | 0 | 1;
  isTurning: boolean;
  focusView: (view: CvView) => void;
  goToSpread: (index: number) => void;
  nextSpread: () => void;
  previousSpread: () => void;
}

const SpatialCvContext = React.createContext<SpatialCvContextValue | null>(null);

function clampSpread(index: number) {
  return Math.max(0, Math.min(BOOK_SPREADS.length - 1, index));
}

export function SpatialCvProvider({ children }: { children: React.ReactNode }) {
  const [currentSpread, setCurrentSpread] = React.useState(0);
  const [targetSpread, setTargetSpread] = React.useState(0);
  const [direction, setDirection] = React.useState<-1 | 0 | 1>(0);
  const isTurning = currentSpread !== targetSpread;

  React.useEffect(() => {
    if (currentSpread === targetSpread) return;

    const timer = window.setTimeout(() => {
      setCurrentSpread((current) => {
        if (current === targetSpread) return current;
        const nextDirection: -1 | 1 = targetSpread > current ? 1 : -1;
        setDirection(nextDirection);
        return current + nextDirection;
      });
    }, PAGE_FLIP_STEP_MS);

    return () => window.clearTimeout(timer);
  }, [currentSpread, targetSpread]);

  const goToSpread = React.useCallback((index: number) => {
    const nextTarget = clampSpread(index);
    setTargetSpread(nextTarget);
    setCurrentSpread((current) => {
      if (current === nextTarget) {
        setDirection(0);
        return current;
      }
      const nextDirection: -1 | 1 = nextTarget > current ? 1 : -1;
      setDirection(nextDirection);
      return current + nextDirection;
    });
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const focusView = React.useCallback((view: CvView) => goToSpread(VIEW_TO_SPREAD[view]), [goToSpread]);
  const nextSpread = React.useCallback(() => goToSpread(targetSpread + 1), [goToSpread, targetSpread]);
  const previousSpread = React.useCallback(() => goToSpread(targetSpread - 1), [goToSpread, targetSpread]);
  const activeView = BOOK_SPREADS[targetSpread]?.view ?? "overview";

  return (
    <SpatialCvContext.Provider
      value={{
        activeView,
        currentSpread,
        targetSpread,
        direction,
        isTurning,
        focusView,
        goToSpread,
        nextSpread,
        previousSpread,
      }}
    >
      {children}
    </SpatialCvContext.Provider>
  );
}

export function useSpatialCv() {
  const value = React.useContext(SpatialCvContext);
  if (!value) throw new Error("useSpatialCv must be used inside SpatialCvProvider");
  return value;
}
