import Link from "next/link";
import { EDUCATION } from "@/content/site";
import { SKILLS } from "@/content/skills";
import { Section } from "@/components/section";

const CAPABILITIES = [
  { title: "Forecasting & evaluation", detail: "Chronological backtests, calibration, and uncertainty.", project: "DEUCE Tennis Forecast", href: "/work/deuce-tennis-forecast#evidence" },
  { title: "Agent workflows", detail: "Typed tools, validation, and recovery from failed queries.", project: "Airbnb Data Analyst Agent", href: "/work/airbnb-data-analyst-agent#trace" },
  { title: "Production ML", detail: "Claims pipelines, leakage controls, and interpretable models.", project: "BTC Early Detection", href: "/work/btc-early-detection" },
  { title: "Retrieval & citations", detail: "Scoped retrieval and answers grounded in source documents.", project: "Filing Intelligence RAG", href: "/work/filing-intelligence-rag" },
];

export function About() {
  return (
    <Section id="about" index="05" label="About">
      <p className="max-w-[62ch] text-lg leading-relaxed text-muted">
        My work spans forecasting, experimentation, healthcare analytics, and agent workflows.
        I build the data pipelines, evaluation, and interfaces around the model.
      </p>
      <div className="mt-7 grid gap-x-7 gap-y-5 sm:grid-cols-2">
        {CAPABILITIES.map((capability) => (
          <div key={capability.title} className="border-t border-line pt-4">
            <h3 className="text-base font-medium">{capability.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{capability.detail}</p>
            <Link href={capability.href} className="mt-1 inline-flex min-h-11 items-center text-xs text-accent-text underline decoration-line underline-offset-4">{capability.project} →</Link>
          </div>
        ))}
      </div>
      <details className="experience-detail mt-5 border-y border-line">
        <summary className="flex min-h-12 cursor-pointer items-center justify-between py-3 text-sm">
          All skills <span aria-hidden className="disclosure-icon font-mono text-accent-text">+</span>
        </summary>
        <dl className="grid gap-5 pb-6 sm:grid-cols-2">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category}>
              <dt className="mb-2 text-sm font-medium">{category}</dt>
              <dd className="text-sm leading-relaxed text-muted">{skills.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </details>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {EDUCATION.map((education) => (
          <div key={education.school}>
            <h3 className="font-serif text-xl">{education.school}</h3>
            <p className="mt-1 text-sm">{education.degree}</p>
            <p className="mt-2 font-mono text-[11px] text-muted">{education.period}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{education.note}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
