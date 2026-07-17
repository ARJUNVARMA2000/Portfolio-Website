import { PROJECT_INDEX } from "@/content/projects";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { ScrambleLabel } from "@/components/motion/scramble";

export function ProjectIndex() {
  return (
    <Section id="projects" index="02" label="MORE SHIPPED WORK">
      <Reveal childSelector="[data-row]" stagger={0.07} start="top 85%">
        {PROJECT_INDEX.map((p) => (
          <div
            key={p.title}
            data-row
            className="group grid grid-cols-1 gap-x-8 gap-y-2 border-t border-line py-5 last:border-b sm:grid-cols-[200px_1fr_auto]"
          >
            <div>
              <span className="font-mono text-[13px] font-medium text-ink">{p.title}</span>
              <ScrambleLabel
                text={String(p.year)}
                className="ml-3 font-mono text-[11px] tabular-nums text-muted"
              />
            </div>
            <p className="font-sans text-[0.875rem] leading-relaxed text-muted">{p.oneLiner}</p>
            <div className="flex gap-4 sm:justify-end">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label !text-accent"
                >
                  live{" "}
                  <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              )}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label !text-ink hover:!text-accent"
                >
                  repo{" "}
                  <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              )}
            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
