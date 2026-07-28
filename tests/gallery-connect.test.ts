import { describe, expect, it } from "vitest";
import {
  buildManifest,
  isPubliclyListed,
  manifestETag,
  serializeManifest,
} from "../src/lib/gallery-connect/manifest";
import { GALLERY_CONNECT_VERSION } from "../src/lib/gallery-connect/format";
import { artworks } from "../src/content/artworks";
import { collections } from "../src/content/collections";
import type { Artwork, ArtworkStatus } from "../src/content/types";

const manifest = buildManifest();

const stubArtwork = (status: ArtworkStatus): Artwork => ({
  id: "stub",
  slug: "stub",
  title: "Stub",
  year: 2025,
  orientation: "portrait",
  status,
  image: { width: 100, height: 100, alt: "a stub" },
});

describe("gallery connect manifest", () => {
  it("declares its format version first", () => {
    expect(manifest.gallery_connect).toBe(GALLERY_CONNECT_VERSION);
    expect(Object.keys(manifest)[0]).toBe("gallery_connect");
  });

  it("counts what it ships", () => {
    expect(manifest.artworks_count).toBe(manifest.artworks.length);
    expect(manifest.artworks.length).toBeGreaterThan(0);
  });

  it("gives every work the three fields a consumer's sync depends on", () => {
    for (const a of manifest.artworks) {
      expect(a.source_id).toBeTruthy();
      expect(a.canonical_url).toMatch(/^https:\/\//);
      expect(a.status).toBe("published");
    }
  });

  it("keeps source_id unique — duplicates on the consumer start here", () => {
    const ids = manifest.artworks.map((a) => a.source_id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("points canonical_url at a real page on this site", () => {
    const slugs = new Set(artworks.map((a) => a.slug));
    for (const a of manifest.artworks) {
      const slug = a.canonical_url.replace("https://dukelume.com/artwork/", "");
      expect(slugs.has(slug)).toBe(true);
    }
  });

  it("withholds drafts and hidden works", () => {
    expect(isPubliclyListed(stubArtwork("draft"))).toBe(false);
    expect(isPubliclyListed(stubArtwork("hidden"))).toBe(false);
    expect(isPubliclyListed(stubArtwork("published"))).toBe(true);
    expect(isPubliclyListed(stubArtwork("sold"))).toBe(true);
  });

  it("resolves images to absolute URLs with their real dimensions", () => {
    for (const a of manifest.artworks) {
      for (const img of a.images ?? []) {
        expect(img.url).toMatch(/^https:\/\/dukelume\.com\//);
        expect(img.width).toBeGreaterThan(0);
        expect(img.height).toBeGreaterThan(0);
      }
      const primaries = (a.images ?? []).filter((i) => i.role === "primary");
      expect(primaries.length).toBeLessThanOrEqual(1);
    }
  });

  it("says a price is on request rather than saying nothing", () => {
    // Every work is currently inquiry_only: for sale, figure by conversation.
    const inquiry = artworks.filter((a) => a.status === "inquiry_only").map((a) => a.id);
    for (const a of manifest.artworks.filter((a) => inquiry.includes(a.source_id))) {
      expect(a.availability).toBe("for_sale");
      expect(a.price?.visibility).toBe("on_request");
      expect(a.price?.amount).toBeUndefined();
    }
  });

  it("never publishes a price as a float", () => {
    for (const a of manifest.artworks) {
      if (a.price?.amount === undefined) continue;
      expect(Number.isInteger(a.price.amount)).toBe(true);
      expect(a.price.currency).toMatch(/^[A-Z]{3}$/);
    }
  });

  it("references only collections it also publishes", () => {
    const declared = new Set((manifest.collections ?? []).map((c) => c.source_id));
    const real = new Set(collections.map((c) => c.id));
    for (const a of manifest.artworks) {
      if (!a.collection_id) continue;
      expect(declared.has(a.collection_id)).toBe(true);
      expect(real.has(a.collection_id)).toBe(true);
    }
  });

  it("gives every work a content hash so a consumer can diff without clocks", () => {
    for (const a of manifest.artworks) {
      expect(a.content_hash).toMatch(/^sha256:[a-f0-9]{64}$/);
    }
  });

  it("hashes different works differently", () => {
    const hashes = manifest.artworks.map((a) => a.content_hash);
    expect(new Set(hashes).size).toBe(hashes.length);
  });

  it("is byte-identical between builds, so the ETag survives a deploy", () => {
    // The whole conditional-request flow rests on this: anything that varies
    // per build — a generated_at stamp, a commit sha — would hand every
    // consumer a fresh download every day for an unchanged catalogue.
    const first = serializeManifest(buildManifest());
    const second = serializeManifest(buildManifest());
    expect(first).toBe(second);
    expect(manifestETag(first)).toBe(manifestETag(second));
    expect(first).not.toMatch(/\d{4}-\d{2}-\d{2}T/);
  });

  it("emits no nulls — an absent field is the way to say nothing", () => {
    const body = serializeManifest(manifest);
    expect(body).not.toMatch(/:\s*null/);
    expect(JSON.parse(body)).toEqual(manifest);
  });

  it("states what a platform may do with the images", () => {
    expect(manifest.permissions).toMatchObject({
      index: true,
      store_images: true,
      display_images: true,
      attribution_required: true,
    });
  });

  it("omits the verification block until a platform issues a token", () => {
    expect(manifest.verification).toBeUndefined();
  });
});
