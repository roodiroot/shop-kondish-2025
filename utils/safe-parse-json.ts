// Безопасный парсинг JSON
export const safeParseJson = (str: string | undefined): any => {
  try {
    return str ? JSON.parse(str) : null; // Если строка существует, парсим её
  } catch {
    return null; // Если JSON некорректен, возвращаем null
  }
};
