import { Article, ArticleData } from "@/types/catalog";
import { getFiltersFromQueryStringForArticle } from "@/utils/get-fulters-fromquery-string-for-article";
import { apiFetch } from "./api-fetch";

interface ApiResult<T> {
  data?: T;
  error?: string;
}

export const getArticles = async ({
  limit = 1,
  params,
  queryString,
}: {
  limit?: number;
  params?: string;
  queryString?: string;
}): Promise<ApiResult<ArticleData>> => {
  const filters = getFiltersFromQueryStringForArticle(queryString || "", limit);
  const query = `${filters}${params ? "&" + params : ""}&populate=*`;

  return await apiFetch<ArticleData>(`/articles?${query}`);
};

export const getArticleBySlug = async (
  slug: string
): Promise<Article | undefined> => {
  const { data, error } = await getArticles({
    params: `filters[slug][$eq]=${slug}&`,
  });

  if (error) {
    console.error("Ошибка при получении статьи по slug:", error);
    return undefined;
  }

  return data?.data?.[0];
};
