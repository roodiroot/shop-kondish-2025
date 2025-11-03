import { ImageForProduct } from "@/types/catalog";
import { apiFetch } from "./api-fetch";

interface Pagination {
  page: number; // Текущая страница
  pageSize: number; // Количество элементов на странице
  pageCount: number; // Общее количество страниц
  total: number; // Общее количество элементов
}

export interface Brand {
  createdAt: string; // Дата и время создания
  documentId: string; // Уникальный идентификатор документа
  id: number; // Числовой идентификатор
  image: ImageForProduct | null; // Ссылка на изображение или null
  name: string; // Название документа
  description: string; // Описание бренда
  publishedAt: string; // Дата и время публикации
  slug: string; // Уникальный "человекочитаемый" идентификатор
  updatedAt: string; // Дата и время обновления
}

interface Meta {
  pagination: Pagination; // Информация о пагинации
}

export const getAllBrands = async (): Promise<{
  data: Brand[];
  meta: Meta;
} | null> => {
  const { data, error } = await apiFetch<{ data: Brand[]; meta: Meta }>(
    `/brands?populate=*`
  );

  if (error) {
    console.error("Ошибка при получении брендов:", error);
    return null;
  }

  return data ?? null;
};

export const getBrandForSlug = async (
  slug: string
): Promise<Brand | undefined> => {
  const { data, error } = await apiFetch<{ data: Brand[] }>(
    `/brands?filters[slug][$eq]=${slug}&populate=*`
  );

  if (error) {
    console.error("Ошибка при получении бренда по slug:", error);
    return undefined;
  }

  return data?.data?.[0];
};
