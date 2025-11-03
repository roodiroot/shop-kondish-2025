import { Metadata } from "next";
import { Suspense } from "react";

import { getAllFiltersByParams } from "@/data/faset-api";
import { ListProducts } from "@/components/product-catalog/catalog/list-products/list-products";

import BaseContainer from "@/components/general/containers/base-container";
import BlockFilters from "@/components/product-catalog/catalog/filters/block-filters";
import MenuCategoriesSlider from "@/components/product-catalog/catalog/list-products/menu-categories-slider";
import { getOneProductCatalogBySlug } from "@/data/catalog-api";
import { getAllCategory } from "@/data/category-api";

type Props = {
  params: Promise<{ catalogslug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).catalogslug;

  const catalog = await getOneProductCatalogBySlug(slug);

  return {
    title: catalog?.name,
    description: `Выбирите ${catalog?.name.toLowerCase()} в интернет-магазине Kondish. Установка, настройка, официальная гарантия.`,
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
