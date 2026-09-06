import { getCaseStudy, type CaseStudySummary, type Metric } from "@/content/case-studies";
import { PROJECT_INDEX, type IndexProject, type ProjectCategory } from "@/content/projects";

export type CatalogProject = Omit<IndexProject, "live" | "repo"> & {
  description: string;
  live?: string;
  repo?: string;
  featured: boolean;
  contribution?: string;
  summary?: CaseStudySummary;
  metrics?: Metric[];
  statusNote?: string;
  unavailableNote?: string;
};

function fromCaseStudy(
  slug: string,
  category: ProjectCategory,
  description: string,
  featured: boolean
): CatalogProject {
  const study = getCaseStudy(slug);
  if (!study) throw new Error(`Missing case study for project: ${slug}`);
  const index = PROJECT_INDEX.find((project) => project.slug === slug);
  const live = study.links.find((link) => link.label.toLowerCase().startsWith("live"))?.href;
  const repo = study.links.find((link) => link.label === "GitHub")?.href;

  return {
    slug,
    title: study.title,
    year: study.period,
    category,
    description,
    oneLiner: index?.oneLiner ?? study.subtitle,
    tech: study.tech,
    live,
    repo,
    caseStudy: `/work/${slug}`,
    featured,
    contribution: study.role,
    summary: study.summary,
    metrics: study.metrics,
    statusNote: study.availabilityNote,
    unavailableNote: !live && !repo ? "Proprietary client work · public website and source code unavailable" : undefined,
  };
}

function fromIndex(
  slug: string,
  description: string,
  details: Partial<Pick<CatalogProject, "featured" | "contribution" | "summary" | "metrics">> = {}
): CatalogProject {
  const project = PROJECT_INDEX.find((candidate) => candidate.slug === slug);
  if (!project) throw new Error(`Missing project record: ${slug}`);
  return { ...project, description, featured: false, ...details };
}

/** The public project directory, in editorial order. SunCulture remains an archived
 * case study linked through experience, rather than a tenth featured/public project. */
export const PROJECT_CATALOG: CatalogProject[] = [
  fromCaseStudy(
    "deuce-tennis-forecast",
    "Forecasting",
    "Calibrated tennis forecasts, player analysis, and tournament simulations for ATP and WTA, with a daily modeling pipeline.",
    true
  ),
  fromCaseStudy(
    "airbnb-data-analyst-agent",
    "Agents",
    "A question becomes validated SQL, a chart, and a cited answer, with failed queries and their corrections visible in the trace.",
    true
  ),
  fromIndex(
    "claimready",
    "A planner and four specialists turn contracts, invoices, emails, and screenshots into structured NYC small-claims packets.",
    {
      featured: true,
      contribution: "Collaborative project",
      summary: {
        contribution: "Collaborative project built with the Columbia Agentic AI project team.",
        decision: "Separate document extraction, defendant resolution, jurisdiction checks, and drafting through typed handoffs.",
        result: "A deployed workflow produces a structured packet from uploaded documents, supported by multimodal extraction and legal retrieval.",
        limitation: "The public portfolio describes the shared system without an individual ownership breakdown or a measured end-to-end success rate.",
      },
      metrics: [
        {
          value: "4",
          label: "specialist agents",
          provenance: "Extractor, Defendant Resolver, Jurisdiction Checker, and Drafter",
          kind: "architecture",
          source: { label: "Repository architecture", href: "https://github.com/Agentic-AI-Project-Columbia/claimready" },
        },
        {
          value: "6",
          label: "legal-corpus documents",
          provenance: "Curated legal corpus documented in the repository; not an evaluation result",
          kind: "corpus",
          source: { label: "Repository corpus notes", href: "https://github.com/Agentic-AI-Project-Columbia/claimready" },
        },
        {
          value: "4",
          label: "packet documents",
          provenance: "Documented packet contents; not a measured success rate",
          kind: "architecture",
          source: { label: "Repository output contract", href: "https://github.com/Agentic-AI-Project-Columbia/claimready" },
        },
      ],
    }
  ),
  fromCaseStudy(
    "btc-early-detection",
    "Production ML",
    "A production cancer-detection model built around delayed claims, leakage-safe evaluation, and interpretable patient scores.",
    true
  ),
  fromCaseStudy(
    "filing-intelligence-rag",
    "Retrieval",
    "Financial-document research with scoped retrieval and citations that open the exact source page and highlight the evidence.",
    false
  ),
  fromIndex(
    "gaffer",
    "World Cup forecasts blend Elo, goal models, and tournament simulations, with frozen predictions and walk-forward evaluation."
  ),
  fromIndex(
    "classpulse",
    "Students respond by QR code; an LLM clusters their answers into live classroom themes, streamed to the instructor."
  ),
  fromIndex(
    "seance-ai",
    "Conversations with historical figures constrained by their eras, including multi-agent dinner-party discussions."
  ),
  fromIndex(
    "citation-format-checker",
    "A focused citation checker flags APA, MLA, and Chicago formatting violations with rule identifiers and quoted evidence."
  ),
];

export const FEATURED_PROJECTS = PROJECT_CATALOG.filter((project) => project.featured);
