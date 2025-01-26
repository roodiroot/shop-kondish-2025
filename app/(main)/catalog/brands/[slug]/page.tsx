import type { Metadata, ResolvingMetadata } from "next";

import { getBrandForSlug } from "@/data/api";
import { ListProducts } from "@/components/product-catalog/catalog/list-products/list-products";

import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";
import BlockFilters from "@/components/product-catalog/catalog/filters/block-filters";

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
  const brand = await getBrandForSlug(slug);
  const stringApiRespons = `filters[brand][slug]=${slug}`;
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
      <HeadCatalog name={brand.name} description={brand.description} />

      {/* Фильтры и товары */}
      <div className="grid pb-12 grid-cols-1 md:grid-cols-3  md:gap-x-6 xl:grid-cols-4">
        <BlockFilters filters={filters} />
        <ListProducts string_params={stringApiRespons} />
      </div>
    </BaseContainer>
  );
}
