import { Metadata } from "next";

import { getQA } from "@/data/qa-api";

import QASectionForPageQA from "@/components/pages/faq/qa-section";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

export const metadata: Metadata = {
  title: "FAQ по кондиционерам",
  description:
    "Ищете ответы на вопросы? Тут все о выборе, установке, обслуживании и ремонте кондиционеров в нашем разделе FAQ. Рекомендации и советы от профессионалов.",
  icons: "/kondish.svg",
  openGraph: {
    title: "FAQ по кондиционерам",
    description:
      "Ищете ответы на вопросы? Тут все о выборе, установке, обслуживании и ремонте кондиционеров в нашем разделе FAQ. Рекомендации и советы от профессионалов.",
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

export default async function FAQPage() {
  // получаем вопросы, важно не более 5 - 6
  const qaes = (await getQA({ limit: 25 })) || [];
  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          faq: "FAQ",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog
          name="Часто задаваемые вопросы"
          description="Ищете ответы на вопросы о кондиционерах? Узнайте все о выборе, установке, обслуживании и ремонте кондиционеров в нашем разделе FAQ. Получите рекомендации и советы от профессионалов."
        />

        <QASectionForPageQA qaes={qaes} />
      </BaseContainer>
    </div>
  );
}
