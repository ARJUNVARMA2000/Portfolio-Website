"use client";

import { useRef } from "react";
import { AGENT_COLORS } from "./agent-colors";
import { gsap, useGSAP, MOTION_OK, EASE_INOUT, SCRAMBLE_CHARS } from "@/lib/gsap";

const AGENTS = [
  { label: "planner", caption: "plans steps", x: 10 },
  { label: "sql", caption: "writes SQL", x: 120 },
  { label: "validator", caption: "audits result", x: 230 },
  { label: "chart", caption: "renders viz", x: 340 },
  { label: "narrator", caption: "narrates + cites", x: 450 },
] as const;

const BOX_W = 100;
const MONO = "var(--font-mono)";
const BUS_LABEL = "message_bus · {plan, sql, df, chart, answer, error}";

/**
 * The five-agent pipeline draws itself on scroll: strokes draw, agents land on
 * the bus, then a packet runs the pipeline once. Static SVG under reduced motion.
 */
export function MultiAgentDiagram() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);

      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.set(
          q("[data-q-rect], [data-q-stem], [data-bus], [data-agent-stem], [data-wh-conn], [data-wh-rect], [data-out-stem]"),
          { drawSVG: "0%" }
        );
        gsap.set(
          q("[data-q-text], [data-bus-label], [data-agent-text], [data-wh-top], [data-wh-text], [data-out-rect], [data-out-text], [data-packet]"),
          { autoAlpha: 0 }
        );
        gsap.set(q("[data-agent-box]"), { autoAlpha: 0, y: 8 });
        gsap.set(q("[data-agent-cap]"), { scaleX: 0, transformOrigin: "left center" });
        gsap.set(q("[data-agent-node]"), { scale: 0, transformOrigin: "center center" });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        });

        // question box, then down to the bus
        tl.to(q("[data-q-rect]"), { drawSVG: "100%", duration: 0.6, ease: EASE_INOUT })
          .to(q("[data-q-text]"), { autoAlpha: 1, duration: 0.35 }, "-=0.25")
          .to(q("[data-q-stem]"), { drawSVG: "100%", duration: 0.25 })
          .to(q("[data-bus]"), { drawSVG: "100%", duration: 0.9, ease: EASE_INOUT })
          .to(q("[data-bus-label]"), { autoAlpha: 1, duration: 0.05 }, "<0.15")
          .to(
            q("[data-bus-label]"),
            { duration: 0.8, scrambleText: { text: BUS_LABEL, chars: SCRAMBLE_CHARS, speed: 1 } },
            "<"
          );

        // agents land on the bus, staggered
        tl.addLabel("agents", "-=0.4");
        q("[data-agent]").forEach((g, i) => {
          const at = `agents+=${i * 0.12}`;
          const sub = gsap.utils.selector(g as Element);
          tl.to(sub("[data-agent-stem]"), { drawSVG: "100%", duration: 0.2 }, at)
            .to(sub("[data-agent-node]"), { scale: 1, duration: 0.3, ease: "back.out(2.5)" }, at)
            .to(sub("[data-agent-box]"), { autoAlpha: 1, y: 0, duration: 0.4 }, `${at}+=0.1`)
            .to(sub("[data-agent-cap]"), { scaleX: 1, duration: 0.35, ease: EASE_INOUT }, `${at}+=0.2`)
            .to(sub("[data-agent-text]"), { autoAlpha: 1, duration: 0.3 }, `${at}+=0.25`);
        });

        // warehouse
        tl.to(q("[data-wh-conn]"), { drawSVG: "100%", duration: 0.35, stagger: 0.06 }, "agents+=0.7")
          .to(q("[data-wh-rect]"), { drawSVG: "100%", duration: 0.5, ease: EASE_INOUT }, "-=0.2")
          .to(q("[data-wh-top]"), { autoAlpha: 1, duration: 0.3 }, "-=0.2")
          .to(q("[data-wh-text]"), { autoAlpha: 1, duration: 0.3 }, "<");

        // a packet runs the pipeline once
        const nodes = q("[data-agent-node]");
        tl.addLabel("run")
          .to(q("[data-packet]"), { autoAlpha: 1, duration: 0.15 }, "run");
        AGENTS.forEach((a, i) => {
          tl.to(q("[data-packet]"), {
            attr: { cx: a.x + BOX_W / 2 },
            duration: i === 0 ? 0.2 : 0.3,
            ease: "power1.inOut",
          });
          if (nodes[i]) {
            tl.to(nodes[i], { scale: 1.7, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut" }, "<0.1");
          }
        });
        tl.to(q("[data-packet]"), { autoAlpha: 0, duration: 0.25 });

        // cited answer lands last
        tl.to(q("[data-out-stem]"), { drawSVG: "100%", duration: 0.2 }, "-=0.1")
          .to(q("[data-out-rect]"), { autoAlpha: 1, duration: 0.4 })
          .to(q("[data-out-text]"), { autoAlpha: 1, duration: 0.4 }, "<0.15");
      });
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 560 292"
      role="img"
      aria-label="Five-agent pipeline: planner, SQL, validator, chart, and narrator agents on a shared message bus over a pluggable warehouse"
      className="block w-full"
    >
      {/* user question */}
      <rect data-q-rect x="10" y="12" width="540" height="34" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
      <text data-q-text x="24" y="34" fontFamily={MONO} fontSize="12" fill="var(--ink)">
        user question — natural language
      </text>
      <line data-q-stem x1="280" y1="46" x2="280" y2="76" stroke="var(--ink)" strokeWidth="1.2" />

      {/* message bus */}
      <line data-bus x1="10" y1="96" x2="550" y2="96" stroke="var(--accent)" strokeWidth="2" />
      <text data-bus-label x="10" y="88" fontFamily={MONO} fontSize="10" fill="var(--accent)">
        {BUS_LABEL}
      </text>

      {/* agents */}
      {AGENTS.map((a) => (
        <g key={a.label} data-agent>
          <line
            data-agent-stem
            x1={a.x + BOX_W / 2}
            y1="96"
            x2={a.x + BOX_W / 2}
            y2="112"
            stroke="var(--ink)"
            strokeWidth="1.2"
          />
          <circle data-agent-node cx={a.x + BOX_W / 2} cy="96" r="3" fill="var(--accent)" />
          <rect
            data-agent-box
            x={a.x}
            y="112"
            width={BOX_W}
            height="58"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="1.2"
          />
          <rect data-agent-cap x={a.x} y="112" width={BOX_W} height="3" fill={AGENT_COLORS[a.label]} />
          <text
            data-agent-text
            x={a.x + BOX_W / 2}
            y="139"
            fontFamily={MONO}
            fontSize="12"
            fontWeight="500"
            fill="var(--ink)"
            textAnchor="middle"
          >
            {a.label}
          </text>
          <text
            data-agent-text
            x={a.x + BOX_W / 2}
            y="157"
            fontFamily={MONO}
            fontSize="9"
            fill="var(--muted)"
            textAnchor="middle"
          >
            {a.caption}
          </text>
          <line
            data-wh-conn
            x1={a.x + BOX_W / 2}
            y1="170"
            x2={a.x + BOX_W / 2}
            y2="200"
            stroke="var(--ink)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </g>
      ))}

      {/* the packet that runs the pipeline */}
      <circle data-packet cx="10" cy="96" r="4" fill="var(--accent)" />

      {/* warehouse */}
      <rect data-wh-rect x="60" y="200" width="440" height="36" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
      <rect data-wh-top x="60" y="200" width="440" height="6" fill="var(--line)" />
      <text data-wh-text x="280" y="225" fontFamily={MONO} fontSize="11" fill="var(--ink)" textAnchor="middle">
        warehouse · DuckDB · Postgres · Snowflake
      </text>

      {/* output */}
      <line data-out-stem x1="280" y1="236" x2="280" y2="254" stroke="var(--ink)" strokeWidth="1.2" />
      <rect data-out-rect x="60" y="254" width="440" height="30" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.4" />
      <text data-out-text x="280" y="273" fontFamily={MONO} fontSize="11" fill="var(--accent)" textAnchor="middle">
        cited answer + chart + replayable trace
      </text>
    </svg>
  );
}
