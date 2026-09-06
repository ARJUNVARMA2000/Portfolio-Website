# Implementation Plans

The [September 6 website review](review-2026-09-06.md) led to the implementation tracked in
[tasks/todo.md](../tasks/todo.md). The compact homepage, project summaries and evidence,
recorded walkthrough, complete project directory, chat recovery, and Next.js 16 migration
are implemented locally. Validation results and remaining maintenance are recorded there.
Deployment has not been performed.

## Historical plan reconciliation

These June plans describe an older checkout. Use their content as historical context,
not as instructions to downgrade or reimplement the current site.

| Plan | Current status |
| --- | --- |
| [001 — Harden chat API](001-harden-chat-api-route.md) | Partially superseded: input caps, bounded history, distinct sanitized errors, recovery, and API contract tests are implemented. The proposed additional response-security headers were not part of this release. |
| [002 — Patch Next.js 14](002-next-patch-bump.md) | Superseded by Next.js 16.3.4 and React 19.2.8, with Node 24 declared for CI and deployment. |
| [003 — Typecheck and CI](003-typecheck-script-and-ci.md) | Implemented and extended with route generation, ESLint 9, unit tests, production build, and browser regression coverage. |
| [004 — Rewrite README](004-readme-rewrite.md) | Implemented; current README documents the portfolio, canonical domain, setup, structure, and checks. |
| [005 — Repository housekeeping](005-repo-housekeeping.md) | Deferred; source documents and root binaries were preserved. |

The canonical site URL is `https://arjun-varma.com`. The public resume was refreshed
in August 2026 and was not changed in this implementation.

## Remaining maintenance

- Migrate the legacy AI SDK deliberately. The current production audit reports nine
  findings (seven low, one moderate, one high); the high finding is in its transitive
  `jsondiffpatch` dependency. This review did not establish a reachable exploit in
  the portfolio. The scoped nanoid override resolves that separate advisory while
  preserving the tested streaming protocol.
- Move to ESLint 10 once the installed Next/React lint plugins support it. ESLint 9
  is a compatibility bridge and is past its support window; lint currently passes.
- Move the chat and generated social-image routes from Next's deprecated Edge runtime
  in a focused follow-up with streaming and image-response verification.
- Confirm Node 24 in the hosting account when deploying. Local verification ran on
  the installed Node 26.5.0; Node 24 is declared in package engines and both workflows.

Earlier findings about missing chat links/focus management, structured metadata,
contextual chat prompts, or an absent browser suite are resolved. Earlier objections
to ESLint 9 and browser testing applied to the old framework and are superseded.
