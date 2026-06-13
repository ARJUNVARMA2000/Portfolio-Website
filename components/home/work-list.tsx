import Link from "next/link";
import { CASE_STUDIES } from "@/content/case-studies";
import { Section } from "@/components/section";
import { Parallax } from "@/components/motion/parallax";
import { DrawRule } from "@/components/motion/draw-rule";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";

export function WorkList() {
  return (
    <Section id="work" index="01" label="SELECTED WORK — four systems, told properly">
      <div>
        {CASE_STUDIES.map((cs, i) => (
          <article key={cs.slug} className="group relative isolate overflow-hidden last:border-b last:border-line">
            <DrawRule className="relative z-10" />

            {/* accent wash wipes up on hover */}
            <div
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-accent-soft transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100"
            />

            {/* giant ghost numeral, drifting against the scroll */}
            <Parallax
              speed={0.12}
              className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 md:block"
            >
              <span aria-hidden className="ghost-num block">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Parallax>

            {/* whole-row click target — the entire entry opens its case study */}
            <Link
              href={`/work/${cs.slug}`}
              aria-label={`Read case study: ${cs.title}`}
              className="absolute inset-0 z-10"
            />

            <div className="relative grid grid-cols-1 gap-x-8 gap-y-3 py-9 sm:grid-cols-[56px_1fr]">
              <div className="font-mono text-[13px] tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex items-start justify-between gap-x-6">
                <div className="min-w-0 md:max-w-[75%]">
                  <SplitReveal
                    as="h3"
                    type="lines"
                    className="font-serif text-[clamp(1.35rem,2.8vw,1.8rem)] tracking-[-0.015em] text-ink transition-[color,transform] duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-3 group-hover:text-accent"
                  >
                    {cs.title}
                  </SplitReveal>

                  <Reveal childSelector="[data-line]" stagger={0.08} start="top 92%">
                    <p data-line className="mt-2.5 max-w-[62ch] font-sans text-[0.9375rem] leading-relaxed text-muted">
                      {cs.subtitle}
                    </p>
                    <p data-line className="mt-3.5 flex flex-wrap gap-x-2 font-mono text-[12px] tabular-nums text-ink">
                      {cs.metrics.map((m, mi) => (
                        <span key={m.label}>
                          <Counter value={m.value} className="text-accent" /> {m.label}
                          {mi < cs.metrics.length - 1 && <span className="ml-2 text-line">·</span>}
                        </span>
                      ))}
                    </p>
                    <p data-line className="mono-label mt-2.5">
                      {cs.tech.join(" · ")}
                    </p>
                    {cs.slug === "airbnb-data-analyst-agent" && (
                      <p data-line className="relative z-20 mt-4">
                        <Link
                          href={`/work/${cs.slug}#trace`}
                          className="font-mono text-[12px] text-muted no-underline hover:text-accent"
                        >
                          <span
                            aria-hidden
                            className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent align-middle motion-reduce:animate-none"
                          />
                          replay a recorded run
                        </Link>
                      </p>
                    )}
                  </Reveal>
                </div>

                {/* persistent affordance — visible at rest, warms to accent on row hover */}
                <span
                  aria-hidden
                  className="mono-label mt-1.5 shrink-0 whitespace-nowrap text-muted transition-colors duration-300 group-hover:text-accent"
                >
                  case study{" "}
                  <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
