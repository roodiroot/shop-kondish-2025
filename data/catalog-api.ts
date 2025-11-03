import { ProductCatalog, ProductCatalogData } from "@/types/catalog";
import { apiFetch } from "./api-fetch";

export const getAllProductCatalog = async (
  params = ""
): Promise<ProductCatalogData | undefined> => {
  const { data, error } = await apiFetch<ProductCatalogData>(
    `/product-catalogs?${params}`
  );

  if (error) {
    console.error("Ошибка при получении каталога:", error);
    return undefined;
  }

  return data;
};

export const getOneProductCatalogBySlug = async (
  slug: string
): Promise<ProductCatalog | undefined> => {
  const { data, error } = await apiFetch<ProductCatalogData>(
    `/product-catalogs?filters[available]=true&filters[slug][$eq]=${slug}`
  );

  if (error) {
    console.error("Ошибка при получении каталога по slug:", error);
    return undefined;
  }

  return data?.data?.[0];
};
