# GitHub Refresh — Action Checklist

Everything below runs against [github.com/ARJUNVARMA2000](https://github.com/ARJUNVARMA2000). READMEs were drafted locally in this folder; push them to the matching repos and then do the profile/pins/cleanup passes.

---

## Track B — Push the 7 project READMEs

Seven README drafts live in `docs/github-readmes/`. Push each to its repo's `main` branch as `README.md`.

### Option 1 — one-shot bash loop (recommended)

```bash
# From C:\Users\varma\vibe-code\Portfolio2
for pair in \
  "airbnb-data-analyst-agent.md:Agentic-AI-Project-Columbia/airbnb-data-analyst-agent" \
  "Financial-RAG-Chatbot.md:ARJUNVARMA2000/Financial-RAG-Chatbot" \
  "Seance_AI.md:ARJUNVARMA2000/Seance_AI" \
  "Video-Speed-Controller-extension.md:ARJUNVARMA2000/Video-Speed-Controller-extension" \
  "tweet-bot.md:ARJUNVARMA2000/tweet-bot" \
  "citation-format-checker.md:ARJUNVARMA2000/citation-format-checker" \
  "ClassPulse.md:ARJUNVARMA2000/ClassPulse"; do
  file="${pair%%:*}"
  repo="${pair##*:}"
  name=$(basename "$repo")
  rm -rf "/tmp/$name"
  gh repo clone "$repo" "/tmp/$name"
  cp "docs/github-readmes/$file" "/tmp/$name/README.md"
  cd "/tmp/$name"
  git add README.md
  git commit -m "docs: expanded case study README"
  git push
  cd -
done
```

### Option 2 — manual per repo

For each repo, navigate to `github.com/<owner>/<repo>/edit/main/README.md`, paste the contents of the matching `docs/github-readmes/*.md` file, commit directly to `main`.

### Verify

- Every repo's README shows Problem / Challenge / Approach / Solution + Architecture (Mermaid) / Impact / Tech Stack / Run Locally sections.
- Mermaid diagrams render (GitHub renders them natively — no extra config needed).

---

## Track C — Profile refresh

### 1. Create the profile README repo

GitHub treats `ARJUNVARMA2000/ARJUNVARMA2000` (same name as username) as a special repo whose README.md renders on your profile page.

```bash
gh repo create ARJUNVARMA2000/ARJUNVARMA2000 --public --description "Profile README"
git clone https://github.com/ARJUNVARMA2000/ARJUNVARMA2000.git /tmp/profile
cp docs/github-readmes/profile-README.md /tmp/profile/README.md
cd /tmp/profile
git add README.md
git commit -m "docs: profile README — Field Notes style"
git push -u origin main
```

Then visit [github.com/ARJUNVARMA2000](https://github.com/ARJUNVARMA2000) and confirm the README renders above the pinned repos.

### 2. Fork the multi-agent repo under your account

```bash
gh repo fork Agentic-AI-Project-Columbia/airbnb-data-analyst-agent --clone=false
```

This creates `ARJUNVARMA2000/airbnb-data-analyst-agent` and keeps the upstream link visible (honest signal that it was a collaborative project).

### 3. Set About description + website + topics on each repo

Run these once each — `gh` has no single "update about" command, so use `gh api PATCH`:

```bash
# Financial RAG Chatbot
gh repo edit ARJUNVARMA2000/Financial-RAG-Chatbot \
  --description "RAG chatbot for SEC 10-K filings with line-level citations. FastAPI + ChromaDB + Claude/OpenAI. Eval harness with Claude Opus judge." \
  --homepage "https://finrag-frontend-7pj7nolpla-uc.a.run.app/" \
  --add-topic rag --add-topic llm --add-topic fastapi --add-topic chromadb --add-topic python

# ClassPulse
gh repo edit ARJUNVARMA2000/ClassPulse \
  --description "Live classroom theme extraction. Professors ask, students submit via QR, LLM summarizes responses into themed cards via SSE. 5-model OpenRouter fallback." \
  --homepage "https://themepulse-production.up.railway.app/" \
  --add-topic fastapi --add-topic sse --add-topic react --add-topic openrouter --add-topic education

# Citation Format Checker
gh repo edit ARJUNVARMA2000/citation-format-checker \
  --description "APA 7 / MLA 9 / Chicago 17 citation violation detector. Rule-IDs and quoted evidence, no black-box rewrites. Vertex AI + pytest eval harness." \
  --homepage "https://citation-bot-7pj7nolpla-uc.a.run.app" \
  --add-topic vertex-ai --add-topic gemini --add-topic fastapi --add-topic evals --add-topic gcp

# Tweet Bot
gh repo edit ARJUNVARMA2000/tweet-bot \
  --description "Chrome MV3 extension. Generates tweet replies, quote tweets, and threads via Claude through OpenRouter. Rhetorical-strategy tags, voice learning, image understanding." \
  --add-topic chrome-extension --add-topic mv3 --add-topic claude --add-topic openrouter --add-topic javascript

# SeanceAI
gh repo edit ARJUNVARMA2000/Seance_AI \
  --description "Converse with 60+ historical figures. Era-appropriate personas, streaming responses, Dinner Party mode where figures debate each other." \
  --homepage "https://seance-ai.up.railway.app" \
  --add-topic flask --add-topic sse --add-topic openrouter --add-topic llm --add-topic python

# Video Speed Controller
gh repo edit ARJUNVARMA2000/Video-Speed-Controller-extension \
  --description "Chrome MV3 extension for fine-grained video playback speed (0.1× – 16×). Per-site memory, keyboard shortcuts. Works on YouTube, Netflix, Coursera, Udemy." \
  --homepage "https://chromewebstore.google.com/detail/video-speed-controller-pr/mahfenfglifhcipcpobblpgdaefigpee" \
  --add-topic chrome-extension --add-topic mv3 --add-topic javascript --add-topic mutationobserver

# airbnb-data-analyst-agent (after fork)
gh repo edit ARJUNVARMA2000/airbnb-data-analyst-agent \
  --description "Multi-agent data analyst: 5 agents (Planner, Retriever, Analyst, Critic, Presenter) on a typed message bus. Built on LangChain + Claude." \
  --add-topic langchain --add-topic multi-agent --add-topic claude --add-topic data-science --add-topic python
```

### 4. Pin 6 repos

No `gh` command for pins — do this via the UI:

1. Visit [github.com/ARJUNVARMA2000](https://github.com/ARJUNVARMA2000)
2. Click **Customize your pins** (top right of profile)
3. Select these 6:
   - `airbnb-data-analyst-agent` (after fork)
   - `Financial-RAG-Chatbot`
   - `ClassPulse`
   - `citation-format-checker`
   - `tweet-bot`
   - `Seance_AI`
4. Save

`Video-Speed-Controller-extension` doesn't make the pin list — it's discoverable via the profile README table.

### 5. Cleanup stale / duplicate repos

Audit with:

```bash
gh repo list ARJUNVARMA2000 --limit 50 --json name,description,isArchived,updatedAt,isFork
```

**Specific actions:**

- `financial-rag-chatbot-vercel` — almost certainly a duplicate/experiment. Verify with `gh repo view ARJUNVARMA2000/financial-rag-chatbot-vercel --web`. If duplicate:
  ```bash
  gh repo archive ARJUNVARMA2000/financial-rag-chatbot-vercel
  ```
  (archive, don't delete — preserves history.)

- `AWS_Trainium_FineTuning` — if it's recent coursework and not embarrassing, keep. If abandoned:
  ```bash
  gh repo archive ARJUNVARMA2000/AWS_Trainium_FineTuning
  ```

- For every other repo that isn't in the pin list and isn't actively worked on: skim the README. If it's a half-finished experiment that doesn't reflect current skill level → archive.

**Do not delete anything.** Archiving is reversible; deletion isn't.

### 6. Optional polish

- **Consistent casing** — `Seance_AI` uses snake_case, `Video-Speed-Controller-extension` uses PascalCase-with-hyphens. Renaming breaks external links (Chrome Web Store listing, portfolio links). Skip unless you're willing to set up redirects.
- **Social preview images** — go to each repo's Settings → Social Preview and upload a screenshot. Makes shared links look nice.

---

## Track A — Already done in this session

- [x] `/` now serves Field Notes. `/field-notes` 301-redirects to `/`.
- [x] Contact form ported into Field Notes (mailto submission, postcard aesthetic).
- [x] Education block added (Columbia MS + VIT B.Tech).
- [x] Layout metadata updated (title, description, OG tags).
- [x] 14 unused classic-page components deleted.
- [x] `npm run build` passes clean.

---

## Verification after all three tracks

1. Visit [arjun-varma.com](https://arjun-varma.com/) → notebook renders. (Requires Vercel deploy of current main.)
2. Visit [arjun-varma.com/field-notes](https://arjun-varma.com/field-notes) → redirects to `/`.
3. From the notebook, click every project's `[source →]` link → lands on a GitHub repo with an expanded README (Problem / Challenge / Approach / Architecture / Impact).
4. BTC and SunCulture cards either have an external-source link (PMSA paper, LinkedIn) or no source link — no empty repos.
5. Visit [github.com/ARJUNVARMA2000](https://github.com/ARJUNVARMA2000) → profile README renders. Pinned repos show description + homepage URL.
6. Click each pinned repo → About panel shows tagline + live demo link.
