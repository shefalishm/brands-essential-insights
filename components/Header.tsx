import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-main">
        <Link className="brand-logo" href={site.wixUrl} aria-label="Brands Essential main website">
          <Image src="/brands-essential-logo.png" alt="Brands Essential" width={569} height={640} priority />
          <span>Insights</span>
        </Link>
        <nav className="main-nav" aria-label="Main website navigation">
          <a href={site.wixUrl}>Home</a>
          <a href={`${site.wixUrl}/solutions`}>Solutions</a>
          <Link href="/" aria-current="page">Insights</Link>
          <a href={`${site.wixUrl}/contact`}>Contact</a>
        </nav>
        <a className="header-cta" href={`${site.wixUrl}/contact`}>Start a project <span aria-hidden="true">↗</span></a>
      </div>
      <div className="insights-nav-wrap">
        <nav className="shell insights-nav" aria-label="Insights categories">
          <span>Explore insights</span>
          <Link href="/blogs">Blogs</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/resources">Resources</Link>
        </nav>
      </div>
    </header>
  );
}
