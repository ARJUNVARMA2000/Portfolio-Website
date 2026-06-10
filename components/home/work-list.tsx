import Link from "next/link";
import { CASE_STUDIES } from "@/content/case-studies";
import { Section } from "@/components/section";

export function WorkList() {
  return (
    <Section id="work" index="01" label="SELECTED WORK — four systems, told properly">
      <div>
        {CASE_STUDIES.map((cs, i) => (
          <article
            key={cs.slug}
            className="group grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line py-9 last:border-b sm:grid-cols-[56px_1fr]"
          >
            <div className="font-mono text-[13px] tabular-nums text-accent">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="font-serif text-[clamp(1.35rem,2.8vw,1.8rem)] tracking-[-0.015em]">
                <Link
                  href={`/work/${cs.slug}`}
                  className="text-ink no-underline transition-colors group-hover:text-accent"
                >
                  {cs.title}
                </Link>
              </h3>
              <p className="mt-2.5 max-w-[62ch] font-sans text-[0.9375rem] leading-relaxed text-muted">
                {cs.subtitle}
              </p>
              <p className="mt-3.5 font-mono text-[12px] tabular-nums text-ink">
                {cs.metrics.map((m) => `${m.value} ${m.label}`).join("  ·  ")}
              </p>
              <p className="mono-label mt-2.5">{cs.tech.join(" · ")}</p>
              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                <Link
                  href={`/work/${cs.slug}`}
                  className="font-mono text-[12px] text-accent no-underline hover:underline"
                >
                  Read the case study →
                </Link>
                {cs.slug === "airbnb-data-analyst-agent" && (
                  <Link
                    href={`/work/${cs.slug}#trace`}
                    className="font-mono text-[12px] text-muted no-underline hover:text-accent hover:underline"
                  >
                    ▶ replay a recorded run
                  </Link>
                )}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
