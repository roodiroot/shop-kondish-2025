import type { Metadata } from "next";

import { getAllBrands } from "@/data/api";
import BaseContainer from "@/components/general/containers/base-container";
import BrandsList from "@/components/product-catalog/brands/brands-list";

export const metadata: Metadata = {
  title: "Бренды",
  description:
    "В наличии и под заказ. Только надежные и проверенные временем бренды в Kondish.",
  icons: "/kondish.svg",
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

export default async function Brands() {
  const brands = await getAllBrands();

  return (
    <BaseContainer>
      <BrandsList brandsList={brands?.data} />
    </BaseContainer>
  );
}
