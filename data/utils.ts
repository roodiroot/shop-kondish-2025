const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export const fetchWithRetry = async (
  url: string,
  options?: RequestInit,
  retries = 3,
  timeout = 5000
) => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(API_BASE_URL + url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Ошибка ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (
        attempt === retries - 1 ||
        (error instanceof Error && error.name === "AbortError")
      ) {
        console.error(
          `Ошибка запроса к ${url}:`,
          error instanceof Error ? error.message : error
        );
        throw error;
      }
    }
  }
};
