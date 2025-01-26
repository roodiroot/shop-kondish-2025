import { Category } from "@/types/catalog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await fetch(
    `${API_BASE_URL}/categories?filters[slug][$eq]=${slug}&populate=*`
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Ошибка получения категрии");
  }

  return (await response.json()).data[0];
};
