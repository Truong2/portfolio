"use client";

import * as React from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
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
  const { activeView } = useSpatialCv();
  const lightMode = resolvedTheme === "light";
  const focused = activeView !== "overview";

  if (!webglSupported) return <StaticFallback />;

  return (
    <div
      aria-label="Interactive 3D CV book. Drag to rotate, scroll or pinch to zoom, and select a CV section to focus."
      className={`relative w-full overflow-hidden rounded-[1.4rem] border border-border/60 bg-[#030711] shadow-[0_34px_120px_rgba(17,24,85,0.42)] transition-[height,min-height,aspect-ratio] duration-500 ${focused ? "h-[calc(100vh-9rem)] min-h-[42rem] max-h-[64rem]" : "aspect-[1.18/1] min-h-[34rem] sm:min-h-[42rem] xl:min-h-[46rem]"}`}
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        fallback={<StaticFallback />}
      >
        <PerspectiveCamera makeDefault position={[0.75, 0.35, 9.7]} fov={42} />
        <SpatialCvScene reducedMotion={reducedMotion} lightMode={lightMode} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.18em] text-white/40">
        <span>Interactive CV book</span>
        <span>{focused ? `Focused · ${activeView}` : reducedMotion ? "Reduced motion" : "Live 3D"}</span>
      </div>
    </div>
  );
}
