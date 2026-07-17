export function RiskTimeline() {
  return (
    <div className="border border-line bg-surface p-5 sm:p-8">
      <div className="mb-7 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <span>Leakage-safe backtest</span>
        <span>Patient-month index</span>
      </div>
      <div className="relative grid grid-cols-[1.25fr_0.9fr_0.75fr] gap-1">
        <div className="border-t-4 border-ink bg-bg px-3 py-4">
          <span className="font-mono text-[10px] text-muted">Historical claims</span>
          <strong className="mt-2 block font-sans text-sm font-medium">Features available live</strong>
        </div>
        <div className="border-t-4 border-accent bg-accent/10 px-3 py-4">
          <span className="font-mono text-[10px] text-accent">45 days masked</span>
          <strong className="mt-2 block font-sans text-sm font-medium">No future leakage</strong>
        </div>
        <div className="border-t-4 border-muted bg-bg px-3 py-4">
          <span className="font-mono text-[10px] text-muted">Next 30 days</span>
          <strong className="mt-2 block font-sans text-sm font-medium">Prediction target</strong>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-[1.25fr_0.9fr_0.75fr] font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
        <span>past</span>
        <span className="text-accent">index date</span>
        <span className="text-right">outcome</span>
      </div>
    </div>
  );
}
