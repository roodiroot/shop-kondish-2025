import { UserAuth } from "@/data/api";
import Cookies from "js-cookie";

// Сохранение токена и данных пользователя
export const saveAuthData = (token: string, userData: UserAuth) => {
  Cookies.set("authToken", token, { expires: 7 }); // Сохраняем токен на 7 дней
  Cookies.set("userData", JSON.stringify(userData), { expires: 7 }); // Сохраняем данные пользователя
};

// Получение токена и данных пользователя
export const getAuthData = () => {
  const token = Cookies.get("authToken");
  const userData = Cookies.get("userData");
  return {
    token,
    userData: userData ? JSON.parse(userData) : null,
  };
};

// Удаление токена и данных пользователя
export const clearAuthData = () => {
  Cookies.remove("authToken");
  Cookies.remove("userData");
};
