import { Metadata } from "next";

import { getDeliveryPage } from "@/data/pages/delivery-page-api";

import ContentMarkdown from "@/components/general/content-markdown";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

export const metadata: Metadata = {
  title: "Удобные способы получения и оплаты заказов",
  description:
    "Бесплатная доставка в пределах МКАД, выгодные условия за пределами МКАД. Оплата наличными, картой или безналичным расчетом. Гарантия качества и удобный сервис доставки с 10:00 до 20:00.",
  icons: "/kondish.svg",
};

export default async function DeliveryPage() {
  const content = await getDeliveryPage();

  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          delivery: "Доставка и оплата",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog name="Доставка и оплата" />
        <ContentMarkdown
          className="max-w-2xl text-sm"
          content={content?.content}
        />
      </BaseContainer>
    </div>
  );
}
