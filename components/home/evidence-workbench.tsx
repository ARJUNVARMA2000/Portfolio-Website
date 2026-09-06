import Link from "next/link";
import type { CatalogProject } from "@/content/project-catalog";
import { TRACE_RUNS } from "@/content/traces";
import { DeuceSignalInspector } from "@/components/home/workbench/deuce-signal-inspector";
import { AirbnbTraceInspector } from "@/components/home/workbench/airbnb-trace-inspector";
import { BtcIndexWindow } from "@/components/home/workbench/btc-index-window";
import { ClaimReadyHandoffInspector } from "@/components/home/workbench/claimready-handoff-inspector";
import { ProjectActions } from "@/components/project-actions";
import { ProjectPreview } from "./project-preview";
import { MetricEvidence } from "@/components/case-study/metric-evidence";

function Instrument({ slug }: { slug: string }) {
  if (slug === "deuce-tennis-forecast") return <DeuceSignalInspector />;
  if (slug === "airbnb-data-analyst-agent") return <AirbnbTraceInspector steps={TRACE_RUNS[0].steps} />;
  if (slug === "claimready") return <ClaimReadyHandoffInspector />;
  if (slug === "btc-early-detection") return <BtcIndexWindow />;
  return null;
}

export function EvidenceWorkbench({ studies }: { studies: CatalogProject[] }) {
  return (
    <ol className="grid items-start gap-x-7 gap-y-8 md:grid-cols-2">
      {studies.map((study) => (
        <li key={study.slug}>
          <article className="group/project min-w-0 border border-line bg-surface" data-project={study.slug}>
            <figure aria-label={study.title + " preview"}><ProjectPreview slug={study.slug} /></figure>
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap justify-between gap-2 font-mono text-[11px] text-muted">
                <span className="text-accent-text">{study.category}</span>
                <span>{study.contribution}</span>
              </div>
              <h3 className="mt-3 font-serif text-[1.65rem] leading-[1.1] tracking-[-0.02em] sm:text-[1.9rem]">{study.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{study.description}</p>
              {study.metrics?.[0] && (
                <p className="mt-4 border-l-2 border-accent pl-3 text-xs leading-relaxed">
                  <span className="font-mono text-accent-text">{study.metrics[0].value}</span>{" "}{study.metrics[0].label}
                  {study.metrics[0].kind === "architecture" && <span className="text-muted"> · architecture</span>}
                </p>
              )}
              <ProjectActions liveHref={study.live} githubHref={study.repo} caseStudyHref={study.caseStudy} compact className="mt-5" />
              {study.statusNote && <p className="mt-3 text-xs leading-relaxed text-muted">{study.statusNote}</p>}
              {study.unavailableNote && <p className="mt-3 text-xs leading-relaxed text-muted">{study.unavailableNote}</p>}
            </div>
            <details className="project-disclosure border-t border-line">
              <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-3 px-5 py-3 text-[12px] text-ink sm:px-6">
                Evidence &amp; design <span aria-hidden className="disclosure-icon font-mono text-accent-text">+</span>
              </summary>
              <div className="min-w-0 border-t border-line px-5 pb-5 pt-4 sm:px-6">
                {study.summary && <p className="mb-4 text-sm leading-relaxed text-muted">{study.summary.result}</p>}
                <dl className="space-y-4">
                  {study.metrics?.map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-sm font-medium"><span className="font-mono text-accent-text">{metric.value}</span> {metric.label}</dt>
                      <dd className="mt-1"><MetricEvidence metric={metric} /></dd>
                    </div>
                  ))}
                </dl>
                {study.summary && <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-muted"><strong className="font-medium text-ink">Scope. </strong>{study.summary.limitation}</p>}
                {study.slug === "airbnb-data-analyst-agent" && <Link href="/work/airbnb-data-analyst-agent#trace" className="u-line mt-3 inline-flex min-h-11 items-center text-xs text-accent-text">Full recorded trace →</Link>}
              </div>
              <div className="min-w-0 border-t border-line"><Instrument slug={study.slug} /></div>
            </details>
          </article>
        </li>
      ))}
    </ol>
  );
}
