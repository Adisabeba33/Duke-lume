import { HeroSection } from "@/components/homepage/HeroSection";
import { FeaturedWorks } from "@/components/homepage/FeaturedWorks";
import { SoloWork } from "@/components/homepage/SoloWork";
import { FullBleedArtwork } from "@/components/homepage/FullBleedArtwork";
import { VisionSection } from "@/components/homepage/VisionSection";
import { MuseumMoment } from "@/components/homepage/MuseumMoment";
import { QuoteSection } from "@/components/homepage/QuoteSection";
import { CollectionPreviewSection } from "@/components/homepage/CollectionPreviewSection";
import { NewsletterSection } from "@/components/homepage/NewsletterSection";

// The homepage is sequenced like a walk through an exhibition — the scale and
// mood change from one section to the next so no screen is predictable (§1,2,11):
// dense hero → dense grid → a tiny work in whitespace → a cinematic full-bleed
// → a calm statement → a dark spotlit moment → a quiet quote → collections.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedWorks />
      <SoloWork artworkId="mother-lode" align="right" />
      <FullBleedArtwork artworkId="the-connoisseurs" />
      <VisionSection />
      <MuseumMoment artworkId="the-regent" />
      <QuoteSection />
      <CollectionPreviewSection />
      <NewsletterSection />
    </>
  );
}
