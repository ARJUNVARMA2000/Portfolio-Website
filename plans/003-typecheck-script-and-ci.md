# Plan 003: Add a typecheck script and a minimal CI workflow

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7444f1b..HEAD -- package.json`
> NOTE: written against the working tree on 2026-06-12. If a `typecheck`
> script or a `.github/workflows/` directory already exists, reconcile rather
> than duplicate (and report what you found).

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `7444f1b`, 2026-06-12

## Why this matters

The repo's only verification gates are `next lint` and the Vercel deploy build.
There is no `typecheck` script (TypeScript runs only inside editors) and no CI,
so a type error or build break is first discovered when a deploy fails. The
codebase typechecks clean today (`npx tsc --noEmit` exits 0 on 2026-06-12), so
this plan is pure guard-rail installation: a one-line script plus a small
GitHub Actions workflow running typecheck, lint, and build on pushes and PRs.

## Current state

- `package.json:5-10` — scripts are exactly:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

- No `.github/` directory exists at the repo root.
- `tsconfig.json` exists and is the config `tsc` picks up automatically;
  `npx tsc --noEmit` currently exits 0.
- The build needs no environment variables: the only env reads are inside the
  chat route's request handler (`app/api/chat/route.ts`), which never executes
  at build time. `npm run build` succeeds with no `.env` present.
- Node version: the repo declares no `engines` field; use Node 20 LTS in CI.
- This project deploys on Vercel; CI here is a pre-merge gate, not a deploy.

## Commands you will need

| Purpose   | Command             | Expected on success |
|-----------|---------------------|---------------------|
| Typecheck | `npm run typecheck` | exit 0 (after Step 1) |
| Lint      | `npm run lint`      | exit 0              |
| Build     | `npm run build`     | exit 0              |

## Scope

**In scope** (the only files you should modify/create):
- `package.json` (add one script)
- `.github/workflows/ci.yml` (create)

**Out of scope** (do NOT touch):
- Test frameworks, formatters, pre-commit hooks — deliberately not added; this
  repo's owner decided a static portfolio doesn't warrant a test suite (see
  `plans/README.md`, rejected findings).
- `tsconfig.json` — typecheck must pass against the existing config as-is.
- Vercel configuration — deploys are unchanged.

## Git workflow

- Branch: `advisor/003-typecheck-ci`
- One commit, e.g. `chore(dx): add typecheck script and CI workflow`
- Do NOT push or open a PR unless the operator instructed it. (Note: the
  workflow only takes effect once pushed to GitHub; verification of the live
  run is the operator's step.)

## Steps

### Step 1: Add the typecheck script

In `package.json`, add to `scripts` (keep existing entries untouched):

```json
"typecheck": "tsc --noEmit"
```

**Verify**: `npm run typecheck` → exit 0.

### Step 2: Create the CI workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build
```

**Verify**: file exists; YAML parses — run
`node -e "console.log(require('fs').readFileSync('.github/workflows/ci.yml','utf8').length > 0 ? 'ok' : 'empty')"` → `ok`,
and visually confirm indentation matches the block above exactly (YAML is
whitespace-sensitive; a tab character is a failure).

### Step 3: Local dry-run of exactly what CI will run

Run in order: `npm ci` (note: this wipes and reinstalls node_modules from the
lockfile — it is safe, but takes a few minutes), `npm run typecheck`,
`npm run lint`, `npm run build`.

**Verify**: all four commands exit 0.

## Test plan

The CI workflow IS the test infrastructure being added. Local proof is Step 3
(the identical command sequence CI will run). First live validation happens on
the operator's next push to GitHub — note this in your completion report.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm run typecheck` exits 0
- [ ] `.github/workflows/ci.yml` exists with the typecheck → lint → build sequence
- [ ] `npm ci && npm run typecheck && npm run lint && npm run build` all exit 0
- [ ] `git status` shows changes only to `package.json` and `.github/workflows/ci.yml`
      (`package-lock.json` must be UNCHANGED — `npm ci` does not modify it;
      if it changed, you ran something else)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `npm run typecheck` fails in Step 1 — the baseline has drifted since
  2026-06-12; the type errors must be reported, not silently fixed under this
  plan's banner.
- `npm ci` fails (lockfile out of sync with package.json) — likely another
  plan (e.g. 002) touched dependencies; report the conflict.
- You feel the need to modify `tsconfig.json` to get a green typecheck.

## Maintenance notes

- If Plan 002 (Next patch bump) lands after this, CI will validate it
  automatically on push — order between 002 and 003 doesn't matter, but both
  touching `package.json` means: rebase, don't copy-paste merge.
- If the owner later adds tests, append the test command as a fourth `run:`
  step in the same job.
- The workflow uses `npm ci`, so any future dependency change MUST commit the
  regenerated `package-lock.json` or CI will fail by design.
