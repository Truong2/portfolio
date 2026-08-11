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

interface SpatialCvContextValue {
  activeView: CvView;
  currentSpread: number;
  direction: -1 | 0 | 1;
  focusView: (view: CvView) => void;
  goToSpread: (index: number) => void;
  nextSpread: () => void;
  previousSpread: () => void;
}

const SpatialCvContext = React.createContext<SpatialCvContextValue | null>(null);

export function SpatialCvProvider({ children }: { children: React.ReactNode }) {
  const [currentSpread, setCurrentSpread] = React.useState(0);
  const [direction, setDirection] = React.useState<-1 | 0 | 1>(0);

  const goToSpread = React.useCallback((index: number) => {
    setCurrentSpread((current) => {
      const next = Math.max(0, Math.min(BOOK_SPREADS.length - 1, index));
      setDirection(next === current ? 0 : next > current ? 1 : -1);
      return next;
    });
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const focusView = React.useCallback((view: CvView) => goToSpread(VIEW_TO_SPREAD[view]), [goToSpread]);
  const nextSpread = React.useCallback(() => goToSpread(currentSpread + 1), [currentSpread, goToSpread]);
  const previousSpread = React.useCallback(() => goToSpread(currentSpread - 1), [currentSpread, goToSpread]);
  const activeView = BOOK_SPREADS[currentSpread]?.view ?? "overview";

  return (
    <SpatialCvContext.Provider value={{ activeView, currentSpread, direction, focusView, goToSpread, nextSpread, previousSpread }}>
      {children}
    </SpatialCvContext.Provider>
  );
}

export function useSpatialCv() {
  const value = React.useContext(SpatialCvContext);
  if (!value) throw new Error("useSpatialCv must be used inside SpatialCvProvider");
  return value;
}
