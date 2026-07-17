import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import { Parallax } from "@/components/motion/parallax";
import { DrawRule } from "@/components/motion/draw-rule";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";

export function FeaturedWorkRow({ cs, index }: { cs: CaseStudy; index: number }) {
  const itemNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative isolate overflow-hidden border-b border-line">
      <DrawRule className="relative z-10" />
      <div
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-accent-soft transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100 group-focus-within:scale-y-100"
      />
      <Parallax
        speed={0.12}
        className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 md:block"
      >
        <span aria-hidden className="ghost-num block">
          {itemNumber}
        </span>
      </Parallax>
      <Link
        href={`/work/${cs.slug}`}
        aria-label={`Read case study: ${cs.title}`}
        className="absolute inset-0 z-10"
      />

      <div className="relative grid grid-cols-1 gap-x-8 gap-y-3 py-9 sm:grid-cols-[56px_1fr]">
        <div className="font-mono text-[13px] tabular-nums text-accent">{itemNumber}</div>
        <div className="flex items-start justify-between gap-x-6">
          <div className="min-w-0 md:max-w-[75%]">
            <SplitReveal
              as="h3"
              type="lines"
              className="font-serif text-[clamp(1.35rem,2.8vw,1.8rem)] tracking-[-0.015em] text-ink transition-[color,transform] duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-3 group-hover:text-accent group-focus-within:translate-x-3 group-focus-within:text-accent"
            >
              {cs.title}
            </SplitReveal>
            <Reveal childSelector="[data-line]" stagger={0.08} start="top 92%">
              <p data-line className="mt-2.5 max-w-[62ch] font-sans text-[0.9375rem] leading-relaxed text-muted">
                {cs.subtitle}
              </p>
              <p data-line className="mt-3.5 flex flex-wrap gap-x-2 font-mono text-[12px] tabular-nums text-ink">
                {cs.metrics.map((metric, metricIndex) => (
                  <span key={metric.label}>
                    <Counter value={metric.value} className="text-accent" /> {metric.label}
                    {metricIndex < cs.metrics.length - 1 && <span className="ml-2 text-line">·</span>}
                  </span>
                ))}
              </p>
              <p data-line className="mono-label mt-2.5">
                {cs.tech.join(" · ")}
              </p>
            </Reveal>
          </div>
          <span
            aria-hidden
            className="mono-label mt-1.5 shrink-0 whitespace-nowrap text-muted transition-colors duration-300 group-hover:text-accent group-focus-within:text-accent"
          >
            case study <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-within:-translate-y-0.5 group-focus-within:translate-x-0.5">↗</span>
          </span>
        </div>
      </div>
    </article>
  );
}
