import { Article, ArticleData } from "@/types/catalog";
import { getFiltersFromQueryStringForArticle } from "@/utils/get-fulters-fromquery-string-for-article";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export const getArticles = async ({
  limit = 1,
  params,
  queryString,
}: {
  limit?: number;
  params?: string;
  queryString?: string;
}): Promise<ArticleData | undefined> => {
  const string = getFiltersFromQueryStringForArticle(queryString || "", limit);

  try {
    const response = await fetch(
      `${API_BASE_URL}/articles?${string}&${params ?? params + "&"}populate=*`
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Ошибка получения статей");
    }
    return await response.json();
  } catch (error) {
    return undefined;
  }
};

export const getArticleBySlug = async (
  slug: string
): Promise<Article | undefined> => {
  // Формируем строку параметров для фильтров

  // Вызываем getAllProducts с параметрами
  const article = await getArticles({
    params: `filters[slug][$eq]=${slug}&`,
  });

  if (article) return article.data[0];
};
