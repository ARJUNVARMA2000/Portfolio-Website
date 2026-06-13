# Plan 005: Repo housekeeping — untrack stray binaries, prune old-site scaffolding, shrink the hero image source

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7444f1b..HEAD -- .gitignore public/images/profile.png components/home/hero.tsx`
> NOTE: written against the working tree on 2026-06-12. Re-run the inventory
> in "Current state" before acting — files may have moved.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `7444f1b`, 2026-06-12

## Why this matters

Four personal binary files are git-tracked in the repo root (two resume drafts,
a 4.1 MB photo, a 0.7 MB WhatsApp image) — none referenced by code. Old-site
scaffolding (README drafts for other repos, an empty `data/` directory) lingers
from before the June 2026 rebuild. And the hero portrait source
`public/images/profile.png` is 2.25 MB — Vercel's image optimizer serves users
optimized variants, so this is not a 2 MB page payload, but the oversized
source slows the optimizer's cold transforms and bloats every clone. This plan
untracks the cruft (WITHOUT deleting personal files from disk) and replaces the
hero source with a properly sized one.

## Current state

Tracked files to untrack (verified via `git ls-files` on 2026-06-12; all in
repo root; NONE are referenced by any code — confirmed by searching
`app/`, `components/`, `content/`, `lib/`):

- `Arjun Varma Resume sem2.pdf` (~178 KB)
- `Arjun_Varma_Resume_Revised.docx` (~10 KB)
- `TLPS-9883.jpg` (~4.1 MB)
- `WhatsApp Image 2025-08-28 at 20.44.44_d25137f5.jpg` (~0.7 MB)
- `github-profile-readme.md` — draft of the owner's GitHub PROFILE readme,
  not this repo's docs
- `docs/github-readmes/` (9 .md files) — README drafts for OTHER repositories

Possibly-present extras (check tracked status before acting; if untracked,
leave them alone): `data/` (empty directory — git doesn't track empty dirs),
`github-profile-repo/`, `Skills.md`, `skills-lock.json`.

Files that MUST stay tracked and untouched:

- `public/resume.pdf` (~241 KB) — served at `/resume.pdf`, linked from the
  site UI and the chat system prompt (`lib/resume-context.ts:51`).
- `tasks/` — the owner's agent-workflow files (`CLAUDE.md` mandates
  `tasks/todo.md`); NOT cruft.
- `CLAUDE.md`, `AGENTS.md`, `.cursor/`, `.claude/`, `.agents/`, `Skills.md`,
  `skills-lock.json` — agent/editor workflow config, intentional.

Hero image usage — `components/home/hero.tsx:176-185`:

```tsx
<Image
  data-hero-img
  src="/images/profile.png"
  alt="Arjun Varma"
  width={1024}
  height={1536}
  priority
  sizes="(min-width: 768px) 240px, 200px"
  className="block h-auto w-full"
