import { Metadata } from "next";

import { getQualityGuarateePage } from "@/data/pages/quality-guaratee-page-api";

import ContentMarkdown from "@/components/general/content-markdown";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

export const metadata: Metadata = {
  title:
    "Гарантия качества — Kondish: официальные сертификаты и замена техники",
  description:
    "Официальная гарантия на всю технику от Kondish. Мы обладаем всеми сертификатами и гарантируем замену оборудования в случае неисправностей. Узнайте больше о наших гарантиях!",
  icons: "/kondish.svg",
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
