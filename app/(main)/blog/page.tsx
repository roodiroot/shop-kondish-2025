import type { Metadata } from "next";

import BaseContainer from "@/components/general/containers/base-container";
import { getArticles } from "@/data/article-api";
import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";
import BlogSectionForBlogPage from "@/components/pages/blog/blog-section-for-blog-page";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Полезные статьи",
  description:
    "В наличии и под заказ. Только надежные и проверенные временем бренды в Kondish.",
  icons: "/kondish.svg",
};

export default async function Blog(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const queryString = new URLSearchParams(
    searchParams as Record<string, string>
  ).toString();

  // получаем статьи
  const limit = 20;
  const articles = await getArticles({ queryString, limit });

  return (
    <div>
      <Breadcrumbs
        breadcrumbMap={{
          blog: "Блог",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog name="Блог" />
        <BlogSectionForBlogPage articlesData={articles.data} />
      </BaseContainer>
    </div>
  );
}
