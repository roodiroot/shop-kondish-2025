import { Reviews } from "@/types/catalog";
import { apiFetch } from "./api-fetch";

export const getReviews = async (): Promise<Reviews[]> => {
  const { data, error } = await apiFetch<{ data: Reviews[] }>(
    "/reviews?[sort]=createdAt:desc",
    {
      next: { revalidate: 60 },
    }
  );

  if (error) {
    console.error("Ошибка получения отзывов:", error);
    return [];
  }

  return data?.data || [];
};
