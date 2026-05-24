import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.tina.io https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://assets.tinacms.io https://*.tina.io;
  font-src 'self' data:;
  connect-src 'self' https://content.tinajs.io https://identity.tinajs.io https://vitals.vercel-insights.com;
  frame-src 'self' https://www.google.com https://www.youtube-nocookie.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ["clsx"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "assets.tina.io" },
      { protocol: "https", hostname: "assets.tinacms.io" },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // www → apex (Vercel handles this at the domain level too — kept here as belt-and-braces)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.salute-villejuif.fr" }],
        destination: "https://salute-villejuif.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
