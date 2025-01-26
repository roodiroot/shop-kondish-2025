import {
  Category,
  CategoryData,
  ProductCatalog,
  ProductCatalogData,
} from "@/types/catalog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export interface UserAuth {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  username: string;
}
interface RegisterForm {
  username?: string;
  email: string;
  password: string;
}

export interface Brand {
  createdAt: string; // Дата и время создания
  documentId: string; // Уникальный идентификатор документа
  id: number; // Числовой идентификатор
  image: string | null; // Ссылка на изображение или null
  name: string; // Название документа
  description: string; // Описание бренда
  publishedAt: string; // Дата и время публикации
  slug: string; // Уникальный "человекочитаемый" идентификатор
  updatedAt: string; // Дата и время обновления
}
interface Pagination {
  page: number; // Текущая страница
  pageSize: number; // Количество элементов на странице
  pageCount: number; // Общее количество страниц
  total: number; // Общее количество элементов
}

interface Meta {
  pagination: Pagination; // Информация о пагинации
}

// Словарь ошибок для перевода на русский
const errorDictionary: Record<string, string> = {
  "Email or Username are already taken":
    "Электронная почта или имя пользователя уже заняты",
  "Too many requests, please try again later.":
    "Слишком много запросов. Пожалуйста, попробуйте позже",
  "Invalid credentials": "Неверные учетные данные",
  "User not found": "Пользователь не найден",
  // Добавьте другие возможные ошибки
};

export const registerUser = async (
  userData: RegisterForm
): Promise<{ jwt: string; user: UserAuth }> => {
  const response = await fetch(`${API_BASE_URL}/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();

    // Переводим ошибку, если она есть в словаре
    const errorMessage =
      errorDictionary[errorData.error.message] ||
      errorData.error.message ||
      "Что-то пошло не так. Не удалось завершить регистрацию.";
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const loginUser = async (credentials: {
  identifier: string;
  password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Login failed");
  }

  return await response.json();
};

export const getAllProductCatalog = async (
  params?: string
): Promise<ProductCatalogData> => {
  const response = await fetch(`${API_BASE_URL}/product-catalogs?${params}`);

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Ошибка получения каталога");
  }

  return await response.json();
};
export const getOneProductCatalogBySlug = async (
  slug: string
): Promise<ProductCatalog> => {
  const response = await fetch(
    `${API_BASE_URL}/product-catalogs?filters[slug][$eq]=${slug}`
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Ошибка получения каталога");
  }

  return (await response.json()).data[0];
};

export const getAllCategory = async (
  params?: string
): Promise<CategoryData> => {
  const response = await fetch(
    `${API_BASE_URL}/categories?populate=*&${params}`
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Ошибка получения категорий");
  }

  return await response.json();
};

export const getAllBrands = async (): Promise<{
  data: Brand[];
  meta: Meta;
}> => {
  const response = await fetch(`${API_BASE_URL}/brands?populate=*`);

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Ошибка получения брендов");
  }

  return await response.json();
};
export const getBrandForSlug = async (slug: string): Promise<Brand> => {
  const response = await fetch(
    `${API_BASE_URL}/brands?filters[slug][$eq]=${slug}&populate=*`
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Ошибка получения бренда");
  }

  return (await response.json()).data[0];
};
