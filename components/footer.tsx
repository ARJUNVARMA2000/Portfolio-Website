import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-wrap px-5 py-[clamp(56px,8vh,96px)] sm:px-8">
        <div className="mono-label mb-8 flex items-baseline gap-3">
          <span className="text-accent">06</span>
          <span>/ CONTACT</span>
        </div>
        <p className="max-w-prose font-serif text-[clamp(1.5rem,3.4vw,2.2rem)] leading-tight tracking-[-0.01em]">
          {SITE.availability}. <em className="text-accent">Let&rsquo;s talk.</em>
        </p>
        <a
          href={`mailto:${SITE.email}`}
          className="mt-6 inline-block font-mono text-[clamp(1rem,2.4vw,1.35rem)] text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          {SITE.email}
        </a>
        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-6">
          <div className="flex gap-6">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="mono-label !text-ink hover:!text-accent">
              GitHub
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="mono-label !text-ink hover:!text-accent">
              LinkedIn
            </a>
            <a href={SITE.resume} target="_blank" rel="noopener noreferrer" className="mono-label !text-ink hover:!text-accent">
              Resume
            </a>
          </div>
          <p className="mono-label">
            Next.js · Vercel · the chat cites the case studies — press <span className="text-accent">⌘K</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
