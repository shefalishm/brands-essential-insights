import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticle } from "@/lib/content";
import { sectionSlug, site } from "@/lib/site";
import { ArticleCard } from "@/components/ArticleCard";
import { getEditorialExpansion } from "@/lib/editorial-depth";
import { findToolCategory } from "@/lib/marketing-tools";

type Props = { params: Promise<{ slug: string }> };

const articleDateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatArticleDate(date: string) {
  return articleDateFormatter.format(new Date(date));
}

export function generateStaticParams() { return getAllArticles().map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords ?? [article.title, article.section, "website development", "SEO", "AEO", "Brands Essential"],
    authors: [{ name: "Brands Essential", url: site.wixUrl }],
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description, publishedTime: article.date, modifiedTime: article.updated ?? article.date, url: `/insights/${article.slug}`, images: [{ url: article.image, alt: article.imageAlt }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [article.image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const toolCategory = article.toolCategory ? findToolCategory(article.toolCategory) : undefined;
  const isTools = article.section === "Marketing Tools & Tips";
  const related = getAllArticles().filter(({ slug, section }) => slug !== article.slug && section === article.section).slice(0, 3);
  const graph: Record<string, unknown>[] = [
    { "@type": "Article", headline: article.title, description: article.description, image: `${site.url}${article.image}`, datePublished: article.date, dateModified: article.updated ?? article.date, mainEntityOfPage: `${site.url}/insights/${article.slug}`, articleSection: article.section, author: { "@type": "Organization", name: "Brands Essential", url: site.wixUrl }, publisher: { "@type": "Organization", name: "Brands Essential", url: site.wixUrl } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Insights", item: site.url }, { "@type": "ListItem", position: 2, name: article.section, item: `${site.url}/${sectionSlug(article.section)}` }, ...(toolCategory ? [{ "@type": "ListItem", position: 3, name: toolCategory.name, item: `${site.url}/marketing-tools/${toolCategory.slug}` }] : []), { "@type": "ListItem", position: toolCategory ? 4 : 3, name: article.title, item: `${site.url}/insights/${article.slug}` }] },
  ];
  if (article.faqs?.length) graph.push({ "@type": "FAQPage", mainEntity: article.faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) });
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };
  return <article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <header className="article-hero">
      <div className="shell article-hero-inner">
        <div className="article-hero-copy">
          <Link className="article-category" href={toolCategory ? `/marketing-tools/${toolCategory.slug}` : `/${sectionSlug(article.section)}`}>
            {toolCategory?.name ?? article.section}
          </Link>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className="article-meta">
            <span>By Brands Essential</span>
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            {article.updated && <span>Updated <time dateTime={article.updated}>{formatArticleDate(article.updated)}</time></span>}
            <span>{article.readingTime}</span>
          </div>
        </div>
        <div className="article-image">
          <Image src={article.image} alt={article.imageAlt} fill preload sizes="(max-width: 580px) calc(100vw - 28px), (max-width: 900px) calc(100vw - 36px), (max-width: 1344px) 40vw, 510px" />
        </div>
      </div>
    </header>
    <div className="shell prose-wrap">
      {toolCategory && (
        <nav className="tools-article-context" aria-label="Comparison category">
          <Link href="/marketing-tools">All marketing tools</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/marketing-tools/${toolCategory.slug}`}>{toolCategory.name}</Link>
          <span>Research-led comparison · Checked {formatArticleDate(article.updated ?? article.date)}</span>
        </nav>
      )}
      {article.faqs?.length ? (
        <section className="quick-read" aria-labelledby="quick-read-title">
          <p className="section-label">The quick read</p>
          <h2 id="quick-read-title">Key questions at a glance</h2>
          {article.faqs.slice(0, 3).map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>
      ) : null}
      <div className="prose">
        <MDXRemote source={`${article.body}\n${getEditorialExpansion(article)}`} />
      {article.faqs?.length ? <section className="faq-section"><p className="section-label">Frequently asked questions</p><h2>Questions, answered</h2>{article.faqs.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</section> : null}
      <section className="article-cta"><span>{isTools ? "Need a clearer marketing workflow?" : "Need a website that earns attention and enquiries?"}</span><h2>{isTools ? "Choose tools that fit the work, not the other way around." : "Turn your expertise into a site people, and search systems, understand."}</h2><p>{isTools ? "Discuss your website, marketing and automation needs with Brands Essential. Start with your workflow and budget, then agree the scope." : "Brands Essential combines website strategy, design, development, SEO and answer-engine readiness into one focused build."}</p><div><a className="button button-light" href={`${site.wixUrl}/contact`}>{isTools ? "Discuss your marketing setup" : "Discuss your website"} <span>↗</span></a><a href={`mailto:${site.email}?subject=Website%20project%20enquiry`}>Email us directly</a></div></section>
      </div>
    </div>
    <section className="shell related-section"><div className="article-end"><p>Keep exploring</p><Link href={`/${sectionSlug(article.section)}`}>More {article.section} <span>↗</span></Link></div><div className="card-grid">{related.map((item) => <ArticleCard key={item.slug} article={item} />)}</div></section>
  </article>;
}
