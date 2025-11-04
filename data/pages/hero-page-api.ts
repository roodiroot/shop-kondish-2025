import { apiFetch } from "../api-fetch";

interface HeroPage {
  aboutContent: string;
}

export const getHeroPage = async (): Promise<HeroPage | undefined> => {
  const { data, error } = await apiFetch<{ data: HeroPage }>("/hero-page", {
    next: { revalidate: 600 },
  });

  if (error) {
    console.error("Ошибка при получении страницы:", error);
    return undefined;
  }

  return data?.data;
};
