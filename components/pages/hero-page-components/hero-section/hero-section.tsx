import { HeroScreens } from "@/data/hero-screen-api";

import HeroCarousel from "./hero-carousel";
import BaseContainer from "@/components/general/containers/base-container";

interface HeroSectionProps {
  heroScreens?: HeroScreens[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroScreens }) => {
  return (
    <BaseContainer>
      <HeroCarousel heroScreens={heroScreens} />
    </BaseContainer>
  );
};

export default HeroSection;
