# Arjun Varma - Portfolio Website

A futuristic cyberpunk-themed portfolio website with an AI-powered chat assistant that can answer questions about my professional background.

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## Features

- **Cyberpunk Design**: Neon colors, glitch effects, animated backgrounds
- **AI Chat Assistant**: GPT-4o powered chat that answers questions about my experience
- **Responsive**: Looks great on all devices
- **Interactive**: Smooth animations with Framer Motion
- **SEO Optimized**: Meta tags and Open Graph support
- **Easy Deployment**: One-click deploy to Vercel

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Vercel AI SDK + OpenAI GPT-4o
- **Icons**: React Icons
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ARJUNVARMA2000/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create your environment file:
```bash
# Create .env.local and add your OpenAI API key
echo "OPENAI_API_KEY=sk-your-api-key-here" > .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | Yes | Your OpenRouter API key for the chat feature |
| `OPENROUTER_MODEL` | No | Override model (default: `openai/gpt-5.2`) |
| `OR_SITE_URL` | No | Optional attribution header `HTTP-Referer` for OpenRouter |
| `OR_APP_NAME` | No | Optional attribution header `X-Title` for OpenRouter |

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add your environment variables:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - (optional) `OPENROUTER_MODEL`: `openai/gpt-5.2`
5. Click Deploy

That's it! Your site will be live in minutes.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ARJUNVARMA2000/portfolio)

## Project Structure

```
Portfolio2/
├── app/
│   ├── api/chat/route.ts    # AI chat API endpoint
│   ├── globals.css          # Global styles + cyberpunk theme
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── Hero.tsx             # Hero section with glitch effects
│   ├── About.tsx            # About me + education
│   ├── Experience.tsx       # Work experience timeline
│   ├── Projects.tsx         # Project showcase
│   ├── Skills.tsx           # Technical skills grid
│   ├── FPLCard.tsx          # Fantasy Premier League card
│   ├── Contact.tsx          # Contact form + social links
│   ├── ChatWidget.tsx       # AI chat assistant
│   ├── Navbar.tsx           # Navigation bar
│   └── Footer.tsx           # Footer
├── lib/
│   ├── resume-context.ts    # AI system prompt with resume data
│   └── utils.ts             # Utility functions
├── public/
│   └── resume.txt           # Downloadable resume (included)
└── ...config files
```

## Customization

### Updating Content

1. **Personal Info**: Edit `lib/resume-context.ts` to update the AI's knowledge
2. **Experience**: Modify the `experiences` array in `components/Experience.tsx`
3. **Projects**: Update the `projects` array in `components/Projects.tsx`
4. **Skills**: Edit `skillCategories` in `components/Skills.tsx`

### Changing Theme Colors

Edit the `colors.cyber` section in `tailwind.config.ts`:

```typescript
colors: {
  cyber: {
    black: "#0a0a0f",
    cyan: "#00fff5",    // Primary color
    magenta: "#ff00ff", // Accent color
    yellow: "#ffff00",  // Secondary accent
  },
},
```

## Resume

The template ships with `public/resume.txt` and the UI links to it by default.

If you prefer a PDF, add `public/resume.pdf` and update the links in `components/Navbar.tsx` and `components/Contact.tsx`.

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

- **Email**: av3342@columbia.edu
- **LinkedIn**: [linkedin.com/in/vvarma-arjun](https://linkedin.com/in/vvarma-arjun)
- **GitHub**: [github.com/ARJUNVARMA2000](https://github.com/ARJUNVARMA2000)

---

Built with ❤️ using Next.js and AI
