import { heroHighlightTech } from "@/data/profile";

const positions = [
  "left-[8%] top-[18%]",
  "right-[7%] top-[16%]",
  "left-[2%] top-[48%]",
  "right-[1%] top-[48%]",
  "left-[12%] bottom-[16%]",
  "right-[10%] bottom-[18%]",
];

export function StaticFallback() {
  return (
    <div
      role="img"
      aria-label="Technology orbit showcasing React, Next.js, TypeScript, Vue, Web3, and GIS skills"
      className="relative aspect-square min-h-[22rem] w-full overflow-hidden rounded-[2rem] border border-border/70 bg-[#edf4ff] dark:bg-[#070a14] sm:min-h-[30rem]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(124,92,255,0.2),transparent_32%),radial-gradient(circle_at_65%_65%,rgba(59,232,255,0.16),transparent_30%)]" />
      <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20 dark:border-cyan-300/20" />
      <div className="absolute left-1/2 top-1/2 size-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/15 dark:border-violet-300/15" />
      <div className="absolute left-1/2 top-1/2 flex size-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2rem] border border-foreground/15 bg-card/70 shadow-[0_0_80px_rgba(124,92,255,0.2)] backdrop-blur-xl">
        <span className="text-3xl font-semibold tracking-[0.2em] text-foreground">NVT</span>
        <span className="mt-2 text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Frontend systems
        </span>
      </div>
      {heroHighlightTech.slice(0, 6).map((tech, index) => (
        <span
          key={tech}
          className={`absolute ${positions[index]} rounded-xl border border-border/70 bg-card/75 px-3 py-2 text-xs font-medium text-foreground/80 shadow-lg backdrop-blur-md`}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
