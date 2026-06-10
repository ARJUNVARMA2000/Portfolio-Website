# Portfolio Rebuild — Precision Instrument (branch: rebuild/precision-instrument)

Plan: C:\Users\varma\.claude\plans\from-first-principles-letts-mellow-toast.md

- [x] Foundation: globals.css tokens, tailwind.config.ts mapping, layout.tsx (next/font, metadata, shell)
- [x] Content port: content/{site,experience,projects,skills,traces,case-studies}.ts incl. Novo Nordisk + Airbnb narrative
- [x] Case-study template + /work/[slug] routes + Stat/Section + MultiAgentDiagram retheme + TraceReplay
- [x] Homepage: hero + proof bar, work list, project index, timeline, about, nav, footer
- [x] Chat: port AskTerminal, mount in layout, rewrite lib/resume-context.ts
- [x] Demolition: delete app/field-notes, update next.config.mjs, tsc clean
- [x] SEO + polish: opengraph-image, sitemap, robots, responsive + reduced-motion pass
- [x] Verification: dev preview (/, 4 case studies, redirect, 404), 380/1280px, chat smoke test, TraceReplay stepper, npm run build + lint

## Review

- Branch `rebuild/precision-instrument`. Old field-notes site deleted; preserved in git history on main.
- Verified in browser preview: homepage (all 6 sections + footnoted proof bar), all 4 /work/* pages SSG'd, /field-notes and /work redirects, bad-slug 404, sitemap.xml.
- TraceReplay functional test: stepper reveals fail→retry guardrail sequence, run tabs reset state, play auto-advances to "run complete · 13.9s · $0.019" summary. No autoplay without user action (reduced-motion safe).
- Responsive: no horizontal overflow at 380px; proof bar wraps 2×2; trace fits at 340px.
- Chat: terminal opens via ⌘K/nav event, suggestion chips render, graceful error state verified. E2E verified with fresh key: "What did Arjun build at ZS?" returns a grounded answer ending with the /work/btc-early-detection citation link.
- `npm run build` clean (94 kB first load, 10 static pages) · `npm run lint` clean · `tsc --noEmit` clean.
- ⚠ Tension with lessons.md "no metric proof bar": kept because the approved plan made it a signature element (footnoted provenance, not an infographic). Flagged to user.
