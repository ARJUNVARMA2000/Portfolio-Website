"use client";

import { useEffect, useRef, useState } from "react";

type SectionLink = { id: string; title: string };
const REDUCED = "(prefers-reduced-motion: reduce)";

export function CaseStudyNavigator({ sections }: { sections: SectionLink[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sections.length) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = window.innerWidth < 1280 ? 116 : 88;
      let next = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= marker) next = section.id;
        else break;
      }

      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        next = sections[sections.length - 1].id;
      }
      setActiveId((current) => (current === next ? current : next));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, [sections]);

  useEffect(() => {
    if (window.innerWidth >= 1280) return;
    const scroller = mobileScrollerRef.current;
    const active = scroller?.querySelector<HTMLElement>(`[data-case-nav-id="${activeId}"]`);
    if (!scroller || !active) return;
    const left = active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2;
    scroller.scrollTo({
      left: Math.max(0, left),
      behavior: window.matchMedia(REDUCED).matches ? "auto" : "smooth",
    });
  }, [activeId]);

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-14 z-30 -mx-5 self-start border-y border-line bg-bg sm:-mx-8 xl:top-20 xl:mx-0 xl:border-0 xl:bg-transparent"
    >
      <div ref={mobileScrollerRef} className="case-nav-scroll overflow-x-auto px-5 sm:px-8 xl:hidden">
        <ol className="flex w-max min-w-full items-stretch">
          {sections.map((section, index) => {
            const active = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  data-native-hash
                  data-case-nav-id={section.id}
                  aria-current={active ? "location" : undefined}
                  onClick={() => setActiveId(section.id)}
                  className={`flex min-h-12 items-center gap-2 border-r border-line px-3 font-mono text-[10px] uppercase tracking-[0.1em] no-underline transition-colors first:border-l ${active ? "bg-ink text-bg" : "text-muted hover:text-ink"}`}
                >
                  <span className={active ? "text-bg" : "text-accent-text"}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{section.title}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="hidden xl:block">
        <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">On this page</p>
        <ol className="border-l border-line">
          {sections.map((section, index) => {
            const active = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  data-native-hash
                  aria-current={active ? "location" : undefined}
                  onClick={() => setActiveId(section.id)}
                  className={`relative block border-l px-3 py-2.5 font-mono text-[10px] leading-relaxed no-underline transition-colors ${active ? "-ml-px border-accent text-ink" : "border-transparent text-muted hover:text-ink"}`}
                >
                  <span className="mr-2 text-accent-text">{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
