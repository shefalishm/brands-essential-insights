import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { ToolsNavigation } from "@/components/ToolsNavigation";
import { getArticlesBySection } from "@/lib/content";
import { toolCategories, toolsReviewed } from "@/lib/marketing-tools";
import { site } from "@/lib/site";

const title = "Marketing Tools & Tips: Compare Software for Small Teams";
const description = "Explore video, social media, CRM, email and AI automation tools. Research-led vendor comparisons and practical tips for budget-conscious marketing teams.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/marketing-tools" },
  openGraph: { title, description, url: "/marketing-tools", type: "website" },
  twitter: { title, description },
};

export default function MarketingToolsPage() {
  const articles = getArticlesBySection("Marketing Tools & Tips");
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: `${site.url}/marketing-tools`, dateModified: toolsReviewed,
    mainEntity: { "@type": "ItemList", itemListElement: toolCategories.map((category, index) => ({ "@type": "ListItem", position: index + 1, name: category.name, url: `${site.url}/marketing-tools/${category.slug}` })) } };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className="tools-hero"><div className="shell"><p className="kicker">Marketing Tools &amp; Tips</p><h1>A useful toolkit.<br /><span>Not another subscription pile.</span></h1><p>Find software for the work you actually need to do. Compare AI and conventional tools, understand the trade-offs, and build a workflow your team can maintain.</p><a className="button" href="#tool-categories">Explore the categories <span aria-hidden="true">↓</span></a></div></section>
    <div className="shell"><ToolsNavigation /></div>
    <section id="tool-categories" className="shell tools-directory" aria-labelledby="tools-directory-title">
      <div className="tools-section-heading"><div><p className="section-label">Choose the job first</p><h2 id="tools-directory-title">Tools by category</h2></div><p>15 tools across five categories. AI is one part of the toolkit, not a requirement for every job.</p></div>
      <div className="tools-category-grid">{toolCategories.map((category) => <article className="tools-category-card" key={category.slug}>
        <h3><Link href={`/marketing-tools/${category.slug}`}>{category.name} <span aria-hidden="true">↗</span></Link></h3><p>{category.description}</p>
        <ul>{category.tools.map((tool) => <li key={tool.name}><a href={tool.url} target="_blank" rel="noopener noreferrer">{tool.name} <span aria-hidden="true">↗</span></a></li>)}</ul>
        <Link className="tools-text-link" href={`/marketing-tools/${category.slug}`}>Compare tools and see practical tips →</Link>
      </article>)}</div>
    </section>
    <section className="shell tools-comparisons" aria-labelledby="tools-comparison-title"><p className="section-label">Read before you buy</p><h2 id="tools-comparison-title">Vendor comparisons</h2><div className="card-grid">{articles.map((article) => <ArticleCard article={article} key={article.slug} />)}</div></section>
    <section id="our-approach" className="shell tools-method"><p className="section-label">How to use this library</p><h2>Evidence, trade-offs and a workable next step.</h2><p>These are research-led buying guides, not hands-on benchmark tests or guarantees. Vendor information was checked on October 29, 2026. Features, prices and plan limits can change; confirm your exact requirements with the vendor before purchasing. No affiliate tracking parameters have been added to the vendor links.</p><p>Each category includes a shortlist, a practical workflow checklist and a detailed comparison. Recommendations are editorial judgements for stated needs, not universal rankings. We do not publish invented ratings, savings or client results.</p><a className="button" href={`${site.wixUrl}/contact`}>Discuss your marketing workflow <span aria-hidden="true">↗</span></a></section>
  </>;
}
