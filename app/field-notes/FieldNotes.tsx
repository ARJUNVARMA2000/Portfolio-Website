"use client";

import React, { useRef, useState, type CSSProperties } from "react";
import {
  AskTerminal,
  Cursor,
  NoteBtn,
  Scramble,
  useAskTerminal,
} from "./parts";
import { EXPERIENCE, PROJECTS, SKILLS, type Experience } from "./data";

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
          padding: mobile ? "20px 20px 14px" : "28px 56px 16px 120px",
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

        <div style={{ display: "flex", gap: 14, alignItems: "center", fontFamily: mono, fontSize: mobile ? 10 : 12 }}>
          <span style={{ color: MUTED }}>updated 2026-04-23</span>
        </div>
      </header>

      {/* hero */}
      <section
        style={{
          padding: mobile ? "28px 20px 20px" : "44px 64px 24px 120px",
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
            ~ hi, I&apos;m —
          </div>
          <h1
            style={{
              fontFamily: serif,
              fontSize: mobile ? 64 : 140,
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

          <div
            style={{
              marginTop: 24,
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

          <div style={{ display: "flex", gap: 14, marginTop: 22, fontFamily: sans, fontSize: 13, flexWrap: "wrap" }}>
            <NoteBtn onClick={() => setAskOpen(true)} accent={ACCENT} ink={INK}>
              ~/ask me anything
            </NoteBtn>
            <NoteBtn href="mailto:av3342@columbia.edu" accent={ACCENT} ink={INK}>
              email →
            </NoteBtn>
            <NoteBtn href="https://github.com/ARJUNVARMA2000" accent={ACCENT} ink={INK}>
              github →
            </NoteBtn>
            <NoteBtn href="https://www.linkedin.com/in/varma-arjun/" accent={ACCENT} ink={INK}>
              linkedin →
            </NoteBtn>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/profile.jpg"
              alt="Arjun"
              style={{
                width: "100%",
                aspectRatio: "1/1.05",
                objectFit: "cover",
                objectPosition: "center top",
                filter: "sepia(.18) contrast(1.03)",
                display: "block",
              }}
            />
            <div style={{ fontFamily: hand, fontSize: 22, color: INK, marginTop: 10, textAlign: "center" }}>
              Morningside — Spring &apos;26
            </div>
          </div>

          <div
            style={{
              marginTop: 22,
              fontFamily: hand,
              fontSize: 22,
              color: ACCENT,
              transform: "rotate(-1.5deg)",
              lineHeight: 1.25,
              maxWidth: 260,
            }}
          >
            <span style={{ fontSize: 26 }}>p.s.</span> also hunting for <u>full-time DS / MLE</u> roles
            starting <strong>Jan ’27</strong> —
            <span style={{ display: "block", fontSize: 19, color: INK, marginTop: 2 }}>
              let&apos;s talk ↓
            </span>
          </div>
        </div>
      </section>

      {/* thesis */}
      <section
        style={{
          padding: mobile ? "24px 20px 30px" : "24px 64px 40px 120px",
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
            isn&apos;t pretty on a slide is what keeps systems alive in production. Now I&apos;m
            building agents that plan, query, and cite their own homework.
            <sup style={{ color: ACCENT }}>[1]</sup>
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
            &ldquo;measure the thing that matters, not the thing that&apos;s easy.&rdquo;
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

      <ProjectLog mobile={mobile} />

      <Trajectory mobile={mobile} />

      <Schooling mobile={mobile} />

      <Toolbox mobile={mobile} />

      <ContactForm mobile={mobile} />

      {/* footer */}
      <footer
        style={{
          padding: mobile ? "28px 20px 32px" : "36px 64px 48px 120px",
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
            let&apos;s build something.
          </div>
          <div style={{ fontFamily: serif, fontSize: 16, color: INK, marginTop: 4 }}>
            av3342@columbia.edu
          </div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 11, color: MUTED, textAlign: mobile ? "left" : "right", lineHeight: 1.7 }}>
          <div>end of notebook entry — page 12 of ∞</div>
          {!mobile && (
            <div>
              press{" "}
              <kbd
                style={{
                  padding: "1px 6px",
                  border: `1px solid ${RULE}`,
                  borderRadius: 3,
                  fontFamily: mono,
                }}
              >
                ⌘K
              </kbd>{" "}
              to ask
            </div>
          )}
        </div>
      </footer>

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

    </div>
  );
}

/* ─── Project log ──────────────────────────────────────── */

function ProjectLog({ mobile }: { mobile: boolean }) {
  const ps = PROJECTS;
  return (
    <section style={{ padding: mobile ? "32px 20px 24px" : "40px 64px 30px 120px", borderBottom: `1px dashed ${RULE}` }}>
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
          [ Log — experiments 01—{String(ps.length).padStart(2, "0")} ]
        </div>
        {!mobile && <div style={{ flex: 1, borderTop: `1px dashed ${RULE}`, transform: "translateY(-4px)" }} />}
        <div style={{ fontFamily: hand, fontSize: 22, color: INK }}>{ps.length} in the book</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: mobile ? 18 : 26 }}>
        {ps.map((p, i) => (
          <LogCard key={p.title} p={p} n={i + 1} mobile={mobile} />
        ))}
      </div>
    </section>
  );
}

function LogCard({ p, n, mobile }: { p: (typeof PROJECTS)[number]; n: number; mobile: boolean }) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const hasCase = !!p.caseStudy;
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => hasCase && setOpen((v) => !v)}
      data-cursor={hasCase ? "grow" : undefined}
      style={{
        padding: mobile ? "16px 18px" : "20px 22px",
        background: "rgba(255,255,255,.4)",
        border: `1.5px solid ${RULE}`,
        position: "relative",
        transition: "transform .25s",
        transform: hover && !open ? "translateY(-3px)" : "none",
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
            live →
          </a>
        )}
        {p.repo && (
          <a
            href={p.repo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            data-cursor="grow"
            style={{ color: INK, textDecoration: "none", borderBottom: `1.5px solid ${INK}` }}
          >
            source →
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
            {open ? "close ↑" : "read the case study ↓"}
          </span>
        )}
      </div>

      {hasCase && open && <CaseStudyDrawer cs={p.caseStudy!} />}
    </article>
  );
}

function CaseStudyDrawer({ cs }: { cs: NonNullable<(typeof PROJECTS)[number]["caseStudy"]> }) {
  const sections: Array<{ label: string; body: string; note: string }> = [
    { label: "Problem", body: cs.problem, note: "the why" },
    { label: "Challenge", body: cs.challenge, note: "what made it hard" },
    { label: "Approach", body: cs.approach, note: "how I framed it" },
    { label: "Solution", body: cs.solution, note: "what shipped" },
    { label: "Impact", body: cs.impact, note: "what it moved" },
  ];
  return (
    <div
      style={{
        marginTop: 18,
        paddingTop: 16,
        borderTop: `1px dashed ${RULE}`,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {sections.map((s) => (
        <CaseSection key={s.label} label={s.label} body={s.body} note={s.note} />
      ))}
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
    <section style={{ padding: mobile ? "32px 20px 28px" : "40px 64px 40px 120px", borderBottom: `1px dashed ${RULE}` }}>
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
          fontSize: mobile ? 32 : 48,
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
    <section style={{ padding: mobile ? "32px 20px 28px" : "40px 64px 34px 120px", borderBottom: `1px dashed ${RULE}` }}>
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

/* ─── Contact form ────────────────────────────────────── */

function ContactForm({ mobile }: { mobile: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Field Notes — message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:av3342@columbia.edu?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    fontFamily: mono,
    fontSize: 13,
    color: INK,
    background: "rgba(255,255,255,.55)",
    border: `1.5px solid ${RULE}`,
    outline: "none",
  };

  const labelStyle: CSSProperties = {
    display: "block",
    fontFamily: hand,
    fontSize: 20,
    color: ACCENT,
    marginBottom: 4,
  };

  return (
    <section
      style={{
        padding: mobile ? "32px 20px 32px" : "40px 64px 44px 120px",
        borderTop: `1px dashed ${RULE}`,
      }}
    >
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
          [ Tear-out — leave a note ]
        </div>
        {!mobile && <div style={{ flex: 1, borderTop: `1px dashed ${RULE}`, transform: "translateY(-4px)" }} />}
        <div style={{ fontFamily: hand, fontSize: 22, color: INK }}>reach out ↓</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1.2fr", gap: mobile ? 20 : 36 }}>
        <div>
          <p
            style={{
              fontFamily: serif,
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.55,
              color: INK,
              margin: 0,
              maxWidth: "38ch",
            }}
          >
            Recruiting, collaborating, or just curious about the loop?
            Send a note — I read everything.
          </p>
          <ul
            style={{
              listStyle: "none",
              margin: "18px 0 0",
              padding: 0,
              fontFamily: serif,
              fontSize: 15,
              lineHeight: 1.8,
              color: INK,
            }}
          >
            <li>
              <span style={{ fontFamily: hand, color: ACCENT, fontSize: 20, marginRight: 6 }}>→</span>
              <strong>email:</strong> av3342@columbia.edu
            </li>
            <li>
              <span style={{ fontFamily: hand, color: ACCENT, fontSize: 20, marginRight: 6 }}>→</span>
              <strong>based in:</strong> New York, NY
            </li>
          </ul>
          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <NoteBtn href="/resume.pdf" accent={ACCENT} ink={INK}>
              download resume ↓
            </NoteBtn>
            <NoteBtn href="https://www.linkedin.com/in/varma-arjun/" accent={ACCENT} ink={INK}>
              linkedin →
            </NoteBtn>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          style={{
            padding: mobile ? 18 : 22,
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
            fig. C — the postcard
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                placeholder="your name"
              />
            </div>
            <div>
              <label style={labelStyle}>email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={labelStyle}>message</label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ ...inputStyle, resize: "vertical", fontFamily: serif, fontSize: 15 }}
              placeholder="what's on your mind?"
            />
          </div>
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              type="submit"
              data-cursor="grow"
              style={{
                fontFamily: mono,
                fontSize: 12,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                padding: "10px 18px",
                cursor: "pointer",
                background: ACCENT,
                color: PAPER,
                border: `1.5px solid ${ACCENT}`,
              }}
            >
              send note →
            </button>
            {sent && (
              <span style={{ fontFamily: hand, fontSize: 20, color: "#14a058" }}>
                mail client opened — thank you!
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

/* ─── Toolbox ─────────────────────────────────────────── */

function Toolbox({ mobile }: { mobile: boolean }) {
  const categories = Object.entries(SKILLS);
  return (
    <section style={{ padding: mobile ? "32px 20px 32px" : "40px 64px 40px 120px" }}>
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
