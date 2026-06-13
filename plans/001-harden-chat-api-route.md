# Plan 001: Harden the chat API route against cost abuse and information leakage

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7444f1b..HEAD -- app/api/chat/route.ts next.config.mjs`
> NOTE: this plan was written against the WORKING TREE on 2026-06-12 (the repo
> had uncommitted changes on top of `7444f1b`). If the "Current state" excerpts
> below do not match the live files, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: security
- **Planned at**: commit `7444f1b`, 2026-06-12

## Why this matters

`POST /api/chat` is the only server endpoint in this portfolio. It is public,
unauthenticated, and proxies a **paid** OpenRouter API key. Today it accepts an
unbounded `messages` array (any count, any length), so a single request can
push an arbitrarily large prompt to OpenRouter at the owner's expense, and a
script can do it in a loop. Separately, the catch block echoes the raw upstream
error message (`err.message`) to the client, leaking provider/internal details.
This plan adds strict input caps, server-side history trimming, sanitized error
responses, and basic security response headers. It does NOT add distributed
rate limiting (that requires external infra — see Maintenance notes).

## Current state

Relevant files:

- `app/api/chat/route.ts` — the entire chat backend (73 lines). Edge runtime.
- `next.config.mjs` — currently only declares redirects; no `headers()`.

Excerpt — `app/api/chat/route.ts:20-49` as written:

```ts
export async function POST(req: Request) {
  const { messages } = await req.json().catch(() => ({ messages: [] }));

  if (!process.env.OPENROUTER_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "Missing OPENROUTER_API_KEY. Set it in .env.local (dev) or your hosting provider env vars (prod).",
      }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  if (!Array.isArray(messages)) {
    // ... returns 400 ...
  }

  try {
    const result = await streamText({
      model: openrouter(MODEL),
      system: SYSTEM_PROMPT,
      messages,
      maxTokens: 700,
      temperature: 0.5,
    });

    return result.toDataStreamResponse();
  } catch (err: unknown) {
```

Excerpt — the leaky catch block, `app/api/chat/route.ts:52-70`:

```ts
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error while generating chat response.";

    const status =
      typeof message === "string" && message.toLowerCase().includes("unauthorized")
        ? 401
        : 500;

    return new Response(
      JSON.stringify({
        error: message,
        hint:
          status === 401
            ? "Your OpenRouter key/model may be invalid. Check OPENROUTER_API_KEY and OPENROUTER_MODEL."
            : "See server logs for details.",
      }),
      { status, headers: { "content-type": "application/json" } }
    );
  }
```

Excerpt — `next.config.mjs` (entire file):

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/field-notes", destination: "/", permanent: true },
      { source: "/work", destination: "/#work", permanent: false },
    ];
  },
};

export default nextConfig;
```

Conventions to match: TypeScript strict mode, double quotes, semicolons,
2-space indent, plain `Response` objects with JSON bodies for errors (as in the
excerpts above). The client (`components/chat/ask-terminal.tsx`) uses the AI
SDK's `useChat` and only checks `error` truthiness — it never parses the error
body — so changing error body text is safe; changing the SUCCESS streaming
response format is NOT.

Do not add new dependencies (no zod). Manual validation is enough for this
shape and matches the repo's "Simplicity First" rule in `CLAUDE.md`.

## Commands you will need

| Purpose   | Command                          | Expected on success            |
|-----------|----------------------------------|--------------------------------|
| Typecheck | `npx tsc --noEmit`               | exit 0, no output              |
| Lint      | `npm run lint`                   | exit 0                         |
| Build     | `npm run build`                  | exit 0, "Compiled successfully"|
| Dev       | `npm run dev`                    | serves http://localhost:3000   |

This is a Windows machine; in PowerShell use `curl.exe` (not the `curl` alias).

## Scope

**In scope** (the only files you should modify):
- `app/api/chat/route.ts`
- `next.config.mjs`

**Out of scope** (do NOT touch, even though they look related):
- `components/chat/ask-terminal.tsx` and `components/chat/*` — client behavior is unchanged.
- `lib/resume-context.ts` — the system prompt is not part of this plan.
- Any auth, CAPTCHA, or external rate-limit service integration.
- `.env*` files.

## Git workflow

- Branch: `advisor/001-harden-chat-api`
- Commit style: conventional commits matching repo history (e.g. `fix(chat): cap message input and sanitize errors` — compare `git log --oneline -10`).
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add input caps and validation to the route

In `app/api/chat/route.ts`, after the existing `Array.isArray` check, enforce:

```ts
const MAX_MESSAGES = 30;        // turns kept per request
const MAX_MESSAGE_CHARS = 4000; // per message
const MAX_TOTAL_CHARS = 24000;  // whole conversation payload
```

Validation rules (reject with status 400 and a short JSON `{ error: string }`):
- every element must be an object with `role` of `"user"` or `"assistant"`
  and a string `content` (the client also sends `id`/`createdAt` fields —
  ignore extra fields, do not reject them);
- no single `content` longer than `MAX_MESSAGE_CHARS`;
- combined `content` length no greater than `MAX_TOTAL_CHARS`;
- reorder the handler so this validation (and the `Array.isArray` check) runs
  BEFORE the `OPENROUTER_API_KEY` check, so validation is testable in dev
  without a key.

If `messages.length > MAX_MESSAGES`, do not reject — trim server-side to the
last `MAX_MESSAGES` entries before passing to `streamText` (legitimate long
conversations keep working; cost stays bounded). Strip each message down to
`{ role, content }` when forwarding so arbitrary extra fields never reach the
provider.

**Verify**: `npx tsc --noEmit` → exit 0.

### Step 2: Sanitize error responses

Replace the catch block so the client receives only a generic message:

- Log the real error server-side: `console.error("chat route error:", err);`
  (visible in Vercel function logs).
- Return `{ error: "Chat is temporarily unavailable." }` with status 500 —
  no `err.message`, no `hint`, no env-var names.
- Also change the missing-key branch (currently 401 with setup instructions)
  to return status 503 with the same generic body, and `console.error` the
  real reason. Setup guidance for operators lives in `.env.example`, not in a
  public HTTP response.

**Verify**: `npx tsc --noEmit` → exit 0, and
`Select-String -Path app/api/chat/route.ts -Pattern "OPENROUTER"` shows the
env vars referenced only via `process.env.*` reads — no occurrences inside any
`Response` body string.

### Step 3: Add security headers in next.config.mjs

Add an `async headers()` section alongside the existing `redirects()`:

```js
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
  ];
},
```

Do NOT attempt a Content-Security-Policy header — GSAP and next/font inject
inline styles, and a correct CSP for this stack needs nonce plumbing that is
out of scope.

**Verify**: `npm run build` → exit 0.

### Step 4: Behavioral check against the dev server

Start `npm run dev`, then from a second terminal:

1. Oversized message rejected:
   `curl.exe -s -o NUL -w "%{http_code}" -X POST http://localhost:3000/api/chat -H "content-type: application/json" -d "{\"messages\":[{\"role\":\"user\",\"content\":\"$('x' * 1)\"}]}"`
   — build the body with a >4000-char content string (e.g. generate it in
   PowerShell: `$body = '{"messages":[{"role":"user","content":"' + ('x'*5000) + '"}]}'` then
   `curl.exe -s -o NUL -w "%{http_code}" -X POST http://localhost:3000/api/chat -H "content-type: application/json" -d $body`)
   → expected `400`.
2. Malformed body rejected: send `{"messages":"nope"}` → expected `400`.
3. Headers present: `curl.exe -s -I http://localhost:3000/` → response includes
   `X-Frame-Options: SAMEORIGIN` and `X-Content-Type-Options: nosniff`.
4. If `OPENROUTER_API_KEY` is set in `.env.local`: a normal one-message POST
   still streams a response (open the site, press Ctrl+K, ask anything, get an
   answer). If the key is absent: the same POST returns `503` with the generic
   body — that is the expected configured-but-keyless behavior.

**Verify**: all expected status codes observed.

## Test plan

No test framework exists in this repo (no test script, no runner installed) and
adding one is out of scope. The behavioral checks in Step 4 are the test plan;
record the observed status codes in your completion report.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npx tsc --noEmit` exits 0
- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0
- [ ] >4000-char message POST returns 400 (Step 4.1)
- [ ] `{"messages":"nope"}` POST returns 400 (Step 4.2)
- [ ] `curl.exe -s -I http://localhost:3000/` shows the four new headers
- [ ] `Select-String -Path app/api/chat/route.ts -Pattern "err.message|hint"` → no matches in response bodies
- [ ] `git status` shows changes only in `app/api/chat/route.ts` and `next.config.mjs`
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `app/api/chat/route.ts` no longer matches the "Current state" excerpts
  (someone changed the route since 2026-06-12).
- The chat UI stops receiving streamed responses after your change with a valid
  key configured (you may have altered the success path — revert and report).
- You find yourself wanting to modify `components/chat/ask-terminal.tsx` to
  make anything work.
- `npm run build` fails for a reason unrelated to your diff.

## Maintenance notes

- These caps bound the cost per request but not requests per minute. True rate
  limiting on Vercel Edge needs either Vercel WAF rules (dashboard, no code) or
  an external store (e.g. Upstash Redis). Deliberately deferred: it adds an
  account/dependency the owner must choose. Recommend the owner enable a Vercel
  Firewall rate-limit rule for `POST /api/chat` (e.g. 20 req / 10 min per IP).
- If a future change renders markdown in the terminal or alters the prompt
  contract (see rejected/deferred finding #7 in `plans/README.md`), the caps
  here are unaffected.
- Reviewer should scrutinize: that validation runs before the key check, and
  that the success path (`result.toDataStreamResponse()`) is byte-identical.
