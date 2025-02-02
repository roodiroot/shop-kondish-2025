import { z } from "zod";

export const formOrderSchema = z.object({
  delivery: z.object({
    address: z.string().min(1, "Адрес обязателен"),
  }),
  contact: z.object({
    fullName: z.string().min(1, "ФИО обязательно"),
    phone: z
      .string()
      .min(17, { message: "Введите корректный телефон" })
      .max(20, { message: "Введите корректный телефон" }),
    email: z.string().email("Неверный формат email").optional(),
  }),
  payment: z
    .union([
      z.literal("onDelivery"), // При получении
      z.literal("consultWithManager"), // Уточнить у менеджера
    ])
    .optional(),
});

export const formInfoProfileSchema = z.object({
  delivery: z.object({
    address: z.string().nullable().optional(),
  }),
  contact: z.object({
    fullName: z.string().nullable().optional(),
    phone: z.string().refine(
      (value) => {
        // Если строка пустая, она допустима
        if (value === "") return true;
        // Если строка не пустая, её длина должна быть не менее 17 символов
        return value.length >= 17;
      },
      {
        message: "Номер телефона должен быть не менее 17 символов",
      }
    ),
  }),
});
