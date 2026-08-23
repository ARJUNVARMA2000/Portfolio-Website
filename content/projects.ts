export type IndexProject = {
  title: string;
  year: string;
  oneLiner: string;
  tech: string[];
  live: string;
  repo: string;
  caseStudy?: string;
};

/** Compact index — these ship as one row each; the deep narratives live in case-studies.ts. */
export const PROJECT_INDEX: IndexProject[] = [
  {
    title: "Filing Intelligence RAG",
    year: "2026",
    oneLiner:
      "Evidence-first research across 4,967 indexed passages from 128 filings, earnings decks, and call transcripts spanning 15 companies. Deterministic retrieval, bounded context, and page/line citations open directly in the source PDF; 72 automated checks cover retrieval, authentication, API contracts, and production builds.",
    tech: ["Python", "FastAPI", "ChromaDB", "Next.js", "GCP Cloud Run"],
    live: "https://filing-intelligence-rag-7pj7nolpla-uc.a.run.app",
    repo: "https://github.com/ARJUNVARMA2000/filing-intelligence-rag",
    caseStudy: "/work/filing-intelligence-rag",
  },
  {
    title: "GAFFER: Live World Cup Forecasting Platform",
    year: "2026",
    oneLiner:
      "Forecasts the 2026 World Cup from ~49K international matches using Elo, a time-weighted Dixon-Coles goal model, squad-value blending, and 50,000 Monte Carlo runs. Walk-forward evaluation across 8,136 matches since 2018 reached 0.887 log loss versus a 1.05 baseline; frozen pre-match predictions are graded against Kalshi as the hourly pipeline refreshes.",
    tech: ["Python", "pandas", "NumPy", "Next.js", "GitHub Actions", "Firebase"],
    live: "https://gaffer-wc26.web.app",
    repo: "https://github.com/ARJUNVARMA2000/wc-2026-gaffer",
  },
  {
    title: "ClaimReady",
    year: "2026",
    oneLiner:
      "Planner-led workflow with four specialists that turns contracts, invoices, emails, and screenshots into structured NYC small-claims packets with multimodal extraction, legal retrieval, and typed handoffs.",
    tech: ["OpenAI Agents SDK", "FastAPI", "Next.js", "GCP"],
    live: "https://claimready-frontend-7pj7nolpla-ue.a.run.app",
    repo: "https://github.com/Agentic-AI-Project-Columbia/claimready",
  },
  {
    title: "ClassPulse",
    year: "2026",
    oneLiner:
      "Live classroom theme extraction — students answer via QR, an LLM clusters responses into themed cards every 10s over SSE, with a 5-model fallback chain.",
    tech: ["FastAPI", "React", "SSE", "OpenRouter"],
    live: "https://themepulse-production.up.railway.app/",
    repo: "https://github.com/ARJUNVARMA2000/ClassPulse",
  },
  {
    title: "SeanceAI",
    year: "2025",
    oneLiner:
      "Conversations with 60+ historical figures under era-appropriate knowledge boundaries; Dinner-Party mode runs 2–5 figure multi-agent dialogue.",
    tech: ["Flask", "OpenRouter", "SSE"],
    live: "https://seance-ai.up.railway.app",
    repo: "https://github.com/ARJUNVARMA2000/Seance_AI",
  },
  {
    title: "Citation Format Checker",
    year: "2026",
    oneLiner:
      "Narrow-scope chatbot that flags APA 7 / MLA 9 / Chicago 17 violations with rule-IDs and quoted evidence; three-method eval suite, 30+ test cases.",
    tech: ["Vertex AI", "FastAPI", "Cloud Run"],
    live: "https://citation-bot-7pj7nolpla-uc.a.run.app",
    repo: "https://github.com/ARJUNVARMA2000/citation-format-checker",
  },
];
