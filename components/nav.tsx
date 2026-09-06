"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/content/site";
import { Magnetic } from "@/components/motion/magnetic";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

const LINKS = [
  { label: "Work", href: "/#work", index: "01" },
  { label: "Projects", href: "/#projects", index: "04" },
  { label: "Experience", href: "/#experience", index: "02" },
  { label: "About", href: "/#about", index: "05" },
];

export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState(pathname);
  const isCaseStudy = pathname?.startsWith("/work") ?? false;

  // Reset before rendering a new route so an open menu never flashes on navigation.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

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
            yTo(!isCaseStudy && self.direction === 1 && self.scroll() > 120 ? -101 : 0);
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
    <header ref={ref} className="nav-shell sticky top-0 z-40 bg-bg">
      <nav className="relative mx-auto flex h-14 max-w-wrap items-center justify-between gap-3 px-5 sm:px-8">
        <Link
          data-nav-item
          href="/"
          className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink no-underline"
        >
          Arjun&nbsp;Varma
        </Link>
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-7">
          <button
            data-nav-item
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-sections"
            onClick={() => setMobileOpen((value) => !value)}
            className="mono-label u-line inline-flex min-h-11 items-center !text-ink sm:hidden"
          >
            Sections
          </button>
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
            className="mono-label u-line hidden min-h-11 items-center !text-ink min-[360px]:inline-flex"
          >
            Resume
          </a>
          <Magnetic strength={0.25}>
            <button
              data-nav-item
              type="button"
              onClick={(event) => {
                event.currentTarget.focus();
                window.dispatchEvent(new Event("open-ask"));
              }}
              className="mono-label min-h-11 border border-ink px-2.5 py-1.5 !text-ink transition-colors hover:border-accent-text hover:bg-accent-text hover:!text-bg"
            >
              <span>ask</span><span className="hidden sm:inline">&nbsp;⌘K</span>
            </button>
          </Magnetic>
        </div>
        {mobileOpen && (
          <div
            id="mobile-sections"
            className="absolute left-5 right-5 top-[calc(100%+1px)] border border-line bg-bg p-2 shadow-xl sm:hidden"
          >
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between border-b border-line px-3 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink last:border-b-0"
              >
                <span>{link.label}</span>
                <span className="text-accent-text">{link.index}</span>
              </Link>
            ))}
            <a href={SITE.resume} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink min-[360px]:hidden">
              Resume ↗
            </a>
          </div>
        )}
      </nav>
      {isCaseStudy && (
        <div data-progress aria-hidden className="absolute bottom-0 left-0 h-[2px] w-full bg-accent-display" />
      )}
    </header>
  );
}
