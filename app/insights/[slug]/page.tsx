import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticle } from "@/lib/content";
import { sectionSlug, site } from "@/lib/site";
import { ArticleCard } from "@/components/ArticleCard";
import { getEditorialExpansion } from "@/lib/editorial-depth";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return getAllArticles().map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: [article.title, article.section, "website development", "SEO", "AEO", "Brands Essential"],
    authors: [{ name: "Brands Essential", url: site.wixUrl }],
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description, publishedTime: article.date, url: `/insights/${article.slug}`, images: [{ url: article.image, alt: article.imageAlt }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [article.image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const related = getAllArticles().filter(({ slug, section }) => slug !== article.slug && section === article.section).slice(0, 3);
  const graph: Record<string, unknown>[] = [
    { "@type": "Article", headline: article.title, description: article.description, image: `${site.url}${article.image}`, datePublished: article.date, dateModified: article.date, mainEntityOfPage: `${site.url}/insights/${article.slug}`, articleSection: article.section, author: { "@type": "Organization", name: "Brands Essential", url: site.wixUrl }, publisher: { "@type": "Organization", name: "Brands Essential", url: site.wixUrl } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Insights", item: site.url }, { "@type": "ListItem", position: 2, name: article.section, item: `${site.url}/${sectionSlug(article.section)}` }, { "@type": "ListItem", position: 3, name: article.title, item: `${site.url}/insights/${article.slug}` }] },
  ];
  if (article.faqs?.length) graph.push({ "@type": "FAQPage", mainEntity: article.faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) });
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };
  return <article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <header className="article-hero"><div className="shell article-hero-inner"><Link href={`/${sectionSlug(article.section)}`}>{article.section}</Link><h1>{article.title}</h1><p>{article.description}</p><div className="article-meta"><time dateTime={article.date}>{new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(article.date))}</time><span>{article.readingTime}</span></div></div></header>
    <div className="article-band"><span>Brands Essential / Practical insight</span></div>
    {article.faqs?.length ? <section className="shell quick-read"><div><p className="section-label">The quick read</p><h2>Start with the essential answers.</h2></div><div className="quick-read-grid">{article.faqs.slice(0, 3).map(({ question, answer }) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section> : null}
    <div className="shell article-image"><Image src={article.image} alt={article.imageAlt} fill priority sizes="(max-width: 1280px) 100vw, 1280px" /></div>
    <div className="shell prose-wrap"><aside><span>Written by Brands Essential</span><p>{article.eyebrow || "Practical thinking for modern teams."}</p><a href={`${site.wixUrl}/contact`}>Discuss your project ↗</a></aside><div className="prose"><MDXRemote source={`${article.body}\n${getEditorialExpansion(article)}`} />
      {article.faqs?.length ? <section className="faq-section"><p className="section-label">Frequently asked questions</p><h2>Questions, answered</h2>{article.faqs.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section> : null}
      <section className="article-cta"><span>Need a website that earns attention and enquiries?</span><h2>Turn your expertise into a site people, and search systems, understand.</h2><p>Brands Essential combines website strategy, design, development, SEO and answer-engine readiness into one focused build.</p><div><a className="button button-light" href={`${site.wixUrl}/contact`}>Discuss your website <span>↗</span></a><a href={`mailto:${site.email}?subject=Website%20project%20enquiry`}>Email us directly</a></div></section>
    </div></div>
    <section className="shell related-section"><div className="article-end"><p>Keep exploring</p><Link href={`/${sectionSlug(article.section)}`}>More {article.section} <span>↗</span></Link></div><div className="card-grid">{related.map((item) => <ArticleCard key={item.slug} article={item} />)}</div></section>
  </article>;
}
