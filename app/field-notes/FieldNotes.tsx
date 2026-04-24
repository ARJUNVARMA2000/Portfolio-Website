"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Cursor,
  MultiAgentDiagram,
  NoteBtn,
  Scramble,
  TraceLog,
  useAskTerminal,
} from "./parts";
import { EXPERIENCE, PROJECTS, SKILLS, type Experience } from "./data";

const AskTerminal = dynamic(() => import("./parts").then((m) => ({ default: m.AskTerminal })), { ssr: false });

const PAPER = "#f6efe0";
const INK = "#1b1a16";
const MUTED = "#6d6656";
const GRID = "#d8cfba";
const RULE = "#2a261e";
const ACCENT = "#b4531f";

const serif = `"Fraunces", "Iowan Old Style", Georgia, serif`;
const sans = `"Familjen Grotesk", "Inter", system-ui, sans-serif`;
const hand = `"Caveat", "Kalam", "Patrick Hand", cursive`;
const mono = `"JetBrains Mono", ui-monospace, Menlo, monospace`;

// fluid side-padding — matches design intent of 120px left / 64px right at ≥1440,
// shrinks gracefully down to 900 without rasterized scale().
const padL = `clamp(40px, 8vw, 120px)`;
const padR = `clamp(28px, 4vw, 64px)`;

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ marginRight: 6, verticalAlign: "-2px", display: "inline-block" }}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.92.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.23 2.75.12 3.04.73.81 1.17 1.84 1.17 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.77 1.05.77 2.12 0 1.53-.01 2.77-.01 3.14 0 .31.21.68.8.56C20.22 21.4 23.5 17.09 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

const paperBG: CSSProperties = {
  backgroundImage: `linear-gradient(to right, ${GRID} 1px, transparent 1px),
       linear-gradient(to bottom, ${GRID} 1px, transparent 1px)`,
  backgroundSize: "28px 28px",
};

