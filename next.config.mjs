/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Real artwork files live in /public/artworks. Remote CMS domains (e.g. Sanity CDN)
    // can be added here later without touching component code.
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
