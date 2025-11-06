import { Metadata } from "next";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).categoryslug;

  const category = await getCategoryBySlug(slug);

  return {
    title: category.name,
    description: `Выбирите ${category.name.toLowerCase()} в интернет-магазине Kondish. Установка, официальная гарантия.`,
    openGraph: {
      title: "Kóndish установка и продажа кондиционеров в Москве.",
      description:
        "Установка и подбор кондиционеров и сплит-систем в Москве и Московской области. | Более 12 лет устанавливаем климатическую технику в ваших домах.",
      siteName: "Kóndish",
      type: "website",
      locale: "ru_RU",
      url: "https://kondish.su",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/Frame_23_81477b6c9e.jpg`,
          width: 1200,
          height: 630,
          alt: "Kóndish установка и продажа кондиционеров в Москве.",
        },
      ],
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
          <ListProducts
            string_params={param.toString()}
            isFiltersButton
            titleBlock={`Категория ${category.name}`}
          />
        </Suspense>
      </div>
    </BaseContainer>
  );
}
