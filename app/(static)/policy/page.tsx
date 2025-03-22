import { Metadata } from "next";

import { getPolicyPage } from "@/data/pages/policy-page-api";

import ContentMarkdown from "@/components/general/content-markdown";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description:
    "Политика обработки персональных данных в интернет-магазине Kondish. Узнайте, как мы собираем, используем и защищаем ваши данные. Ознакомьтесь с правами пользователей.",
  icons: "/kondish.svg",
};

export default async function PolicyPage() {
  const content = await getPolicyPage();

  // console.log(content);

  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          policy: "Политика",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog name="Политика в отношении обработки персональных данных" />
        <ContentMarkdown
          className="flex-1 max-w-2xl text-sm"
          content={content?.content}
        />
      </BaseContainer>
    </div>
  );
}
