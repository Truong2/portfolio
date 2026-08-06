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

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function useReducedMotion(): boolean {
  return React.useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);
}

export function Hero3DCanvas() {
  const [webglSupported] = React.useState(() => detectWebGL());
  const reducedMotion = useReducedMotion();

  if (!webglSupported) {
    return <StaticFallback />;
  }

  return (
    <div
      aria-label="Interactive 3D technology system. Drag to rotate and scroll or pinch to zoom."
      className="group relative aspect-square min-h-[22rem] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#070a14] shadow-[0_32px_100px_rgba(24,31,84,0.38)] sm:min-h-[30rem]"
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        fallback={<StaticFallback />}
      >
        <PerspectiveCamera makeDefault position={[0, 0.45, 8.35]} fov={44} />
        <TechCardsScene reducedMotion={reducedMotion} />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.22em] text-white/45">
        <span>Enterprise technology graph</span>
        <span>{reducedMotion ? "Manual view" : "Live 3D"}</span>
      </div>
      <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center justify-between rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/55 backdrop-blur-md">
        <span>Drag to rotate</span>
        <span>Scroll or pinch to zoom</span>
      </div>
    </div>
  );
}
