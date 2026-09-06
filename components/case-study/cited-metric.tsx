import type { Metric } from "@/content/case-studies";
import { MetricEvidence } from "./metric-evidence";

/** Values and qualifiers remain readable together, including without motion or JS. */
export function CitedMetrics({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} data-card className="min-w-0 bg-surface p-5">
          <p data-value className="font-serif text-[clamp(1.7rem,3.4vw,2.3rem)] leading-tight text-accent-text">{metric.value}</p>
          <p className="mb-3 mt-2 text-sm font-medium">{metric.label}</p>
          <MetricEvidence metric={metric} />
        </div>
      ))}
    </div>
  );
}
