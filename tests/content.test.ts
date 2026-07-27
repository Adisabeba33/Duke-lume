import { describe, expect, it } from "vitest";
import {
  artworks,
  getArtwork,
  getArtworksByCollection,
  getCollectionCover,
  getCollectionNeighbours,
  getFeaturedArtworks,
  getGalleryArtworks,
  getRelatedArtworks,
} from "../src/content/artworks";
import { collections, getCollection, getOrderedCollections } from "../src/content/collections";
import { BLUR } from "../src/content/blur";
import { site } from "../src/content/site";

describe("artwork data integrity", () => {
  it("has unique ids and slugs", () => {
    expect(new Set(artworks.map((a) => a.id)).size).toBe(artworks.length);
    expect(new Set(artworks.map((a) => a.slug)).size).toBe(artworks.length);
  });

  it("uses lowercase latin hyphenated slugs (§28)", () => {
    for (const a of artworks) expect(a.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it("gives every work real dimensions and a descriptive alt (§25, §27)", () => {
    for (const a of artworks) {
      expect(a.image.width).toBeGreaterThan(0);
      expect(a.image.height).toBeGreaterThan(0);
      // Alt text should describe the work, not repeat the title or say "image of".
      expect(a.image.alt.length).toBeGreaterThan(30);
      expect(a.image.alt.toLowerCase()).not.toMatch(/^image of/);
    }
  });

  it("points every work at an existing collection", () => {
    const ids = new Set(collections.map((c) => c.id));
    for (const a of artworks) {
      if (a.collectionId) expect(ids.has(a.collectionId)).toBe(true);
    }
  });

  it("makes no blanket edition claims (§17)", () => {
    for (const a of artworks) expect(a.editionType).toBeUndefined();
  });

  it("has a blur placeholder for every image", () => {
    for (const a of artworks) {
      if (a.image.src) expect(BLUR[a.image.src]).toMatch(/^data:image\/jpeg;base64,/);
    }
  });
});

describe("lookup helpers", () => {
  it("finds works by id or slug", () => {
    expect(getArtwork("the-sovereign")?.title).toBe("The Sovereign");
    expect(getArtwork("nope")).toBeUndefined();
  });

  it("excludes hidden and draft works from the gallery", () => {
    for (const a of getGalleryArtworks()) {
      expect(["hidden", "draft"]).not.toContain(a.status);
    }
  });

  it("orders featured works by homepageOrder", () => {
    const orders = getFeaturedArtworks().map((a) => a.homepageOrder ?? 999);
    expect([...orders]).toEqual([...orders].sort((x, y) => x - y));
  });
});

describe("collection covers (newest work)", () => {
  it("returns the collection's most recently added work", () => {
    for (const c of collections) {
      const works = getArtworksByCollection(c.id);
      if (works.length === 0) continue;
      const newest = works.reduce((m, w) =>
        (w.galleryOrder ?? -1) > (m.galleryOrder ?? -1) ? w : m
      );
      expect(getCollectionCover(c.id)?.slug).toBe(newest.slug);
    }
  });

  it("returns undefined for an empty collection", () => {
    expect(getCollectionCover("does-not-exist")).toBeUndefined();
  });
});

describe("collection-scoped neighbours (§20)", () => {
  it("never wraps past the ends of a collection", () => {
    for (const c of collections) {
      const works = getArtworksByCollection(c.id);
      if (works.length === 0) continue;
      expect(getCollectionNeighbours(works[0].slug).prev).toBeUndefined();
      expect(getCollectionNeighbours(works[works.length - 1].slug).next).toBeUndefined();
    }
  });

  it("steps forward inside the collection", () => {
    const noble = getArtworksByCollection("noble-creatures");
    expect(noble.length).toBeGreaterThan(1);
    expect(getCollectionNeighbours(noble[0].slug).next?.slug).toBe(noble[1].slug);
  });
});

describe("related works (§21)", () => {
  it("never includes the current work and respects the limit", () => {
    for (const a of artworks) {
      const related = getRelatedArtworks(a.slug, 3);
      expect(related.length).toBeLessThanOrEqual(3);
      expect(related.some((r) => r.slug === a.slug)).toBe(false);
      expect(new Set(related.map((r) => r.slug)).size).toBe(related.length);
    }
  });

  it("prefers the same collection when it has companions", () => {
    const related = getRelatedArtworks("the-sovereign", 1);
    expect(related[0]?.collectionId).toBe("noble-creatures");
  });
});

describe("collections", () => {
  it("has unique slugs and numbers, ordered by displayOrder", () => {
    expect(new Set(collections.map((c) => c.slug)).size).toBe(collections.length);
    expect(new Set(collections.map((c) => c.number)).size).toBe(collections.length);
    const orders = getOrderedCollections().map((c) => c.displayOrder ?? 99);
    expect([...orders]).toEqual([...orders].sort((x, y) => x - y));
  });

  it("resolves by slug and carries curatorial copy", () => {
    const c = getCollection("reliquaries");
    expect(c?.title).toBe("Reliquaries");
    expect(c?.descriptionLong?.length ?? 0).toBeGreaterThan(40);
  });
});

describe("site settings", () => {
  it("references a hero work that exists and featured works that all exist", () => {
    expect(getArtwork(site.heroArtworkId)).toBeDefined();
    for (const id of site.featuredArtworkIds) expect(getArtwork(id)).toBeDefined();
  });

  it("uses the dukelume.com contact address (§31)", () => {
    expect(site.contactEmail).toMatch(/@dukelume\.com$/);
  });
});
