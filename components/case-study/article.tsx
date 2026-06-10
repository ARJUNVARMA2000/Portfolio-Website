import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { CaseStudy, CaseSection } from "@/content/case-studies";
import { MultiAgentDiagram } from "@/components/diagrams/multi-agent-diagram";
import { TraceReplay } from "@/components/diagrams/trace-replay";
import { FactSheet } from "./fact-sheet";
import { MetricStrip } from "./metric-strip";
import { Pager } from "./pager";

function Figure({ section }: { section: CaseSection }) {
  if (!section.figure) return null;
  const { kind, caption } = section.figure;
  return (
    <figure className="mx-auto mt-10 max-w-figure">
      {kind === "multi-agent" ? (
        <div className="border border-line bg-surface p-4 sm:p-8">
          <MultiAgentDiagram />
        </div>
      ) : (
        <TraceReplay />
      )}
      <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}

export function CaseStudyArticle({ cs }: { cs: CaseStudy }) {
  return (
    <article>
      {/* header */}
      <div className="mx-auto max-w-wrap px-5 pb-12 pt-12 sm:px-8 sm:pt-16">
        <Link href="/#work" className="mono-label !text-muted no-underline hover:!text-accent">
          ← work
        </Link>
        <h1 className="mt-6 max-w-[20ch] font-serif text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] tracking-[-0.02em]">
          {cs.title}
        </h1>
        <p className="mt-5 max-w-prose font-sans text-[1.0625rem] leading-relaxed text-muted">{cs.subtitle}</p>
      </div>

      {/* fact sheet + metrics */}
      <div className="mx-auto max-w-wrap px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,420px)_1fr]">
          <FactSheet cs={cs} />
          <MetricStrip metrics={cs.metrics} />
        </div>
      </div>

      {/* narrative */}
      <div className="mx-auto max-w-wrap px-5 sm:px-8">
        {cs.sections.map((section, i) => (
          <section key={section.id} className="border-t border-line py-12 first-of-type:mt-14 sm:py-16">
            <div className="mono-label mb-8 flex items-baseline gap-3">
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span>/ {section.id.toUpperCase()}</span>
            </div>
            <div className="mx-auto max-w-prose">
              <h2 className="mb-5 font-serif text-[clamp(1.35rem,2.6vw,1.7rem)] tracking-[-0.01em]">
                {section.title}
              </h2>
              <div className="cs-prose">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.body}</ReactMarkdown>
              </div>
            </div>
            <Figure section={section} />
          </section>
        ))}
      </div>

      {/* footer */}
      <div className="mx-auto max-w-wrap px-5 pb-16 sm:px-8">
        <p className="mb-8 border-t border-line pt-8 font-mono text-[12px] text-muted">
          Questions about this project? Press <span className="text-accent">⌘K</span> — the chat answers from
          these case studies and cites them.
        </p>
        <Pager slug={cs.slug} />
      </div>
    </article>
  );
}
