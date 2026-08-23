"use client";

import { useRef } from "react";
import Image from "next/image";
import { SITE } from "@/content/site";
import {
  gsap,
  SplitText,
  useGSAP,
  MOTION_OK,
  EASE_OUT,
  EASE_INOUT,
  SCRAMBLE_CHARS,
} from "@/lib/gsap";

const CONTACT = [
  { label: "Email", href: `mailto:${SITE.email}` },
  { label: "GitHub", href: SITE.github },
  { label: "LinkedIn", href: SITE.linkedin },
  { label: "Resume", href: SITE.resume },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const root = ref.current;
      if (!root || !contextSafe) return;
      const q = gsap.utils.selector(root);

      gsap.matchMedia().add(MOTION_OK, () => {
        // Hidden states live in JS only — reduced-motion/no-JS users get the full page.
        gsap.set(
          q("[data-hero-role], [data-hero-loc], [data-hero-tag], [data-hero-contact] a, [data-hero-cap]"),
          { autoAlpha: 0 }
        );
        gsap.set(q("[data-hero-cred]"), { autoAlpha: 0, y: 12 });
        gsap.set(q("h1"), { autoAlpha: 0 });
        gsap.set(q("[data-hero-lede]"), { autoAlpha: 0 });
        gsap.set(q("[data-hero-frame]"), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(q("[data-hero-img]"), { scale: 1.18 });

        const build = contextSafe(() => {
          const h1 = q("h1")[0];
          const lede = q("[data-hero-lede]")[0];
          if (!h1 || !lede) return;

          const h1Split = SplitText.create(h1, { type: "chars", mask: "chars", aria: "auto" });
          const ledeSplit = SplitText.create(lede, { type: "lines", mask: "lines", aria: "auto" });

          const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });

          // 1 — mono role line decodes; availability tag flickers in like a cursor.
          tl.set(q("[data-hero-role]"), { autoAlpha: 1 })
            .to(q("[data-hero-role]"), {
              duration: 0.9,
              scrambleText: {
                text: "Data Scientist / ML Engineer",
                chars: SCRAMBLE_CHARS,
                speed: 0.8,
              },
            })
            .to(q("[data-hero-loc]"), { autoAlpha: 1, duration: 0.4 }, 0.3)
            .to(
              q("[data-hero-tag]"),
              { keyframes: [{ autoAlpha: 1 }, { autoAlpha: 0.35 }, { autoAlpha: 1 }], duration: 0.5 },
              0.8
            );

          // 2 — the name: characters rise out of their masks.
          tl.set(h1, { autoAlpha: 1 }, 0.15).from(
            h1Split.chars,
            { yPercent: 110, duration: 1.0, stagger: 0.022 },
            0.15
          );

          // 3 — lede lines follow.
          tl.set(lede, { autoAlpha: 1 }, 0.45).from(
            ledeSplit.lines,
            { yPercent: 110, duration: 0.9, stagger: 0.09 },
            0.45
          );

          // 4 — portrait wipes open while the image settles to scale.
          tl.to(
            q("[data-hero-frame]"),
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE_INOUT },
            0.4
          )
            .to(q("[data-hero-img]"), { scale: 1, duration: 1.4, ease: EASE_INOUT }, 0.4)
            .to(q("[data-hero-cap]"), { autoAlpha: 1, duration: 0.5 }, 1.2)
            .to(
              q("[data-hero-cap] span:first-child"),
              {
                duration: 0.7,
                scrambleText: { text: "fig. 00 — the author", chars: SCRAMBLE_CHARS, speed: 0.8 },
              },
              1.2
            );

          // 5 — credentials, then contact links.
          tl.to(q("[data-hero-cred]"), { autoAlpha: 1, y: 0, duration: 0.7 }, 0.75).to(
            q("[data-hero-contact] a"),
            { autoAlpha: 1, duration: 0.5, stagger: 0.06 },
            0.9
          );
        });

        // Fraunces must be measurable before SplitText runs.
        document.fonts.ready.then(build);
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-wrap px-5 pb-16 pt-[clamp(48px,9vh,110px)] sm:px-8"
    >
      <div aria-hidden className="dot-grid dot-fade absolute inset-0 -z-10" />

      <p className="mono-label flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span data-hero-role className="!text-ink">
          Data Scientist / ML Engineer
        </span>
        <span data-hero-loc>— New York</span>
        <span data-hero-tag className="ml-auto text-accent">
          [ {SITE.availability.toLowerCase()} ]
        </span>
      </p>

      <div className="mt-10 grid grid-cols-1 items-start gap-x-14 gap-y-10 md:grid-cols-[1fr_minmax(200px,240px)]">
        <div>
          <h1 className="font-serif text-[clamp(2.8rem,7vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.025em]">
            Arjun Varma
          </h1>

          <p
            data-hero-lede
            className="mt-6 max-w-[44ch] font-sans text-[clamp(1.125rem,2.4vw,1.375rem)] leading-snug text-ink"
          >
            I build forecasting, decision-support, and agentic systems — from data pipelines
            and model evaluation through deployed products.
          </p>

          <p
            data-hero-cred
            className="mt-5 max-w-[58ch] font-sans text-[1rem] leading-relaxed text-muted"
          >
            Data science intern at <strong className="font-medium text-ink">Novo Nordisk</strong>,
            working on propensity scoring, next-best engagement, and LLM decision support. M.S. in Data Science at{" "}
            <strong className="font-medium text-ink">Columbia</strong>. Before that, three years at
            ZS building production ML and healthcare analytics.
          </p>

          <div data-hero-contact className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {CONTACT.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="mono-label u-line !text-ink"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>

        <figure className="w-[200px] md:w-auto md:justify-self-end">
          <div className="border border-line bg-surface p-2">
            <div data-hero-frame className="overflow-hidden">
              <Image
                data-hero-img
                src="/images/profile.png"
                alt="Arjun Varma"
                width={1024}
                height={1536}
                priority
                sizes="(min-width: 768px) 240px, 200px"
                className="block h-auto w-full"
              />
            </div>
          </div>
          <figcaption data-hero-cap className="mono-label mt-2 flex justify-between">
            <span>fig. 00 — the author</span>
            <span>NYC</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
