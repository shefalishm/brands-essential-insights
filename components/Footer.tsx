import Link from "next/link";
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
        <div className="brand brand-inverse"><span className="brand-mark">BE</span><span>Brands Essential</span></div>
        <div className="footer-links">
          <Link href="/">Insights home</Link>
          <a href={`${site.wixUrl}/solutions`}>Solutions</a>
          <a href={`${site.wixUrl}/contact`}>Contact</a>
          <a href={`${site.wixUrl}/privacy-policy`}>Privacy</a>
        </div>
        <p>© {new Date().getFullYear()} Brands Essential</p>
      </div>
    </footer>
  );
}
