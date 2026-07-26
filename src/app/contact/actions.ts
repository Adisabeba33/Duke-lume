"use server";

import { headers } from "next/headers";
import { getArtwork } from "@/content/artworks";
import { site } from "@/content/site";
import {
  INQUIRY_TYPES,
  type ContactState,
  type InquiryType,
} from "@/content/inquiry";

// --- naive in-process rate limit -------------------------------------------
// Serverless instances are short-lived, so this is a speed bump against bursts
// rather than a hard guarantee. Swap for a shared store (KV/Redis) if abuse
// ever becomes real.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) {
    for (const [k, v] of hits) if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitInquiry(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot — real people leave this empty.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const type = String(formData.get("type") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const artworkSlug = String(formData.get("artwork") ?? "").trim();

  // Echoed back on every failure path so nothing typed is lost.
  const values = { name, email, type, message };

  // --- server-side validation ---
  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!INQUIRY_TYPES.includes(type as InquiryType))
    errors.type = "Please choose an inquiry type.";
  if (message.length < 10)
    errors.message = "Please add a little more detail (at least 10 characters).";
  if (message.length > 5000) errors.message = "Please keep the message under 5000 characters.";
  if (Object.keys(errors).length > 0)
    return { status: "error", errors, values };

  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      errors: { form: "Too many messages just now — please try again in a minute." },
      values,
    };
  }

  const artwork = artworkSlug ? getArtwork(artworkSlug) : undefined;
  const subject = artwork
    ? `${type} — ${artwork.title} (${artwork.year})`
    : `${type} — Duke&Lume`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Type: ${type}`,
    artwork
      ? `Artwork: ${artwork.title} (${artwork.year}) — https://dukelume.com/artwork/${artwork.slug}`
      : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL ?? site.contactEmail;
  const from = process.env.INQUIRY_FROM_EMAIL;

  // Delivery is only possible once mail credentials exist. Never pretend the
  // message was sent — tell the visitor plainly and give them the address.
  if (!apiKey || !from) {
    return {
      status: "error",
      errors: {
        form: `Our form isn’t connected yet — please email ${to} directly and we’ll reply personally.`,
      },
      values,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text: body,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch {
    // Log without personal data.
    console.error("[contact] delivery failed");
    return {
      status: "error",
      errors: {
        form: `We couldn’t send that just now. Please email ${to} and we’ll reply personally.`,
      },
      values,
    };
  }

  return { status: "success" };
}
