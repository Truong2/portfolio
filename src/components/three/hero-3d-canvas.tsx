"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

import { TechCardsScene } from "./tech-cards-scene";
import { StaticFallback } from "./static-fallback";

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
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function useReducedMotion(): boolean {
  // useSyncExternalStore is the correct primitive for subscribing to an
  // external browser API (matchMedia) — avoids the setState-in-effect
  // cascading-render pattern that useState+useEffect would produce here.
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false, // server snapshot — unused since this component is ssr:false
  );
}

function CanvasLoadingSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="aspect-square w-full max-w-md animate-pulse rounded-2xl border border-border bg-muted"
    />
  );
}

/**
 * Public entry point for the hero 3D scene. Handles:
 * - WebGL support detection (falls back to static markup if unavailable)
 * - prefers-reduced-motion (falls back to static markup, per a11y requirement)
 * - Suspense loading state while the scene mounts
 * - Capped devicePixelRatio + continuous canvas frameloop for the idle scene
 *
 * This component is itself only ever mounted through a `next/dynamic`
 * (`ssr: false`) boundary — see `hero-3d-canvas-loader.tsx` — since it
 * touches `window`/WebGL and must never run during SSR/static export.
 */
export function Hero3DCanvas() {
  // Lazy init runs on first client render — safe because this component is
  // only ever mounted through a `next/dynamic(..., { ssr: false })`
  // boundary, so there's no SSR pass to mismatch against.
  const [webglSupported] = React.useState(() => detectWebGL());
  const reducedMotion = useReducedMotion();

  if (!webglSupported || reducedMotion) {
    return <StaticFallback />;
  }

  return (
    <div
      aria-hidden="true"
      className="aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-border"
    >
      <React.Suspense fallback={<CanvasLoadingSkeleton />}>
        <Canvas
          dpr={[1, 1.5]}
          frameloop="always"
          gl={{ antialias: true, alpha: true }}
          fallback={<StaticFallback />}
        >
          <PerspectiveCamera makeDefault position={[0, 0.6, 7]} fov={45} />
          <TechCardsScene reducedMotion={false} />
        </Canvas>
      </React.Suspense>
    </div>
  );
}
