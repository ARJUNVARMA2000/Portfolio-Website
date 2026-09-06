"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK, DESKTOP, EASE_OUT } from "@/lib/gsap";

type SplitRevealProps = {
  as?: ElementType;
  type?: "lines" | "words" | "chars";
  trigger?: "scroll" | "mount";
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Adds a blur(6px)→0 settle on desktop only. */
  blur?: boolean;
  start?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Masked text reveal: lines/words/chars rise out of overflow-clipped line masks.
 * SSR renders plain text; under reduced motion nothing is hidden.
 */
export function SplitReveal({
  as: Tag = "div",
  type = "lines",
  trigger = "scroll",
  delay = 0,
  stagger = 0.08,
  duration = 0.9,
  blur = false,
  start = "top 88%",
  className,
  children,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(
        { motionOk: MOTION_OK, desktop: DESKTOP },
        (ctx) => {
          const { motionOk, desktop } = ctx.conditions as {
            motionOk: boolean;
            desktop: boolean;
          };
          if (!motionOk) return;
          const split = SplitText.create(el, {
            type: type === "lines" ? "lines" : `lines,${type}`,
            mask: "lines",
            autoSplit: true,
            aria: "auto",
            onSplit: (self) =>
              gsap.from(self[type], {
                yPercent: 110,
                ...(blur && desktop ? { filter: "blur(6px)" } : {}),
                duration,
                ease: EASE_OUT,
                stagger,
                delay,
                ...(trigger === "scroll"
                  ? { scrollTrigger: { trigger: el, start, once: true } }
                  : {}),
              }),
          });
          return () => split.revert();
        }
      );
    },
    { scope: ref }
  );

  // Forward the ref to React; createElement does not read ref.current.
  // eslint-disable-next-line react-hooks/refs
  return createElement(Tag, { ref, className }, children);
}
