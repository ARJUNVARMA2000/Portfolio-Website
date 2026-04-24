"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
  type RefObject,
} from "react";
import { useChat } from "ai/react";

/* ─── Scramble ─────────────────────────────────────────── */

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>/";

export function Scramble({
  children,
  trigger = "hover",
  speed = 30,
  style,
}: {
  children: string;
  trigger?: "hover" | "mount";
  speed?: number;
  style?: CSSProperties;
}) {
  const [out, setOut] = useState(children);
  const raf = useRef<number | null>(null);
  const running = useRef(false);

  useEffect(() => {
    setOut(children);
  }, [children]);

  const run = useCallback(() => {
    if (running.current) return;
    running.current = true;
    let frame = 0;
    const target = children;
    const tick = () => {
      frame++;
      const progress = Math.min(1, (frame * speed) / (target.length * 60));
      const revealed = Math.floor(progress * target.length);
      let s = "";
      for (let i = 0; i < target.length; i++) {
        if (i < revealed) s += target[i];
        else if (target[i] === " ") s += " ";
        else s += POOL[Math.floor(Math.random() * POOL.length)];
      }
      setOut(s);
      if (progress < 1) raf.current = requestAnimationFrame(tick);
      else {
        running.current = false;
        setOut(target);
      }
    };
    tick();
  }, [children, speed]);

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    if (trigger !== "mount") return;
    const id = requestAnimationFrame(() => run());
    return () => cancelAnimationFrame(id);
  }, [trigger, run]);

  const bind =
    trigger === "mount"
      ? {}
      : { onMouseEnter: run, onFocus: run };

  return (
    <span style={style} {...bind}>
      {out}
    </span>
  );
}

/* ─── Magnetic hover ───────────────────────────────────── */

export function Magnetic({
  children,
  strength = 0.25,
  style,
}: {
  children: ReactNode;
  strength?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const onMove: MouseEventHandler<HTMLSpanElement> = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <span
      style={{ display: "inline-block", ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span
        ref={ref}
        style={{
          display: "inline-block",
          transition: "transform .35s cubic-bezier(.2,.9,.3,1.4)",
        }}
      >
        {children}
      </span>
    </span>
  );
}

/* ─── Cursor ring ──────────────────────────────────────── */

export function Cursor({
  scopeRef,
  color = "#111",
  size = 28,
  blend = "difference",
}: {
  scopeRef: RefObject<HTMLElement>;
  color?: string;
  size?: number;
  blend?: "difference" | "normal" | "multiply";
}) {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef({ x: -100, y: -100, tx: -100, ty: -100, s: 1, ts: 1 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    const onMove = (e: MouseEvent) => {
      const r = scope.getBoundingClientRect();
      posRef.current.tx = e.clientX - r.left;
      posRef.current.ty = e.clientY - r.top;
    };
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const t = target?.closest?.("a,button,[data-cursor='grow']");
      posRef.current.ts = t ? 2.4 : 1;
    };
    const onLeave = () => {
      posRef.current.tx = -100;
      posRef.current.ty = -100;
    };
    scope.addEventListener("mousemove", onMove);
    scope.addEventListener("mouseover", onOver);
    scope.addEventListener("mouseleave", onLeave);

    const loop = () => {
      const p = posRef.current;
      p.x += (p.tx - p.x) * 0.18;
      p.y += (p.ty - p.y) * 0.18;
      p.s += (p.ts - p.s) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${p.x - (size / 2) * p.s}px, ${
          p.y - (size / 2) * p.s
        }px) scale(${p.s})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${p.tx - 2}px, ${p.ty - 2}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      scope.removeEventListener("mousemove", onMove);
      scope.removeEventListener("mouseover", onOver);
      scope.removeEventListener("mouseleave", onLeave);
    };
  }, [scopeRef, size]);

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          borderRadius: "50%",
          border: `1.5px solid ${color}`,
          pointerEvents: "none",
          zIndex: 50,
          mixBlendMode: blend,
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: color,
          pointerEvents: "none",
          zIndex: 50,
          mixBlendMode: blend,
          willChange: "transform",
        }}
      />
    </>
  );
}

/* ─── NoteBtn ──────────────────────────────────────────── */

