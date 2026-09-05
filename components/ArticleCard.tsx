import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/content";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <article className={`article-card ${featured ? "article-card-featured" : ""}`}>
      <Link href={`/insights/${article.slug}`} aria-label={`Read ${article.title}`}>
        <div className="card-art" data-section={article.section}>
          <Image src={article.image} alt="" fill sizes={featured ? "(max-width: 900px) 100vw, 55vw" : "(max-width: 580px) 100vw, (max-width: 900px) 50vw, 33vw"} className="card-art-image" />
          <span className="card-art-shade" />
        </div>
        <div className="card-copy">
          <div className="meta"><span>{article.section}</span><span>{article.readingTime}</span></div>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <span className="read-more">Read insight <span aria-hidden="true">↗</span></span>
        </div>
      </Link>
    </article>
  );
}
