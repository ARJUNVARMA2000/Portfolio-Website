"use client";

import Link from "next/link";
import { useState } from "react";
import { TRACE_RUNS } from "@/content/traces";
import { Section } from "@/components/section";
import { AirbnbTraceInspector } from "./workbench/airbnb-trace-inspector";

const RUN_LABELS: Record<string, string> = {
  superhost: "Superhost reviews",
  brooklyn: "Brooklyn prices",
  unionsq: "Union Square rooms",
};

export function RecordedWalkthrough() {
  const [selected, setSelected] = useState(TRACE_RUNS[0].id);
  const run = TRACE_RUNS.find((candidate) => candidate.id === selected) ?? TRACE_RUNS[0];
  const answer = run.steps.find((step) => step.final)?.text;

  return (
    <Section id="walkthrough" index="03" label="Inside an agent run">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className="max-w-[58ch] text-sm leading-relaxed text-muted">A recorded question, the answer it produced, and the checks along the way. From the Airbnb Data Analyst Agent.</p>
        <Link href="/work/airbnb-data-analyst-agent#trace" className="inline-flex min-h-11 shrink-0 items-center text-xs text-accent-text underline decoration-line underline-offset-4">Full case study →</Link>
      </div>
      <div role="group" aria-label="Recorded examples" className="mb-4 flex flex-wrap gap-2">
        {TRACE_RUNS.map((candidate) => (
          <button key={candidate.id} type="button" aria-pressed={candidate.id === selected} onClick={() => setSelected(candidate.id)}
            className={candidate.id === selected ? "min-h-11 border border-ink bg-ink px-3 text-xs text-bg" : "min-h-11 border border-line bg-surface px-3 text-xs text-ink transition-colors hover:border-ink"}>
            {RUN_LABELS[candidate.id]}
          </button>
        ))}
      </div>
      <div className="border border-term bg-term text-term-fg">
        <div aria-live="polite" aria-atomic="true" className="p-5 sm:p-8">
          <p className="font-mono text-[11px] text-term-muted">Recorded NYC listings example</p>
          <h3 className="mt-3 max-w-[34ch] font-serif text-[1.65rem] leading-tight sm:text-[2rem]">{run.question}</h3>
          <div className="mt-5 border-l-2 border-accent pl-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-term">Answer from this run</p>
            <p className="mt-2 max-w-[75ch] text-[0.9375rem] leading-relaxed" data-recorded-answer>{answer}</p>
          </div>
          <p className="mt-5 font-mono text-[11px] text-term-muted">Recorded duration: {(run.totalLatencyMs / 1000).toFixed(1)}s · Cost: ${run.costUsd.toFixed(3)} · {run.steps.length} steps</p>
        </div>
        <details key={run.id} className="project-disclosure border-t border-term-line">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between px-5 py-3 text-sm sm:px-8">
            Inspect the recorded steps <span aria-hidden className="disclosure-icon font-mono text-accent-term">+</span>
          </summary>
          <AirbnbTraceInspector steps={run.steps} />
        </details>
      </div>
    </Section>
  );
}
