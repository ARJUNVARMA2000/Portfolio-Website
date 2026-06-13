"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK, EASE_OUT } from "@/lib/gsap";

type RevealProps = {
  as?: ElementType;
  y?: number;
  delay?: number;
  duration?: number;
  /** With childSelector set, animates matching descendants as a staggered group. */
  childSelector?: string;
  stagger?: number;
  trigger?: "scroll" | "mount";
  start?: string;
  className?: string;
  children: ReactNode;
};

/** Fade+rise entrance. Hidden state is set in JS only — no-JS/reduced-motion users see everything. */
export function Reveal({
  as: Tag = "div",
  y = 28,
  delay = 0,
  duration = 0.8,
  childSelector,
  stagger = 0.08,
  trigger = "scroll",
  start = "top 88%",
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        const targets = childSelector ? el.querySelectorAll(childSelector) : el;
        if (childSelector && (targets as NodeList).length === 0) return;
        gsap.from(targets, {
          autoAlpha: 0,
          y,
          duration,
          ease: EASE_OUT,
          delay,
          ...(childSelector ? { stagger } : {}),
          ...(trigger === "scroll"
            ? { scrollTrigger: { trigger: el, start, once: true } }
            : {}),
        });
      });
    },
    { scope: ref }
  );

  return createElement(Tag, { ref, className }, children);
}
