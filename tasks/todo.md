# Premium Motion Rewrite — "Field Notes, Animated"

Plan: `~/.claude/plans/i-need-cool-animations-peppy-umbrella.md` (approved)
Previous rebuild (precision-instrument) review preserved in git history of this file.

## Phase 0 — Foundation
- [x] Install gsap@3.15, @gsap/react@2.1, lenis@1.3
- [x] `lib/gsap.ts` (plugin registration + motion constants)
- [x] `components/motion/smooth-scroll.tsx` (Lenis provider + useLenis + hash anchors + route-change refresh)
- [x] `app/globals.css` (removed scroll-behavior/.reveal; added grain/dot-grid/u-line/ghost-num/nav-shell/caret/trace-scrub + tokens)
- [x] `app/layout.tsx` (SmoothScroll wrapper + grain div)
- [x] `app/template.tsx` (enter transition + ScrollTrigger.refresh)

## Phase 1 — Motion primitives (`components/motion/`)
- [x] split-reveal.tsx · reveal.tsx · draw-rule.tsx · counter.tsx
- [x] parallax.tsx · marquee.tsx (velocity-reactive) · magnetic.tsx · scramble.tsx

## Phase 2 — Chrome
- [x] nav.tsx (hide-on-scroll, condense border, /work progress hairline, magnetic ask, mount stagger)
- [x] footer.tsx (availability marquee, big SplitReveal "Let's talk.", dot-grid, magnetic email)
- [x] section.tsx (DrawRule + ScrambleLabel)

## Phase 3 — Home
- [x] hero.tsx (fonts-ready timeline: role scramble → h1 char mask rise → portrait clip-path → contact stagger)
- [x] work-list.tsx (parallax ghost numerals, metric counters, hover wash/slide/arrow)
- [x] timeline.tsx (scrubbed accent rail + back.out checkpoint nodes)
- [x] about.tsx (scrub-fill quote, dual velocity-reactive skill marquees)
- [x] project-index.tsx (stagger reveal, scramble years, arrow nudges)

## Phase 4 — Case studies
- [x] article.tsx (mount h1 SplitReveal, per-section draws/scrambles, prose stagger)
- [x] cited-metric.tsx NEW (count-up → *n citation pop → edge draw + provenance scramble); metric-strip.tsx deleted
- [x] fact-sheet.tsx · pager.tsx (CSS wash wipe)

## Phase 5 — Signature pieces
- [x] multi-agent-diagram.tsx (DrawSVG: question → bus → agents stagger → warehouse → packet traversal → cited answer)
- [x] trace-replay.tsx 2.0 (latency-mapped GSAP timeline, ScrambleText decode, latency bars, bus rail + packet, scrubber, autoplay-once)
- [x] ask-terminal.tsx (phase machine open/close timelines, title scramble, chip stagger, caret, scramble shimmer; useChat state preserved)

## Phase 6 — Verification
- [x] Dev-server walk: /, case study, cross-page /#work hash scroll, 3 navigation cycles → 0 stuck-hidden elements
- [x] TraceReplay: autoplay, restart→0 steps, next→1 step, scrub-to-end→9 steps+summary, run-tab switch resets
- [x] Diagram: bus drawn (dashoffset 0), 5 boxes visible, output text landed
- [x] Chat: open (chips+caret+title), Escape → exit anim → unmount
- [x] Mobile 375px: no horizontal overflow, ghost numerals hidden
- [x] `npm run build`: clean, 4 slugs SSG, 165 kB first load on /
- [x] SSG HTML completeness: name/lede/metrics/provenance/trace steps/summary all in static HTML
- [x] Reduced motion: kill-switch + motion-reduce rules in live CSS bundle; hidden states JS-only inside MOTION_OK (static page = SSG HTML, proven complete)

## Review

- Complete presentation-layer rewrite on the light editorial canvas: GSAP (ScrollTrigger, SplitText, DrawSVG, ScrambleText) + Lenis. Content layer (`content/*.ts`), chat API, and resume-context untouched.
- House motifs shipped: every rule draws itself, serif masks rise, mono labels decode, numbers count up and cite themselves, paper grain + dot-grid atmosphere.
- Signature rewrites: TraceReplay 2.0 (timeline engine with latency-proportional pacing, bus rail packet, native-range scrubber, autoplay-once-in-view) and CitedMetrics ("claims that prove themselves" three-beat sequence).
- A11y: reduced-motion = full static page (no Lenis, no hidden states, transport hidden, marquees wrap); SplitText aria:auto; counters/scramble SSR real values; scrubber is a native range input.
- Verified: typecheck, lint, prod build, SSG HTML content, live behavioral walk of all interactive pieces, mobile overflow, nav-cycle leak check.
- Note: preview window became occluded mid-session (Chrome throttles rAF when hidden) — screenshots beyond the captured set were blocked; all remaining verification done via DOM-state evals.
- Known trade-off: first-load JS on / rose 94 kB → 165 kB (GSAP+plugins+Lenis, client chunks only); SSG and SEO unaffected.

## 2026-06-12 — Copy de-cringe (hero + about)

Survey of admired portfolios (Rauno Freiberg, Emil Kowalski, Lee Robinson, Eugene Yan, Chip Huyen, Lilian Weng, et al.) showed the register: flat facts, employer names carry weight, zero self-evaluation.

