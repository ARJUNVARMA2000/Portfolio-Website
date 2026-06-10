import { AGENT_COLORS } from "./agent-colors";

const AGENTS = [
  { label: "planner", caption: "plans steps", x: 10 },
  { label: "sql", caption: "writes SQL", x: 120 },
  { label: "validator", caption: "audits result", x: 230 },
  { label: "chart", caption: "renders viz", x: 340 },
  { label: "narrator", caption: "narrates + cites", x: 450 },
] as const;

const BOX_W = 100;
const MONO = "var(--font-mono)";

/** Clean SVG of the five-agent pipeline. Colors come from CSS tokens + shared agent hues. */
export function MultiAgentDiagram() {
  return (
    <svg
      viewBox="0 0 560 292"
      role="img"
      aria-label="Five-agent pipeline: planner, SQL, validator, chart, and narrator agents on a shared message bus over a pluggable warehouse"
      className="block w-full"
    >
      {/* user question */}
      <rect x="10" y="12" width="540" height="34" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
      <text x="24" y="34" fontFamily={MONO} fontSize="12" fill="var(--ink)">
        user question — natural language
      </text>
      <line x1="280" y1="46" x2="280" y2="76" stroke="var(--ink)" strokeWidth="1.2" />

      {/* message bus */}
      <line x1="10" y1="96" x2="550" y2="96" stroke="var(--accent)" strokeWidth="2" />
      <text x="10" y="88" fontFamily={MONO} fontSize="10" fill="var(--accent)">
        message_bus · {"{plan, sql, df, chart, answer, error}"}
      </text>

      {/* agents */}
      {AGENTS.map((a) => (
        <g key={a.label}>
          <line x1={a.x + BOX_W / 2} y1="96" x2={a.x + BOX_W / 2} y2="112" stroke="var(--ink)" strokeWidth="1.2" />
          <circle cx={a.x + BOX_W / 2} cy="96" r="3" fill="var(--accent)" />
          <rect x={a.x} y="112" width={BOX_W} height="58" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.2" />
          <rect x={a.x} y="112" width={BOX_W} height="3" fill={AGENT_COLORS[a.label]} />
          <text x={a.x + BOX_W / 2} y="139" fontFamily={MONO} fontSize="12" fontWeight="500" fill="var(--ink)" textAnchor="middle">
            {a.label}
          </text>
          <text x={a.x + BOX_W / 2} y="157" fontFamily={MONO} fontSize="9" fill="var(--muted)" textAnchor="middle">
            {a.caption}
          </text>
          <line
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

      {/* warehouse */}
      <rect x="60" y="200" width="440" height="36" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
      <rect x="60" y="200" width="440" height="6" fill="var(--line)" />
      <text x="280" y="225" fontFamily={MONO} fontSize="11" fill="var(--ink)" textAnchor="middle">
        warehouse · DuckDB · Postgres · Snowflake
      </text>

      {/* output */}
      <line x1="280" y1="236" x2="280" y2="254" stroke="var(--ink)" strokeWidth="1.2" />
      <rect x="60" y="254" width="440" height="30" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.4" />
      <text x="280" y="273" fontFamily={MONO} fontSize="11" fill="var(--accent)" textAnchor="middle">
        cited answer + chart + replayable trace
      </text>
    </svg>
  );
}
