"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/** Remounts on every navigation — enter-only page transition. */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ref.current,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "all",
            onComplete: () => ScrollTrigger.refresh(),
          }
        );
      });
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}
