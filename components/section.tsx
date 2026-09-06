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
      <div className="mx-auto max-w-wrap px-5 py-10 sm:px-8 sm:py-14">
        <h2 className="mb-7 flex items-baseline gap-4 font-serif text-[1.8rem] tracking-[-0.02em] sm:text-[2.1rem]">
          <span className="font-mono text-[11px] tracking-normal text-accent-text">{index}</span>
          <ScrambleLabel text={label} />
        </h2>
        {children}
      </div>
    </section>
  );
}
