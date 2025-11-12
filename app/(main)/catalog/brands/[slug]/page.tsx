import type { Metadata } from "next";

import { Suspense } from "react";

import { getAllFiltersByParams } from "@/data/faset-api";
import { ListProducts } from "@/components/product-catalog/catalog/list-products/list-products";

import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";
import BlockFilters from "@/components/product-catalog/catalog/filters/block-filters";
import { getBrandForSlug } from "@/data/brand-api";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const brand = await getBrandForSlug(slug);
  const image = brand?.image?.url;

  return {
    title: `Каталог техники бренда ${brand?.name}`,
    description: `Устанавливаем климатическую технику ${brand?.name} более 12 лет в Москве и области.`,
    openGraph: {
      title: `Каталог техники бренда ${brand?.name}`,
      description: `Устанавливаем климатическую технику ${brand?.name} более 12 лет в Москве и области.`,
      siteName: "Kóndish",
      type: "website",
      locale: "ru_RU",
      url: "https://kondish.su",
      images: [
        {
          url: image
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${image}`
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/Frame_23_81477b6c9e.jpg`,
          width: 600,
          height: 315,
          alt: "Kóndish установка и продажа кондиционеров в Москве.",
        },
      ],
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
      <HeadCatalog name={brand?.name || ""} description={brand?.description} />

      {/* Фильтры и товары */}
      <div className="grid pb-12 grid-cols-1 md:grid-cols-3  md:gap-x-6 xl:grid-cols-4">
        <BlockFilters filters={filters} />
        <Suspense>
          <ListProducts
            string_params={param.toString()}
            isFiltersButton
            titleBlock={`Каталог бренда ${brand?.name}`}
          />
        </Suspense>
      </div>
    </BaseContainer>
  );
}
