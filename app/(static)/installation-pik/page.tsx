import { Metadata } from "next";

import { getInstallationPikPage } from "@/data/pages/installation-pik-page-api";

import ContentMarkdown from "@/components/general/content-markdown";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

export const metadata: Metadata = {
  title: "Установка кондиционеров в домах ПИК — индивидуальные решения",
  description:
    "Профессиональная установка кондиционеров в домах ПИК с учетом особенностей планировки. Решение проблем с трассами и индивидуальный подход. Узнайте цены и запишитесь на монтаж в kondish.su!",
  icons: "/kondish.svg",
};

export default async function InstallationPage() {
  const content = await getInstallationPikPage();
  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          "installation-pik": "Установка ПИК",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog name="Установка кондиционеров в домах ПИК" />
        <ContentMarkdown
          className="max-w-2xl text-sm"
          content={content?.content}
        />
      </BaseContainer>
    </div>
  );
}
