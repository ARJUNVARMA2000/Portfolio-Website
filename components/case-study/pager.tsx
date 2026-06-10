import Link from "next/link";
import { CASE_STUDIES } from "@/content/case-studies";

export function Pager({ slug }: { slug: string }) {
  const idx = CASE_STUDIES.findIndex((cs) => cs.slug === slug);
  const prev = CASE_STUDIES[idx - 1];
  const next = CASE_STUDIES[idx + 1];

  return (
    <nav className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2" aria-label="Case study navigation">
      <div className="bg-surface p-5">
        {prev ? (
          <Link href={`/work/${prev.slug}`} className="group block no-underline">
            <span className="mono-label">← previous</span>
            <span className="mt-1.5 block font-serif text-lg text-ink transition-colors group-hover:text-accent">
              {prev.title}
            </span>
          </Link>
        ) : (
          <Link href="/#work" className="group block no-underline">
            <span className="mono-label">← back</span>
            <span className="mt-1.5 block font-serif text-lg text-ink transition-colors group-hover:text-accent">
              All work
            </span>
          </Link>
        )}
      </div>
      <div className="bg-surface p-5 sm:text-right">
        {next ? (
          <Link href={`/work/${next.slug}`} className="group block no-underline">
            <span className="mono-label">next →</span>
            <span className="mt-1.5 block font-serif text-lg text-ink transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        ) : (
          <Link href="/#work" className="group block no-underline">
            <span className="mono-label">done →</span>
            <span className="mt-1.5 block font-serif text-lg text-ink transition-colors group-hover:text-accent">
              All work
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
