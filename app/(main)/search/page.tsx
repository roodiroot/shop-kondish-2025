import BaseContainer from "@/components/general/containers/base-container";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";
import { SearchListProducts } from "@/components/product-catalog/catalog/list-products/search-list-products";
import type { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Поиск кондиционеров — выберите лучший вариант с установкой за 1 день",
    description:
      "Результаты поиска по вашему запросу. Подберите кондиционер для квартиры, офиса или дома. Быстрая доставка, монтаж в день покупки, гарантия качества.",
    openGraph: {
      images: ["/kondish.svg"],
    },
  };
}

export default async function Brand({ searchParams }: Props) {
  const query = (await searchParams).query || "";

  return (
    <BaseContainer>
      {/* Блок оглавление страницы */}
      <HeadCatalog
        name={"Результаты поиска"}
        description={
          "Мы нашли кондиционеры, подходящие под ваш запрос. Ознакомьтесь с моделями, сравните характеристики и выберите оптимальный вариант с установкой и гарантией."
        }
        linkArticle={"/catalog"}
        linkLabel={"Перейти в каталог"}
      />

      {/* Товары */}
      <div className="pb-12">
        <Suspense>
          <SearchListProducts query={query.toString()} />
        </Suspense>
      </div>
    </BaseContainer>
  );
}
