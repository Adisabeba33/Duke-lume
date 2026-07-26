import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Duke&Lume — Digital Art Gallery",
    short_name: "Duke&Lume",
    description:
      "A quiet, museum-like digital gallery of works by Duke&Lume.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F3EF",
    theme_color: "#F5F3EF",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
