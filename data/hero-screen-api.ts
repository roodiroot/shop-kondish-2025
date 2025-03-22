import { ImageForProduct } from "@/types/catalog";

export interface HeroScreens {
  documentId: string;
  title?: string;
  subtitle?: string;
  description?: string;
  link?: string;
  buttonText?: string;
  image?: ImageForProduct;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export const getHeroScreens = async (): Promise<HeroScreens[] | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/hero-screens?populate=*`);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Ошибка получения блока");
    }

    return (await response.json()).data;
  } catch (error) {}
};
