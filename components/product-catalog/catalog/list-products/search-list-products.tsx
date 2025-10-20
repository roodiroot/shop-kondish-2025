"use client";

import { Product } from "@/types/catalog";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchProductsSearch } from "@/queries/products";

import SortForCatalog from "@/components/product-catalog/catalog/sort-and-filterls.tsx/sort-for-catalog";
import ProductCard from "@/components/product-catalog/catalog/list-products/product-card";
import PaginationBlock from "@/components/product-catalog/catalog/pagination/pagination-block";
import { useSearchParams } from "next/navigation";
import { getFiltersFromQueryString } from "@/utils/filters";

interface SearchListProductsProps extends React.HTMLAttributes<HTMLDivElement> {
  query: string;
  isFiltersButton?: boolean;
}

export const SearchListProducts: React.FC<SearchListProductsProps> = ({
  query,
  isFiltersButton,
}) => {
  const searchParams = useSearchParams();
  const string = getFiltersFromQueryString(searchParams.toString());
  const { data, isError, isLoading } = useFetchProductsSearch(
    query + "&" + string
  );

  if (isError) {
    <div className="">Ошибка загрузки ...</div>;
  }

  // console.log(data?.data);

  return (
    <section>
      <SortForCatalog
        all_count={data?.meta?.pagination?.total}
        isFiltersButton={isFiltersButton}
      />
      <h2 id="product-heading" className="sr-only">
        Товары
      </h2>
      <div className="grid gap-y-4 gap-x-2 grid-cols-2 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-6 lg:gap-x-4 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? new Array(12).fill("").map((_, index) => (
              <div key={index} className="h-[300px] overflow-hidden rounded-lg">
                <Skeleton className="w-full h-full" />
              </div>
            ))
          : data?.data?.map((i: Product) => {
              const path = i?.images?.length ? i?.images[0]?.url : undefined;
              return (
                <ProductCard
                  key={i.slug}
                  name={i.name}
                  slug={i.slug}
                  brand={i.brand?.name || ""}
                  imagePrevievUrl={
                    path
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`
                      : null
                  }
                  product={i}
                />
              );
            })}
      </div>
      <PaginationBlock pagination={data?.meta?.pagination} />
    </section>
  );
};
