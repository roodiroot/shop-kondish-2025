import { Metadata } from "next";

import { getQualityGuarateePage } from "@/data/pages/quality-guaratee-page-api";

import ContentMarkdown from "@/components/general/content-markdown";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

export const metadata: Metadata = {
  title: "Гарантия качества — официальные сертификаты и замена техники.",
  description:
    "Официальная гарантия на всю технику от Kondish. Мы обладаем всеми сертификатами и гарантируем замену оборудования в случае неисправностей.",
  icons: "/kondish.svg",
  openGraph: {
    title: "Гарантия качества — официальные сертификаты и замена техники",
    description:
      "Официальная гарантия на всю технику от Kondish. Мы обладаем всеми сертификатами и гарантируем замену оборудования в случае неисправностей.",
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

export default async function QualityGuarateePage() {
  const content = await getQualityGuarateePage();

  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          "quality-guarantee": "Гарантия качества",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog name="Гарантия качества" />
        <div className="flex flex-col gap-4 md:flex-row md:gap-10 items-start">
          <ContentMarkdown
            className="flex-1 max-w-2xl text-sm"
            content={content?.content}
          />
        </div>
      </BaseContainer>
    </div>
  );
}
