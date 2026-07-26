import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Contact",
  description: "Begin a conversation with Duke&Lume.",
};

export default function ContactPage() {
  return (
    <PagePlaceholder
      label="Contact"
      title="Let’s begin a conversation."
      note="The contact form with inquiry types and server-side handling arrives with the interaction stage."
    />
  );
}
