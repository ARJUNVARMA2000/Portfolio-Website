"use client";

export function AskProjectButton() {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.currentTarget.focus();
        window.dispatchEvent(new Event("open-ask"));
      }}
      className="shrink-0 border border-ink px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent-text hover:bg-accent-text hover:text-bg"
    >
      Ask about this project
    </button>
  );
}
