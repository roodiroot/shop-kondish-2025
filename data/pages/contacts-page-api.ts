interface ContactsPage {
  content: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export const getContactsPage = async (): Promise<ContactsPage | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts-page?populate=*`);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Ошибка получения блока вопросов и ответов"
      );
    }

    return (await response.json()).data;
  } catch (error) {}
};
