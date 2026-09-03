import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/content";
import { sections, sectionSlug, site } from "@/lib/site";

export default function Home() {
  const articles = getAllArticles();
  const featured = articles.find((article) => article.featured) || articles[0];
  const remaining = articles.filter((article) => article.slug !== featured?.slug).slice(0, 6);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@type": "Organization", name: "Brands Essential", url: site.wixUrl },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="kicker">Ideas for brands built to grow</p>
            <h1>Clarity for the <span>new age</span> of marketing.</h1>
          </div>
          <div className="hero-side">
            <p>Clear thinking on brand, content, AI, and growth—made practical for founders and lean teams.</p>
            <a className="button" href="#latest">Explore the latest <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="ticker" aria-hidden="true"><span>BRAND STRATEGY · AI & MARKETING · CONTENT SYSTEMS · SMARTER GROWTH ·</span></div>
      </section>

      {featured && <section className="shell featured-section"><p className="section-label">Featured perspective</p><ArticleCard article={featured} featured /></section>}

      <section className="section-nav shell" aria-labelledby="explore-heading">
        <div><p className="section-label">Explore</p><h2 id="explore-heading">Find the clarity you need.</h2></div>
        <div className="section-links">{sections.map((section, index) => <Link href={`/${sectionSlug(section)}`} key={section}><span>0{index + 1}</span>{section}<b>↗</b></Link>)}</div>
      </section>

      <section id="latest" className="latest-section">
        <div className="shell"><div className="section-heading"><div><p className="section-label">Fresh thinking</p><h2>Latest insights</h2></div><p>Useful, direct, and designed to help you make the next marketing decision with confidence.</p></div>
          <div className="card-grid">{remaining.map((article) => <ArticleCard article={article} key={article.slug} />)}</div>
        </div>
      </section>

      <section className="shell manifesto"><p className="kicker">Our point of view</p><blockquote>Marketing should feel <em>clearer</em>, not more complicated.</blockquote><p>We turn experience and emerging technology into practical systems that teams can actually use.</p></section>
    </>
  );
}
