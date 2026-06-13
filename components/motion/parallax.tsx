"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK, DESKTOP } from "@/lib/gsap";

type ParallaxProps = {
  /** 0.15 = drifts 15% of its scroll distance against the scroll. */
  speed?: number;
  className?: string;
  children: ReactNode;
};

/** Scroll-scrubbed vertical drift. Desktop + motion-ok only. */
export function Parallax({ speed = 0.15, className, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(`${MOTION_OK} and ${DESKTOP}`, () => {
        gsap.fromTo(
          ref.current,
          { yPercent: speed * 100 },
          {
            yPercent: -speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              scrub: true,
              start: "top bottom",
              end: "bottom top",
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
