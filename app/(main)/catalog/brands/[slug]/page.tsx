import type { Metadata, ResolvingMetadata } from "next";

import { getBrandForSlug } from "@/data/api";
import { ListProducts } from "@/components/product-catalog/catalog/list-products/list-products";

import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";
import BlockFilters from "@/components/product-catalog/catalog/filters/block-filters";
import { Suspense } from "react";
import { getAllFiltersByParams } from "@/data/faset-api";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const brand = await getBrandForSlug(slug);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: brand.name,
    description: `Устанавливаем климатическую технику ${brand.name} более 12 лет в Мосскве и области.`,
    openGraph: {
      images: ["/kondish.svg", ...previousImages],
    },
  };
}

export default async function Brand({ params }: Props) {
  const slug = (await params).slug;

  const param = new URLSearchParams({
    "filters[brand][slug]": slug,
    "filters[available]": "true",
  });

  const brand = await getBrandForSlug(slug);
  const filters = await getAllFiltersByParams(param.toString());

  return (
    <BaseContainer>
      {/* Блок оглавление страницы */}
      <HeadCatalog name={brand.name} description={brand.description} />

      {/* Фильтры и товары */}
      <div className="grid pb-12 grid-cols-1 md:grid-cols-3  md:gap-x-6 xl:grid-cols-4">
        <BlockFilters filters={filters} />
        <Suspense>
          <ListProducts string_params={param.toString()} isFiltersButton />
        </Suspense>
      </div>
    </BaseContainer>
  );
}
