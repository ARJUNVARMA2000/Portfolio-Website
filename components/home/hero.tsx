import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/content/site";
import { SplitReveal } from "@/components/motion/split-reveal";

export function Hero() {
  return (
    <section aria-label="Introduction" className="relative mx-auto max-w-wrap px-5 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-16">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-[11px] text-muted">
        <p>Data Scientist / ML Engineer <span className="hidden sm:inline">· New York</span></p>
        <p className="flex items-center gap-2 text-accent-text">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {SITE.availability}
        </p>
      </div>
      <div className="mt-7 grid grid-cols-[minmax(0,1fr)_68px] items-center gap-x-5 sm:mt-9 sm:grid-cols-[minmax(0,1fr)_136px] sm:gap-x-12">
        <SplitReveal as="h1" type="chars" trigger="mount" className="font-serif text-[clamp(2.7rem,7.6vw,5.5rem)] font-medium leading-[1] tracking-[-0.045em]">
          Arjun Varma
        </SplitReveal>
        <Image src="/images/profile.png" alt="Arjun Varma" width={1024} height={1536} priority sizes="(min-width: 640px) 136px, 68px" className="row-span-2 h-[88px] w-[68px] self-start border border-line object-cover object-top sm:h-[166px] sm:w-[136px]" />
        <p className="col-span-2 mt-5 max-w-[48ch] text-[1.125rem] leading-snug sm:col-span-1 sm:mt-6 sm:text-[1.4rem]">
          I build forecasting, decision-support, and agentic systems, from data and evaluation to deployed products.
        </p>
      </div>
      <p className="mt-5 max-w-[65ch] text-[0.9375rem] leading-relaxed text-muted">
        Data science intern at <strong className="font-medium text-ink">Novo Nordisk</strong>.
        M.S. Data Science at <strong className="font-medium text-ink">Columbia</strong>.
        Previously, three years building production ML and analytics at <strong className="font-medium text-ink">ZS</strong>.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px]">
        <Link href="/#work" className="inline-flex min-h-11 items-center gap-5 border border-ink bg-ink px-4 text-bg no-underline transition-colors hover:border-accent-text hover:bg-accent-text">
          Selected work <span aria-hidden>↓</span>
        </Link>
        <a href={SITE.resume} target="_blank" rel="noopener noreferrer" className="u-line inline-flex min-h-11 items-center">Resume ↗</a>
        <a href={`mailto:${SITE.email}`} className="u-line inline-flex min-h-11 items-center">Email</a>
        <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="u-line inline-flex min-h-11 items-center">GitHub ↗</a>
        <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="u-line inline-flex min-h-11 items-center">LinkedIn ↗</a>
      </div>
    </section>
  );
}
