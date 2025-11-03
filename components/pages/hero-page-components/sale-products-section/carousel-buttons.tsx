"use client";

import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { use } from "react";

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
