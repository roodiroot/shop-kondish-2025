interface PolicyPage {
  content: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export const getPolicyPage = async (): Promise<PolicyPage | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/policy-page`, {
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Ошибка получения блока");
    }

    return (await response.json()).data;
  } catch (error) {}
};
