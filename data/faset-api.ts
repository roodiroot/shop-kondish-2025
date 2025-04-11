import { FilterData } from "@/types/catalog";
import { fetchWithRetry } from "./utils";

export const getAllFiltersByParams = async (
  params: string
): Promise<FilterData | null> => {
  try {
    const response = await fetchWithRetry(`/products/filter?${params}`);
    return response;
  } catch (error) {
    console.error(
      "Ошибка получения фасетных фильтров:",
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
    return null;
  }
};
