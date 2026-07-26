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
  },
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
