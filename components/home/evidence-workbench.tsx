import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import type { TraceStep } from "@/content/traces";
import { DeuceSignalInspector } from "@/components/home/workbench/deuce-signal-inspector";
import { AirbnbTraceInspector } from "@/components/home/workbench/airbnb-trace-inspector";
import { BtcIndexWindow } from "@/components/home/workbench/btc-index-window";
import { ClaimReadyHandoffInspector } from "@/components/home/workbench/claimready-handoff-inspector";

export type WorkbenchStudy = Pick<CaseStudy, "title" | "subtitle" | "metrics" | "tech"> & {
  slug: string;
  href?: string;
  hrefLabel?: string;
  external?: boolean;
  secondaryLink?: {
    href: string;
    label: string;
    external?: boolean;
  };
};
type PreviewStep = Pick<TraceStep, "agent" | "text" | "code" | "status" | "latencyMs" | "final">;

const INSTRUMENT_META = {
  "deuce-tennis-forecast": {
    label: "forecast signal path",
    status: "inspectable",
    caption: "Inspect how four match-evidence families enter a calibrated forecast and tournament simulation.",
  },
  "airbnb-data-analyst-agent": {
    label: "recorded agent trace",
    status: "recorded run",
    caption: "Replay a real failed query, database error, validator intervention, retry, and cited answer.",
  },
  claimready: {
    label: "typed agent handoffs",
    status: "pipeline map",
    caption: "Inspect four specialist handoffs around one shared CaseFacts record before backend packet assembly.",
  },
  "btc-early-detection": {
    label: "leakage-safe window",
    status: "index scrub",
    caption: "Move the evaluation index while preserving the 45-day mask and following 30-day target.",
  },
} as const;

function Instrument({ slug, traceSteps }: { slug: WorkbenchStudy["slug"]; traceSteps: PreviewStep[] }) {
  if (slug === "deuce-tennis-forecast") return <DeuceSignalInspector />;
  if (slug === "airbnb-data-analyst-agent") return <AirbnbTraceInspector steps={traceSteps} />;
  if (slug === "claimready") return <ClaimReadyHandoffInspector />;
  if (slug === "btc-early-detection") return <BtcIndexWindow />;
  return null;
}

export function EvidenceWorkbench({
  studies,
  traceSteps,
}: {
  studies: WorkbenchStudy[];
  traceSteps: PreviewStep[];
}) {
  return (
    <div>
      <div className="mb-6 grid gap-4 border-y border-line py-5 sm:grid-cols-[1fr_auto] sm:items-end">
        <p className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted">
          Use the controls to inspect the evaluation, handoffs, and safeguards behind four selected systems.
          On larger screens, each instrument stays in place while its project moves through the reading frame.
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
          scroll to change project · interact to inspect
        </p>
      </div>

      <ol>
        {studies.map((study, index) => {
          const meta = INSTRUMENT_META[study.slug as keyof typeof INSTRUMENT_META];
          if (!meta) return null;
          const itemNumber = String(index + 1).padStart(2, "0");
          const titleId = `workbench-${study.slug}-title`;
          const captionId = `workbench-${study.slug}-caption`;

          return (
            <li key={study.slug} className="border-b border-line first:border-t">
              <article className="grid min-w-0 scroll-mt-20 gap-8 py-10 lg:min-h-[125svh] lg:grid-cols-[minmax(240px,0.68fr)_minmax(0,1.42fr)] lg:gap-12 lg:py-14 motion-reduce:lg:min-h-0">
                <div className="min-w-0 lg:pt-10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[12px] tabular-nums text-accent">{itemNumber}</span>
                    <span className="h-px w-10 bg-line" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">selected system</span>
                  </div>
                  <h3 id={titleId} className="mt-6 font-serif text-[clamp(1.8rem,3vw,2.45rem)] leading-[1.04] tracking-[-0.02em] text-ink">
                    {study.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{study.subtitle}</p>

                  <dl className="mt-7 grid gap-3 border-t border-line pt-5">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} title={metric.provenance} className="grid grid-cols-[auto_1fr] items-baseline gap-3">
                        <dt className="font-mono text-[13px] tabular-nums text-accent">{metric.value}</dt>
                        <dd className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">{metric.label}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-6 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-muted">
                    {study.tech.join(" · ")}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <Link
                      href={study.href ?? `/work/${study.slug}`}
                      target={study.external ? "_blank" : undefined}
                      rel={study.external ? "noreferrer" : undefined}
                      className="inline-flex min-h-11 items-center border border-ink px-4 font-mono text-[10px] uppercase tracking-[0.12em] text-ink no-underline transition-colors hover:border-accent hover:bg-accent hover:text-bg"
                    >
                      {study.hrefLabel ?? "open case study"}&nbsp;↗
                    </Link>
                    {study.secondaryLink && (
                      <Link
                        href={study.secondaryLink.href}
                        target={study.secondaryLink.external ? "_blank" : undefined}
                        rel={study.secondaryLink.external ? "noreferrer" : undefined}
                        className="inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.1em] text-muted no-underline hover:text-accent"
                      >
                        {study.secondaryLink.label}&nbsp;→
                      </Link>
                    )}
                  </div>
                </div>

                <figure
                  aria-labelledby={titleId}
                  aria-describedby={captionId}
                  className="min-w-0 self-start lg:sticky lg:top-20 lg:py-4 motion-reduce:lg:static"
                >
                  <div className="border border-ink bg-surface shadow-[6px_6px_0_var(--line)]">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-ink bg-bg px-3.5 py-2.5">
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink">evidence.workbench</span>
                      <span className="text-line">/</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{meta.label}</span>
                      <span className="ml-auto font-mono text-[9px] tabular-nums text-muted">{itemNumber} / {String(studies.length).padStart(2, "0")}</span>
                      <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-accent">
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {meta.status}
                      </span>
                    </div>
                    <Instrument slug={study.slug} traceSteps={traceSteps} />
                  </div>
                  <figcaption id={captionId} className="mt-3 font-mono text-[10px] leading-relaxed text-muted">
                    fig. {itemNumber} — {meta.caption}
                  </figcaption>
                </figure>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
