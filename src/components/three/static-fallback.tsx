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
      className="relative aspect-[4/5] min-h-[30rem] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#070a14] sm:aspect-square"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(124,92,255,0.24),transparent_32%),radial-gradient(circle_at_65%_65%,rgba(59,232,255,0.14),transparent_30%)]" />
      <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20" />
      <div className="absolute left-1/2 top-1/2 size-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/15" />
      <div className="absolute left-1/2 top-1/2 flex size-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2rem] border border-white/15 bg-white/[0.08] shadow-[0_0_80px_rgba(124,92,255,0.25)] backdrop-blur-xl">
        <span className="text-3xl font-semibold tracking-[0.2em] text-white">NVT</span>
        <span className="mt-2 text-[9px] font-medium uppercase tracking-[0.22em] text-white/50">
          Frontend systems
        </span>
      </div>
      {heroHighlightTech.slice(0, 6).map((tech, index) => (
        <span
          key={tech}
          className={`absolute ${positions[index]} rounded-xl border border-white/10 bg-white/[0.07] px-3 py-2 text-xs font-medium text-white/80 backdrop-blur-md`}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
