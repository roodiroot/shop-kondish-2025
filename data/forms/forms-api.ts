import { z } from "zod";

import {
  feedbackFormSchema,
  formSubscribeSchema,
} from "@/schema/feed-back-schemas";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

// форма ОС
export const feedbackCastomer = async (
  userData: z.infer<typeof feedbackFormSchema>
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData);
  }

  return await response.json();
};

// Подписка для рассылки
export const subscribe = async (
  userData: z.infer<typeof formSubscribeSchema>
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData);
  }

  return await response.json();
};
