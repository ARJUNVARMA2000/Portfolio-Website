# Arjun Varma — Portfolio

A modern, responsive portfolio website built with Next.js 14, featuring an AI-powered chatbot, real-time GitHub activity, animated UI components, and dark/light theme support.

**[Live Demo](https://arjunvarma.com)** · **[LinkedIn](https://www.linkedin.com/in/varma-arjun/)** · **[GitHub](https://github.com/ARJUNVARMA2000)**

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## Features

### AI-Powered Chat Assistant
- **Conversational AI** that answers questions about my experience, projects, and skills
- Powered by OpenRouter with GPT-4o-mini (configurable)
- RAG-style context injection with resume information
- Suggested questions and markdown-rendered responses

### Interactive Sections
- **Hero** — Animated typing effect cycling through roles (Data Scientist, ML Engineer, AI Developer)
- **Timeline** — Visual journey through education and career milestones
- **Experience** — Detailed work history at ZS Associates with achievements
- **Projects** — Featured case studies with expandable modals covering problem, approach, solution, and impact
- **Skills** — Technical skill showcase with categorized groupings
- **GitHub Activity** — Real-time feed of recent commits and repositories via GitHub API
- **FPL Card** — Fantasy Premier League stats (Top 1% finisher for 4 consecutive years)
- **Contact** — Direct email and social links

### Technical Highlights
- **Dark/Light Mode** — System-aware theme with manual toggle (next-themes)
- **Smooth Animations** — Framer Motion for page transitions, scroll reveals, and micro-interactions
- **Responsive Design** — Mobile-first layout that works beautifully on all devices
- **Edge Runtime** — Chat API runs on Edge for low-latency responses
- **SEO Optimized** — Proper meta tags and semantic HTML structure

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **AI/Chat** | Vercel AI SDK, OpenRouter API |
| **Markdown** | react-markdown, remark-gfm |
| **Icons** | react-icons |
| **Theming** | next-themes |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ARJUNVARMA2000/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with the following:

```env
# Required for AI Chat functionality
OPENROUTER_API_KEY=your_openrouter_api_key

# Optional: Override default model (defaults to openai/gpt-4o-mini)
OPENROUTER_MODEL=openai/gpt-4o-mini

# Optional: For OpenRouter attribution
OR_SITE_URL=https://your-domain.com
OR_APP_NAME=Arjun Varma Portfolio
```

Get your OpenRouter API key at [openrouter.ai](https://openrouter.ai/).

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## Project Structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # AI chat endpoint (Edge)
│   ├── globals.css           # Tailwind + custom styles
│   ├── layout.tsx            # Root layout with theme provider
│   └── page.tsx              # Main page with all sections
├── components/
│   ├── About.tsx             # About me section
│   ├── ChatWidget.tsx        # AI chat floating widget
│   ├── Contact.tsx           # Contact form/links
│   ├── Experience.tsx        # Work experience cards
│   ├── Footer.tsx            # Site footer
│   ├── FPLCard.tsx           # Fantasy Premier League stats
│   ├── GitHubActivity.tsx    # Live GitHub feed
│   ├── Hero.tsx              # Hero section with typing effect
│   ├── Loader.tsx            # Initial page loader
│   ├── Navbar.tsx            # Navigation bar
│   ├── Projects.tsx          # Project cards with case study modals
│   ├── Skills.tsx            # Technical skills grid
│   ├── ThemeProvider.tsx     # Dark/light theme context
│   ├── ThemeToggle.tsx       # Theme switch button
│   └── Timeline.tsx          # Visual timeline component
├── lib/
│   ├── resume-context.ts     # AI chat system prompt & context
│   └── utils.ts              # Utility functions
└── public/
    └── resume.pdf            # Downloadable resume
```

---

## Featured Projects

### BTC Cancer Early Detection
ML model predicting Bile Tract Cancer diagnoses from 250M patient claims, addressing 45-day data lag with advanced clustering techniques.

**Tech:** XGBoost, K-means, NLP Clustering, SHAP, MLflow, PySpark

### Financial RAG Chatbot
LLM-powered chatbot answering questions about company financials from SEC filings with 4.5/5 quality score.

**Tech:** Python, LangChain, ChromaDB, FastAPI, Streamlit, GPT-4

### Scene-AI
AI-powered scene understanding application deployed on Railway for real-time image analysis.

**Tech:** Python, PyTorch, FastAPI, Railway

### Agricultural Product Classification
RAG product-classification system for a Series-B East African agtech achieving 99% accuracy.

**Tech:** Python, GPT-4, RAG, REST API

---

## Customization

### Updating Content
- **Resume/About:** Edit `lib/resume-context.ts` and component files
- **Projects:** Modify the `projects` array in `components/Projects.tsx`
- **Experience:** Update `components/Experience.tsx`
- **Skills:** Edit `components/Skills.tsx`

### Styling
- **Colors:** Modify CSS variables in `app/globals.css`
- **Theme:** Adjust Tailwind config in `tailwind.config.ts`

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ARJUNVARMA2000/portfolio)

1. Import your repository to Vercel
2. Add environment variables (`OPENROUTER_API_KEY`)
3. Deploy

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with `npm run build && npm start`

---

## About Me

**Arjun Varma** — MS Data Science @ Columbia University | Advanced Data Science Consultant @ ZS Associates

I build intelligent systems with ML, Deep Learning & AI for Fortune 500 healthcare clients. Currently open to **Summer 2026 internships** in Data Science, ML Engineering, or Quant roles.

### Contact
- **Email:** [av3342@columbia.edu](mailto:av3342@columbia.edu)
- **LinkedIn:** [linkedin.com/in/varma-arjun](https://www.linkedin.com/in/varma-arjun/)
- **GitHub:** [github.com/ARJUNVARMA2000](https://github.com/ARJUNVARMA2000)

---

## License

MIT License — feel free to use this as a template for your own portfolio.

---

Built with Next.js, Tailwind CSS, and Framer Motion
