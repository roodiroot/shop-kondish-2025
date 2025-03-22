interface TermsPage {
  content: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export const getTermsPage = async (): Promise<TermsPage | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/terms-page`);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Ошибка получения блока");
    }

    return (await response.json()).data;
  } catch (error) {}
};
