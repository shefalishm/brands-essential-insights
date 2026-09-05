import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesBySection } from "@/lib/content";
import { sections, sectionSlug, type Section } from "@/lib/site";

const descriptions: Record<Section, string> = {
  Blogs: "Expert perspectives on website design, SEO, AEO, conversion and digital strategy for founders and growing businesses.",
  Guides: "Step-by-step guides to building websites that rank in search, answer customer questions and generate qualified enquiries.",
  "Case Studies": "Website, SEO and AEO transformation blueprints showing how strategy, structure, content and conversion journeys work together.",
  Resources: "Practical website briefs, SEO migration checklists, launch tools and conversion audits for a stronger digital presence.",
};

const sectionKeywords: Record<Section, string[]> = {
  Blogs: ["website development blog", "SEO insights", "AEO insights", "website conversion strategy"],
  Guides: ["website development guides", "SEO guides", "AEO guides", "website planning"],
  "Case Studies": ["website case studies", "SEO case studies", "AEO strategy", "website redesign"],
  Resources: ["website resources", "SEO checklist", "website brief template", "conversion audit"],
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
