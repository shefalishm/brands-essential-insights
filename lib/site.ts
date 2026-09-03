export const site = {
  name: "Brands Essential Insights",
  shortName: "BE Insights",
  description: "Clear, practical thinking on brand, marketing, AI, and growth for founders and lean teams.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://insights.brands-essential.com",
  wixUrl: "https://www.brands-essential.com",
  email: "varsha@brands-essential.com",
};

export const sections = ["Blogs", "Guides", "Case Studies", "Resources"] as const;
export type Section = (typeof sections)[number];

export const sectionSlug = (section: Section) => section.toLowerCase().replaceAll(" ", "-");
