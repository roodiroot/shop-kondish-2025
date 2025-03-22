import { Metadata } from "next";

import { getReturnPage } from "@/data/pages/return-page-api";

import ContentMarkdown from "@/components/general/content-markdown";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

export const metadata: Metadata = {
  title: "Возврат и гарантия на сплит-системы и кондиционеры",
  description:
    "Официальная гарантия на всю технику. Условия возврата и обмена товара. Установка сплит-систем и кондиционеров сертифицированными специалистами.",
  icons: "/kondish.svg",
};

export default async function ReturnPage() {
  const content = await getReturnPage();
  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          returns: "Возврат и обмен товара",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog name="Возврат и обмен товара" />
        <ContentMarkdown
          className="max-w-2xl text-sm"
          content={content?.content}
        />
      </BaseContainer>
    </div>
  );
}
