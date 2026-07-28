# Gallery Connect — manifest format v0.1

A gallery publishes one document describing its own catalogue. Any platform
that speaks this format reads the whole thing in a single request: no scraping,
no CMS-specific parsers, no "we found 47 works, please check what we got wrong".

Duke&Lume serves it at:

```
https://dukelume.com/.well-known/gallery-connect.json
```

`/.well-known/` is the standard place for machine-readable facts about a domain
([RFC 8615](https://www.rfc-editor.org/rfc/rfc8615)), so the address is fixed
and needs no discovery step — a consumer just asks for it.

## Why this exists

Reading an arbitrary art site means guessing: a Shopify JSON endpoint here, a
WordPress REST route there, JSON-LD if the theme happens to emit it, and
otherwise a sitemap crawl that returns whatever the heuristics can salvage.
Every one of those paths produces partial, low-confidence data, and the artist
ends up correcting a form — which is the work they were trying to avoid.

The manifest removes the guessing. It is not a fallback for sites that already
publish structured data; it is the case those fallbacks are approximating.

## Shape

```jsonc
{
  "gallery_connect": "0.1",          // format version, first key, so it is cheap to sniff
  "gallery": {
    "name": "Duke&Lume",
    "url": "https://dukelume.com",
    "description": "…",
    "creator": { "type": "organization", "name": "Duke&Lume", "url": "…" },
    "contact": { "email": "…", "url": "…" },
    "links": [{ "rel": "instagram", "url": "…" }]
  },
  "permissions": {                   // what a consuming platform may do
    "index": true,
    "store_images": true,
    "display_images": true,
    "attribution_required": true
  },
  "verification": { "token": "…" },  // present once a platform has issued one
  "collections": [
    { "source_id": "noble-creatures", "title": "Noble Creatures", "url": "…", "position": 3 }
  ],
  "artworks": [
    {
      "source_id": "the-sovereign",
      "canonical_url": "https://dukelume.com/artwork/the-sovereign",
      "title": "The Sovereign",
      "subtitle": "Authority without a throne",
      "year": 2026,
      "excerpt": "…",
      "description_text": "…",
      "process_note": "…",
      "medium_raw": "Digital painting",
      "artform": "Digital art",
      "style": "painterly",
      "price": { "visibility": "on_request" },
      "availability": "for_sale",
      "edition": { "physical_original": false, "digital_file_for_sale": true },
      "status": "published",
      "collection_id": "noble-creatures",
      "images": [
        { "role": "primary", "url": "…", "width": 1707, "height": 2560, "alt": "…", "position": 0 }
      ],
      "content_hash": "sha256:ce93d104…"
    }
  ],
  "artworks_count": 39
}
```

`src/lib/gallery-connect/format.ts` is the normative definition — the types
there carry the per-field rules and are what a consumer should be written
against.

## Rules a consumer can rely on

**Absent means silent.** Every field but `source_id`, `canonical_url`, `title`
and `status` is optional, and a missing field makes no claim. There is one
deliberate exception worth reading twice: `"price": { "visibility":
"on_request" }` with no `amount` says *the work is priced and the figure comes
by conversation* — which is a different statement from omitting `price`
entirely, and different again from "free".

**Nulls never appear.** Omission is the only way this format says nothing, so
`null` handling is not something a consumer needs.

**Prices are integers in the minor unit.** 4800 USD is `480000`. Floats are not
accepted; a catalogue is not the place to meet binary rounding.

**`source_id` is the identity.** It survives retitling and URL changes. Match on
it and nothing else, or the first time an artist renames a work you get a
duplicate instead of an update.

**Unknown fields are ignored, never fatal.** Minor versions add optional fields.
Removing a field or changing what one means is a major bump.

## Syncing against it

```
GET /.well-known/gallery-connect.json
    If-None-Match: "<etag from last time>"

304  → nothing changed, stop here
200  → compare each artwork's content_hash against the stored one
```

The ETag is derived from the response body alone. **The document deliberately
carries no build timestamp** — a `generated_at` field would change on every
deploy, so every consumer would re-download an identical 66 KB catalogue daily
and the conditional request would buy nothing. A test pins this
(`tests/gallery-connect.test.ts`).

For the same reason `updated_at` is optional per artwork rather than required:
most static sites genuinely do not know it, and a fabricated timestamp is worse
than none. `content_hash` is the reliable signal — it needs no clock and no
trust.

**Disappearance is not deletion.** A work missing from `artworks` may mean it was
withdrawn, or it may mean the site was mid-deploy when you fetched. Treat it as
*probably* gone — hide it, keep the record. A gallery that wants a work
definitively removed keeps the entry and sets `"status": "removed"`, which is
unambiguous. This is why the status enum has a value for something you would
think could just be left out.

**`description_html`, when present, is third-party HTML** arriving over the
network. Sanitise against an allow-list before rendering.

## Permissions

Publishing this file is already an act of offering the catalogue for
syndication, but leaving that implicit is how it turns into an argument later.
The `permissions` block states it in a form a platform can point at, and a
gallery can revoke by editing one field rather than writing to a support
address.

An absent block should be read conservatively: index the metadata, link back,
do not host copies of the images.

## Verification

A platform issues a token; the gallery echoes it at `verification.token`. That
collapses two steps into one — the file the gallery already publishes carries
the proof, so the periodic re-check costs the gallery nothing and there is no
second artefact to keep alive.

On this site the token comes from `GALLERY_CONNECT_VERIFICATION_TOKEN`, and the
block is omitted entirely when the variable is unset.

## Deliberate non-decisions in 0.1

- **No autodiscovery `<link>` tag.** The well-known path is fixed; a second
  discovery route is a second thing to keep consistent for no new capability.
- **No pagination.** `next` is reserved in the type so adding it stays
  backwards-compatible, but a catalogue that fits in one document should be one
  document.
- **No image `content_hash`.** The origin site would have to hash its own files
  on every request. A consumer that downloads the image can hash it itself.
- **No i18n.** Single-language strings. Doing this properly means deciding
  between per-field language maps and per-manifest locales, and that decision
  should be made with a second language actually in hand.

## Implementation here

| File | Role |
| --- | --- |
| `src/lib/gallery-connect/format.ts` | The format. Types and rules, no Duke&Lume specifics. |
| `src/lib/gallery-connect/manifest.ts` | Maps `src/content/*` onto the format. The only file that knows both shapes. |
| `src/app/api/gallery-connect/route.ts` | HTTP: ETag, `304`, CORS, cache headers. |
| `next.config.mjs` | Rewrites the well-known path onto that route — Next's router skips dot-prefixed directories, so it cannot be a folder under `app/`. |

Drafts and hidden works never reach the manifest. Site statuses that mix
visibility with sale state (`inquiry_only`, `sold`) are split into the format's
separate `status` and `availability`; the mapping is an exhaustive switch, so
adding a status to the content model fails the build until someone decides what
it means in public.
