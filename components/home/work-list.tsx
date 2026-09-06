import { FEATURED_PROJECTS } from "@/content/project-catalog";
import { Section } from "@/components/section";
import { EvidenceWorkbench } from "@/components/home/evidence-workbench";

export function WorkList() {
  return (
    <Section id="work" index="01" label="Selected projects">
      <EvidenceWorkbench studies={FEATURED_PROJECTS} />
    </Section>
  );
}
