import Link from "next/link";
import { CASE_STUDIES } from "@/content/case-studies";

function PagerCard({
  href,
  kicker,
  title,
  align = "left",
}: {
  href: string;
  kicker: string;
  title: string;
  align?: "left" | "right";
}) {
  return (
    <div className="group relative overflow-hidden bg-surface p-5">
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-accent-soft transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100"
      />
      <Link
        href={href}
        className={`relative block no-underline ${align === "right" ? "sm:text-right" : ""}`}
      >
        <span className="mono-label">{kicker}</span>
        <span className="mt-1.5 block font-serif text-lg text-ink transition-colors group-hover:text-accent-text">
          {title}
        </span>
      </Link>
    </div>
  );
}

export function Pager({ slug }: { slug: string }) {
  const idx = CASE_STUDIES.findIndex((cs) => cs.slug === slug);
  const prev = CASE_STUDIES[idx - 1];
  const next = CASE_STUDIES[idx + 1];

  return (
    <nav
      className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2"
      aria-label="Case study navigation"
    >
      {prev ? (
        <PagerCard href={`/work/${prev.slug}`} kicker="← previous" title={prev.title} />
      ) : (
        <PagerCard href="/#work" kicker="← back" title="All work" />
      )}
      {next ? (
        <PagerCard href={`/work/${next.slug}`} kicker="next →" title={next.title} align="right" />
      ) : (
        <PagerCard href="/#work" kicker="done →" title="All work" align="right" />
      )}
    </nav>
  );
}
