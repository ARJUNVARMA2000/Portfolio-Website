type StatProps = {
  value: string;
  label: string;
  /** 1-based footnote marker, rendered as a superscript linking to #fn-{n}. */
  fn?: number;
  size?: "lg" | "md";
};

export function Stat({ value, label, fn, size = "lg" }: StatProps) {
  return (
    <div>
      <div
        className={`stat-value text-ink ${
          size === "lg" ? "text-[clamp(1.9rem,4vw,2.6rem)]" : "text-[clamp(1.4rem,3vw,1.8rem)]"
        }`}
      >
        {value}
        {fn !== undefined && (
          <a
            href={`#fn-${fn}`}
            className="ml-0.5 align-super font-mono text-[0.45em] text-accent no-underline"
            aria-label={`footnote ${fn}`}
          >
            {fn}
          </a>
        )}
      </div>
      <div className="mono-label mt-2">{label}</div>
    </div>
  );
}

export function FootnoteList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ol className={`space-y-1 ${className}`}>
      {items.map((item, i) => (
        <li
          key={i}
          id={`fn-${i + 1}`}
          className="font-mono text-[11px] leading-relaxed text-muted"
        >
          <span className="text-accent">{i + 1}</span>&nbsp;&nbsp;{item}
        </li>
      ))}
    </ol>
  );
}
