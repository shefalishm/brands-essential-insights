import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { sections, sectionSlug, site } from "@/lib/site";
import { toolCategories } from "@/lib/marketing-tools";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...toolCategories.map((category) => ({ url: `${site.url}/marketing-tools/${category.slug}`, lastModified: new Date(category.reviewedOn), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...sections.map((section) => ({ url: `${site.url}/${sectionSlug(section)}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...getAllArticles().map((article) => ({ url: `${site.url}/insights/${article.slug}`, lastModified: new Date(article.updated ?? article.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
