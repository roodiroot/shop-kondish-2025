import { Metadata } from "next";

import YaMap from "./ya-map";
import ContentMarkdown from "@/components/general/content-markdown";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

import { getContactsPage } from "@/data/pages/contacts-page-api";

export const metadata: Metadata = {
  title: "Контакты — Kondish: сервисный центр, телефоны, реквизиты",
  description:
    "Контактная информация Kondish: адрес сервисного центра, телефоны, электронная почта и реквизиты. Мы работаем ежедневно с 08:00 до 22:00. Звоните!",
  icons: "/kondish.svg",
};

export default async function ContactsPage() {
  const content = await getContactsPage();

  // console.log(content);

  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          contacts: "Контакты",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog name="Контакты" />
        <div className="flex flex-col gap-4 md:flex-row md:gap-10 items-start">
          <div className="flex-1 relative w-full aspect-[3/1.8] bg-gray-100 rounded-lg shadow-md overflow-hidden order-2 ">
            <YaMap />
          </div>
          <ContentMarkdown
            className="flex-1 max-w-2xl text-sm"
            content={content?.content}
          />
        </div>
      </BaseContainer>
    </div>
  );
}
