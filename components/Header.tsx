import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Brands Essential Insights home">
          <span className="brand-mark">BE</span>
          <span>Brands Essential <em>Insights</em></span>
        </Link>
        <nav aria-label="Insights navigation">
          <Link href="/blogs">Blogs</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/resources">Resources</Link>
        </nav>
        <a className="back-link" href={site.wixUrl}>Main website <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  );
}
