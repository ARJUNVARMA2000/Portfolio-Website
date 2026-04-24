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

export type CaseStudy = {
  problem: string;
  challenge: string;
  approach: string;
  solution: string;
  impact: string;
};

export type Project = {
  title: string;
  kicker: string;
  year: string;
  summary: string;
  tech: string[];
  href?: string;
  hrefLabel?: string;
  repo?: string;
  tag?: string;
  caseStudy?: CaseStudy;
  secondary?: boolean;
  impactStats?: Array<{ value: string; label: string }>;
};

const btcCaseStudy: CaseStudy = {
  problem: `Bile Tract Cancer (BTC) is a rare form of cancer with very few approved treatments. Our client's oncology drug was a new method of treatment that had become the standard of care for BTC, but because of its rarity, it was difficult to know which oncologists/urologists to educate.

Because BTC is rare and presents with non-specific symptoms, patients are often misdiagnosed with other cancers or more common ailments. Once BTC is accurately identified, treatment typically begins immediately due to the aggressive nature of the disease. The drug had to be given as the first treatment post-diagnosis — switching later was not an option.`,
  challenge: `The medical and pharmacy claims data we could use had a consistent 45-day delay from the occurrence of events. By the time a patient showed up in the data, treatment had usually already started.

Key challenges:
• Severe class imbalance (BTC is extremely rare)
• Noisy and incomplete claims data (~50% capture of all real-world claims)
• Risk of temporal leakage when using future information to predict earlier risk
• Dataset of tens of millions of rows across hundreds of thousands of patients`,
  approach: `We framed the problem as a time-indexed prediction task: for each patient-month cohort, estimate the probability of a BTC diagnosis in the next 30 days.

To reduce ~250M patient records per month to a manageable subset, we combined:
1. Direct rule-based filtering using diagnosis/procedure flags
2. Advanced clustering techniques (K-means and Gaussian Mixtures)
3. NLP-based event clustering of claim sequences to identify patients whose journeys resembled known BTC trajectories

We deliberately masked the most recent 45 days of data before each index date to simulate real-time conditions and prevent temporal leakage.`,
  solution: `For modeling, we used XGBoost with class-weighted loss to address imbalance. Key features included:
• Diagnosis codes, procedures, and drug regimens
• Provider patterns and utilization metrics
• SHAP values for explainability (critical for non-technical stakeholders)
• MLflow for model versioning and drift monitoring

The pipeline was productionized to process new claims refreshes automatically at a monthly cadence, with model outputs exposed through summary tables and dashboards used by field teams.`,
  impact: `• Substantial lift in early BTC case identification versus heuristic rules
• Clinician-acceptable precision with interpretable feature effects
• Positive feedback from Marketing teams on usefulness
• Client decided to fund similar implementations across other Tumors/Brands
• Methodology presented at PMSA 2025 conference; model adopted for territory-level resource planning`,
};