- [x] Hero lede: dropped accent-highlighted "cite their sources" tagline styling; plain first person
- [x] Hero credentials: removed "Fortune-500", "shipping production ML"; plain facts (Novo Nordisk, Columbia, ZS)
- [x] About: replaced self-quote epigraph with plain statement ("I work on the part of machine learning that starts after the demo."); ScrubQuote → ScrubStatement (blockquote → p, animation unchanged)
- [x] About paragraph: cut "cite their own homework" / "aren't pretty on a slide" cuteness
- [x] Verified in preview: new copy renders in hero + about, no dev overlay, animations intact

## 2026-06-13 — Work entries legible as case studies

Problem: visitors couldn't tell the work rows open full case studies. Click targets were only the title text and a small bottom "Read the case study →" link; every other affordance (wash, color, arrow) was hover-only, so on mobile/first-scan nothing signalled it. Scope confined to `components/home/work-list.tsx` (no CSS/content changes).

- [x] Whole-row click target: transparent stretched `<Link absolute inset-0 z-10>` with `aria-label="Read case study: {title}"`; removed the nested title `<Link>` (title is now plain `<h3>`, hover color moved onto the heading)
- [x] Persistent `CASE STUDY ↗` mono tag per row (`.mono-label`, muted at rest → accent on `group-hover`), pinned right via a `flex justify-between` header so it never overlaps the title
- [x] Retired the redundant bottom "Read the case study →" CTA; kept the Airbnb-only `#trace` "replay a recorded run" link
- [x] Fixed z-index stacking trap: GSAP leaves a `transform` on `<p data-line>`, trapping the trace link's `z-20`; moved `relative z-20` onto the `<p>` and added `isolate` to the `<article>` (see lessons.md)

### Review
- Verified via preview DOM evals + screenshots (desktop 730px, mobile 375px): all 4 rows show `CASE STUDY ↗` at rest in muted `#62686e`; overlay covers the full row (`elementFromPoint` over subtitle/metrics/title → overlay anchor → `/work/<slug>`); Airbnb trace link is topmost at its location (stack: `a#trace` → `p z20` → `a(overlay) z10`) so it's not swallowed; mobile tag visible with ~24px gap to the wrapped title, ghost numeral hidden.
- Dev server compiled clean (no errors). Signature elements preserved (ghost numerals, trace replay, metrics/provenance).

## 2026-07-17 - Portfolio audit against current resume and projects

- [x] Inspect the live desktop and mobile experience, navigation, links, and interactive features.
- [x] Compare site content with the current resume, GitHub projects, and updated deployment URLs.
- [x] Review local architecture, performance, accessibility, SEO, and content freshness.
- [x] Produce a prioritized improvement brief without changing the production site.

### Review

- Existing editorial visual system is distinctive and worth preserving; mobile has no horizontal overflow and all published project/demo links return HTTP 200.
- Highest-impact content gaps: the hosted resume predates Novo Nordisk and DEUCE, DEUCE and ClaimReady are absent, and the Novo section does not reflect the current LLM-enabled field-guidance and pre-launch work.
- Recommended selected-work order: DEUCE, Airbnb Data Analyst Agent, BTC Early Detection, and Financial RAG; retain GAFFER at the top of the shipped-project index and move SunCulture into experience/archive treatment.
- Accessibility findings: homepage jumps from h1 to h3, mobile hides all section navigation, the chat dialog lacks a visible close control/focus management, and the footer marquee exposes repeated availability text to assistive technology.
- Technical findings: production build passes at 165 kB first-load JS; the always-mounted chat and global GSAP plugin bundle are optimization candidates. `npm audit --omit=dev` reports 14 production advisories (1 critical, 1 high), led by Next.js 14.2.5; patching to at least 14.2.35 is the immediate low-risk security step.

## 2026-07-17 - Implement portfolio refresh

- [x] Replace the public resume with the verified current PDF.
- [x] Refresh hero, Novo Nordisk, education, availability, and project-index content.
- [x] Add DEUCE as the lead case study, add ClaimReady, and keep SunCulture available as an archived case study.
- [x] Add evidence-first visuals for DEUCE, BTC, and Financial RAG while preserving the existing editorial system.
- [x] Fix mobile navigation, heading hierarchy, chat-dialog accessibility, and marquee screen-reader duplication.
- [x] Harden and lazy-load the public chat; pause continuous motion when hidden or offscreen.
- [x] Patch production dependencies and add canonical metadata, structured data, stable sitemap dates, and project-specific social cards.
- [x] Run format/type/build/audit checks plus desktop/mobile behavioral and link verification.

### Review

- Public resume replaced and visually verified as a single clean page; its DEUCE GitHub and live-site annotations resolve to the current destinations.
- Homepage now leads with DEUCE, followed by Airbnb, BTC, and Financial RAG. ClaimReady was added to the shipped index and the repository README now describes the current site.
- Added DEUCE product screenshots plus forecast, leakage-window, and citation-flow visuals without changing the editorial design language.
- Desktop and 375px mobile checks passed with no horizontal overflow. Mobile sections, chat open/close, focus restoration, body scroll lock, labels, and heading hierarchy were exercised in the browser.
- `npm run lint` and `npm run build` pass. All ten published project/demo links returned HTTP 200. The safe dependency patch removed the critical audit finding; the remaining production high advisory requires a breaking Next.js major upgrade and is intentionally not forced into this portfolio refresh.
