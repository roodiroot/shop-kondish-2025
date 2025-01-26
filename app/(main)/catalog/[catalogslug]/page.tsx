import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

import { getAllCategory, getOneProductCatalogBySlug } from "@/data/api";
import { ListProducts } from "@/components/product-catalog/catalog/list-products/list-products";

import BaseContainer from "@/components/general/containers/base-container";
import BlockFilters from "@/components/product-catalog/catalog/filters/block-filters";

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
      <div className="flex flex-row gap-4 py-6 w-full">
        {categories.data.map((i) => (
          <Link
            key={i.slug}
            href={`/catalog/${slug}/${i.slug}`}
            className="flex-1 h-40 rounded-md bg-gray-50 p-4"
          >
            {i.name}
          </Link>
        ))}
      </div>

      {/* Фильтры и товары */}
      <div className="grid pb-12 grid-cols-1 gap-x-6 md:grid-cols-3  lg:gap-x-8 xl:grid-cols-4">
        <BlockFilters filters={filters} />
        <ListProducts string_params={stringApiRespons} />
      </div>
    </BaseContainer>
  );
}
