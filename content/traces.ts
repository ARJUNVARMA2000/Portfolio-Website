export type AgentName = "planner" | "sql" | "db" | "validator" | "chart" | "narrator";

export type TraceStep = {
  agent: AgentName;
  text?: string;
  code?: string;
  status?: "ok" | "fail" | "retry";
  latencyMs?: number;
  final?: boolean;
};

export type TraceRun = {
  id: string;
  question: string;
  steps: TraceStep[];
  totalLatencyMs: number;
  costUsd: number;
};

/**
 * Recorded runs of the Airbnb Data Analyst Agent (NYC listings demo dataset).
 * Replayed client-side — no live backend involved.
 */
export const TRACE_RUNS: TraceRun[] = [
  {
    id: "superhost",
    question: "Do superhosts get better review scores than other hosts?",
    totalLatencyMs: 11400,
    costUsd: 0.014,
    steps: [
      {
        agent: "planner",
        text: "Compare avg review_scores_rating for superhosts vs non-superhosts; check statistical significance before claiming a difference.",
        latencyMs: 820,
      },
      {
        agent: "sql",
        code: "SELECT superhost_flag, AVG(review_scores_rating) AS avg_rating,\n       COUNT(*) AS n FROM listings\nWHERE review_scores_rating IS NOT NULL\nGROUP BY superhost_flag;",
        status: "fail",
        latencyMs: 1100,
      },
      {
        agent: "db",
        text: 'ERROR: column "superhost_flag" does not exist',
        status: "fail",
        latencyMs: 90,
      },
      {
        agent: "validator",
        text: "Tool error caught. Re-read schema via db.schema() — column is host_is_superhost. Retrying (attempt 1/3, backoff 0.5s).",
        status: "retry",
        latencyMs: 940,
      },
      {
        agent: "sql",
        code: "SELECT host_is_superhost, AVG(review_scores_rating) AS avg_rating,\n       COUNT(*) AS n FROM listings\nWHERE review_scores_rating IS NOT NULL\nGROUP BY host_is_superhost;",
        latencyMs: 1350,
      },
      {
        agent: "db",
        text: "returned 2 rows · n(true)=18,402 · n(false)=26,117",
        latencyMs: 160,
      },
      {
        agent: "validator",
        text: "Null audit OK · sample sizes healthy · running Welch's t-test on the two groups.",
        latencyMs: 2100,
      },
      {
        agent: "chart",
        text: "Rendered bar chart — superhost 4.89 vs other 4.61 (0–5 scale).",
        latencyMs: 1700,
      },
      {
        agent: "narrator",
        text: "Yes. Superhosts average 4.89 vs 4.61 (Δ=0.28, p<0.001, Welch's t-test). Source: listings.review_scores_rating × listings.host_is_superhost, n=44,519.",
        latencyMs: 3140,
        final: true,
      },
    ],
  },
  {
    id: "brooklyn",
    question: "Which Brooklyn neighborhoods saw the biggest price shift 2019→2023?",
    totalLatencyMs: 13900,
    costUsd: 0.019,
    steps: [
      {
        agent: "planner",
        text: "Join listings × calendar × neighbourhood; compute median price per neighbourhood for 2019 vs 2023, entire homes only; rank by % change.",
        latencyMs: 950,
      },
      {
        agent: "sql",
        code: "WITH base AS (\n  SELECT neighbourhood, EXTRACT(YEAR FROM date) AS y,\n         MEDIAN(price) AS med\n  FROM calendar c JOIN listings l USING (listing_id)\n  WHERE l.room_type = 'Entire home/apt'\n    AND neighbourhood_group = 'Brooklyn'\n    AND EXTRACT(YEAR FROM date) IN (2019, 2023)\n  GROUP BY 1, 2\n)\nSELECT a.neighbourhood, a.med AS y2019, b.med AS y2023,\n       (b.med - a.med)/a.med AS pct_change\nFROM base a JOIN base b USING (neighbourhood)\nWHERE a.y = 2019 AND b.y = 2023\nORDER BY pct_change DESC;",
        latencyMs: 2400,
      },
      {
        agent: "db",
        text: "returned 41 rows",
        latencyMs: 480,
      },
      {
        agent: "validator",
        text: "Spotted 3 neighbourhoods with <20 listings — flagged low-confidence, excluded from the headline ranking.",
        status: "retry",
        latencyMs: 2350,
      },
      {
        agent: "chart",
        text: "Rendered horizontal bar chart — top 10 neighbourhoods by % change.",
        latencyMs: 1900,
      },
      {
        agent: "narrator",
        text: "Biggest jumps: Bushwick (+38%), East Williamsburg (+34%), Bed-Stuy (+31%). Three low-n neighbourhoods excluded; full table available with confidence flags.",
        latencyMs: 3050,
        final: true,
      },
    ],
  },
  {
    id: "unionsq",
    question: "What's the cheapest private room within 1 mile of Union Square?",
    totalLatencyMs: 9800,
    costUsd: 0.011,
    steps: [
      {
        agent: "planner",
        text: "Haversine filter around Union Sq (40.7359, −73.9911), radius 1mi, room_type = private, availability > 30 nights; order by price.",
        latencyMs: 880,
      },
      {
        agent: "sql",
        code: "SELECT name, price, latitude, longitude,\n       haversine(40.7359, -73.9911, latitude, longitude) AS d_mi\nFROM listings\nWHERE room_type = 'Private room'\n  AND availability_365 > 30\nHAVING d_mi <= 1\nORDER BY price ASC\nLIMIT 10;",
        latencyMs: 1800,
      },
      {
        agent: "db",
        text: "returned 10 rows",
        latencyMs: 210,
      },
      {
        agent: "validator",
        text: "Dropped 2 rows with price=0 (data-entry error) before ranking.",
        status: "retry",
        latencyMs: 1650,
      },
      {
        agent: "chart",
        text: "Rendered map pins — cheapest pin $42/night, 0.3mi south of the square.",
        latencyMs: 1850,
      },
      {
        agent: "narrator",
        text: "Cheapest viable private room: $42/night, 0.3mi south of Union Square. Caveats: rows with price=0 or <30 available nights excluded. Source rows cited in the result table.",
        latencyMs: 2900,
        final: true,
      },
    ],
  },
];
