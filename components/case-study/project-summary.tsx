import type { CaseStudySummary } from "@/content/case-studies";

export function ProjectSummary({ summary }: { summary: CaseStudySummary }) {
  const entries = [
    ["My contribution", summary.contribution],
    ["Key decision", summary.decision],
    ["Result", summary.result],
    ["Current limitation", summary.limitation],
  ];
  return (
    <dl data-case-summary className="mb-9 grid gap-x-8 gap-y-5 border-y border-line py-6 sm:grid-cols-2">
      {entries.map(([label, value]) => (
        <div key={label}>
          <dt className="font-mono text-[11px] text-accent-text">{label}</dt>
          <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
