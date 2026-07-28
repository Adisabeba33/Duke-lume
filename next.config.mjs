// Build stamp — evaluated once at build time. VERCEL_GIT_COMMIT_SHA is set on
// every Vercel deploy, so the footer version changes with each deploy.
const buildDate = new Date();
const pad = (n) => String(n).padStart(2, "0");
const buildStamp = `${buildDate.getUTCFullYear()}.${pad(
  buildDate.getUTCMonth() + 1
)}.${pad(buildDate.getUTCDate())}.${pad(buildDate.getUTCHours())}${pad(
  buildDate.getUTCMinutes()
)}`;
const commit = (process.env.VERCEL_GIT_COMMIT_SHA || "").slice(0, 7);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BUILD_STAMP: buildStamp,
    NEXT_PUBLIC_COMMIT: commit,
    // "production" | "preview" | "development" on Vercel; used to keep the
    // build stamp out of the public production footer.
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV ?? "development",
  },
  // The Gallery Connect manifest has to live at a dot-prefixed path, and Next's
  // file-system router skips dot-prefixed directories under app/. So the route
  // handler sits at a plain path and is served from the well-known address.
  async rewrites() {
    return [
      {
        source: "/.well-known/gallery-connect.json",
        destination: "/api/gallery-connect",
      },
    ];
  },
  // Canonical host is the bare domain. Anything else that can serve this app —
  // the Vercel preview host, or www — is redirected so links and SEO signals
  // consolidate on one origin (§24). Only applies in production.
  async redirects() {
    if (process.env.VERCEL_ENV !== "production") return [];
    const to = "https://dukelume.com/:path*";
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "duke-lume.vercel.app" }],
        destination: to,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.dukelume.com" }],
        destination: to,
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
    // A tighter ladder than the default: fewer generated variants means a much
    // higher CDN cache-hit rate, and 2560 is the widest public copy we ship (§25).
    deviceSizes: [420, 640, 828, 1080, 1440, 1920, 2560],
    imageSizes: [200, 320, 480],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
