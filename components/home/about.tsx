"use client";

import { useRef } from "react";
import { EDUCATION } from "@/content/site";
import { SKILLS } from "@/content/skills";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

function ScrubStatement({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        const build = contextSafe(() => {
          const split = SplitText.create(el, { type: "words", aria: "auto" });
          gsap.fromTo(
            split.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.04,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 78%",
                end: "top 30%",
                scrub: 0.6,
              },
            }
          );
        });
        document.fonts.ready.then(build);
      });
    },
    { scope: ref }
  );

  return (
    <p
      ref={ref}
      className="max-w-[26ch] font-serif text-[clamp(1.6rem,3.6vw,2.4rem)] italic leading-[1.2] tracking-[-0.015em]"
    >
      {children}
    </p>
  );
}

function SkillChip({ label }: { label: string }) {
  return (
    <span className="mx-1.5 my-1 inline-block shrink-0 border border-line bg-surface px-3 py-1.5 font-mono text-[12px] text-ink">
      {label}
    </span>
  );
}

export function About() {
  const allSkills = Object.values(SKILLS).flat();
  const mid = Math.ceil(allSkills.length / 2);
  const rows = [allSkills.slice(0, mid), allSkills.slice(mid)];

  return (
    <Section id="about" index="04" label="ABOUT">
      <ScrubStatement>
        I work on the part of machine learning that starts after the demo.
      </ScrubStatement>
      <Reveal as="p" className="mt-6 max-w-[58ch] font-sans text-[0.9375rem] leading-relaxed text-muted">
        Pipelines, evals, drift, citations — the work that keeps a model trustworthy after it
        ships. That&rsquo;s where I&rsquo;ve spent most of my time. Right now I&rsquo;m building
        agents that plan, query, and cite their sources.
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h3 className="mono-label mb-4">Education</h3>
          <div className="space-y-5">
            {EDUCATION.map((ed) => (
              <Reveal key={ed.school} className="border-t border-line pt-3">
                <p className="font-sans text-[0.9375rem] font-medium text-ink">{ed.school}</p>
                <p className="mt-0.5 font-sans text-[0.875rem] text-muted">{ed.degree}</p>
                <p className="mono-label mt-1.5">{ed.period}</p>
                <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-muted">{ed.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mono-label mb-4">
            Toolbox <span className="text-muted">— {Object.keys(SKILLS).join(" · ")}</span>
          </h3>
          <Reveal className="space-y-3 border-t border-line pt-4">
            <Marquee speed={32}>
              {rows[0].map((s) => (
                <SkillChip key={s} label={s} />
              ))}
            </Marquee>
            <Marquee speed={26} reverse>
              {rows[1].map((s) => (
                <SkillChip key={s} label={s} />
              ))}
            </Marquee>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
