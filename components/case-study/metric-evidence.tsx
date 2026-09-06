import Link from "next/link";
import type { Metric } from "@/content/case-studies";

const KIND_LABELS = {
  evaluation: "Measured evaluation",
  contract: "System contract",
  architecture: "Architecture",
  production: "Production scale",
  verification: "Verification coverage",
  corpus: "Corpus scope",
  recognition: "Recognition",
};

export function MetricEvidence({ metric }: { metric: Metric }) {
  const external = metric.source?.href.startsWith("https://");
  return (
    <div className="text-xs leading-relaxed text-muted">
      {metric.kind && <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.07em] text-accent-text">{KIND_LABELS[metric.kind]}</p>}
      <p>{metric.provenance}</p>
      {metric.source && (
        <Link href={metric.source.href} data-native-hash={external ? undefined : true} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="mt-1 inline-flex min-h-11 items-center gap-2 underline decoration-line underline-offset-4 hover:text-accent-text">
          {metric.source.label} <span aria-hidden>{external ? "↗" : "→"}</span>
        </Link>
      )}
    </div>
  );
}
