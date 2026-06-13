import { SITE } from "@/content/site";
import { DrawRule } from "@/components/motion/draw-rule";
import { Marquee } from "@/components/motion/marquee";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ScrambleLabel } from "@/components/motion/scramble";

function MarqueePhrase() {
  return (
    <span className="flex items-baseline gap-6 px-3 py-3.5">
      <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted">
        Available January 2027
      </span>
      <span className="font-serif text-[15px] italic text-accent">let&rsquo;s talk</span>
      <span className="font-mono text-[12px] text-line" aria-hidden>
        —
      </span>
    </span>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="relative">
      <DrawRule className="absolute left-0 top-0" />

      {/* availability ticker — velocity-reactive */}
      <Marquee speed={50} className="border-b border-line">
        {Array.from({ length: 6 }, (_, i) => (
          <MarqueePhrase key={i} />
        ))}
      </Marquee>

      <div className="relative overflow-hidden">
        <div aria-hidden className="dot-grid dot-fade absolute inset-0" />
        <div className="relative mx-auto max-w-wrap px-5 py-[clamp(56px,8vh,96px)] sm:px-8">
          <div className="mono-label mb-8 flex items-baseline gap-3">
            <span className="text-accent">05</span>
            <ScrambleLabel text="/ CONTACT" />
          </div>

          <SplitReveal
            as="p"
            type="words"
            stagger={0.05}
            className="max-w-[24ch] font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.05] tracking-[-0.02em]"
          >
            {SITE.availability}. <em className="text-accent">Let&rsquo;s talk.</em>
          </SplitReveal>

          <Reveal delay={0.2}>
            <Magnetic strength={0.15}>
              <a
                href={`mailto:${SITE.email}`}
                className="u-line mt-8 inline-block font-mono text-[clamp(1.2rem,3vw,2rem)] text-ink"
              >
                {SITE.email}
              </a>
            </Magnetic>
          </Reveal>

          <Reveal
            childSelector="[data-meta]"
            stagger={0.06}
            className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-6"
          >
            <div className="flex gap-6">
              <a
                data-meta
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label u-line !text-ink"
              >
                GitHub
              </a>
              <a
                data-meta
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label u-line !text-ink"
              >
                LinkedIn
              </a>
              <a
                data-meta
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label u-line !text-ink"
              >
                Resume
              </a>
            </div>
            <p data-meta className="mono-label">
              Next.js · Vercel · the chat cites the case studies — press{" "}
              <span className="text-accent">⌘K</span>
            </p>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
