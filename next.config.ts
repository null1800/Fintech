import type { NextConfig } from "next";

// Define security headers
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; img-src * data:; media-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel.app; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-src *",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // hides "X-Powered-By: Next.js" header for security

  // REMOVED: The 'experimental.turbopack' block which caused the "Unrecognized key(s)" error.

  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: securityHeaders,
      },
    ];
  },

  // Optional: force HTTPS redirects (useful for custom domains)
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [{ type: "host", value: "yourdomain.com" }],
        destination: "https://yourdomain.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
// Note: Replace "yourdomain.com" with your actual domain in the redirects section if needed.
