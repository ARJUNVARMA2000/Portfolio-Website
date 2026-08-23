"use client";

import { useState } from "react";

const MASK_WIDTH = 15;
const TARGET_WIDTH = 10;

export function BtcIndexWindow() {
  const [indexPosition, setIndexPosition] = useState(56);
  const historyWidth = indexPosition - MASK_WIDTH;

  return (
    <div className="flex min-h-[410px] flex-col bg-surface p-4 sm:p-5">
      <div className="flex items-start justify-between gap-5 border-b border-line pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">evaluation window</p>
          <p className="mt-1 max-w-[45ch] text-sm leading-relaxed text-ink">
            Drag the index date. The model sees history only up to 45 days before it, then is scored on the next 30.
          </p>
        </div>
        <span className="shrink-0 border border-accent px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-accent-text">
          leakage safe
        </span>
      </div>

      <div className="relative mt-6 flex-1 overflow-hidden border border-line bg-bg p-4 sm:p-5">
        <div aria-hidden className="dot-grid absolute inset-0 opacity-45" />
        <div className="relative pt-8">
          <div className="relative h-32 border-y border-line bg-surface/80">
            <div className="absolute inset-y-0 left-0 border-t-4 border-ink bg-ink/[0.035] transition-[width] duration-200 motion-reduce:transition-none" style={{ width: `${historyWidth}%` }}>
              <span className="absolute left-3 top-4 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">available history</span>
            </div>
            <div className="absolute inset-y-0 border-t-4 border-accent bg-accent/10 transition-[left] duration-200 motion-reduce:transition-none" style={{ left: `${historyWidth}%`, width: `${MASK_WIDTH}%` }}>
              <span className="absolute inset-x-1 top-4 text-center font-mono text-[9px] uppercase tracking-[0.08em] text-accent-text">45 days masked</span>
              <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,rgba(217,72,15,0.08)_6px,rgba(217,72,15,0.08)_7px)]" />
            </div>
            <div className="absolute inset-y-0 border-t-4 border-muted bg-muted/[0.06] transition-[left] duration-200 motion-reduce:transition-none" style={{ left: `${indexPosition}%`, width: `${TARGET_WIDTH}%` }}>
              <span className="absolute inset-x-1 top-4 text-center font-mono text-[9px] uppercase tracking-[0.08em] text-muted">next 30 days</span>
            </div>
            <div
              data-testid="btc-index-marker"
              className="absolute -bottom-3 -top-3 w-px bg-accent transition-[left] duration-200 motion-reduce:transition-none"
              style={{ left: `${indexPosition}%` }}
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-accent-text px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-bg">
                index date
              </span>
            </div>
          </div>

          <label className="mt-7 block font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
            move index date
            <input
              type="range"
              min="36"
              max="74"
              value={indexPosition}
              onChange={(event) => setIndexPosition(Number(event.currentTarget.value))}
              aria-valuetext="The 45 days immediately before this index are masked; the next 30 days are the prediction target"
              className="mt-3 block h-11 w-full cursor-ew-resize accent-[#d9480f]"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-3">
        {[
          ["01", "Train", "only information available live"],
          ["02", "Mask", "remove near-diagnosis leakage"],
          ["03", "Predict", "score the following 30 days"],
        ].map(([number, title, detail]) => (
          <div key={number} className="flex items-baseline gap-2">
            <span className="font-mono text-[9px] text-accent-text">{number}</span>
            <strong className="font-sans text-xs font-medium text-ink">{title}</strong>
            <span className="font-mono text-[8px] text-muted">{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
