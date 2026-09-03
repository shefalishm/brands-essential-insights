import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticle } from "@/lib/content";
import { sectionSlug, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return getAllArticles().map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description, publishedTime: article.date, url: `/insights/${article.slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, datePublished: article.date, mainEntityOfPage: `${site.url}/insights/${article.slug}`, author: { "@type": "Organization", name: "Brands Essential" }, publisher: { "@type": "Organization", name: "Brands Essential", url: site.wixUrl } };
  return <article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <header className="article-hero"><div className="shell article-hero-inner"><Link href={`/${sectionSlug(article.section)}`}>{article.section}</Link><h1>{article.title}</h1><p>{article.description}</p><div className="article-meta"><time dateTime={article.date}>{new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(article.date))}</time><span>{article.readingTime}</span></div></div></header>
    <div className="article-band"><span>Brands Essential / Insight {article.slug.length.toString().padStart(2, "0")}</span></div>
    <div className="shell prose-wrap"><aside><span>In this insight</span><p>{article.eyebrow || "Practical thinking for modern teams."}</p><a href={`mailto:${site.email}`}>Discuss this with us ↗</a></aside><div className="prose"><MDXRemote source={article.body} /></div></div>
    <div className="shell article-end"><p>Keep exploring</p><Link href={`/${sectionSlug(article.section)}`}>More {article.section} <span>↗</span></Link></div>
  </article>;
}
