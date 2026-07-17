"use client";

import { useState } from "react";

const SIGNALS = [
  {
    label: "Surface Elo",
    short: "court-adjusted strength",
    detail: "A separate strength signal for each court surface keeps hard, clay, and grass performance from collapsing into one rating.",
  },
  {
    label: "Serve / return",
    short: "opponent-adjusted points",
    detail: "Point-level serve and return performance is adjusted for opponent quality before it reaches the match model.",
  },
  {
    label: "Match context",
    short: "rest · fatigue · home",
    detail: "Rest, accumulated workload, home conditions, and tournament context describe the match around the players.",
  },
  {
    label: "Style matchup",
    short: "pace · patterns · H2H",
    detail: "Player-style features capture matchup effects that a ranking-only model cannot represent.",
  },
] as const;

export function DeuceSignalInspector() {
  const [selected, setSelected] = useState(0);
  const signal = SIGNALS[selected];

  return (
    <div className="flex min-h-[440px] flex-col bg-surface p-4 sm:p-6">
      <div className="flex items-start justify-between gap-5 border-b border-line pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">signal inspection</p>
          <p className="mt-1 max-w-[42ch] text-sm leading-relaxed text-ink">
            Select a signal to follow its path through calibration and simulation.
          </p>
        </div>
        <span className="shrink-0 border border-accent px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
          walk-forward
        </span>
      </div>

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] flex-1 gap-5 pt-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)]">
        <div role="group" aria-label="Forecast signals" className="grid min-w-0 content-start gap-2">
          {SIGNALS.map((item, index) => {
            const active = index === selected;
            return (
              <button
                key={item.label}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(index)}
                className={`group/signal flex min-h-14 min-w-0 items-center gap-3 border px-3 py-2.5 text-left transition-[border-color,background-color,color] duration-300 ${
                  active
                    ? "border-accent bg-accent-soft text-ink"
                    : "border-line bg-bg text-muted hover:border-muted hover:text-ink"
                }`}
              >
                <span className={`font-mono text-[10px] ${active ? "text-accent" : "text-muted"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <strong className="block font-sans text-sm font-medium">{item.label}</strong>
                  <span className="block truncate font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                    {item.short}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`ml-auto h-2 w-2 rounded-full border transition-all duration-300 ${
                    active ? "scale-100 border-accent bg-accent" : "scale-75 border-line bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="relative flex min-h-[260px] min-w-0 flex-col border border-line bg-bg p-4 sm:p-5">
          <div aria-hidden className="dot-grid absolute inset-0 opacity-50" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-mono text-[10px] text-bg">
                {String(selected + 1).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 bg-accent" />
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent">selected evidence</span>
            </div>
            <output aria-live="polite" className="mt-5 block">
              <span className="font-serif text-2xl leading-tight text-ink">{signal.label}</span>
              <p className="mt-2 text-sm leading-relaxed text-muted">{signal.detail}</p>
            </output>
          </div>

          <div className="relative mt-auto grid min-w-0 grid-cols-1 items-center gap-2 pt-6 sm:grid-cols-[1fr_auto_1fr]">
            <div className="border border-ink bg-surface p-3 text-center">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">ensemble</span>
              <strong className="mt-1 block font-serif text-lg font-medium text-ink">XGBoost</strong>
            </div>
            <span aria-hidden className="justify-self-center font-mono text-accent max-sm:rotate-90">→</span>
            <div className="border border-accent bg-accent-soft p-3 text-center">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent">calibrated</span>
              <strong className="mt-1 block font-serif text-lg font-medium text-ink">probability</strong>
            </div>
          </div>
          <p className="relative mt-2 text-right font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
            point → game → set → match → draw
          </p>
        </div>
      </div>
    </div>
  );
}
