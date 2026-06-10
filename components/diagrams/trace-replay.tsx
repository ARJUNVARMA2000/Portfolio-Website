"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TRACE_RUNS, type TraceStep } from "@/content/traces";
import { AGENT_COLORS } from "./agent-colors";

const PLAY_INTERVAL_MS = 1300;

function fmtLatency(ms?: number) {
  if (ms === undefined) return null;
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
}

function StepRow({ step }: { step: TraceStep }) {
  const color = AGENT_COLORS[step.agent];
  return (
    <div className="trace-step mb-3 last:mb-0">
      <div className="flex items-baseline gap-3">
        <span
          className="inline-block min-w-[78px] border px-1.5 py-px text-center font-mono text-[10px] uppercase tracking-[0.14em]"
          style={{
            color: step.final ? "var(--term-bg)" : color,
            borderColor: color,
            background: step.final ? color : "transparent",
          }}
        >
          {step.agent}
        </span>
        {step.status && step.status !== "ok" && (
          <span
            className="font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: step.status === "fail" ? "#e07a6a" : "#d9b36c" }}
          >
            [{step.status}]
          </span>
        )}
        <span className="ml-auto shrink-0 font-mono text-[10px] text-term-muted">
          {fmtLatency(step.latencyMs)}
        </span>
      </div>
      {step.code ? (
        <pre className="mt-2 overflow-x-auto border border-term-line bg-black/30 px-3 py-2.5 font-mono text-[12px] leading-relaxed text-[#e4ddcf]">
          {step.code}
        </pre>
      ) : (
        <p
          className="mt-1.5 font-mono text-[12.5px] leading-relaxed"
          style={{ color: step.final ? "var(--term-fg)" : "#b9bfc6" }}
        >
          {step.text}
        </p>
      )}
    </div>
  );
}

/**
 * Interactive replay of recorded agent runs. Visitor-driven stepper —
 * nothing autoplays unless the visitor presses play.
 */
export function TraceReplay() {
  const [runIdx, setRunIdx] = useState(0);
  const [cursor, setCursor] = useState(1); // steps revealed
  const [playing, setPlaying] = useState(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const run = TRACE_RUNS[runIdx];
  const total = run.steps.length;
  const done = cursor >= total;

  const selectRun = useCallback((i: number) => {
    setRunIdx(i);
    setCursor(1);
    setPlaying(false);
  }, []);

  const next = useCallback(() => setCursor((c) => Math.min(c + 1, total)), [total]);
  const prev = useCallback(() => setCursor((c) => Math.max(c - 1, 1)), []);

  useEffect(() => {
    if (!playing) return;
    if (done) {
      setPlaying(false);
      return;
    }
    const id = setInterval(() => setCursor((c) => Math.min(c + 1, total)), PLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [playing, done, total]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [cursor, runIdx]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  return (
    <div
      id="trace"
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label="Recorded agent run replay. Use arrow keys or the controls to step through."
      className="overflow-hidden border border-term-line bg-term text-term-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
    >
      {/* header */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-term-line bg-black/30 px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-term-muted">
          agent.trace · recorded run
        </span>
        <div className="ml-auto flex gap-1.5">
          {TRACE_RUNS.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => selectRun(i)}
              aria-pressed={i === runIdx}
              className={`border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                i === runIdx
                  ? "border-accent bg-accent text-term"
                  : "border-term-line text-term-muted hover:border-term-muted hover:text-term-fg"
              }`}
            >
              run&nbsp;{String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>

      {/* body */}
      <div ref={bodyRef} className="max-h-[380px] overflow-y-auto px-4 py-4">
        <p className="mb-4 font-mono text-[13px] text-accent">❯ {run.question}</p>
        {run.steps.slice(0, cursor).map((step, i) => (
          <StepRow key={`${run.id}-${i}`} step={step} />
        ))}
        {done && (
          <p className="mt-4 border-t border-term-line pt-3 font-mono text-[11px] text-term-muted">
            run complete · {(run.totalLatencyMs / 1000).toFixed(1)}s end-to-end · ${run.costUsd.toFixed(3)} ·{" "}
            {total} bus messages
          </p>
        )}
      </div>

      {/* controls */}
      <div className="flex items-center gap-2 border-t border-term-line bg-black/30 px-4 py-2.5">
        <button
          type="button"
          onClick={() => {
            setCursor(1);
            setPlaying(false);
          }}
          aria-label="Restart run"
          className="border border-term-line px-2.5 py-1 font-mono text-[11px] text-term-muted transition-colors hover:border-term-muted hover:text-term-fg"
        >
          ⏮
        </button>
        <button
          type="button"
          onClick={prev}
          disabled={cursor <= 1}
          aria-label="Previous step"
          className="border border-term-line px-2.5 py-1 font-mono text-[11px] text-term-muted transition-colors hover:border-term-muted hover:text-term-fg disabled:opacity-40"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={next}
          disabled={done}
          aria-label="Next step"
          className="border border-term-line px-2.5 py-1 font-mono text-[11px] text-term-muted transition-colors hover:border-term-muted hover:text-term-fg disabled:opacity-40"
        >
          ▶
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          disabled={done}
          className="border border-accent px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent transition-colors hover:bg-accent hover:text-term disabled:opacity-40"
        >
          {playing ? "pause" : "play"}
        </button>
        <span className="ml-auto font-mono text-[11px] tabular-nums text-term-muted">
          step {cursor}/{total}
        </span>
      </div>
    </div>
  );
}
