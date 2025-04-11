import { Product } from "@/types/catalog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCardHero from "./product-card-hero";

interface ProductsSaleCarouselProps {
  products?: Product[];
}

const ProductsSaleCarousel: React.FC<ProductsSaleCarouselProps> = ({
  products,
}) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full "
    >
      <div className="">
        <CarouselContent>
          {products
            ? products.map((product, index) => {
                const path = product?.images?.length
                  ? product?.images[0]?.url
                  : undefined;
                return (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2"
                  >
                    <div className="p-1 h-full">
                      <ProductCardHero
                        key={product.slug}
                        brand={product.brand?.name || ""}
                        name={product?.name || ""}
                        slug={product?.slug}
                        imagePrevievUrl={path ? path : null}
                        product={product}
                      />
                    </div>
                  </CarouselItem>
                );
              })
            : null}
        </CarouselContent>
      </div>
      <CarouselPrevious className="left-3" />
      <CarouselNext className="right-3" />
    </Carousel>
  );
};

export default ProductsSaleCarousel;
