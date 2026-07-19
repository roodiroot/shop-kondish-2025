import Image from "next/image";

import { HeroScreens } from "@/data/hero-screen-api";
import CarouselComponent from "./carousel-component";

interface HeroCarouselProps {
  heroScreens?: HeroScreens[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ heroScreens }) => {
  return (
    <div className="py-4 overflow-hidden -mx-4 sm:mx-0">
      {heroScreens?.length ? (
        <CarouselComponent heroScreens={heroScreens} />
      ) : (
        <div className="relative shadow-sm  overflow-hidden w-full aspect-[1402/637] bg-gray-100 rounded-lg">
          <Image
            width={1402}
            height={637}
            priority
            src={"/images/hero2.jpg"}
            alt={"command_kondish"}
            className="w-full h-full object-cover z-0"
          />
        </div>
      )}
      <h1 className="sr-only uppercase font-thin text-xl sm:text-2xl text-[#FB4C01]">
        Устанавливаем и продаем кондиционеры.
      </h1>
    </div>
  );
};

export default HeroCarousel;
