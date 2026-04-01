export const dynamic = "force-dynamic";

import HeroSection from "@/components/home/HeroSection";
import QuickLinks from "@/components/home/QuickLinks";
import LatestNews from "@/components/home/LatestNews";
import FeaturedLibraries from "@/components/home/FeaturedLibraries";
import ProgramHighlight from "@/components/home/ProgramHighlight";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickLinks />
      <LatestNews />
      <FeaturedLibraries />
      <ProgramHighlight />
    </>
  );
}
