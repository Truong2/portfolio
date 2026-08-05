import { heroHighlightTech } from "@/data/profile";

/**
 * Non-interactive, non-animated substitute for the 3D scene. Pure server-
 * renderable markup — no canvas, no motion — so it satisfies both the
 * WebGL-unsupported and prefers-reduced-motion cases.
 */
export function StaticFallback() {
  return (
    <div
      role="img"
      aria-label="Rotating showcase of frontend technologies: React, Next.js, TypeScript, Vue, and more"
      className="relative flex aspect-square w-full max-w-md items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-primary/15 via-accent/10 to-transparent p-8"
    >
      <div className="grid grid-cols-3 gap-3">
        {heroHighlightTech.slice(0, 9).map((tech) => (
          <span
            key={tech}
            className="rounded-lg border border-border bg-card px-3 py-2 text-center text-xs font-medium text-card-foreground shadow-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
