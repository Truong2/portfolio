"use client";

import dynamic from "next/dynamic";

const Hero3DCanvas = dynamic(
  () => import("./hero-3d-canvas").then((m) => m.Hero3DCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="aspect-square w-full max-w-md animate-pulse rounded-2xl border border-border bg-muted"
      />
    ),
  },
);

/**
 * Thin client boundary so `next/dynamic(..., { ssr: false })` — which is
 * only valid inside a Client Component — doesn't force the whole
 * HeroSection (and its real, crawlable h1/CTA text) to become client-side.
 */
export function Hero3DCanvasLoader() {
  return <Hero3DCanvas />;
}
