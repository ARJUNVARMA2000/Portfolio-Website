import { EXPERIENCE } from "@/content/experience";
import { Section } from "@/components/section";

export function Timeline() {
  return (
    <Section id="experience" index="04" label="EXPERIENCE">
      <div className="space-y-0">
        {EXPERIENCE.map((exp) => (
          <div
            key={exp.org}
            className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line py-8 last:border-b md:grid-cols-[240px_1fr]"
          >
            <div>
              <h3 className="font-serif text-xl tracking-[-0.01em]">{exp.org}</h3>
              <p className="mono-label mt-1.5">
                {exp.location} · {exp.period}
              </p>
              {exp.current && (
                <span className="mt-2.5 inline-block border border-accent px-1.5 py-px font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  current
                </span>
              )}
            </div>
            <div className="space-y-6">
              {exp.roles.map((role) => (
                <div key={role.title}>
                  <div className="flex flex-wrap items-baseline gap-x-4">
                    <h4 className="font-sans text-[0.9375rem] font-medium text-ink">{role.title}</h4>
                    <span className="font-mono text-[11px] tabular-nums text-muted">{role.period}</span>
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {role.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2.5 font-sans text-[0.875rem] leading-relaxed text-muted">
                        <span className="font-mono text-accent" aria-hidden>
                          —
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {exp.footnote && (
                <p className="border-t border-line pt-3 font-mono text-[11px] leading-relaxed text-muted">
                  {exp.footnote}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
