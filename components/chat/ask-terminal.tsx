"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { gsap, useGSAP, SCRAMBLE_CHARS } from "@/lib/gsap";

const SUGGESTIONS = [
  "What's the strongest proof he can build production ML?",
  "Walk me through the BTC early-detection model",
  "What agent systems has he shipped?",
];

const REDUCED = "(prefers-reduced-motion: reduce)";

function Shimmer() {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia(REDUCED).matches) return;
      gsap.to(ref.current, {
        duration: 1.2,
        repeat: -1,
        repeatDelay: 0.25,
        scrambleText: { text: "thinking…", chars: SCRAMBLE_CHARS, speed: 0.5 },
      });
    },
    { scope: ref }
  );
  return <span ref={ref}>thinking…</span>;
}

type Phase = "open" | "closing" | "closed";

export function AskTerminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { messages, input, handleInputChange, handleSubmit, append, isLoading, error } = useChat({
    api: "/api/chat",
  });
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Phase machine so the exit animation can play before the DOM goes away.
  const [phase, setPhase] = useState<Phase>(open ? "open" : "closed");
  if (open && phase !== "open") setPhase("open");
  if (!open && phase === "open") setPhase("closing");
  const visible = phase !== "closed";

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
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!visible) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Ask about Arjun"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="grid max-h-[72vh] w-[min(760px,92vw)] grid-rows-[auto_1fr_auto] overflow-hidden border border-term-line bg-term font-mono text-term-fg shadow-2xl"
      >
        {/* header */}
        <div className="flex items-center gap-2 border-b border-term-line px-3.5 py-2.5 text-[10px] uppercase tracking-[0.16em] text-term-muted">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span data-term-title className="ml-1">
            arjun@portfolio — ask
          </span>
          <span className="ml-auto normal-case tracking-normal">esc to close</span>
        </div>

        {/* transcript */}
        <div ref={scrollRef} className="overflow-y-auto px-4 py-4 text-[13px] leading-relaxed">
          <p className="mb-2 text-term-muted">
            Answers come from the case studies on this site — and cite them.
          </p>
          {messages.length === 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  data-chip
                  type="button"
                  onClick={() => append({ role: "user", content: s })}
                  className="border border-term-line px-2.5 py-1 text-[11px] text-term-muted transition-colors hover:border-accent hover:text-term-fg"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className="mb-3 whitespace-pre-wrap">
              {m.role === "user" ? (
                <span>
                  <span className="text-accent">❯</span> {m.content}
                </span>
              ) : (
                <span>{m.content}</span>
              )}
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <p className="mb-3 text-term-muted">
              <Shimmer />
            </p>
          )}
          {error && (
            <p className="mb-3 text-[#e07a6a]">
              chat is temporarily unavailable — use email, GitHub, or the resume instead.
            </p>
          )}
        </div>

        {/* input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2.5 border-t border-term-line px-3.5 py-2.5">
          <span className="text-accent">❯</span>
          {input.length === 0 && <span aria-hidden className="caret-blink -mr-1" />}
          <input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder={isLoading ? "…" : "ask anything about Arjun"}
            className="flex-1 bg-transparent text-[13px] text-term-fg outline-none placeholder:text-term-muted"
          />
          <span className="text-[10px] text-term-muted">↵ send</span>
        </form>
      </div>
    </div>
  );
}
