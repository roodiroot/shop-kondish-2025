import ProductsSaleCarousel from "./products-carousel";
import BaseContainer from "@/components/general/containers/base-container";
import { cn } from "@/lib/utils";

import { Product } from "@/types/catalog";

interface SaleProductsSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  products?: Product[];
}

const SaleProductsSection: React.FC<SaleProductsSectionProps> = ({
  title,
  products,
  className,
}) => {
  return (
    <BaseContainer className={cn("mt-10", className)}>
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="relative z-10 w-[93%] sm:w-full mt-4">
        <ProductsSaleCarousel products={products} />
      </div>
    </BaseContainer>
  );
};

export default SaleProductsSection;
