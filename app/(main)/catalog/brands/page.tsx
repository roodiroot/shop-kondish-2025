import type { Metadata } from "next";

import { getAllBrands } from "@/data/api";
import BaseContainer from "@/components/general/containers/base-container";
import BrandsList from "@/components/product-catalog/brands/brands-list";

export const metadata: Metadata = {
  title: "Бренды",
  description:
    "В наличии и под заказ. Только надежные и проверенные временем бренды в Kondish.",
  icons: "/kondish.svg",
};

export default async function Brands() {
  const brands = await getAllBrands();

  return (
    <BaseContainer>
      <BrandsList brandsList={brands?.data} />
    </BaseContainer>
  );
}
