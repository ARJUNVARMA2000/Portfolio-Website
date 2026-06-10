export type IndexProject = {
  title: string;
  year: string;
  oneLiner: string;
  tech: string[];
  live?: string;
  repo?: string;
};

/** Compact index — these ship as one row each; the deep narratives live in case-studies.ts. */
export const PROJECT_INDEX: IndexProject[] = [
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
  {
    title: "Tweet Bot",
    year: "2026",
    oneLiner:
      "Chrome extension that drafts X replies in three rhetorical angles — image-aware context extraction, voice learning from selections, streaming output.",
    tech: ["Chrome MV3", "OpenRouter"],
    repo: "https://github.com/ARJUNVARMA2000/tweet-bot",
  },
  {
    title: "Video Speed Controller",
    year: "2025",
    oneLiner:
      "Fine-grained playback control (0.1×–16×) that persists per-site and survives player resets; published on the Chrome Web Store.",
    tech: ["Chrome MV3", "MutationObserver"],
    live: "https://chromewebstore.google.com/detail/video-speed-controller-pr/mahfenfglifhcipcpobblpgdaefigpee",
    repo: "https://github.com/ARJUNVARMA2000/Video-Speed-Controller-extension",
  },
];
