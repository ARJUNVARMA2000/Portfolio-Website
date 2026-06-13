"use client";

import { useCallback, useRef, useState } from "react";
import { TRACE_RUNS, type TraceStep, type AgentName } from "@/content/traces";
import { AGENT_COLORS } from "./agent-colors";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  MOTION_OK,
  SCRAMBLE_CHARS,
} from "@/lib/gsap";

const AGENT_ORDER: AgentName[] = ["planner", "sql", "db", "validator", "chart", "narrator"];

function fmtLatency(ms?: number) {
  if (ms === undefined) return null;
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
}

/** Log-scale width so a 90ms error and a 3.1s narration both read at a glance. */
function barWidth(ms?: number) {
  if (!ms) return 8;
  return gsap.utils.clamp(8, 100, 14 * Math.log2(ms / 60));
}

function stepDuration(step: TraceStep) {
  return gsap.utils.clamp(0.6, 2.4, ((step.latencyMs ?? 600) / 1000) * 0.85);
}

function StepRow({ step }: { step: TraceStep }) {
  const color = AGENT_COLORS[step.agent];
  return (
    <div data-step className="relative mb-4 pl-3 last:mb-0">
      <span
        data-stripe
        aria-hidden
        className="absolute bottom-0 left-0 top-0 w-[2px]"
        style={{ background: color }}
      />
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
        <span data-ms className="ml-auto shrink-0 font-mono text-[10px] text-term-muted">
          {fmtLatency(step.latencyMs)}
        </span>
      </div>
      {step.code ? (
        <pre
          data-code
          className="mt-2 overflow-x-auto border border-term-line bg-black/30 px-3 py-2.5 font-mono text-[12px] leading-relaxed text-[#e4ddcf]"
        >
          {step.code}
        </pre>
      ) : (
        <p
          data-text
          className="mt-1.5 font-mono text-[12.5px] leading-relaxed"
          style={{ color: step.final ? "var(--term-fg)" : "#b9bfc6" }}
        >
          {step.text}
        </p>
      )}
      <div className="mt-1.5 h-px bg-term-line">
        <div
          data-bar
          className="h-px"
          style={{ width: `${barWidth(step.latencyMs)}%`, background: color }}
        />
      </div>
    </div>
  );
}

/**
 * TraceReplay 2.0 — a recorded agent run played back on a real GSAP timeline.
 * Step pacing maps to real latency, text decodes like terminal output, a packet
 * walks the bus rail, and a scrubber lets you drag through the whole run.
 * Reduced-motion / no-JS: the full transcript is simply visible.
 */
