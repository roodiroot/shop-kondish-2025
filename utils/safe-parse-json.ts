import { User, UserAuth } from "@/data/api";

// Безопасный парсинг JSON
export const safeParseJson = (str: string | undefined): UserAuth | null => {
  try {
    return str ? JSON.parse(str) : null; // Если строка существует, парсим её
  } catch {
    return null; // Если JSON некорректен, возвращаем null
  }
};
