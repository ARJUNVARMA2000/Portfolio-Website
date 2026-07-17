"use client";

import { useState } from "react";

const STAGES = [
  {
    agent: "Extractor",
    role: "multimodal evidence",
    source: "contracts · invoices · emails · screenshots",
    detail:
      "Reads uploaded text and images, then converts the evidence into validated CaseFacts rather than passing free-form reasoning downstream.",
    fields: ["contract", "performance", "breach", "exhibits"],
  },
  {
    agent: "Defendant Resolver",
    role: "entity verification",
    source: "NY DOS SODA API",
    detail:
      "Checks the defendant against New York's live corporation registry and adds the legal entity and service address to the shared record.",
    fields: ["defendant.dos_*"],
  },
  {
    agent: "Jurisdiction Checker",
    role: "legal validation",
    source: "6-document corpus · rule engine",
    detail:
      "Retrieves the relevant statutes and runs deterministic checks for the monetary cap, limitations period, venue, and damages.",
    fields: ["jurisdiction_check", "damages"],
  },
  {
    agent: "Drafter",
    role: "packet assembly",
    source: "merged CaseFacts",
    detail:
      "Finalizes the typed record, flags missing fields, and hands the validated facts to the PDF renderer for packet assembly.",
    fields: ["CaseFacts", "missing-field notes"],
  },
] as const;

const PACKET_OUTPUTS = ["statement", "demand letter", "exhibit index", "filing guide"] as const;

export function ClaimReadyHandoffInspector() {
  const [selected, setSelected] = useState(0);
  const stage = STAGES[selected];

  return (
    <div className="flex min-h-[440px] flex-col bg-surface p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">typed handoff ledger</p>
          <p className="mt-1 max-w-[45ch] text-sm leading-relaxed text-ink">
            Inspect each specialist handoff around the shared case record.
          </p>
        </div>
        <span className="shrink-0 border border-accent px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
          CaseFacts
        </span>
      </div>

      <div className="grid min-w-0 flex-1 gap-5 pt-5 md:grid-cols-[minmax(170px,0.72fr)_minmax(0,1.28fr)]">
        <div role="group" aria-label="ClaimReady specialist agents" className="relative grid min-w-0 content-start gap-2">
          <span aria-hidden className="absolute bottom-7 left-[27px] top-7 w-px bg-line" />
          {STAGES.map((item, index) => {
            const active = index === selected;
            return (
              <button
                key={item.agent}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(index)}
                className={`relative z-10 flex min-h-14 min-w-0 items-center gap-3 border px-3 py-2.5 text-left transition-[border-color,background-color,color] duration-300 ${
                  active
                    ? "border-accent bg-accent-soft text-ink"
                    : "border-line bg-bg text-muted hover:border-muted hover:text-ink"
                }`}
              >
                <span
                  aria-hidden
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[9px] ${
                    active ? "border-accent bg-accent text-bg" : "border-line bg-surface text-muted"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <strong className="block truncate font-sans text-[13px] font-medium">{item.agent}</strong>
                  <span className="block truncate font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
                    {item.role}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative flex min-h-[290px] min-w-0 flex-col overflow-hidden border border-line bg-bg p-4 sm:p-5">
          <div aria-hidden className="dot-grid absolute inset-0 opacity-45" />
          <output aria-live="polite" className="relative block">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent">
                handoff {String(selected + 1).padStart(2, "0")}
              </span>
              <span className="h-px min-w-6 flex-1 bg-accent" />
              <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">typed output</span>
            </div>
            <h4 className="mt-4 font-serif text-2xl leading-tight text-ink">{stage.agent}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{stage.detail}</p>
            <div className="mt-4 border-l-2 border-accent bg-surface px-3 py-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">evidence / tool</span>
              <p className="mt-1 font-mono text-[10px] leading-relaxed text-ink">{stage.source}</p>
            </div>
          </output>

          <div className="relative mt-auto pt-6">
            <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
              handoff payload
            </span>
            <div className="flex flex-wrap gap-1.5">
              {stage.fields.map((field) => (
                <span
                  key={field}
                  className="border border-line bg-surface px-2 py-1 font-mono text-[8px] uppercase tracking-[0.06em] text-muted"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 border border-line sm:grid-cols-4">
        {PACKET_OUTPUTS.map((document, index) => (
          <div
            key={document}
            className={`border-line px-2 py-2 text-center odd:border-r sm:border-r sm:last:border-r-0 ${
              index >= 2 ? "border-t sm:border-t-0" : ""
            }`}
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-muted">{document}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-right font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
        NYC · unpaid-services contract claims · document generation only
      </p>
    </div>
  );
}
