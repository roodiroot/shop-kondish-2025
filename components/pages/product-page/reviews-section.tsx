import Rating from "@/components/ui/rating";
import { SparklesIcon } from "@heroicons/react/24/outline";

interface ReviewsSectionProps {
  reviewsCount?: number;
  ratingValue: number;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  ratingValue,
  reviewsCount,
}) => {
  return (
    <div className="mt-3">
      <h3 className="sr-only">Отзывы</h3>
      <div className="flex items-center">
        <div className="flex flex-col items-start gap-1">
          <div>
            <Rating rating={ratingValue} />
          </div>
          <div className="text-sm ml-2 flex gap-1 items-center">
            <SparklesIcon className="size-4 text-indigo-600" />
            <div className="text-gray-700 text-xs">
              {reviewsCount ? (
                <span>AI на основе {reviewsCount} отзывов.</span>
              ) : (
                "Пока нет отзывов"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
