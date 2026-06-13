"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK, DESKTOP, FINE_POINTER } from "@/lib/gsap";

type MagneticProps = {
  strength?: number;
  className?: string;
  children: ReactNode;
};

/** Element leans toward the cursor, snaps back elastically on leave. */
export function Magnetic({ strength = 0.3, className = "", children }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.matchMedia().add(`${MOTION_OK} and ${DESKTOP} and ${FINE_POINTER}`, () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
