"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HeroScreens } from "@/data/hero-screen-api";

interface HeroCarouselProps {
  heroScreens?: HeroScreens[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ heroScreens }) => {
  if (!heroScreens?.length) {
    return (
      <div className="py-4">
        <div className="relative shadow-md  overflow-hidden w-full aspect-[1.5/2] sm:aspect-[2/1] lg:aspect-[2.7/1] bg-gray-100 rounded-lg">
          <Image
            width={1200}
            height={1200}
            src={"/fish.jpg"}
            alt={"command_kondish"}
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 p-10">
            <div className="max-w-xl space-y-4 mt-10">
              <div className="">
                Рейтинг лучших моделей по отзывам и продажам{" "}
              </div>
              <div className="text-2xl sm:text-3xl font-bold">
                Какие кондиционеры выбирают наши клиенты?
              </div>
              <p>
                Энергоэффективные, тихие, с умными функциями — выбирайте лучшее
                по выгодной цене!
              </p>
              <Button>Выбрать кондиционер</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="py-4">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000 })]}
        className="w-full"
      >
        <CarouselContent>
          {heroScreens.map((screen) => (
            <CarouselItem key={screen.documentId}>
              <div className="p-1">
                <div className="relative shadow-md overflow-hidden w-full aspect-[1.5/2] sm:aspect-[2/1] lg:aspect-[2.4/1] bg-gray-100 rounded-lg">
                  <Image
                    width={1200}
                    height={1200}
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${screen?.image?.url}`}
                    alt={"command_kondish"}
                    className="absolute w-full h-full object-cover"
                  />
                  {screen?.title ? (
                    <div className="absolute inset-0 p-10 ">
                      <div className="max-w-xl space-y-4 mt-10">
                        <div className="">{screen?.subtitle}</div>
                        <div className="text-2xl sm:text-3xl font-bold">
                          {screen?.title}
                        </div>
                        <p>{screen?.description}</p>
                        <Button>{screen?.buttonText}</Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
