import { Metadata, ResolvingMetadata } from "next";

import { getAllCategory, getOneProductCatalogBySlug } from "@/data/api";
import { ListProducts } from "@/components/product-catalog/catalog/list-products/list-products";

import BaseContainer from "@/components/general/containers/base-container";
import BlockFilters from "@/components/product-catalog/catalog/filters/block-filters";
import MenuCategoriesSlider from "@/components/product-catalog/catalog/list-products/menu-categories-slider";
import { Suspense } from "react";
import { getAllFiltersByParams } from "@/data/faset-api";

type Props = {
  params: Promise<{ catalogslug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).catalogslug;
  const previousImages = (await parent).openGraph?.images || [];

  const catalog = await getOneProductCatalogBySlug(slug);

  return {
    title: catalog?.name,
    description: `Выбирите ${catalog?.name.toLowerCase()} в интернет-магазине Kondish. Установка, настройка, официальная гарантия.`,
    openGraph: {
      images: ["/kondish.svg", ...previousImages],
    },
  };
}
export default async function CatalogGroup({ params }: Props) {
  const slug = (await params).catalogslug;
  const param = new URLSearchParams({
    "filters[category][product_catalog][slug]": slug,
    "filters[available]": "true",
  });
  const paramForCategory = new URLSearchParams({
    "filters[product_catalog][slug][$eq]": slug,
  });

  const categories = await getAllCategory(paramForCategory.toString());
  const filters = await getAllFiltersByParams(param.toString());

  return (
    <BaseContainer>
      {/* Меню катагорий товарного каталога */}
      <MenuCategoriesSlider
        href={`/catalog/${slug}`}
        dataList={categories?.data}
      />

      {/* Фильтры и товары */}
      <div className="grid pb-12 grid-cols-1 gap-x-6 md:grid-cols-3  lg:gap-x-8 xl:grid-cols-4">
        <BlockFilters filters={filters} />
        <Suspense>
          <ListProducts string_params={param.toString()} isFiltersButton />
        </Suspense>
      </div>
    </BaseContainer>
  );
}
