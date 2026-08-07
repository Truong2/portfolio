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

interface SpatialCvContextValue {
  activeView: CvView;
  focusView: (view: CvView) => void;
}

const SpatialCvContext = React.createContext<SpatialCvContextValue | null>(null);

export function SpatialCvProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = React.useState<CvView>("overview");

  const focusView = React.useCallback((view: CvView) => {
    setActiveView(view);
    if (view !== "overview") {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <SpatialCvContext.Provider value={{ activeView, focusView }}>
      {children}
    </SpatialCvContext.Provider>
  );
}

export function useSpatialCv() {
  const value = React.useContext(SpatialCvContext);
  if (!value) throw new Error("useSpatialCv must be used inside SpatialCvProvider");
  return value;
}
