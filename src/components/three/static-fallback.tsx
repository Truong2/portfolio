const panels = [
  { label: "Skills", detail: "React · Next.js · TypeScript", className: "left-[4%] top-[18%]" },
  { label: "Experience", detail: "Banking · Mobility · GIS", className: "right-[3%] top-[18%]" },
  { label: "Education", detail: "HUST · Engineer", className: "left-[5%] bottom-[18%]" },
  { label: "Projects", detail: "AML · Taxi · MARINER25", className: "right-[4%] bottom-[18%]" },
] as const;

export function StaticFallback() {
  return (
    <div
      role="img"
      aria-label="Spatial CV overview for Nguyen Van Truong with profile, skills, experience, projects, education, and contact panels"
      className="relative aspect-[1.25/1] min-h-[26rem] w-full overflow-hidden rounded-2xl border border-border/70 bg-[#edf4ff] dark:bg-[#040610] sm:min-h-[36rem]"
    >
      <div className="surface-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(124,92,255,0.22),transparent_28%),radial-gradient(circle_at_58%_62%,rgba(59,232,255,0.14),transparent_34%)]" />

      <div className="absolute left-1/2 top-[44%] z-10 flex w-[42%] min-w-56 -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border border-violet-400/25 bg-card/80 p-5 shadow-[0_0_70px_rgba(124,92,255,0.18)] backdrop-blur-xl">
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-500 dark:text-cyan-300">Frontend Developer</span>
        <strong className="mt-2 text-xl tracking-tight text-foreground sm:text-2xl">Nguyen Van Truong</strong>
        <span className="mt-2 text-[10px] leading-5 text-muted-foreground">React · Next.js · Vue · Nuxt · TypeScript<br />Enterprise UI · Realtime · GIS · Web3</span>
      </div>

      {panels.map((panel) => (
        <div key={panel.label} className={`absolute w-[30%] min-w-36 rounded-xl border border-border/70 bg-card/75 p-3 shadow-xl backdrop-blur-md ${panel.className}`}>
          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">{panel.label}</span>
          <span className="mt-1 block text-[9px] leading-4 text-muted-foreground">{panel.detail}</span>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-[9px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-xl">
        Static accessible CV overview
      </div>
    </div>
  );
}
