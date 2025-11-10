import { Metadata } from "next";

import { getInstallationPage } from "@/data/pages/installation-page-api";

import ContentMarkdown from "@/components/general/content-markdown";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

export const metadata: Metadata = {
  title: "Установка и монтаж сплит-систем в Москве — цены и услуги",
  description:
    "Профессиональный монтаж сплит-систем и кондиционеров в Москве. Цены на установку с закладкой магистрали, штробление стен и работы на высоте. Гарантия качества от kondish.su!",
  icons: "/kondish.svg",
  openGraph: {
    title: "Установка и монтаж сплит-систем в Москве — цены и услуги",
    description:
      "Профессиональный монтаж сплит-систем и кондиционеров в Москве. Цены на установку с закладкой магистрали, штробление стен и работы на высоте. Гарантия качества от kondish.su!",
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

export default async function InstallationPage() {
  const content = await getInstallationPage();
  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          installation: "Установка",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog name="Установка и монтаж сплит-систем и кондиционеров" />
        <ContentMarkdown
          className="max-w-2xl text-sm"
          content={content?.content}
        />
      </BaseContainer>
    </div>
  );
}
