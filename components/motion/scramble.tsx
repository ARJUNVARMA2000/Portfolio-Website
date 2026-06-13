"use client";

import { createElement, useRef, type ElementType } from "react";
import { gsap, useGSAP, MOTION_OK, SCRAMBLE_CHARS } from "@/lib/gsap";

type ScrambleLabelProps = {
  text: string;
  as?: ElementType;
  trigger?: "scroll" | "mount";
  delay?: number;
  duration?: number;
  className?: string;
};

/**
 * Mono label that decodes like terminal output. SSR renders the real text;
 * on trigger it scrambles through ▮▯/\·01 back to itself.
 */
export function ScrambleLabel({
  text,
  as: Tag = "span",
  trigger = "scroll",
  delay = 0,
  duration = 0.9,
  className,
}: ScrambleLabelProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.to(el, {
          duration,
          delay,
          scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.8 },
          ...(trigger === "scroll"
            ? { scrollTrigger: { trigger: el, start: "top 92%", once: true } }
            : {}),
        });
      });
    },
    { scope: ref, dependencies: [text], revertOnUpdate: true }
  );

  return createElement(Tag, { ref, className }, text);
}