export function NoteBtn({
  children,
  accent,
  ink,
  href,
  onClick,
}: {
  children: ReactNode;
  accent: string;
  ink: string;
  href?: string;
  onClick?: () => void;
}) {
  const common: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    background: "transparent",
    color: ink,
    border: `1.5px solid ${ink}`,
    fontFamily: "inherit",
    fontSize: 14,
    textDecoration: "none",
    cursor: "pointer",
    borderRadius: 0,
    transition: "background .2s, color .2s, border-color .2s",
  };
  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.background = accent;
    el.style.color = "#f6efe0";
    el.style.borderColor = accent;
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.background = "transparent";
    el.style.color = ink;
    el.style.borderColor = ink;
  };

  return (
    <Magnetic strength={0.2}>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
          rel="noopener noreferrer"
          style={common}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          style={common}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {children}
        </button>
      )}
    </Magnetic>
  );
}

/* ─── Ask terminal ─────────────────────────────────────── */

export function useAskTerminal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      const tag = document.activeElement?.tagName;
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(tag || "")) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return [open, setOpen] as const;
}

function Dots() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setN((x) => (x % 3) + 1), 380);
    return () => clearInterval(id);
  }, []);
  return <span>thinking{".".repeat(n)}</span>;
}

export type TerminalTheme = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  border: string;
  mono: string;
};

export function AskTerminal({
  open,
  onClose,
  theme,
}: {
  open: boolean;
  onClose: () => void;
  theme: TerminalTheme;
}) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "grid",
        placeItems: "center",
        background: "rgba(0,0,0,.5)",
        backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(780px, 92vw)",
          maxHeight: "72vh",
          background: theme.bg,
          color: theme.fg,
          border: `1px solid ${theme.border}`,
          borderRadius: 4,
          fontFamily: theme.mono,
          boxShadow: "0 40px 80px rgba(0,0,0,.5)",
          overflow: "hidden",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderBottom: `1px solid ${theme.border}`,
            fontSize: 12,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: theme.muted,
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#ff5f56", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#ffbd2e", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#27c93f", display: "inline-block" }} />
          <span style={{ marginLeft: 10 }}>arjun@portfolio — ask</span>
          <span style={{ marginLeft: "auto", fontSize: 11 }}>esc to close</span>
        </div>
        <div ref={scrollRef} style={{ padding: 16, overflowY: "auto", lineHeight: 1.55, fontSize: 14 }}>
          <div style={{ marginBottom: 10, color: theme.muted, whiteSpace: "pre-wrap" }}>
            arjun@portfolio ~ % ask “anything about me”
          </div>
          <div style={{ marginBottom: 14, color: theme.muted, whiteSpace: "pre-wrap" }}>
            try: “what did you do at zs?” · “how do you use llms?” · “biggest shipped impact?”
          </div>
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: 10, whiteSpace: "pre-wrap" }}>
              {m.role === "user" ? (
                <span>
                  <span style={{ color: theme.accent }}>❯</span> {m.content}
                </span>
              ) : (
                <span style={{ color: theme.fg }}>{m.content}</span>
              )}
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div style={{ marginBottom: 10, color: theme.muted }}>
              <Dots />
            </div>
          )}
          {error && (
            <div style={{ marginBottom: 10, color: "#ff6b6b" }}>
              connection failed. try again.
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "10px 14px",
            borderTop: `1px solid ${theme.border}`,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <span style={{ color: theme.accent }}>❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder={isLoading ? "…" : "ask anything about Arjun"}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: theme.fg,
              fontFamily: "inherit",
              fontSize: 14,
            }}
          />
          <span style={{ color: theme.muted, fontSize: 11 }}>↵ send</span>
        </form>
      </div>
    </div>
  );
}

/* ─── Multi-agent architecture diagram ────────────────── */

