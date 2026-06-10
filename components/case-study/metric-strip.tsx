import type { Metric } from "@/content/case-studies";

/** Big numbers with their provenance directly underneath — no uncited stats. */
export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
      {metrics.map((m) => (
        <div key={m.label} className="bg-surface p-5">
          <div className="stat-value text-[clamp(1.7rem,3.4vw,2.3rem)] text-accent">{m.value}</div>
          <div className="mono-label mt-2 !text-ink">{m.label}</div>
          <div className="mt-2 font-mono text-[11px] leading-relaxed text-muted">{m.provenance}</div>
        </div>
      ))}
    </div>
  );
}
