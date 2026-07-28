// Serves the Gallery Connect manifest. Reached at its real address,
// /.well-known/gallery-connect.json, through a rewrite in next.config.mjs —
// Next's router skips dot-prefixed directories, so the well-known path cannot
// be a folder under app/.

import { buildManifest, manifestETag, serializeManifest } from "@/lib/gallery-connect/manifest";

// node:crypto for the hashes. Explicit so a future default-runtime change
// cannot quietly break this route.
export const runtime = "nodejs";

// The catalogue is compiled in, so body and ETag are the same for the life of
// the process. Computed once, on first request.
let cached: { body: string; etag: string } | null = null;

function manifest() {
  if (!cached) {
    const body = serializeManifest(buildManifest());
    cached = { body, etag: manifestETag(body) };
  }
  return cached;
}

const cors = {
  // A public document, meant to be read by any platform that speaks the format.
  "Access-Control-Allow-Origin": "*",
  // Without this a browser-side consumer cannot read the ETag it needs in
  // order to send If-None-Match next time.
  "Access-Control-Expose-Headers": "ETag",
};

export async function GET(request: Request) {
  const { body, etag } = manifest();

  // If-None-Match is how a daily sync avoids re-downloading an unchanged
  // catalogue. The ETag is derived from the body alone — no build stamp — so
  // it stays put across deploys that do not touch the works.
  const inm = request.headers.get("if-none-match");
  if (inm && inm.split(",").some((tag) => tag.trim() === etag)) {
    return new Response(null, {
      status: 304,
      headers: { ETag: etag, "Cache-Control": "public, max-age=0, s-maxage=3600", ...cors },
    });
  }

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ETag: etag,
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      ...cors,
    },
  });
}

// If-None-Match is not a CORS-safelisted header, so a cross-origin conditional
// request is preflighted before it is ever sent.
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "If-None-Match",
      "Access-Control-Max-Age": "86400",
      ...cors,
    },
  });
}
