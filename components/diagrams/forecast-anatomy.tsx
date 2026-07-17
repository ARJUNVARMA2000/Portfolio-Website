const SIGNALS = [
  ["01", "Surface Elo", "strength by court"],
  ["02", "Serve / return", "opponent adjusted"],
  ["03", "Match context", "rest · fatigue · home"],
  ["04", "Style matchup", "pace · patterns · H2H"],
];

export function ForecastAnatomy() {
  return (
    <div className="border border-line bg-surface p-4 sm:p-7">
      <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        <span>Match evidence</span>
        <span className="text-accent">calibrated probability</span>
      </div>
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {SIGNALS.map(([index, title, note]) => (
            <div key={title} className="flex items-start gap-3 border border-line bg-bg p-3">
              <span className="font-mono text-[10px] text-accent">{index}</span>
              <span>
                <strong className="block font-sans text-sm font-medium text-ink">{title}</strong>
                <span className="font-mono text-[10px] text-muted">{note}</span>
              </span>
            </div>
          ))}
        </div>
        <span aria-hidden className="hidden font-mono text-xl text-accent lg:block">→</span>
        <div className="border border-accent bg-bg p-5 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Ensemble</span>
          <strong className="mt-2 block font-serif text-2xl font-medium text-ink">XGBoost</strong>
          <span className="mt-1 block font-mono text-[10px] text-muted">seed-bagged · Platt calibrated</span>
          <div className="mx-auto mt-4 h-px w-12 bg-line" />
          <span className="mt-3 block font-mono text-2xl text-accent">63.4%</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">match win probability</span>
        </div>
        <span aria-hidden className="hidden font-mono text-xl text-accent lg:block">→</span>
        <div className="grid gap-2">
          <div className="border border-line bg-bg p-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Markov conversion</span>
            <p className="mt-2 font-sans text-sm text-ink">point → game → set → match</p>
          </div>
          <div className="border border-line bg-bg p-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Monte Carlo draw</span>
            <p className="mt-2 font-sans text-sm text-ink">round and title probabilities</p>
          </div>
        </div>
      </div>
    </div>
  );
}
