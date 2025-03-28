import { Metadata, ResolvingMetadata } from "next";

import { getAllCategory, getOneProductCatalogBySlug } from "@/data/api";
import { ListProducts } from "@/components/product-catalog/catalog/list-products/list-products";

import BaseContainer from "@/components/general/containers/base-container";
import BlockFilters from "@/components/product-catalog/catalog/filters/block-filters";
import MenuCategoriesSlider from "@/components/product-catalog/catalog/list-products/menu-categories-slider";

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
  const categories = await getAllCategory(
    `&filters[product_catalog][slug][$eq]=${slug}`
  );

  const stringApiRespons = `filters[category][product_catalog][slug]=${slug}`;
  const datafilters = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/filter?${stringApiRespons}`,
    {
      method: "GET",
    }
  );
  const filters = await datafilters.json();

  return (
    <BaseContainer>
      {/* Меню катагорий товарного каталога */}
      <MenuCategoriesSlider
        href={`/catalog/${slug}`}
        dataList={categories?.data}
      />

      {/* Фильтры и товары */}
      <div className="grid pb-12 grid-cols-1 gap-x-6 md:grid-cols-3  lg:gap-x-8 xl:grid-cols-4">
        <BlockFilters
          filters={filters}
          dataList={categories?.data}
          href={`/catalog/${slug}`}
        />
        <ListProducts string_params={stringApiRespons} isFiltersButton />
      </div>
    </BaseContainer>
  );
}
