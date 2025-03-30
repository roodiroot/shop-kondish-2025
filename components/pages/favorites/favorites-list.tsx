"use client";

import ProductCard from "@/components/product-catalog/catalog/list-products/product-card";
import PaginationBlock from "@/components/product-catalog/catalog/pagination/pagination-block";
import SortForCatalog from "@/components/product-catalog/catalog/sort-and-filterls.tsx/sort-for-catalog";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavoritesStore } from "@/hooks/favorites-stor";
import { useFetchFavoritesProducts } from "@/queries/products";
import { Product } from "@/types/catalog";
import { getFiltersFromQueryString } from "@/utils/filters";
import { useSearchParams } from "next/navigation";

const FavoritesList = () => {
  const searchParams = useSearchParams();
  // Создание строки URL для API
  const string = getFiltersFromQueryString(searchParams.toString());

  // Получаем ID товаров в избранном
  const { favorites } = useFavoritesStore();

  // Получаем товары в избранном
  const { data, isLoading, isPending } = useFetchFavoritesProducts(
    favorites,
    string
  );

  return (
    <div className="pb-10">
      <SortForCatalog all_count={data?.meta?.pagination?.total} />
      <h2 id="product-heading" className="sr-only">
        Товары
      </h2>
      <div className="w-full grid gap-y-4 gap-x-2 grid-cols-2 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-6 lg:gap-x-4 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading || isPending
          ? new Array(5).fill("").map((_, index) => (
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
                    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${i.images[0].url}`
                    : null
                }
                product={i}
              />
            ))}
      </div>
      <PaginationBlock pagination={data?.meta?.pagination} />
    </div>
  );
};

export default FavoritesList;
