import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/case-studies";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...CASE_STUDIES.map((cs) => ({
      url: `${SITE.url}/work/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
