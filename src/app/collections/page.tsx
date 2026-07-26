import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Collections",
  description: "Works grouped by theme and idea — the collections of Duke&Lume.",
};

export default function CollectionsPage() {
  return (
    <PagePlaceholder
      label="Collections"
      title="Works, grouped by idea."
      note="The editorial collections list and individual collection pages come next. The collections data model and homepage preview are already live."
    />
  );
}
