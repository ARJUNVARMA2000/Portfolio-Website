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

## 2026-07-17 - Homepage Evidence Workbench

### Plan

- [x] Replace the conventional Selected Work list with a scroll-driven desktop evidence workbench for DEUCE, Airbnb, and BTC.
- [x] Build truthful project-specific instruments: signal-path inspection, recorded failure/retry replay, and leakage-window scrubbing.
- [x] Provide a stacked, fully usable mobile and reduced-motion presentation without scroll pinning.
- [x] Keep Financial RAG as a normal case-study entry and make no changes to its application, content, or case-study implementation.
- [x] Preserve keyboard access, project links, semantic headings, and the existing editorial visual language.
- [x] Verify lint, production build, desktop/mobile behavior, reduced motion, link targets, and horizontal overflow.

### Review

- Replaced the first three conventional homepage rows with one responsive, CSS-sticky evidence stage while retaining a single semantic DOM and a naturally stacked mobile layout.
- Added a DEUCE signal-path inspector, a manual Airbnb failure/validator/retry trace replay based on the recorded run, and a BTC relative-index leakage-window scrubber without inventing model outputs, dates, or patient events.
- Financial RAG remains the existing standard case-study entry; its content, route, figure, and application code were not changed.
- Verified keyboard controls and links, reduced-motion fallback, sticky behavior at 1024px and 1440px, stacked behavior at 320px and 375px, and zero horizontal overflow at the narrowest viewport.
- `npx tsc --noEmit --incremental false`, `npm run lint`, and `npm run build` pass. The homepage first-load bundle is 171 kB (approximately 6 kB above the previous recorded build).

## 2026-07-17 - Add ClaimReady to the Evidence Workbench

### Plan

- [x] Add ClaimReady as the fourth workbench system without turning it into a fabricated local case study.
- [x] Build a truthful interactive typed-handoff inspector from the documented four-specialist pipeline.
- [x] Link the workbench entry to the live demo and source repository while keeping Financial RAG unchanged.
- [x] Verify types, lint, production build, desktop/mobile layout, keyboard interaction, and horizontal overflow.

### Review

- Added ClaimReady between Airbnb and BTC with a dedicated typed-handoff inspector covering the Extractor, Defendant Resolver, Jurisdiction Checker, and Drafter stages.
- The inspector uses documented tools, exact schema paths or typed payload labels, and the four packet outputs without presenting the conceptual selector as a recorded run.
- Added external Live Demo and Source actions because ClaimReady has no local case-study route, and removed its duplicate row from More Shipped Work.
- Financial RAG remains the unchanged standard case-study entry after the four interactive workbench systems.
- Verified sticky desktop and stacked 320px mobile layouts, keyboard stage selection, external URLs, packet-strip dividers, and zero horizontal overflow. TypeScript, lint, and production build pass; homepage first-load JS is 172 kB.

## 2026-07-17 - Fork Financial RAG repository

### Plan

- [x] Identify the exact Financial RAG source repository and authenticated destination account.
- [x] Verify the destination does not already contain a conflicting fork or repository name.
- [x] Create the same-account fork equivalent as a standalone Git mirror because GitHub cannot fork a repository back into its existing owner account.
- [x] Verify the repository URL, branch parity, visibility, and collaborator access.

### Review

- Created public repository `ARJUNVARMA2000/Financial-RAG`; the original `ARJUNVARMA2000/Financial-RAG-Chatbot` remains untouched.
- Copied `main` and `Arjun`; destination branch SHAs exactly match the source (`d04b1b1b0ad2cb52ee58512fdd71598886f43039` and `66f7c638aabac0340c933d19a65e770df6744de0`).
- Verified `main` is the default branch and the authenticated owner is the destination's only collaborator. The source collaborator was not copied.
- GitHub accepted the transfer with warnings for two tracked files above its recommended 50 MB size. The temporary bare clone was removed after verification.

## 2026-07-17 - Create local Financial RAG working copy

### Plan

- [x] Confirm `C:\Users\varma\vibe-code\Financial-RAG` does not conflict with an existing folder.
- [x] Clone `ARJUNVARMA2000/Financial-RAG` into the new sibling folder.
- [x] Verify the checked-out branch, remote URL, HEAD commit, and clean working tree.

### Review

- Cloned the personal repository to `C:\Users\varma\vibe-code\Financial-RAG`, outside `Portfolio2` so the repositories remain independent.
- Verified branch `main`, origin `https://github.com/ARJUNVARMA2000/Financial-RAG.git`, and HEAD `d04b1b1b0ad2cb52ee58512fdd71598886f43039` matching GitHub.
- Working tree is clean and ready for changes.

## 2026-07-17 - Production release safeguards and deployment

### Plan