const financialRagCaseStudy: CaseStudy = {
  problem: `Financial analysts and investors spend countless hours manually sifting through SEC filings (10-K, 10-Q, 8-K) to extract key insights about company performance, risk factors, and management discussions. These documents are dense, lengthy (often 100+ pages), and written in complex legal/financial language.

The challenge was to build an intelligent assistant that could answer natural language questions about company financials with accurate, source-grounded responses — eliminating hallucinations that plague standard LLM approaches.`,
  challenge: `Building a reliable financial Q&A system presented several technical hurdles:

• SEC filings contain complex nested structures (tables, footnotes, cross-references)
• Financial data requires precise numerical accuracy — approximations are unacceptable
• Context windows are limited, but relevant information may span multiple document sections
• Need to handle both quantitative queries ("What was Q3 revenue?") and qualitative ones ("What are the main risk factors?")
• Responses must cite sources to maintain trust and auditability`,
  approach: `Retrieval-Augmented Generation (RAG) architecture with several innovations:

1. Document Processing Pipeline: SEC-EDGAR APIs fetch filings, then intelligent chunking respects document structure (preserving tables, section boundaries)
2. Semantic Search Layer: ChromaDB vector store with OpenAI embeddings for semantic retrieval, combined with metadata filtering (company, filing date, section type)
3. Multi-stage Retrieval: Initial broad retrieval followed by reranking to surface the most relevant chunks per query
4. Prompt Engineering: Prompts instruct the generator to only answer from retrieved context and explicitly cite sources`,
  solution: `• FastAPI Backend — RESTful API handling document ingestion, query processing, and response generation
• Streamlit Frontend — interactive chat interface with conversation history and source highlighting
• ChromaDB — persistent vector store with company/filing metadata for filtered retrieval
• LangChain Orchestration — RAG pipeline, conversation memory, chain-of-thought reasoning

Quality assurance via OpenEval framework to score response accuracy, relevance, and faithfulness to source documents.`,
  impact: `• Multi-model evaluation pipeline using Claude Opus as a judge for response accuracy and relevance
• Integrated multiple years of SEC filings across different companies
• Time-to-insight cut from hours of manual reading to seconds of conversation
• Automatic ticker and period parsing for streamlined query handling
• Deployed live on Cloud Run with persistent conversation history`,
};

const seanceAiCaseStudy: CaseStudy = {
  problem: `History education often feels distant and abstract. Students read about historical figures in textbooks, but rarely get to experience their personalities, perspectives, or thought processes. Traditional learning methods don't capture authentic voices and contextual knowledge.

The goal was an immersive, educational experience that brings history to life through authentic AI-powered conversations with legendary figures from different eras.`,
  challenge: `• Creating believable personas that speak in era-appropriate language and knowledge
• Ensuring historical figures don't know about events after their death (temporal knowledge boundaries)
• Designing engaging UI/UX that feels like a museum experience, not just another chatbot
• Implementing multi-figure conversations where personalities interact naturally
• Managing API costs and rate limits while providing smooth streaming responses
• Handling model fallbacks gracefully when primary models hit rate limits`,
  approach: `1. Historical Research — studied documented sources to capture authentic personalities, speaking styles, knowledge boundaries for 60+ figures
2. Dual Conversation Modes — Seance Mode (1-on-1) and Dinner Party Mode (2–5 figures) for different interaction styles
3. Smart Model Selection — OpenRouter with intelligent fallback: primary free models (Gemini 2.0 Flash) + premium fallbacks (GPT-4o, Claude Sonnet 4)
4. Museum-Themed Design — dark UI with gold accents, SVG portraits, smooth animations
5. Progressive Features — contextual suggestions, conversation history, save/resume, export options`,
  solution: `• Flask Backend — RESTful API with Server-Sent Events for streaming responses and intelligent retry logic
• OpenRouter Integration — flexible AI model access with automatic fallback handling
• 60+ Historical Figures — Ancient World, Renaissance, 19th Century, Modern Era
• Museum-Themed Web UI — responsive figure selection, conversation history, multi-mode support
• Railway Deployment — containerized Flask app with environment-based configuration

Each figure maintains a unique voice, era-appropriate knowledge, and genuine reactions to modern concepts.`,
  impact: `• Deployed to production on Railway with reliable uptime
• 60+ figures across multiple eras with authentic personalities
• Both intimate 1-on-1 conversations and dynamic multi-figure dinner parties
• Educational value for history learning, critical thinking, creative writing
• Full-stack demonstration: AI integration, streaming, persona engineering, deployment`,
};

