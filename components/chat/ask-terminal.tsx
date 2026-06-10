"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";

const SUGGESTIONS = [
  "What's the strongest proof he can build production ML?",
  "Walk me through the BTC early-detection model",
  "What agent systems has he shipped?",
];

function Dots() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setN((x) => (x % 3) + 1), 380);
    return () => clearInterval(id);
  }, []);
  return <span>thinking{".".repeat(n)}</span>;
}

export function AskTerminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { messages, input, handleInputChange, handleSubmit, append, isLoading, error } = useChat({
    api: "/api/chat",
  });
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Ask about Arjun"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="grid max-h-[72vh] w-[min(760px,92vw)] grid-rows-[auto_1fr_auto] overflow-hidden border border-term-line bg-term font-mono text-term-fg shadow-2xl"
      >
        {/* header */}
        <div className="flex items-center gap-2 border-b border-term-line px-3.5 py-2.5 text-[10px] uppercase tracking-[0.16em] text-term-muted">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="ml-1">arjun@portfolio — ask</span>
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
              <Dots />
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
