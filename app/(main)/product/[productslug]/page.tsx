import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

import { getAllCategory, getAllProductCatalog } from "@/data/api";
import { getProductBySlug, updateProductPopularity } from "@/data/product-api";

import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import ProductInfoSection from "@/components/pages/product-page/product-info-section";
import ImagesSlider from "@/components/pages/product-page/images-slider/images-slider";

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

  const [productCatalog, category] = await Promise.all([
    getAllProductCatalog(),
    getAllCategory(`filters[slug]=${product?.category?.slug}`),
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
      <BaseContainer className="pb-24">
        <div className="mx-auto max-w-2xl sm:px-6 sm:mt-8 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image slider */}
            <ImagesSlider images={product?.images} />

            {/* Product information */}
            <ProductInfoSection product={product} />
          </div>
        </div>
      </BaseContainer>
    </>
  );
}