const videoSpeedCaseStudy: CaseStudy = {
  problem: `Online learning has exploded, but video platforms often have limited playback speed options (typically 0.5× to 2×). Power users watching lectures, tutorials, or long-form content want finer control — 1.25×, 1.75×, even 3×+ for review.

Many streaming platforms reset speed settings between videos or don't remember preferences, creating friction for consistent viewing.`,
  challenge: `• Different sites structure video players differently (native HTML5, custom wrappers, shadow DOM)
• Some platforms actively reset playbackRate on video load or segment changes
• DRM-protected content may restrict speed modifications
• Must work across YouTube, Netflix, Coursera, Udemy, and arbitrary sites
• Keyboard shortcuts must not conflict with existing site hotkeys`,
  approach: `1. Content Script Injection — locate all video elements on the page, including dynamically loaded
2. MutationObserver Pattern — watch for new <video> elements entering the DOM and auto-apply speed
3. Persistent Storage — Chrome storage API remembers per-site and global preferences
4. Non-intrusive UI — overlay controls appear on hover without disrupting viewing
5. Keyboard Shortcuts — configurable hotkeys for quick speed adjustments`,
  solution: `• Background Service Worker — manages extension state and cross-tab communication
• Content Scripts — injected into pages to control video elements and render UI overlay
• Options Page — configure default speed, keyboard shortcuts, per-site preferences
• Speed Memory — automatically applies preferred speed to new videos without manual intervention

Implementation uses the standard HTMLMediaElement.playbackRate API with fallbacks for sites that try to override user settings.`,
  impact: `• Works on YouTube, Netflix, Udemy, Coursera, generic HTML5
• Fine-grained speed from 0.1× to 16× in customizable increments
• Remembers preferences across sessions and sites
• Lightweight — negligible performance overhead
• Published on the Chrome Web Store, used daily`,
};

const tweetBotCaseStudy: CaseStudy = {
  problem: `Social media engagement on X/Twitter requires quick, thoughtful responses that maintain your authentic voice. Crafting the right reply, quote tweet, or thread takes time and mental energy — especially at scale.

Goal: an AI assistant that integrates directly into the Twitter experience and provides context-aware suggestions that match your personal style.`,
  challenge: `• Twitter/X's DOM structure is complex and frequently changes, making reliable element detection hard
• Extracting full context (tweet text, author, thread history, images) requires sophisticated DOM traversal
• Suggestions must feel authentic and match the user's voice, not generic AI output
• Streaming responses must be smooth and non-disruptive
• Chrome Extension MV3 restrictions limit background processing`,
  approach: `1. DOM Injection — content scripts inject AI buttons into every tweet's action bar, blending with native UI
2. Context Extraction — sophisticated tweet parser captures text, author, thread context, image content for multimodal understanding
3. Voice Learning — tracks which suggestions the user selects over time and adapts future prompts
4. Multi-Model Support — Claude Opus / Sonnet / Haiku via OpenRouter for different quality/speed tradeoffs`,
  solution: `• Service Worker Backend — API calls, streaming, prompt building, selection history
• Content Scripts — DOM injection, tweet extraction, popup UI rendering
• Tone Control — five rhetorical modes (witty, professional, casual, provocative, informative) with tagged strategy labels
• Thread Mode — coherent multi-tweet threads on any topic
• Settings Dashboard — model selection, usage tracking with cost estimates, export/import

Each suggestion comes with a rhetorical strategy tag (e.g., [contrarian take], [empathy hook]).`,
  impact: `• 3 distinct suggestions per request with different rhetorical angles
• Supports replies, quote tweets, original tweets, and multi-tweet threads
• Image understanding for context-aware responses to visual content
• Voice learning improves suggestions over time
• Real-time streaming for instant feedback
• Full privacy — API key and history stored locally, no external data collection`,
};

