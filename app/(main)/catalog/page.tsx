import { Metadata } from "next";

import { getAllProductCatalog } from "@/data/api";
import { getAllFiltersByParams } from "@/data/faset-api";
import { ListProducts } from "@/components/product-catalog/catalog/list-products/list-products";

import BaseContainer from "@/components/general/containers/base-container";
import BlockFilters from "@/components/product-catalog/catalog/filters/block-filters";
import MenuCategoriesSlider from "@/components/product-catalog/catalog/list-products/menu-categories-slider";

export const metadata: Metadata = {
  title: "Каталог товаров",
  description:
    "В наличии и под заказ. Только надежная и проверенная техника в Kondish.",
  icons: "/kondish.svg",
};

export default async function Catalog() {
  const params = new URLSearchParams({
    "filters[available]": "true",
  });
  const paramsProductCatalog = new URLSearchParams({
    populate: "*",
  });

  const productCatalog = await getAllProductCatalog(
    paramsProductCatalog.toString()
  );
  const filters = await getAllFiltersByParams(params.toString());

  return (
    <BaseContainer>
      {/* Меню товарного каталога */}
      <MenuCategoriesSlider href={`/catalog`} dataList={productCatalog?.data} />
      {/* Фильтры и товары */}
      <div className="grid pb-12 grid-cols-1 gap-x-6 md:grid-cols-3  lg:gap-x-8 xl:grid-cols-4">
        <BlockFilters filters={filters} />
        <ListProducts string_params={params.toString()} isFiltersButton />
      </div>
    </BaseContainer>
  );
}