- [x] Audit existing automated checks, deployment configuration, GitHub state, and production linkage.
- [x] Add focused browser regression tests for all Evidence Workbench instruments, responsive layouts, links, and Financial RAG isolation.
- [x] Add a repeatable local/CI verification command and GitHub workflow if no equivalent guard exists.
- [x] Run type, lint, build, end-to-end, and production-server smoke checks.
- [x] Commit only the intended portfolio/test changes, deploy, and verify the public production URL.

### Review

- Added Playwright coverage across desktop Chromium and Mobile Safari for all four workbench instruments, route/link contracts, Financial RAG isolation, sticky/mobile/reduced-motion layouts, overflow, browser errors, and production assets.
- Added `typecheck`, `test:e2e`, and `check` scripts plus GitHub Quality and post-deployment Production smoke workflows.
- Local production build and CI-equivalent browser run pass with 9 tests passed and one intentional duplicate reduced-motion check skipped on mobile.
- Released commits `3875e0f`, `6acc256`, and `a0cc894` to `main`; Vercel Production deployment `5496852158` completed successfully.
- GitHub Quality run `29619911665` and live Production smoke run `29619953452` both passed against `https://arjun-varma.com`.
- Protected `main` with strict required checks `verify` and `Vercel`, enforced for administrators; force pushes and branch deletion remain disabled.

## 2026-07-17 - Point Financial RAG at personal repo + profile README refresh

### Plan

- [x] Verify the new `ARJUNVARMA2000/Financial-RAG` repo and the finrag live demo resolve.
- [x] Update the Financial RAG GitHub URL in content/projects.ts, content/case-studies.ts, and workbench.spec.ts.
- [x] Update the GitHub profile README (github-profile-repo clone): Financial RAG link → personal repo, Novo internship no longer "Incoming"; verify all README links; push.
- [x] Verify: build + targeted Playwright destination/placement tests.

### Review

- Live demo returns 200; all eight profile-README links return 200. Profile README pushed as 48eb680 to ARJUNVARMA2000/ARJUNVARMA2000.
- Portfolio now links Financial RAG to github.com/ARJUNVARMA2000/Financial-RAG on the homepage row and case-study page; destination tests pass on desktop and mobile.
- Open item: the profile's pinned repositories still include Financial-RAG-Chatbot (pins have no public API; swap to Financial-RAG via the profile's "Customize your pins" if desired).

## 2026-07-17 - Move Financial RAG to More Shipped Work

### Plan

- [x] Remove the Financial RAG featured row from Selected Projects (work-list) and delete the now-unused FeaturedWorkRow component.
- [x] Add Financial RAG to PROJECT_INDEX (top of the list, 2025, with live/repo/case-study links) and render the case-study action in the index row.
- [x] Update workbench.spec.ts: Financial RAG assertions move from #work to #projects; shipped-row count 4 → 5.
- [x] Verify: tsc, lint, build, full Playwright suite, DOM walk of both sections.

### Review

- Selected Projects now contains exactly the four interactive systems; Financial RAG leads More Shipped Work with Live website, GitHub, and Case study actions, so /work/financial-rag-chatbot stays reachable.
- FeaturedWorkRow had no other consumer and was deleted.
- tsc, lint, and build pass; Playwright 11 passed + 1 intentional mobile skip against a fresh production server on port 3210 (port 3000 is occupied by the unrelated Airbnb demo app).

## 2026-07-17 - Selected Projects rename + box copy legibility

### Plan

- [x] Rename the homepage section from Evidence Workbench to Selected Projects (section label, README, test heading regex).
- [x] Simplify the wrapper: one-line intro, drop the scroll legend, drop the `evidence.workbench` title-bar prefix, `selected system` → `selected project`, plain instrument labels/statuses.
- [x] DEUCE box: honest lede ("see what it adds"), `selected signal`, clearer model→probability footer.
- [x] Airbnb box: add the DB success step to the preview (7 steps) and label the corrected query / result rows.
- [x] ClaimReady box: `specialist pipeline` framing, `stage`/`fields added` labels, human-readable payload chips.
- [x] BTC box: `evaluation window` kicker and unambiguous 45/30-day lede.
- [x] Update workbench.spec.ts assertions (heading, step counts, chip text).
- [x] Verify: tsc, lint, build, Playwright suite, dev-server walk at desktop + 375px, leftover-string grep.

### Review

- Copy-only change: every user-facing string in the section wrapper and the four instruments was rewritten for a first-time visitor; layout, sticky staging, interactions, and the pending ProjectActions work were untouched. Internal identifiers (`EvidenceWorkbench`, `workbench-` aria ids, file names) intentionally kept to avoid churn.
- Key fixes: DEUCE lede no longer promises a "path" the widget doesn't draw; the Airbnb preview now includes the DB success row so the failure→recovery arc completes on screen (7 steps); ClaimReady dropped `typed handoff ledger`/`defendant.dos_*` jargon; BTC's 45/30-day sentence is unambiguous.
- Verified: tsc, lint, and prod build clean (172 kB first load on /); Playwright 11 passed + 1 intentional skip; dev-server walk confirmed all four instruments hydrate and update at 1024px and 375px with zero horizontal overflow; grep shows no leftover user-facing workbench language.
- Deviation: first e2e run falsely failed 11/11 because a different app (Airbnb demo) was listening on port 3000 and `reuseExistingServer` tested against it; reran against a dedicated `next start` on port 3210 via `PLAYWRIGHT_BASE_URL`. One load-induced hydration-race flake in `hydrates and updates every project instrument` passed in isolation and on the full rerun.

