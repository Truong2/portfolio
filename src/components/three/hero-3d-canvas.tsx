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
  const { activeView, currentSpread } = useSpatialCv();
  const lightMode = resolvedTheme === "light";
  const open = currentSpread > 0;

  if (!webglSupported) return <StaticFallback />;

  return (
    <div
      aria-label="Interactive 3D CV book. Open the cover, turn pages, or select a CV section to jump directly to its chapter."
      className={`relative w-full overflow-hidden rounded-[1.4rem] border border-border/60 bg-[#030711] shadow-[0_34px_120px_rgba(17,24,85,0.42)] transition-[height,min-height,aspect-ratio] duration-500 ${open ? "h-[calc(100vh-7.2rem)] min-h-[44rem] max-h-[68rem]" : "aspect-[1.28/1] min-h-[38rem] sm:min-h-[44rem] xl:min-h-[48rem]"}`}
    >
      <Canvas dpr={[1, 1.5]} frameloop="always" gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} fallback={<StaticFallback />}>
        <PerspectiveCamera makeDefault position={[0, 0.2, open ? 10.6 : 9.4]} fov={open ? 40 : 42} />
        <SpatialCvScene reducedMotion={reducedMotion} lightMode={lightMode} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.18em] text-white/40">
        <span>{open ? "Interactive CV · open book" : "Interactive CV · cover"}</span>
        <span>{open ? activeView : reducedMotion ? "Reduced motion" : "Drag · zoom · open"}</span>
      </div>
    </div>
  );
}
