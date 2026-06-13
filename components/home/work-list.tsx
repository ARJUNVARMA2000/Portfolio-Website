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
          <article key={cs.slug} className="group relative overflow-hidden last:border-b last:border-line">
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

            <div className="relative grid grid-cols-1 gap-x-8 gap-y-3 py-9 sm:grid-cols-[56px_1fr]">
              <div className="font-mono text-[13px] tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="md:max-w-[75%]">
                <SplitReveal
                  as="h3"
                  type="lines"
                  className="font-serif text-[clamp(1.35rem,2.8vw,1.8rem)] tracking-[-0.015em] transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-3"
                >
                  <Link
                    href={`/work/${cs.slug}`}
                    className="text-ink no-underline transition-colors group-hover:text-accent"
                  >
                    {cs.title}
                  </Link>
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
                  <p data-line className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                    <Link
                      href={`/work/${cs.slug}`}
                      className="font-mono text-[12px] text-accent no-underline"
                    >
                      Read the case study{" "}
                      <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1.5">
                        →
                      </span>
                    </Link>
                    {cs.slug === "airbnb-data-analyst-agent" && (
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
                    )}
                  </p>
                </Reveal>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
