import { Metadata } from "next";

import { getPolicyPage } from "@/data/pages/policy-page-api";

import ContentMarkdown from "@/components/general/content-markdown";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных.",
  description:
    "Установка и подбор кондиционеров и сплит-систем. | Более 15 лет устанавливаем климатическую технику в ваших домах.",
  icons: "/kondish.svg",
  openGraph: {
    title: "Политика обработки персональных данных.",
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
