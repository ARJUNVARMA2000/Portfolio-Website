import { PROJECT_CATALOG } from "@/content/project-catalog";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { ProjectExplorer } from "@/components/home/project-explorer";

export function ProjectIndex() {
  return (
    <Section id="projects" index="04" label="All projects">
      <Reveal start="top 85%">
        <ProjectExplorer projects={PROJECT_CATALOG} />
      </Reveal>
    </Section>
  );
}
