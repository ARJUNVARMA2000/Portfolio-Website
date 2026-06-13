"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type CounterProps = {
  /** Display string — handles "100%", "×3", "45d", "11.4s", "250M", "$0.014", "7M+". */
  value: string;
  duration?: number;
  delay?: number;
  start?: string;
  className?: string;
};

const NUM_RE = /-?\d[\d,]*\.?\d*/;

/**
 * Count-up number. SSR renders the final string (SEO/no-JS see the real value);
 * motion users see it count from zero when scrolled into view.
 * Values with no digits render statically.
 */
export function Counter({
  value,
  duration = 1.4,
  delay = 0,
  start = "top 88%",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const match = value.match(NUM_RE);
      if (!match || match.index === undefined) return;

      const numStr = match[0];
      const prefix = value.slice(0, match.index);
      const suffix = value.slice(match.index + numStr.length);
      const hasComma = numStr.includes(",");
      const target = parseFloat(numStr.replace(/,/g, ""));
      const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
      if (!isFinite(target)) return;

      const fmt = (n: number) => {
        const s = hasComma
          ? n.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })
          : n.toFixed(decimals);
        return `${prefix}${s}${suffix}`;
      };

      gsap.matchMedia().add(MOTION_OK, () => {
        el.textContent = fmt(0);
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: target,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start, once: true },
          onUpdate: () => {
            el.textContent = fmt(proxy.v);
          },
          onComplete: () => {
            el.textContent = value;
          },
        });
      });
    },
    { scope: ref, dependencies: [value], revertOnUpdate: true }
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
