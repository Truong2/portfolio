"use client";

import * as React from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { StaticFallback } from "./static-fallback";
import { TechCardsScene } from "./tech-cards-scene";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
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

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function useReducedMotion(): boolean {
  return React.useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);
}

function CanvasLoadingSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-full min-h-[30rem] w-full animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.03]"
    />
  );
}

export function Hero3DCanvas() {
  const [webglSupported] = React.useState(() => detectWebGL());
  const reducedMotion = useReducedMotion();

  if (!webglSupported || reducedMotion) {
    return <StaticFallback />;
  }

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/5] min-h-[30rem] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#070a14] shadow-[0_40px_120px_rgba(24,31,84,0.45)] sm:aspect-square"
    >
      <React.Suspense fallback={<CanvasLoadingSkeleton />}>
        <Canvas
          dpr={[1, 1.5]}
          frameloop="always"
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          fallback={<StaticFallback />}
        >
          <PerspectiveCamera makeDefault position={[0, 0.52, 8.35]} fov={44} />
          <TechCardsScene reducedMotion={false} />
        </Canvas>
      </React.Suspense>
      <div className="pointer-events-none absolute inset-x-6 bottom-5 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.24em] text-white/45">
        <span>Interactive technology orbit</span>
        <span>Move pointer</span>
      </div>
    </div>
  );
}
