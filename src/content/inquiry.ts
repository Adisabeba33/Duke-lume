// Shared inquiry vocabulary. Kept out of the "use server" action file, which
// may only export async functions.

export const INQUIRY_TYPES = [
  "Artwork acquisition",
  "Print inquiry",
  "Exhibition",
  "Collaboration",
  "Press",
  "General inquiry",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export interface ContactState {
  status: "idle" | "success" | "error";
  /** Field-level messages, keyed by field name. */
  errors?: Partial<
    Record<"name" | "email" | "type" | "message" | "form", string>
  >;
  /** Echoed back on failure so a visitor never loses what they typed. */
  values?: { name?: string; email?: string; type?: string; message?: string };
}
