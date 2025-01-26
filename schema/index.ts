import { z } from "zod";

export const formOrderSchema = z.object({
  delivery: z.object({
    address: z.string().min(1, "Адрес обязателен"),
  }),
  contact: z.object({
    fullName: z.string().min(1, "ФИО обязательно"),
    phone: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, "Неверный формат телефона")
      .min(1, "Телефон обязателен"),
    email: z.string().email("Неверный формат email").optional(),
  }),
  payment: z
    .union([
      z.literal("onDelivery"), // При получении
      z.literal("consultWithManager"), // Уточнить у менеджера
    ])
    .optional(),
});
