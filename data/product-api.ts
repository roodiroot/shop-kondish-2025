import { Product, ProductsData } from "@/types/catalog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await fetch(
    `${API_BASE_URL}/products?filters[slug][$eq]=${slug}&populate=*`
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Ошибка получения бренда");
  }

  return (await response.json()).data[0];
};

export const getAllProducts = async (params: string): Promise<ProductsData> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products${params}`,
    {
      method: "GET",
    }
  );
  // console.log(
  //   "API",
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products${params}`
  // );
  return await data.json();
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
): Promise<ProductsData> => {
  // Формируем строку параметров для фильтров
  const params = cart
    .map((item, index) => `[filters][id][$in][${index}]=${item.product}`)
    .join("&");

  // Вызываем getAllProducts с параметрами
  return await getAllProducts(`?${params}&populate=*`);
};

//Получаем все товары по массиву их Id
export const getAllProductsBySlug = async (
  ids: string[]
): Promise<ProductsData> => {
  // Формируем строку параметров для фильтров
  const params = ids
    .map((id, index) => `[filters][slug][$in][${index}]=${id}`)
    .join("&");

  // Вызываем getAllProducts с параметрами
  return await getAllProducts(`?${params}&populate=*`);
};
