# Arjun Varma — Portfolio

The source for [arjun-varma.com](https://arjun-varma.com): an editorial portfolio for my data science, machine learning, forecasting, and agentic-systems work.

[Live site](https://arjun-varma.com) · [LinkedIn](https://www.linkedin.com/in/varma-arjun/) · [GitHub](https://github.com/ARJUNVARMA2000)

## What is here

- Evidence-led case studies with stated metric provenance
- DEUCE tennis forecasting across 87,957 ATP/WTA walk-forward matches, including model evaluation, market comparisons, and product views
- Propensity scoring, explainable next-best engagement, and LLM decision support from Novo Nordisk, plus production healthcare ML and real-world evidence work from ZS Associates
- Interactive project figures for DEUCE, the Airbnb Data Analyst Agent, ClaimReady, and BTC early detection
- A compact index of other shipped products, including GAFFER's walk-forward World Cup benchmark and ClassPulse
- An optional portfolio chat that answers from the same structured content used by the site
- Responsive navigation, reduced-motion support, project-specific social cards, and structured metadata

## Featured case studies

1. [DEUCE Tennis Forecast](https://arjun-varma.com/work/deuce-tennis-forecast) — surface-aware Elo, opponent-adjusted point modeling, calibrated XGBoost, and Monte Carlo tournament simulation
2. [Airbnb Data Analyst Agent](https://arjun-varma.com/work/airbnb-data-analyst-agent) — a reusable multi-agent analytics copilot for planned, validated, cited SQL analysis across pluggable warehouses
3. [Biliary Tract Cancer Early Detection](https://arjun-varma.com/work/btc-early-detection) — leakage-safe early identification over large-scale claims data
4. [Filing Intelligence RAG](https://arjun-varma.com/work/filing-intelligence-rag) — evidence-first financial research across 128 documents with page/line citations, highlighted PDF verification, and 72 automated checks

## Stack

- Next.js 14 and TypeScript
- Tailwind CSS
- GSAP, ScrollTrigger, and Lenis
- Vercel AI SDK with an OpenRouter-compatible chat endpoint
- Vercel Analytics

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

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
lib/resume-context.ts        generated chat context and response rules
public/resume.pdf            public resume
```

Most updates should begin in `content/`. The homepage, case-study routes, sitemap, and chat context consume those shared records.

## Checks

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Deployment

The site is configured for Vercel. Add the chat environment variables in the project settings if the chat should be enabled in production; the rest of the site is statically generated.
