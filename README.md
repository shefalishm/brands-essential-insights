# Brands Essential Insights

An independent Next.js content hub for Brands Essential. The existing Wix website remains the main marketing site; this repository is designed for `insights.brands-essential.com`.

## Local development

```bash
npm install
npm run dev
```

## Publishing content

Add an `.md` or `.mdx` file to `content/` with this frontmatter:

```yaml
---
title: "Article title"
description: "Short SEO and card description"
section: "Blogs" # Blogs, Guides, Case Studies, or Resources
date: "2026-09-03"
readingTime: "6 min read"
featured: false
eyebrow: "Optional article-side summary"
---
```

The article route, category listing, metadata, sitemap entry, and schema markup are generated automatically.

## Vercel

Import only this repository into a new Vercel project. Set `NEXT_PUBLIC_SITE_URL` to the production URL if it differs from `https://insights.brands-essential.com`. Add the custom domain only after its DNS is ready; no change to the Wix application is required.
