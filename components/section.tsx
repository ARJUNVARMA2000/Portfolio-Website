import type { ReactNode } from "react";
import { DrawRule } from "@/components/motion/draw-rule";
import { ScrambleLabel } from "@/components/motion/scramble";

type SectionProps = {
  id?: string;
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
};

/** Full-width section opened by a self-drawing hairline rule and a decoding mono index label. */
export function Section({ id, index, label, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`relative ${className}`}>
      <DrawRule className="absolute left-0 top-0" />
      <div className="mx-auto max-w-wrap px-5 py-[clamp(56px,8vh,104px)] sm:px-8">
        <h2 className="mono-label mb-10 flex items-baseline gap-3">
          <span className="text-accent-text">{index}</span>
          <ScrambleLabel text={`/ ${label}`} />
        </h2>
        {children}
      </div>
    </section>
  );
}
