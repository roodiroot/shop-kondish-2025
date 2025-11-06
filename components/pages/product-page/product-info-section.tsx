import PriceSection from "@/components/pages/product-page/price-section";
import TitleProduct from "@/components/pages/product-page/title-product";
import ActionButtons from "@/components/pages/product-page/action-buttons";
import ReviewsSection from "@/components/pages/product-page/reviews-section";
import AccordionDescription from "@/components/pages/product-page/accordion-description";
import MainDescriptionProductSection from "@/components/pages/product-page/main-description-product-section";

import { Product } from "@/types/catalog";

interface ProductInfoSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}
const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ product }) => {
  return (
    <div className="mt-10 px-1 sm:mt-16 sm:px-0 lg:mt-0">
      {/* Название продукта */}
      <TitleProduct name={product?.brand?.name + " " + product?.name} />

      {/* Блок цены */}
      <PriceSection price={product?.price} />

      {/* Блок отзывов  */}
      <ReviewsSection
        ratingValue={product?.reviews?.grade || 0}
        reviewsCount={product?.reviews?.count}
      />

      {/* Блок описания и основыных характеристик товара */}
      <MainDescriptionProductSection
        description={product?.description}
        area_of_room={product?.area_of_room}
        compressor_type={product?.compressor_type}
        series={product?.series}
        warranty_period={product?.warranty_period}
        category={product?.category?.name}
        brand={product?.brand?.name}
      />

      {/* Кнопки добавления в карзину и инзбранное */}
      <ActionButtons
        slug={product?.slug}
        documentId={product?.documentId}
        productMetrik={{
          id: product.documentId,
          name: product?.brand?.name + " " + product.name,
          price: isNaN(Number(product.price)) ? 0 : Number(product.price),
          quantity: 1,
          list: "Карточка товара",
          brand: product?.brand?.name || "",
          category: product.category?.name || "",
          position: 1,
        }}
      />

      {/* Блок описания продукта */}
      <AccordionDescription
        area_of_room={product?.area_of_room}
        energy_efficiency_class={product?.energy_efficiency_class}
        compressor_type={product?.compressor_type}
        noise_level={product?.noise_level}
        wifi_availability={product?.wifi_availability}
        series={product?.series}
        heating_power={product?.heating_power}
        cooling_power={product?.cooling_power}
        country_of_manufacturer={product?.country_of_manufacturer}
        warranty_period={product?.warranty_period}
        refrigerant={product?.refrigerant}
        max_pipe_length={product?.max_pipe_length}
        cooling_capacity={product?.cooling_capacity}
        color={product?.color}
        category={product?.category?.name}
        brand={product?.brand?.name}
        chars={product?.chars || []}
      />
    </div>
  );
};

export default ProductInfoSection;
