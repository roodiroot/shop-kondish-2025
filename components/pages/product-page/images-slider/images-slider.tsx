"use client";

import { memo, useCallback, useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { CarouselApi } from "@/components/ui/carousel";

import SliderElementThumb from "@/components/pages/product-page/images-slider/slider-element-thumb";
import SliderElementImage from "@/components/pages/product-page/images-slider/slider-element-image";

import { ImageForProduct } from "@/types/catalog";

interface ImagesSliderProps extends React.HtmlHTMLAttributes<HTMLElement> {
  images?: ImageForProduct[] | null;
}

const ImagesSlider: React.FC<ImagesSliderProps> = memo(({ images }) => {
  if (!images?.length) {
    return (
      <div className="flex flex-col-reverse">
        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="flex h-24 rounded-md" />
              </div>
            ))}
          </div>
        </div>
        <Skeleton className="w-full pb-[100%]" />
      </div>
    );
  }

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageUrls = images?.map((image) => ({
    main: image.url,
    thumb: image.formats?.thumbnail?.url,
  }));

  const handleScroll = useCallback(
    (index: number) => {
      carouselApi?.scrollTo(index);
    },
    [carouselApi]
  );

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCurrentIndex(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  return (
    <div className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <SliderElementThumb
          images={imageUrls?.map((i) => i.thumb) || []}
          onSlideChange={handleScroll}
          currentIndex={currentIndex}
        />
      </div>
      <SliderElementImage
        images={imageUrls?.map((i) => i.main) || []}
        setApi={setCarouselApi}
      />
    </div>
  );
});

export default ImagesSlider;
