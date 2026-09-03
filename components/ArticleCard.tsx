import Link from "next/link";
import type { Article } from "@/lib/content";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <article className={`article-card ${featured ? "article-card-featured" : ""}`}>
      <Link href={`/insights/${article.slug}`} aria-label={`Read ${article.title}`}>
        <div className="card-art" data-section={article.section}>
          <span>{article.section}</span>
          <b>{String(article.title.split(" ").length).padStart(2, "0")}</b>
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
