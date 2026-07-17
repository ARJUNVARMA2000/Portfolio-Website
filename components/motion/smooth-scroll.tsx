"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

/** The live Lenis instance, or null under reduced motion / before hydration. */
export function useLenis() {
  return useContext(LenisContext);
}

const NAV_OFFSET = -64;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ autoRaf: false, duration: 1.1 });
    instance.on("scroll", ScrollTrigger.update);
    let active = !document.hidden;
    const tick = (time: number) => {
      if (active) instance.raf(time * 1000);
    };
    const onVisibilityChange = () => {
      active = !document.hidden;
      if (active) ScrollTrigger.refresh();
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.addEventListener("visibilitychange", onVisibilityChange);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Smooth-scroll same-page hash anchors (capture phase beats next/link's handler).
  useEffect(() => {
    if (!lenis) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement).closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const hashIdx = href.indexOf("#");
      if (hashIdx === -1) return;
      const path = href.slice(0, hashIdx);
      if (path !== "" && path !== window.location.pathname) return;
      const target = document.querySelector(href.slice(hashIdx));
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      history.pushState(null, "", href);
      lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenis]);

  // On route change: jump to top (or honor an incoming hash), then re-measure triggers.
  useEffect(() => {
    if (!lenis) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    requestAnimationFrame(() => {
      const hash = window.location.hash;
      const target = hash ? document.querySelector(hash) : null;
      if (target) {
        lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET, immediate: true });
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
    });
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
