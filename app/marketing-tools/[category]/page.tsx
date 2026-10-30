import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { ToolsNavigation } from "@/components/ToolsNavigation";
import { getArticlesBySection } from "@/lib/content";
import { findToolCategory, toolCategories } from "@/lib/marketing-tools";
import { site } from "@/lib/site";

type Props = { params: Promise<{ category: string }> };
export function generateStaticParams() { return toolCategories.map(({ slug }) => ({ category: slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = findToolCategory((await params).category);
  if (!category) return {};
  const title = `${category.name} Tools: Comparisons & Practical Tips`;
  const url = `/marketing-tools/${category.slug}`;
  return { title, description: category.description, alternates: { canonical: url }, openGraph: { title, description: category.description, url }, twitter: { title, description: category.description } };
}
export default async function ToolCategoryPage({ params }: Props) {
  const category = findToolCategory((await params).category);
  if (!category) notFound();
  const articles = getArticlesBySection("Marketing Tools & Tips").filter((article) => article.toolCategory === category.slug);
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", name: `${category.name} tools`, description: category.description, url: `${site.url}/marketing-tools/${category.slug}`, dateModified: category.reviewedOn, mainEntity: { "@type": "ItemList", itemListElement: category.tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Thing", name: tool.name, url: tool.url } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Insights", item: site.url }, { "@type": "ListItem", position: 2, name: "Marketing Tools & Tips", item: `${site.url}/marketing-tools` }, { "@type": "ListItem", position: 3, name: category.name, item: `${site.url}/marketing-tools/${category.slug}` }] },
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className="tools-hero tools-hero-category"><div className="shell"><Link className="tools-back" href="/marketing-tools">Marketing Tools &amp; Tips</Link><h1>{category.name}</h1><p>{category.description}</p></div></section>
    <div className="shell"><ToolsNavigation active={category.slug} /></div>
    <section className="shell tools-directory" aria-labelledby="vendor-title"><p className="section-label">Start with a shortlist</p><h2 id="vendor-title">Compare the options</h2><p className="tools-intro">Vendor sources checked {new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(category.reviewedOn))}. These summaries are not a claim that every feature is included in every plan. Follow the official source to confirm current terms.</p><div className="tools-vendor-grid">{category.tools.map((tool) => <article className="tools-vendor-card" key={tool.name}><h3>{tool.name}</h3><p>{tool.summary}</p><p><strong>Check before buying:</strong> {tool.check}</p><a href={tool.url} target="_blank" rel="noopener noreferrer">Official vendor details <span aria-hidden="true">↗</span></a></article>)}</div></section>
    <section className="shell tools-tips" aria-labelledby="tip-title"><p className="section-label">Tips that prevent rework</p><h2 id="tip-title">Before you commit</h2><ul>{category.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul><p>Use these editorial checks in a trial or demonstration. They are a test plan, not results we claim to have measured.</p></section>
    <section className="shell tools-comparisons" aria-labelledby="guide-title"><h2 id="guide-title">The detailed comparison</h2><div className="card-grid">{articles.map((article) => <ArticleCard article={article} key={article.slug} />)}</div><p><Link className="tools-text-link" href="/marketing-tools#our-approach">Read our comparison approach →</Link></p></section>
    <section className="shell tools-method"><h2>Need a practical setup plan?</h2><p>Bring your workflow, current tools and budget. Discuss what to keep, what to connect and what not to buy yet.</p><a className="button" href={`${site.wixUrl}/contact`}>Contact Brands Essential <span aria-hidden="true">↗</span></a></section>
  </>;
}
