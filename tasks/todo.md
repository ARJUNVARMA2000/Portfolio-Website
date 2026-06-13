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
