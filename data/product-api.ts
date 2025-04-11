import { Product, ProductsData } from "@/types/catalog";
import { fetchWithRetry } from "./utils";

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    populate: "*",
  });

  try {
    const response = await fetchWithRetry(`/products?${params.toString()}`);
    return response.data[0] || null;
  } catch (error) {
    console.error(
      "Ошибка получения продукта по slug:",
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
    return null;
  }
};

export const getAllProducts = async (
  params?: string
): Promise<ProductsData | null> => {
  try {
    const response = await fetchWithRetry(`/products?${params}`);
    return response;
  } catch (error) {
    console.error(
      "Ошибка получения списка продуктов:",
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
    return null;
  }
};

//       views: 1, // Вес для просмотров
//       favorites: 5, // Вес для добавления в избранное
//       cart_adds: 10, // Вес для добавления в корзину
export const updateProductPopularity = async (
  slug: string,
  action: "views" | "favorites" | "cart_adds"
) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/increment-popularity`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        action,
      }),
    }
  );
  return data.json();
};

export interface CartItem {
  product: number; // ID товара
  count: number; // Количество
}

export const getAllProductsCart = async (
  cart: CartItem[]
): Promise<ProductsData | null> => {
  // Формируем строку параметров для фильтров
  const params = cart
    .map((item, index) => `[filters][id][$in][${index}]=${item.product}`)
    .join("&");

  // Вызываем getAllProducts с параметрами
  return await getAllProducts(`${params}&populate=*`);
};

// Получаем все избранные товары
export const getAllProductsFavorites = async (
  favorites: number[],
  string_params?: string
): Promise<ProductsData | null> => {
  // Формируем строку параметров для фильтров
  const params = favorites
    .map((id, index) => `[filters][id][$in][${index}]=${id}`)
    .join("&");

  // Вызываем getAllProducts с параметрами
  return await getAllProducts(`${params}&${string_params}`);
};

//Получаем все товары по массиву их Id
export const getAllProductsBySlug = async (
  ids: string[]
): Promise<ProductsData | null> => {
  // Формируем строку параметров для фильтров
  const params = ids
    .map((id, index) => `[filters][slug][$in][${index}]=${id}`)
    .join("&");

  // Вызываем getAllProducts с параметрами
  return await getAllProducts(`${params}&populate=*`);
};