export function MultiAgentDiagram({
  ink,
  accent,
  muted,
  hand,
  mono,
}: {
  ink: string;
  accent: string;
  muted: string;
  hand: string;
  mono: string;
}) {
  const agents = [
    { label: "planner", x: 10 },
    { label: "sql", x: 116 },
    { label: "validator", x: 222 },
    { label: "chart", x: 328 },
    { label: "narrator", x: 434 },
  ];
  const captions = ["plans steps", "writes SQL", "audits result", "renders viz", "narrates + cites"];

  return (
    <svg viewBox="0 0 540 280" width="100%" height={260} style={{ display: "block" }}>
      <defs>
        <marker
          id="fn-agent-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill={ink} />
        </marker>
      </defs>

      <g fill="none" stroke={ink} strokeWidth="1.5">
        <path d="M10,20 q130,-6 260,0 q-4,16 0,28 q-130,6 -260,0 q4,-16 0,-28 z" />
      </g>
      <text x="30" y="42" fontFamily={hand} fontSize="16" fill={ink}>
        user question (natural language)
      </text>

      <line x1="10" y1="96" x2="530" y2="96" stroke={accent} strokeWidth="2.5" />
      <text x="10" y="88" fontFamily={mono} fontSize="10" fill={accent}>
        message_bus  ·  {"{plan, sql, df, chart, answer, error}"}
      </text>

      {agents.map((a, i) => (
        <g key={a.label}>
          <rect x={a.x} y={110} width={96} height={58} fill="none" stroke={ink} strokeWidth="1.4" />
          <text x={a.x + 48} y={134} fontFamily={hand} fontSize="18" fill={ink} textAnchor="middle">
            {a.label}
          </text>
          <text x={a.x + 48} y={155} fontFamily={mono} fontSize="9.5" fill={muted} textAnchor="middle">
            {captions[i]}
          </text>
          <line x1={a.x + 48} y1={110} x2={a.x + 48} y2={96} stroke={ink} strokeWidth="1.4" />
          <circle cx={a.x + 48} cy={96} r="3" fill={accent} />
          <line x1={a.x + 48} y1={168} x2={a.x + 48} y2={200} stroke={ink} strokeDasharray="3 3" strokeWidth="1" />
        </g>
      ))}

      <g fill="none" stroke={ink} strokeWidth="1.4">
        <ellipse cx={270} cy={210} rx={110} ry={12} />
        <line x1="160" y1="210" x2="160" y2="240" />
        <line x1="380" y1="210" x2="380" y2="240" />
        <ellipse cx={270} cy={240} rx={110} ry={12} />
      </g>
      <text x={270} y={230} fontFamily={hand} fontSize="18" fill={ink} textAnchor="middle">
        warehouse · DuckDB · Postgres · Snowflake
      </text>

      <path
        d="M60,262 q210,-10 420,0 l-4,14 q-210,10 -420,0 z"
        fill={accent}
        fillOpacity=".15"
        stroke={accent}
        strokeWidth="1.8"
      />
      <text x={270} y={274} fontFamily={hand} fontSize="18" fill={accent} textAnchor="middle">
        cited answer  +  chart  +  replayable trace
      </text>
    </svg>
  );
}

/* ─── Trace log ───────────────────────────────────────── */

type TraceStep =
  | { t: string; c: string; code?: undefined; final?: boolean }
  | { t: string; code: string; c?: undefined; final?: boolean };

