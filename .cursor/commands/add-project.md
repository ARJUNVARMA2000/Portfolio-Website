# Add Project to Portfolio

## Overview

Add one or more GitHub repositories to the portfolio website and GitHub profile README. This command handles metadata extraction, case study generation, data file updates, and git commit + push for both repos.

## Input

The user provides one or more **GitHub repository URLs** (e.g., `https://github.com/ARJUNVARMA2000/some-project`).

---

## Step 1: Extract Repository Metadata

For **each** repo URL provided, extract the `owner/repo` slug from the URL, then run these two shell commands:

```bash
gh repo view <owner/repo> --json name,description,url,homepageUrl,repositoryTopics,primaryLanguage,languages
```

```bash
gh api repos/<owner/repo>/readme --header "Accept: application/vnd.github.raw"
```

Parse the JSON output and README content. You now have everything needed to populate the project fields.

---

## Step 2: Ask the User for Missing Info

Some fields cannot be reliably inferred. **Ask the user** (use the AskQuestion tool or a direct question) for:

- **period** — e.g., "Jan 2026 - Feb 2026" or "2026" (you can suggest a default from the repo creation date)
- **org** — e.g., "Columbia University", "Personal Project", or a company name
- **featured** — whether this should be a featured project (spans 2 columns). Default: `false`

If the user provides these upfront in their message, skip asking.

---

## Step 3: Synthesize Project Data

Using the fetched metadata and README, generate values for every field of the `ProjectData` interface defined in `data/projects.ts`:

| Field         | How to derive                                                                                                  |
|---------------|----------------------------------------------------------------------------------------------------------------|
| `title`       | Use the repo name, humanized (e.g., `financial-rag-chatbot` -> `Financial RAG Chatbot`). Or use the README H1 if it's a better name. |
| `subtitle`    | A short (2-5 word) category label inferred from the repo description and topics (e.g., "LLM & Information Retrieval", "Chrome Extension"). |
| `description` | 1-2 sentence summary combining the GitHub description with key details from the README. Match the tone and length of existing projects in `data/projects.ts`. |
| `tech`        | Array of technologies. Pull from: GitHub `languages`, `repositoryTopics`, and explicit mentions in the README. Keep to 4-6 items. |
| `iconName`    | Pick the best match from the icon map in `components/Projects.tsx`. Available icons: `FaBrain`, `FaRobot`, `FaDatabase`, `FaChrome`, `FaTwitter`, `FaBook`, `FaCode`, `FaLaptopCode`, `FaMicrochip`, `FaServer`, `FaGamepad`, `FaMobileAlt`, `FaCloud`, `FaChartLine`, `FaLock`, `FaCog`, `FaFlask`, `FaNetworkWired`, `FaPython`, `FaReact`, `FaDocker`, `FaAws`. Default to `FaCode` if nothing fits. |
| `color`       | Rotate through `"purple"`, `"cyan"`, `"pink"` based on the last project's color in the array. |
| `highlights`  | Array of exactly 3 short bullet points (max 8 words each) distilled from the README — focus on metrics, outcomes, or standout features. |
| `period`      | From user input (Step 2). |
| `org`         | From user input (Step 2). |
| `featured`    | From user input (Step 2), default `false`. |
| `github`      | The full GitHub repo URL. |
| `demo`        | The `homepageUrl` from GitHub metadata if set, otherwise omit. |

---

## Step 4: Generate Case Study

Using the README content, generate a `CaseStudy` object. Each field should be 1-3 paragraphs with bullet points where appropriate. Match the tone and depth of existing case studies in `data/projects.ts`.

| Field       | Content guidance                                                                   |
|-------------|------------------------------------------------------------------------------------|
| `problem`   | What real-world problem does this project solve? Who benefits?                     |
| `challenge` | What made this technically difficult? List specific technical hurdles with bullets. |
| `approach`  | What strategy/methodology was used? Use numbered steps.                            |
| `solution`  | What was built? Describe the architecture with bullet points for each component.   |
| `impact`    | Results, metrics, outcomes. Use bullet points starting with metrics where possible.|

The case study variable should be named using camelCase derived from the project title (e.g., `financialRagCaseStudy`).

---

## Step 5: Update `data/projects.ts`

1. **Add the case study** — Insert a new `const <name>CaseStudy: CaseStudy = { ... };` block above the `export const projects` array, after the last existing case study.

2. **Add the project** — Append a new object to the `projects` array, right before the closing `];`. Use the `StrReplace` tool to make the edit.

**Important**: Use the exact `ProjectData` interface shape. Do NOT add any extra fields. Ensure all template literal strings use backticks for multi-line case study text.

---

## Step 6: Update GitHub Profile README

Edit `github-profile-repo/README.md`. Insert a new entry at the **end** of the `## 🌟 Featured Projects` section (before `## 📊 GitHub Stats`), following this exact format:

```
### EMOJI [Project Title](github_url)
One-sentence description of the project.

**Tech:** Tech1, Tech2, Tech3, Tech4
```

If the project has a demo URL, append it:

```
**Tech:** Tech1, Tech2, Tech3 | [Live Demo](demo_url)
```

Choose an appropriate emoji that matches the project's domain:
- ML/AI: 🎯 or 🧠
- Web app: 🌐 or 💬
- Chrome extension: ⚡ or 🔧
- Data/analytics: 📊 or 📈
- API/backend: 🔌 or ⚙️

---

## Step 7: Verify Build

Run:

```bash
npx next build
```

If the build fails, fix the issue before proceeding.

---

## Step 8: Commit and Push

### Portfolio2 repo (main repo)

```bash
git add data/projects.ts components/Projects.tsx
git commit -m "feat(projects): add <project-name> to portfolio"
git push
```

### GitHub profile repo

```bash
cd github-profile-repo
git add README.md
git commit -m "feat: add <project-name> to featured projects"
git push
cd ..
```

Replace `<project-name>` with a short kebab-case version of the project title.

---

## Checklist

Before finishing, verify:

- [ ] New project appears in `data/projects.ts` with all required fields
- [ ] Case study is defined above the projects array
- [ ] `iconName` matches an entry in the `iconMap` in `components/Projects.tsx`
- [ ] GitHub profile README has the new entry under Featured Projects
- [ ] `next build` passes with no new errors
- [ ] Both repos are committed and pushed

---

## Example

If the user says: *"Add https://github.com/ARJUNVARMA2000/Financial-RAG-Chatbot"*

The command should:
1. Run `gh repo view ARJUNVARMA2000/Financial-RAG-Chatbot --json ...`
2. Read the README via `gh api`
3. Ask for period and org (if not provided)
4. Generate the project entry and case study
5. Append to `data/projects.ts`
6. Add entry to `github-profile-repo/README.md`
7. Verify build
8. Commit and push both repos
