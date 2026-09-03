import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { sections, sectionSlug, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...sections.map((section) => ({ url: `${site.url}/${sectionSlug(section)}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...getAllArticles().map((article) => ({ url: `${site.url}/insights/${article.slug}`, lastModified: new Date(article.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
