# Arjun Varma — Portfolio

The source for [arjun-varma.com](https://arjun-varma.com): an editorial portfolio for my data science, machine learning, forecasting, and agentic-systems work.

[Live site](https://arjun-varma.com) · [LinkedIn](https://www.linkedin.com/in/varma-arjun/) · [GitHub](https://github.com/ARJUNVARMA2000)

## What is here

- Visual project previews with contribution, decision, result, and limitation summaries
- DEUCE tennis forecasting across 87,957 ATP/WTA walk-forward matches, including model evaluation, market comparisons, and product views
- Propensity scoring, explainable next-best engagement, and LLM decision support from Novo Nordisk, plus production healthcare ML and real-world evidence work from ZS Associates
- Expandable evidence and architecture figures for DEUCE, the Airbnb Data Analyst Agent, ClaimReady, and BTC early detection
- An answer-first recorded agent walkthrough, with inspectable failed queries, validation, and recovery
- One searchable directory covering all nine featured and secondary projects, including GAFFER and ClassPulse
- An optional portfolio chat grounded in the same ownership, narratives, and limitations as the site, with bounded history and conversation recovery
- Responsive navigation, reduced-motion support, project-specific social cards, and structured metadata

## Featured case studies

1. [DEUCE Tennis Forecast](https://arjun-varma.com/work/deuce-tennis-forecast) — surface-aware Elo, opponent-adjusted point modeling, calibrated XGBoost, and Monte Carlo tournament simulation
2. [Airbnb Data Analyst Agent](https://arjun-varma.com/work/airbnb-data-analyst-agent) — a reusable multi-agent analytics copilot for planned, validated, cited SQL analysis across pluggable warehouses
3. [Biliary Tract Cancer Early Detection](https://arjun-varma.com/work/btc-early-detection) — leakage-safe early identification over large-scale claims data
4. [Filing Intelligence RAG](https://arjun-varma.com/work/filing-intelligence-rag) — evidence-first financial research across 128 documents with page/line citations, highlighted PDF verification, and 72 automated checks

## Stack

- Next.js 16, React 19, and TypeScript
- Tailwind CSS
- GSAP, ScrollTrigger, and Lenis
- Vercel AI SDK with an OpenRouter-compatible chat endpoint
- Vercel Analytics

## Run locally

Requirements: Node.js 24 LTS and npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Development and production builds explicitly use Next's supported Webpack compiler,
which avoids Turbopack's child-process port restrictions in sandboxed workspaces.
The existing Google Fonts are downloaded at build time and self-hosted in the output.

The portfolio works without chat credentials. To enable chat, set:

```env
OPENROUTER_API_KEY=your_key
OPENROUTER_MODEL=openai/gpt-4o-mini
OR_SITE_URL=http://localhost:3000
OR_APP_NAME=Arjun Varma Portfolio
```

## Content and structure

```text
app/                         routes, metadata, API, and social images
components/home/             homepage sections
components/case-study/       case-study layout and metric provenance
components/diagrams/         evidence and system visuals
components/motion/           reusable motion primitives
content/                     structured site, experience, and project data
content/project-catalog.ts   complete project registry and featured selection
lib/chat-contract.ts         shared input/history limits and recovery messages
lib/resume-context.ts        generated chat context and response rules
public/resume.pdf            public resume
```

Most updates should begin in `content/`. The homepage, case-study routes, sitemap, and chat context consume those shared records.

## Checks

```bash
npm run check
npm audit --omit=dev
```

The check command runs route type generation, TypeScript, lint, mocked-provider chat
contract tests, a production build, and desktop Chromium/mobile WebKit regressions.
The browser suite expects a production server. To use a dedicated server rather
than an existing process on port 3000, start it on another port and set
`PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100` for `npm run test:e2e`.

## Deployment

The site is configured for Vercel; package engines and CI target Node 24. Add the chat environment variables in the project settings if the chat should be enabled in production; the main content pages are statically generated.
