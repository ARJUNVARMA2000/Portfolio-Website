import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudy } from "@/content/case-studies";
import { CaseStudyArticle } from "@/components/case-study/article";
import { SITE } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.subtitle,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: {
      type: "article",
      title: `${cs.title} — Arjun Varma`,
      description: cs.subtitle,
      url: `${SITE.url}/work/${cs.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: cs.title,
    description: cs.subtitle,
    url: `${SITE.url}/work/${cs.slug}`,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    dateCreated: cs.period,
    programmingLanguage: cs.tech,
    codeRepository: cs.links.find((link) => link.label === "GitHub")?.href,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema).replace(/</g, "\\u003c") }}
      />
      <CaseStudyArticle cs={cs} />
    </>
  );
}
