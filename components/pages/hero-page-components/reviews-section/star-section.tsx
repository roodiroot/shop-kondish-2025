import AvitoStar from "./avito-star";
import YaStar from "./ya-star";

const StarSection = () => {
  return (
    <div className="flex flex-row md:gap-x-12">
      <YaStar />
      <AvitoStar />
    </div>
  );
};

export default StarSection;
