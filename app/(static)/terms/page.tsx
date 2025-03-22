import { Metadata } from "next";

import { getTermsPage } from "@/data/pages/terms-page-api";

import ContentMarkdown from "@/components/general/content-markdown";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description:
    "Согласие на обработку персональных данных в интернет-магазине Kondish. Узнайте, как мы собираем и используем ваши данные. Ознакомьтесь с Политикой конфиденциальности.",
  icons: "/kondish.svg",
};

export default async function TermsPage() {
  const content = await getTermsPage();

  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          terms: "Персональные данные",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog name="Согласие на обработку персональных данных" />
        <ContentMarkdown
          className="flex-1 max-w-2xl text-sm"
          content={content?.content}
        />
      </BaseContainer>
    </div>
  );
}
