import { HeroSection } from "@/components/homepage/HeroSection";
import { FeaturedWorks } from "@/components/homepage/FeaturedWorks";
import { VisionSection } from "@/components/homepage/VisionSection";
import { CollectionPreviewSection } from "@/components/homepage/CollectionPreviewSection";
import { FullBleedArtwork } from "@/components/homepage/FullBleedArtwork";
import { QuoteSection } from "@/components/homepage/QuoteSection";
import { NewsletterSection } from "@/components/homepage/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedWorks />
      <VisionSection />
      <FullBleedArtwork artworkId="the-connoisseurs" />
      <QuoteSection />
      <CollectionPreviewSection />
      <NewsletterSection />
    </>
  );
}
