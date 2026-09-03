import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesBySection } from "@/lib/content";
import { sections, sectionSlug, type Section } from "@/lib/site";

const descriptions: Record<Section, string> = {
  Blogs: "Sharp observations on brand, marketing, AI, and the work of growing well.",
  Guides: "Practical, step-by-step playbooks you can put to work today.",
  "Case Studies": "How strategy, design, and execution come together in the real world.",
  Resources: "Templates, checklists, and tools for leaner, smarter marketing.",
};

type Props = { params: Promise<{ section: string }> };

function findSection(slug: string) { return sections.find((section) => sectionSlug(section) === slug); }

export function generateStaticParams() { return sections.map((section) => ({ section: sectionSlug(section) })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const section = findSection((await params).section);
  return section ? { title: section, description: descriptions[section], alternates: { canonical: `/${sectionSlug(section)}` } } : {};
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
