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
  const { currentSpread } = useSpatialCv();
  const lightMode = resolvedTheme === "light";
  const open = currentSpread > 0;

  if (!webglSupported) return <StaticFallback />;

  return (
    <div
      aria-label="Interactive 3D CV book. Open the cover, turn pages, or select a CV section to jump directly to its chapter."
      className={`relative w-full overflow-hidden transition-[height,min-height] duration-500 ${open ? "h-[calc(100vh-5.7rem)] min-h-[42rem] max-h-[61rem]" : "h-[calc(100vh-5.8rem)] min-h-[38rem] max-h-[54rem]"}`}
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        fallback={<StaticFallback />}
      >
        <PerspectiveCamera makeDefault position={[0, open ? 1.16 : 0.36, open ? 12.4 : 11.55]} fov={open ? 36 : 36} />
        <SpatialCvScene reducedMotion={reducedMotion} lightMode={lightMode} />
      </Canvas>
    </div>
  );
}
