import { z } from "zod";
import {
  requestResetPasswordSchema,
  resetPasswordSchema,
} from "@/schema/auth-schemas";

export interface UserAuth {
  id: number;
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  username: string;
  ordersArray: string[] | [] | null;
  fullName: string | null;
  address: string | null;
  phone: string | null;
}
interface RegisterForm {
  username?: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  ordersArray: string[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

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

// USER AUTH API CALLS

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
}): Promise<{ jwt: string; user: UserAuth }> => {
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

export const checkTokenJWT = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/check-jwt`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const resetPassword = async (
  data: z.infer<typeof resetPasswordSchema>
) => {
  console.log("RESET", data);
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Reset password failed");
  }

  return await response.json();
};

export const requestResetPassword = async (
  data: z.infer<typeof requestResetPasswordSchema>
) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Reset password failed");
  }

  return await response.json();
};

export const updateUser = async (
  id: number,
  token: string,
  updatedData: Record<string, any>
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      // Обрабатываем ошибки, если статус ответа не ok
      const errorData = await response.json();
      console.error("Ошибка при обновлении пользователя:", errorData);
      throw new Error(errorData.message || "Не удалось обновить пользователя");
    }

    const data = await response.json();
    return data; // Возвращаем обновлённые данные пользователя
  } catch (error) {
    console.error("Ошибка в функции updateUser:", error);
    throw error; // Пробрасываем ошибку для обработки на уровне вызова функции
  }
};

export const getMy = async (token: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Ошибка получения каталога");
  }

  return await response.json();
};
