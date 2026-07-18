# Lessons

- A portfolio project is not fully surfaced when its live and GitHub URLs exist only in underlying content or a detail page. Every homepage project presentation should expose clearly labeled, visually prominent destination actions; preserve honest exceptions for proprietary work that has no public repository or deployment.

- When a user asks for an "independent copy" of a collaborative repository, clarify the intended provenance treatment before publishing. Do not remove co-author attribution, required license notices, or commit authorship in order to present shared work as solely authored; offer a clean-room reimplementation or an attributed standalone repository instead.

- Treat the public resume, structured site content, chat context, project URLs, and repository README as one release surface. A portfolio refresh is incomplete if any one of them still describes an older project roster, employer, deployment URL, or site architecture.

- When prioritizing portfolio projects, do not rank solely by benchmark rigor or production scale. Explicitly weight relevance to the target role, technical interaction complexity, quality of the shipped UI, interview discussion value, and how clearly the project demonstrates the candidate's desired specialty. A featured project with weaker current metrics should be improved in place when it is especially relevant to hiring; do not automatically demote it.

- No slogan-y taglines as headlines ("The model is easy; the loop is the product" was rejected as cheesy). Prefer the name set large plus plain, falsifiable claims. Aphorisms are acceptable only as attributed quotes (the desk mantra), never as positioning copy.

- Do not over-specialize this portfolio as healthcare/pharma. Keep the top-level story generic DS/MLE and let domain-specific proof appear inside relevant projects.
- PERMANENT: No metric proof bar / stat strip in the hero, ever — even with provenance footnotes, even if a plan draft includes one. Cut twice (original site, 2026-06 rebuild). The hero sticks to identity and credentials (Novo Nordisk, Columbia, ZS); metrics live inside case studies where they have context.
- When the user asks for a "fundamental redesign," a well-executed conventional pattern is not enough. Before presenting a plan, separate table-stakes from genuinely distinctive mechanisms and name them explicitly — the user challenged "Would this really be unique?" and the honest answer was no until signature mechanisms (replayable agent traces, provenance footnotes) were made first-class.

## GSAP transform traps nested z-index (2026-06-13)
- Symptom: a stretched-link overlay (`absolute inset-0 z-10`) covering a work row swallowed a nested `#trace` link that had `relative z-20` — the overlay painted on top despite the lower z-index. Only happened with motion ON.
- Cause: `Reveal` (`gsap.from([data-line], {y, autoAlpha})`) leaves an inline `transform` on each animated `<p data-line>` after it finishes. A non-`none` transform creates a **stacking context**, so the child link's `z-20` was scoped *inside* the `<p>`, and the `<p>` itself sat at `z-auto` < the overlay's `z-10`.
- Rule: when elevating an interactive child above a stretched-link overlay, put the `z-index` on the element GSAP transforms (the `[data-line]` parent that becomes the stacking-context boundary), not on a deeper descendant. Add `isolate` to the row container so all the z-juggling stays contained per row. Reduced-motion hides the bug (no transform → no trap), so always test with motion on.

## Verifying GSAP+Lenis pages in the preview (2026-06-13)
- This repo's Lenis runs in wrapper-transform mode and the GSAP ticker keeps `requestAnimationFrame` perpetually busy. Result: `preview_screenshot` times out (renderer never reports stable) and, mid-scroll, `getBoundingClientRect` (native-scroll-relative) disagrees with `elementFromPoint` (composited-transform-relative), so hit-tests return `body`/`null`.
- Technique that works: (1) scroll **once** to the target, (2) wait ~2s for Lenis to converge — do **not** re-scroll before reading, (3) override `window.requestAnimationFrame = () => 0` to pin the composited frame. Now screenshots succeed and `elementFromPoint`/`elementsFromPoint` are reliable. (Supersedes the earlier note that screenshots were simply "blocked" — they're recoverable this way.)

## Playwright reuses whatever squats on port 3000 (2026-07-17)
- `playwright.config.ts` sets `reuseExistingServer: !CI`, so a local run will happily test against *any* process already listening on 127.0.0.1:3000 — in this case a completely different app (the Airbnb demo), producing 11/11 "element not found" failures with HTTP 200s.
- Rule: when the whole suite fails on locators that plainly exist, first check what is actually serving the baseURL (`Get-NetTCPConnection -LocalPort 3000` + curl the title). To run against a known-fresh build without killing the squatter, start `next start` on a spare port and point `PLAYWRIGHT_BASE_URL` at it.
- Related: the `hydrates and updates every project instrument` test clicks immediately after the h2 attaches (SSG HTML), which races React hydration under heavy machine load — a lost pre-hydration click polls `aria-pressed` forever. Passes in isolation; rerun before suspecting the app.

## Copy register (2026-06-12)
- User called the hero/about writeup "cringe" — self-aggrandizing copy ("Fortune-500", "shipping production ML", self-quote epigraph, cute phrasings like "cite their own homework").
- Rule: portfolio copy states facts in the register of top personal sites (Rauno, leerob, Eugene Yan): name + what you do + where, plain verbs, no intensifiers, no self-evaluation. Let employer names and the work itself carry the weight. Never quote the user back at themselves as an epigraph.
