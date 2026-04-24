export type Experience = {
  role: string;
  org: string;
  loc: string;
  period: string;
  bullets: string[];
  badge?: string;
};

export const EXPERIENCE: Experience[] = [
  {
    role: "Advanced Data Science Associate Consultant",
    org: "ZS Associates",
    loc: "Pune",
    period: "Feb 2025 — Jun 2025",
    bullets: [
      "Built an org-wide analytics + ML platform (Spark/SQL, dashboards) unifying 5+ data sources into territory and product KPIs used by 100+ stakeholders supporting a $10B oncology portfolio.",
      "Cut weekly reporting time from days to minutes, replacing Excel workflows with automated pipelines and self-serve dashboards.",
    ],
  },
  {
    role: "Decision Analytics Associate Consultant",
    org: "ZS Associates",
    loc: "Pune",
    period: "Jul 2024 — Jan 2025",
    bullets: [
      "Led a 5-member team to modernize legacy business rules; saved ~50 hrs/mo and improved first-pass quality to >99%.",
      "Built and deployed Positive-Unlabeled learning models to infer missing categorical labels in medical transaction data, lifting customer-journey coverage from ~40% to ~95%.",
      "Implemented feature + prediction drift monitoring and CI unit tests for production pipelines, reducing silent failures.",
      "Top ~10% in a company-wide hackathon; earned lateral transfer into the Data Science vertical.",
    ],
  },
  {
    role: "Decision Analytics Associate",
    org: "ZS Associates",
    loc: "Pune",
    period: "Feb 2022 — Jun 2024",
    bullets: [
      "Engineered PySpark/SQL ETL pipelines across multiple healthcare data sources covering millions of patients for $4B+ oncology drug performance analytics.",
      "Defined audit-ready patient cohort inclusion/exclusion logic robust to missing and miscoded fields.",
      "Promoted to Associate Consultant in 4 cycles (typical: 5). Expert Associate and Insight Illuminator awards.",
    ],
    badge: "Fast-track promotion",
  },
];

export type Project = {
  title: string;
  kicker: string;
  year: string;
  summary: string;
  tech: string[];
  href?: string;
  repo?: string;
  tag?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Airbnb Data Analyst Agent",
    kicker: "Agentic AI for Analytics · Columbia",
    year: "2026",
    summary:
      "LLM-powered agent that takes a natural-language question about Airbnb listings and plans, writes, and executes multi-step SQL + pandas + chart generation — returning a narrated, cited answer.",
    tech: ["Agents", "Tool use", "SQL", "pandas", "Evals"],
    href: "https://github.com/Agentic-AI-Project-Columbia/airbnb-data-analyst-agent",
    tag: "latest",
  },
  {
    title: "Biliary Tract Cancer Early Detection",
    kicker: "ZS · Oncology analytics",
    year: "2025",
    summary:
      "Predictive model over 250M patient-claims identifying BTC patients ~45 days earlier than the standard diagnosis lag. Hybrid clinical rules + K-means/GMM + Transformer NLP clustering on diagnosis narratives. Presented at PMSA 2025.",
    tech: ["PySpark", "XGBoost", "SHAP", "NLP clustering", "MLflow"],
    tag: "production",
  },
  {
    title: "Financial RAG Chatbot",
    kicker: "Columbia · LLM + retrieval",
    year: "2025",
    summary:
      "RAG chatbot answering company financial questions from SEC filings with line-level citations. Semantic retrieval with ChromaDB + text-embedding-3-large; automatic ticker and period parsing; Claude Opus as eval judge.",
    tech: ["FastAPI", "ChromaDB", "LangChain", "Streamlit", "GCP"],
    href: "https://finrag-frontend-7pj7nolpla-uc.a.run.app/",
    repo: "https://github.com/ARJUNVARMA2000/Financial-RAG-Chatbot",
  },
  {
    title: "SunCulture — Farmer Transaction Standardization",
    kicker: "Series-B Agtech · East Africa",
    year: "2025",
    summary:
      "RAG-augmented classifier categorizing 7M+ farmer transactions across 500+ categories to drive creditworthiness for microloans. Hybrid rule + LLM pipeline reached 99% accuracy on a 10K holdout and cut manual review by 95%.",
    tech: ["Python", "RAG", "REST"],
  },
  {
    title: "ClassPulse",
    kicker: "Live classroom theme extraction",
    year: "2026",
    summary:
      "Professors post a question, students answer via QR, and an LLM summarizes responses into 4–6 themed cards in real time. FastAPI + SSE with a 5-model OpenRouter fallback chain. Single service on Railway.",
    tech: ["FastAPI", "React", "SSE", "OpenRouter"],
    href: "https://themepulse-production.up.railway.app/",
    repo: "https://github.com/ARJUNVARMA2000/ClassPulse",
  },
  {
    title: "Tweet Bot",
    kicker: "Chrome extension · AI assistant",
    year: "2026",
    summary:
      "DOM-injected reply generator for X. Three rhetorical angles per request, image-aware context extraction, voice-learning from user selections, streaming responses.",
    tech: ["Chrome MV3", "OpenRouter", "Claude Opus/Sonnet/Haiku"],
    repo: "https://github.com/ARJUNVARMA2000/tweet-bot",
  },
  {
    title: "Citation Format Checker",
    kicker: "Columbia · Domain Q&A",
    year: "2026",
    summary:
      "Narrow-scope chatbot that identifies APA 7 / MLA 9 / Chicago 17 violations with rule-IDs and quoted evidence. Vertex AI (Gemini 2.0 Flash Lite) + FastAPI. Three-method eval suite with 30+ test cases.",
    tech: ["Vertex AI", "FastAPI", "Cloud Run"],
    href: "https://citation-bot-7pj7nolpla-uc.a.run.app",
    repo: "https://github.com/ARJUNVARMA2000/citation-format-checker",
  },
  {
    title: "SeanceAI",
    kicker: "Conversational AI",
    year: "2025",
    summary:
      "Chatbot enabling conversations with 60+ historical figures with era-appropriate knowledge boundaries. Dinner-Party mode for 2–5 figure multi-agent dialogue. Flask + SSE streaming, OpenRouter multi-model with fallbacks.",
    tech: ["Flask", "OpenRouter", "SSE"],
    href: "https://seance-ai.up.railway.app",
    repo: "https://github.com/ARJUNVARMA2000/Seance_AI",
  },
  {
    title: "Video Speed Controller",
    kicker: "Chrome extension",
    year: "2025",
    summary:
      "Fine-grained playback-rate controller that persists per-site preferences and survives segment changes. Works across YouTube, Netflix, Coursera, generic HTML5.",
    tech: ["Chrome MV3", "MutationObserver"],
    repo: "https://github.com/ARJUNVARMA2000/Video-Speed-Controller-extension",
    href: "https://chromewebstore.google.com/detail/video-speed-controller-pr/mahfenfglifhcipcpobblpgdaefigpee",
  },
];

export const SKILLS: Record<string, string[]> = {
  Languages: ["Python", "SQL", "C++", "R"],
  "ML / DS": ["PyTorch", "scikit-learn", "XGBoost", "pandas", "NumPy", "SHAP", "MLflow"],
  "LLM / Agents": ["RAG", "LangChain", "ChromaDB", "OpenRouter", "Vertex AI", "Evals"],
  "Data / Cloud": ["PySpark", "Databricks", "AWS (S3, EMR, Athena, SageMaker)", "GCP Cloud Run", "Docker"],
  Workflow: ["Git", "CI/CD", "Jupyter", "Streamlit", "FastAPI", "Cursor", "Claude Code"],
};
