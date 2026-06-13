import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { CaseStudy, CaseSection } from "@/content/case-studies";
import { MultiAgentDiagram } from "@/components/diagrams/multi-agent-diagram";
import { TraceReplay } from "@/components/diagrams/trace-replay";
import { DrawRule } from "@/components/motion/draw-rule";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ScrambleLabel } from "@/components/motion/scramble";
import { FactSheet } from "./fact-sheet";
import { CitedMetrics } from "./cited-metric";
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
      <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
        <ScrambleLabel text={caption} duration={1.1} />
      </figcaption>
    </figure>
  );
}

export function CaseStudyArticle({ cs }: { cs: CaseStudy }) {
  return (
    <article>
      {/* header */}
      <div className="mx-auto max-w-wrap px-5 pb-12 pt-12 sm:px-8 sm:pt-16">
        <Link href="/#work" className="mono-label u-line !text-muted hover:!text-accent">
          <ScrambleLabel text="← work" trigger="mount" />
        </Link>
        <SplitReveal
          as="h1"
          type="lines"
          trigger="mount"
          className="mt-6 max-w-[20ch] font-serif text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] tracking-[-0.02em]"
        >
          {cs.title}
        </SplitReveal>
        <Reveal
          as="p"
          trigger="mount"
          delay={0.35}
          className="mt-5 max-w-prose font-sans text-[1.0625rem] leading-relaxed text-muted"
        >
          {cs.subtitle}
        </Reveal>
      </div>

      {/* fact sheet + metrics */}
      <div className="mx-auto max-w-wrap px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,420px)_1fr]">
          <FactSheet cs={cs} />
          <CitedMetrics metrics={cs.metrics} />
        </div>
      </div>

      {/* narrative */}
      <div className="mx-auto max-w-wrap px-5 sm:px-8">
        {cs.sections.map((section, i) => (
          <section key={section.id} className="relative py-12 first-of-type:mt-14 sm:py-16">
            <DrawRule className="absolute left-0 top-0" />
            <div className="mono-label mb-8 flex items-baseline gap-3">
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
              <ScrambleLabel text={`/ ${section.id.toUpperCase()}`} />
            </div>
            <div className="mx-auto max-w-prose">
              <SplitReveal
                as="h2"
                type="lines"
                className="mb-5 font-serif text-[clamp(1.35rem,2.6vw,1.7rem)] tracking-[-0.01em]"
              >
                {section.title}
              </SplitReveal>
              <Reveal childSelector=".cs-prose > *" stagger={0.06} start="top 85%">
                <div className="cs-prose">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.body}</ReactMarkdown>
                </div>
              </Reveal>
            </div>
            <Figure section={section} />
          </section>
        ))}
      </div>

      {/* footer */}
      <div className="mx-auto max-w-wrap px-5 pb-16 sm:px-8">
        <Reveal as="p" className="mb-8 border-t border-line pt-8 font-mono text-[12px] text-muted">
          Questions about this project? Press <span className="text-accent">⌘K</span> — the chat
          answers from these case studies and cites them.
        </Reveal>
        <Reveal>
          <Pager slug={cs.slug} />
        </Reveal>
      </div>
    </article>
  );
}
