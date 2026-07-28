# Duke&Lume — Digital Art Gallery

A quiet, museum-like digital gallery. Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**.
The interface stays out of the way so the works lead — warm milky background, large Instrument Serif
headings, an asymmetric editorial grid, and calm motion.

Every page is built: home, gallery (Exhibition + Archive with URL-synced filters), collections and
collection pages, artwork pages with a fullscreen viewer, About, and a working Contact form. Thirty
works across eight collections, with no placeholder copy anywhere.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Quality checks

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (Next core-web-vitals + TS)
npm test           # vitest — content model & helpers
npm run test:e2e   # playwright — desktop + 320px journeys
npm run check      # typecheck + lint + test + build
npm run blur       # regenerate LQIP placeholders after adding images
```

E2E builds and serves the production app. On a machine that already ships a
Chromium, point at it instead of downloading one:

```bash
PW_CHROMIUM_PATH=/path/to/chrome npm run test:e2e
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Enables contact-form delivery. Without it the form says so plainly and points to the email address. |
| `INQUIRY_FROM_EMAIL` | Verified sender address for those emails. |
| `INQUIRY_TO_EMAIL` | Where inquiries land (defaults to the site contact address). |
| `GALLERY_CONNECT_VERIFICATION_TOKEN` | Token issued by a platform this gallery is listed on; echoed in the manifest as proof of domain control. Omitted entirely when unset. |
| `GALLERY_CONNECT_BASE_URL` | Origin the manifest declares its works under. Defaults to the canonical `https://dukelume.com`; set it on a preview deployment so the manifest describes the site actually serving it. |

Nothing else is required — the site builds and runs without any secrets.

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

## Gallery Connect

The catalogue is also published as a machine-readable manifest at
**`/.well-known/gallery-connect.json`** — one document carrying every work, its images,
collections, availability and terms, so another platform can list this gallery without
scraping the pages or asking anyone to re-enter it.

It is generated from the same `src/content/` files the site renders, so it cannot drift
out of date. Format spec and the syncing contract: **[docs/gallery-connect.md](docs/gallery-connect.md)**.

```bash
curl -s https://dukelume.com/.well-known/gallery-connect.json | head -40
```

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
