import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Website Development, SEO & AEO Insights | Brands Essential", template: `%s | Brands Essential Insights` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Brands Essential", url: site.wixUrl }],
  creator: "Brands Essential",
  publisher: "Brands Essential",
  category: "Website development and digital marketing",
  keywords: [
    "website development",
    "website design",
    "SEO",
    "search engine optimization",
    "AEO",
    "answer engine optimization",
    "conversion optimization",
    "content strategy",
    "digital marketing",
    "web design agency",
    "Brands Essential",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Website Development, SEO & AEO Insights | Brands Essential",
    description: site.description,
    url: site.url,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Brands Essential website, SEO and AEO insights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development, SEO & AEO Insights | Brands Essential",
    description: site.description,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#121f36" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>;
}
