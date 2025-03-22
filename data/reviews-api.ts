import { Reviews } from "@/types/catalog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export const getReviews = async (): Promise<Reviews[] | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Ошибка получения отзывов");
    }

    return (await response.json()).data;
  } catch (error) {
    return [];
  }
};
