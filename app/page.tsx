import { Hero } from "@/components/home/hero";
import { WorkList } from "@/components/home/work-list";
import { ProjectIndex } from "@/components/home/project-index";
import { Timeline } from "@/components/home/timeline";
import { About } from "@/components/home/about";
import { RecordedWalkthrough } from "@/components/home/recorded-walkthrough";
import { SITE } from "@/content/site";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    jobTitle: "Data Scientist and Machine Learning Engineer",
    sameAs: [SITE.github, SITE.linkedin],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Columbia University" },
      { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology" },
    ],
    worksFor: { "@type": "Organization", name: "Novo Nordisk" },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <WorkList />
      <Timeline />
      <RecordedWalkthrough />
      <ProjectIndex />
      <About />
    </main>
  );
}
