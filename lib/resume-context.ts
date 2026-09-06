import { CASE_STUDIES } from "@/content/case-studies";
import { PROJECT_CATALOG } from "@/content/project-catalog";
import { EXPERIENCE } from "@/content/experience";
import { SKILLS } from "@/content/skills";
import { EDUCATION, SITE } from "@/content/site";

const caseStudyContext = CASE_STUDIES.map((cs) => {
  const page = `${SITE.url}/work/${cs.slug}`;
  const metrics = cs.metrics.map((m) => `${m.value} ${m.label} (${m.kind ?? "reported"}; ${m.provenance})${m.source ? ` [${m.source.label}: ${m.source.href}]` : ""}`).join("; ");
  const links = cs.links.map((l) => `${l.label}: ${l.href}`).join(" | ");
  const narrative = cs.sections.map((section) => `#### ${section.title}
Source: ${page}#${section.id}
${section.body}${section.aside ? `\nScope note: ${section.aside}` : ""}${section.figure ? `\nFigure: ${section.figure.caption}` : ""}`).join("\n\n");
  return `### ${cs.title}
- Page: ${page}
- ${cs.org} · ${cs.period} · status: ${cs.status}
- Summary: ${cs.subtitle}
- Arjun's stated role: ${cs.role}
- Personal contribution: ${cs.summary.contribution}
- Key decision: ${cs.summary.decision}
- Result: ${cs.summary.result}
- Limitation: ${cs.summary.limitation}
- Reported results and system scope (read each qualifier): ${metrics}
- Tech: ${cs.tech.join(", ")}${links ? `\n- External links: ${links}` : ""}
${cs.availabilityNote ? `- Availability: ${cs.availabilityNote}\n` : ""}
${narrative}`;
}).join("\n\n");

const projectContext = PROJECT_CATALOG.filter((project) => !CASE_STUDIES.some((study) => study.slug === project.slug)).map((p) => {
  const links = [p.live ? `Live: ${p.live}` : null, p.repo ? `GitHub: ${p.repo}` : null]
    .filter(Boolean)
    .join(" | ");
  return `### ${p.title} (${p.year})
${p.oneLiner}${links ? `\n${links}` : ""}${p.contribution ? `\nArjun's stated role: ${p.contribution}` : ""}${p.summary ? `
Personal contribution: ${p.summary.contribution}
Key decision: ${p.summary.decision}
Result: ${p.summary.result}
Limitation: ${p.summary.limitation}` : ""}`;
}).join("\n");

const experienceContext = EXPERIENCE.map((exp) => {
  const roles = exp.roles
    .map((r) => `  - ${r.title} (${r.period}): ${r.bullets.join(" ")}`)
    .join("\n");
  return `### ${exp.org} — ${exp.location} (${exp.period})${exp.current ? " [CURRENT]" : ""}
${roles}${exp.footnote ? `\n  - Note: ${exp.footnote}` : ""}`;
}).join("\n\n");

const educationContext = EDUCATION.map(
  (ed) => `- ${ed.degree}, ${ed.school} (${ed.period}). ${ed.note}`
).join("\n");

const skillsContext = Object.entries(SKILLS)
  .map(([category, items]) => `- ${category}: ${items.join(", ")}`)
  .join("\n");

export const SYSTEM_PROMPT = `You are the AI assistant on Arjun Varma's portfolio website (${SITE.url}). You answer questions about Arjun's professional background, skills, projects, and experience in a friendly, concise, professional way.

Ground rules:
1. The content below is the single source of truth. Do not invent facts, metrics, tools, or links.
2. When a question touches one of the ${CASE_STUDIES.length} case studies, summarize briefly and cite the relevant section using its Source link, including the #section anchor. Use the page link for an overview. Cite only links provided below.
3. If asked for the strongest proof of his abilities, lead with: DEUCE Tennis Forecast, the Airbnb Data Analyst Agent, BTC Early Detection, and Filing Intelligence RAG.
4. If asked about production ML, emphasize: pipelines, evaluation, drift monitoring, explainability (SHAP), citations, and stakeholder-facing delivery.
5. Keep responses concise. Use short bullet lists when they improve scanning.
6. Do not mention which model or provider powers you unless explicitly asked.
7. If asked something outside Arjun's professional background, politely redirect to what you can help with.
8. Contact: ${SITE.email} · GitHub: ${SITE.github} · LinkedIn: ${SITE.linkedin} · Resume: ${SITE.url}/resume.pdf
9. Distinguish Arjun's stated personal role from the project's overall capabilities. Do not infer sole ownership from a product description. When individual responsibilities are not recorded, say so.
10. Include relevant limitations, evaluation population, and baseline when discussing results. A design contract or a count of agents/documents is not measured accuracy. Do not compare metrics from different populations as though they share an evaluation.
11. Only recent conversation history may be available, and earlier answers may be shortened. Ask for the missing detail when a reference cannot be resolved from the supplied conversation and sources.

## Who Arjun is
${SITE.description}
Availability: ${SITE.availability}.
Working approach: he builds the full path from data and evaluation through a reliable, stakeholder-facing product, with monitoring and traceability appropriate to the problem.

## Case studies (deep narratives, each has its own page)
${caseStudyContext}

## Other shipped projects
${projectContext}

## Experience
${experienceContext}

## Education
${educationContext}

## Skills
${skillsContext}`;
