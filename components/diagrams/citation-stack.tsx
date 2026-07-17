export function CitationStack() {
  return (
    <div className="grid gap-3 border border-line bg-surface p-4 sm:grid-cols-[0.85fr_auto_1.25fr] sm:items-center sm:p-7">
      <div className="border border-line bg-bg p-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent">Question</span>
        <p className="mt-2 font-serif text-lg leading-snug">What changed in operating margin?</p>
      </div>
      <span aria-hidden className="hidden font-mono text-xl text-accent sm:block">→</span>
      <div className="grid gap-2">
        <div className="border border-line bg-bg p-3 font-mono text-[10px] leading-relaxed text-muted">
          <span className="text-accent">10-Q · lines 418–426</span><br />
          Retrieved filing passage with the reported margin and period comparison.
        </div>
        <div className="border border-ink bg-bg p-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Grounded answer</span>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            The change is explained only from the retrieved passage <span className="font-mono text-accent">[1]</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
