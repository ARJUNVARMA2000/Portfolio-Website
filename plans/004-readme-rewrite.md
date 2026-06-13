# Plan 004: Rewrite README.md to describe the site that actually exists

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7444f1b..HEAD -- README.md package.json`
> NOTE: written against the working tree on 2026-06-12. If README.md no longer
> mentions "Framer Motion" or "FPL", someone already rewrote it — STOP and
> report.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (soft: if Plan 003 landed, document its `typecheck` script)
- **Category**: docs
- **Planned at**: commit `7444f1b`, 2026-06-12

## Why this matters

The README describes a previous incarnation of this portfolio. It claims the
site uses Framer Motion, next-themes (dark/light mode), react-icons, a GitHub
activity feed, an FPL stats card, and "typing effect" hero — none of which
exist in the current codebase (June 2026 "precision-instrument" rebuild on
GSAP + Lenis). It also links the live site as `arjunvarma.com` while the code's
canonical URL is `https://arjun-varma.com`. For a portfolio repo whose audience
is recruiters and engineers, a README that misdescribes the project is worse
than no README. This plan replaces it with an accurate one.

## Current state

- `README.md` — stale. Evidence of wrongness (lines from the live file):
  - line 3: "featuring an AI-powered chatbot, real-time GitHub activity,
    animated UI components, and dark/light theme support"
  - line 5: live link to `https://arjunvarma.com` (note: no hyphen)
  - lines 28-29: "GitHub Activity — Real-time feed…", "FPL Card — Fantasy
    Premier League stats…"
  - line 33: "Dark/Light Mode — … (next-themes)"
  - lines 43-53: tech-stack table listing Framer Motion, react-icons,
    next-themes — none are in `package.json`.

Ground truth to write the new README from (verify each in the repo, do not
trust this plan blindly):

- **Stack** (`package.json`): Next.js 14 App Router, TypeScript 5, Tailwind
  CSS 3, GSAP 3.15 + @gsap/react + Lenis (smooth scroll + scroll-triggered
  motion), Vercel AI SDK v3 (`ai` + `@ai-sdk/openai` pointed at OpenRouter),
  react-markdown + remark-gfm (case-study prose, rendered server-side),
  @vercel/analytics. Deployed on Vercel.
- **Canonical URL** (`content/site.ts:3`): `https://arjun-varma.com` — use
  this everywhere in the README. (If the owner later says the real domain is
  `arjunvarma.com`, the fix belongs in `content/site.ts`, not just README.)
- **What the site is** (verifiable in `app/` and `components/`):
  - Single-page home (hero, work list, timeline, about, project index) +
    four statically generated case-study pages at `/work/[slug]`
    (`app/work/[slug]/page.tsx`, content in `content/case-studies.ts`).
  - Case studies carry cited metrics with provenance footnotes
    (`components/case-study/cited-metric.tsx`) — claims link their sources.
  - Signature interactive pieces: an animated multi-agent architecture diagram
    (`components/diagrams/multi-agent-diagram.tsx`) and "TraceReplay", a
    latency-mapped agent-trace player with scrubber and step controls
    (`components/diagrams/trace-replay.tsx`).
  - "Ask" terminal (Ctrl/⌘+K or `/`): chat grounded in the site's own content
    via a system prompt built from `content/*.ts` (`lib/resume-context.ts`),
    served by an Edge route (`app/api/chat/route.ts`) through OpenRouter.
  - Motion system: GSAP + Lenis with full `prefers-reduced-motion` support
    (reduced motion = fully static page).
  - SEO: metadata + OG image route (`app/opengraph-image.tsx`), sitemap,
    robots.
- **Env vars** (`.env.example` — already accurate, mirror it):
  `OPENROUTER_API_KEY` (required for chat), `OPENROUTER_MODEL` (optional,
  default `openai/gpt-4o-mini`), `OR_SITE_URL` / `OR_APP_NAME` (optional
  attribution).
