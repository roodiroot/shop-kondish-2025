import { ImageForProduct } from "@/types/catalog";

interface AboutPage {
  content: string;
  image: ImageForProduct;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export const getAboutPage = async (): Promise<AboutPage | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/about-page?populate=*`);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Ошибка получения блока вопросов и ответов"
      );
    }

    return (await response.json()).data;
  } catch (error) {}
};
