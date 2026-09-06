import Image from "next/image";
import { TRACE_RUNS } from "@/content/traces";

/** Existing product imagery and recorded artifacts; schematics are labelled as such. */
export function ProjectPreview({ slug }: { slug: string }) {
  if (slug === "deuce-tennis-forecast") {
    return (
      <div className="relative overflow-hidden border-b border-line bg-term">
        <Image src="/images/deuce/home.png" alt="DEUCE's match forecast dashboard" width={1440} height={900} sizes="(min-width: 768px) 500px, 90vw" className="aspect-[2/1] w-full object-cover object-top transition-transform duration-500 group-hover/project:scale-[1.025] motion-reduce:transform-none" />
        <span className="absolute bottom-3 left-3 border border-white/20 bg-term px-2 py-1 font-mono text-[10px] text-term-fg">Product screenshot · DEUCE</span>
      </div>
    );
  }
  if (slug === "airbnb-data-analyst-agent") {
    const run = TRACE_RUNS[0];
    return (
      <div className="flex aspect-[2/1] flex-col justify-between border-b border-term-line bg-term p-5 text-term-fg sm:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-term-muted">Recorded output · NYC listings</p>
        <p className="max-w-[34ch] font-serif text-[clamp(1.2rem,2.2vw,1.7rem)] leading-tight">{run.question}</p>
        <p className="mt-3 border-l-2 border-accent pl-3 text-[12px] leading-relaxed text-term-fg">{run.steps.find((step) => step.final)?.text?.split("Source:")[0]}</p>
      </div>
    );
  }
  if (slug === "claimready") {
    return (
      <div className="relative flex aspect-[2/1] flex-col justify-between overflow-hidden border-b border-line bg-accent-soft p-5 sm:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">Packet structure · architecture</p>
        <div className="my-3 grid grid-cols-2 gap-2">
          {["Statement", "Demand letter", "Exhibit index", "Filing guide"].map((label) => (
            <div key={label} className="flex items-center gap-3 border border-line bg-surface px-3 py-2.5 text-[12px] text-ink">
              <svg aria-hidden viewBox="0 0 16 20" className="h-5 w-4 shrink-0 text-accent-text" fill="none" stroke="currentColor"><path d="M1 1h9l5 5v13H1zM10 1v5h5M4 10h8M4 14h6" /></svg>
              {label}
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] text-muted">Uploaded evidence → shared case record → packet</p>
      </div>
    );
  }
  return (
    <div className="flex aspect-[2/1] flex-col justify-between border-b border-line bg-surface p-5 sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">Evaluation schematic · proprietary work</p>
      <div className="mt-5">
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-px text-center text-[11px]">
          <div className="border-t-2 border-ink bg-ink/[0.04] px-2 py-5">Available history</div>
          <div className="border-t-2 border-accent bg-accent-soft px-2 py-5 text-accent-text">45 days masked</div>
          <div className="border-t-2 border-muted bg-ink/[0.04] px-2 py-5">30-day target</div>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-muted">Keep near-diagnosis information out of the model.</p>
      </div>
    </div>
  );
}