const classPulseCaseStudy: CaseStudy = {
  problem: `In live classrooms, professors ask open-ended questions to gauge student understanding, but collecting and synthesizing dozens of responses in real time is impractical. Students may hesitate to speak up; manual aggregation misses emerging themes.

Goal: professor poses a question, students submit instantly via QR or link, system summarizes responses into key themes with attribution — turning messy classroom input into actionable insights during the session.`,
  challenge: `• Aggregate and process submissions as they arrive without blocking the UI
• LLM summarization must run periodically (every 10s) while new responses stream in
• 5-model fallback chain required to handle API rate limits and availability
• Single deployment (FastAPI + static React) to simplify Railway hosting
• QR code and shareable link flow must be frictionless for students on any device`,
  approach: `1. Session Creation — professor creates a session with a question; system generates a unique QR code and shareable link
2. Student Submission — students open the link (no signup), type, submit
3. Periodic Summarization — backend runs summarization every 10s when ≥3 responses exist, using OpenRouter with a 5-model fallback chain
4. Real-Time Updates — FastAPI serves Server-Sent Events so the professor's dashboard updates automatically as themes are generated`,
  solution: `• FastAPI Backend — REST API for sessions, responses, theme summaries; SSE endpoint for real-time dashboard
• React/Vite Frontend — professor dashboard with theme cards + student attribution; student submission form with QR display
• OpenRouter Integration — 5-model fallback chain (Gemini 2.0 Flash → Llama 3.1 → Mistral 7B → Gemma 2 → Qwen 2.5)
• Single Dockerfile — builds React static assets, runs FastAPI serving both API and static files
• Railway Deployment — one service, auto-deploy on push, OpenRouter API key as Railway variable`,
  impact: `• Live theme extraction from student responses in real time during class
• Reduces manual aggregation from minutes to seconds
• 5-model fallback ensures summarization works even when primary models are rate-limited
• Frictionless student flow — no signup, just scan and submit
• Deployed on Railway with CI/CD from GitHub pushes`,
};

const citationCheckerCaseStudy: CaseStudy = {
  problem: `Academic citation formatting is tedious and error-prone. Students and researchers must navigate hundreds of rules across APA 7th, MLA 9th, and Chicago 17th — each with subtle differences for different source types. Existing tools auto-rewrite citations, which masks the underlying error instead of teaching the writer.

Goal: a specialized chatbot that identifies specific formatting violations in citations and reference lists, with rule-based evidence, without rewriting the user's text.`,
  challenge: `• Each style has hundreds of rules with subtle differences (comma placement, italicization, date formats)
• The bot must identify specific violations with rule IDs, not just suggest generic corrections
• Must stay narrowly scoped — redirect off-topic questions about grammar, research quality, page layout
• Requires safety backstops for crisis-language detection
• Evaluation is complex — needs both deterministic checks and model-as-judge approaches`,
  approach: `1. Domain Scoping — explicit boundary (citation and reference formatting only) with redirect logic for out-of-scope queries
2. Rule Engineering — formatting rules for all three styles encoded with specific rule IDs for traceable violation reporting
3. Vertex AI Integration — Gemini 2.0 Flash Lite for fast, cost-effective responses with domain-specific prompting
4. Comprehensive Evaluation — multi-layered eval harness: deterministic checks, golden-reference comparisons, rubric-based model-as-judge`,
  solution: `• FastAPI Backend — RESTful API with session management
• Vertex AI Integration — Gemini 2.0 Flash Lite with carefully engineered citation-domain prompts
• Web Interface — clean UI with style selector (APA/MLA/Chicago) for paste-and-check workflow
• Evaluation Suite — pytest harness with three test types: deterministic rule detection, golden-reference model-as-judge, rubric-based model-as-judge
• Cloud Run Deployment — containerized on GCP with public access

Every violation cites a specific rule ID and quotes evidence directly from the user's text.`,
  impact: `• Supports APA 7th, MLA 9th, Chicago 17th
• Identifies specific violations with rule IDs and quoted evidence — not black-box rewrites
• Deployed on GCP Cloud Run with public access
• 30+ eval test cases across three evaluation methods
• Narrow domain focus with graceful out-of-scope handling
• Safety backstops for sensitive content`,
};

