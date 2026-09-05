export const site = {
  name: "Brands Essential Insights",
  shortName: "BE Insights",
  description: "Practical guides on website design, development, SEO, AEO and conversion—created by Brands Essential for founders and growing businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://insights.brands-essential.com",
  wixUrl: "https://www.brands-essential.com",
  email: "varsha@brands-essential.com",
};

export const sections = ["Blogs", "Guides", "Case Studies", "Resources"] as const;
export type Section = (typeof sections)[number];

export const sectionSlug = (section: Section) => section.toLowerCase().replaceAll(" ", "-");
