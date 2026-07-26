import type { SiteSettings } from "./types";

// Editable site-wide copy. In the CMS migration these become a singleton
// document; for now they live here so the homepage text stays out of the code.
export const site: SiteSettings = {
  siteTitle: "Duke&Lume",
  siteDescription:
    "Duke&Lume is a digital art gallery — a quiet, museum-like space for a collection of works born from imagination and crafted with detail.",
  heroTitle: "Art is our language. Welcome to our world.",
  heroText:
    "A collection of works born from imagination, crafted with detail and inspired by beauty in every form.",
  heroArtworkId: "the-sovereign",
  featuredArtworkIds: [
    "porcelain-requiem",
    "grande-dame",
    "blue-reliquary",
    "the-regent",
    "the-connoisseurs",
    "the-appointment",
  ],
  visionTitle: "Our Vision",
  visionText: "We create to inspire, connect and leave a trace of beauty.",
  pageQuote: "We do not paint objects. We paint impossible memories.",
  contactEmail: "contact@dukelume.com",
  instagramUrl: "https://instagram.com/dukelume",
  footerText: "All rights reserved",
};
