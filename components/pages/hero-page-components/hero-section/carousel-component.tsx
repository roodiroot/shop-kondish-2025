"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { HeroScreens } from "@/data/hero-screen-api";
import ProgressIndicator from "./progress-indikator";
import { useEffect, useRef, useState } from "react";

const AUTO_DELAY = 5000;

interface CarouselComponentProps {
  heroScreens: HeroScreens[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ heroScreens }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const autoplay = useRef(
    Autoplay({
      delay: AUTO_DELAY,
      playOnInit: true,
      stopOnInteraction: false,
    }),
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollToSlide = (index: number) => {
    api?.scrollTo(index);
    autoplay.current.reset();
  };
  return (
    <Carousel setApi={setApi} opts={{ loop: true }} plugins={[autoplay.current]} className="w-full">
      <CarouselContent>
        {heroScreens?.map((screen) => (
          <CarouselItem key={screen.documentId}>
            <div className="p-1">
              <div className="relative shadow-md overflow-hidden w-full aspect-[11/5] bg-gray-100 rounded-lg">
                <Image
                  width={1200}
                  height={1200}
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${screen?.image?.url}`}
                  alt={"command_kondish"}
                  className="absolute w-full h-full object-cover"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="py-2 sm:py-3">
        <div className="flex gap-1 justify-center">
          {new Array(count).fill("").map((_, index) => {
            const isActive = current === index + 1;
            return (
              <ProgressIndicator
                key={index}
                active={isActive}
                duration={AUTO_DELAY}
                onClick={() => scrollToSlide(index)}
              />
            );
          })}
        </div>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
