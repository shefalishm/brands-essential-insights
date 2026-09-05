import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source: "/blogs", destination: "/website-development", permanent: true },
      { source: "/guides", destination: "/seo-aeo", permanent: true },
      { source: "/case-studies", destination: "/marketing-strategy", permanent: true },
      { source: "/resources", destination: "/content-social-media", permanent: true },
    ];
  },
};

export default nextConfig;
