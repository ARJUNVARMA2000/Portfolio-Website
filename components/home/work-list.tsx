import { FEATURED_CASE_STUDIES } from "@/content/case-studies";
import { PROJECT_INDEX } from "@/content/projects";
import { TRACE_RUNS } from "@/content/traces";
import { Section } from "@/components/section";
import { EvidenceWorkbench, type WorkbenchStudy } from "@/components/home/evidence-workbench";

const WORKBENCH_ORDER = [
  "deuce-tennis-forecast",
  "airbnb-data-analyst-agent",
  "claimready",
  "btc-early-detection",
] as const;

const TRACE_PREVIEW_STEPS = [0, 1, 2, 3, 4, 5, 8]
  .map((index) => TRACE_RUNS[0]?.steps[index])
  .filter((step): step is NonNullable<typeof step> => Boolean(step));

export function WorkList() {
  const claimReady = PROJECT_INDEX.find((project) => project.title === "ClaimReady");
  const workbenchStudies = WORKBENCH_ORDER.flatMap((slug): WorkbenchStudy[] => {
    if (slug === "claimready") {
      if (!claimReady?.live) return [];
      return [
        {
          slug,
          title: claimReady.title,
          subtitle: claimReady.oneLiner,
          metrics: [
            { value: "4", label: "specialist agents", provenance: "ClaimReady repository architecture" },
            { value: "6", label: "legal-corpus documents", provenance: "Curated legal corpus documented in the repository" },
            { value: "4", label: "packet documents", provenance: "Documented generated packet contents" },
          ],
          tech: claimReady.tech,
          liveHref: claimReady.live,
          githubHref: claimReady.repo,
        },
      ];
    }

    const study = FEATURED_CASE_STUDIES.find((candidate) => candidate.slug === slug);
    if (!study) return [];
    const liveHref = study.links.find((link) => link.label.toLowerCase().startsWith("live"))?.href;
    const githubHref = study.links.find((link) => link.label === "GitHub")?.href;
    return [
      {
        ...study,
        liveHref,
        githubHref,
        caseStudyHref: `/work/${study.slug}`,
        statusNote: study.availabilityNote,
        unavailableNote:
          !liveHref && !githubHref
            ? "Private production system · public website and source are unavailable"
            : undefined,
        secondaryLink:
          study.slug === "airbnb-data-analyst-agent"
            ? { href: `/work/${study.slug}#trace`, label: "full trace" }
            : undefined,
      },
    ];
  });
  return (
    <Section id="work" index="01" label="SELECTED PROJECTS">
      <EvidenceWorkbench studies={workbenchStudies} traceSteps={TRACE_PREVIEW_STEPS} />
    </Section>
  );
}
