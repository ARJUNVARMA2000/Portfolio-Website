export type Metric = {
  value: string;
  label: string;
  provenance: string;
  kind?: "evaluation" | "contract" | "architecture" | "production" | "verification" | "corpus" | "recognition";
  /** Label local explanatory notes as notes; a link alone does not make a claim an independent evaluation. */
  source?: { label: string; href: string };
};

export type CaseStudySummary = {
  contribution: string;
  decision: string;
  result: string;
  limitation: string;
};

export type FigureKind =
  | "multi-agent"
  | "trace-replay"
  | "forecast-anatomy"
  | "deuce-screens"
  | "risk-timeline"
  | "citation-stack";

export type CaseSection = {
  id: "context" | "constraint" | "approach" | "system" | "evidence" | "impact";
  title: string;
  body: string; // markdown
  figure?: { kind: FigureKind; caption: string };
  aside?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  org: string;
  role: string;
  period: string;
  status: "production" | "live" | "shipped";
  summary: CaseStudySummary;
  metrics: Metric[];
  tech: string[];
  links: { label: string; href: string }[];
  availabilityNote?: string;
  sections: CaseSection[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "deuce-tennis-forecast",
    title: "DEUCE Tennis Forecast",
    subtitle:
      "A live ATP and WTA forecasting platform that combines surface-aware Elo, opponent-adjusted serve and return modeling, calibrated XGBoost, and tournament simulation.",
    org: "Personal",
    role: "Designed & built solo",
    period: "2026",
    status: "live",
    summary: {
      contribution: "Designed and built the modeling pipeline, live product, and scheduled delivery solo.",
      decision: "Combine tennis-specific signals with calibrated XGBoost, and evaluate chronologically so future form cannot leak into past predictions.",
      result: "Across 87,957 walk-forward matches, the ensemble reached 0.1950 ATP and 0.2017 WTA Brier scores; the product serves forecasts for both tours.",
      limitation: "The closing market remains stronger on the odds-matched subset: 0.201 Brier versus the model's 0.203. The full evaluation and that subset are different comparisons.",
    },
    metrics: [
      {
        value: "87,957",
        label: "matches in walk-forward evaluation",
        provenance: "45,831 ATP and 42,126 WTA scored matches, evaluated chronologically",
        kind: "evaluation",
        source: { label: "Evaluation methodology notes", href: "/work/deuce-tennis-forecast#evidence" },
      },
      {
        value: "0.1950",
        label: "ATP Brier score",
        provenance: "five-seed calibrated XGBoost ensemble; 69.6% walk-forward accuracy",
        kind: "evaluation",
        source: { label: "Evaluation methodology notes", href: "/work/deuce-tennis-forecast#evidence" },
      },
      {
        value: "0.2017",
        label: "WTA Brier score",
        provenance: "five-seed calibrated XGBoost ensemble; 68.5% walk-forward accuracy",
        kind: "evaluation",
        source: { label: "Evaluation methodology notes", href: "/work/deuce-tennis-forecast#evidence" },
      },
    ],
    tech: [
      "Python",
      "XGBoost",
      "Elo",
      "Markov models",
      "Monte Carlo",
      "Next.js",
      "GitHub Actions",
      "Firebase",
    ],
    links: [
      { label: "Live forecast", href: "https://deuce-forecast.web.app/" },
      { label: "GitHub", href: "https://github.com/ARJUNVARMA2000/tennis-elo" },
    ],
    availabilityNote: "Maintained product · data refreshes hourly · model retrains daily",
    sections: [
      {
        id: "context",
        title: "The problem",
        body: `A tennis forecast needs to answer more than who ranks higher. Surface, serve and return quality, recent workload, opponent style, and draw structure all change the probability of an outcome. Most public tools expose a rating or a pick; they do not show how the evidence combines or how uncertainty propagates through an entire tournament.

DEUCE turns those signals into calibrated match probabilities, tournament simulations, rankings, and player-level explanations for both ATP and WTA tours.`,
      },
      {
        id: "constraint",
        title: "The constraints",
        body: `- Tennis data arrives from several sources with different identifiers, schemas, and refresh schedules
- The same player can perform very differently across hard, clay, and grass courts
- Match history is chronological, so random train/test splits would leak future form into the past
- A useful probability must be calibrated, not merely rank the likely winner correctly
- Live forecasts need dependable refreshes, stale-data detection, and graceful fallbacks when a source fails`,
      },
      {
        id: "approach",
        title: "From signals to a probability",
        body: `The forecast is an ensemble of complementary views of a match:

1. **Surface-aware Elo** tracks player strength by court type, with cross-surface transfer when evidence is sparse
2. **Serve and return modeling** estimates point-winning probabilities after adjusting for opponent quality
3. **A point-to-match Markov model** converts point probabilities into games, sets, and match outcomes
4. **Context and style features** add rest, fatigue, head-to-head history, home advantage, and matchup tendencies
5. **A five-seed XGBoost ensemble** combines 42 features, followed by Platt calibration so a 70% forecast behaves like one over time

The interface shows the resulting probability alongside the factors that moved it, rather than presenting a black-box pick.`,
        figure: {
          kind: "forecast-anatomy",
          caption: "The forecast stack: distinct tennis signals are combined, calibrated, and then simulated through a draw.",
        },
      },
      {
        id: "system",
        title: "The product",
        body: `A scheduled pipeline refreshes and deploys match data hourly and retrains daily. Schema and freshness gates, failure alerts, recoverable snapshots, and Python/TypeScript CI catch silent upstream or serving failures before they become confident-looking forecasts. The product covers both tours through a live Match Center, tournament draws, rankings, player dossiers, style analysis, and model-versus-market diagnostics.

Monte Carlo simulation carries match probabilities through a tournament bracket, producing round-by-round advancement and title odds rather than a collection of disconnected picks.`,
        figure: {
          kind: "deuce-screens",
          caption: "Three views from the live product: current forecasts, model rankings, and player-style analysis.",
        },
      },
      {
        id: "evidence",
        title: "Evidence",
        body: `The evaluation is walk-forward: every prediction is generated using only information available before that match. The measured 2010–2026 research window covers **45,831 ATP and 42,126 WTA matches**, or **87,957** in total.

- Surface Elo scores **0.2006 ATP / 0.2114 WTA Brier**; the calibrated XGBoost ensemble improves that to **0.1950 / 0.2017**
- Walk-forward accuracy is **69.6% ATP** and **68.5% WTA**
- A published bookmaker benchmark is roughly 0.196; on DEUCE's own odds-matched subset, the closing line still leads 0.201 to 0.203 — an important boundary on the claim
- Frozen pre-match forecasts, model scorecards, and market comparisons expose evaluation rather than reducing quality to win rate alone`,
      },
      {
        id: "impact",
        title: "What shipped",
        body: `- One public product for ATP and WTA forecasts, rankings, player analysis, and tournament simulation
- A reproducible modeling pipeline with chronological evaluation, explicit calibration, and immutable pre-match records
- Hourly multi-source refreshes, daily retraining, schema/freshness gates, and automated Firebase delivery
- Transparent scorecards and market comparisons that show where the model is strong and where the market remains stronger`,
      },
    ],
  },
  {
    slug: "airbnb-data-analyst-agent",
    title: "Airbnb Data Analyst Agent",
    subtitle:
      "A reusable multi-agent analytics copilot that plans, writes, validates, charts, and narrates SQL analysis, with source-row citations and inspectable traces.",
    org: "Columbia · Agentic AI for Analytics",
    role: "Designed & built solo",
    period: "2026",
    status: "live",
    summary: {
      contribution: "Designed and built the analytics copilot solo, from warehouse tools and agent contracts to validation and answer delivery.",
      decision: "Give each agent a typed contract and put validation before narration, with a bounded retry path for failed or mismatched queries.",
      result: "A live demo answers multi-step questions with SQL, charts, source-row citations, and inspectable traces. The recorded example shows recovery from an invalid column.",
      limitation: "The citation requirement is a system contract, not a measured 100% success rate. Recorded runs demonstrate behavior on specific questions, not every possible query.",
    },
    metrics: [
      {
        value: "5",
        label: "agents on a typed message bus",
        provenance: "planner · SQL · validator · chart · narrator — every step inspectable and replayable",
        kind: "architecture",
        source: { label: "Agent architecture notes", href: "/work/airbnb-data-analyst-agent#approach" },
      },
      {
        value: "×3",
        label: "retry budget, exponential backoff",
        provenance: "validator-triggered on tool errors and intent mismatch",
        kind: "contract",
        source: { label: "Recorded example & checks", href: "/work/airbnb-data-analyst-agent#evidence" },
      },
      {
        value: "Required",
        label: "source-row citations",
        provenance: "narrator contract; not a measured citation-success rate",
        kind: "contract",
        source: { label: "Citation contract notes", href: "/work/airbnb-data-analyst-agent#evidence" },
      },
    ],
    tech: ["FastAPI", "LangChain", "DuckDB / Postgres / Snowflake", "OpenAI function calling", "matplotlib", "pytest"],
    links: [
      { label: "Live demo", href: "https://airbnb-frontend-686529012610.us-east1.run.app/" },
      { label: "GitHub", href: "https://github.com/ARJUNVARMA2000/airbnb-data-analyst-agent" },
    ],
    sections: [
      {
        id: "context",
        title: "The problem",
        body: `Analysts spend hours translating business questions into SQL, pulling data, checking it, and reformatting the answer into something a stakeholder can consume. Most LLM "text-to-SQL" demos hallucinate schema, fail silently on bad queries, or skip the last-mile steps that actually matter: a chart, a citation, a sanity check.

The live Airbnb implementation is the demonstration surface for a reusable analytics copilot: it decomposes the question, writes SQL that actually runs, validates the result before showing it, plots the data, and cites the rows it used. The same adapter contract supports DuckDB, Postgres, and Snowflake.`,
      },
      {
        id: "constraint",
        title: "The constraints",
        body: `- Text-to-SQL models hallucinate column names, misuse joins, and produce queries that run but return the wrong answer
- Single-prompt approaches have no way to recover from tool errors or mid-query course corrections
- Charts need semantic intent ("show trend over time"), not just "make a chart of this dataframe"
- Auditability is table stakes in any real analytics context — every number shown must trace back to source rows
- Latency and cost must stay bounded even as the agent retries and self-critiques`,
      },
      {
        id: "approach",
        title: "The loop",
        body: `Five specialized agents each own one contract:

1. **Planner** — decomposes the natural-language question into a plan of sub-queries and tool calls
2. **SQL Agent** — writes SQL against the live warehouse schema, with access to \`db.schema()\` and \`db.query(sql)\`
3. **Validator** — dry-runs the SQL first, audits row counts, nulls, and types; self-critiques when the result doesn't match the planner's stated intent; retries on tool error (×3, exponential backoff)
4. **Chart Agent** — calls \`plot.auto(df, intent)\` to render the right visualization for the question, not just *a* visualization
5. **Narrator** — composes the final answer, citing every number back to specific source rows

All five communicate over a typed message bus, so every intermediate step is inspectable and replayable — the trace below is rendered from exactly that bus.`,
        figure: {
          kind: "multi-agent",
          caption:
            "The five-agent pipeline. Each box is a separate agent with its own contract; the message bus carries {plan, sql, df, chart, answer, error}.",
        },
      },
      {
        id: "system",
        title: "The build",
        body: `Every capability is a typed tool with an explicit contract — the agents can only act through these:

| Tool | Signature |
|---|---|
| \`db.schema()\` | \`→ Table[]\` |
| \`db.query(sql)\` | \`→ DataFrame\` |
| \`df.describe(df)\` | \`→ Stats\` |
| \`plot.auto(df, intent)\` | \`→ PNG\` |
| \`web.search(q)\` | \`→ Link[]\` |

The warehouse layer is pluggable: DuckDB for the live demo (NYC Airbnb data), with Postgres and Snowflake adapters behind the same interface. FastAPI serves the API; the whole system is exercised by a pytest eval harness on every commit.`,
      },
      {
        id: "evidence",
        title: "Evidence",
        body: `Guardrails are only real if you can watch them fire. Below are recorded runs from the system — step through them. The first run includes a hallucinated column name, the database error it caused, and the validator catching and fixing it.

These examples show the validation and retry paths on recorded questions. Requiring source-row citations is a narrator contract; no aggregate citation-success rate is reported here.

The implemented checks include:

- **SQL dry-run + row-count sanity check** before any query result is trusted
- **Null / type audit** before any chart is rendered
- **Self-critique** when the SQL result doesn't match the planner's stated intent
- **Golden Q/A regression suite** — every commit runs canonical questions and checks the answers
- **Per-query latency and cost breakdown**, so behavior stays measurable as prompts evolve`,
        figure: {
          kind: "trace-replay",
          caption:
            "Recorded runs from the live system, replayed from the message bus. Use the controls to step through — including the failed query and its retry.",
        },
      },
      {
        id: "impact",
        title: "Impact",
        body: `- Handles multi-step analytics questions end-to-end with auditable traces
- Source-row citations let users inspect the evidence behind the answer
- Regression evals plus per-query latency/cost tracking keep production behavior measurable
- Designed to plug into any warehouse with a SQL-compatible adapter`,
      },
    ],
  },
  {
    slug: "btc-early-detection",
    title: "Biliary Tract Cancer Early Detection",
    subtitle:
      "A production model that flags likely BTC patients ~45 days before claims data confirms them — scoring 250M patient-claims every month.",
    org: "ZS Associates — Fortune-500 oncology client",
    role: "Advanced Data Science Associate Consultant",
    period: "2024 — 2025",
    status: "production",
    summary: {
      contribution: "Worked on the BTC early-detection system as an Advanced Data Science Associate Consultant at ZS, with the project team.",
      decision: "Mask the latest 45 days of claims at every prediction date so training and evaluation reflect the delay the production model faces.",
      result: "The deployed pipeline scores 250M patient-claims monthly and identifies likely BTC patients approximately 45 days earlier than the claims-lag baseline.",
      limitation: "This is proprietary client work. Patient data, source code, and numerical precision/recall results are not public; the case study explains the methodology and reported production scope.",
    },
    metrics: [
      {
        value: "~45d",
        label: "earlier identification",
        provenance: "vs. the standard 45-day claims-lag baseline, leakage-masked backtest",
        kind: "evaluation",
        source: { label: "Evaluation methodology notes", href: "/work/btc-early-detection#evidence" },
      },
      {
        value: "250M",
        label: "patient-claims scored / month",
        provenance: "automated monthly refresh, in production",
        kind: "production",
        source: { label: "Production methodology notes", href: "/work/btc-early-detection#system" },
      },
      {
        value: "PMSA '25",
        label: "methodology presented",
        provenance: "client funded replication across other tumors and brands",
        kind: "recognition",
        source: { label: "Reported impact notes", href: "/work/btc-early-detection#impact" },
      },
    ],
    tech: ["PySpark", "XGBoost", "SHAP", "K-means / GMM", "NLP clustering", "MLflow"],
    links: [],
    sections: [
      {
        id: "context",
        title: "The problem",
        body: `Biliary tract cancer (BTC) is a rare cancer with very few approved treatments. The client's oncology drug — a new standard of care for BTC — had to be given as the *first* treatment after diagnosis; switching later was not an option. But because BTC is rare and presents with non-specific symptoms, patients are routinely misdiagnosed first, and once BTC is correctly identified, treatment starts almost immediately.

That left a brutally narrow window: to matter at all, the right oncologists had to be educated *before* the diagnosis showed up anywhere in the data.`,
      },
      {
        id: "constraint",
        title: "The constraints",
        body: `The medical and pharmacy claims data available had a consistent **45-day delay** from real-world events. By the time a patient appeared in the data, treatment had usually already started. On top of the lag:

- Severe class imbalance — BTC is extremely rare
- Noisy, incomplete claims capture (~50% of real-world claims)
- High risk of temporal leakage if future information contaminated earlier predictions
- Tens of millions of rows across hundreds of thousands of patients, refreshed monthly`,
      },
      {
        id: "approach",
        title: "The loop",
        body: `We framed it as a **time-indexed prediction task**: for each patient-month, estimate the probability of a BTC diagnosis in the next 30 days.

To reduce ~250M patient records per month to a modelable subset, three filters worked in sequence:

1. Direct rule-based filtering on diagnosis and procedure flags
2. K-means and Gaussian-mixture clustering over patient utilization patterns
3. NLP-based event clustering of claim sequences, to find patients whose journeys *resembled* known BTC trajectories even without the telltale codes

The critical discipline: we **masked the most recent 45 days** of data before every index date, so the model trained and validated under exactly the information conditions it would face live. No leakage, no flattering backtest.`,
      },
      {
        id: "system",
        title: "The build",
        body: `XGBoost with class-weighted loss handled the imbalance. Features covered diagnosis codes, procedures, drug regimens, provider patterns, and utilization metrics.

Two things made it survivable in production rather than a slide-deck model:

- **SHAP explanations** on every score, so non-technical stakeholders (and skeptical clinicians) could see *why* a patient was flagged
- **MLflow versioning and drift monitoring**, with the pipeline productionized to process each monthly claims refresh automatically and expose outputs through summary tables and dashboards used directly by field teams`,
      },
      {
        id: "evidence",
        title: "Evidence",
        body: `The ~45-day advantage is measured against the claims-lag baseline under the masked-data protocol — the model never saw information it wouldn't have had in production. This is a methodology description of proprietary client work; the underlying patient data, evaluation report, and numerical precision/recall results are not publicly available.

- Substantial lift in early BTC identification versus the heuristic rules it replaced
- Clinician-acceptable precision, with interpretable per-patient feature effects via SHAP
- Feature and prediction drift monitored across monthly refreshes — silent failure was a design concern, not an afterthought`,
        figure: {
          kind: "risk-timeline",
          caption: "The leakage-safe evaluation: the latest 45 days are hidden at every index date before predicting the next 30-day window.",
        },
      },
      {
        id: "impact",
        title: "Impact",
        body: `- Field teams used model outputs for territory-level resource planning
- Positive feedback from marketing teams on practical usefulness
- The client funded replication of the approach across other tumors and brands
- Methodology presented at **PMSA 2025**`,
      },
    ],
  },
  {
    slug: "sunculture-transaction-intelligence",
    title: "SunCulture Transaction Intelligence",
    subtitle:
      "A hybrid rules + LLM + retrieval pipeline that standardized 7M+ farmer transactions into the credit signal behind microloans.",
    org: "SunCulture — Series-B agtech startup, East Africa",
    role: "Data science & ML",
    period: "2025",
    status: "production",
    summary: {
      contribution: "Worked on transaction classification and its integration with SunCulture's credit-scoring workflow in a data science and ML role.",
      decision: "Use rules for familiar transactions, retrieval-assisted classification for the long tail, and confidence thresholds to route uncertain cases to human review.",
      result: "The pipeline standardized 7M+ transactions, with reported 99% accuracy on a 10,000-item holdout and a 95% reduction in manual-review volume.",
      limitation: "This case study describes internal work. The transaction dataset and holdout results are not published as a public evaluation artifact.",
    },
    metrics: [
      {
        value: "99%",
        label: "classification accuracy",
        provenance: "10,000-item hand-labeled holdout set",
        kind: "evaluation",
        source: { label: "Holdout methodology notes", href: "/work/sunculture-transaction-intelligence#evidence" },
      },
      {
        value: "−95%",
        label: "manual-review volume",
        provenance: "confidence-gated human-in-the-loop routing",
        kind: "production",
        source: { label: "Reported review-volume notes", href: "/work/sunculture-transaction-intelligence#evidence" },
      },
      {
        value: "7M+",
        label: "transactions standardized",
        provenance: "500+ category targets, free-text descriptions",
        kind: "production",
        source: { label: "Production scope notes", href: "/work/sunculture-transaction-intelligence#constraint" },
      },
    ],
    tech: ["Python", "RAG", "LLM classification", "REST"],
    links: [{ label: "sunculture.io", href: "https://sunculture.io/" }],
    sections: [
      {
        id: "context",
        title: "The problem",
        body: `SunCulture is a Series-B agtech startup selling solar-powered irrigation to smallholder farmers across East Africa, financed through microloans. To underwrite those loans, the credit team needed a clean view of each farmer's cash flow — but the raw transaction data was a mess: free-text descriptions, inconsistent merchant names, regional abbreviations, and **500+ category targets** ranging from "seeds" to "motorbike repair."

The pipeline's job: classify transactions reliably enough that the output could feed a creditworthiness model that decides real loans.`,
      },
      {
        id: "constraint",
        title: "The constraints",
        body: `- 7M+ transactions with noisy free-text descriptions and regional abbreviations
- A 500+ category space — pure rules could never cover the tail; pure LLM was too expensive at volume
- Ground truth was scarce: the hand-labeled gold set was small relative to the category space
- A latency budget — new transactions had to score fast enough to inform loan decisions
- A 95%+ accuracy bar for the credit team to trust the signal at all`,
      },
      {
        id: "approach",
        title: "The loop",
        body: `A three-tier hybrid, each tier handling what it's cheapest and best at:

1. **Rule engine (fast path)** — exact merchant matches and known prefixes resolve the high-confidence majority at near-zero cost
2. **LLM + retrieval (long tail)** — for uncertain transactions, retrieve the nearest labeled examples from the corpus and condition the model on them, RAG-style
3. **Confidence-gated human review** — only predictions below a confidence threshold route to a person

The loop that kept it improving: errors from each batch were hand-labeled and folded back into the retrieval corpus, so the long-tail tier got sharper with every cycle.`,
      },
      {
        id: "system",
        title: "The build",
        body: `A Python REST service classifies individual transactions or batch files:

- **Rule layer** covers the majority of common transactions with near-zero marginal cost
- **LLM + retrieval layer** handles novel or ambiguous descriptions
- **Confidence gating** routes only the genuinely uncertain subset to manual review
- Output integrates directly with the credit-scoring model feeding loan decisioning`,
      },
      {
        id: "evidence",
        title: "Evidence",
        body: `The 99% figure comes from a **10,000-item hand-labeled holdout** — not training accuracy, not a cherry-picked subset.

- Accuracy was tracked per tier, so the cheap rule path couldn't quietly degrade behind the blended number
- The iterative eval loop (hand-label errors → fold into retrieval corpus) meant the system improved on exactly the cases it got wrong
- Confidence calibration determined the human-review threshold — the −95% review reduction is a direct consequence of the gate, not a separate claim`,
      },
      {
        id: "impact",
        title: "Impact",
        body: `- 99% accuracy on the holdout, clearing the credit team's 95% trust bar
- 95% reduction in manual review volume
- A cleaner cash-flow signal feeding microloan underwriting
- Faster loan decisions for smallholder farmers across East Africa`,
      },
    ],
  },
  {
    slug: "filing-intelligence-rag",
    title: "Filing Intelligence RAG",
    subtitle:
      "Evidence-first financial research across filings, earnings decks, and transcripts, with page-level source verification and highlighted PDF citations.",
    org: "Independent project",
    role: "Product and RAG engineering",
    period: "2026",
    status: "live",
    summary: {
      contribution: "Built the research product and retrieval workflow, including scoped search, evidence assembly, citation verification, and the PDF reading experience.",
      decision: "Preserve page and line provenance during ingestion, constrain retrieval by company and period, and keep the source evidence visible alongside each answer.",
      result: "A deployed research workspace searches 4,967 passages from 128 documents across 15 companies, backed by 72 automated verification checks.",
      limitation: "Corpus size and passing checks describe coverage and engineering verification, not measured answer accuracy. PDF highlighting also depends on the document's text layer.",
    },
    metrics: [
      {
        value: "4,967",
        label: "indexed source passages",
        provenance: "packaged corpus spanning 128 documents and 15 companies",
        kind: "corpus",
        source: { label: "Corpus & verification notes", href: "/work/filing-intelligence-rag#evidence" },
      },
      {
        value: "128",
        label: "source documents",
        provenance: "filings, earnings decks, and call transcripts across a 15-company corpus",
        kind: "corpus",
        source: { label: "Corpus & verification notes", href: "/work/filing-intelligence-rag#evidence" },
      },
      {
        value: "72",
        label: "automated verification checks",
        provenance: "64 Python checks and 8 frontend checks across retrieval, auth, APIs, and builds",
        kind: "verification",
        source: { label: "Verification scope notes", href: "/work/filing-intelligence-rag#evidence" },
      },
    ],
    tech: ["Python", "Next.js", "TypeScript", "FastAPI", "ChromaDB", "Vertex AI", "GCP Cloud Run"],
    links: [
      { label: "Live demo", href: "https://filing-intelligence-rag-7pj7nolpla-uc.a.run.app" },
      { label: "GitHub", href: "https://github.com/ARJUNVARMA2000/filing-intelligence-rag" },
    ],
    sections: [
      {
        id: "context",
        title: "The problem",
        body: `Analysts and investors spend hours moving between filings, earnings decks, and call transcripts to extract performance, risk, and management commentary. The documents are dense, structurally inconsistent, and difficult to compare across companies and reporting periods.

The goal: a research workspace that answers natural-language questions with **source-grounded** responses and makes every conclusion easy to verify against the original page.`,
      },
      {
        id: "constraint",
        title: "The constraints",
        body: `- Financial documents have complex nested structure — tables, footnotes, cross-references — that naive chunking destroys
- Financial data demands exact numbers; approximations are unacceptable
- Relevant information spans multiple documents and sections, but context windows are finite
- The system must handle both quantitative queries ("What was Q3 revenue?") and qualitative ones ("What are the main risk factors?")
- Every response must cite its sources, or it can't be trusted or audited`,
      },
      {
        id: "approach",
        title: "The loop",
        body: `A provenance-first RAG architecture where retrieval and verification do the heavy lifting:

1. **Structure-aware ingestion** — parsers preserve document, page, line, section, table, and source provenance instead of splitting blindly
2. **Scoped retrieval** — ticker and fiscal-period parsing constrain a 384-dimensional Chroma index before dense and lexical ranking
3. **Evidence assembly** — duplicate suppression and bounded context construction retain only the strongest source passages
4. **Citation validation** — generated answers map back to an evidence ledger whose links open the exact PDF page and search the cited passage`,
      },
      {
        id: "system",
        title: "The build",
        body: `- **FastAPI backend** — validated query contracts, provider boundaries, retrieval, citation selection, and source delivery
- **ChromaDB + Sentence Transformers** — versioned local embeddings with deterministic company and period filters
- **Vertex AI generation** — bounded production inference behind Google-authenticated frontend-to-backend calls
- **Next.js + React workspace** — typed scope controls, a same-origin backend-for-frontend, evidence inspector, and responsive research history
- **PDF evidence viewer** — product-consistent cited-page layout, byte-range rendering, robust text highlighting, and a native fallback for scanned or reformatted documents
- **Cloud Run deployment** — isolated frontend and API services with readiness, smoke, and freshness checks`,
      },
      {
        id: "evidence",
        title: "Evidence",
        body: `Trust in a RAG system is a verification problem, so provenance is part of the data contract:

- Every indexed chunk carries **page and line provenance**, with section and table identifiers where available
- Answers expose an **evidence ledger** rather than hiding retrieved context behind a confidence score
- Citation links open the source on the relevant page and highlight the matched passage when the PDF text layer supports it
- **72 automated checks** — 64 Python and 8 frontend — cover retrieval scope, citation integrity, auth boundaries, API contracts, document delivery, and production builds`,
        figure: {
          kind: "citation-stack",
          caption: "A grounded-answer contract: the response is assembled only from retrieved filing passages and retains a line-level trail back to each source.",
        },
      },
      {
        id: "impact",
        title: "Impact",
        body: `- Searches 4,967 indexed passages across 128 source documents and 15 companies
- Automatic ticker and period parsing narrows the research universe before retrieval
- Source-linked answers make the supporting page, lines, and excerpt immediately inspectable in one click
- A 72-check verification baseline protects retrieval, authentication, API, and build contracts
- Deployed as isolated frontend and API services on Cloud Run`,
      },
    ],
  },
];

const FEATURED_SLUGS = [
  "deuce-tennis-forecast",
  "airbnb-data-analyst-agent",
  "btc-early-detection",
  "filing-intelligence-rag",
] as const;

export const FEATURED_CASE_STUDIES = FEATURED_SLUGS.map((slug) =>
  CASE_STUDIES.find((cs) => cs.slug === slug)
).filter((cs): cs is CaseStudy => Boolean(cs));

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}
