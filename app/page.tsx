import { Hero } from "@/components/home/hero";
import { WorkList } from "@/components/home/work-list";
import { ProjectIndex } from "@/components/home/project-index";
import { Timeline } from "@/components/home/timeline";
import { About } from "@/components/home/about";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkList />
      <ProjectIndex />
      <Timeline />
      <About />
    </main>
  );
}