## 2026-07-17 - Prominent project destinations

### Plan

- [x] Inventory every homepage project and its public live/GitHub destinations.
- [x] Add a consistent, prominent action treatment to featured work, Financial RAG, and the shipped-project index.
- [x] Preserve case-study navigation and clearly distinguish projects that cannot have public source/live links.
- [x] Add regression coverage for link presence, labels, targets, and responsive layout.
- [x] Run type, lint, build, and focused browser verification.

### Review

- Added reusable, high-contrast Live Website, GitHub, and Case Study actions across the Evidence Workbench, Financial RAG row, shipped-project index, and case-study headers.
- DEUCE now identifies itself as a maintained public product with hourly data refreshes and daily model retraining directly beside its live-site action.
- Kept the portfolio honest for non-public work: BTC and SunCulture state that their public demo/source is unavailable; SunCulture retains a clearly labeled company-site link.
- Verified visual hierarchy and wrapping at 1440px and 390px with no horizontal overflow. TypeScript, lint, production build, and the focused Playwright suite pass (11 passed, 1 intentional mobile reduced-motion skip).
## 2026-07-18 - Publish Filing Intelligence RAG across portfolio surfaces

### Plan

- [x] Verify the Filing Intelligence RAG README, repository metadata, CI, deployment, and local/remote parity.
- [x] Replace the stale Financial RAG project name, repository, live URL, description, stack, and evidence claims in the portfolio content and GitHub profile README.
- [x] Preserve and validate the existing unpublished portfolio improvements while excluding unrelated generated task artifacts.
- [x] Commit and push the GitHub profile README and portfolio website to their own repositories.
- [x] Verify the Vercel production deployment, public project links, GitHub profile rendering, CI, and repository parity.

### Acceptance criteria

- The profile and portfolio show `Filing Intelligence RAG`, link to `ARJUNVARMA2000/filing-intelligence-rag`, and open the live Filing Intelligence RAG workspace.
- No active portfolio or profile content links to the shared Financial RAG repository or its deployment.
- Portfolio typecheck, lint, production build, end-to-end tests, GitHub Actions, Vercel deployment, and public smoke checks pass.
- The Filing Intelligence RAG, profile README, and portfolio repositories are clean and synchronized with their remotes.

### Review

- Filing Intelligence RAG remains isolated in `ARJUNVARMA2000/filing-intelligence-rag`; its README, GitHub default branch, Cloud Run frontend, and Cloud Run API were verified against commit `c52df97`.
- The GitHub profile README was published at commit `9bc64cd` and now links the project name, standalone repository, and live workspace.
- Portfolio PR #4 merged as `dd04085`; both protected-branch Quality checks, the Vercel production deployment, and the public production smoke workflow passed.
- Public checks returned 200 for the homepage, new case-study route, Filing Intelligence RAG frontend, and API health endpoint. The old `/work/financial-rag-chatbot` route returns a permanent 308 redirect to `/work/filing-intelligence-rag`.
- The portfolio repository homepage metadata now uses `https://arjun-varma.com`. Active portfolio and profile content contains the new project name and URLs; the shared Financial RAG repository was not changed.
- All tracked portfolio work is synchronized with GitHub. The pre-existing untracked `tasks/hatch-pip-run/` generation workspace was intentionally preserved and excluded from the release.

## 2026-07-21 - Add unlisted second resume cut at /resume2

### Plan

- [x] Add the newer resume PDF to `public/` alongside the existing one.
- [x] Serve it at the extensionless `/resume2` URL via a Next.js rewrite.
- [x] Confirm `/resume.pdf` and its site links are untouched.

### Review

- `public/resume2.pdf` added; `next.config.mjs` rewrites `/resume2` -> `/resume2.pdf`, matching the existing `/1984` pattern.
- Verified: `/resume2` returns 200 `application/pdf`, 41,643 bytes, body starts `%PDF-1.4`, and its sha256 is byte-identical to the source file. `/resume.pdf` still returns the prior 63,759-byte file.
- Deliberately unlisted: not in `app/sitemap.ts`, not linked from nav, footer, hero, or the chat system prompt. `SITE.resume` still points at `/resume.pdf`.
- Two resume versions are now live. This cut fills in the Novo Nordisk bullets, moves BTC early detection from Projects into the ZS Advanced Data Science role, drops GAFFER, reorders projects, and adds a Reporting skills line.
