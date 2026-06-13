import type { CaseStudy } from "@/content/case-studies";
import { Reveal } from "@/components/motion/reveal";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div data-row className="flex flex-col gap-1 border-t border-line py-3 sm:flex-row sm:gap-0">
      <dt className="mono-label w-28 shrink-0">{label}</dt>
      <dd className="font-mono text-[13px] leading-relaxed text-ink">{children}</dd>
    </div>
  );
}

export function FactSheet({ cs }: { cs: CaseStudy }) {
  return (
    <Reveal as="dl" childSelector="[data-row]" stagger={0.06} className="border-b border-line">
      <Row label="Org">{cs.org}</Row>
      <Row label="Role">{cs.role}</Row>
      <Row label="Period">{cs.period}</Row>
      <Row label="Status">
        <span className="border border-accent px-1.5 py-px text-[11px] uppercase tracking-[0.14em] text-accent">
          {cs.status}
        </span>
      </Row>
      <Row label="Stack">{cs.tech.join(" · ")}</Row>
      {cs.links.length > 0 && (
        <Row label="Links">
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            {cs.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                {l.label} ↗
              </a>
            ))}
          </span>
        </Row>
      )}
    </Reveal>
  );
}
