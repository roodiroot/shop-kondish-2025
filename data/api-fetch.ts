const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

interface ApiResult<T> {
  data?: T;
  error?: string;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<ApiResult<T>> {
  const { timeout = 7000, ...restOptions } = options; // 7 секунд по умолчанию
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    if (restOptions.body && typeof restOptions.body === "object") {
      restOptions.body = JSON.stringify(restOptions.body);
      restOptions.headers = {
        "Content-Type": "application/json",
        ...restOptions.headers,
      };
    }

    const response = await fetch(API_BASE_URL + endpoint, {
      ...restOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message ||
        `Ошибка ${response.status}: ${response.statusText}`;
      console.error("API Error:", message);
      return { error: message };
    }

    const data = await response.json().catch(() => null);
    return { data };
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      console.error("Запрос прерван по таймауту:", endpoint);
      return { error: "Время ожидания ответа истекло" };
    }

    console.error("Ошибка сети:", error);
    return { error: "Ошибка сети" };
  }
}