const sunCultureCaseStudy: CaseStudy = {
  problem: `SunCulture is a Series-B agtech scaling solar-powered irrigation to smallholder farmers across East Africa. To underwrite microloans for equipment purchase, the credit team needed a clean view of each farmer's cash flow — but raw transaction data was messy: free-text descriptions, inconsistent merchant names, 500+ category targets ranging from "seeds" to "motorbike repair."

Goal: a standardization pipeline that classifies farmer transactions reliably enough to drive a creditworthiness signal for loan decisioning.`,
  challenge: `• 7M+ transactions with noisy free-text descriptions and regional abbreviations
• 500+ category target space — pure rules would never cover the tail; pure LLM would be too expensive
• Ground-truth scarcity — hand-labelled gold set was small relative to the space
• Latency budget — had to score new transactions fast enough to inform real-time loan decisions
• 95%+ accuracy target to be trusted in the credit model`,
  approach: `1. Hybrid Pipeline — rule engine handles high-confidence patterns (exact merchant matches, known prefixes); LLM-augmented classifier handles the long tail
2. RAG-style Retrieval — for each uncertain transaction, retrieve nearest examples from the labelled corpus and condition the model on them
3. Confidence Gating — only surface for manual review when model confidence falls below a threshold
4. Iterative Eval Loop — hand-label errors from each batch, fold back into the retrieval corpus`,
  solution: `• Python + REST service — classifies individual transactions or batch files
• Rule layer (fast path) — covers the majority of common transactions with near-zero cost
• LLM + retrieval layer (long tail) — handles novel or ambiguous descriptions
• Confidence-gated human-in-the-loop — only the uncertain subset routes to manual review
• Pipeline integrates with credit-scoring model feeding loan decisioning`,
  impact: `• 99% accuracy on a 10,000-item holdout set
• 95% reduction in manual review volume
• Cleaner cash-flow signal feeding the microloan underwriting model
• Faster loan decisioning for smallholder farmers in East Africa`,
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
    caseStudy: btcCaseStudy,
    impactStats: [
      { value: "~45d", label: "earlier than diagnosis lag" },
      { value: "250M", label: "patient-claims scored / mo" },
      { value: "PMSA ’25", label: "presented · funded across tumors" },
    ],
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
    caseStudy: financialRagCaseStudy,
  },
  {
    title: "SunCulture — Farmer Transaction Standardization",
    kicker: "Series-B Agtech · East Africa",
    year: "2025",
    summary:
      "RAG-augmented classifier categorizing 7M+ farmer transactions across 500+ categories to drive creditworthiness for microloans. Hybrid rule + LLM pipeline reached 99% accuracy on a 10K holdout and cut manual review by 95%.",
    tech: ["Python", "RAG", "REST"],
    href: "https://sunculture.io/",
    hrefLabel: "sunculture.io",
    caseStudy: sunCultureCaseStudy,
    impactStats: [
      { value: "99%", label: "accuracy · 10K holdout" },
      { value: "−95%", label: "manual-review volume" },
      { value: "7M+", label: "txns · 500+ categories" },
    ],
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
    caseStudy: classPulseCaseStudy,
  },
  {
    title: "Tweet Bot",
    kicker: "Chrome extension · AI assistant",
    year: "2026",
    summary:
      "DOM-injected reply generator for X. Three rhetorical angles per request, image-aware context extraction, voice-learning from user selections, streaming responses.",
    tech: ["Chrome MV3", "OpenRouter", "Claude Opus/Sonnet/Haiku"],
    repo: "https://github.com/ARJUNVARMA2000/tweet-bot",
    caseStudy: tweetBotCaseStudy,
    secondary: true,
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
    caseStudy: citationCheckerCaseStudy,
    secondary: true,
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
    caseStudy: seanceAiCaseStudy,
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
    caseStudy: videoSpeedCaseStudy,
    secondary: true,
  },
];

export const SKILLS: Record<string, string[]> = {
  Languages: ["Python", "SQL", "C++", "R"],
  "ML / DS": ["PyTorch", "scikit-learn", "XGBoost", "pandas", "NumPy", "SHAP", "MLflow"],
  "LLM / Agents": ["RAG", "LangChain", "ChromaDB", "OpenRouter", "Vertex AI", "Evals"],
  "Data / Cloud": ["PySpark", "Databricks", "AWS (S3, EMR, Athena, SageMaker)", "GCP Cloud Run", "Docker"],
  Workflow: ["Git", "CI/CD", "Jupyter", "Streamlit", "FastAPI", "Cursor", "Claude Code"],
};
