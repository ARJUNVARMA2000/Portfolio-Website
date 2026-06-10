import { PROJECT_INDEX } from "@/content/projects";
import { Section } from "@/components/section";

export function ProjectIndex() {
  return (
    <Section id="projects" index="03" label="MORE SHIPPED WORK — live links, no slides">
      <div>
        {PROJECT_INDEX.map((p) => (
          <div
            key={p.title}
            className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-line py-5 last:border-b sm:grid-cols-[200px_1fr_auto]"
          >
            <div>
              <span className="font-mono text-[13px] font-medium text-ink">{p.title}</span>
              <span className="ml-3 font-mono text-[11px] tabular-nums text-muted">{p.year}</span>
            </div>
            <p className="font-sans text-[0.875rem] leading-relaxed text-muted">{p.oneLiner}</p>
            <div className="flex gap-4 sm:justify-end">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label !text-accent hover:underline"
                >
                  live ↗
                </a>
              )}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label !text-ink hover:!text-accent"
                >
                  repo ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
