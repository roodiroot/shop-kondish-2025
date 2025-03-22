import BaseContainer from "@/components/general/containers/base-container";
import { Icon } from "@/components/ui/icon";
import ReviewsSlider from "./reviews-slider";
import { Reviews } from "@/types/catalog";
import AvitoStar from "./avito-star";
import YaStar from "./ya-star";
import StarSection from "./star-section";

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
