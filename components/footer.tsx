import { SITE } from "@/content/site";
import { SplitReveal } from "@/components/motion/split-reveal";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-wrap px-5 py-10 sm:px-8 sm:py-14">
        <p className="font-mono text-[11px] text-accent-text">{SITE.availability}</p>
        <SplitReveal as="h2" type="words" className="mt-4 font-serif text-[clamp(2.3rem,5vw,3.5rem)] leading-tight tracking-[-0.02em]">Let’s talk.</SplitReveal>
        <a href={"mailto:" + SITE.email} className="u-line mt-4 inline-flex min-h-11 items-center break-all font-mono text-[clamp(1rem,3vw,1.5rem)]">{SITE.email}</a>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
          <p className="text-xs text-muted">Arjun Varma · New York</p>
          <div className="flex gap-5 font-mono text-[11px]">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="u-line inline-flex min-h-11 items-center">GitHub ↗</a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="u-line inline-flex min-h-11 items-center">LinkedIn ↗</a>
            <a href={SITE.resume} target="_blank" rel="noopener noreferrer" className="u-line inline-flex min-h-11 items-center">Resume ↗</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
