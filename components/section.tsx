import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
};

/** Full-width section opened by a hairline rule and a mono index label. */
export function Section({ id, index, label, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`border-t border-line ${className}`}>
      <div className="mx-auto max-w-wrap px-5 py-[clamp(56px,8vh,104px)] sm:px-8">
        <div className="mono-label mb-10 flex items-baseline gap-3">
          <span className="text-accent">{index}</span>
          <span>/ {label}</span>
        </div>
        {children}
      </div>
    </section>
  );
}
