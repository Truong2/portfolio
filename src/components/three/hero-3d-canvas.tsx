"use client";

import * as React from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { RotateCcw } from "lucide-react";
import { useTheme } from "next-themes";

import { useSpatialCv } from "@/components/spatial-cv-context";

import { SpatialCvScene } from "./spatial-cv-scene";
import { StaticFallback } from "./static-fallback";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() { return window.matchMedia(REDUCED_MOTION_QUERY).matches; }
function useReducedMotion(): boolean {
  return React.useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);
}

export function Hero3DCanvas() {
  const [webglSupported] = React.useState(() => detectWebGL());
  const reducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const { activeView, focusView } = useSpatialCv();
  const lightMode = resolvedTheme === "light";

  if (!webglSupported) return <StaticFallback />;

  return (
    <div
      aria-label="Interactive spatial CV. Drag to rotate, scroll or pinch to zoom, and select a CV panel to focus the camera."
      className="relative aspect-[1.25/1] min-h-[28rem] w-full overflow-hidden rounded-2xl border border-border/60 bg-[#040610] shadow-[0_34px_120px_rgba(17,24,85,0.42)] sm:min-h-[38rem]"
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        fallback={<StaticFallback />}
      >
        <PerspectiveCamera makeDefault position={[0, 0.5, 10.8]} fov={43} />
        <SpatialCvScene reducedMotion={reducedMotion} lightMode={lightMode} />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3 sm:inset-x-5">
        <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/55 backdrop-blur-xl">
          <span className="block text-cyan-300">Spatial CV Explorer</span>
          <span className="mt-1 block normal-case tracking-normal text-white/45">Select a panel · drag to orbit · scroll to zoom</span>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/60 backdrop-blur-xl">
            {activeView === "overview" ? "Overview" : `Focus: ${activeView}`}
          </span>
          {activeView !== "overview" && (
            <button
              type="button"
              onClick={() => focusView("overview")}
              className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-white/65 backdrop-blur-xl transition hover:border-cyan-300/35 hover:text-cyan-200"
              aria-label="Return to spatial CV overview"
            >
              <RotateCcw className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-center text-[9px] uppercase tracking-[0.18em] text-white/45 backdrop-blur-xl">
        {reducedMotion ? "Manual navigation" : "Interactive camera navigation"}
      </div>
    </div>
  );
}
