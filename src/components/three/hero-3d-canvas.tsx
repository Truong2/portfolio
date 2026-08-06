"use client";

import * as React from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";

import { StaticFallback } from "./static-fallback";
import { TechCardsScene } from "./tech-cards-scene";

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
  const lightMode = resolvedTheme === "light";

  if (!webglSupported) return <StaticFallback />;

  return (
    <div aria-label="Interactive 3D enterprise crystal. Drag to rotate and scroll or pinch to zoom." className="relative aspect-[1.12/1] min-h-[24rem] w-full overflow-hidden rounded-2xl border border-border/60 bg-[#050711] shadow-[0_34px_120px_rgba(17,24,85,0.42)] sm:min-h-[34rem]">
      <Canvas dpr={[1, 1.5]} frameloop={reducedMotion ? "demand" : "always"} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} fallback={<StaticFallback />}>
        <PerspectiveCamera makeDefault position={[0, 1.05, 8.8]} fov={43} />
        <TechCardsScene reducedMotion={reducedMotion} lightMode={lightMode} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-5 top-4 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.2em] text-white/45">
        <span>Enterprise spatial system</span>
        <span>{reducedMotion ? "Manual view" : "Live 3D"}</span>
      </div>
    </div>
  );
}
