"use client";

import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/content/site";
import { Magnetic } from "@/components/motion/magnetic";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

const LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
];

export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isCaseStudy = pathname?.startsWith("/work") ?? false;

  useGSAP(
    () => {
      const header = ref.current;
      if (!header) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        // Hide on scroll down, return on scroll up; always visible near the top.
        const yTo = gsap.quickTo(header, "yPercent", { duration: 0.5, ease: "power3.out" });
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            yTo(self.direction === 1 && self.scroll() > 120 ? -101 : 0);
            header.classList.toggle("nav-scrolled", self.scroll() > 40);
          },
        });

        // Items drift in after the hero takes the lead.
        gsap.from(header.querySelectorAll("[data-nav-item]"), {
          autoAlpha: 0,
          y: -8,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.07,
          delay: 0.6,
        });

        // Reading-progress hairline (case-study pages only).
        const bar = header.querySelector("[data-progress]");
        if (bar) {
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              ease: "none",
              scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
            }
          );
        }
      });
    },
    { scope: ref, dependencies: [isCaseStudy], revertOnUpdate: true }
  );

  return (
    <header ref={ref} className="nav-shell sticky top-0 z-40 bg-bg/90 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-wrap items-center justify-between px-5 sm:px-8">
        <Link
          data-nav-item
          href="/"
          className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink no-underline"
        >
          Arjun&nbsp;Varma
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              data-nav-item
              href={l.href}
              className="mono-label u-line hidden !text-ink sm:inline"
            >
              {l.label}
            </Link>
          ))}
          <a
            data-nav-item
            href={SITE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label u-line !text-ink"
          >
            Resume
          </a>
          <Magnetic strength={0.25}>
            <button
              data-nav-item
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-ask"))}
              className="mono-label border border-ink px-2.5 py-1.5 !text-ink transition-colors hover:border-accent hover:bg-accent hover:!text-bg"
            >
              ask&nbsp;⌘K
            </button>
          </Magnetic>
        </div>
      </nav>
      {isCaseStudy && (
        <div data-progress aria-hidden className="absolute bottom-0 left-0 h-[2px] w-full bg-accent" />
      )}
    </header>
  );
}
