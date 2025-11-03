"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const CarouselButtons = () => {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  if (isDesktop) {
    return (
      <>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </>
    );
  }
  return null;
};

export default CarouselButtons;
