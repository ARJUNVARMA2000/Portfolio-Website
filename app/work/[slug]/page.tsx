import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudy } from "@/content/case-studies";
import { CaseStudyArticle } from "@/components/case-study/article";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.subtitle,
    openGraph: {
      type: "article",
      title: `${cs.title} — Arjun Varma`,
      description: cs.subtitle,
    },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();
  return <CaseStudyArticle cs={cs} />;
}
