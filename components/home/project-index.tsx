import { PROJECT_INDEX } from "@/content/projects";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { ProjectExplorer } from "@/components/home/project-explorer";

export function ProjectIndex() {
  const secondaryProjects = PROJECT_INDEX.filter((project) => project.title !== "ClaimReady");

  return (
    <Section id="projects" index="02" label="MORE SHIPPED WORK">
      <Reveal start="top 85%">
        <ProjectExplorer projects={secondaryProjects} />
      </Reveal>
    </Section>
  );
}
