import { EXPERIENCE } from "@/content/experience";
import { Section } from "@/components/section";

export function Timeline() {
  return (
    <Section id="experience" index="02" label="Experience">
      <div className="divide-y divide-line border-y border-line">
        {EXPERIENCE.map((experience) => (
          <article key={experience.org} className="grid gap-x-8 gap-y-3 py-6 md:grid-cols-[230px_minmax(0,1fr)]">
            <div>
              <h3 className="font-serif text-2xl tracking-[-0.02em]">{experience.org}</h3>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">{experience.period}</p>
              <p className="mt-1 text-xs text-muted">{experience.location}</p>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium">{experience.roles[0].title}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{experience.roles[0].bullets[0]}</p>
              <details className="experience-detail mt-3">
                <summary className="inline-flex min-h-11 cursor-pointer items-center gap-4 text-xs text-accent-text">
                  Role details <span aria-hidden className="disclosure-icon font-mono">+</span>
                </summary>
                <div className="mt-2 space-y-5 border-l border-line pl-4">
                  {experience.roles.map((role) => (
                    <div key={role.title}>
                      <h4 className="text-sm font-medium">{role.title}</h4>
                      <p className="mt-1 font-mono text-[11px] text-muted">{role.period}</p>
                      <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted">
                        {role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                      </ul>
                    </div>
                  ))}
                  {experience.footnote && <p className="text-xs leading-relaxed text-muted">{experience.footnote}</p>}
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
