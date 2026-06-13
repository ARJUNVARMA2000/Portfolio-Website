"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, EASE_INOUT } from "@/lib/gsap";

type DrawRuleProps = {
  direction?: "x" | "y";
  delay?: number;
  trigger?: "scroll" | "mount";
  className?: string;
};

/** A hairline rule that draws itself in — the site-wide motif. */
export function DrawRule({
  direction = "x",
  delay = 0,
  trigger = "scroll",
  className = "",
}: DrawRuleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(ref.current, {
          [direction === "x" ? "scaleX" : "scaleY"]: 0,
          transformOrigin: direction === "x" ? "left center" : "center top",
          duration: 1.1,
          ease: EASE_INOUT,
          delay,
          ...(trigger === "scroll"
            ? { scrollTrigger: { trigger: ref.current, start: "top 92%", once: true } }
            : {}),
        });
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={`${direction === "x" ? "h-px w-full" : "h-full w-px"} bg-line ${className}`}
    />
  );
}
