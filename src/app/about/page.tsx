import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "About",
  description: "Who Duke&Lume are, and how the work is made.",
};

export default function AboutPage() {
  return (
    <PagePlaceholder
      label="About"
      title="We are Duke&Lume."
      note="The full About page — statement, story, approach and timeline — is part of the next stage."
    />
  );
}
