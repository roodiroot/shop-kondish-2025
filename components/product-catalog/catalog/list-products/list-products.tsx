"use client";

import { useSearchParams } from "next/navigation";

import { Product } from "@/types/catalog";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchProducts } from "@/queries/products";
import { getFiltersFromQueryString } from "@/utils/filters";

import SortForCatalog from "@/components/product-catalog/catalog/sort-and-filterls.tsx/sort-for-catalog";
import ProductCard from "@/components/product-catalog/catalog/list-products/product-card";
import PaginationBlock from "@/components/product-catalog/catalog/pagination/pagination-block";

interface ListProductsProps extends React.HTMLAttributes<HTMLDivElement> {
  string_params?: string;
  isFiltersButton?: boolean;
}

export const ListProducts: React.FC<ListProductsProps> = ({
  string_params,
  isFiltersButton,
}) => {
  const searchParams = useSearchParams();

  // Создание строки URL для API
  const string = getFiltersFromQueryString(searchParams.toString());
  const { data, isError, isLoading } = useFetchProducts(
    `?${string}&${string_params}`
  );

  if (isError) {
    <div className="">Ошибка загрузки ...</div>;
  }

  return (
    <section className="md:col-span-2 xl:col-span-3">
      <SortForCatalog
        all_count={data?.meta?.pagination?.total}
        isFiltersButton={isFiltersButton}
      />
      <h2 id="product-heading" className="sr-only">
        Товары
      </h2>
      <div className="grid gap-y-4 gap-x-2 grid-cols-2 sm:gap-x-6 sm:gap-y-6 lg:gap-x-4 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? new Array(12).fill("").map((_, index) => (
              <div key={index} className="h-[300px] overflow-hidden rounded-lg">
                <Skeleton className="w-full h-full" />
              </div>
            ))
          : data?.data?.map((i: Product) => (
              <ProductCard
                key={i.slug}
                name={i.name}
                slug={i.slug}
                imagePrevievUrl={
                  i?.images?.length
                    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${i.images[0].formats.small.url}`
                    : null
                }
                product={i}
              />
            ))}
      </div>
      <PaginationBlock pagination={data?.meta?.pagination} />
    </section>
  );
};
