# Duke&Lume — Digital Art Gallery

A quiet, museum-like digital gallery. Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**.
The interface stays out of the way so the works lead — warm milky background, large Instrument Serif
headings, an asymmetric editorial grid, and calm motion.

This repository is **Stage 1 (Foundation) + the full Home page**. The design system, layout, content
model, SEO plumbing and a working artwork page are in place; the remaining pages are on-brand
placeholders ready to be built out.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static)
```

## How content works (the "throw a painting into chat" flow)

Content is **not hard-coded into components**. Every work lives as a typed entry in
`src/content/`, and the front-end reads from there. The data shape mirrors the future Sanity CMS
schema, so we can migrate to a real CMS later without reshaping the site.

**To add a new artwork:**

1. Drop the image file into `public/artworks/` (e.g. `public/artworks/the-sovereign.jpg`).
2. Add one entry to `src/content/artworks.ts` — set `image.src`, its real `width`/`height`,
   an `alt` text describing the work, the `collectionId`, `orientation`, and where it should appear
   (`featured`, `displaySize`, `homepageOrder`, …).

That's it — no component changes. Until an image file exists, leave `image.src` off and the gallery
renders a composed tonal placeholder (using the entry's `tone`) so the layout never breaks.

> In practice you send the painting in chat, we decide together which collection / page / size it
> belongs to, and that becomes one commit here.

### Content files

| File | Purpose |
| --- | --- |
| `src/content/artworks.ts` | All works + helpers (`getFeaturedArtworks`, `getArtworksByCollection`, …) |
| `src/content/collections.ts` | Curated collections |
| `src/content/site.ts` | Editable homepage / site copy (hero text, vision, contact) |
| `src/content/types.ts` | The content model (mirrors the CMS schema, incl. hidden commerce fields) |

The demo works currently in the repo reconstruct the reference mockup so the design can be reviewed
live. Replace them with Duke&Lume's real works.

## Structure

```
src/
  app/                 routes: / /gallery /collections /about /contact /artwork/[slug]
                       + robots.ts, sitemap.ts, not-found.tsx
  components/
    layout/            Header, MobileMenu (fullscreen), Footer, Container, PagePlaceholder
    homepage/          Hero, FeaturedWorks, Vision, CollectionPreview, FullBleedArtwork, Newsletter
    artwork/           ArtworkImage (real file or tonal placeholder), ArtworkCard
    typography/ ui/    SectionLabel, ArrowLink, Reveal, Seal
  content/             the data layer described above
```

## Design tokens

Defined once in `src/app/globals.css` (`@theme`) — colours (`#F5F3EF` background, muted bronze accent),
the type scale (Display / H1–H3 / Body / Micro-label), spacing and the quiet easing curve
`cubic-bezier(0.22, 1, 0.36, 1)`. Motion respects `prefers-reduced-motion`.

## Roadmap (from the brief)

- **Stage 2 — Core gallery:** Gallery (Exhibition/Archive + filters), Collections list & detail,
  About, richer artwork detail.
- **Stage 3 — Interaction:** lightbox (zoom / pan / swipe / keyboard), page transitions, inquiry form
  wired to email (Resend).
- **Stage 4+ — Content, SEO polish, performance, and later commerce** — the model already carries the
  hidden `status` / `price` / edition fields for it.