const TRACES: TraceStep[][] = [
  [
    { t: "planner", c: "need avg review scores for superhost=true vs false; check stat significance." },
    {
      t: "sql",
      code: "SELECT is_superhost, AVG(review_scores_rating) AS avg_rating,\n       COUNT(*) AS n FROM listings\nWHERE review_scores_rating IS NOT NULL\nGROUP BY is_superhost;",
    },
    { t: "db", c: "returned 2 rows · n(true)=18,402 · n(false)=26,117" },
    { t: "validator", c: "null audit OK · sample size healthy · running Welch’s t-test …" },
    {
      t: "sql",
      code: "-- significance check via python stats\nt, p = ttest_ind(super_scores, other_scores,\n                  equal_var=False)",
    },
    { t: "chart", c: "rendered: bar chart, superhost=4.89 vs other=4.61 (0–5)" },
    {
      t: "narrator",
      c: "Yes. Superhosts average 4.89 vs 4.61 (Δ=0.28, p<0.001). Source: listings.review_scores_rating × host.is_superhost.",
      final: true,
    },
  ],
  [
    { t: "planner", c: "join listings × calendar × neighbourhood; compute median price 2019 vs 2023 for entire homes." },
    {
      t: "sql",
      code: "WITH base AS (\n  SELECT neighbourhood, EXTRACT(YEAR FROM date) AS y,\n         MEDIAN(price) AS med\n  FROM calendar c JOIN listings l USING (listing_id)\n  WHERE l.room_type = 'Entire home/apt'\n    AND neighbourhood_group = 'Brooklyn'\n    AND EXTRACT(YEAR FROM date) IN (2019, 2023)\n  GROUP BY 1, 2\n)\nSELECT a.neighbourhood, a.med AS y2019, b.med AS y2023,\n       (b.med - a.med)/a.med AS pct_change\nFROM base a JOIN base b USING (neighbourhood)\nWHERE a.y = 2019 AND b.y = 2023\nORDER BY pct_change DESC;",
    },
    { t: "db", c: "returned 41 rows" },
    { t: "validator", c: "spotted 3 neighbourhoods with <20 listings — flagged low-confidence" },
    { t: "chart", c: "rendered: horizontal bar chart, top 10 neighbourhoods by % change" },
    {
      t: "narrator",
      c: "Biggest jumps: Bushwick (+38%), East Williamsburg (+34%), Bed-Stuy (+31%). Three low-n neighbourhoods excluded.",
      final: true,
    },
  ],
  [
    { t: "planner", c: "haversine filter around Union Sq (40.7359, -73.9911), radius=1mi, room_type private, order by price." },
    {
      t: "sql",
      code: "SELECT name, price, latitude, longitude,\n       haversine(40.7359,-73.9911, latitude, longitude) AS d_mi\nFROM listings\nWHERE room_type = 'Private room'\n  AND availability_365 > 30\nHAVING d_mi <= 1\nORDER BY price ASC\nLIMIT 10;",
    },
    { t: "validator", c: "dropped 2 rows with price=0 (data error)" },
    { t: "chart", c: "rendered: map pins, cheapest=$42/night, 0.3mi south." },
    {
      t: "narrator",
      c: "Cheapest viable private room is $42/night, 0.3mi south of Union Sq. Caveats: excluded rows with price=0 or <30 available nights.",
      final: true,
    },
  ],
  [
    { t: "planner", c: "entire homes only · scatter log(price) × number_of_reviews · compute Spearman ρ." },
    {
      t: "sql",
      code: "SELECT price, number_of_reviews\nFROM listings\nWHERE room_type = 'Entire home/apt'\n  AND price BETWEEN 30 AND 2000;",
    },
    { t: "db", c: "returned 44,119 rows" },
    { t: "validator", c: "clipped top 1% tail to reduce leverage" },
    { t: "chart", c: "rendered: scatter with loess fit, ρ = −0.18" },
    {
      t: "narrator",
      c: "Weakly negative: cheaper homes get more reviews (ρ≈−0.18). Effect is small; don’t price on this alone.",
      final: true,
    },
  ],
];

export function TraceLog({
  q,
  idx,
  accent,
  rule,
  mono,
}: {
  q: string;
  idx: number;
  accent: string;
  rule: string;
  mono: string;
}) {
  const steps = TRACES[idx];
  return (
    <div
      style={{
        background: "#1b1a16",
        color: "#f6efe0",
        fontFamily: mono,
        fontSize: 12,
        lineHeight: 1.65,
        border: `1.5px solid ${rule}`,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid #2b2720",
          display: "flex",
          gap: 8,
          alignItems: "center",
          background: "#0f0d0a",
          color: "#9a9284",
          fontSize: 11,
          letterSpacing: ".14em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#ff5f56" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#ffbd2e" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#27c93f" }} />
        <span style={{ marginLeft: 10 }}>agent.trace · {idx + 1}/4</span>
      </div>
      <div style={{ padding: "12px 14px", maxHeight: 320, overflowY: "auto" }}>
        <div style={{ color: accent, marginBottom: 8 }}>❯ {q}</div>
        {steps.map((step, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <span
              style={{
                display: "inline-block",
                minWidth: 72,
                color: step.final ? "#1b1a16" : "#f6efe0",
                background: step.final ? accent : "transparent",
                border: `1px solid ${step.final ? accent : "#3a3328"}`,
                fontSize: 10,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                padding: "1px 7px",
                marginRight: 10,
                textAlign: "center",
              }}
            >
              {step.t}
            </span>
            {step.code ? (
              <pre
                style={{
                  margin: "6px 0 0 0",
                  padding: "10px 12px",
                  background: "#0f0d0a",
                  border: "1px solid #2b2720",
                  color: "#e4d9bf",
                  whiteSpace: "pre-wrap",
                  fontSize: 12,
                  lineHeight: 1.55,
                }}
              >
                {step.code}
              </pre>
            ) : (
              <span style={{ color: step.final ? "#f6efe0" : "#cfc6ae" }}>{step.c}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
