export function StaticFallback() {
  return (
    <div
      role="img"
      aria-label="Static CV book overview for Nguyen Van Truong"
      className="relative aspect-[1.03/1] min-h-[31rem] w-full overflow-hidden rounded-[1.4rem] border border-border/70 bg-[#edf4ff] dark:bg-[#030711] sm:min-h-[39rem] lg:min-h-[43rem]"
    >
      <div className="surface-grid absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_58%_60%,rgba(139,92,246,0.16),transparent_34%)]" />
      <div className="absolute left-1/2 top-1/2 h-[72%] w-[48%] min-w-64 -translate-x-1/2 -translate-y-1/2 -rotate-2 rounded-[1.5rem] border border-cyan-300/25 bg-[#0b1530] p-6 shadow-[18px_24px_0_rgba(4,12,28,.65),0_0_70px_rgba(34,211,238,.16)] sm:p-8">
        <div className="absolute bottom-5 left-4 top-5 w-1 rounded-full bg-gradient-to-b from-cyan-300 via-blue-500 to-violet-500 shadow-[0_0_20px_rgba(34,211,238,.5)]" />
        <div className="pl-4 sm:pl-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Curriculum Vitae</p>
          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">NGUYEN VAN TRUONG</h2>
          <p className="mt-2 text-sm font-medium text-violet-300">Frontend Developer</p>
          <p className="mt-5 max-w-md text-[10px] leading-5 text-slate-400 sm:text-xs">3+ years building enterprise web applications across banking, mobility, healthcare, GIS, e-commerce and Web3.</p>
          <div className="mt-7 grid grid-cols-2 gap-2">
            {["Experience", "Skills", "Projects", "Education"].map((label) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-300">{label}</div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-3 text-[9px] text-slate-400">Hanoi · truong8dt@gmail.com · LinkedIn</div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-[9px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-xl">Static CV book fallback</div>
    </div>
  );
}