- **Scripts** (`package.json`): `dev`, `build`, `start`, `lint` — plus
  `typecheck` if Plan 003 has landed (check before writing).

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Stale-term sweep | `Select-String -Path README.md -Pattern "Framer|next-themes|react-icons|FPL|GitHub Activity|Dark/Light|arjunvarma\.com"` | no output |
| Build unaffected | `npm run build` | exit 0 (README is not code, but run once to prove nothing else was touched) |

## Scope

**In scope** (the only file you should modify):
- `README.md` (full rewrite)

**Out of scope** (do NOT touch):
- `content/site.ts` and all other source files — even for the domain question;
  README must simply match the code.
- `github-profile-readme.md`, `docs/github-readmes/*` — drafts for OTHER
  repositories, not this site's README.
- `.env.example` — already accurate.

## Git workflow

- Branch: `advisor/004-readme-rewrite`
- One commit, e.g. `docs: rewrite README to match the rebuilt site`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Verify the ground truth

Open `package.json`, `content/site.ts`, `.env.example`, and skim
`app/layout.tsx` + `components/` directory names. Confirm every claim in the
"Ground truth" list above. If any claim is wrong, STOP (drift).

**Verify**: each bullet checked against the named file.

### Step 2: Replace README.md

Structure (keep it tight — this is a portfolio repo, not a product):

1. Title + one-paragraph description (narrative case-study portfolio; claims
   cite their sources; precision-instrument editorial design).
2. Live link (`https://arjun-varma.com`) · LinkedIn · GitHub (reuse the
   existing URLs from the old README lines 5 — they are correct except the
   live-site domain).
3. Features: case studies with cited metrics & provenance footnotes,
   TraceReplay, multi-agent diagram, Ask terminal (⌘K), motion system with
   reduced-motion support, SSG + SEO.
4. Tech stack table (only what's in `package.json`).
5. Getting started: `npm install` → copy `.env.example` to `.env.local` →
   `npm run dev`. State that chat needs an OpenRouter key and everything else
   works without one.
6. Env var table (mirroring `.env.example`).
7. Scripts table.
8. Project structure (one level: `app/`, `components/`, `content/` — note that
   all site copy lives in typed TS files under `content/`).
9. License line only if a LICENSE file exists — check first; the old README
   shows an MIT badge but if there is no LICENSE file, drop the badge rather
   than invent one.

Badges: keep at most Next.js/TypeScript/Tailwind, only with correct versions.

**Verify**: stale-term sweep command (above) → no output.

### Step 3: Link check

Every URL in the new README must be one of: `https://arjun-varma.com`,
the GitHub profile (`https://github.com/ARJUNVARMA2000`), the LinkedIn URL
(`https://www.linkedin.com/in/varma-arjun/`), or shield.io badge images.

**Verify**: `Select-String -Path README.md -Pattern "https?://"` — output
contains only the URLs above.

## Test plan

Docs change; the stale-term sweep and link check are the tests. Run
`npm run build` once at the end to prove the working tree is otherwise intact.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] Stale-term sweep returns no matches
- [ ] Link check passes (only approved URLs)
- [ ] README documents exactly the scripts present in `package.json` at time of writing
- [ ] No MIT badge/license claim unless a LICENSE file exists in the repo
- [ ] `git status` shows only `README.md` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- README.md has already been rewritten (drift check).
- You find a LICENSE file conflict (e.g. badge says MIT, file says otherwise).
- Verifying ground truth reveals the stack list is wrong (e.g. dependencies
  changed) — the plan's facts must be regenerated, not patched ad hoc.

## Maintenance notes

- The README duplicates facts whose source of truth is `content/site.ts` and
  `.env.example`. Future content changes (domain, email, availability date)
  should grep README for stale copies.
- The "Available from January 2027" positioning lives in site content, not the
  README — keep it that way so the README ages slower.
- Deferred deliberately: the canonical-domain question (`arjun-varma.com` vs
  `arjunvarma.com`) is the owner's call; this plan just makes README match code.
