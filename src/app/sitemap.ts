import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/case-studies";
import { homeContent } from "@/content/home";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = homeContent.profile.website;

  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...Object.keys(caseStudies).map((slug) => ({
      url: `${base}/work/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
