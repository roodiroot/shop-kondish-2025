import { z } from "zod";

// Схема для формы обратной связи
export const feedbackFormSchema = z.object({
  username: z
    .string()
    .min(3, "Имя должен содержать минимум 3 символа")
    .max(20, "Имя не должен превышать 20 символов")
    .regex(/^\p{L}+$/u, "Имя может содержать только буквы"),

  email: z
    .string()
    .email("Введите корректный адрес электронной почты")
    .optional(),
  phone: z
    .string()
    .min(17, { message: "Введите корректный телефон" })
    .optional(),
  message: z.string().max(2024).optional(),
});

export const formPromptSchema = z.object({
  phone: z.string().min(17, { message: "Введите корректный телефон" }),
  name: z.string().min(2, { message: "Введите корректное имя" }),
});

export const formSubscribeSchema = z.object({
  email: z.string().email("Введите корректный адрес электронной почты"),
});
