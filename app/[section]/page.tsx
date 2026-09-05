import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesBySection } from "@/lib/content";
import { sections, sectionSlug, type Section } from "@/lib/site";

const descriptions: Record<Section, string> = {
  "Website Development": "Detailed guidance for planning, designing and building fast, credible websites that turn qualified visits into enquiries.",
  "SEO & AEO": "Search and answer-engine strategies that make your expertise easier to discover, understand, verify and cite.",
  "Content & Social Media": "Practical systems for creating distinctive expert content and extending it across useful social formats.",
  "Marketing Strategy": "Clear frameworks for positioning, campaigns, measurement and focused growth without wasted activity.",
};

const sectionKeywords: Record<Section, string[]> = {
  "Website Development": ["website development", "website design", "conversion strategy", "website planning"],
  "SEO & AEO": ["SEO", "AEO", "answer engine optimization", "search strategy"],
  "Content & Social Media": ["content strategy", "social media strategy", "founder content", "content systems"],
  "Marketing Strategy": ["marketing strategy", "brand positioning", "campaign planning", "marketing growth"],
};

type Props = { params: Promise<{ section: string }> };

function findSection(slug: string) { return sections.find((section) => sectionSlug(section) === slug); }

export function generateStaticParams() { return sections.map((section) => ({ section: sectionSlug(section) })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const section = findSection((await params).section);
  if (!section) return {};
  const url = `/${sectionSlug(section)}`;
  const title = `${section}: Website, SEO & AEO Insights`;
  return {
    title,
    description: descriptions[section],
    keywords: sectionKeywords[section],
    alternates: { canonical: url },
    openGraph: { title, description: descriptions[section], url },
    twitter: { title, description: descriptions[section] },
  };
}

export default async function SectionPage({ params }: Props) {
  const section = findSection((await params).section);
  if (!section) notFound();
  const articles = getArticlesBySection(section);
  return <>
    <section className="listing-hero"><div className="shell"><p className="kicker">Brands Essential / {section}</p><h1>{section}</h1><p>{descriptions[section]}</p></div></section>
    <section className="shell listing-grid">{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</section>
  </>;
}
