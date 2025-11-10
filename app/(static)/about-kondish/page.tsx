import Image from "next/image";
import { Metadata } from "next";

import FeedbackBlock from "./feedback-block";
import ContentMarkdown from "@/components/general/content-markdown";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

import { getAboutPage } from "@/data/pages/about-page-api";

export const metadata: Metadata = {
  title: "Лидер в продаже и установке кондиционеров в Москве",
  description:
    "Kondish — надежный поставщик кондиционеров от ведущих брендов. Профессиональный монтаж, техническое обслуживание и индивидуальный подход. Создаем комфорт в любом помещении!",
  icons: "/kondish.svg",
  openGraph: {
    title: "Лидер в продаже и установке кондиционеров в Москве.",
    description:
      "Kondish — надежный поставщик кондиционеров от ведущих брендов. Профессиональный монтаж, техническое обслуживание и индивидуальный подход. Создаем комфорт в любом помещении!",
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

export default async function AboutPage() {
  const content = await getAboutPage();

  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          "about-kondish": "О Kondish",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog name="О Kondish" />
        <div className="flex flex-col gap-4 md:flex-row md:gap-10 items-start">
          <div className="flex-1 relative w-full aspect-[3/1.8] bg-gray-100 rounded-lg shadow-md overflow-hidden md:order-2 ">
            <Image
              width={1200}
              height={1200}
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${content?.image?.url}`}
              alt={"command_kondish"}
              className="absolute w-full h-full object-cover"
            />
          </div>
          <ContentMarkdown
            className="flex-1 max-w-2xl text-sm"
            content={content?.content}
          />
        </div>
      </BaseContainer>
      <FeedbackBlock />
    </div>
  );
}
