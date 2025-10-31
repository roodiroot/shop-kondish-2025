import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

import { getAllCategory, getAllProductCatalog } from "@/data/api";
import {
  getAllProducts,
  getProductBySlug,
  updateProductPopularity,
} from "@/data/product-api";

import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import ProductInfoSection from "@/components/pages/product-page/product-info-section";
import ImagesSlider from "@/components/pages/product-page/images-slider/images-slider";
import SaleProductsSection from "@/components/pages/hero-page-components/sale-products-section/sale-products-section";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ productslug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const productslug = (await params).productslug;
  const previousImages = (await parent).openGraph?.images || [];
  const product = await getProductBySlug(productslug);

  return {
    title: product?.name,
    description: `Преобретайте климатическую технику ${product?.name} в интернет магазине Kondish.`,
    openGraph: {
      images: ["/kondish.svg", ...previousImages],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const productSlug = (await params).productslug;

  const product = await getProductBySlug(productSlug);

  const paramsSale = new URLSearchParams({
    "filters[available]": "true",
    "filters[area_of_room][$gt]": `${Number(product?.area_of_room) * 0.8}`,
    "filters[area_of_room][$lt]": `${Number(product?.area_of_room) * 1.2}`,
    "filters[price][$gt]": `${Number(product?.price) * 0.9}`,
    "filters[price][$lt]": `${Number(product?.price) * 1.5}`,
    "pagination[pageSize]": "10",
    sort: "popularity:desc",
    populate: "*",
  });

  const [productCatalog, category, products] = await Promise.all([
    getAllProductCatalog(),
    getAllCategory(`filters[slug]=${product?.category?.slug}`),
    getAllProducts(paramsSale.toString()),
    updateProductPopularity(productSlug, "views"),
  ]);

  if (!product || !category) {
    return redirect("/not-found");
  }

  const breadcrumbMap: Record<string, string> = {};
  productCatalog.data.forEach((element) => {
    breadcrumbMap[element.slug] = element.name;
  });
  category.data.forEach((element) => {
    breadcrumbMap[element.slug] = element.name;
  });
  breadcrumbMap["catalog"] = "Каталог";

  const breadcrumbPath = `/catalog/${category.data[0].product_catalog.slug}/${
    product.category?.slug
  }/${product.name.replace(/\//g, "|")}`;

  return (
    <>
      <Breadcrumbs
        breadcrumbMap={breadcrumbMap}
        path={breadcrumbPath}
        className="border-none"
      />
      <BaseContainer className={cn(!!products?.data.length ? "pb-0" : "pb-24")}>
        <div className="mx-auto max-w-2xl sm:px-6 sm:mt-8 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image slider */}
            <ImagesSlider images={product?.images} />

            {/* Product information */}
            <ProductInfoSection product={product} />
          </div>
        </div>
      </BaseContainer>
      {!!products?.data.length ? (
        <div className="px-1 pb-24">
          <SaleProductsSection
            title="Похожие товары"
            products={products?.data}
          />
        </div>
      ) : null}
    </>
  );
}
