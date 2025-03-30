import { Metadata, ResolvingMetadata } from "next";

import { getCategoryBySlug } from "@/data/category-api";
import { ListProducts } from "@/components/product-catalog/catalog/list-products/list-products";

import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";
import BlockFilters from "@/components/product-catalog/catalog/filters/block-filters";
import { Suspense } from "react";

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
  const category = await getCategoryBySlug(slug);
  const stringApiRespons = `filters[category][slug]=${slug}&filters[available]=true`;

  const datafilters = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/filter?${stringApiRespons}`,
    {
      method: "GET",
    }
  );
  const filters = await datafilters.json();

  return (
    <BaseContainer>
      {/* Блок оглавление страницы */}
      <HeadCatalog name={category.name} description={category.description} />

      {/* Фильтры и товары */}
      <div className="grid pb-12 grid-cols-1 gap-x-6 md:grid-cols-3  lg:gap-x-8 xl:grid-cols-4">
        <BlockFilters filters={filters} />
        <Suspense>
          <ListProducts string_params={stringApiRespons} isFiltersButton />
        </Suspense>
      </div>
    </BaseContainer>
  );
}
