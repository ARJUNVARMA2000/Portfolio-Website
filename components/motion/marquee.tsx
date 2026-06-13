"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useLenis } from "./smooth-scroll";

type MarqueeProps = {
  /** Base drift speed in px/s. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
  children: ReactNode;
};

/**
 * Infinite strip, velocity-reactive: scrolling fast accelerates it (and can flip
 * its direction). Under reduced motion the duplicate is hidden and content wraps.
 */
export function Marquee({
  speed = 40,
  reverse = false,
  className = "",
  trackClassName = "",
  children,
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const wrap = ref.current;
      if (!wrap) return;
      const track = wrap.querySelector<HTMLElement>("[data-marquee-track]");
      if (!track) return;

      gsap.matchMedia().add(MOTION_OK, () => {
        const distance = track.scrollWidth / 2;
        if (distance <= 0) return;
        const dur = distance / speed;
        const tween = reverse
          ? gsap.fromTo(
              track,
              { xPercent: -50 },
              { xPercent: 0, duration: dur, ease: "none", repeat: -1 }
            )
          : gsap.to(track, { xPercent: -50, duration: dur, ease: "none", repeat: -1 });

        const ts = gsap.quickTo(tween, "timeScale", { duration: 0.4, ease: "power2.out" });
        const onTick = () => {
          const v = lenis?.velocity ?? 0;
          ts(gsap.utils.clamp(-4, 4, 1 + v * 0.05));
        };
        gsap.ticker.add(onTick);
        return () => gsap.ticker.remove(onTick);
      });
    },
    { scope: ref, dependencies: [lenis, speed, reverse], revertOnUpdate: true }
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        data-marquee-track
        className={`flex w-max items-center whitespace-nowrap motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:whitespace-normal ${trackClassName}`}
      >
        <div className="flex shrink-0 items-center motion-reduce:flex-wrap">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center motion-reduce:hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
