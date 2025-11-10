import { Metadata } from "next";

import { getOfferPage } from "@/data/pages/offer-page-api";

import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";
import ContentMarkdown from "@/components/general/content-markdown";

export const metadata: Metadata = {
  title: "Публичная оферта",
  description:
    "Ознакомьтесь с условиями публичной оферты. Узнайте о правах и обязанностях сторон, правилах оплаты и доставки, а также других важных аспектах сотрудничества.",
  icons: "/kondish.svg",
  openGraph: {
    title: "Публичная оферта",
    description:
      "Установка и подбор кондиционеров и сплит-систем. | Более 15 лет устанавливаем климатическую технику в ваших домах.",
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

export default async function DeliveryPage() {
  const content = await getOfferPage();
  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          offer: "Публичная оферта",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog name="Публичная оферта" />
        <ContentMarkdown
          className="max-w-2xl text-xs"
          content={content?.content}
        />
      </BaseContainer>
    </div>
  );
}
