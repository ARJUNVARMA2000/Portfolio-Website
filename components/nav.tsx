"use client";

import Link from "next/link";
import { SITE } from "@/content/site";

const LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-wrap items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink no-underline"
        >
          Arjun&nbsp;Varma
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="mono-label hidden !text-ink transition-colors hover:!text-accent sm:inline"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={SITE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label !text-ink transition-colors hover:!text-accent"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-ask"))}
            className="mono-label border border-ink px-2.5 py-1.5 !text-ink transition-colors hover:border-accent hover:bg-accent hover:!text-bg"
          >
            ask&nbsp;⌘K
          </button>
        </div>
      </nav>
    </header>
  );
}
