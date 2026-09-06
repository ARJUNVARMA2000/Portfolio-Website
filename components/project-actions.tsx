import Link from "next/link";

type ProjectActionsProps = {
  liveHref?: string;
  githubHref?: string;
  caseStudyHref?: string;
  companyHref?: string;
  statusNote?: string;
  unavailableNote?: string;
  compact?: boolean;
  /** Reverse visual order at sm+ so the primary action pins to the right edge in right-aligned rows. */
  reverse?: boolean;
  className?: string;
};

const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export function ProjectActions({
  liveHref,
  githubHref,
  caseStudyHref,
  companyHref,
  statusNote,
  unavailableNote,
  compact = false,
  reverse = false,
  className = "",
}: ProjectActionsProps) {
  const size = compact ? "min-h-11 px-3 text-[11px]" : "min-h-11 px-4 text-[11px]";
  const base = `${size} inline-flex items-center justify-center gap-2 border font-mono uppercase tracking-[0.11em] no-underline transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5`;

  return (
    <div className={className} data-project-actions>
      <div className={`flex flex-wrap items-center gap-2.5 ${reverse ? "sm:flex-row-reverse" : ""}`}>
        {liveHref && (
          <a
            href={liveHref}
            {...externalLinkProps}
            className={`${base} border-accent-text bg-accent-text text-bg hover:border-ink hover:bg-ink`}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_0_3px_var(--accent-glow)]"
            />
            Live website <span aria-hidden>↗</span>
          </a>
        )}
        {githubHref && (
          <a
            href={githubHref}
            {...externalLinkProps}
            className={`${base} border-ink bg-surface text-ink hover:border-accent hover:text-accent-text`}
          >
            GitHub <span aria-hidden>↗</span>
          </a>
        )}
        {caseStudyHref && (
          <Link
            href={caseStudyHref}
            className={`${base} border-ink bg-surface text-ink hover:border-accent hover:text-accent-text`}
          >
            Case study <span aria-hidden>→</span>
          </Link>
        )}
        {companyHref && (
          <a
            href={companyHref}
            {...externalLinkProps}
            className={`${base} border-ink bg-surface text-ink hover:border-accent hover:text-accent-text`}
          >
            Company website <span aria-hidden>↗</span>
          </a>
        )}
      </div>
      {statusNote && (
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted">
          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {statusNote}
        </p>
      )}
      {unavailableNote && (
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {unavailableNote}
        </p>
      )}
    </div>
  );
}
