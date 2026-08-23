"use client";

import { useRef } from "react";
import { EXPERIENCE } from "@/content/experience";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { gsap, useGSAP, MOTION_OK, DESKTOP } from "@/lib/gsap";

function TimelineBody() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);

      gsap.matchMedia().add(`${MOTION_OK} and ${DESKTOP}`, () => {
        // Accent rail scrubbed to section progress.
        gsap.fromTo(
          q("[data-rail-fill]"),
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 70%",
              end: "bottom 75%",
              scrub: 0.5,
            },
          }
        );

        // Checkpoint nodes fill as the rail passes them.
        q("[data-node]").forEach((node) => {
          gsap.from(node, {
            scale: 0,
            transformOrigin: "center center",
            duration: 0.45,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: node, start: "top 70%", once: true },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="relative md:pl-12">
      {/* the rail */}
      <div aria-hidden className="absolute bottom-0 left-[5px] top-0 hidden w-px bg-line md:block">
        <div data-rail-fill className="h-full w-px bg-accent" />
      </div>

      {EXPERIENCE.map((exp) => (
        <div
          key={exp.org}
          className="relative grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line py-8 last:border-b md:grid-cols-[228px_1fr]"
        >
          <span
            data-node
            aria-hidden
            className="absolute top-[42px] hidden h-[11px] w-[11px] rounded-full border border-accent bg-bg md:-left-[48px] md:block"
          >
            <span className="absolute inset-[2px] rounded-full bg-accent" />
          </span>

          <div>
            <SplitReveal as="h3" type="lines" className="font-serif text-xl tracking-[-0.01em]">
              {exp.org}
            </SplitReveal>
            <p className="mono-label mt-1.5">
              {exp.location} · {exp.period}
            </p>
            {exp.current && (
              <span className="mt-2.5 inline-block animate-pulse border border-accent px-1.5 py-px font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text [animation-duration:2.6s] motion-reduce:animate-none">
                current
              </span>
            )}
          </div>

          <div className="space-y-6">
            {exp.roles.map((role) => (
              <Reveal key={role.title} childSelector="[data-li]" stagger={0.05} start="top 90%">
                <div data-li className="flex flex-wrap items-baseline gap-x-4">
                  <h4 className="font-sans text-[0.9375rem] font-medium text-ink">{role.title}</h4>
                  <span className="font-mono text-[11px] tabular-nums text-muted">{role.period}</span>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {role.bullets.map((b, i) => (
                    <li
                      key={i}
                      data-li
                      className="flex gap-2.5 font-sans text-[0.875rem] leading-relaxed text-muted"
                    >
                      <span className="font-mono text-accent-text" aria-hidden>
                        —
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
            {exp.footnote && (
              <Reveal as="p" className="border-t border-line pt-3 font-mono text-[11px] leading-relaxed text-muted">
                {exp.footnote}
              </Reveal>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Timeline() {
  return (
    <Section id="experience" index="03" label="EXPERIENCE">
      <TimelineBody />
    </Section>
  );
}
