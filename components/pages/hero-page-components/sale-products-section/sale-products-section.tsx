import ProductsSaleCarousel from "./products-carousel";
import BaseContainer from "@/components/general/containers/base-container";
import { cn } from "@/lib/utils";

import { Product } from "@/types/catalog";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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
        <ProductsSaleCarousel products={products} titleBlock={title} />
      </div>
      <div className="flex gap-2 items-center text-primary mt-6">
        <Link
          className="text-sm font-bold"
          href={"/catalog/kondczionery/split-sistemy"}
        >
          В каталог
        </Link>
        <ArrowLongRightIcon className="size-5" />
      </div>
    </BaseContainer>
  );
};

export default SaleProductsSection;
