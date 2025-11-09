import { QA } from "@/types/catalog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export const getQA = async ({
  limit,
}: {
  limit?: number;
}): Promise<QA[] | undefined> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/qaes?pagination[limit]=${limit ? limit : 25}`,
      {
        next: { revalidate: 600 },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Ошибка получения блока вопросов и ответов"
      );
    }

    return (await response.json()).data;
  } catch (error) {}
};
