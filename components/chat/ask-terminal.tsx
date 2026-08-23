"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "ai/react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, SCRAMBLE_CHARS } from "@/lib/gsap";

const HOME_SUGGESTIONS = [
  "What's the strongest proof he can build production ML?",
  "Walk me through the BTC early-detection model",
  "What agent systems has he shipped?",
];

const SOURCE_LABELS: Record<string, string> = {
  "deuce-tennis-forecast": "DEUCE Tennis Forecast",
  "airbnb-data-analyst-agent": "Airbnb Data Analyst Agent",
  "btc-early-detection": "BTC Early Detection",
  "sunculture-transaction-intelligence": "SunCulture Transaction Intelligence",
  "filing-intelligence-rag": "Filing Intelligence RAG",
};

const REDUCED = "(prefers-reduced-motion: reduce)";
const CASE_STUDY_PATH = /^\/work\/([a-z0-9-]+)\/?$/;
const CASE_STUDY_SOURCE = /^\/work\/([a-z0-9-]+)/i;
const LINK_PATTERN =
  /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+|\/work\/[a-z0-9-]+(?:#[a-z0-9-]+)?)\)|(https?:\/\/[^\s<>()]+|\/work\/[a-z0-9-]+(?:#[a-z0-9-]+)?)/gi;

function safeHref(value: string) {
  const cleanValue = value.replace(/[.,;:!]+$/, "");
  const internalMatch = cleanValue.match(/^\/work\/([a-z0-9-]+)(#[a-z0-9-]+)?$/i);
  if (internalMatch) {
    return SOURCE_LABELS[internalMatch[1]] ? cleanValue : null;
  }
  try {
    const url = new URL(cleanValue);
    const siteCaseStudy =
      url.hostname === "arjun-varma.com" ? url.pathname.match(/^\/work\/([a-z0-9-]+)\/?$/i) : null;
    if (siteCaseStudy?.[1] && SOURCE_LABELS[siteCaseStudy[1]]) {
      return `${url.pathname.replace(/\/$/, "")}${url.hash}`;
    }
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function sourceLabel(href: string) {
  const slug = href.match(/\/work\/([a-z0-9-]+)/i)?.[1];
  return slug ? SOURCE_LABELS[slug] ?? slug.replaceAll("-", " ") : href;
}

function linkedText(
  content: string,
  onInternalNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void
): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  LINK_PATTERN.lastIndex = 0;

  while ((match = LINK_PATTERN.exec(content))) {
    if (match.index > cursor) nodes.push(content.slice(cursor, match.index));
    const rawHref = match[2] ?? match[3];
    const cleanRawHref = rawHref.replace(/[.,;:!]+$/, "");
    const href = safeHref(rawHref);
    if (!href) {
      nodes.push(match[0]);
    } else {
      const internal = href.startsWith("/");
      const label = match[1] ?? (internal ? sourceLabel(href) : cleanRawHref);
      nodes.push(
        internal ? (
          <Link
            key={`${match.index}-${href}`}
            href={href}
            onClick={(event) => onInternalNavigate(event, href)}
            className="border-b border-current text-term-fg underline-offset-4 transition-colors hover:text-accent-term"
          >
            {label}
          </Link>
        ) : (
          <a
            key={`${match.index}-${href}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-current text-term-fg underline-offset-4 transition-colors hover:text-accent-term"
          >
            {label}
          </a>
        )
      );
      const trailing = rawHref.slice(cleanRawHref.length);
      if (trailing) nodes.push(trailing);
    }
    cursor = match.index + match[0].length;
  }

  if (cursor < content.length) nodes.push(content.slice(cursor));
  return nodes;
}

function sourcesFor(content: string) {
  const sources = new Map<string, string>();
  LINK_PATTERN.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = LINK_PATTERN.exec(content))) {
    const href = safeHref(match[2] ?? match[3]);
    const slug = href?.match(CASE_STUDY_SOURCE)?.[1];
    if (href?.startsWith("/work/") && slug && SOURCE_LABELS[slug]) {
      sources.set(href, SOURCE_LABELS[slug]);
    }
  }
  return Array.from(sources, ([href, label]) => ({ href, label }));
}

function StreamingStatus({ streaming }: { streaming: boolean }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    const update = () => setElapsed(performance.now() - startedAt);
    update();
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div role="status" className="mb-3 flex items-center gap-2 text-[11px] text-term-muted">
      <span className="streaming-pixels" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </span>
      <span>{streaming ? "streaming answer" : "preparing answer"}</span>
      <span aria-hidden className="ml-auto tabular-nums">
        {(elapsed / 1_000).toFixed(1)}s
      </span>
    </div>
  );
}

type Phase = "open" | "closing" | "closed";

export function AskTerminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { messages, input, handleInputChange, handleSubmit, append, isLoading, error } = useChat({
    api: "/api/chat",
  });
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Phase machine so the exit animation can play before the DOM goes away.
  const [phase, setPhase] = useState<Phase>(open ? "open" : "closed");
  const visible = phase !== "closed";
  const currentSlug = pathname.match(CASE_STUDY_PATH)?.[1];
  const currentProject = currentSlug ? SOURCE_LABELS[currentSlug] : undefined;
  const starterPrompts = useMemo(
    () =>
      currentProject
        ? [
            `What problem did ${currentProject} solve?`,
            `What did Arjun personally build on ${currentProject}?`,
            `What is the strongest evidence from ${currentProject}?`,
          ]
        : HOME_SUGGESTIONS,
    [currentProject]
  );
  const followUps = useMemo(
    () =>
      currentProject
        ? [
            `Which design choice mattered most in ${currentProject}?`,
            `How was ${currentProject} evaluated?`,
            "Show me the most relevant related project",
          ]
        : [
            "Which project should I read first?",
            "Compare his agent systems",
            "What evidence is most relevant to an MLE role?",
          ],
    [currentProject]
  );
  const availableFollowUps = followUps.filter(
    (prompt) => !messages.some((message) => message.role === "user" && message.content === prompt)
  );
  const streaming =
    isLoading &&
    messages[messages.length - 1]?.role === "assistant" &&
    messages[messages.length - 1]?.content.length > 0;
  const handleInternalNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split("#", 2);
    if (path === pathname && !hash) event.preventDefault();
    onClose();
  };

  useEffect(() => {
    if (open) {
      setPhase("open");
    } else {
      setPhase((current) => (current === "open" ? "closing" : current));
    }
  }, [open]);

  useGSAP(
    () => {
      const backdrop = backdropRef.current;
      const panel = panelRef.current;
      if (!backdrop || !panel) return;
      const reduced = window.matchMedia(REDUCED).matches;

      if (phase === "open") {
        if (reduced) return;
        const tl = gsap.timeline();
        tl.fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: "power1.out" })
          .fromTo(
            panel,
            { autoAlpha: 0, scale: 0.97, y: 10 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" },
            "<0.05"
          )
          .to(
            panel.querySelector("[data-term-title]"),
            {
              duration: 0.6,
              scrambleText: { text: "arjun@portfolio — ask", chars: SCRAMBLE_CHARS, speed: 1 },
            },
            "<0.1"
          );
        const chips = panel.querySelectorAll("[data-chip]");
        if (chips.length) {
          tl.from(chips, { autoAlpha: 0, y: 6, duration: 0.3, stagger: 0.05 }, "<0.05");
        }
      } else if (phase === "closing") {
        if (reduced) {
          setPhase("closed");
          return;
        }
        gsap
          .timeline({ onComplete: () => setPhase("closed") })
          .to(panel, { autoAlpha: 0, scale: 0.97, y: 8, duration: 0.2, ease: "power2.in" })
          .to(backdrop, { autoAlpha: 0, duration: 0.2 }, "<0.05");
      }
    },
    { dependencies: [phase], revertOnUpdate: true }
  );

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusInput = () => {
      const input = inputRef.current;
      const active = document.activeElement;
      if (
        input &&
        (active === previousFocusRef.current || active === document.body || active === document.documentElement)
      ) {
        input.focus({ preventScroll: true });
      }
    };
    const focusFrame = window.requestAnimationFrame(focusInput);
    const focusFallback = window.setTimeout(focusInput, 250);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.clearTimeout(focusFallback);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!visible) return null;

  return (
    <div
      ref={backdropRef}
      data-lenis-prevent
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ask-terminal-title"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="grid max-h-[min(82dvh,720px)] w-[min(760px,calc(100vw-24px))] grid-rows-[auto_1fr_auto] overflow-hidden border border-term-line bg-term font-mono text-term-fg shadow-2xl"
      >
        {/* header */}
        <div className="flex items-center gap-2 border-b border-term-line px-3 py-2.5 text-[10px] uppercase tracking-[0.16em] text-term-muted sm:px-3.5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-accent-display" />
          <span id="ask-terminal-title" data-term-title className="ml-1 min-w-0 flex-1 truncate">
            arjun@portfolio — ask
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 shrink-0 border border-term-line px-2.5 py-1 normal-case tracking-normal transition-colors hover:border-accent hover:text-term-fg sm:min-h-0 sm:px-2"
            aria-label="Close portfolio chat"
          >
            close <span aria-hidden>×</span>
          </button>
        </div>

        {/* transcript */}
        <div
          ref={scrollRef}
          data-chat-transcript
          className="overflow-y-auto px-3 py-3 text-[13px] leading-relaxed [overflow-wrap:anywhere] sm:px-4 sm:py-4"
        >
          <p className="mb-2 text-term-muted">
            Answers come from the case studies on this site — and cite them.
          </p>
          {messages.length === 0 && (
            <div role="group" aria-label="Suggested questions" className="mb-3 flex flex-wrap gap-2">
              {starterPrompts.map((s) => (
                <button
                  key={s}
                  data-chip
                  type="button"
                  disabled={isLoading}
                  onClick={() => append({ role: "user", content: s })}
                  className="min-h-11 border border-term-line px-2.5 py-1.5 text-left text-[11px] text-term-muted transition-colors hover:border-accent hover:text-term-fg disabled:cursor-wait disabled:opacity-60 sm:min-h-0"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div role="log" aria-live="polite" aria-relevant="additions" aria-busy={isLoading}>
          {messages.map((m, index) => {
            const partialAssistant =
              isLoading && index === messages.length - 1 && m.role === "assistant";
            const sources = m.role === "assistant" && !partialAssistant ? sourcesFor(m.content) : [];
            return (
            <div key={m.id} data-chat-message={m.role} className="mb-3 whitespace-pre-wrap">
              {m.role === "user" ? (
                <span>
                  <span className="text-accent-term">❯</span> {m.content}
                </span>
              ) : (
                <>
                  <span>{partialAssistant ? m.content : linkedText(m.content, handleInternalNavigate)}</span>
                  {sources.length > 0 && (
                    <div role="group" className="mt-2 flex flex-wrap items-center gap-1.5 whitespace-normal" aria-label="Case-study sources">
                      <span className="mr-0.5 text-[10px] uppercase tracking-[0.12em] text-term-muted">sources</span>
                      {sources.map((source) => (
                        <Link
                          key={source.href}
                          href={source.href}
                          onClick={(event) => handleInternalNavigate(event, source.href)}
                          className="inline-flex min-h-11 items-center border border-term-line px-2 py-1 text-[10px] text-term-muted transition-colors hover:border-accent hover:text-term-fg sm:min-h-0"
                        >
                          {source.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
          })}
          </div>
          {isLoading && <StreamingStatus streaming={streaming} />}
          {!isLoading && !error && messages[messages.length - 1]?.role === "assistant" && (
            <div className="mb-3 border-t border-term-line pt-3">
              <p className="mb-2 text-[10px] uppercase tracking-[0.12em] text-term-muted">follow up</p>
              <div role="group" aria-label="Follow-up questions" className="flex flex-wrap gap-2">
                {availableFollowUps.map((prompt) => (
                  <button
                    key={prompt}
                    data-chip
                    type="button"
                    onClick={() => append({ role: "user", content: prompt })}
                    className="min-h-11 border border-term-line px-2.5 py-1.5 text-left text-[11px] text-term-muted transition-colors hover:border-accent hover:text-term-fg sm:min-h-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          {error && (
            <p role="alert" className="mb-3 text-[#e07a6a]">
              chat is temporarily unavailable — use email, GitHub, or the resume instead.
            </p>
          )}
        </div>

        {/* input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-term-line px-3 py-2.5 sm:gap-2.5 sm:px-3.5">
          <span className="text-accent-term">❯</span>
          {input.length === 0 && <span aria-hidden className="caret-blink -mr-1" />}
          <label htmlFor="ask-terminal-input" className="sr-only">Ask a question about Arjun Varma</label>
          <input
            id="ask-terminal-input"
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            enterKeyHint="send"
            placeholder={isLoading ? "…" : "ask anything about Arjun"}
            className="min-w-0 flex-1 bg-transparent text-base text-term-fg outline-none placeholder:text-term-muted sm:text-[13px]"
          />
          <button
            type="submit"
            disabled={isLoading || input.trim().length === 0}
            aria-label="Send question"
            className="min-h-11 shrink-0 border border-term-line px-2.5 py-1 text-[10px] text-term-muted transition-colors hover:border-accent hover:text-term-fg disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 sm:px-2"
          >
            send <span aria-hidden>↵</span>
          </button>
        </form>
      </div>
    </div>
  );
}