export function TraceReplay() {
  const [runIdx, setRunIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const scrubRef = useRef<HTMLInputElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const labelTimesRef = useRef<number[]>([]);
  const stepElsRef = useRef<HTMLElement[]>([]);
  const interactedRef = useRef(false);
  const draggingRef = useRef(false);

  const run = TRACE_RUNS[runIdx];
  const total = run.steps.length;

  const syncUi = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;
    const t = tl.time();
    const times = labelTimesRef.current;
    let started = 0;
    for (const lt of times) if (t >= lt + 0.01) started++;

    if (counterRef.current) {
      counterRef.current.textContent = `step ${started}/${times.length}`;
    }
    if (scrubRef.current && !draggingRef.current) {
      scrubRef.current.value = String(Math.round(tl.progress() * 1000));
    }
    const body = bodyRef.current;
    const stepEl = started > 0 ? stepElsRef.current[started - 1] : null;
    if (body && stepEl) {
      const bottomTarget = stepEl.offsetTop + stepEl.offsetHeight - body.clientHeight + 20;
      if (bottomTarget > body.scrollTop) body.scrollTop = bottomTarget;
      else if (stepEl.offsetTop - 16 < body.scrollTop) body.scrollTop = Math.max(0, stepEl.offsetTop - 16);
    } else if (body && started === 0) {
      body.scrollTop = 0;
    }
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      gsap.matchMedia().add(MOTION_OK, () => {
        const steps = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-step]"));
        const summary = root.querySelector<HTMLElement>("[data-summary]");
        const packet = root.querySelector<HTMLElement>("[data-rail-packet]");
        stepElsRef.current = steps;

        gsap.set(steps, { autoAlpha: 0, y: 10 });
        if (summary) gsap.set(summary, { autoAlpha: 0 });

        const tl = gsap.timeline({
          paused: true,
          onUpdate: syncUi,
          onComplete: () => setPlaying(false),
        });

        run.steps.forEach((step, i) => {
          const stepEl = steps[i];
          if (!stepEl) return;
          const dur = stepDuration(step);
          const pos = `step-${i}`;
          tl.addLabel(pos);

          // row + agent stripe land
          tl.to(stepEl, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, pos);
          const stripe = stepEl.querySelector("[data-stripe]");
          if (stripe) {
            tl.fromTo(
              stripe,
              { scaleY: 0, transformOrigin: "center top" },
              { scaleY: 1, duration: 0.35, ease: "power2.out" },
              pos
            );
          }

          // message decodes / SQL prints
          const textEl = stepEl.querySelector<HTMLElement>("[data-text]");
          if (textEl && step.text) {
            tl.to(
              textEl,
              {
                duration: gsap.utils.clamp(0.4, 1.4, dur * 0.6),
                scrambleText: { text: step.text, chars: SCRAMBLE_CHARS, speed: 1.2 },
              },
              `${pos}+=0.15`
            );
          }
          const codeEl = stepEl.querySelector<HTMLElement>("[data-code]");
          if (codeEl) {
            tl.fromTo(
              codeEl,
              { clipPath: "inset(0% 0% 100% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: gsap.utils.clamp(0.35, 1.2, dur * 0.6),
                ease: "power1.inOut",
              },
              `${pos}+=0.15`
            );
          }

          // latency bar widens while the ms label counts
          const bar = stepEl.querySelector("[data-bar]");
          if (bar) {
            tl.fromTo(
              bar,
              { scaleX: 0, transformOrigin: "left center" },
              { scaleX: 1, duration: dur * 0.55, ease: "power1.inOut" },
              `${pos}+=0.1`
            );
          }
          const msEl = stepEl.querySelector<HTMLElement>("[data-ms]");
          if (msEl && step.latencyMs) {
            const proxy = { v: 0 };
            const target = step.latencyMs;
            tl.to(
              proxy,
              {
                v: target,
                duration: dur * 0.55,
                ease: "power1.inOut",
                onUpdate: () => {
                  msEl.textContent = fmtLatency(Math.round(proxy.v));
                },
                onComplete: () => {
                  msEl.textContent = fmtLatency(target);
                },
              },
              `${pos}+=0.1`
            );
          }

          // fail/retry flash
          if (step.status === "fail" || step.status === "retry") {
            tl.fromTo(
              stepEl,
              { backgroundColor: step.status === "fail" ? "rgba(224,122,106,0.14)" : "rgba(217,179,108,0.12)" },
              { backgroundColor: "rgba(0,0,0,0)", duration: 0.7, ease: "power1.out" },
              `${pos}+=0.15`
            );
          }

          // the packet walks the bus rail to this step's agent
          const node = root.querySelector<HTMLElement>(`[data-rail-node="${step.agent}"]`);
          if (packet && node) {
            tl.to(
              packet,
              { y: node.offsetTop + node.offsetHeight / 2 - 4, duration: 0.3, ease: "power2.inOut" },
              pos
            );
            tl.to(node, { backgroundColor: AGENT_COLORS[step.agent], duration: 0.2 }, `${pos}+=0.15`);
            tl.to(
              node,
              { scale: 1.6, duration: 0.13, yoyo: true, repeat: 1, ease: "power1.inOut" },
              `${pos}+=0.15`
            );
          }

          // hold the playhead for the step's mapped duration
          tl.to({}, { duration: 0.001 }, `${pos}+=${dur}`);
        });

        tl.addLabel("end");
        if (summary) {
          const summaryText = summary.textContent ?? "";
          tl.to(summary, { autoAlpha: 1, duration: 0.3 }, "end").to(
            summary,
            { duration: 0.9, scrambleText: { text: summaryText, chars: SCRAMBLE_CHARS, speed: 0.7 } },
            "end"
          );
        }

        labelTimesRef.current = run.steps.map((_, i) => tl.labels[`step-${i}`]);
        tlRef.current = tl;
        syncUi();

        // autoplay once when 60% in view — any interaction cancels it
        ScrollTrigger.create({
          trigger: root,
          start: "top 60%",
          once: true,
          onEnter: () => {
            if (!interactedRef.current && tlRef.current) {
              tlRef.current.play();
              setPlaying(true);
            }
          },
        });

        return () => {
          tlRef.current = null;
        };
      });
    },
    { scope: rootRef, dependencies: [runIdx], revertOnUpdate: true }
  );

  /** Times at which each step is fully rendered. */
  const completeTimes = () => {
    const tl = tlRef.current;
    const times = labelTimesRef.current;
    if (!tl) return [];
    return times.map((_, i) => (i + 1 < times.length ? times[i + 1] - 0.001 : tl.duration()));
  };

  const togglePlay = () => {
    const tl = tlRef.current;
    if (!tl) return;
    interactedRef.current = true;
    if (playing) {
      tl.pause();
      setPlaying(false);
    } else {
      if (tl.progress() >= 1) tl.seek(0);
      tl.play();
      setPlaying(true);
    }
  };

  const step = (dir: 1 | -1) => {
    const tl = tlRef.current;
    if (!tl) return;
    interactedRef.current = true;
    tl.pause();
    setPlaying(false);
    const done = completeTimes();
    const t = tl.time();
    let complete = 0;
    for (const ct of done) if (t >= ct) complete++;
    if (dir === 1) {
      if (complete >= done.length) return;
      tl.tweenTo(done[complete], { duration: 0.45, ease: "power2.out" });
    } else {
      const target = complete >= 2 ? done[complete - 2] : 0;
      tl.tweenTo(target, { duration: 0.35, ease: "power2.out" });
    }
  };

  const restart = () => {
    const tl = tlRef.current;
    if (!tl) return;
    interactedRef.current = true;
    tl.pause(0);
    setPlaying(false);
  };

  const selectRun = (i: number) => {
    interactedRef.current = true;
    setPlaying(false);
    setRunIdx(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === " " && e.target === rootRef.current) {
      e.preventDefault();
      togglePlay();
    }
  };

  return (
    <div
      id="trace"
      ref={rootRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label="Recorded agent run replay. Use arrow keys, the controls, or the scrubber to move through the run."
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

      {/* bus rail + transcript */}
      <div className="flex">
        <div className="relative hidden w-12 shrink-0 border-r border-term-line md:block" aria-hidden>
          <div className="absolute bottom-5 left-1/2 top-5 w-px -translate-x-1/2 bg-term-line" />
          <div className="absolute inset-x-0 bottom-5 top-5 flex flex-col items-center justify-between">
            {AGENT_ORDER.map((a) => (
              <span
                key={a}
                data-rail-node={a}
                title={a}
                className="relative z-10 block h-2.5 w-2.5 rounded-full border bg-term"
                style={{ borderColor: AGENT_COLORS[a] }}
              />
            ))}
          </div>
          <span
            data-rail-packet
            className="absolute left-1/2 top-5 z-20 block h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
          />
        </div>

        <div ref={bodyRef} className="max-h-[420px] flex-1 overflow-y-auto px-4 py-4">
          <p className="mb-4 font-mono text-[13px] text-accent">❯ {run.question}</p>
          {run.steps.map((s, i) => (
            <StepRow key={`${run.id}-${i}`} step={s} />
          ))}
          <p data-summary className="mt-4 border-t border-term-line pt-3 font-mono text-[11px] text-term-muted">
            run complete · {(run.totalLatencyMs / 1000).toFixed(1)}s end-to-end · $
            {run.costUsd.toFixed(3)} · {total} bus messages
          </p>
        </div>
      </div>

      {/* transport — hidden under reduced motion (the transcript is fully visible there) */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-term-line bg-black/30 px-4 py-2.5 motion-reduce:hidden">
        <button
          type="button"
          onClick={restart}
          aria-label="Restart run"
          className="border border-term-line px-2.5 py-1 font-mono text-[11px] text-term-muted transition-colors hover:border-term-muted hover:text-term-fg"
        >
          ⏮
        </button>
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous step"
          className="border border-term-line px-2.5 py-1 font-mono text-[11px] text-term-muted transition-colors hover:border-term-muted hover:text-term-fg"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next step"
          className="border border-term-line px-2.5 py-1 font-mono text-[11px] text-term-muted transition-colors hover:border-term-muted hover:text-term-fg"
        >
          ▶
        </button>
        <button
          type="button"
          onClick={togglePlay}
          className="border border-accent px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent transition-colors hover:bg-accent hover:text-term"
        >
          {playing ? "pause" : "play"}
        </button>
        <input
          ref={scrubRef}
          type="range"
          min={0}
          max={1000}
          defaultValue={0}
          aria-label="Scrub run playback"
          className="trace-scrub mx-3 min-w-[80px] flex-1"
          onPointerDown={() => {
            draggingRef.current = true;
            interactedRef.current = true;
            tlRef.current?.pause();
            setPlaying(false);
          }}
          onPointerUp={() => {
            draggingRef.current = false;
          }}
          onInput={(e) => {
            const tl = tlRef.current;
            if (!tl) return;
            interactedRef.current = true;
            tl.progress(Number(e.currentTarget.value) / 1000).pause();
            setPlaying(false);
          }}
        />
        <span ref={counterRef} className="font-mono text-[11px] tabular-nums text-term-muted">
          step {total}/{total}
        </span>
      </div>
    </div>
  );
}
