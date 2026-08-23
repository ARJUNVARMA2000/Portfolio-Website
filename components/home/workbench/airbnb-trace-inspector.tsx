"use client";

import { useEffect, useState } from "react";
import type { TraceStep } from "@/content/traces";
import { AGENT_COLORS } from "@/components/diagrams/agent-colors";

type PreviewStep = Pick<TraceStep, "agent" | "text" | "code" | "status" | "latencyMs" | "final">;

export function AirbnbTraceInspector({ steps }: { steps: PreviewStep[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (active >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setActive((current) => current + 1), 1250);
    return () => window.clearTimeout(timer);
  }, [active, playing, steps.length]);

  const current = steps[active];
  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (active >= steps.length - 1) setActive(0);
    setPlaying(true);
  };

  return (
    <div className="flex min-h-[440px] flex-col bg-term text-term-fg" data-lenis-prevent>
      <div className="flex flex-wrap items-center gap-3 border-b border-term-line bg-black/30 px-4 py-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-term-muted">
          recorded failure → recovery
        </span>
        <span className="ml-auto font-mono text-[9px] tabular-nums text-term-muted">
          step {active + 1}/{steps.length}
        </span>
      </div>

      <div className="grid min-w-0 flex-1 md:grid-cols-[190px_minmax(0,1fr)]">
        <ol className="relative border-b border-term-line p-3 md:border-b-0 md:border-r">
          <span aria-hidden className="absolute bottom-7 left-[27px] top-7 w-px bg-term-line" />
          {steps.map((step, index) => {
            const selected = index === active;
            const complete = index < active;
            const color = AGENT_COLORS[step.agent];
            return (
              <li key={`${step.agent}-${index}`} className="relative z-10">
                <button
                  type="button"
                  aria-current={selected ? "step" : undefined}
                  onClick={() => {
                    setPlaying(false);
                    setActive(index);
                  }}
                  className={`flex min-h-11 w-full items-center gap-3 px-1.5 py-1 text-left transition-colors ${
                    selected ? "bg-white/[0.06] text-term-fg" : "text-term-muted hover:text-term-fg"
                  }`}
                >
                  <span
                    aria-hidden
                    className="block h-3 w-3 shrink-0 rounded-full border-2 bg-term transition-transform"
                    style={{ borderColor: color, background: complete || selected ? color : "var(--term-bg)", transform: selected ? "scale(1.2)" : "scale(1)" }}
                  />
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.12em]">{step.agent}</span>
                    <span className="block font-mono text-[8px] uppercase tracking-[0.08em] text-term-muted">
                      {step.status === "fail"
                        ? "tool failure"
                        : step.status === "retry"
                          ? "validator retry"
                          : step.final
                            ? "cited answer"
                            : step.agent === "sql"
                              ? "corrected query"
                              : step.agent === "db"
                                ? "result rows"
                                : "message"}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="flex min-h-[300px] flex-col p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <span
              className="border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em]"
              style={{ color: AGENT_COLORS[current.agent], borderColor: AGENT_COLORS[current.agent] }}
            >
              {current.agent}
            </span>
            {current.status && current.status !== "ok" && (
              <span className={current.status === "fail" ? "font-mono text-[9px] uppercase text-[#e07a6a]" : "font-mono text-[9px] uppercase text-[#d9b36c]"}>
                [{current.status}]
              </span>
            )}
            <span className="ml-auto font-mono text-[9px] text-term-muted">
              {current.latencyMs ? `${(current.latencyMs / 1000).toFixed(current.latencyMs < 1000 ? 2 : 1)}s` : ""}
            </span>
          </div>

          <output aria-live="polite" className="mt-5 block flex-1">
            {current.code ? (
              <pre className="overflow-x-auto whitespace-pre-wrap border border-term-line bg-black/30 p-3 font-mono text-[11px] leading-relaxed text-[#e4ddcf]">
                {current.code}
              </pre>
            ) : (
              <p className={`font-mono text-[12px] leading-relaxed ${current.final ? "text-term-fg" : "text-[#b9bfc6]"}`}>
                {current.text}
              </p>
            )}
          </output>

          <div className="mt-5 flex items-center gap-2 border-t border-term-line pt-3">
            <button
              type="button"
              aria-label="Restart recorded sequence"
              onClick={() => {
                setPlaying(false);
                setActive(0);
              }}
              className="min-h-11 border border-term-line px-3 font-mono text-[10px] text-term-muted transition-colors hover:border-term-muted hover:text-term-fg"
            >
              ↺
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="min-h-11 border border-accent-term px-4 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-term transition-colors hover:bg-accent-term hover:text-term"
            >
              {playing ? "pause" : active >= steps.length - 1 ? "replay" : "play"}
            </button>
            <div className="ml-2 h-px flex-1 bg-term-line">
              <div className="h-px bg-accent transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${((active + 1) / steps.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
