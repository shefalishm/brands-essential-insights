import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <div className="shell footer-top">
        <div>
          <p className="kicker">Stay ahead without the noise</p>
          <h2>Simple, practical insights for smarter growth.</h2>
        </div>
        <a className="button button-light" href={`mailto:${site.email}?subject=Subscribe%20me%20to%20Brands%20Essential%20Insights`}>
          Join the insights list <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="shell footer-bottom">
        <a className="footer-logo" href={site.wixUrl} aria-label="Brands Essential main website"><Image src="/brands-essential-logo.png" alt="Brands Essential" width={569} height={640} /></a>
        <div className="footer-links">
          <a href={site.wixUrl}>Home</a>
          <a href={`${site.wixUrl}/solutions`}>Solutions</a>
          <Link href="/">Insights</Link>
          <a href={`${site.wixUrl}/contact`}>Contact</a>
          <a href={`${site.wixUrl}/privacy-policy`}>Privacy</a>
        </div>
        <p>© {new Date().getFullYear()} Brands Essential</p>
      </div>
    </footer>
  );
}
