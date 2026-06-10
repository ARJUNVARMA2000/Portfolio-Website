import { EDUCATION } from "@/content/site";
import { SKILLS } from "@/content/skills";
import { Section } from "@/components/section";

export function About() {
  return (
    <Section id="about" index="05" label="ABOUT">
      <blockquote className="max-w-[26ch] font-serif text-[clamp(1.6rem,3.6vw,2.4rem)] italic leading-[1.2] tracking-[-0.015em]">
        &ldquo;Measure the thing that matters, not the thing that&rsquo;s easy.&rdquo;
      </blockquote>
      <p className="mt-6 max-w-[58ch] font-sans text-[0.9375rem] leading-relaxed text-muted">
        Three-plus years of production data work taught me where systems actually fail: pipelines, evals,
        drift, citations — the parts that aren&rsquo;t pretty on a slide but keep models alive in production.
        That&rsquo;s the work I optimize for. Right now I&rsquo;m building agents that plan, query, and cite
        their own homework.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h3 className="mono-label mb-4">Education</h3>
          <div className="space-y-5">
            {EDUCATION.map((ed) => (
              <div key={ed.school} className="border-t border-line pt-3">
                <p className="font-sans text-[0.9375rem] font-medium text-ink">{ed.school}</p>
                <p className="mt-0.5 font-sans text-[0.875rem] text-muted">{ed.degree}</p>
                <p className="mono-label mt-1.5">{ed.period}</p>
                <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-muted">{ed.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mono-label mb-4">Toolbox</h3>
          <div className="space-y-4">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category} className="border-t border-line pt-3">
                <p className="mono-label !text-ink">{category}</p>
                <p className="mt-1.5 font-mono text-[12px] leading-relaxed text-muted">{items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
