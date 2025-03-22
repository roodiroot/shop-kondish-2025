import { Icon } from "@/components/ui/icon";
import { Reviews } from "@/types/catalog";
import ReviewsItem from "./reviews-item";

interface ReviewsBlockProps {
  chungReview?: Reviews[];
}

const ReviewsBlock: React.FC<ReviewsBlockProps> = ({ chungReview }) => {
  return (
    <div className="p-6 w-full shadow-sm flex flex-col sm:flex-row gap-4 rounded-lg">
      {chungReview?.map((review) => (
        <ReviewsItem review={review} key={review.documentId} />
      ))}
    </div>
  );
};

export default ReviewsBlock;
