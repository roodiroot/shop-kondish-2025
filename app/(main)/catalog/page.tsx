import Link from "next/link";
import { Metadata } from "next";

import { getAllProductCatalog } from "@/data/api";
import { ListProducts } from "@/components/product-catalog/catalog/list-products/list-products";

import BaseContainer from "@/components/general/containers/base-container";
import BlockFilters from "@/components/product-catalog/catalog/filters/block-filters";

export const metadata: Metadata = {
  title: "Каталог товаров",
  description:
    "В наличии и под заказ. Только надежная и проверенная техника в Kondish.",
  icons: "/kondish.svg",
};

export default async function Catalog() {
  const productCatalog = await getAllProductCatalog();
  const datafilters = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/filter`,
    {
      method: "GET",
    }
  );
  const filters = await datafilters.json();
  // console.log("CATALOG");
  return (
    <BaseContainer>
      {/* Меню товарного каталога */}
      <div className="flex flex-row gap-4 py-6 w-full">
        {productCatalog.data.map((i) => (
          <Link
            key={i.slug}
            href={`/catalog/${i.slug}`}
            className="flex-1 h-40 rounded-md bg-gray-50 p-4"
          >
            {i.name}
          </Link>
        ))}
      </div>

      {/* Фильтры и товары */}
      <div className="grid pb-12 grid-cols-1 gap-x-6 md:grid-cols-3  lg:gap-x-8 xl:grid-cols-4">
        <BlockFilters filters={filters} />
        <ListProducts />
      </div>
    </BaseContainer>
  );
}
