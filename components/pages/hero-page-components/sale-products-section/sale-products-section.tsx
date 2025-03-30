import ProductsSaleCarousel from "./products-carousel";
import BaseContainer from "@/components/general/containers/base-container";

import { Product } from "@/types/catalog";

interface SaleProductsSectionProps {
  products?: Product[];
}

const SaleProductsSection: React.FC<SaleProductsSectionProps> = ({
  products,
}) => {
  return (
    <BaseContainer className="mt-10">
      <h3 className="text-xl font-bold">Сегодня со скидкой</h3>
      <div className="relative z-10 w-full mt-4">
        <ProductsSaleCarousel products={products} />
      </div>
    </BaseContainer>
  );
};

export default SaleProductsSection;
