import { Category, CategoryData } from "@/types/catalog";

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

export const getAllCategory = async (
  params?: string
): Promise<CategoryData | null> => {
  const response = await fetch(
    `${API_BASE_URL}/categories?[filters][available]=true&populate=*&${params}`
  );

  if (!response.ok) {
    const errorData = await response.json();

    // throw new Error(errorData.message || "Ошибка получения категорий");
    return null;
  }

  return await response.json();
};
