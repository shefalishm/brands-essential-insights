"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const measurementId = "G-HX714HW1PT";
const storageKey = "be-analytics-consent-v1";
type Choice = "accepted" | "declined";
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  "ga-disable-G-HX714HW1PT"?: boolean;
};

function analyticsWindow() { return window as AnalyticsWindow; }
function cleanUrl(value: string) {
  try { const url = new URL(value); return url.origin + url.pathname; }
  catch { return ""; }
}

export function AnalyticsConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);
  const initialized = useRef(false);
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(storageKey); } catch { /* Keep consent optional if storage is unavailable. */ }
    // Read browser-only persisted consent after hydration, never during server rendering.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "accepted" || saved === "declined") setChoice(saved);
    else setOpen(true);
  }, []);

  useEffect(() => {
    if (choice !== "accepted") return;
    const target = analyticsWindow();
    target["ga-disable-G-HX714HW1PT"] = false;
    target.dataLayer = target.dataLayer || [];
    target.gtag = target.gtag || function (...args: unknown[]) {
      // Google expects an Arguments object, not a plain array.
      void args;
      // eslint-disable-next-line prefer-rest-params
      target.dataLayer!.push(arguments);
    };
    if (!initialized.current) {
      target.gtag("consent", "default", {
        analytics_storage: "granted", ad_storage: "denied",
        ad_user_data: "denied", ad_personalization: "denied",
      });
      target.gtag("js", new Date());
      target.gtag("config", measurementId, {
        send_page_view: false, allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: cleanUrl(window.location.href), page_referrer: cleanUrl(document.referrer),
      });
      initialized.current = true;
    } else target.gtag("consent", "update", { analytics_storage: "granted" });
    if (lastPage.current !== pathname) {
      target.gtag("event", "page_view", {
        send_to: measurementId, page_location: window.location.origin + pathname,
        page_referrer: cleanUrl(document.referrer), page_title: document.title,
        site_area: "insights",
      });
      lastPage.current = pathname;
    }
    const contactClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (!anchor) return;
      const url = new URL(anchor.href);
      if (url.hostname === "www.brands-essential.com" && url.pathname.replace(/\/$/, "") === "/contact") {
        target.gtag?.("event", "contact_click", {
          send_to: measurementId, site_area: "insights", page_path: pathname,
          page_location: window.location.origin + pathname,
          page_referrer: cleanUrl(document.referrer),
        });
      }
    };
    document.addEventListener("click", contactClick);
    return () => document.removeEventListener("click", contactClick);
  }, [choice, pathname]);

  function choose(next: Choice) {
    if (next === "declined") {
      const target = analyticsWindow();
      target["ga-disable-G-HX714HW1PT"] = true;
      target.gtag?.("consent", "update", { analytics_storage: "denied" });
      lastPage.current = null;
      for (const entry of document.cookie.split(";")) {
        const name = entry.split("=")[0].trim();
        if (name === "_ga" || name.startsWith("_ga_")) {
          for (const domain of ["", "; domain=insights.brands-essential.com", "; domain=.brands-essential.com"]) {
            document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax; Secure`;
          }
        }
      }
    }
    try { localStorage.setItem(storageKey, next); } catch { /* This visit still respects the choice. */ }
    setChoice(next);
    setOpen(false);
  }

  return <>
    {choice === "accepted" && <Script id="brands-essential-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />}
    <button className="cookie-settings" type="button" onClick={() => setOpen(true)}>Cookie settings</button>
    {open && <section className="analytics-consent" role="region" aria-label="Analytics cookie preferences">
      <div><strong>Optional analytics cookies</strong><p>Allow Google Analytics to help us understand visits and improve Insights. You can decline and keep browsing, or change your choice in Cookie settings. <a href="https://www.brands-essential.com/privacy-policy">Privacy policy</a>.</p></div>
      <div className="analytics-consent-actions"><button type="button" onClick={() => choose("declined")}>Decline</button><button type="button" onClick={() => choose("accepted")}>Allow analytics</button></div>
    </section>}
  </>;
}
