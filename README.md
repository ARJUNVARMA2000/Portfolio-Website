# Arjun Varma — Portfolio

The source for [arjun-varma.com](https://arjun-varma.com): an editorial portfolio for my data science, machine learning, forecasting, and agentic-systems work.

[Live site](https://arjun-varma.com) · [LinkedIn](https://www.linkedin.com/in/varma-arjun/) · [GitHub](https://github.com/ARJUNVARMA2000)

## What is here

- Evidence-led case studies with stated metric provenance
- DEUCE tennis forecasting across ATP and WTA, including model evaluation and product views
- Production healthcare ML work from ZS Associates and current pre-launch / next-best-engagement work at Novo Nordisk
- An interactive evidence workbench for DEUCE, the Airbnb Data Analyst Agent, ClaimReady, and BTC early detection
- A compact index of other shipped products, including GAFFER and ClassPulse
- An optional portfolio chat that answers from the same structured content used by the site
- Responsive navigation, reduced-motion support, project-specific social cards, and structured metadata

## Featured case studies

1. [DEUCE Tennis Forecast](https://arjun-varma.com/work/deuce-tennis-forecast) — surface-aware Elo, point-level modeling, calibrated XGBoost, and Monte Carlo tournament simulation
2. [Airbnb Data Analyst Agent](https://arjun-varma.com/work/airbnb-data-analyst-agent) — five specialized agents for planned, validated, cited SQL analysis
3. [Biliary Tract Cancer Early Detection](https://arjun-varma.com/work/btc-early-detection) — leakage-safe early identification over large-scale claims data
4. [Financial RAG Chatbot](https://arjun-varma.com/work/financial-rag-chatbot) — SEC-filing question answering with line-level citations and evaluation

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
