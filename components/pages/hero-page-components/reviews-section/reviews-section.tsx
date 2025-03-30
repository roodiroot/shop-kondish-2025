import StarSection from "./star-section";
import ReviewsSlider from "./reviews-slider";
import BaseContainer from "@/components/general/containers/base-container";

import { Reviews } from "@/types/catalog";

interface ReviewsSectionProps {
  reviews?: Reviews[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <BaseContainer className="mt-10">
      <StarSection />
      <ReviewsSlider reviews={reviews} />
    </BaseContainer>
  );
};

export default ReviewsSection;
