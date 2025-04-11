import { Metadata, ResolvingMetadata } from "next";

import { getCategoryBySlug } from "@/data/category-api";
import { ListProducts } from "@/components/product-catalog/catalog/list-products/list-products";

import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";
import BlockFilters from "@/components/product-catalog/catalog/filters/block-filters";
import { Suspense } from "react";
import { getAllFiltersByParams } from "@/data/faset-api";

type Props = {
  params: Promise<{ categoryslug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).categoryslug;
  const previousImages = (await parent).openGraph?.images || [];

  const category = await getCategoryBySlug(slug);

  return {
    title: category.name,
    description: `Выбирите ${category.name.toLowerCase()} в интернет-магазине Kondish. Установка, официальная гарантия.`,
    openGraph: {
      images: ["/kondish.svg", ...previousImages],
    },
  };
}

export default async function CategoryGroup({ params }: Props) {
  const slug = (await params).categoryslug;
  const param = new URLSearchParams({
    "filters[category][slug]": slug,
    "filters[available]": "true",
  });

  const category = await getCategoryBySlug(slug);
  const filters = await getAllFiltersByParams(param.toString());

  return (
    <BaseContainer>
      {/* Блок оглавление страницы */}
      <HeadCatalog name={category.name} description={category.description} />

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