/>
```

Rendered at most 240 CSS px wide → even at 3× DPR the largest variant needed
is ~720 px wide. A 1024×1536 source is the right ceiling; the problem is PNG
encoding of a photo (2.25 MB). A quality-80 JPEG at 1024×1536 should land
around 150–250 KB.

`.gitignore` currently has no rules for root-level binaries.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Tracked check | `git ls-files -- "<name>"` | prints path if tracked, empty if not |
| Untrack (keep on disk) | `git rm --cached -- "<name>"` | "rm '<name>'" |
| Image convert | `npx sharp-cli --input public/images/profile.png --output public/images/profile.jpg --format jpeg --quality 80` | writes profile.jpg |
| Build | `npm run build` | exit 0 |
| Typecheck | `npx tsc --noEmit` | exit 0 |

If `npx sharp-cli` fails to install or run (it downloads a native binary), see
STOP conditions — do not improvise with other tools unless one of these is
already installed and lossless to operate: ImageMagick (`magick convert`) or
`ffmpeg`.

## Scope

**In scope**:
- `.gitignore` (append rules)
- Untracking (NOT deleting from disk): the 4 root binaries,
  `github-profile-readme.md`, `docs/github-readmes/`
- `public/images/profile.png` → replaced by `public/images/profile.jpg`
- `components/home/hero.tsx` (ONLY the `src` string)

**Out of scope** (do NOT touch):
- `public/resume.pdf` — must remain tracked and byte-identical.
- `tasks/`, `CLAUDE.md`, `AGENTS.md`, `.claude/`, `.cursor/`, `.agents/`,
  `Skills.md`, `skills-lock.json`.
- Git history rewriting (filter-repo/BFG). The blobs stay in history; only
  HEAD is cleaned. History rewrite is a destructive owner-only decision.
- Deleting ANY file from the working disk. Untrack means `--cached` only.
- The other logo images in `public/images/` (already small).

## Git workflow

- Branch: `advisor/005-housekeeping`
- Two commits: one for untracking + .gitignore, one for the image swap.
  e.g. `chore: untrack personal binaries and old-site readme drafts` and
  `perf(hero): replace 2.25MB png source with sized jpeg`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Untrack the stray files (keep them on disk)

For each of the 6 entries in "Current state" (4 binaries + readme draft +
`docs/github-readmes/`): first confirm it is tracked
(`git ls-files -- "<name>"` prints it), then
`git rm --cached -- "<name>"` (add `-r` for the directory).

**Verify**: `git ls-files | Select-String -Pattern "Resume|WhatsApp|TLPS|github-readmes|github-profile-readme"`
→ no output, AND `Test-Path "Arjun Varma Resume sem2.pdf"` → `True` (still on
disk), AND `git ls-files -- public/resume.pdf` → still prints the path.

### Step 2: Add .gitignore rules

Append to `.gitignore` (root-anchored so `public/` assets are unaffected):

```gitignore
# personal files kept out of the repo (root level only)
/*.pdf
/*.docx
/*.jpg
/*.jpeg
/github-profile-readme.md
/docs/github-readmes/
```

**Verify**: `git status --short` no longer lists the untracked binaries, and
`git check-ignore "TLPS-9883.jpg"` prints the filename. Then confirm the
public assets are NOT ignored: `git check-ignore public/resume.pdf public/images/columbia-logo.jpg` → exits non-zero with no output.

### Step 3: Re-encode the hero portrait

1. `npx sharp-cli --input public/images/profile.png --output public/images/profile.jpg --format jpeg --quality 80`
   (keep dimensions 1024×1536 — do not resize, only re-encode).
2. Check the result: `(Get-Item public/images/profile.jpg).Length / 1KB` →
   expect under 400 KB. Open the file and visually confirm it is the same
   portrait, not corrupted.
3. In `components/home/hero.tsx`, change `src="/images/profile.png"` to
   `src="/images/profile.jpg"`. Touch nothing else in the file.
4. `git rm --cached public/images/profile.png` then delete it from disk
   (`Remove-Item public/images/profile.png`) — this file IS site-owned (not a
   personal file), and keeping both would re-bloat the repo. Note: the root
   `/*.jpg` ignore rule does not match `public/images/*.jpg`, so the new file
   can be added normally; confirm with `git check-ignore public/images/profile.jpg`
   → non-zero exit.

**Verify**: `npx tsc --noEmit` → exit 0; `npm run build` → exit 0;
`git ls-files public/images/` lists `profile.jpg` and not `profile.png`.

### Step 4: Visual smoke test

`npm run dev` → open `http://localhost:3000` → the hero portrait renders
identically (border-framed figure, "fig. 00 — the author" caption below).

**Verify**: portrait visible, no broken-image icon, no layout shift vs before.

## Test plan

No test framework exists. The checks embedded in each step (tracked-file
sweeps, ignore checks, size check, build, visual smoke) are the test plan.
Report the final size of `profile.jpg` and the full output of
`git status --short` in your completion report.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `git ls-files | Select-String "Resume|WhatsApp|TLPS|github-readmes|github-profile-readme"` → no output
- [ ] The 4 personal binaries still exist on disk (`Test-Path` each → True)
- [ ] `git ls-files -- public/resume.pdf` → prints the path (still tracked)
- [ ] `public/images/profile.jpg` exists, < 400 KB, tracked; `profile.png` gone from index and disk
- [ ] `Select-String -Path components/home/hero.tsx -Pattern "profile.png"` → no output
- [ ] `npx tsc --noEmit` and `npm run build` exit 0
- [ ] Changes confined to: `.gitignore`, `components/home/hero.tsx`, image files, and index removals
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `sharp-cli` cannot run AND neither ImageMagick nor ffmpeg is installed —
  report; the owner can re-encode the image manually.
- The re-encoded JPEG is over 400 KB or visibly degraded — report the size and
  ask whether to lower quality or accept it; do not ship a bad portrait.
- Any file you're about to untrack IS referenced somewhere in `app/`,
  `components/`, `content/`, or `lib/` (re-run the search yourself:
  `Get-ChildItem app,components,content,lib -Recurse -File | Select-String -Pattern "TLPS|WhatsApp|Resume sem2|Resume_Revised"`).
- `git status` shows staged deletions of anything under `public/` other than
  `profile.png`.

## Maintenance notes

- The owner should check whether `public/resume.pdf` (the version the site
  serves and the chat links to) is CURRENT — the untracked root drafts
  ("sem2", "Revised") look newer. Swapping it in is a 1-file copy but is the
  owner's call, not this plan's.
- Git history still contains the large blobs; clone size only improves after
  a history rewrite, which the owner may or may not ever want.
- The root-anchored `/*.jpg` ignore rule means any future root-level images
  are silently ignored — that is intended behavior, but worth remembering.
- The canonical-domain question and the AI SDK migration are tracked
  separately in `plans/README.md`.
