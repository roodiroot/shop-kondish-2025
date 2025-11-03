import { apiFetch } from "./api-fetch";
import { fetchWithRetry } from "./utils";
import { Product, ProductsData } from "@/types/catalog";

export interface CartItem {
  product: string; // ID товара
  count: number; // Количество
}

//  Получить один товар по slug
export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    populate: "*",
  });

  const { data, error } = await apiFetch<{ data: Product[] }>(
    `/products?${params.toString()}`
  );

  if (error) {
    console.error("Ошибка получения продукта по slug:", error);
    return null;
  }

  return data?.data?.[0] ?? null;
};

// export const getProductBySlug = async (
//   slug: string
// ): Promise<Product | null> => {
//   const params = new URLSearchParams({
//     "filters[slug][$eq]": slug,
//     populate: "*",
//   });

//   try {
//     const response = await fetchWithRetry(`/products?${params.toString()}`);
//     return response.data[0] || null;
//   } catch (error) {
//     console.error(
//       "Ошибка получения продукта по slug:",
//       error instanceof Error ? error.message : "Неизвестная ошибка"
//     );
//     return null;
//   }
// };

// Получить все товары (с любыми параметрами)
export const getAllProducts = async (
  params = ""
): Promise<ProductsData | null> => {
  const { data, error } = await apiFetch<ProductsData>(`/products?${params}`);

  if (error) {
    console.error("Ошибка получения списка продуктов:", error);
    return null;
  }

  return data ?? null;
};

// export const getAllProducts = async (
//   params?: string
// ): Promise<ProductsData | null> => {
//   try {
//     const response = await fetchWithRetry(`/products?${params}`);
//     return response;
//   } catch (error) {
//     console.error(
//       "Ошибка получения списка продуктов:",
//       error instanceof Error ? error.message : "Неизвестная ошибка"
//     );
//     return null;
//   }
// };
// Поиск товаров
export const getAllProductsSearch = async (
  query: string
): Promise<ProductsData | null> => {
  const { data, error } = await apiFetch<ProductsData>(
    `/product/search?q=${query}`
  );

  if (error) {
    console.error("Ошибка поиска продуктов:", error);
    return null;
  }

  return data ?? null;
};
// export const getAllProductsSearch = async (
//   query: string
// ): Promise<ProductsData | null> => {
//   try {
//     const response = await fetchWithRetry(`/product/search?q=${query}`);
//     return response;
//   } catch (error) {
//     console.error(
//       "Ошибка получения списка продуктов:",
//       error instanceof Error ? error.message : "Неизвестная ошибка"
//     );
//     return null;
//   }
// };

// Обновление популярности товара
export const updateProductPopularity = async (
  slug: string,
  action: "views" | "favorites" | "cart_adds"
): Promise<any | null> => {
  const { data, error } = await apiFetch<any>(
    `/products/increment-popularity`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action }),
    }
  );

  if (error) {
    console.error("Ошибка обновления популярности:", error);
    return null;
  }

  return data ?? null;
};

// export const updateProductPopularity = async (
//   slug: string,
//   action: "views" | "favorites" | "cart_adds"
// ) => {
//   const data = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/increment-popularity`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         slug,
//         action,
//       }),
//     }
//   );
//   return data.json();
// };

// Товары из корзины
export const getAllProductsCart = async (
  cart: CartItem[]
): Promise<ProductsData | null> => {
  // Формируем строку параметров для фильтров
  const params = cart
    .map(
      (item, index) => `[filters][documentId][$in][${index}]=${item.product}`
    )
    .join("&");

  return await getAllProducts(`${params}&populate=*`);
};

// Избранные товары
export const getAllProductsFavorites = async (
  favorites: string[],
  string_params?: string
): Promise<ProductsData | null> => {
  // Формируем строку параметров для фильтров
  const params = favorites
    .map((id, index) => `[filters][documentId][$in][${index}]=${id}`)
    .join("&");

  return await getAllProducts(`${params}&${string_params}`);
};

// Товары по массиву slug
export const getAllProductsBySlug = async (
  ids: string[]
): Promise<ProductsData | null> => {
  // Формируем строку параметров для фильтров
  const params = ids
    .map((id, index) => `[filters][slug][$in][${index}]=${id}`)
    .join("&");

  return await getAllProducts(`${params}&populate=*`);
};
