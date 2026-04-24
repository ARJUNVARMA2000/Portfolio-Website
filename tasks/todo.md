# Portfolio Fix Plan

- [x] Verify whether `data/projects.ts` is unused before removing it.
- [x] Remove stale `data/projects.ts`.
- [x] Update chat/resume context so the ask terminal knows the visible project set.
- [x] Add compact sticky navigation: Work, Experience, Skills, Resume, Contact.
- [x] Make project cards keyboard-accessible with real buttons/links.
- [x] Replace unnecessary `dangerouslySetInnerHTML` in education copy.
- [x] Demote underselling “side quests & utilities” language.
- [x] Decide whether the ask terminal should remain visible after reliability review.
- [x] Run production build and browser/DOM verification.

## Review

- Deleted unused `data/projects.ts` after confirmation.
- `npm.cmd run build` passes.
- In-app browser DOM verification passes: sticky nav renders, 5 case-study buttons are keyboard-addressable, secondary project copy says "shipped tools", and education ampersands render as text.
