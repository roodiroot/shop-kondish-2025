"use client";

import Image from "next/image";
import { EmblaCarouselType } from "embla-carousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SliderElementMainImgProps
  extends React.HtmlHTMLAttributes<HTMLElement> {
  setApi: (api: EmblaCarouselType | undefined) => void;
  images: string[];
}
const SliderElementImage: React.FC<SliderElementMainImgProps> = ({
  setApi,
  images,
}) => (
  <div className="relative w-full">
    <Carousel
      opts={{ align: "start", loop: true }}
      setApi={setApi}
      className="w-full h-full overflow-hidden"
    >
      <CarouselContent>
        {images.map((imageSrc, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-square rounded-md overflow-hidden ">
              <div className="absolute p-[10%] w-full h-full inset-0 rounded-md overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${imageSrc}`}
                  alt="item_product"
                  className="h-full w-full object-contain object-center"
                  width={600}
                  height={600}
                />
                <span className="absolute inset-0 bg-gray-400/5"></span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-accent hover:text-accent bg-inherit hover:bg-inherit border-0 left-0 sm:hidden" />
      <CarouselNext className="text-accent hover:text-accent bg-inherit hover:bg-inherit border-0 right-0 sm:hidden" />
    </Carousel>
  </div>
);

export default SliderElementImage;
