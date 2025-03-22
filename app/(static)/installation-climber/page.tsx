import { Metadata } from "next";

import { getInstallationClimberPage } from "@/data/pages/installation-climber-page-api";

import ContentMarkdown from "@/components/general/content-markdown";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

export const metadata: Metadata = {
  title: "Установка кондиционеров альпинистами — безопасно и качественно",
  description:
    "Услуги профессиональных альпинистов для установки кондиционеров на высоте. Безопасный монтаж на высотных зданиях и вентилируемых фасадах. Узнайте цены и закажите установку в Kondish!",
  icons: "/kondish.svg",
};

export default async function InstallationClimberPage() {
  const content = await getInstallationClimberPage();
  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          "installation-climber": "Установка альпинистами",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog name="Установка кондиционеров альпинистами" />
        <ContentMarkdown
          className="max-w-2xl text-sm"
          content={content?.content}
        />
      </BaseContainer>
    </div>
  );
}
