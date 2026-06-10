import Image from "next/image";
import { PROOF, SITE } from "@/content/site";
import { Stat, FootnoteList } from "@/components/stat";

const CONTACT = [
  { label: "Email", href: `mailto:${SITE.email}` },
  { label: "GitHub", href: SITE.github },
  { label: "LinkedIn", href: SITE.linkedin },
  { label: "Resume", href: SITE.resume },
];

export function Hero() {
  return (
    <section className="mx-auto max-w-wrap px-5 pb-16 pt-[clamp(48px,9vh,110px)] sm:px-8">
      <p className="mono-label reveal reveal-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="!text-ink">Data Scientist / ML Engineer</span>
        <span>— New York</span>
        <span className="ml-auto text-accent">[ {SITE.availability.toLowerCase()} ]</span>
      </p>

      <div className="mt-10 grid grid-cols-1 items-start gap-x-14 gap-y-10 md:grid-cols-[1fr_minmax(200px,240px)]">
        <div>
          <h1 className="reveal reveal-2 font-serif text-[clamp(2.8rem,7vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.025em]">
            Arjun Varma
          </h1>

          <p className="reveal reveal-3 mt-6 max-w-[44ch] font-sans text-[clamp(1.125rem,2.4vw,1.375rem)] leading-snug text-ink">
            Data scientist building production ML and agentic systems — pipelines, evals, and answers that{" "}
            <em className="not-italic text-accent">cite their sources</em>.
          </p>

          <p className="reveal reveal-3 mt-5 max-w-[58ch] font-sans text-[1rem] leading-relaxed text-muted">
            Data Science Intern at <strong className="font-medium text-ink">Novo Nordisk</strong> (Commercial
            Data Science — Rare Disease &amp; Wegovy/Ozempic portfolios). M.S. Data Science at{" "}
            <strong className="font-medium text-ink">Columbia</strong>. Three years shipping production ML for
            Fortune-500 healthcare at ZS.
          </p>

          <div className="reveal reveal-4 mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {CONTACT.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="mono-label !text-ink underline decoration-line underline-offset-4 transition-colors hover:!text-accent hover:decoration-accent"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>

        <figure className="reveal reveal-3 w-[200px] md:w-auto md:justify-self-end">
          <div className="border border-line bg-surface p-2">
            <Image
              src="/images/profile.png"
              alt="Arjun Varma"
              width={1024}
              height={1536}
              priority
              sizes="(min-width: 768px) 240px, 200px"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mono-label mt-2 flex justify-between">
            <span>fig. 00 — the author</span>
            <span>NYC</span>
          </figcaption>
        </figure>
      </div>

      {/* proof bar */}
      <div className="reveal reveal-5 relative mt-16 border-y border-line py-8">
        <span aria-hidden className="absolute -left-1 -top-2.5 font-mono text-xs text-muted">+</span>
        <span aria-hidden className="absolute -right-1 -top-2.5 font-mono text-xs text-muted">+</span>
        <span aria-hidden className="absolute -bottom-2.5 -left-1 font-mono text-xs text-muted">+</span>
        <span aria-hidden className="absolute -bottom-2.5 -right-1 font-mono text-xs text-muted">+</span>
        <div className="mono-label mb-7 flex items-baseline gap-3">
          <span className="text-accent">01</span>
          <span>/ PROOF — every number cites its source</span>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {PROOF.map((p, i) => (
            <Stat key={p.label} value={p.value} label={p.label} fn={i + 1} />
          ))}
        </div>
        <FootnoteList items={PROOF.map((p) => p.footnote)} className="mt-8 border-t border-line pt-4" />
      </div>
    </section>
  );
}