export default function FieldNotes({ mobile = false }: { mobile?: boolean }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [askOpen, setAskOpen] = useAskTerminal();

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100%",
        background: PAPER,
        color: INK,
        fontFamily: serif,
        cursor: mobile ? "auto" : "none",
        ...paperBG,
      }}
    >
      {!mobile && <Cursor scopeRef={rootRef} color={RULE} size={26} blend="normal" />}

      {/* spine */}
      {!mobile && (
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 72,
          width: 2,
          background: `repeating-linear-gradient(to bottom, ${ACCENT} 0 6px, transparent 6px 12px)`,
          opacity: 0.55,
        }}
      />
      )}

      {/* header */}
      <header
        style={{
          padding: mobile ? "20px 20px 14px" : `28px clamp(24px, 3.5vw, 56px) 16px ${padL}`,
          borderBottom: `1.5px solid ${RULE}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: mobile ? "flex-end" : "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: mono,
              fontSize: mobile ? 10 : 11,
              letterSpacing: ".2em",
              color: MUTED,
              textTransform: "uppercase",
            }}
          >
            Notebook · VOL 04 · p. 01
          </div>
          <div style={{ fontFamily: hand, fontSize: mobile ? 32 : 40, color: ACCENT, marginTop: -4 }}>
            Field Notes
          </div>
        </div>

      </header>

      {/* hero */}
      <section
        style={{
          padding: mobile ? "28px 20px 20px" : `44px ${padR} 24px ${padL}`,
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "2.3fr 1fr",
          gap: mobile ? 24 : 36,
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontFamily: hand,
              fontSize: mobile ? 20 : 22,
              color: ACCENT,
              transform: "rotate(-1.5deg)",
              marginBottom: 4,
            }}
          >
            ~ hi, I’m —
          </div>
          <h1
            style={{
              fontFamily: serif,
              fontSize: mobile ? 64 : "clamp(84px, 10vw, 140px)",
              lineHeight: 0.9,
              letterSpacing: "-.035em",
              fontWeight: 500,
              margin: 0,
            }}
          >
            <Scramble trigger="mount" speed={65}>Arjun Varma</Scramble>
          </h1>
          <div
            style={{
              fontFamily: serif,
              fontSize: mobile ? 20 : 26,
              fontStyle: "italic",
              color: INK,
              marginTop: 14,
              maxWidth: "24ch",
            }}
          >
            data scientist, ML engineer,
            <span style={{ color: ACCENT }}> obsessive about the loop</span>.
          </div>

          {/* hiring stripe — highest-value signal, promoted */}
          <div
            style={{
              marginTop: 22,
              display: "inline-flex",
              alignItems: "center",
              gap: mobile ? 10 : 16,
              padding: mobile ? "10px 14px" : "12px 18px",
              borderTop: `2px solid ${ACCENT}`,
              borderBottom: `2px solid ${ACCENT}`,
              background: "rgba(180, 83, 31, .07)",
              flexWrap: "wrap",
              maxWidth: 620,
            }}
          >
            <span
              style={{
                fontFamily: mono,
                fontSize: mobile ? 10 : 11,
                letterSpacing: ".22em",
                color: ACCENT,
                textTransform: "uppercase",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              [ available · jan ’27 ]
            </span>
            <span
              style={{
                fontFamily: serif,
                fontSize: mobile ? 16 : 19,
                color: INK,
                fontStyle: "italic",
                lineHeight: 1.35,
              }}
            >
              full-time DS / MLE roles — <strong style={{ fontStyle: "normal" }}>let’s talk.</strong>
            </span>
          </div>

          <div
            style={{
              marginTop: 20,
              padding: "16px 20px",
              background: "rgba(255,255,255,.45)",
              border: `1.5px solid ${RULE}`,
              maxWidth: 620,
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: mono,
                fontSize: 10.5,
                letterSpacing: ".2em",
                color: ACCENT,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              [ currently ]
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                fontFamily: serif,
                fontSize: 16,
                lineHeight: 1.65,
                color: INK,
              }}
            >
              <li>
                <span style={{ fontFamily: hand, color: ACCENT, fontSize: 20, marginRight: 6 }}>→</span>
                Incoming <strong>Data Science Intern, Novo Nordisk</strong> (Summer ’26)
              </li>
              <li>
                <span style={{ fontFamily: hand, color: ACCENT, fontSize: 20, marginRight: 6 }}>→</span>
                M.S. Data Science, <strong>Columbia</strong> — TA-ing AI Foundations &amp; Big Data courses
              </li>
              <li>
                <span style={{ fontFamily: hand, color: ACCENT, fontSize: 20, marginRight: 6 }}>→</span>
                Building agents. Shipping Chrome extensions on weekends.
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setAskOpen(true)}
            style={{
              marginTop: 22,
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: mono,
              fontSize: 12,
              color: MUTED,
              letterSpacing: ".06em",
              textAlign: "left",
              display: "block",
            }}
          >
            press <kbd style={{ padding: "1px 6px", border: `1px solid ${RULE}`, borderRadius: 3, fontFamily: mono, fontSize: 11 }}>⌘K</kbd> to ask me anything →
          </button>

          {/* demoted quick-links — practical but subordinate to hiring stripe */}
          <div
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: mono,
              fontSize: 12,
              color: MUTED,
              flexWrap: "wrap",
            }}
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ color: INK, textDecoration: "underline", textDecorationColor: "rgba(0,0,0,.25)", textUnderlineOffset: 3 }}>
              resume
            </a>
            <span style={{ color: RULE }}>·</span>
            <a href="mailto:av3342@columbia.edu" style={{ color: INK, textDecoration: "underline", textDecorationColor: "rgba(0,0,0,.25)", textUnderlineOffset: 3 }}>
              email
            </a>
            <span style={{ color: RULE }}>·</span>
            <a href="https://www.linkedin.com/in/varma-arjun/" target="_blank" rel="noopener noreferrer" style={{ color: INK, textDecoration: "underline", textDecorationColor: "rgba(0,0,0,.25)", textUnderlineOffset: 3 }}>
              linkedin
            </a>
            <span style={{ color: RULE }}>·</span>
            <a href="https://github.com/ARJUNVARMA2000" target="_blank" rel="noopener noreferrer" style={{ color: INK, textDecoration: "underline", textDecorationColor: "rgba(0,0,0,.25)", textUnderlineOffset: 3 }}>
              github
            </a>
          </div>
        </div>

        {/* polaroid */}
        <div style={{ position: "relative", justifySelf: "center", marginTop: 10 }}>
          <div
            style={{
              background: "#fff",
              padding: "12px 12px 44px",
              boxShadow: "0 12px 28px rgba(0,0,0,.14), 0 2px 6px rgba(0,0,0,.08)",
              transform: "rotate(2.4deg)",
              width: 260,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -14,
                left: 60,
                width: 120,
                height: 26,
                background: "rgba(180, 83, 31, .35)",
                backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,.08) 0 6px, transparent 6px 12px)",
                transform: "rotate(-4deg)",
                border: "1px solid rgba(0,0,0,.08)",
              }}
            />
            <Image
              src="/images/profile.jpg"
              alt="Arjun"
              width={260}
              height={273}
              priority
              sizes="260px"
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "1/1.05",
                objectFit: "cover",
                objectPosition: "center top",
                filter: "sepia(.18) contrast(1.03)",
                display: "block",
              }}
            />
            <div style={{ fontFamily: hand, fontSize: 22, color: INK, marginTop: 10, textAlign: "center" }}>
              Morningside — Spring ’26
            </div>
          </div>
        </div>
      </section>

      {/* thesis */}
      <section
        style={{
          padding: mobile ? "24px 20px 30px" : `24px ${padR} 40px ${padL}`,
          borderTop: `1px dashed ${RULE}`,
          borderBottom: `1px dashed ${RULE}`,
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 10.5,
            letterSpacing: ".22em",
            color: ACCENT,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          [ Obs. 01 ] — the thesis
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "2fr 1fr", gap: mobile ? 20 : 36 }}>
          <p style={{ fontFamily: serif, fontSize: mobile ? 18 : 22, lineHeight: 1.5, color: INK }}>
            Three-plus years working with data taught me one thing: the model is easy; the
            <em> loop</em> is the product. Pipelines, evals, drift, citations — the stuff that
            isn’t pretty on a slide is what keeps systems alive in production. Now I’m
            building agents that plan, query, and cite their own homework.
          </p>
          <aside
            style={{
              fontFamily: hand,
              fontSize: 22,
              color: INK,
              borderLeft: `3px solid ${ACCENT}`,
              paddingLeft: 14,
              lineHeight: 1.3,
            }}
          >
            “measure the thing that matters, not the thing that’s easy.”
            <div
              style={{
                fontFamily: sans,
                fontSize: 11,
                color: MUTED,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                marginTop: 8,
              }}
            >
              — pinned to my desk, since 2023
            </div>
          </aside>
        </div>
      </section>

      <AirbnbAgentFeature mobile={mobile} />

      <ProjectLog mobile={mobile} />

      <Trajectory mobile={mobile} />

      <Schooling mobile={mobile} />

      <Toolbox mobile={mobile} />

      {/* footer */}
      <footer
        style={{
          padding: mobile ? "28px 20px 32px" : `36px ${padR} 48px ${padL}`,
          borderTop: `1.5px solid ${RULE}`,
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: mobile ? "flex-start" : "baseline",
          gap: mobile ? 16 : 0,
        }}
      >
        <div>
          <div style={{ fontFamily: hand, fontSize: mobile ? 32 : 40, color: ACCENT, lineHeight: 1 }}>
            let’s build something.
          </div>
          <div style={{ fontFamily: serif, fontSize: 16, color: INK, marginTop: 4 }}>
            av3342@columbia.edu
          </div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 11, color: MUTED, textAlign: mobile ? "left" : "right", lineHeight: 1.7 }}>
          end of notebook entry — page 12 of ∞
        </div>
      </footer>

      {askOpen && (
        <AskTerminal
          open={askOpen}
          onClose={() => setAskOpen(false)}
          theme={{
            bg: "#1b1a16",
            fg: "#f6efe0",
            muted: "#9a9284",
            accent: ACCENT,
            border: "#3a3328",
            mono,
          }}
        />
      )}

    </div>
  );
}

/* ─── Airbnb Agent — Featured ────────────────────────── */

function AirbnbAgentFeature({ mobile }: { mobile: boolean }) {
  const SAMPLE_QS = [
    "Do superhosts get better review scores than other hosts?",
    "Which Brooklyn neighborhoods saw the biggest price shift 2019→2023?",
    "What’s the cheapest private room within 1mi of Union Square?",
    "How does price correlate with review volume for entire homes?",
  ];
  const [active, setActive] = useState(0);

  return (
    <section style={{ padding: mobile ? "32px 20px 32px" : `44px ${padR} 44px ${padL}`, borderBottom: `1px dashed ${RULE}` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
        <span
          style={{
            fontFamily: mono,
            fontSize: 10.5,
            letterSpacing: ".22em",
            color: ACCENT,
            textTransform: "uppercase",
          }}
        >
          [ Exp. 01 — featured ]
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.25fr 1fr", gap: mobile ? 24 : 36 }}>
        {/* LEFT */}
        <div>
          <h3
            style={{
              fontFamily: serif,
              fontSize: mobile ? 34 : "clamp(40px, 4.5vw, 60px)",
              lineHeight: 0.98,
              letterSpacing: "-.02em",
              fontWeight: 500,
              margin: 0,
            }}
          >
            <Scramble trigger="hover" speed={55}>A drop-in data analyst for any database.</Scramble>
          </h3>
          <div
            style={{
              fontFamily: sans,
              fontSize: 13,
              color: MUTED,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            Agentic AI · Columbia · 2026
          </div>
          <p
            style={{
              fontFamily: serif,
              fontSize: 19,
              lineHeight: 1.55,
              color: INK,
              marginTop: 16,
              maxWidth: "50ch",
            }}
          >
            Ask a question in English. A multi-agent system plans the work, writes SQL, validates the result,
            renders a chart, and narrates the answer with citations back to the source rows. Built on the NYC
            Airbnb corpus, designed to plug into any warehouse.
          </p>

          <figure
            style={{
              margin: "22px 0 0",
              padding: 18,
              background: "rgba(255,255,255,.45)",
              border: `1.5px solid ${RULE}`,
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: hand,
                fontSize: 22,
                color: ACCENT,
                position: "absolute",
                top: -14,
                left: 18,
                background: PAPER,
                padding: "0 8px",
              }}
            >
              fig. A — multi-agent architecture
            </div>
            <MultiAgentDiagram ink={INK} accent={ACCENT} muted={MUTED} hand={hand} mono={mono} />
            <figcaption style={{ fontFamily: hand, fontSize: 18, color: INK, marginTop: 4 }}>
              five agents, typed message bus, every step auditable.
            </figcaption>
          </figure>

          <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 14 : 20 }}>
            <div style={{ padding: "14px 16px", background: "rgba(255,255,255,.35)", border: `1.2px solid ${RULE}` }}>
              <div style={{ fontFamily: hand, fontSize: 22, color: ACCENT, lineHeight: 1 }}>
                tools &amp; contracts
              </div>
              <ul
                style={{
                  listStyle: "none",
                  margin: "10px 0 0",
                  padding: 0,
                  fontFamily: mono,
                  fontSize: 11.5,
                  lineHeight: 1.85,
                  color: INK,
                }}
              >
                <li><span style={{ color: ACCENT }}>db.schema</span>() → Table[]</li>
                <li><span style={{ color: ACCENT }}>db.query</span>(sql) → DataFrame</li>
                <li><span style={{ color: ACCENT }}>df.describe</span>(df) → Stats</li>
                <li><span style={{ color: ACCENT }}>plot.auto</span>(df, intent) → PNG</li>
                <li><span style={{ color: ACCENT }}>web.search</span>(q) → Link[]</li>
              </ul>
            </div>
            <div style={{ padding: "14px 16px", background: "rgba(255,255,255,.35)", border: `1.2px solid ${RULE}` }}>
              <div style={{ fontFamily: hand, fontSize: 22, color: ACCENT, lineHeight: 1 }}>guards &amp; evals</div>
              <ul
                style={{
                  listStyle: "none",
                  margin: "10px 0 0",
                  padding: 0,
                  fontFamily: mono,
                  fontSize: 11.5,
                  lineHeight: 1.85,
                  color: INK,
                }}
              >
                <li>→ SQL dry-run + row-count sanity</li>
                <li>→ null / type audit pre-plot</li>
                <li>→ self-critique on mismatched intents</li>
                <li>→ retry on tool error (×3, backoff)</li>
                <li>→ golden Q/A regression suite</li>
              </ul>
            </div>
          </div>

          <figure style={{ margin: "22px 0 0" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
              <div style={{ fontFamily: hand, fontSize: 22, color: ACCENT }}>fig. B — sample trace</div>
              <div style={{ flex: 1, borderTop: `1px dashed ${RULE}`, transform: "translateY(-4px)" }} />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {SAMPLE_QS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  data-cursor="grow"
                  style={{
                    fontFamily: sans,
                    fontSize: 12,
                    padding: "4px 10px",
                    cursor: "pointer",
                    background: i === active ? ACCENT : "transparent",
                    color: i === active ? PAPER : INK,
                    border: `1.2px solid ${i === active ? ACCENT : INK}`,
                  }}
                >
                  Q{i + 1}
                </button>
              ))}
              <span style={{ fontFamily: hand, fontSize: 18, color: MUTED, marginLeft: 4 }}>
                ↳ try a question
              </span>
            </div>
            <TraceLog q={SAMPLE_QS[active]} idx={active} accent={ACCENT} rule={RULE} mono={mono} />
          </figure>
        </div>

        {/* RIGHT */}
        <div>
          <div
            style={{
              padding: "14px 16px",
              background: "rgba(255,255,255,.35)",
              border: `1.2px solid ${RULE}`,
            }}
          >
            <div style={{ fontFamily: hand, fontSize: 24, color: ACCENT, lineHeight: 1 }}>at a glance</div>
            <ul
              style={{
                listStyle: "none",
                margin: "10px 0 0",
                padding: 0,
                fontFamily: serif,
                fontSize: 15,
                lineHeight: 1.7,
                color: INK,
              }}
            >
              {[
                "five specialized agents on a typed message bus",
                "planner decomposes → SQL agent writes → validator audits",
                "chart agent renders, narrator cites every number",
                "pluggable warehouse adapters: DuckDB · Postgres · Snowflake",
                "regression evals + per-query latency / cost breakdown",
              ].map((b) => (
                <li key={b}>
                  <span style={{ fontFamily: hand, color: ACCENT, fontSize: 20, marginRight: 6 }}>→</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <NoteBtn
              href="https://github.com/Agentic-AI-Project-Columbia/airbnb-data-analyst-agent"
              accent={ACCENT}
              ink={INK}
            >
              <GitHubIcon />GitHub →
            </NoteBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Project log ──────────────────────────────────────── */

function ProjectLog({ mobile }: { mobile: boolean }) {
  const rest = PROJECTS.slice(1);
  const primary = rest.filter((p) => !p.secondary);
  const secondary = rest.filter((p) => p.secondary);
  const primaryEnd = primary.length + 1; // e.g. Airbnb=01, primary 02..06
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const activeProject = activeTitle ? rest.find((p) => p.title === activeTitle) : null;
  return (
    <section style={{ padding: mobile ? "32px 20px 24px" : `40px ${padR} 30px ${padL}`, borderBottom: `1px dashed ${RULE}` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
        <div
          style={{
            fontFamily: mono,
            fontSize: 10.5,
            letterSpacing: ".22em",
            color: ACCENT,
            textTransform: "uppercase",
          }}
        >
          [ Log — experiments 02—{String(primaryEnd).padStart(2, "0")} ]
        </div>
        {!mobile && <div style={{ flex: 1, borderTop: `1px dashed ${RULE}`, transform: "translateY(-4px)" }} />}
        <div style={{ fontFamily: hand, fontSize: 22, color: INK }}>{rest.length} more in the book</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: mobile ? 18 : 26 }}>
        {primary.map((p, i) => (
          <LogCard
            key={p.title}
            p={p}
            n={i + 2}
            mobile={mobile}
            onOpenCase={p.caseStudy ? () => setActiveTitle(p.title) : undefined}
          />
        ))}
      </div>

      {secondary.length > 0 && (
        <details style={{ marginTop: mobile ? 24 : 32 }}>
          <summary
            style={{
              cursor: "pointer",
              listStyle: "none",
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: ".2em",
              color: ACCENT,
              textTransform: "uppercase",
              padding: "10px 0",
              borderTop: `1px dashed ${RULE}`,
              borderBottom: `1px dashed ${RULE}`,
            }}
          >
            + More experiments ({secondary.length}) — side quests &amp; utilities
          </summary>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
              gap: mobile ? 18 : 26,
              marginTop: 22,
            }}
          >
            {secondary.map((p, i) => (
              <LogCard
                key={p.title}
                p={p}
                n={primaryEnd + 1 + i}
                mobile={mobile}
                onOpenCase={p.caseStudy ? () => setActiveTitle(p.title) : undefined}
              />
            ))}
          </div>
        </details>
      )}

      {activeProject && activeProject.caseStudy && (
        <CaseStudyPanel project={activeProject} mobile={mobile} onClose={() => setActiveTitle(null)} />
      )}
    </section>
  );
}

function LogCard({
  p,
  n,
  mobile,
  onOpenCase,
}: {
  p: (typeof PROJECTS)[number];
  n: number;
  mobile: boolean;
  onOpenCase?: () => void;
}) {
  const [hover, setHover] = useState(false);
  const hasCase = !!onOpenCase;
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpenCase?.()}
      data-cursor={hasCase ? "grow" : undefined}
      style={{
        padding: mobile ? "16px 18px" : "20px 22px",
        background: "rgba(255,255,255,.4)",
        border: `1.5px solid ${RULE}`,
        position: "relative",
        transition: "transform .25s",
        transform: hover ? "translateY(-3px)" : "none",
        cursor: hasCase ? "pointer" : "default",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 14,
          fontFamily: hand,
          fontSize: 18,
          color: ACCENT,
          border: `1.4px solid ${ACCENT}`,
          padding: "2px 8px",
          transform: "rotate(4deg)",
          background: "rgba(246, 239, 224, .7)",
        }}
      >
        exp. {String(n).padStart(2, "0")}
      </div>

      <div
        style={{
          fontFamily: mono,
          fontSize: 10.5,
          color: MUTED,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {p.kicker} · {p.year}
      </div>
      <h4
        style={{
          fontFamily: serif,
          fontSize: 26,
          lineHeight: 1.1,
          letterSpacing: "-.01em",
          fontWeight: 500,
          maxWidth: "22ch",
          margin: 0,
        }}
      >
        {p.title}
      </h4>
      <p style={{ fontFamily: serif, fontSize: 14.5, lineHeight: 1.55, color: INK, marginTop: 10 }}>
        {p.summary}
      </p>

      {p.impactStats && p.impactStats.length > 0 && (
        <div
          style={{
            marginTop: 14,
            paddingTop: 12,
            paddingBottom: 12,
            borderTop: `1.2px dashed ${RULE}`,
            borderBottom: `1.2px dashed ${RULE}`,
            display: "flex",
            gap: mobile ? 14 : 22,
            flexWrap: "wrap",
          }}
        >
          {p.impactStats.map((s) => (
            <div key={s.label} style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: serif,
                  fontSize: 22,
                  lineHeight: 1,
                  color: ACCENT,
                  fontWeight: 500,
                  letterSpacing: "-.01em",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 10,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: MUTED,
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {p.tech.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: mono,
              fontSize: 10.5,
              padding: "2px 8px",
              border: `1.1px solid ${INK}`,
              color: INK,
              background: "rgba(255,255,255,.3)",
            }}
          >
            {t.toLowerCase()}
          </span>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          display: "flex",
          gap: 14,
          alignItems: "center",
          fontFamily: sans,
          fontSize: 12,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          flexWrap: "wrap",
        }}
      >
        {p.href && (
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            data-cursor="grow"
            style={{ color: ACCENT, textDecoration: "none", borderBottom: `1.5px solid ${ACCENT}` }}
          >
            live demo →
          </a>
        )}
        {p.repo && (
          <a
            href={p.repo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            data-cursor="grow"
            style={{ color: INK, textDecoration: "none", borderBottom: `1.5px solid ${INK}`, display: "inline-flex", alignItems: "center" }}
          >
            <GitHubIcon />github →
          </a>
        )}
        {hasCase && (
          <span
            style={{
              marginLeft: "auto",
              fontFamily: hand,
              fontSize: 18,
              letterSpacing: 0,
              textTransform: "none",
              color: ACCENT,
            }}
          >
            read the case study →
          </span>
        )}
      </div>
    </article>
  );
}

function CaseStudyPanel({
  project,
  mobile,
  onClose,
}: {
  project: (typeof PROJECTS)[number];
  mobile: boolean;
  onClose: () => void;
}) {
  const cs = project.caseStudy!;
  const sections: Array<{ label: string; body: string; note: string }> = [
    { label: "Problem", body: cs.problem, note: "the why" },
    { label: "Challenge", body: cs.challenge, note: "what made it hard" },
    { label: "Approach", body: cs.approach, note: "how I framed it" },
    { label: "Solution", body: cs.solution, note: "what shipped" },
    { label: "Impact", body: cs.impact, note: "what it moved" },
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(27, 26, 22, .42)",
        backdropFilter: "blur(2px)",
        display: "flex",
        justifyContent: "flex-end",
        animation: "fn-fade-in .18s ease-out",
      }}
    >
      <aside
        role="dialog"
        aria-label={`${project.title} — case study`}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: mobile ? "100%" : "clamp(440px, 52vw, 680px)",
          height: "100%",
          background: PAPER,
          boxShadow: "-20px 0 60px rgba(0,0,0,.22)",
          overflowY: "auto",
          padding: mobile ? "24px 22px 48px" : "36px 44px 56px",
          position: "relative",
          borderLeft: `1.5px solid ${RULE}`,
          animation: "fn-slide-in .28s cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 18,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: mono,
                fontSize: 10.5,
                letterSpacing: ".22em",
                color: ACCENT,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              [ case study ] — {project.kicker} · {project.year}
            </div>
            <h3
              style={{
                fontFamily: serif,
                fontSize: mobile ? 28 : 36,
                lineHeight: 1.05,
                letterSpacing: "-.02em",
                fontWeight: 500,
                margin: 0,
              }}
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            style={{
              flexShrink: 0,
              background: "transparent",
              border: `1.4px solid ${RULE}`,
              padding: "6px 12px",
              cursor: "pointer",
              fontFamily: mono,
              fontSize: 12,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: INK,
            }}
          >
            close ✕
          </button>
        </div>

        <p style={{ fontFamily: serif, fontSize: 15.5, lineHeight: 1.6, color: INK, marginBottom: 22 }}>
          {project.summary}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            paddingTop: 18,
            borderTop: `1px dashed ${RULE}`,
          }}
        >
          {sections.map((s) => (
            <CaseSection key={s.label} label={s.label} body={s.body} note={s.note} />
          ))}
        </div>

        <div
          style={{
            marginTop: 26,
            paddingTop: 18,
            borderTop: `1px dashed ${RULE}`,
            display: "flex",
            gap: 16,
            alignItems: "center",
            fontFamily: sans,
            fontSize: 12,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            flexWrap: "wrap",
          }}
        >
          {project.href && (
            <a href={project.href} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: "none", borderBottom: `1.5px solid ${ACCENT}` }}>
              live demo →
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" style={{ color: INK, textDecoration: "none", borderBottom: `1.5px solid ${INK}`, display: "inline-flex", alignItems: "center" }}>
              <GitHubIcon />github →
            </a>
          )}
          <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 11, color: MUTED, letterSpacing: ".14em" }}>
            esc to close
          </span>
        </div>
      </aside>
    </div>
  );
}

function CaseSection({ label, body, note }: { label: string; body: string; note: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: 12, alignItems: "start" }}>
      <div>
        <div
          style={{
            fontFamily: mono,
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: ACCENT,
            borderBottom: `1.2px solid ${ACCENT}`,
            paddingBottom: 3,
            display: "inline-block",
          }}
        >
          {label}
        </div>
        <div
          style={{
            marginTop: 6,
            fontFamily: hand,
            fontSize: 16,
            lineHeight: 1.1,
            color: MUTED,
            transform: "rotate(-1.5deg)",
            transformOrigin: "top left",
          }}
        >
          — {note}
        </div>
      </div>
      <div
        style={{
          fontFamily: serif,
          fontSize: 14.5,
          lineHeight: 1.6,
          color: INK,
          whiteSpace: "pre-wrap",
        }}
      >
        {body}
      </div>
    </div>
  );
}

/* ─── Trajectory ──────────────────────────────────────── */

function Trajectory({ mobile }: { mobile: boolean }) {
  const novo: Experience & { badge: string } = {
    period: "Jun 2026 — Aug 2026",
    loc: "New York",
    role: "Data Science Intern",
    org: "Novo Nordisk",
    badge: "incoming",
    bullets: [
      "Joining the data-science group for the summer — applied ML on real healthcare/pharma problems.",
      "Focus areas: predictive modeling, feature engineering, evaluation — more to come.",
    ],
  };
  const items: Experience[] = [novo, ...EXPERIENCE];

  return (
    <section style={{ padding: mobile ? "32px 20px 28px" : `40px ${padR} 40px ${padL}`, borderBottom: `1px dashed ${RULE}` }}>
      <div
        style={{
          fontFamily: mono,
          fontSize: 10.5,
          letterSpacing: ".22em",
          color: ACCENT,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        [ Timeline — trajectory ]
      </div>
      <h3
        style={{
          fontFamily: serif,
          fontSize: mobile ? 32 : "clamp(36px, 3.5vw, 48px)",
          lineHeight: 1.05,
          letterSpacing: "-.02em",
          fontWeight: 500,
          margin: 0,
        }}
      >
        career, <em>one margin note at a time</em>
      </h3>

      <div style={{ marginTop: 28, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: mobile ? 8 : 130,
            width: 0,
            borderLeft: `2px dashed ${ACCENT}`,
          }}
        />
        {items.map((e, i) => (
          <div
            key={e.period + e.role}
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "28px 1fr" : "120px 40px 1fr",
              gap: 0,
              alignItems: "start",
              padding: mobile ? "14px 0" : "18px 0",
            }}
          >
            {!mobile && (
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 11.5,
                  color: MUTED,
                  textAlign: "right",
                  paddingRight: 12,
                  lineHeight: 1.5,
                }}
              >
                {e.period}
                <br />
                <span style={{ color: INK }}>{e.loc}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: mobile ? "flex-start" : "center", paddingTop: 4 }}>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: i === 0 ? "#14a058" : ACCENT,
                  border: `3px solid #f6efe0`,
                  boxShadow: `0 0 0 1.5px ${i === 0 ? "#14a058" : ACCENT}`,
                }}
              />
            </div>
            <div>
              {mobile && (
                <div style={{ fontFamily: mono, fontSize: 10.5, color: MUTED, marginBottom: 4, letterSpacing: ".08em" }}>
                  {e.period} · <span style={{ color: INK }}>{e.loc}</span>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                <h4 style={{ fontFamily: serif, fontSize: mobile ? 22 : 26, lineHeight: 1.1, fontWeight: 500, margin: 0 }}>
                  {e.role}
                </h4>
                <span style={{ fontFamily: hand, fontSize: mobile ? 20 : 22, color: ACCENT }}>@ {e.org}</span>
                {e.badge && (
                  <span
                    style={{
                      fontFamily: hand,
                      fontSize: 18,
                      color: e.badge === "incoming" ? "#14a058" : ACCENT,
                      border: `1.4px solid ${e.badge === "incoming" ? "#14a058" : ACCENT}`,
                      padding: "0px 8px",
                      transform: "rotate(-2deg)",
                      display: "inline-block",
                      marginLeft: 4,
                    }}
                  >
                    {e.badge}
                  </span>
                )}
              </div>
              <ul style={{ listStyle: "none", margin: "10px 0 0", padding: 0 }}>
                {e.bullets.map((b, j) => (
                  <li
                    key={j}
                    style={{
                      fontFamily: serif,
                      fontSize: mobile ? 14 : 15.5,
                      lineHeight: 1.55,
                      color: INK,
                      marginBottom: 6,
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <span style={{ fontFamily: hand, color: ACCENT, fontSize: 18 }}>→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Schooling ───────────────────────────────────────── */

function Schooling({ mobile }: { mobile: boolean }) {
  const schools = [
    {
      name: "Columbia University",
      loc: "New York, NY",
      degree: "M.S. Data Science",
      period: "Aug 2025 — Dec 2026",
      notes: [
        "TA: Business Analytics II, Hollywood &amp; Big Data",
        "Coursework: Applied ML, Agentic AI for Analytics, Statistical Inference, Probability &amp; Stats",
      ],
    },
    {
      name: "Vellore Institute of Technology",
      loc: "Vellore, India",
      degree: "B.Tech — Electronics &amp; Communication Engineering",
      period: "Jul 2018 — May 2022",
      notes: [
        "Special Achiever Award · Merit Scholarship",
      ],
    },
  ];

  return (
    <section style={{ padding: mobile ? "32px 20px 28px" : `40px ${padR} 34px ${padL}`, borderBottom: `1px dashed ${RULE}` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <div
          style={{
            fontFamily: mono,
            fontSize: 10.5,
            letterSpacing: ".22em",
            color: ACCENT,
            textTransform: "uppercase",
          }}
        >
          [ Schooling — margin notes ]
        </div>
        {!mobile && <div style={{ flex: 1, borderTop: `1px dashed ${RULE}`, transform: "translateY(-4px)" }} />}
        <div style={{ fontFamily: hand, fontSize: 22, color: INK }}>where I read the fine print</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 18 : 26 }}>
        {schools.map((s) => (
          <article
            key={s.name}
            style={{
              padding: mobile ? "16px 18px" : "20px 22px",
              background: "rgba(255,255,255,.4)",
              border: `1.5px solid ${RULE}`,
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: mono,
                fontSize: 10.5,
                color: MUTED,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              {s.period} · {s.loc}
            </div>
            <h4
              style={{
                fontFamily: serif,
                fontSize: 24,
                lineHeight: 1.15,
                letterSpacing: "-.01em",
                fontWeight: 500,
                margin: 0,
              }}
            >
              {s.name}
            </h4>
            <div
              style={{
                fontFamily: hand,
                fontSize: 22,
                color: ACCENT,
                marginTop: 4,
              }}
              dangerouslySetInnerHTML={{ __html: s.degree }}
            />
            <ul style={{ listStyle: "none", margin: "10px 0 0", padding: 0 }}>
              {s.notes.map((n, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: serif,
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: INK,
                    marginBottom: 6,
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <span style={{ fontFamily: hand, color: ACCENT, fontSize: 18 }}>→</span>
                  <span dangerouslySetInnerHTML={{ __html: n }} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── Toolbox ─────────────────────────────────────────── */

function Toolbox({ mobile }: { mobile: boolean }) {
  const categories = Object.entries(SKILLS);
  return (
    <section style={{ padding: mobile ? "32px 20px 32px" : `40px ${padR} 40px ${padL}` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div
          style={{
            fontFamily: mono,
            fontSize: 10.5,
            letterSpacing: ".22em",
            color: ACCENT,
            textTransform: "uppercase",
          }}
        >
          [ Tools on the bench ]
        </div>
        <div style={{ fontFamily: hand, fontSize: 22, color: INK }}>— what I reach for</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: mobile ? 10 : 14 }}>
        {categories.map(([cat, items]) => (
          <div
            key={cat}
            style={{
              padding: "14px 16px",
              background: "rgba(255,255,255,.4)",
              border: `1.5px solid ${RULE}`,
            }}
          >
            <div style={{ fontFamily: hand, fontSize: 26, color: ACCENT, lineHeight: 1 }}>{cat}</div>
            <ul
              style={{
                listStyle: "none",
                margin: "10px 0 0",
                padding: 0,
                fontFamily: mono,
                fontSize: 12,
                lineHeight: 1.9,
                color: INK,
              }}
            >
              {items.map((it) => (
                <li key={it} data-cursor="grow">
                  · {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
