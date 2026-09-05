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
            <p className="kicker">Websites and marketing built to perform</p>
            <h1>Strategy that turns <span>attention</span> into growth.</h1>
          </div>
          <div className="hero-side">
            <p>In-depth guidance on website development, SEO, AEO, content and marketing, made practical for ambitious businesses.</p>
            <a className="button" href="#latest">Explore the latest <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="ticker" aria-label="Our areas of expertise"><span>Website Development</span><span>SEO &amp; AEO</span><span>Content &amp; Social</span><span>Marketing Strategy</span></div>
      </section>

      {featured && <section className="shell featured-section home-panel"><div className="panel-inner"><p className="section-label">Featured perspective</p><ArticleCard article={featured} featured /></div></section>}

      <section className="section-nav shell home-panel" aria-labelledby="explore-heading">
        <div><p className="section-label">Explore by expertise</p><h2 id="explore-heading">Find the answer your growth needs.</h2></div>
        <div className="section-links">{sections.map((section) => <Link href={`/${sectionSlug(section)}`} key={section}>{section}<b>↗</b></Link>)}</div>
      </section>

      <section id="latest" className="latest-section home-panel">
        <div className="shell"><div className="section-heading"><div><p className="section-label">Fresh thinking</p><h2>Latest insights</h2></div><p>Useful, direct, and designed to help you make the next marketing decision with confidence.</p></div>
          <div className="card-grid">{remaining.map((article) => <ArticleCard article={article} key={article.slug} />)}</div>
        </div>
      </section>

      <section className="contact-panel"><div className="shell contact-panel-inner"><p className="section-label">Ready to grow?</p><h2>Build a website and marketing system that earns attention, trust and enquiries.</h2><a className="button button-light" href={`${site.wixUrl}/contact`}>Contact us <span aria-hidden="true">↗</span></a></div></section>
    </>
  );
}
