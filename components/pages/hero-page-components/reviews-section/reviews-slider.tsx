import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReviewsBlock from "./reviews-block";

import { Reviews } from "@/types/catalog";

const chunkArray = (chunkSize: number, array?: Reviews[]) => {
  if (!array) {
    return [];
  }
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize)); // Добавляем подмассив по 2 элемента
  }
  return result;
};

interface ReviewsSliderProps {
  reviews?: Reviews[];
}

const ReviewsSlider: React.FC<ReviewsSliderProps> = ({ reviews }) => {
  const chunkRevies = chunkArray(2, reviews);

  return (
    <div className="py-8">
      <Carousel opts={{ loop: true }} className="w-full">
        <div className="overflow-x-hidden">
          <CarouselContent>
            {chunkRevies.length
              ? chunkRevies.map((chungReview, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <ReviewsBlock chungReview={chungReview} />
                    </div>
                  </CarouselItem>
                ))
              : null}
          </CarouselContent>
        </div>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>
    </div>
  );
};

export default ReviewsSlider;
